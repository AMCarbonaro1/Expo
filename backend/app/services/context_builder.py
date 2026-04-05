from datetime import date, datetime, timedelta

from sqlalchemy import select, and_, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bank import PlaidToken, BankTransaction, DepositMatch
from app.models.invoice import Invoice
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import DailySummary


async def get_recent_summaries(
    db: AsyncSession, restaurant_id: int, days: int = 7
) -> list[DailySummary]:
    result = await db.execute(
        select(DailySummary)
        .where(DailySummary.restaurant_id == restaurant_id)
        .order_by(DailySummary.summary_date.desc())
        .limit(days)
    )
    return list(result.scalars().all())


async def get_recent_messages(
    db: AsyncSession, restaurant_id: int, limit: int = 20
) -> list[Message]:
    result = await db.execute(
        select(Message)
        .where(Message.restaurant_id == restaurant_id)
        .order_by(Message.created_at.desc())
        .limit(limit)
    )
    return list(reversed(result.scalars().all()))


async def get_food_cost_summary(
    db: AsyncSession, restaurant_id: int, days: int = 7
) -> dict | None:
    cutoff = date.today() - timedelta(days=days)

    # Sum confirmed invoices
    result = await db.execute(
        select(sa_func.sum(Invoice.total_amount)).where(
            and_(
                Invoice.restaurant_id == restaurant_id,
                Invoice.status == "confirmed",
                Invoice.invoice_date >= cutoff,
            )
        )
    )
    invoice_total = result.scalar() or 0

    # Sum sales
    result = await db.execute(
        select(sa_func.sum(DailySummary.total_sales)).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date >= cutoff,
            )
        )
    )
    sales_total = result.scalar() or 0

    if not invoice_total and not sales_total:
        return None

    food_cost_pct = (invoice_total / sales_total * 100) if sales_total else 0

    return {
        "invoice_total": round(invoice_total, 2),
        "sales_total": round(sales_total, 2),
        "food_cost_pct": round(food_cost_pct, 1),
        "days": days,
    }


async def get_bank_summary(db: AsyncSession, restaurant_id: int) -> dict | None:
    result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == restaurant_id)
    )
    token = result.scalar_one_or_none()
    if not token:
        return None

    summary = {
        "balance": token.current_balance,
        "balance_date": str(token.balance_updated_at.date()) if token.balance_updated_at else None,
        "institution": token.institution_name,
    }

    # Monthly expense breakdown by category
    cutoff = date.today() - timedelta(days=30)
    result = await db.execute(
        select(
            BankTransaction.category_primary,
            sa_func.sum(BankTransaction.amount),
        )
        .where(
            and_(
                BankTransaction.restaurant_id == restaurant_id,
                BankTransaction.date >= cutoff,
                BankTransaction.amount > 0,
            )
        )
        .group_by(BankTransaction.category_primary)
        .order_by(sa_func.sum(BankTransaction.amount).desc())
    )
    expenses = {cat: round(total, 0) for cat, total in result.all() if cat}
    summary["monthly_expenses"] = expenses

    # Recurring expenses
    result = await db.execute(
        select(BankTransaction).where(
            and_(
                BankTransaction.restaurant_id == restaurant_id,
                BankTransaction.is_recurring == True,
            )
        ).order_by(BankTransaction.amount.desc())
    )
    recurring = result.scalars().all()
    seen = set()
    summary["recurring"] = []
    for txn in recurring:
        key = (txn.merchant_name or txn.name, round(txn.amount, -1))
        if key not in seen:
            seen.add(key)
            summary["recurring"].append({
                "name": txn.merchant_name or txn.name,
                "amount": round(txn.amount, 0),
                "day_of_month": txn.date.day,
            })

    return summary


def build_conversation_history(messages: list[Message]) -> list[dict]:
    history = []
    for msg in messages:
        role = "user" if msg.direction == "in" else "assistant"
        history.append({"role": role, "content": msg.body})
    return history


def build_system_prompt(
    restaurant: Restaurant,
    summaries: list[DailySummary],
    alerts: list | None = None,
    food_cost: dict | None = None,
    bank_summary: dict | None = None,
) -> str:
    prompt = f"""You are Expo, an SMS-based AI business partner for restaurant owners. You communicate via text message.

PERSONALITY:
- Friendly, direct, and data-driven
- Speak like a knowledgeable restaurant industry peer, not a generic AI
- Keep responses concise — under 320 characters when possible (fits in 2 SMS segments)
- Use specific numbers when available
- Never make up data. If you don't have information, say so.

RESTAURANT PROFILE:
- Name: {restaurant.restaurant_name}
- Owner: {restaurant.owner_name}
- Type: {restaurant.restaurant_type or "Not specified"}
- Hours: {restaurant.hours or "Not specified"}
- Food cost target: {restaurant.food_cost_baseline or "Not set"}%
"""

    if summaries:
        prompt += "\nRECENT DAILY SUMMARIES:\n"
        for s in summaries:
            weekday = s.summary_date.strftime("%A")
            prompt += (
                f"- {s.summary_date} ({weekday}): ${s.total_sales:.0f} sales, "
                f"{s.order_count} orders, ${s.avg_ticket:.2f} avg ticket, "
                f"labor {s.labor_percentage:.1f}%\n"
            )
    else:
        prompt += "\nNo daily summaries available yet — data is still being collected.\n"

    if food_cost:
        prompt += (
            f"\nFOOD COST (last {food_cost['days']} days):\n"
            f"- Invoices: ${food_cost['invoice_total']:,.0f}\n"
            f"- Sales: ${food_cost['sales_total']:,.0f}\n"
            f"- Food cost: {food_cost['food_cost_pct']:.1f}%"
        )
        if restaurant.food_cost_baseline:
            prompt += f" (target: {restaurant.food_cost_baseline}%)"
        prompt += "\n"

    if bank_summary:
        prompt += f"\nBANK ACCOUNT ({bank_summary.get('institution', 'Connected')}):\n"
        if bank_summary.get("balance") is not None:
            prompt += f"- Balance: ${bank_summary['balance']:,.0f}"
            if bank_summary.get("balance_date"):
                prompt += f" (as of {bank_summary['balance_date']})"
            prompt += "\n"
        if bank_summary.get("monthly_expenses"):
            prompt += "- Monthly expenses by category:\n"
            for cat, amt in list(bank_summary["monthly_expenses"].items())[:6]:
                prompt += f"  - {cat}: ${amt:,.0f}\n"
        if bank_summary.get("recurring"):
            prompt += "- Recurring expenses:\n"
            for r in bank_summary["recurring"][:5]:
                prompt += f"  - {r['name']}: ${r['amount']:,.0f} (~day {r['day_of_month']})\n"

    if alerts:
        prompt += "\nRECENT ALERTS:\n"
        for a in alerts:
            prompt += f"- [{a.severity.upper()}] {a.message}\n"

    prompt += """
GUIDELINES:
- When asked about sales: reference specific numbers, compare to averages
- When asked about labor: mention percentage and compare to 30% industry target
- When asked "how did we do": give yesterday's sales, compare to average, mention labor %
- When asked about food cost: reference the food cost data above with specific numbers
- When asked about bank balance: give the current balance and note the date
- When asked about expenses: reference the category breakdown from bank data
- When asked about deposits: reference deposit match data, flag any gaps
- When asked "am I making money": combine POS sales, bank expenses, and invoice data for an estimate
- When asked about trends: reference the daily summaries above
- Proactively flag concerning trends if relevant to the question
- Use line breaks sparingly for readability in SMS
"""
    return prompt

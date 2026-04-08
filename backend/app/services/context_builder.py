from datetime import date, datetime, timedelta

from sqlalchemy import select, and_, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bank import PlaidToken, BankTransaction, DepositMatch
from app.models.invoice import Invoice, InvoiceItem
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import DailySummary


async def get_recent_summaries(
    db: AsyncSession, restaurant_id: int, days: int = 30
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
    db: AsyncSession, restaurant_id: int, days: int = 30
) -> dict | None:
    cutoff = date.today() - timedelta(days=days)

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


async def get_invoice_history(
    db: AsyncSession, restaurant_id: int, limit: int = 10
) -> list[dict]:
    result = await db.execute(
        select(Invoice).where(
            and_(
                Invoice.restaurant_id == restaurant_id,
                Invoice.status == "confirmed",
            )
        ).order_by(Invoice.invoice_date.desc()).limit(limit)
    )
    invoices = result.scalars().all()

    history = []
    for inv in invoices:
        result = await db.execute(
            select(InvoiceItem).where(InvoiceItem.invoice_id == inv.id)
            .order_by(InvoiceItem.total_price.desc()).limit(5)
        )
        top_items = result.scalars().all()
        history.append({
            "vendor": inv.vendor_name,
            "date": str(inv.invoice_date) if inv.invoice_date else "Unknown",
            "total": inv.total_amount,
            "top_items": [
                f"{i.product_name} ${i.unit_price:.2f}/{i.unit or 'ea'}"
                for i in top_items if i.unit_price
            ],
        })
    return history


async def get_weekly_comparison(
    db: AsyncSession, restaurant_id: int
) -> dict | None:
    today = date.today()
    this_week_start = today - timedelta(days=today.weekday())
    last_week_start = this_week_start - timedelta(days=7)
    last_week_end = this_week_start - timedelta(days=1)

    result = await db.execute(
        select(
            sa_func.sum(DailySummary.total_sales),
            sa_func.sum(DailySummary.order_count),
            sa_func.avg(DailySummary.labor_percentage),
        ).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date >= this_week_start,
                DailySummary.summary_date <= today,
            )
        )
    )
    this_week = result.first()

    result = await db.execute(
        select(
            sa_func.sum(DailySummary.total_sales),
            sa_func.sum(DailySummary.order_count),
            sa_func.avg(DailySummary.labor_percentage),
        ).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date >= last_week_start,
                DailySummary.summary_date <= last_week_end,
            )
        )
    )
    last_week = result.first()

    if not this_week[0] and not last_week[0]:
        return None

    return {
        "this_week_sales": round(this_week[0] or 0, 0),
        "this_week_orders": this_week[1] or 0,
        "this_week_labor": round(this_week[2] or 0, 1),
        "last_week_sales": round(last_week[0] or 0, 0),
        "last_week_orders": last_week[1] or 0,
        "last_week_labor": round(last_week[2] or 0, 1),
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
    summary["total_monthly_expenses"] = sum(expenses.values())

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
    invoice_history: list[dict] | None = None,
    weekly_comparison: dict | None = None,
    realtime: dict | None = None,
) -> str:
    prompt = f"""You are Expo, an SMS-based AI business partner for restaurant owners. You communicate via text message.

PERSONALITY:
- You're a knowledgeable restaurant industry partner, not a generic AI or a dashboard
- Talk like a smart friend who happens to know everything about their business
- Be direct, specific, and actionable — always reference real numbers
- When giving advice, reason through the problem using their actual data
- Keep responses conversational but concise — under 400 characters when possible
- Never make up data. If you don't have information, say so honestly.
- It's okay to give longer responses when the question needs it (comparisons, advice, summaries)

RESTAURANT PROFILE:
- Name: {restaurant.restaurant_name}
- Owner: {restaurant.owner_name}
- Type: {restaurant.restaurant_type or "Not specified"}
- Hours: {restaurant.hours or "Not specified"}
- Food cost target: {restaurant.food_cost_baseline or "Not set"}%

CURRENT SETTINGS:
- Morning recap: {"enabled" if getattr(restaurant, 'recap_enabled', True) else "disabled"}, {getattr(restaurant, 'recap_hour', 7)}:{"0" + str(getattr(restaurant, 'recap_minute', 0)) if getattr(restaurant, 'recap_minute', 0) < 10 else getattr(restaurant, 'recap_minute', 0)} {"AM" if getattr(restaurant, 'recap_hour', 7) < 12 else "PM"}
- Alerts: {"enabled" if getattr(restaurant, 'alerts_enabled', True) else "disabled"}
"""

    if summaries:
        prompt += "\nDAILY SUMMARIES (last 30 days):\n"
        for s in summaries:
            weekday = s.summary_date.strftime("%a")
            prompt += (
                f"- {s.summary_date} ({weekday}): ${s.total_sales:.0f} sales, "
                f"{s.order_count} orders, ${s.avg_ticket:.2f} avg, "
                f"labor {s.labor_percentage:.1f}%\n"
            )
    else:
        prompt += "\nNo daily summaries available yet — data is still being collected.\n"

    if realtime:
        prompt += f"\n🔴 LIVE RIGHT NOW (as of {realtime.get('as_of', 'now')}):\n"
        today = realtime.get("today", {})
        if today:
            prompt += (
                f"- Sales so far: ${today.get('total_sales', 0):,.0f} across {today.get('order_count', 0)} orders (${today.get('avg_ticket', 0):.2f} avg ticket)\n"
                f"- Open orders right now: {today.get('open_orders', 0)}\n"
            )
            if today.get("busiest_hour") is not None:
                h = today["busiest_hour"]
                ampm = "am" if h < 12 else "pm"
                display_h = h if h <= 12 else h - 12
                if display_h == 0: display_h = 12
                prompt += f"- Busiest hour so far: {display_h}{ampm}\n"

        labor = realtime.get("labor", {})
        if labor:
            prompt += (
                f"- Staff clocked in: {labor.get('currently_clocked_in', 0)} people\n"
                f"- Labor cost today: ${labor.get('total_labor_cost_today', 0):,.0f} ({labor.get('labor_percentage', 0):.1f}% of sales)\n"
            )
            for staff in labor.get("staff_on_clock", [])[:5]:
                prompt += f"  - {staff.get('job_title', 'Staff')} (clocked in {staff.get('hours_so_far', 0)}hrs, ${staff.get('cost_so_far', 0):.0f} cost)\n"

        top_items = realtime.get("top_items", [])
        if top_items:
            prompt += "- Top sellers today:\n"
            for item in top_items[:5]:
                prompt += f"  - {item['name']}: {item['qty']} sold (${item['revenue']:,.0f})\n"

        payments = realtime.get("payments", {})
        if payments:
            prompt += f"- Payment mix: ${payments.get('card', 0):,.0f} card, ${payments.get('cash', 0):,.0f} cash, ${payments.get('total_tips', 0):,.0f} tips\n"

        server_perf = realtime.get("server_performance", [])
        if server_perf:
            prompt += "- Server performance today:\n"
            for s in server_perf[:5]:
                prompt += f"  - Team member {s['team_member_id'][:8]}...: ${s['sales']:,.0f} sales, ${s['tips']:,.0f} tips, {s['transactions']} transactions\n"

    if weekly_comparison:
        wc = weekly_comparison
        prompt += f"""
WEEK OVER WEEK:
- This week so far: ${wc['this_week_sales']:,.0f} sales, {wc['this_week_orders']} orders, labor {wc['this_week_labor']:.1f}%
- Last week total: ${wc['last_week_sales']:,.0f} sales, {wc['last_week_orders']} orders, labor {wc['last_week_labor']:.1f}%
"""

    if food_cost:
        prompt += (
            f"\nFOOD COST (last {food_cost['days']} days):\n"
            f"- Total invoices: ${food_cost['invoice_total']:,.0f}\n"
            f"- Total sales: ${food_cost['sales_total']:,.0f}\n"
            f"- Food cost: {food_cost['food_cost_pct']:.1f}%"
        )
        if restaurant.food_cost_baseline:
            prompt += f" (target: {restaurant.food_cost_baseline}%)"
        prompt += "\n"

    if invoice_history:
        prompt += "\nRECENT INVOICES:\n"
        for inv in invoice_history[:5]:
            items_str = ", ".join(inv["top_items"][:3]) if inv["top_items"] else ""
            prompt += f"- {inv['vendor']} ({inv['date']}): ${inv['total']:,.0f}"
            if items_str:
                prompt += f" — {items_str}"
            prompt += "\n"

    if bank_summary:
        prompt += f"\nBANK ACCOUNT ({bank_summary.get('institution', 'Connected')}):\n"
        if bank_summary.get("balance") is not None:
            prompt += f"- Balance: ${bank_summary['balance']:,.0f}"
            if bank_summary.get("balance_date"):
                prompt += f" (as of {bank_summary['balance_date']})"
            prompt += "\n"
        if bank_summary.get("total_monthly_expenses"):
            prompt += f"- Total monthly expenses: ${bank_summary['total_monthly_expenses']:,.0f}\n"
        if bank_summary.get("monthly_expenses"):
            prompt += "- By category:\n"
            for cat, amt in list(bank_summary["monthly_expenses"].items())[:6]:
                prompt += f"  - {cat}: ${amt:,.0f}\n"
        if bank_summary.get("recurring"):
            prompt += "- Recurring bills:\n"
            for r in bank_summary["recurring"][:5]:
                prompt += f"  - {r['name']}: ${r['amount']:,.0f} (~day {r['day_of_month']})\n"

    if alerts:
        prompt += "\nRECENT ALERTS:\n"
        for a in alerts:
            prompt += f"- [{a.severity.upper()}] {a.message}\n"

    prompt += """
GUIDELINES FOR CONVERSATIONS:

Real-Time (Mid-Shift) Questions — USE THE "LIVE RIGHT NOW" DATA ABOVE:
- When asked "how are we doing" / "how's today" / "where are we at": use the LIVE data, not yesterday's
- When asked about specific items ("how many gyros sold"): check top_items from live data
- When asked "who's clocked in" / "who's working": list the staff from live labor data
- When asked "should I send someone home" / "should I cut someone": compare current sales pace vs staff cost from live data
- When asked about current sales, orders, or pace: always use LIVE data first, then compare to historical averages
- When asked about payments or tips today: reference live payment breakdown

Historical Data Questions:
- When asked "how did we do yesterday" or about past days: use the daily summaries
- When asked about trends: look at the daily summaries and identify patterns (up/down/flat, best/worst days)
- When asked to compare periods: use the week-over-week data and daily summaries
- When asked about a specific vendor or product: reference the invoice history

Business Advice:
- When asked "should I raise prices": consider food cost %, average ticket, and whether costs are rising from invoices
- When asked "can I afford to hire": look at labor %, revenue trends, and bank balance vs recurring expenses
- When asked "what should I cut": identify the biggest expense categories from bank data and compare to industry benchmarks
- When asked about scheduling/staffing: look at sales by day of week from summaries to identify slow vs busy days
- When asked "am I making money": estimate by combining monthly sales minus bank expenses minus food costs
- When asked about rent: compare rent (from recurring expenses) to monthly revenue — industry benchmark is under 10%

General:
- When asked about settings: tell them their current settings
- When asked to change a setting: acknowledge naturally, the system handles the change
- When you spot something concerning in the data, mention it even if they didn't ask
- Give actionable advice, not just data — tell them what you'd recommend
- Use line breaks for readability when giving longer answers
"""
    return prompt

from datetime import date, datetime, timedelta

from sqlalchemy import select, and_, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

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
- When asked about trends: reference the daily summaries above
- If asked about bank info or deposits, say that feature is coming soon
- Proactively flag concerning trends if relevant to the question
- Use line breaks sparingly for readability in SMS
"""
    return prompt

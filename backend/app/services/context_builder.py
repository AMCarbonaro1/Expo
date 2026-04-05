from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

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

    if alerts:
        prompt += "\nRECENT ALERTS:\n"
        for a in alerts:
            prompt += f"- [{a.severity.upper()}] {a.message}\n"

    prompt += """
GUIDELINES:
- When asked about sales: reference specific numbers, compare to averages
- When asked about labor: mention percentage and compare to 30% industry target
- When asked "how did we do": give yesterday's sales, compare to average, mention labor %
- When asked about trends: reference the daily summaries above
- If asked something you don't have data for (like food cost or bank info), say that feature is coming soon
- Proactively flag concerning trends if relevant to the question
- Use line breaks sparingly for readability in SMS
"""
    return prompt

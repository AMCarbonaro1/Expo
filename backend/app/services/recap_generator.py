import logging
from datetime import date, timedelta

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert
from app.models.restaurant import Restaurant
from app.models.square_data import DailySummary, Order, OrderItem
from app.services.claude_service import get_claude_response
from app.services.context_builder import get_food_cost_summary

logger = logging.getLogger(__name__)


async def generate_morning_recap(db: AsyncSession, restaurant_id: int) -> str | None:
    yesterday = date.today() - timedelta(days=1)

    # Get yesterday's summary
    result = await db.execute(
        select(DailySummary).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date == yesterday,
            )
        )
    )
    summary = result.scalar_one_or_none()
    if not summary:
        return None

    # Get restaurant info
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one()

    # Get weekday average (last 4 same weekdays)
    past_dates = [yesterday - timedelta(weeks=i) for i in range(1, 5)]
    result = await db.execute(
        select(DailySummary).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date.in_(past_dates),
            )
        )
    )
    past = result.scalars().all()
    weekday_avg = sum(s.total_sales for s in past) / len(past) if past else 0

    # Get top items by revenue
    result = await db.execute(
        select(OrderItem.name, OrderItem.total_money)
        .join(Order, OrderItem.order_id == Order.id)
        .where(
            and_(
                Order.restaurant_id == restaurant_id,
                Order.order_date == yesterday,
            )
        )
        .order_by(OrderItem.total_money.desc())
        .limit(5)
    )
    top_items = result.all()

    # Get recent alerts
    result = await db.execute(
        select(Alert).where(
            and_(
                Alert.restaurant_id == restaurant_id,
                Alert.summary_date == yesterday,
            )
        )
    )
    alerts = result.scalars().all()

    # Build Claude prompt
    weekday_name = yesterday.strftime("%A")
    comparison = ""
    if weekday_avg > 0:
        pct = ((summary.total_sales - weekday_avg) / weekday_avg) * 100
        comparison = f"Compared to typical {weekday_name}: {pct:+.0f}%"

    top_items_str = ", ".join(f"{name}" for name, _ in top_items[:3]) if top_items else "N/A"
    alert_str = "; ".join(a.message for a in alerts) if alerts else "None"

    # Food cost
    food_cost = await get_food_cost_summary(db, restaurant_id)
    food_cost_str = "No invoice data yet"
    if food_cost:
        food_cost_str = (
            f"{food_cost['food_cost_pct']:.1f}% "
            f"(${food_cost['invoice_total']:,.0f} invoices / ${food_cost['sales_total']:,.0f} sales)"
        )

    system = (
        "You are Expo, generating a morning business recap SMS for a restaurant owner. "
        "Keep it under 450 characters (3 SMS segments max). Use line breaks for readability. "
        "Be direct with numbers. Flag anything concerning. End with something encouraging or a tip."
    )

    user_prompt = (
        f"Generate a morning recap for {restaurant.restaurant_name}.\n\n"
        f"Yesterday ({yesterday}, {weekday_name}):\n"
        f"- Sales: ${summary.total_sales:.0f} ({summary.order_count} orders, ${summary.avg_ticket:.2f} avg)\n"
        f"- {comparison}\n"
        f"- Labor: {summary.labor_percentage:.1f}% (${summary.labor_cost:.0f})\n"
        f"- Top sellers: {top_items_str}\n"
        f"- Food cost (7-day): {food_cost_str}\n"
        f"- Alerts: {alert_str}\n\n"
        f"Generate the recap message."
    )

    try:
        response = await get_claude_response(system, [{"role": "user", "content": user_prompt}])
        return response
    except Exception as e:
        logger.error(f"Claude recap failed for restaurant {restaurant_id}: {e}")
        # Fallback template
        return (
            f"GM! Yesterday: ${summary.total_sales:.0f} "
            f"({summary.order_count} orders, ${summary.avg_ticket:.2f} avg). "
            f"Labor: {summary.labor_percentage:.1f}%. "
            f"{'No alerts.' if not alerts else alerts[0].message}"
        )

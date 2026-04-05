import json
from datetime import timedelta

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert
from app.models.square_data import DailySummary


async def check_alerts(
    db: AsyncSession, restaurant_id: int, summary: DailySummary
) -> list[Alert]:
    alerts = []

    # Skip if no data
    if summary.total_sales == 0 and summary.order_count == 0:
        alert = await _create_alert(
            db, restaurant_id, summary,
            alert_type="zero_sales",
            severity="warning",
            message=f"No sales recorded on {summary.summary_date}. Was the restaurant closed, or is Square data missing?",
            data={},
        )
        if alert:
            alerts.append(alert)
        return alerts

    # High labor percentage
    if summary.labor_percentage > 32:
        severity = "critical" if summary.labor_percentage > 38 else "warning"
        alert = await _create_alert(
            db, restaurant_id, summary,
            alert_type="high_labor",
            severity=severity,
            message=(
                f"Labor was {summary.labor_percentage:.1f}% on {summary.summary_date}. "
                f"${summary.labor_cost:.0f} labor on ${summary.total_sales:.0f} sales."
            ),
            data={"labor_pct": summary.labor_percentage, "labor_cost": summary.labor_cost},
        )
        if alert:
            alerts.append(alert)

    # Low sales vs weekday average
    weekday = summary.summary_date.weekday()
    past_dates = [
        summary.summary_date - timedelta(weeks=i) for i in range(1, 5)
    ]
    result = await db.execute(
        select(DailySummary).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date.in_(past_dates),
            )
        )
    )
    past_summaries = result.scalars().all()

    if past_summaries:
        avg_sales = sum(s.total_sales for s in past_summaries) / len(past_summaries)
        if avg_sales > 0:
            pct_diff = ((summary.total_sales - avg_sales) / avg_sales) * 100
            if pct_diff < -20:
                weekday_name = summary.summary_date.strftime("%A")
                severity = "critical" if pct_diff < -35 else "warning"
                alert = await _create_alert(
                    db, restaurant_id, summary,
                    alert_type="low_sales",
                    severity=severity,
                    message=(
                        f"Sales were ${summary.total_sales:.0f} on {summary.summary_date}, "
                        f"{abs(pct_diff):.0f}% below your typical {weekday_name} (${avg_sales:.0f} avg)."
                    ),
                    data={"sales": summary.total_sales, "avg": avg_sales, "pct_diff": pct_diff},
                )
                if alert:
                    alerts.append(alert)

    return alerts


async def _create_alert(
    db: AsyncSession,
    restaurant_id: int,
    summary: DailySummary,
    alert_type: str,
    severity: str,
    message: str,
    data: dict,
) -> Alert | None:
    # Check for duplicate
    result = await db.execute(
        select(Alert).where(
            and_(
                Alert.restaurant_id == restaurant_id,
                Alert.alert_type == alert_type,
                Alert.summary_date == summary.summary_date,
            )
        )
    )
    if result.scalar_one_or_none():
        return None

    alert = Alert(
        restaurant_id=restaurant_id,
        alert_type=alert_type,
        severity=severity,
        message=message,
        data_json=json.dumps(data),
        summary_date=summary.summary_date,
    )
    db.add(alert)
    await db.commit()
    return alert

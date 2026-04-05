import json
from datetime import timedelta

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.alert import Alert
from app.models.invoice import Invoice, InvoiceItem
from app.models.restaurant import Restaurant
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

    # High food cost
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one_or_none()

    if restaurant and restaurant.food_cost_baseline:
        week_start = summary.summary_date - timedelta(days=6)
        result = await db.execute(
            select(Invoice).where(
                and_(
                    Invoice.restaurant_id == restaurant_id,
                    Invoice.status == "confirmed",
                    Invoice.invoice_date >= week_start,
                    Invoice.invoice_date <= summary.summary_date,
                )
            )
        )
        invoices = result.scalars().all()
        invoice_total = sum(i.total_amount or 0 for i in invoices)

        result = await db.execute(
            select(DailySummary).where(
                and_(
                    DailySummary.restaurant_id == restaurant_id,
                    DailySummary.summary_date >= week_start,
                    DailySummary.summary_date <= summary.summary_date,
                )
            )
        )
        week_summaries = result.scalars().all()
        week_sales = sum(s.total_sales for s in week_summaries)

        if invoice_total > 0 and week_sales > 0:
            food_cost_pct = (invoice_total / week_sales) * 100
            diff = food_cost_pct - restaurant.food_cost_baseline
            if diff > 3:
                severity = "critical" if diff > 5 else "warning"
                alert = await _create_alert(
                    db, restaurant_id, summary,
                    alert_type="high_food_cost",
                    severity=severity,
                    message=(
                        f"Food cost is {food_cost_pct:.1f}% this week vs your "
                        f"{restaurant.food_cost_baseline:.0f}% target. "
                        f"${invoice_total:,.0f} in invoices on ${week_sales:,.0f} sales."
                    ),
                    data={"food_cost_pct": food_cost_pct, "target": restaurant.food_cost_baseline},
                )
                if alert:
                    alerts.append(alert)

    return alerts


async def check_price_changes(
    db: AsyncSession, restaurant_id: int, invoice: Invoice
) -> list[Alert]:
    """Check for price increases >10% on confirmed invoice items."""
    alerts = []

    result = await db.execute(
        select(InvoiceItem).where(InvoiceItem.invoice_id == invoice.id)
    )
    current_items = result.scalars().all()

    for item in current_items:
        if not item.unit_price or not item.product_name:
            continue

        # Find previous price for same product from same vendor
        result = await db.execute(
            select(InvoiceItem)
            .join(Invoice, InvoiceItem.invoice_id == Invoice.id)
            .where(
                and_(
                    Invoice.restaurant_id == restaurant_id,
                    Invoice.vendor_name == invoice.vendor_name,
                    Invoice.status == "confirmed",
                    Invoice.id != invoice.id,
                    InvoiceItem.product_name == item.product_name,
                    InvoiceItem.unit_price.isnot(None),
                )
            )
            .order_by(Invoice.invoice_date.desc())
            .limit(1)
        )
        prev_item = result.scalar_one_or_none()

        if prev_item and prev_item.unit_price > 0:
            pct_change = ((item.unit_price - prev_item.unit_price) / prev_item.unit_price) * 100
            if pct_change > 10:
                unit_str = f"/{item.unit}" if item.unit else ""
                alert = Alert(
                    restaurant_id=restaurant_id,
                    alert_type="price_increase",
                    severity="warning",
                    message=(
                        f"{item.product_name} from {invoice.vendor_name} went up "
                        f"{pct_change:.0f}% (${prev_item.unit_price:.2f} → ${item.unit_price:.2f}{unit_str})."
                    ),
                    data_json=json.dumps({
                        "product": item.product_name,
                        "old_price": prev_item.unit_price,
                        "new_price": item.unit_price,
                        "pct_change": pct_change,
                    }),
                    summary_date=invoice.invoice_date or summary.summary_date if 'summary' in dir() else invoice.created_at.date(),
                )
                db.add(alert)
                alerts.append(alert)

    if alerts:
        await db.commit()
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

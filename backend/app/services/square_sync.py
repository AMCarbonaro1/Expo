from collections import Counter
from datetime import date, datetime, timedelta

import httpx
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.square_data import SquareToken, Order, OrderItem, LaborEntry, DailySummary


def cents_to_dollars(amount: dict | None) -> float:
    if not amount:
        return 0.0
    return amount.get("amount", 0) / 100.0


async def get_square_client(db: AsyncSession, restaurant_id: int) -> tuple[httpx.AsyncClient, SquareToken]:
    result = await db.execute(
        select(SquareToken).where(SquareToken.restaurant_id == restaurant_id)
    )
    token = result.scalar_one_or_none()
    if not token:
        raise ValueError(f"No Square token found for restaurant {restaurant_id}")

    client = httpx.AsyncClient(
        base_url="https://connect.squareupsandbox.com/v2",
        headers={"Authorization": f"Bearer {token.access_token}"},
    )
    return client, token


async def sync_orders(db: AsyncSession, restaurant_id: int, target_date: date):
    client, token = await get_square_client(db, restaurant_id)

    start = datetime.combine(target_date, datetime.min.time())
    end = start + timedelta(days=1)

    try:
        resp = await client.post("/orders/search", json={
            "location_ids": [token.merchant_id] if token.merchant_id else [],
            "query": {
                "filter": {
                    "date_time_filter": {
                        "created_at": {
                            "start_at": start.isoformat() + "Z",
                            "end_at": end.isoformat() + "Z",
                        }
                    }
                }
            },
        })
        data = resp.json()
    finally:
        await client.aclose()

    orders = data.get("orders", [])

    for sq_order in orders:
        square_order_id = sq_order["id"]

        # Skip if already exists
        existing = await db.execute(
            select(Order).where(Order.square_order_id == square_order_id)
        )
        if existing.scalar_one_or_none():
            continue

        # Determine payment type from tenders
        tenders = sq_order.get("tenders", [])
        payment_type = tenders[0].get("type", "OTHER") if tenders else "UNKNOWN"

        order = Order(
            restaurant_id=restaurant_id,
            square_order_id=square_order_id,
            total_money=cents_to_dollars(sq_order.get("total_money")),
            tip_money=cents_to_dollars(sq_order.get("total_tip_money")),
            discount_money=cents_to_dollars(sq_order.get("total_discount_money")),
            payment_type=payment_type,
            order_date=target_date,
            created_at_square=datetime.fromisoformat(
                sq_order["created_at"].replace("Z", "+00:00")
            ) if sq_order.get("created_at") else None,
        )
        db.add(order)
        await db.flush()

        for item in sq_order.get("line_items", []):
            order_item = OrderItem(
                order_id=order.id,
                name=item.get("name", "Unknown"),
                quantity=int(item.get("quantity", "1")),
                total_money=cents_to_dollars(item.get("total_money")),
            )
            db.add(order_item)

    await db.commit()
    return len(orders)


async def sync_labor(db: AsyncSession, restaurant_id: int, target_date: date):
    client, token = await get_square_client(db, restaurant_id)

    start = datetime.combine(target_date, datetime.min.time())
    end = start + timedelta(days=1)

    try:
        resp = await client.get("/labor/shifts", params={
            "location_id": token.merchant_id or "",
            "start": start.isoformat() + "Z",
            "end": end.isoformat() + "Z",
        })
        data = resp.json()
    finally:
        await client.aclose()

    shifts = data.get("shifts", [])

    for shift in shifts:
        shift_id = shift["id"]

        existing = await db.execute(
            select(LaborEntry).where(LaborEntry.square_shift_id == shift_id)
        )
        if existing.scalar_one_or_none():
            continue

        start_at = datetime.fromisoformat(shift["start_at"].replace("Z", "+00:00"))
        end_at = (
            datetime.fromisoformat(shift["end_at"].replace("Z", "+00:00"))
            if shift.get("end_at")
            else None
        )
        hours = (end_at - start_at).total_seconds() / 3600 if end_at else 0

        wage = shift.get("wage", {})
        wage_rate = cents_to_dollars(wage.get("hourly_rate"))

        entry = LaborEntry(
            restaurant_id=restaurant_id,
            square_shift_id=shift_id,
            employee_id=shift.get("employee_id") or shift.get("team_member_id"),
            job_title=wage.get("title"),
            start_at=start_at,
            end_at=end_at,
            hours_worked=round(hours, 2),
            wage_rate=wage_rate,
            total_pay=round(hours * wage_rate, 2),
            shift_date=target_date,
        )
        db.add(entry)

    await db.commit()
    return len(shifts)


async def compute_daily_summary(db: AsyncSession, restaurant_id: int, target_date: date):
    # Get orders for the day
    result = await db.execute(
        select(Order).where(
            Order.restaurant_id == restaurant_id,
            Order.order_date == target_date,
        )
    )
    orders = result.scalars().all()

    # Get labor for the day
    result = await db.execute(
        select(LaborEntry).where(
            LaborEntry.restaurant_id == restaurant_id,
            LaborEntry.shift_date == target_date,
        )
    )
    labor = result.scalars().all()

    total_sales = sum(o.total_money for o in orders)
    order_count = len(orders)
    avg_ticket = total_sales / order_count if order_count else 0
    cash_sales = sum(o.total_money for o in orders if o.payment_type == "CASH")
    card_sales = sum(o.total_money for o in orders if o.payment_type in ("CARD", "SQUARE_GIFT_CARD"))
    total_tips = sum(o.tip_money for o in orders)
    total_discounts = sum(o.discount_money for o in orders)

    labor_cost = sum(e.total_pay for e in labor)
    labor_hours = sum(e.hours_worked for e in labor)
    labor_percentage = (labor_cost / total_sales * 100) if total_sales else 0

    # Busiest hour
    hour_counter = Counter()
    for o in orders:
        if o.created_at_square:
            hour_counter[o.created_at_square.hour] += 1
    busiest_hour = hour_counter.most_common(1)[0][0] if hour_counter else None

    # Upsert daily summary
    result = await db.execute(
        select(DailySummary).where(
            DailySummary.restaurant_id == restaurant_id,
            DailySummary.summary_date == target_date,
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        summary = existing
    else:
        summary = DailySummary(restaurant_id=restaurant_id, summary_date=target_date)
        db.add(summary)

    summary.total_sales = round(total_sales, 2)
    summary.order_count = order_count
    summary.avg_ticket = round(avg_ticket, 2)
    summary.cash_sales = round(cash_sales, 2)
    summary.card_sales = round(card_sales, 2)
    summary.total_tips = round(total_tips, 2)
    summary.total_discounts = round(total_discounts, 2)
    summary.labor_cost = round(labor_cost, 2)
    summary.labor_hours = round(labor_hours, 2)
    summary.labor_percentage = round(labor_percentage, 1)
    summary.busiest_hour = busiest_hour

    await db.commit()
    await db.refresh(summary)
    return summary

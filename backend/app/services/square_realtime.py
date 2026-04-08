"""Real-time Square API queries for mid-shift questions."""
import logging
from collections import Counter, defaultdict
from datetime import datetime, timezone

import httpx
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.square_data import SquareToken

logger = logging.getLogger(__name__)


async def _get_square_token(db: AsyncSession, restaurant_id: int) -> SquareToken | None:
    result = await db.execute(
        select(SquareToken).where(SquareToken.restaurant_id == restaurant_id)
    )
    return result.scalar_one_or_none()


async def _square_get(token: str, endpoint: str, params: dict | None = None) -> dict:
    base = settings.square_base_url + "/v2"
    async with httpx.AsyncClient() as client:
        resp = await client.get(
            f"{base}{endpoint}",
            headers={"Authorization": f"Bearer {token}"},
            params=params or {},
            timeout=15.0,
        )
        return resp.json()


async def _square_post(token: str, endpoint: str, body: dict) -> dict:
    base = settings.square_base_url + "/v2"
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{base}{endpoint}",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            json=body,
            timeout=15.0,
        )
        return resp.json()


def _cents_to_dollars(amount: dict | None) -> float:
    if not amount:
        return 0.0
    return amount.get("amount", 0) / 100.0


def _today_start_iso() -> str:
    now = datetime.now(timezone.utc)
    return now.replace(hour=0, minute=0, second=0, microsecond=0).isoformat()


async def get_realtime_snapshot(db: AsyncSession, restaurant_id: int) -> dict | None:
    """Get a full real-time snapshot of today's restaurant activity from Square."""
    token_record = await _get_square_token(db, restaurant_id)
    if not token_record:
        return None

    access_token = token_record.access_token
    merchant_id = token_record.merchant_id
    today_start = _today_start_iso()

    snapshot = {
        "as_of": datetime.now(timezone.utc).strftime("%I:%M %p UTC"),
        "today": {},
        "labor": {},
        "top_items": [],
        "payments": {},
    }

    try:
        # 1. Today's orders
        orders_data = await _square_post(access_token, "/orders/search", {
            "location_ids": [merchant_id] if merchant_id else [],
            "query": {
                "filter": {
                    "date_time_filter": {
                        "created_at": {"start_at": today_start}
                    },
                    "state_filter": {"states": ["COMPLETED", "OPEN"]}
                }
            },
        })
        orders = orders_data.get("orders", [])

        total_sales = 0.0
        order_count = 0
        item_counter: Counter = Counter()
        item_revenue: defaultdict = defaultdict(float)
        hourly_sales: defaultdict = defaultdict(float)

        for order in orders:
            order_total = _cents_to_dollars(order.get("total_money"))
            total_sales += order_total
            order_count += 1

            # Hourly bucket
            created = order.get("created_at", "")
            if created:
                try:
                    hour = datetime.fromisoformat(created.replace("Z", "+00:00")).hour
                    hourly_sales[hour] += order_total
                except Exception:
                    pass

            # Line items
            for item in order.get("line_items", []):
                name = item.get("name", "Unknown")
                qty = int(item.get("quantity", "1"))
                revenue = _cents_to_dollars(item.get("total_money"))
                item_counter[name] += qty
                item_revenue[name] += revenue

        avg_ticket = total_sales / order_count if order_count else 0

        snapshot["today"] = {
            "total_sales": round(total_sales, 2),
            "order_count": order_count,
            "avg_ticket": round(avg_ticket, 2),
            "open_orders": sum(1 for o in orders if o.get("state") == "OPEN"),
        }

        # Top items by quantity
        snapshot["top_items"] = [
            {"name": name, "qty": qty, "revenue": round(item_revenue[name], 2)}
            for name, qty in item_counter.most_common(10)
        ]

        # Busiest hour so far
        if hourly_sales:
            busiest = max(hourly_sales, key=hourly_sales.get)
            snapshot["today"]["busiest_hour"] = busiest
            snapshot["today"]["hourly_sales"] = {str(h): round(v, 2) for h, v in sorted(hourly_sales.items())}

        # 2. Who's clocked in (open timecards)
        labor_data = await _square_post(access_token, "/labor/timecards/search", {
            "query": {
                "filter": {
                    "location_ids": [merchant_id] if merchant_id else [],
                    "status": "OPEN",
                }
            }
        })
        open_timecards = labor_data.get("timecards", [])

        clocked_in = []
        total_labor_cost_so_far = 0.0
        total_hours_so_far = 0.0

        for tc in open_timecards:
            start = tc.get("start_at", "")
            wage_info = tc.get("wage", {})
            hourly_rate = _cents_to_dollars(wage_info.get("hourly_rate"))
            job_title = wage_info.get("title", "")
            team_member_id = tc.get("team_member_id", "")

            hours = 0
            if start:
                try:
                    start_dt = datetime.fromisoformat(start.replace("Z", "+00:00"))
                    hours = (datetime.now(timezone.utc) - start_dt).total_seconds() / 3600
                except Exception:
                    pass

            cost = round(hours * hourly_rate, 2)
            total_labor_cost_so_far += cost
            total_hours_so_far += hours

            clocked_in.append({
                "team_member_id": team_member_id,
                "job_title": job_title,
                "clocked_in_at": start,
                "hours_so_far": round(hours, 1),
                "hourly_rate": hourly_rate,
                "cost_so_far": cost,
            })

        # Also get closed timecards for today
        closed_labor = await _square_post(access_token, "/labor/timecards/search", {
            "query": {
                "filter": {
                    "location_ids": [merchant_id] if merchant_id else [],
                    "status": "CLOSED",
                    "start_at": {"start_at": today_start},
                }
            }
        })
        for tc in closed_labor.get("timecards", []):
            start = tc.get("start_at", "")
            end = tc.get("end_at", "")
            wage_info = tc.get("wage", {})
            hourly_rate = _cents_to_dollars(wage_info.get("hourly_rate"))
            if start and end:
                try:
                    start_dt = datetime.fromisoformat(start.replace("Z", "+00:00"))
                    end_dt = datetime.fromisoformat(end.replace("Z", "+00:00"))
                    hours = (end_dt - start_dt).total_seconds() / 3600
                    total_labor_cost_so_far += round(hours * hourly_rate, 2)
                    total_hours_so_far += hours
                except Exception:
                    pass

        labor_pct = (total_labor_cost_so_far / total_sales * 100) if total_sales else 0

        snapshot["labor"] = {
            "currently_clocked_in": len(clocked_in),
            "staff_on_clock": clocked_in,
            "total_labor_cost_today": round(total_labor_cost_so_far, 2),
            "total_labor_hours_today": round(total_hours_so_far, 1),
            "labor_percentage": round(labor_pct, 1),
        }

        # 3. Payments breakdown
        payments_data = await _square_get(access_token, "/payments", {
            "begin_time": today_start,
            "limit": 200,
        })
        payments = payments_data.get("payments", [])

        cash_total = 0.0
        card_total = 0.0
        other_total = 0.0
        total_tips = 0.0
        server_sales: defaultdict = defaultdict(lambda: {"sales": 0.0, "tips": 0.0, "count": 0})

        for p in payments:
            amount = _cents_to_dollars(p.get("total_money"))
            tip = _cents_to_dollars(p.get("tip_money"))
            total_tips += tip
            source = p.get("source_type", "OTHER")
            if source == "CASH":
                cash_total += amount
            elif source == "CARD":
                card_total += amount
            else:
                other_total += amount

            tm_id = p.get("team_member_id", "unknown")
            server_sales[tm_id]["sales"] += amount
            server_sales[tm_id]["tips"] += tip
            server_sales[tm_id]["count"] += 1

        snapshot["payments"] = {
            "cash": round(cash_total, 2),
            "card": round(card_total, 2),
            "other": round(other_total, 2),
            "total_tips": round(total_tips, 2),
        }

        snapshot["server_performance"] = [
            {"team_member_id": k, "sales": round(v["sales"], 2), "tips": round(v["tips"], 2), "transactions": v["count"]}
            for k, v in sorted(server_sales.items(), key=lambda x: x[1]["sales"], reverse=True)
        ]

    except Exception as e:
        logger.error(f"Real-time Square query failed for restaurant {restaurant_id}: {e}")
        return None

    return snapshot

import logging
from datetime import date, timedelta

from sqlalchemy import select, or_

from app.database import async_session
from app.models.bank import PlaidToken
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken
from app.services.alert_engine import check_alerts, check_bank_alerts
from app.services.deposit_matching import match_deposits
from app.services.plaid_sync import sync_transactions, sync_balances, detect_recurring_transactions
from app.services.square_sync import sync_orders, sync_labor, compute_daily_summary

logger = logging.getLogger(__name__)


async def run_nightly_pipeline():
    target_date = date.today() - timedelta(days=1)
    logger.info(f"Starting nightly pipeline for {target_date}")

    # Get all restaurants with Square or Plaid tokens
    async with async_session() as db:
        result = await db.execute(
            select(Restaurant)
            .outerjoin(SquareToken)
            .outerjoin(PlaidToken)
            .where(or_(SquareToken.id.isnot(None), PlaidToken.id.isnot(None)))
        )
        restaurants = result.unique().scalars().all()

    logger.info(f"Found {len(restaurants)} restaurants to process")

    results = []
    for restaurant in restaurants:
        try:
            async with async_session() as db:
                orders_count = 0
                shifts_count = 0
                alert_count = 0
                bank_synced = False

                # Square sync
                sq_result = await db.execute(
                    select(SquareToken).where(SquareToken.restaurant_id == restaurant.id)
                )
                if sq_result.scalar_one_or_none():
                    orders_count = await sync_orders(db, restaurant.id, target_date)
                    shifts_count = await sync_labor(db, restaurant.id, target_date)
                    summary = await compute_daily_summary(db, restaurant.id, target_date)
                    alerts = await check_alerts(db, restaurant.id, summary)
                    alert_count += len(alerts)

                # Bank sync
                plaid_result = await db.execute(
                    select(PlaidToken).where(PlaidToken.restaurant_id == restaurant.id)
                )
                if plaid_result.scalar_one_or_none():
                    bank_synced = True
                    await sync_transactions(db, restaurant.id)
                    await sync_balances(db, restaurant.id)
                    await detect_recurring_transactions(db, restaurant.id)
                    await match_deposits(db, restaurant.id, target_date)
                    bank_alerts = await check_bank_alerts(db, restaurant.id, target_date)
                    alert_count += len(bank_alerts)

                results.append({
                    "restaurant_id": restaurant.id,
                    "name": restaurant.restaurant_name,
                    "orders": orders_count,
                    "shifts": shifts_count,
                    "bank_synced": bank_synced,
                    "alerts": alert_count,
                })
                logger.info(
                    f"  {restaurant.restaurant_name}: "
                    f"{orders_count} orders, {shifts_count} shifts, "
                    f"bank={'yes' if bank_synced else 'no'}, {alert_count} alerts"
                )
        except Exception as e:
            logger.error(f"  Failed for {restaurant.restaurant_name} (id={restaurant.id}): {e}")
            results.append({
                "restaurant_id": restaurant.id,
                "name": restaurant.restaurant_name,
                "error": str(e),
            })

    logger.info(f"Nightly pipeline complete. Processed {len(results)} restaurants.")
    return results

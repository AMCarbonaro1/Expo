import logging
from datetime import date, timedelta

from sqlalchemy import select

from app.database import async_session
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken
from app.services.alert_engine import check_alerts
from app.services.square_sync import sync_orders, sync_labor, compute_daily_summary

logger = logging.getLogger(__name__)


async def run_nightly_pipeline():
    target_date = date.today() - timedelta(days=1)
    logger.info(f"Starting nightly pipeline for {target_date}")

    # Get all restaurants with Square tokens
    async with async_session() as db:
        result = await db.execute(
            select(Restaurant).join(SquareToken)
        )
        restaurants = result.scalars().all()

    logger.info(f"Found {len(restaurants)} restaurants to process")

    results = []
    for restaurant in restaurants:
        try:
            async with async_session() as db:
                orders_count = await sync_orders(db, restaurant.id, target_date)
                shifts_count = await sync_labor(db, restaurant.id, target_date)
                summary = await compute_daily_summary(db, restaurant.id, target_date)
                alerts = await check_alerts(db, restaurant.id, summary)

                results.append({
                    "restaurant_id": restaurant.id,
                    "name": restaurant.restaurant_name,
                    "orders": orders_count,
                    "shifts": shifts_count,
                    "alerts": len(alerts),
                })
                logger.info(
                    f"  {restaurant.restaurant_name}: "
                    f"{orders_count} orders, {shifts_count} shifts, {len(alerts)} alerts"
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

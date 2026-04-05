import logging
from datetime import date, timedelta

from sqlalchemy import select, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bank import PlaidToken
from app.models.square_data import SquareToken, DailySummary
from app.services.plaid_sync import sync_transactions, sync_balances
from app.services.square_sync import sync_orders, sync_labor, compute_daily_summary

logger = logging.getLogger(__name__)


async def maybe_first_sync(db: AsyncSession, restaurant_id: int):
    """Run initial data sync if this restaurant has no summaries yet."""
    result = await db.execute(
        select(sa_func.count()).select_from(DailySummary).where(
            DailySummary.restaurant_id == restaurant_id
        )
    )
    count = result.scalar()
    if count and count > 0:
        return  # Already has data

    logger.info(f"First sync for restaurant {restaurant_id}")

    # Sync Square data for the last 7 days
    sq_result = await db.execute(
        select(SquareToken).where(SquareToken.restaurant_id == restaurant_id)
    )
    if sq_result.scalar_one_or_none():
        for days_ago in range(7, 0, -1):
            target = date.today() - timedelta(days=days_ago)
            try:
                await sync_orders(db, restaurant_id, target)
                await sync_labor(db, restaurant_id, target)
                await compute_daily_summary(db, restaurant_id, target)
            except Exception as e:
                logger.error(f"Square sync failed for {target}: {e}")

    # Sync bank data
    plaid_result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == restaurant_id)
    )
    if plaid_result.scalar_one_or_none():
        try:
            await sync_transactions(db, restaurant_id)
            await sync_balances(db, restaurant_id)
        except Exception as e:
            logger.error(f"Bank sync failed: {e}")

    logger.info(f"First sync complete for restaurant {restaurant_id}")

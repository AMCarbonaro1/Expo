import logging
from datetime import datetime

from sqlalchemy import select

from app.database import async_session
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken
from app.services.recap_generator import generate_morning_recap
from app.services.twilio_sms import send_sms

logger = logging.getLogger(__name__)


async def send_morning_recaps():
    """Send recaps to restaurants whose preferred time matches now (within 15-min window)."""
    now = datetime.utcnow()
    current_hour = now.hour
    current_minute = now.minute

    async with async_session() as db:
        result = await db.execute(
            select(Restaurant).join(SquareToken).where(
                Restaurant.recap_enabled == True,
            )
        )
        restaurants = result.scalars().all()

    # Filter to restaurants whose recap time falls in this 15-min window
    due = []
    for r in restaurants:
        r_hour = r.recap_hour if r.recap_hour is not None else 7
        r_minute = r.recap_minute if r.recap_minute is not None else 0
        if r_hour == current_hour and r_minute <= current_minute < r_minute + 15:
            due.append(r)

    if not due:
        return

    logger.info(f"Sending recaps to {len(due)} restaurants at {current_hour}:{current_minute:02d}")

    for restaurant in due:
        try:
            async with async_session() as db:
                recap = await generate_morning_recap(db, restaurant.id)
                if not recap:
                    logger.info(f"  No data for {restaurant.restaurant_name}, skipping")
                    continue

                msg = Message(
                    restaurant_id=restaurant.id,
                    direction="out",
                    body=recap,
                )
                db.add(msg)
                await db.commit()

                await send_sms(restaurant.phone, recap)
                logger.info(f"  Sent recap to {restaurant.restaurant_name}")

        except Exception as e:
            logger.error(f"  Failed recap for {restaurant.restaurant_name}: {e}")

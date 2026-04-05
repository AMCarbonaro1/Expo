import logging

from sqlalchemy import select

from app.database import async_session
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.models.square_data import SquareToken
from app.services.recap_generator import generate_morning_recap
from app.services.twilio_sms import send_sms

logger = logging.getLogger(__name__)


async def send_morning_recaps():
    logger.info("Starting morning recaps")

    async with async_session() as db:
        result = await db.execute(
            select(Restaurant).join(SquareToken)
        )
        restaurants = result.scalars().all()

    logger.info(f"Sending recaps to {len(restaurants)} restaurants")

    for restaurant in restaurants:
        try:
            async with async_session() as db:
                recap = await generate_morning_recap(db, restaurant.id)
                if not recap:
                    logger.info(f"  No data for {restaurant.restaurant_name}, skipping")
                    continue

                # Store as outbound message
                msg = Message(
                    restaurant_id=restaurant.id,
                    direction="out",
                    body=recap,
                )
                db.add(msg)
                await db.commit()

                # Send via SMS
                await send_sms(restaurant.phone, recap)
                logger.info(f"  Sent recap to {restaurant.restaurant_name}")

        except Exception as e:
            logger.error(f"  Failed recap for {restaurant.restaurant_name}: {e}")

    logger.info("Morning recaps complete")

import asyncio
import logging

from fastapi import APIRouter, Depends, Request
from fastapi.responses import Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db, async_session
from app.models.message import Message
from app.models.restaurant import Restaurant
from app.services.conversation import handle_incoming_message
from app.services.twilio_sms import normalize_phone, send_sms

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/sms", tags=["sms"])

EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response/>'


async def process_and_reply(
    restaurant_id: int,
    body: str,
    phone: str,
    media_url: str | None = None,
    media_content_type: str | None = None,
):
    """Process incoming message and send reply. Runs as background task."""
    try:
        async with async_session() as db:
            reply = await handle_incoming_message(
                db, restaurant_id, body,
                media_url=media_url,
                media_content_type=media_content_type,
            )
            await send_sms(phone, reply)
    except Exception as e:
        logger.error(f"Error processing message for restaurant {restaurant_id}: {e}")


@router.post("/webhook")
async def twilio_webhook(
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    form = await request.form()
    from_number = str(form.get("From", ""))
    body = str(form.get("Body", ""))
    num_media = int(form.get("NumMedia", 0))

    # Extract MMS media if present
    media_url = None
    media_content_type = None
    if num_media > 0:
        media_url = str(form.get("MediaUrl0", ""))
        media_content_type = str(form.get("MediaContentType0", ""))
        if num_media > 1:
            logger.info(f"Multiple images received ({num_media}), processing first only")

    normalized = normalize_phone(from_number)
    digits_only = normalized.lstrip("+").lstrip("1") if len(normalized) > 11 else normalized.lstrip("+")

    # Look up restaurant by phone
    result = await db.execute(
        select(Restaurant).where(
            Restaurant.phone.in_([normalized, digits_only, from_number])
        )
    )
    restaurant = result.scalar_one_or_none()

    if not restaurant:
        return Response(
            content='<?xml version="1.0" encoding="UTF-8"?>'
            "<Response><Message>This number isn't registered with Expo.</Message></Response>",
            media_type="application/xml",
        )

    # Store inbound message
    in_msg = Message(
        restaurant_id=restaurant.id,
        direction="in",
        body=body,
        media_url=media_url,
        media_content_type=media_content_type,
    )
    db.add(in_msg)
    await db.commit()

    # Process and reply asynchronously
    asyncio.create_task(
        process_and_reply(
            restaurant.id, body, from_number,
            media_url=media_url,
            media_content_type=media_content_type,
        )
    )

    return Response(content=EMPTY_TWIML, media_type="application/xml")

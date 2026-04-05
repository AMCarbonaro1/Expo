from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.message import Message
from app.models.restaurant import Restaurant
from app.services.claude_service import get_claude_response
from app.services.context_builder import (
    build_conversation_history,
    build_system_prompt,
    get_recent_messages,
    get_recent_summaries,
)


async def handle_incoming_message(
    db: AsyncSession, restaurant_id: int, body: str
) -> str:
    # Fetch restaurant
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one()

    # Build context
    summaries = await get_recent_summaries(db, restaurant_id)
    # alerts will be added in Batch 3
    system_prompt = build_system_prompt(restaurant, summaries, alerts=None)

    # Get conversation history (excluding the current message, which was already stored)
    recent_messages = await get_recent_messages(db, restaurant_id)
    conversation = build_conversation_history(recent_messages)

    # Add the new incoming message
    conversation.append({"role": "user", "content": body})

    # Get Claude's response
    response = await get_claude_response(system_prompt, conversation)

    # Store the outbound message
    out_msg = Message(
        restaurant_id=restaurant_id,
        direction="out",
        body=response,
    )
    db.add(out_msg)
    await db.commit()

    return response

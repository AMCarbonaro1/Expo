import re

import httpx

from app.config import settings


def normalize_phone(raw: str) -> str:
    digits = re.sub(r"\D", "", raw)
    if len(digits) == 10:
        digits = "1" + digits
    return f"+{digits}"


async def send_sms(to: str, body: str) -> str:
    url = (
        f"https://api.twilio.com/2010-04-01/Accounts"
        f"/{settings.twilio_account_sid}/Messages.json"
    )
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            url,
            auth=(settings.twilio_account_sid, settings.twilio_auth_token),
            data={
                "To": to,
                "From": settings.twilio_phone_number,
                "Body": body,
            },
        )
        data = resp.json()
        return data.get("sid", "")

import json
import logging
import re

import httpx

from app.config import settings

logger = logging.getLogger(__name__)

PARSE_SYSTEM_PROMPT = """You are an invoice data extraction assistant. Given OCR text from a restaurant supplier invoice, extract structured data.

Return ONLY valid JSON with this exact schema:
{
  "is_invoice": true,
  "vendor_name": "string",
  "invoice_date": "YYYY-MM-DD or null",
  "line_items": [
    {"product_name": "string", "quantity": number_or_null, "unit": "string_or_null", "unit_price": number_or_null, "total_price": number_or_null}
  ],
  "total_amount": number_or_null
}

If the text does NOT appear to be a supplier invoice, return:
{"is_invoice": false}

Guidelines:
- Handle OCR noise: misspellings, alignment issues, partial text
- Quantities can be fractional (e.g., 2.5 lbs)
- Prices are in USD
- Common units: lb, cs (case), ea (each), oz, gal, bag, box
- If you can't determine a field, use null
- Do NOT include any text outside the JSON"""


async def parse_invoice_text(ocr_text: str) -> dict:
    """Send OCR text to Claude for structured parsing."""
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                "https://api.anthropic.com/v1/messages",
                headers={
                    "x-api-key": settings.anthropic_api_key,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json",
                },
                json={
                    "model": "claude-sonnet-4-20250514",
                    "max_tokens": 1024,
                    "system": PARSE_SYSTEM_PROMPT,
                    "messages": [{"role": "user", "content": ocr_text}],
                },
                timeout=30.0,
            )
            data = resp.json()

        if "content" not in data or not data["content"]:
            logger.error(f"Claude parse error: {data}")
            return {"is_invoice": False}

        text = data["content"][0]["text"]

        # Strip markdown code fences if present
        text = re.sub(r"^```(?:json)?\s*", "", text.strip())
        text = re.sub(r"\s*```$", "", text.strip())

        return json.loads(text)

    except (json.JSONDecodeError, Exception) as e:
        logger.error(f"Invoice parse error: {e}")
        return {"is_invoice": False}


def build_confirmation_message(parsed: dict) -> str:
    """Build SMS confirmation message from parsed invoice data."""
    vendor = parsed.get("vendor_name", "Unknown vendor")
    total = parsed.get("total_amount")
    items = parsed.get("line_items", [])
    inv_date = parsed.get("invoice_date", "")

    date_str = f" from {inv_date}" if inv_date else ""
    total_str = f"${total:,.2f}" if total else "unknown"
    count = len(items)

    # Pick top 2 items by unit price to highlight
    priced_items = [i for i in items if i.get("unit_price")]
    priced_items.sort(key=lambda x: x["unit_price"], reverse=True)
    highlights = []
    for item in priced_items[:2]:
        unit = f"/{item['unit']}" if item.get("unit") else ""
        highlights.append(f"{item['product_name']} ${item['unit_price']:.2f}{unit}")

    msg = f"Got your {vendor} invoice{date_str}. {count} items, {total_str} total."
    if highlights:
        msg += f" Notable: {', '.join(highlights)}."
    msg += " Look right? Reply YES to confirm or tell me what to fix."

    return msg

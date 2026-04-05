import logging
from datetime import date, datetime

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.invoice import Invoice, InvoiceItem
from app.services.invoice_parser import build_confirmation_message, parse_invoice_text
from app.services.ocr_service import extract_text_from_image
from app.services.s3_storage import download_and_store_image

logger = logging.getLogger(__name__)


async def get_pending_invoice(db: AsyncSession, restaurant_id: int) -> Invoice | None:
    result = await db.execute(
        select(Invoice)
        .where(
            and_(
                Invoice.restaurant_id == restaurant_id,
                Invoice.status == "pending",
            )
        )
        .order_by(Invoice.created_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def process_invoice_image(
    db: AsyncSession, restaurant_id: int, media_url: str, content_type: str
) -> str:
    """Full pipeline: download → S3 → OCR → parse → store → confirmation."""
    # Check for pending invoice
    pending = await get_pending_invoice(db, restaurant_id)
    if pending:
        return "You still have a pending invoice. Reply YES to confirm or NO to discard it first, then send the new one."

    try:
        # Download and store in S3
        s3_url, image_bytes = await download_and_store_image(media_url, restaurant_id)

        # OCR
        ocr_text = await extract_text_from_image(image_bytes)
        if not ocr_text.strip():
            return "I couldn't read any text from that image. Could you try a clearer photo?"

        # Parse with Claude
        parsed = await parse_invoice_text(ocr_text)

        if not parsed.get("is_invoice", False):
            return "That doesn't look like a supplier invoice. If it is, try sending a clearer photo."

        # Parse invoice date
        invoice_date = None
        if parsed.get("invoice_date"):
            try:
                invoice_date = date.fromisoformat(parsed["invoice_date"])
            except ValueError:
                pass

        # Store invoice
        invoice = Invoice(
            restaurant_id=restaurant_id,
            vendor_name=parsed.get("vendor_name"),
            invoice_date=invoice_date,
            total_amount=parsed.get("total_amount"),
            image_url=s3_url,
            ocr_text=ocr_text,
            status="pending",
        )
        db.add(invoice)
        await db.flush()

        # Store line items
        for item in parsed.get("line_items", []):
            inv_item = InvoiceItem(
                invoice_id=invoice.id,
                product_name=item.get("product_name", "Unknown"),
                quantity=item.get("quantity"),
                unit=item.get("unit"),
                unit_price=item.get("unit_price"),
                total_price=item.get("total_price"),
            )
            db.add(inv_item)

        await db.commit()

        return build_confirmation_message(parsed)

    except Exception as e:
        logger.error(f"Invoice processing error: {e}")
        return "I had trouble reading that invoice. Could you try sending a clearer photo?"


async def confirm_invoice(db: AsyncSession, restaurant_id: int) -> str:
    from app.services.alert_engine import check_price_changes

    invoice = await get_pending_invoice(db, restaurant_id)
    if not invoice:
        return "No pending invoice to confirm."

    invoice.status = "confirmed"
    await db.commit()

    # Check for price changes
    price_alerts = await check_price_changes(db, restaurant_id, invoice)

    vendor = invoice.vendor_name or "vendor"
    total = f"${invoice.total_amount:,.2f}" if invoice.total_amount else ""
    date_str = f" on {invoice.invoice_date}" if invoice.invoice_date else ""

    msg = f"Invoice confirmed. I've logged {total} from {vendor}{date_str}."
    if price_alerts:
        msg += f" Heads up: {price_alerts[0].message}"

    return msg


async def reject_invoice(db: AsyncSession, restaurant_id: int) -> str:
    invoice = await get_pending_invoice(db, restaurant_id)
    if not invoice:
        return "No pending invoice to discard."

    invoice.status = "rejected"
    await db.commit()

    return "Got it, I've discarded that invoice. Feel free to send it again."

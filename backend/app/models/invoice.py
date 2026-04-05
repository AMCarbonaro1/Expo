from datetime import date, datetime

from sqlalchemy import String, Float, Text, Date, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Invoice(Base):
    __tablename__ = "invoices"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    vendor_name: Mapped[str | None] = mapped_column(String(255))
    invoice_date: Mapped[date | None] = mapped_column(Date)
    total_amount: Mapped[float | None] = mapped_column(Float)
    image_url: Mapped[str] = mapped_column(String(1024))
    ocr_text: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20), default="pending")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class InvoiceItem(Base):
    __tablename__ = "invoice_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    invoice_id: Mapped[int] = mapped_column(ForeignKey("invoices.id"))
    product_name: Mapped[str] = mapped_column(String(255))
    quantity: Mapped[float | None] = mapped_column(Float)
    unit: Mapped[str | None] = mapped_column(String(50))
    unit_price: Mapped[float | None] = mapped_column(Float)
    total_price: Mapped[float | None] = mapped_column(Float)

from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Message(Base):
    __tablename__ = "messages"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    direction: Mapped[str] = mapped_column(String(3))  # "in" or "out"
    body: Mapped[str] = mapped_column(Text)
    twilio_sid: Mapped[str | None] = mapped_column(String(255))
    media_url: Mapped[str | None] = mapped_column(String(1024))
    media_content_type: Mapped[str | None] = mapped_column(String(100))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

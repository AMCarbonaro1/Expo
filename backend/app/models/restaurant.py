from datetime import datetime

from sqlalchemy import Boolean, Integer, String, Float, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Restaurant(Base):
    __tablename__ = "restaurants"

    id: Mapped[int] = mapped_column(primary_key=True)
    owner_name: Mapped[str] = mapped_column(String(255))
    restaurant_name: Mapped[str] = mapped_column(String(255))
    phone: Mapped[str] = mapped_column(String(20))
    restaurant_type: Mapped[str | None] = mapped_column(String(100))
    hours: Mapped[str | None] = mapped_column(String(100))
    food_cost_baseline: Mapped[float | None] = mapped_column(Float)
    square_location_id: Mapped[str | None] = mapped_column(String(255))
    recap_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    recap_hour: Mapped[int] = mapped_column(Integer, default=7)
    recap_minute: Mapped[int] = mapped_column(Integer, default=0)
    alerts_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

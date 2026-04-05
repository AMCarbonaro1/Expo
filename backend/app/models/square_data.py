from datetime import date, datetime

from sqlalchemy import String, Float, Integer, Date, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class SquareToken(Base):
    __tablename__ = "square_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"), unique=True)
    access_token: Mapped[str] = mapped_column(String(255))
    refresh_token: Mapped[str | None] = mapped_column(String(255))
    expires_at: Mapped[datetime | None] = mapped_column(DateTime)
    merchant_id: Mapped[str | None] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    square_order_id: Mapped[str] = mapped_column(String(255), unique=True)
    total_money: Mapped[float] = mapped_column(Float)
    tip_money: Mapped[float] = mapped_column(Float, default=0)
    discount_money: Mapped[float] = mapped_column(Float, default=0)
    payment_type: Mapped[str | None] = mapped_column(String(50))
    order_date: Mapped[date] = mapped_column(Date)
    created_at_square: Mapped[datetime | None] = mapped_column(DateTime)


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    name: Mapped[str] = mapped_column(String(255))
    quantity: Mapped[int] = mapped_column(Integer, default=1)
    total_money: Mapped[float] = mapped_column(Float)


class LaborEntry(Base):
    __tablename__ = "labor_entries"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    square_shift_id: Mapped[str] = mapped_column(String(255), unique=True)
    employee_id: Mapped[str | None] = mapped_column(String(255))
    job_title: Mapped[str | None] = mapped_column(String(255))
    start_at: Mapped[datetime] = mapped_column(DateTime)
    end_at: Mapped[datetime | None] = mapped_column(DateTime)
    hours_worked: Mapped[float] = mapped_column(Float, default=0)
    wage_rate: Mapped[float] = mapped_column(Float, default=0)
    total_pay: Mapped[float] = mapped_column(Float, default=0)
    shift_date: Mapped[date] = mapped_column(Date)


class DailySummary(Base):
    __tablename__ = "daily_summaries"
    __table_args__ = (UniqueConstraint("restaurant_id", "summary_date"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    summary_date: Mapped[date] = mapped_column(Date)
    total_sales: Mapped[float] = mapped_column(Float, default=0)
    order_count: Mapped[int] = mapped_column(Integer, default=0)
    avg_ticket: Mapped[float] = mapped_column(Float, default=0)
    cash_sales: Mapped[float] = mapped_column(Float, default=0)
    card_sales: Mapped[float] = mapped_column(Float, default=0)
    total_tips: Mapped[float] = mapped_column(Float, default=0)
    total_discounts: Mapped[float] = mapped_column(Float, default=0)
    void_count: Mapped[int] = mapped_column(Integer, default=0)
    labor_cost: Mapped[float] = mapped_column(Float, default=0)
    labor_hours: Mapped[float] = mapped_column(Float, default=0)
    labor_percentage: Mapped[float] = mapped_column(Float, default=0)
    busiest_hour: Mapped[int | None] = mapped_column(Integer)

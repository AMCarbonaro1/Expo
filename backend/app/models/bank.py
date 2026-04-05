from datetime import date, datetime

from sqlalchemy import Boolean, String, Float, Text, Date, DateTime, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class PlaidToken(Base):
    __tablename__ = "plaid_tokens"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"), unique=True)
    access_token: Mapped[str] = mapped_column(String(255))
    item_id: Mapped[str] = mapped_column(String(255))
    institution_name: Mapped[str | None] = mapped_column(String(255))
    cursor: Mapped[str | None] = mapped_column(Text)
    account_id: Mapped[str | None] = mapped_column(String(255))
    current_balance: Mapped[float | None] = mapped_column(Float)
    balance_updated_at: Mapped[datetime | None] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class BankTransaction(Base):
    __tablename__ = "bank_transactions"

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    plaid_transaction_id: Mapped[str] = mapped_column(String(255), unique=True)
    account_id: Mapped[str] = mapped_column(String(255))
    date: Mapped[date] = mapped_column(Date)
    amount: Mapped[float] = mapped_column(Float)  # positive=out, negative=in
    name: Mapped[str] = mapped_column(String(500))
    merchant_name: Mapped[str | None] = mapped_column(String(255))
    category_primary: Mapped[str | None] = mapped_column(String(100))
    category_detailed: Mapped[str | None] = mapped_column(String(100))
    pending: Mapped[bool] = mapped_column(Boolean, default=False)
    is_recurring: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class DepositMatch(Base):
    __tablename__ = "deposit_matches"
    __table_args__ = (UniqueConstraint("restaurant_id", "match_date"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    restaurant_id: Mapped[int] = mapped_column(ForeignKey("restaurants.id"))
    match_date: Mapped[date] = mapped_column(Date)
    pos_card_sales: Mapped[float] = mapped_column(Float, default=0)
    bank_deposit: Mapped[float | None] = mapped_column(Float)
    gap_amount: Mapped[float | None] = mapped_column(Float)
    gap_percentage: Mapped[float | None] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String(20))  # matched, gap, missing_deposit, missing_pos
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

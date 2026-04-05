from datetime import date, timedelta

from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bank import BankTransaction, DepositMatch
from app.models.square_data import DailySummary


async def match_deposits(
    db: AsyncSession, restaurant_id: int, target_date: date
) -> DepositMatch | None:
    """Compare POS card sales to bank deposits for a given date."""
    # Get POS card sales
    result = await db.execute(
        select(DailySummary).where(
            and_(
                DailySummary.restaurant_id == restaurant_id,
                DailySummary.summary_date == target_date,
            )
        )
    )
    summary = result.scalar_one_or_none()
    card_sales = summary.card_sales if summary else 0

    # Get bank deposits (negative amounts = money in) for same day and next 2 days
    deposit_dates = [target_date, target_date + timedelta(days=1), target_date + timedelta(days=2)]
    result = await db.execute(
        select(BankTransaction).where(
            and_(
                BankTransaction.restaurant_id == restaurant_id,
                BankTransaction.date.in_(deposit_dates),
                BankTransaction.amount < 0,  # negative = money in (deposits)
            )
        )
    )
    deposits = result.scalars().all()
    total_deposits = abs(sum(d.amount for d in deposits))

    # Determine status
    if card_sales == 0 and total_deposits == 0:
        return None  # No data to match

    if card_sales > 0 and total_deposits == 0:
        status = "missing_deposit"
    elif card_sales == 0 and total_deposits > 0:
        status = "missing_pos"
    else:
        gap = abs(card_sales - total_deposits)
        gap_pct = (gap / card_sales * 100) if card_sales > 0 else 0
        status = "gap" if gap_pct >= 5 else "matched"

    gap_amount = abs(card_sales - total_deposits)
    gap_percentage = (gap_amount / card_sales * 100) if card_sales > 0 else 0

    # Upsert
    result = await db.execute(
        select(DepositMatch).where(
            and_(
                DepositMatch.restaurant_id == restaurant_id,
                DepositMatch.match_date == target_date,
            )
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        match = existing
    else:
        match = DepositMatch(restaurant_id=restaurant_id, match_date=target_date)
        db.add(match)

    match.pos_card_sales = round(card_sales, 2)
    match.bank_deposit = round(total_deposits, 2)
    match.gap_amount = round(gap_amount, 2)
    match.gap_percentage = round(gap_percentage, 1)
    match.status = status

    await db.commit()
    return match

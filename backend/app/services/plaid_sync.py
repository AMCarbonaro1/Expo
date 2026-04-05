import logging
from collections import defaultdict
from datetime import date, datetime, timedelta

import httpx
from sqlalchemy import select, delete, and_, func as sa_func
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.models.bank import PlaidToken, BankTransaction

logger = logging.getLogger(__name__)


async def _plaid_request(endpoint: str, payload: dict) -> dict:
    payload["client_id"] = settings.plaid_client_id
    payload["secret"] = settings.plaid_secret
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{settings.plaid_base_url}{endpoint}",
            json=payload,
            timeout=30.0,
        )
        return resp.json()


async def sync_transactions(db: AsyncSession, restaurant_id: int) -> dict:
    """Sync transactions using Plaid's cursor-based Transactions Sync API."""
    result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == restaurant_id)
    )
    token = result.scalar_one_or_none()
    if not token:
        raise ValueError(f"No Plaid token for restaurant {restaurant_id}")

    added_count = 0
    modified_count = 0
    removed_count = 0
    cursor = token.cursor or ""
    has_more = True

    while has_more:
        data = await _plaid_request("/transactions/sync", {
            "access_token": token.access_token,
            "cursor": cursor,
            "count": 500,
        })

        if "error" in data and data.get("error_type"):
            logger.error(f"Plaid sync error: {data}")
            break

        # Process added transactions
        for txn in data.get("added", []):
            existing = await db.execute(
                select(BankTransaction).where(
                    BankTransaction.plaid_transaction_id == txn["transaction_id"]
                )
            )
            if existing.scalar_one_or_none():
                continue

            pfc = txn.get("personal_finance_category", {})
            bt = BankTransaction(
                restaurant_id=restaurant_id,
                plaid_transaction_id=txn["transaction_id"],
                account_id=txn.get("account_id", ""),
                date=date.fromisoformat(txn["date"]),
                amount=txn["amount"],
                name=txn.get("name", ""),
                merchant_name=txn.get("merchant_name"),
                category_primary=pfc.get("primary"),
                category_detailed=pfc.get("detailed"),
                pending=txn.get("pending", False),
            )
            db.add(bt)
            added_count += 1

        # Process modified transactions
        for txn in data.get("modified", []):
            existing = await db.execute(
                select(BankTransaction).where(
                    BankTransaction.plaid_transaction_id == txn["transaction_id"]
                )
            )
            bt = existing.scalar_one_or_none()
            if bt:
                bt.amount = txn["amount"]
                bt.name = txn.get("name", "")
                bt.merchant_name = txn.get("merchant_name")
                bt.pending = txn.get("pending", False)
                pfc = txn.get("personal_finance_category", {})
                bt.category_primary = pfc.get("primary")
                bt.category_detailed = pfc.get("detailed")
                modified_count += 1

        # Process removed transactions
        for txn in data.get("removed", []):
            await db.execute(
                delete(BankTransaction).where(
                    BankTransaction.plaid_transaction_id == txn["transaction_id"]
                )
            )
            removed_count += 1

        cursor = data.get("next_cursor", cursor)
        has_more = data.get("has_more", False)

        # Save cursor after each page
        token.cursor = cursor
        await db.commit()

    logger.info(
        f"Plaid sync for restaurant {restaurant_id}: "
        f"+{added_count} ~{modified_count} -{removed_count}"
    )
    return {"added": added_count, "modified": modified_count, "removed": removed_count}


async def sync_balances(db: AsyncSession, restaurant_id: int) -> dict | None:
    """Fetch current account balance from Plaid."""
    result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == restaurant_id)
    )
    token = result.scalar_one_or_none()
    if not token:
        return None

    data = await _plaid_request("/accounts/balance/get", {
        "access_token": token.access_token,
    })

    for acct in data.get("accounts", []):
        if acct["account_id"] == token.account_id:
            balance = acct.get("balances", {}).get("current")
            token.current_balance = balance
            token.balance_updated_at = datetime.utcnow()
            await db.commit()
            return {"balance": balance, "account_id": token.account_id}

    return None


async def detect_recurring_transactions(db: AsyncSession, restaurant_id: int):
    """Identify recurring transactions based on merchant + amount patterns."""
    cutoff = date.today() - timedelta(days=90)
    result = await db.execute(
        select(BankTransaction).where(
            and_(
                BankTransaction.restaurant_id == restaurant_id,
                BankTransaction.date >= cutoff,
                BankTransaction.amount > 0,  # expenses (money out)
            )
        ).order_by(BankTransaction.date)
    )
    transactions = result.scalars().all()

    # Group by merchant + approximate amount
    groups = defaultdict(list)
    for txn in transactions:
        key = (txn.merchant_name or txn.name, round(txn.amount, -1))  # round to nearest 10
        groups[key].append(txn)

    for (merchant, _), txns in groups.items():
        if len(txns) < 2:
            continue

        # Check for monthly-ish spacing (25-35 days between occurrences)
        dates = sorted(t.date for t in txns)
        intervals = [(dates[i + 1] - dates[i]).days for i in range(len(dates) - 1)]
        monthly_intervals = [i for i in intervals if 25 <= i <= 35]

        if monthly_intervals:
            for txn in txns:
                txn.is_recurring = True

    await db.commit()

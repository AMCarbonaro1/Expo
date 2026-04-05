import httpx
from fastapi import APIRouter, Depends, Query
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.bank import PlaidToken
from app.models.restaurant import Restaurant
from app.services.twilio_sms import send_sms

router = APIRouter(prefix="/api/plaid", tags=["plaid"])


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


@router.post("/create-link-token")
async def create_link_token(restaurant_id: int = Query(...)):
    data = await _plaid_request("/link/token/create", {
        "user": {"client_user_id": str(restaurant_id)},
        "client_name": "Expo",
        "products": ["transactions"],
        "country_codes": ["US"],
        "language": "en",
    })
    return {"link_token": data.get("link_token")}


class ExchangeRequest(BaseModel):
    restaurant_id: int
    public_token: str
    institution_name: str | None = None


@router.post("/exchange-token")
async def exchange_token(req: ExchangeRequest, db: AsyncSession = Depends(get_db)):
    # Exchange public token for access token
    data = await _plaid_request("/item/public_token/exchange", {
        "public_token": req.public_token,
    })

    if "access_token" not in data:
        return {"error": "Failed to exchange token", "details": data}

    access_token = data["access_token"]
    item_id = data["item_id"]

    # Fetch accounts to find checking account
    accounts_data = await _plaid_request("/accounts/get", {
        "access_token": access_token,
    })
    accounts = accounts_data.get("accounts", [])
    account_id = None
    for acct in accounts:
        if acct.get("subtype") == "checking":
            account_id = acct["account_id"]
            break
    if not account_id and accounts:
        account_id = accounts[0]["account_id"]

    # Upsert plaid token
    result = await db.execute(
        select(PlaidToken).where(PlaidToken.restaurant_id == req.restaurant_id)
    )
    existing = result.scalar_one_or_none()

    if existing:
        existing.access_token = access_token
        existing.item_id = item_id
        existing.institution_name = req.institution_name
        existing.account_id = account_id
    else:
        token = PlaidToken(
            restaurant_id=req.restaurant_id,
            access_token=access_token,
            item_id=item_id,
            institution_name=req.institution_name,
            account_id=account_id,
        )
        db.add(token)

    await db.commit()
    return {"status": "connected", "account_id": account_id}


@router.get("/link-page/{restaurant_id}", response_class=HTMLResponse)
async def link_page(restaurant_id: int):
    return f"""<!DOCTYPE html>
<html>
<head><title>Connect Your Bank - Expo</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body {{ font-family: -apple-system, sans-serif; background: #09090b; color: white;
       display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }}
.container {{ text-align: center; padding: 2rem; }}
h1 {{ font-size: 1.5rem; }}
p {{ color: #a1a1aa; }}
#status {{ margin-top: 1rem; }}
</style>
</head>
<body>
<div class="container">
  <h1>Connect Your Bank to Expo</h1>
  <p>This takes about 60 seconds. We can only read transactions — we can't move money.</p>
  <div id="status">Loading...</div>
</div>
<script src="https://cdn.plaid.com/link/v2/stable/link-initialize.js"></script>
<script>
async function init() {{
  const res = await fetch('/api/plaid/create-link-token?restaurant_id={restaurant_id}', {{method:'POST'}});
  const data = await res.json();
  const handler = Plaid.create({{
    token: data.link_token,
    onSuccess: async (public_token, metadata) => {{
      document.getElementById('status').textContent = 'Connecting...';
      await fetch('/api/plaid/exchange-token', {{
        method: 'POST',
        headers: {{'Content-Type': 'application/json'}},
        body: JSON.stringify({{
          restaurant_id: {restaurant_id},
          public_token: public_token,
          institution_name: metadata.institution ? metadata.institution.name : null
        }})
      }});
      document.getElementById('status').innerHTML = '<b>Connected!</b> You can close this page.';
    }},
    onExit: (err) => {{
      if (err) document.getElementById('status').textContent = 'Connection cancelled.';
    }}
  }});
  handler.open();
}}
init();
</script>
</body>
</html>"""


@router.post("/send-link/{restaurant_id}")
async def send_bank_link(restaurant_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Restaurant).where(Restaurant.id == restaurant_id)
    )
    restaurant = result.scalar_one_or_none()
    if not restaurant:
        return {"error": "Restaurant not found"}

    # In production this would be the deployed server URL
    link_url = f"http://localhost:8000/api/plaid/link-page/{restaurant_id}"
    await send_sms(
        restaurant.phone,
        f"Connect your bank to Expo in 60 seconds: {link_url}"
    )
    return {"status": "sent"}

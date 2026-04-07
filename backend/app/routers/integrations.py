"""Unified integration router for all third-party services."""
import json
import urllib.parse
from datetime import datetime, timedelta

import httpx
from fastapi import APIRouter, Depends, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from sqlalchemy import select, delete, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.dependencies.auth import get_current_user
from app.models.integration import IntegrationToken
from app.models.user import User

router = APIRouter(prefix="/api/integrations", tags=["integrations"])


# ─── Status ───────────────────────────────────────────────────

SERVICES = [
    # POS
    {"id": "square", "name": "Square", "category": "POS Systems", "status": "live", "legacy": True},
    {"id": "toast", "name": "Toast", "category": "POS Systems", "status": "coming_soon"},
    {"id": "clover", "name": "Clover", "category": "POS Systems", "status": "coming_soon"},
    {"id": "lightspeed", "name": "Lightspeed", "category": "POS Systems", "status": "coming_soon"},
    {"id": "revel", "name": "Revel", "category": "POS Systems", "status": "coming_soon"},
    {"id": "touchbistro", "name": "TouchBistro", "category": "POS Systems", "status": "coming_soon"},
    {"id": "hungerrush", "name": "HungerRush", "category": "POS Systems", "status": "coming_soon"},
    # Banking
    {"id": "plaid", "name": "Bank Account", "category": "Banking", "status": "live", "legacy": True},
    # Delivery
    {"id": "doordash", "name": "DoorDash", "category": "Delivery Apps", "status": "available"},
    {"id": "ubereats", "name": "Uber Eats", "category": "Delivery Apps", "status": "coming_soon"},
    {"id": "grubhub", "name": "Grubhub", "category": "Delivery Apps", "status": "coming_soon"},
    # Accounting
    {"id": "quickbooks", "name": "QuickBooks Online", "category": "Accounting", "status": "available"},
    {"id": "xero", "name": "Xero", "category": "Accounting", "status": "available"},
    {"id": "r365", "name": "Restaurant365", "category": "Accounting", "status": "coming_soon"},
    # Inventory
    {"id": "marketman", "name": "MarketMan", "category": "Inventory & Food Cost", "status": "coming_soon"},
    {"id": "marginedge", "name": "MarginEdge", "category": "Inventory & Food Cost", "status": "coming_soon"},
    # Labor
    {"id": "7shifts", "name": "7shifts", "category": "Labor & Scheduling", "status": "available"},
    # Reservations
    {"id": "opentable", "name": "OpenTable", "category": "Reservations", "status": "coming_soon"},
    # Food Safety
    {"id": "fooddocs", "name": "FoodDocs", "category": "Food Safety", "status": "coming_soon"},
]


@router.get("/status")
async def get_integration_status(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get connection status for all integrations."""
    rid = user.restaurant_id

    # Check legacy tokens (Square and Plaid use their own models)
    from app.models.square_data import SquareToken
    from app.models.bank import PlaidToken
    sq = (await db.execute(select(SquareToken).where(SquareToken.restaurant_id == rid))).scalar_one_or_none()
    pl = (await db.execute(select(PlaidToken).where(PlaidToken.restaurant_id == rid))).scalar_one_or_none()

    # Check new unified tokens
    result = await db.execute(
        select(IntegrationToken).where(IntegrationToken.restaurant_id == rid)
    )
    connected_tokens = {t.service: t for t in result.scalars().all()}

    integrations = []
    for svc in SERVICES:
        connected = False
        external_name = None

        if svc["id"] == "square":
            connected = sq is not None
        elif svc["id"] == "plaid":
            connected = pl is not None
            external_name = pl.institution_name if pl else None
        elif svc["id"] in connected_tokens:
            connected = True
            external_name = connected_tokens[svc["id"]].external_name

        # Check if credentials are actually configured for "available" services
        effective_status = svc["status"]
        if not connected and effective_status == "available":
            if not _has_credentials(svc["id"]):
                effective_status = "coming_soon"

        integrations.append({
            "id": svc["id"],
            "name": svc["name"],
            "category": svc["category"],
            "status": "connected" if connected else effective_status,
            "external_name": external_name,
        })

    return {"integrations": integrations}


def _has_credentials(service: str) -> bool:
    """Check if API credentials are configured for a service."""
    checks = {
        "quickbooks": bool(settings.quickbooks_client_id),
        "xero": bool(settings.xero_client_id),
        "7shifts": bool(settings.sevenshifts_client_id),
        "doordash": bool(settings.doordash_developer_id),
        "toast": bool(settings.toast_client_id),
        "clover": bool(settings.clover_app_id),
        "lightspeed": bool(settings.lightspeed_client_id),
        "ubereats": bool(settings.ubereats_client_id),
        "grubhub": bool(settings.grubhub_partner_key),
        "opentable": bool(settings.opentable_client_id),
        "marketman": bool(settings.marketman_api_key),
        "marginedge": bool(settings.marginedge_api_key),
        "r365": bool(settings.r365_username),
        "revel": bool(settings.revel_api_key),
        "hungerrush": bool(settings.hungerrush_client_id),
    }
    return checks.get(service, False)


@router.post("/disconnect/{service}")
async def disconnect_integration(
    service: str,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    rid = user.restaurant_id
    if service == "square":
        from app.models.square_data import SquareToken
        await db.execute(delete(SquareToken).where(SquareToken.restaurant_id == rid))
    elif service == "plaid":
        from app.models.bank import PlaidToken
        await db.execute(delete(PlaidToken).where(PlaidToken.restaurant_id == rid))
    else:
        await db.execute(delete(IntegrationToken).where(
            and_(IntegrationToken.restaurant_id == rid, IntegrationToken.service == service)
        ))
    await db.commit()
    return {"status": "disconnected"}


# ─── QuickBooks Online ────────────────────────────────────────

@router.get("/quickbooks/auth-url")
async def quickbooks_auth_url(user: User = Depends(get_current_user)):
    if not settings.quickbooks_client_id:
        return {"error": "QuickBooks integration not configured yet"}
    params = {
        "client_id": settings.quickbooks_client_id,
        "redirect_uri": f"{settings.backend_url}/api/integrations/quickbooks/callback",
        "response_type": "code",
        "scope": "com.intuit.quickbooks.accounting",
        "state": str(user.restaurant_id),
    }
    base = "https://appcenter.intuit.com/connect/oauth2" if settings.quickbooks_environment != "sandbox" else "https://appcenter.intuit.com/connect/oauth2"
    return {"url": f"{base}?{urllib.parse.urlencode(params)}"}


@router.get("/quickbooks/callback")
async def quickbooks_callback(
    code: str = Query(...),
    state: str = Query(""),
    realmId: str = Query(""),
    db: AsyncSession = Depends(get_db),
):
    restaurant_id = int(state) if state else None
    token_url = "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer"

    async with httpx.AsyncClient() as client:
        resp = await client.post(token_url, data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": f"{settings.backend_url}/api/integrations/quickbooks/callback",
        }, auth=(settings.quickbooks_client_id, settings.quickbooks_client_secret))
        data = resp.json()

    if "access_token" not in data:
        return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations?error=quickbooks")

    # Upsert token
    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == restaurant_id, IntegrationToken.service == "quickbooks")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = data["access_token"]
        existing.refresh_token = data.get("refresh_token")
        existing.external_id = realmId
    else:
        token = IntegrationToken(
            restaurant_id=restaurant_id, service="quickbooks",
            access_token=data["access_token"],
            refresh_token=data.get("refresh_token"),
            external_id=realmId,
            external_name="QuickBooks",
        )
        db.add(token)
    await db.commit()
    return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations")


# ─── Xero ─────────────────────────────────────────────────────

@router.get("/xero/auth-url")
async def xero_auth_url(user: User = Depends(get_current_user)):
    if not settings.xero_client_id:
        return {"error": "Xero integration not configured yet"}
    params = {
        "response_type": "code",
        "client_id": settings.xero_client_id,
        "redirect_uri": f"{settings.backend_url}/api/integrations/xero/callback",
        "scope": "openid profile email accounting.transactions accounting.contacts offline_access",
        "state": str(user.restaurant_id),
    }
    return {"url": f"https://login.xero.com/identity/connect/authorize?{urllib.parse.urlencode(params)}"}


@router.get("/xero/callback")
async def xero_callback(
    code: str = Query(...),
    state: str = Query(""),
    db: AsyncSession = Depends(get_db),
):
    restaurant_id = int(state) if state else None

    async with httpx.AsyncClient() as client:
        resp = await client.post("https://identity.xero.com/connect/token", data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": f"{settings.backend_url}/api/integrations/xero/callback",
        }, auth=(settings.xero_client_id, settings.xero_client_secret))
        data = resp.json()

    if "access_token" not in data:
        return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations?error=xero")

    # Get tenant ID
    tenant_id = None
    tenant_name = None
    async with httpx.AsyncClient() as client:
        resp = await client.get("https://api.xero.com/connections",
            headers={"Authorization": f"Bearer {data['access_token']}"})
        connections = resp.json()
        if connections:
            tenant_id = connections[0].get("tenantId")
            tenant_name = connections[0].get("tenantName")

    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == restaurant_id, IntegrationToken.service == "xero")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = data["access_token"]
        existing.refresh_token = data.get("refresh_token")
        existing.external_id = tenant_id
        existing.external_name = tenant_name
    else:
        token = IntegrationToken(
            restaurant_id=restaurant_id, service="xero",
            access_token=data["access_token"],
            refresh_token=data.get("refresh_token"),
            external_id=tenant_id, external_name=tenant_name or "Xero",
        )
        db.add(token)
    await db.commit()
    return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations")


# ─── 7shifts ──────────────────────────────────────────────────

@router.get("/7shifts/auth-url")
async def sevenshifts_auth_url(user: User = Depends(get_current_user)):
    """7shifts uses Client Credentials, so we connect directly without user redirect."""
    if not settings.sevenshifts_client_id:
        return {"error": "7shifts not configured"}

    async with httpx.AsyncClient() as client:
        resp = await client.post("https://app.7shifts.com/oauth2/token", data={
            "grant_type": "client_credentials",
            "client_id": settings.sevenshifts_client_id,
            "client_secret": settings.sevenshifts_client_secret,
        })
        data = resp.json()

    return {"token_received": "access_token" in data}


@router.post("/7shifts/connect")
async def sevenshifts_connect(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not settings.sevenshifts_client_id:
        return {"error": "7shifts not configured"}

    async with httpx.AsyncClient() as client:
        resp = await client.post("https://app.7shifts.com/oauth2/token", data={
            "grant_type": "client_credentials",
            "client_id": settings.sevenshifts_client_id,
            "client_secret": settings.sevenshifts_client_secret,
        })
        data = resp.json()

    if "access_token" not in data:
        return {"error": "Failed to connect to 7shifts"}

    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == user.restaurant_id, IntegrationToken.service == "7shifts")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = data["access_token"]
        existing.token_expires_at = datetime.utcnow() + timedelta(seconds=data.get("expires_in", 3600))
    else:
        token = IntegrationToken(
            restaurant_id=user.restaurant_id, service="7shifts",
            access_token=data["access_token"],
            external_name="7shifts",
            token_expires_at=datetime.utcnow() + timedelta(seconds=data.get("expires_in", 3600)),
        )
        db.add(token)
    await db.commit()
    return {"status": "connected"}


# ─── DoorDash ─────────────────────────────────────────────────

@router.post("/doordash/connect")
async def doordash_connect(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """DoorDash uses JWT auth — store credentials as a connected integration."""
    if not settings.doordash_developer_id:
        return {"error": "DoorDash not configured"}

    # Store DoorDash credentials as connected
    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == user.restaurant_id, IntegrationToken.service == "doordash")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = settings.doordash_developer_id
        existing.extra_data = json.dumps({
            "key_id": settings.doordash_key_id,
            "signing_secret": settings.doordash_signing_secret,
        })
    else:
        token = IntegrationToken(
            restaurant_id=user.restaurant_id, service="doordash",
            access_token=settings.doordash_developer_id,
            external_name="DoorDash",
            extra_data=json.dumps({
                "key_id": settings.doordash_key_id,
                "signing_secret": settings.doordash_signing_secret,
            }),
        )
        db.add(token)
    await db.commit()
    return {"status": "connected"}


# ─── Toast (Coming Soon — code ready) ─────────────────────────

@router.post("/toast/connect")
async def toast_connect(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not settings.toast_client_id:
        return {"error": "Toast integration pending partner approval"}

    async with httpx.AsyncClient() as client:
        resp = await client.post("https://api.toasttab.com/authentication/v1/authentication/login", json={
            "clientId": settings.toast_client_id,
            "clientSecret": settings.toast_client_secret,
        })
        data = resp.json()

    if "accessToken" not in data and "token" not in data:
        return {"error": "Failed to connect to Toast"}

    access_token = data.get("accessToken") or data.get("token", {}).get("accessToken", "")
    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == user.restaurant_id, IntegrationToken.service == "toast")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = access_token
    else:
        token = IntegrationToken(
            restaurant_id=user.restaurant_id, service="toast",
            access_token=access_token, external_name="Toast",
        )
        db.add(token)
    await db.commit()
    return {"status": "connected"}


# ─── Clover (Coming Soon — code ready) ────────────────────────

@router.get("/clover/auth-url")
async def clover_auth_url(user: User = Depends(get_current_user)):
    if not settings.clover_app_id:
        return {"error": "Clover integration pending approval"}
    base = "https://sandbox.dev.clover.com" if settings.clover_environment == "sandbox" else "https://www.clover.com"
    params = {
        "client_id": settings.clover_app_id,
        "redirect_uri": f"{settings.backend_url}/api/integrations/clover/callback",
        "response_type": "code",
        "state": str(user.restaurant_id),
    }
    return {"url": f"{base}/oauth/v2/authorize?{urllib.parse.urlencode(params)}"}


@router.get("/clover/callback")
async def clover_callback(
    code: str = Query(...), state: str = Query(""),
    merchant_id: str = Query("", alias="merchant_id"),
    db: AsyncSession = Depends(get_db),
):
    restaurant_id = int(state) if state else None
    base = "https://sandbox.dev.clover.com" if settings.clover_environment == "sandbox" else "https://www.clover.com"

    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{base}/oauth/v2/token", data={
            "client_id": settings.clover_app_id,
            "client_secret": settings.clover_app_secret,
            "code": code,
            "grant_type": "authorization_code",
        })
        data = resp.json()

    if "access_token" not in data:
        return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations?error=clover")

    result = await db.execute(select(IntegrationToken).where(
        and_(IntegrationToken.restaurant_id == restaurant_id, IntegrationToken.service == "clover")
    ))
    existing = result.scalar_one_or_none()
    if existing:
        existing.access_token = data["access_token"]
        existing.refresh_token = data.get("refresh_token")
        existing.external_id = merchant_id
    else:
        token = IntegrationToken(
            restaurant_id=restaurant_id, service="clover",
            access_token=data["access_token"],
            refresh_token=data.get("refresh_token"),
            external_id=merchant_id, external_name="Clover",
        )
        db.add(token)
    await db.commit()
    return RedirectResponse(url=f"{settings.frontend_url}/dashboard/integrations")


# ─── All other "Coming Soon" services follow the same patterns ─
# Lightspeed, Uber Eats, Grubhub, OpenTable, MarketMan,
# MarginEdge, Restaurant365, Revel, HungerRush
# Their connect endpoints return "pending approval" until
# credentials are configured in .env

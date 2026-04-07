# Expo — Integration Documentation

All integrations for connecting restaurant data sources to Expo. Each pulls read-only data into the backend, normalizes it, and feeds it to Claude for SMS-based insights.

---

## STATUS OVERVIEW

| Integration | Category | Auth | Sandbox | Self-Serve? | Priority |
|------------|----------|------|---------|-------------|----------|
| **Square** | POS | OAuth 2.0 | Yes | Yes | ✅ DONE |
| **Plaid** | Bank | OAuth 2.0 | Yes | Yes | ✅ DONE |
| **Stripe** | Billing | API Key | Yes | Yes | ✅ DONE |
| **QuickBooks** | Accounting | OAuth 2.0 | Yes | Yes | Tier 1 |
| **Xero** | Accounting | OAuth 2.0 | Yes | Yes | Tier 1 |
| **7shifts** | Labor | OAuth 2.0 CC | Yes | Yes | Tier 1 |
| **DoorDash** | Delivery | JWT | Yes | Drive only | Tier 1 |
| **Clover** | POS | OAuth 2.0 | Yes | Yes | Tier 2 |
| **Toast** | POS | OAuth 2.0 CC | Yes | No (12-36mo) | Tier 2 |
| **Uber Eats** | Delivery | OAuth 2.0 CC | Yes | No (NDA) | Tier 2 |
| **Grubhub** | Delivery | HMAC/OAuth | Yes | No (NDA) | Tier 2 |
| **Lightspeed** | POS | OAuth 2.0 | Yes | No | Tier 2 |
| **OpenTable** | Reservations | OAuth 2.0 | Yes | No (3-4 wks) | Tier 2 |
| **MarketMan** | Inventory | API Key | Postman | No | Tier 3 |
| **Revel** | POS | API Key/Bearer | Yes | No | Tier 3 |
| **MarginEdge** | Food Cost | Token | No | Yes (w/ sub) | Tier 3 |
| **Restaurant365** | Accounting | JWT | No | No | Tier 3 |
| **FoodDocs** | Food Safety | API Token | No | No | Tier 3 |
| **HungerRush** | POS | OAuth 2.0 CC | No | No | Tier 3 |
| **TouchBistro** | POS | API Key | No | No (closed) | Tier 3 |

---

## POS SYSTEMS

### Square ✅ (Already Implemented)
- **Portal:** developer.squareup.com
- **Auth:** OAuth 2.0 Authorization Code
- **Status:** Live in production

### Toast
- **Portal:** https://dev.toasttab.com | Docs: https://doc.toasttab.com
- **Auth:** OAuth 2.0 Client Credentials. POST clientId/clientSecret to `/authentication/v1/authentication/login` → bearer token
- **Apply:** https://pos.toasttab.com/partners/integration-partner-application
- **Timeline:** 12-36 months for full approval. Start ASAP.
- **Endpoints:** Orders `/orders/v2/orders`, Labor `/labor/v1/timeEntries`, Menus `/menus/v2/menus`, Config `/config/v2/`, Payments `/orders/v2/payments`
- **Rate Limit:** 1,000 req/min/location
- **Sandbox:** Yes (9am-6pm ET only)
- **Webhooks:** Yes (register via dev portal)
- **Gotchas:** Must call `/prices` before submitting orders. 409 errors during pagination = data changed, restart. Sandbox limited hours.

### Clover
- **Portal:** https://docs.clover.com | Sandbox: https://sandbox.dev.clover.com
- **Auth:** OAuth 2.0 v2 (access tokens expire in 30 min, must refresh aggressively)
- **Apply:** Create free sandbox account → build → submit app for approval (1+ month)
- **Endpoints:** Orders `/v3/merchants/{mId}/orders`, Payments `/v3/merchants/{mId}/payments`, Items `/v3/merchants/{mId}/items`, Employees `/v3/merchants/{mId}/employees`
- **Base URLs:** Sandbox: `apisandbox.dev.clover.com`, Production: `api.clover.com`
- **Rate Limit:** Not public (per merchant/app/endpoint, 429 with retry-after)
- **Sandbox:** Yes, free
- **Webhooks:** Yes but UNRELIABLE — must poll as fallback
- **Gotchas:** 30-min token expiry. Webhooks not guaranteed. Different domains for sandbox vs prod.

### Lightspeed Restaurant (K-Series)
- **Portal:** https://api-portal.lsk.lightspeed.app | Docs: https://api-docs.lsk.lightspeed.app
- **Auth:** OAuth 2.0 Authorization Code. Refresh tokens valid 14 days only.
- **Apply:** Register → Lightspeed approves account → request API Client → they approve scopes → staging client → production
- **Endpoints:** Menu, Items, Orders, Payments, Business/Locations
- **Sandbox:** Yes (staging environment at sbx subdomain)
- **Webhooks:** Yes (supports multiple auth types: Basic, Bearer, API Key, OAuth2)
- **Gotchas:** Gated access at 2 levels (account + API client). Refresh tokens expire in 14 days. K/L/O series are different products.

### Revel Systems (Shift4)
- **Portal:** https://developer.revelsystems.com
- **Auth:** API Key:Secret in `API-AUTHENTICATION` header, OR Bearer Token (expires 24hrs) from `authentication.revelup.com/oauth/token`
- **Apply:** Contact Revel, automated email with credentials
- **Endpoints:** ~140 endpoints. Order, OrderAllInOne, OrderItem, Payment, Product, Employee at `/resources/{Type}/`
- **Sandbox:** Yes at `api.qa.revelup.io`
- **Webhooks:** Yes (HMAC-SHA1 signatures)
- **Gotchas:** `?format=json` required explicitly. Semicolon-delimited multi-ID fetch. Daily token regeneration.

### TouchBistro
- **Portal:** None public
- **Auth:** API Key (issued after partnership)
- **Contact:** integratedpartners@touchbistro.com
- **Status:** CLOSED API. No public docs, no self-serve. Invitation-only.
- **Recommendation:** Lowest priority unless customers demand it.

### HungerRush
- **Portal:** https://support.hungerrush.com | Designer: https://designer-docs.hungerrush.com
- **Auth:** OAuth 2.0 Client Credentials → short-lived JWT
- **Apply:** Contact account manager for credentials
- **Endpoints:** GetMenu, ProcessOrder, Out of Stock API
- **Gotchas:** Docs mostly behind login wall. Narrow API (ordering/menu focused). No labor endpoints documented. Pizza/QSR focused.

---

## DELIVERY APPS

### DoorDash
- **Portal:** https://developer.doordash.com
- **Auth:** JWT signed with HMAC-SHA256. Create access key → get developer_id, key_id, signing_secret → mint JWT (30-min max lifetime)
- **Drive API:** Self-serve sandbox. Production requires certification session (2hrs, screen recordings).
- **Marketplace API:** CURRENTLY CLOSED to new partners. Interest form only.
- **Endpoints:** Drive: `POST/GET /drive/v2/deliveries`. Marketplace: Orders, Menus, Stores, Reporting.
- **Sandbox:** Yes (immediate, includes delivery simulator)
- **Webhooks:** Yes (1 URL per environment, Basic Auth/OAuth on endpoints)
- **Gotchas:** Marketplace closed. JWT expires every 30 min.

### Uber Eats
- **Portal:** https://developer.uber.com/docs/eats
- **Auth:** OAuth 2.0 Client Credentials. Token endpoint: `auth.uber.com/oauth/v2/token`. Tokens valid 30 days.
- **Apply:** NDA + API Licensing Agreement + Partner Manager approval
- **Endpoints:** Stores `GET /eats/stores`, Orders `/eats/orders/{id}/accept_pos_order`, Menu sync, Store management
- **Sandbox:** Yes at `test-api.uber.com`, auth at `sandbox-login.uber.com`
- **Rate Limit:** 100 tokens/hr, ~5 req/sec, 100 max active tokens
- **Webhooks:** Yes (retry: 10s, 30s, 60s, 120s... up to 7 attempts)
- **Gotchas:** 11.5-minute window to accept/deny orders or auto-cancel. NDA required.

### Grubhub
- **Portal:** https://developer.grubhub.com
- **Auth:** HMAC signatures (recommended) or OAuth for onboarding
- **Apply:** Interest form → NDA → technical intake → contract → implementation team → 2-3 weeks to pilot
- **Endpoints:** Menus, Orders, Merchant Data, Schedules, Onboarding
- **Sandbox:** Yes (preproduction environment with test store)
- **Webhooks:** Yes (per event type URLs)
- **Gotchas:** Not self-serve. NDA required. HMAC recommended over OAuth.

---

## INVENTORY & FOOD COST

### MarketMan
- **Portal:** https://api-doc.marketman.com | Postman: postman.com/marketmanapi
- **Auth:** API Key + Password → GetToken call → access token. Uses BuyerGuid/VendorGuid for scoping.
- **Apply:** Partner program, contact MarketMan
- **Endpoints (V3):** Inventory counts, Recipes, Purchase orders, Receiving, Items, Vendors, Sales data, Allergens
- **Gotchas:** Partner-only access. Buyer/Vendor APIs separate. Webhook support unclear.

### MarginEdge
- **Portal:** https://developer.marginedge.com
- **Auth:** Documented on portal (API key/token based)
- **Access:** Free with any MarginEdge subscription. No partner approval.
- **Endpoints (READ-ONLY):** Invoices, Products, Categories, Vendors, Vendor Items
- **Gotchas:** ONE-WAY only (read from MarginEdge, cannot write). Limited to 5 data types. No webhooks.

---

## ACCOUNTING

### QuickBooks Online
- **Portal:** https://developer.intuit.com
- **Auth:** OAuth 2.0 Authorization Code. Refresh tokens valid 101 days. Token endpoint: `oauth.platform.intuit.com/oauth2/v1/tokens/bearer`
- **Apply:** Free developer account, immediate sandbox. Production: security questionnaire + review (1-3 weeks). App Store: Tech (3 days) + Security (7 days) + Marketing (5 days) reviews.
- **Endpoints:** Invoices, Bills, Payments, Customers, Vendors, Journal Entries, Accounts, P&L Reports at `/v3/company/{realmID}/{entity}`
- **Rate Limit:** 500 req/min, 10 concurrent, batch: 120/min
- **Sandbox:** Yes at `sandbox-quickbooks.api.intuit.com` (free, valid 2 years)
- **Webhooks:** Yes (batched, delayed minutes). HMAC-SHA256 verification. Payload = entity ID + operation only.
- **Gotchas:** Intuit App Partner Program fees (metered production API usage since Nov 2025). Refresh token changes on refresh. Webhooks delayed, not real-time.

### Xero
- **Portal:** https://developer.xero.com
- **Auth:** OAuth 2.0 Authorization Code. Scopes: `accounting.transactions`, `accounting.contacts`, `offline_access`
- **Apply:** Free dev account. App Store: Demo → Review → Pilot (max 20 orgs) → Annual security assessment. 15% revenue share on App Store.
- **Endpoints:** Invoices, Contacts, Bank Transactions, Manual Journals, Payments, Accounts, Items, Payroll (AU/UK/NZ)
- **Rate Limit:** 5 concurrent, 60/min, 5,000/day per connection
- **Sandbox:** Yes (Demo Company)
- **Webhooks:** Yes but limited (invoices, contacts, billing subscriptions only). Must respond in 5 seconds.
- **Gotchas:** Very tight rate limits (60/min vs QuickBooks 500/min). 15% rev share. Granular scopes transition (March 2026). Annual security assessment.

### Restaurant365
- **Portal:** https://docs.restaurant365.com/docs/r365-api
- **Auth:** JWT Bearer. POST username/password to `https://{customer}.restaurant365.com/APIv1/Authenticate/JWT`
- **Apply:** Contact R365 Support with vendor's technical team. Part of Partner Ecosystem.
- **Endpoints:** AP Invoices, AP Invoices GL, API Managed Users (beta), OData for reporting
- **Gotchas:** No self-serve. Sales data capped at 31 days/request. Customer-specific auth URLs. No webhooks.

---

## RESERVATIONS

### OpenTable
- **Portal:** https://dev.opentable.com | Docs: https://docs.opentable.com
- **Apply:** https://www.opentable.com/restaurant-solutions/api-partners/become-a-partner/
- **Auth:** OAuth 2.0 with RBAC and granular scopes
- **Timeline:** 3-4 weeks for approval → sandbox → build → submit for final review
- **Endpoints:** Directory, Reservations (create/modify/cancel), Guest profiles, Real-time availability
- **Rate Limit:** ~1,000 req/hr/restaurant. Throttling during peak hours.
- **Sandbox:** Yes
- **Webhooks:** Yes (real-time for booking events)
- **Gotchas:** Closed API, affiliate partner approval required. Per-restaurant rate limits.

---

## FOOD SAFETY

### FoodDocs
- **Portal:** https://www.fooddocs.com/integrations
- **Auth:** API token via `company-token` header (generated in FoodDocs settings)
- **Apply:** Contact FoodDocs for partnership
- **Endpoints:** Sensor measurements POST (temperature readings with sensor_id, measurement, timestamp)
- **Gotchas:** Very narrow API — primarily IoT sensor data ingestion. No public developer portal. Limited utility unless building temperature monitoring.

---

## LABOR & SCHEDULING

### 7shifts
- **Portal:** https://developers.7shifts.com | Reference: https://developers.7shifts.com/reference
- **Auth:** OAuth 2.0 Client Credentials. Token endpoint: `app.7shifts.com/oauth2/token`. Token expires 1 hour. Requires `x-company-guid` header.
- **Apply:** Register as developer partner → get Client ID/Secret
- **Endpoints (v2):** Employees, Schedules, Shifts, Time Punches (clock in/out), Locations, Departments, Roles, Tip pooling, Hours & Wages
- **Rate Limit:** 10 req/sec per token
- **Sandbox:** Yes
- **Webhooks:** Yes (shift changes, new shifts, time-off requests)
- **Gotchas:** 1-hour token expiry. `x-company-guid` required on all requests. Postman collection available.

---

## IMPLEMENTATION PLAN

### Tier 1: Build Now (self-serve access)
1. QuickBooks Online — best accounting integration, huge market share
2. Xero — second accounting option
3. 7shifts — labor/scheduling data fills a gap
4. DoorDash Drive API — delivery tracking

### Tier 2: Apply Now, Build When Approved
5. Clover — apply to App Market, good POS coverage
6. Toast — START APPLICATION NOW (12-36 month wait)
7. Uber Eats — initiate NDA process
8. Grubhub — initiate partner process (2-3 weeks)
9. OpenTable — apply as affiliate (3-4 weeks)
10. Lightspeed — register on developer portal

### Tier 3: Lower Priority
11. MarketMan — partner-only, contact when needed
12. Revel — contact Shift4 when customers request
13. MarginEdge — read-only, limited value
14. Restaurant365 — contact support when needed
15. FoodDocs — very narrow API
16. HungerRush — narrow, pizza/QSR focused
17. TouchBistro — completely closed

### Immediate Actions
- [ ] Submit Toast integration partner application TODAY
- [ ] Submit Clover app market developer account
- [ ] Register on Lightspeed developer portal
- [ ] Submit OpenTable affiliate partner application
- [ ] Contact Uber Eats for NDA process
- [ ] Contact Grubhub for partner interest form

# Expo — Integration Setup Guide

Step-by-step instructions for getting API credentials for every integration.
Once you have credentials, give them to the dev team to add to `.env` and the integration goes live immediately.

---

## SELF-SERVE (Get credentials today — no approval needed)

### 1. QuickBooks Online
**Time:** 5-10 minutes
**What you need:** An Intuit account (free)

1. Go to https://developer.intuit.com
2. Click "Sign Up" or log in with any Intuit/QuickBooks account
3. Click "Dashboard" → "Create an app"
4. Select "QuickBooks Online and Payments"
5. Name it "Expo" → Create
6. Go to the app → "Keys & credentials" tab
7. Copy:
   - **Client ID** (under Development or Production)
   - **Client Secret** (click "Show")
8. Under "Redirect URIs" add: `https://api.carbonaromedia.com/api/integrations/quickbooks/callback`
9. For testing, use the "Sandbox" keys first

**Credentials needed:**
```
QUICKBOOKS_CLIENT_ID=
QUICKBOOKS_CLIENT_SECRET=
QUICKBOOKS_ENVIRONMENT=sandbox   (change to "production" when ready)
```

---

### 2. Xero
**Time:** 5-10 minutes
**What you need:** A Xero account (free developer account)

1. Go to https://developer.xero.com
2. Click "Sign Up" for a free developer account
3. Go to "My Apps" → "New App"
4. App name: "Expo"
5. Integration type: "Web app"
6. Company URL: `https://carbonaromedia.com`
7. Redirect URI: `https://api.carbonaromedia.com/api/integrations/xero/callback`
8. Click "Create App"
9. Copy:
   - **Client ID**
   - **Client Secret** (generate one)

**Credentials needed:**
```
XERO_CLIENT_ID=
XERO_CLIENT_SECRET=
```

---

### 3. 7shifts
**Time:** 5-10 minutes
**What you need:** A 7shifts account

1. Go to https://developers.7shifts.com
2. Click "Get Started" or sign up for developer access
3. Register your application
4. You'll receive:
   - **Client ID**
   - **Client Secret**
5. Note: OAuth uses Client Credentials grant (server-to-server, no user redirect needed)

**Credentials needed:**
```
SEVENSHIFTS_CLIENT_ID=
SEVENSHIFTS_CLIENT_SECRET=
```

---

### 4. DoorDash
**Time:** 5-10 minutes
**What you need:** A DoorDash developer account (free)

1. Go to https://developer.doordash.com
2. Sign up for a developer account
3. Once logged in, go to "Credentials" in the left sidebar
4. Click "Create Access Key"
5. Copy all three values:
   - **Developer ID**
   - **Key ID**
   - **Signing Secret**
6. Note: DoorDash uses JWT authentication (you sign tokens with these credentials)
7. Sandbox access is immediate — you can test right away

**Credentials needed:**
```
DOORDASH_DEVELOPER_ID=
DOORDASH_KEY_ID=
DOORDASH_SIGNING_SECRET=
```

---

## NEED TO APPLY (Application required — do these ASAP)

### 5. Toast
**Time to apply:** 15 minutes. **Approval timeline: 12-36 months.**
**This is the longest wait — apply TODAY.**

1. Go to https://pos.toasttab.com/partners/integration-partner-application
2. Fill out the integration partner application:
   - Company name: Carbonaro Media / Expo
   - Integration type: Data/Analytics integration
   - Description: "SMS-based AI business partner that connects to restaurant POS data to provide owners with sales insights, labor analytics, and food cost tracking via text message."
   - Mention you have mutual customers who want this (even if aspirational)
3. Wait for Toast to respond (they prioritize based on customer demand)
4. After approval: you'll receive `clientId` and `clientSecret`
5. They assign you a Toast integrations team representative

**Credentials needed (after approval):**
```
TOAST_CLIENT_ID=
TOAST_CLIENT_SECRET=
```

---

### 6. Clover
**Time to apply:** 30 minutes. **Approval timeline: 1-2 months.**

1. Go to https://sandbox.dev.clover.com/developer-home/create-account
2. Create a free sandbox developer account
3. Build a test app in sandbox (we've already built the code)
4. When ready, submit for App Market approval:
   - Create a production developer account
   - Submit app with video demo, description, screenshots
   - Clover reviews: functional, legal, market listing
5. Contact developer@clover.com with your App ID if delayed
6. After approval, you'll have production `App ID` and `App Secret`

**Credentials needed:**
```
CLOVER_APP_ID=
CLOVER_APP_SECRET=
CLOVER_ENVIRONMENT=sandbox   (change to "production" after approval)
```

---

### 7. Lightspeed Restaurant (K-Series)
**Time to apply:** 15 minutes. **Approval timeline: Weeks to months.**

1. Go to https://api-portal.lsk.lightspeed.app
2. Click "Register" for a developer account
3. Wait for Lightspeed team to manually approve your user account
4. Once approved, request an "API Client":
   - Select scopes needed: Financial, Items, Order & Pay
   - Lightspeed reviews and approves
5. You first receive a Staging client, then Production later
6. Your contact advises when you can apply for Production

**Credentials needed (after approval):**
```
LIGHTSPEED_CLIENT_ID=
LIGHTSPEED_CLIENT_SECRET=
```

---

### 8. Uber Eats
**Time to apply:** 15 minutes. **Approval timeline: Weeks (NDA process).**

1. Go to https://developer.uber.com
2. Create a developer account
3. Create an application (type: "Testing" for sandbox)
4. Contact Uber Eats Partner Manager to request API access
5. Sign NDA and API Licensing Agreement
6. After approval, you'll have `client_id` and `client_secret`
7. Scopes needed: `eats.order`, `eats.store`

**Credentials needed (after approval):**
```
UBEREATS_CLIENT_ID=
UBEREATS_CLIENT_SECRET=
```

---

### 9. Grubhub
**Time to apply:** 15 minutes. **Approval timeline: 2-3 weeks to pilot.**

1. Go to https://developer.grubhub.com
2. Fill out the partner interest form
3. Grubhub reviews for compatibility
4. Sign NDA
5. Fill out technical intake form
6. Sign contract
7. Dedicated implementation team assigned
8. Tech kickoff call, pre-production credentials issued
9. Expected to pilot within 30 days of receiving credentials

**Credentials needed (after approval):**
```
GRUBHUB_PARTNER_KEY=
```

---

### 10. OpenTable
**Time to apply:** 15 minutes. **Approval timeline: 3-4 weeks.**

1. Go to https://www.opentable.com/restaurant-solutions/api-partners/become-a-partner/
2. Fill out the partner application form:
   - Applicant info, company info
   - Project details: monthly users, restaurant users
   - Describe Expo and how you'll use reservation data
3. Wait 3-4 weeks for approval decision
4. After approval: receive credentials, build in pre-production
5. Run internal tests, submit app for final OpenTable review
6. Go live

**Credentials needed (after approval):**
```
OPENTABLE_CLIENT_ID=
OPENTABLE_CLIENT_SECRET=
```

---

### 11. MarketMan
**Time to apply:** 15 minutes. **Approval timeline: Unknown (partner program).**

1. Go to https://www.marketman.com
2. Contact their team about becoming an API partner
3. Or email their support/partnerships team directly
4. Request API V3 access
5. After approval, you'll receive an API Key and API Password

**Credentials needed (after approval):**
```
MARKETMAN_API_KEY=
MARKETMAN_API_PASSWORD=
```

---

### 12. MarginEdge
**Time:** Requires a MarginEdge subscription (customers only).

1. Go to https://developer.marginedge.com
2. API access is included free with any MarginEdge subscription
3. Follow the authentication process documented on the portal
4. Get your API key/token from account settings
5. Note: API is READ-ONLY (pull data from MarginEdge only)

**Credentials needed:**
```
MARGINEDGE_API_KEY=
```

---

### 13. Restaurant365
**Time to apply:** 15 minutes. **Approval timeline: Unknown.**

1. Contact R365 Support to request API access
2. Must include a member of your technical support team on the request
3. R365 provides API login credentials
4. Auth uses JWT — username and password, not OAuth

**Credentials needed (after approval):**
```
R365_USERNAME=
R365_PASSWORD=
```

---

### 14. Revel Systems (Shift4)
**Time to apply:** 15 minutes. **Approval timeline: Unknown.**

1. Go to https://developer.revelsystems.com
2. Contact Revel / apply through the partner portal
3. Once approved, you receive an automated email with:
   - Client ID
   - Client Secret
4. Also get API Key and API Secret for direct API access

**Credentials needed (after approval):**
```
REVEL_API_KEY=
REVEL_API_SECRET=
```

---

### 15. HungerRush
**Time to apply:** Contact account manager. **Approval timeline: Unknown.**

1. Contact your HungerRush account manager
2. Or go to https://support.hungerrush.com and request API access
3. Credentials generated in the Partner Portal
4. Uses OAuth 2.0 Client Credentials flow

**Credentials needed (after approval):**
```
HUNGERRUSH_CLIENT_ID=
HUNGERRUSH_CLIENT_SECRET=
```

---

## NOT AVAILABLE

### 16. TouchBistro
**Status:** Completely closed API. No public documentation. Invitation-only.
**Contact:** integratedpartners@touchbistro.com
**Action:** Only pursue if specific customers demand it. Email them to express interest.

### 17. FoodDocs
**Status:** Very narrow API (IoT sensor data only, not food safety checklists).
**Contact:** https://www.fooddocs.com/integrations
**Action:** Low priority. Only useful if building temperature monitoring features.

---

## PRIORITY ORDER

**Do today (5-10 min each, immediate access):**
1. ✅ QuickBooks Online — https://developer.intuit.com
2. ✅ Xero — https://developer.xero.com
3. ✅ 7shifts — https://developers.7shifts.com
4. ✅ DoorDash — https://developer.doordash.com

**Apply today (15 min each, wait for approval):**
5. 🟡 Toast — https://pos.toasttab.com/partners/integration-partner-application (LONGEST WAIT)
6. 🟡 Clover — https://sandbox.dev.clover.com
7. 🟡 OpenTable — https://www.opentable.com/restaurant-solutions/api-partners/become-a-partner/
8. 🟡 Grubhub — https://developer.grubhub.com
9. 🟡 Uber Eats — https://developer.uber.com
10. 🟡 Lightspeed — https://api-portal.lsk.lightspeed.app

**Apply when needed:**
11. ⏳ MarketMan — Contact partnerships
12. ⏳ Revel — https://developer.revelsystems.com
13. ⏳ Restaurant365 — Contact support
14. ⏳ HungerRush — Contact account manager
15. ⏳ MarginEdge — Requires subscription

**Not pursuing:**
16. ❌ TouchBistro — Closed API
17. ❌ FoodDocs — Sensors only

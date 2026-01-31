---
name: openkrill
description: Enable AI agents to make micropayments via x402 protocol. Use when purchasing browser sessions on Browserbase, scraping with Firecrawl, or any x402-compatible API. Handles wallet creation, funding, and automatic payment flows. Use when encountering 402 Payment Required responses or when the user mentions micropayments, crypto payments, or paying for API access.
metadata: {"openclaw":{"requires":{"env":["THIRDWEB_SECRET_KEY"]},"primaryEnv":"THIRDWEB_SECRET_KEY"}}
---

# OpenKrill - x402 Payments Skill

This skill enables AI agents to autonomously make micropayments using the x402 protocol. It handles wallet management, balance checking, and automatic payment flows when APIs return HTTP 402 Payment Required responses.

## When to Use This Skill

- **When asked "what services can I purchase?" or "what x402 APIs are available?"** - Query the Bazaar first!
- When purchasing browser automation sessions on Browserbase
- When performing web scraping tasks with Firecrawl
- When interacting with any x402-compatible API
- When the user mentions micropayments, crypto payments, or paying for API access
- When you encounter a 402 Payment Required response
- **When discovering new x402-compatible services** via the Bazaar

> **TIP:** When a user or agent asks what services are available for purchase, always start by querying the Bazaar discovery endpoint. It provides a live, up-to-date catalog of 12,000+ x402-compatible services.

### Quick: Discover Available Services

```bash
# Query the Bazaar to see what's available (no auth required)
curl -s "https://api.cdp.coinbase.com/platform/v2/x402/discovery/resources?type=http&limit=50"
```

## Prerequisites

Before using this skill, ensure:

1. **THIRDWEB_SECRET_KEY** environment variable is set with a valid thirdweb project secret key
2. The wallet has sufficient USDC balance on Base chain (or the target chain)
3. Network access to thirdweb API endpoints

## IMPORTANT: x402 Endpoint URLs & Service Types

### Two Types of x402 Support

| Type | Description | Example |
|------|-------------|---------|
| **True x402** | Fully keyless - no API keys needed, just pay and use | Browserbase |
| **Hybrid x402** | Requires API key/token + payment header | Firecrawl |

### x402 Endpoint Patterns

| Service | Standard API | x402 Endpoint | Type | Status |
|---------|-------------|---------------|------|--------|
| Browserbase | `api.browserbase.com` | `x402.browserbase.com` | True x402 | ✅ Works |
| Firecrawl | `api.firecrawl.dev/v1/search` | `api.firecrawl.dev/v1/x402/search` | Non-standard | ❌ Broken |

**Discovery tips:**
- Check for `x402.` subdomain (e.g., `x402.browserbase.com`)
- Check for `/x402/` in the path (e.g., `/v1/x402/search`)
- Hit the x402 root URL for endpoint listing (e.g., `curl https://x402.browserbase.com/`)

## Core Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Check or create wallet
- [ ] Step 2: Make payment request
- [ ] Step 3: Handle response (auto-fund if needed)
```

### Step 1: Check or Create Wallet

Use the thirdweb API directly (recommended over TypeScript scripts):

```bash
curl -s -X POST https://api.thirdweb.com/v1/wallets/server \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"identifier": "x402-agent-wallet"}'
```

The response will include the wallet address. Store this for subsequent operations.

### Step 2: Make Payments with fetchWithPayment

Call the thirdweb x402 fetch API directly:

```bash
# Browserbase - Create browser session
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://x402.browserbase.com/browser/session/create&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Step 3: Handle the Response

**Success:** The API returns the session data directly.

**Insufficient Funds:** If the wallet needs funding, the API returns a response like:

```json
{
  "result": {
    "message": "This endpoint requires 0.002 USDC on chain id 8453...",
    "link": "https://thirdweb.com/pay?chain=8453&receiver=0x...&token=0x..."
  }
}
```

**When you receive a payment link, open it in the user's browser:**

- If browser automation is available (MCP, browser tool, etc.), use it to navigate to the link in a new tab
- Otherwise, display the link prominently and instruct the user to open it manually

This opens the thirdweb payment page where the user can fund the wallet with USDC.

## Quick Reference

### fetchWithPayment Endpoint

**URL:** `https://api.thirdweb.com/v1/payments/x402/fetch`

**Query Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `url` | Yes | Target API URL to call |
| `method` | Yes | HTTP method (GET, POST, etc.) |
| `from` | No | Wallet address for payment |
| `maxValue` | No | Maximum payment amount in wei |
| `asset` | No | Payment token address (defaults to USDC) |
| `chainId` | No | Chain ID (e.g., "eip155:8453" for Base) |

**Headers:**
- `x-secret-key`: Your thirdweb project secret key (required)
- `Content-Type`: application/json

## Supported Services

### Browserbase

**x402 Endpoint:** `https://x402.browserbase.com`  
**Pricing:** $0.12/hour (paid in USDC on Base)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/browser/session/create` | POST | Create a browser session |
| `/browser/session/:id/status` | GET | Check session status |
| `/browser/session/:id/extend` | POST | Add more time |
| `/browser/session/:id` | DELETE | Terminate session |

Create browser automation session:

```bash
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://x402.browserbase.com/browser/session/create&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Firecrawl (Non-Standard x402 - NOT WORKING)

**x402 Endpoint:** `https://api.firecrawl.dev/v1/x402/search`  
**Pricing:** $0.01/request  
**Status:** ❌ Cannot be used with thirdweb

> **WARNING:** Firecrawl's x402 is incomplete:
> - Returns `401` instead of `402` (no payment info provided)
> - Docs say use `X-Payment: {{paymentHeader}}` but don't explain how to generate it
> - thirdweb auto-payment cannot work without proper 402 response

**Use these alternatives instead:**
1. **Firecrawl MCP** - If available (standard API key auth)
2. **Browserbase + scraping** - True x402, fully keyless

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid or missing THIRDWEB_SECRET_KEY | Check environment variable |
| 402 Payment Required | Insufficient balance or payment failed | Auto-open payment link (see below) |
| 400 Bad Request | Invalid URL or method | Verify request parameters |
| 404 Not Found | Wrong endpoint path | Check x402-specific endpoint (e.g., `x402.browserbase.com` not `api.browserbase.com`) |
| 500 Server Error | thirdweb or target API issue | Retry or check service status |

## Auto-Funding Flow

When the wallet has insufficient funds, the API returns a `link` field. Open this link for the user:

1. **Preferred**: Use any available browser tool to open the payment link in a new tab
2. **Fallback**: Display the link clearly and ask the user to open it manually

The thirdweb payment page allows users to:
- Pay with credit card
- Pay with crypto from another wallet
- Bridge funds from other chains

After funding, retry the original request.

## Discovering x402 Endpoints

### Method 1: x402 Bazaar (Recommended)

The Bazaar is a machine-readable catalog for discovering x402-compatible endpoints:

```bash
# Query the Bazaar for available services
curl -s "https://x402.org/facilitator/discovery/resources?type=http&limit=20"

# Or use CDP facilitator (Coinbase)
curl -s "https://api.cdp.coinbase.com/platform/v2/x402/discovery/resources?type=http&limit=20"
```

**Response includes:**
- `resource`: The x402 endpoint URL
- `accepts`: Payment options (scheme, network, amount, asset)
- `metadata`: Description, input/output schemas
- `pagination`: For browsing large catalogs

### Method 2: Manual Discovery

When encountering a new service:

```bash
# 1. Check for x402 subdomain
curl -s https://x402.SERVICE.com/

# 2. Check for /x402/ path prefix  
curl -s -I https://api.SERVICE.com/v1/x402/endpoint

# 3. Test response code (402 = true x402, 401 = hybrid)
curl -s -i -X POST https://x402.SERVICE.com/endpoint \
  -H "Content-Type: application/json" -d '{}' 2>&1 | head -5
```

## Common Mistakes

1. **Using wrong subdomain**: `api.browserbase.com` vs `x402.browserbase.com`
2. **Using wrong path**: `/v1/sessions` vs `/browser/session/create`
3. **Not checking response for payment links**: Always parse the response for `link` field
4. **Assuming all x402 is keyless**: Check if service returns 401 (hybrid) or 402 (true x402)

## Additional Resources

- See [references/API-REFERENCE.md](references/API-REFERENCE.md) for complete API documentation
- See [references/SERVICES.md](references/SERVICES.md) for x402-compatible service examples

## Links

- [x402 Protocol](https://x402.org)
- [x402 Bazaar Discovery](https://docs.cdp.coinbase.com/x402/bazaar)
- [thirdweb x402 Documentation](https://portal.thirdweb.com/x402)
- [Browserbase x402 Docs](https://docs.browserbase.com/integrations/x402/introduction)

---
name: openkrill
description: Enable AI agents to make micropayments via x402 protocol. Use when purchasing browser sessions on Browserbase, scraping with Firecrawl, or any x402-compatible API. Handles wallet creation, funding, and automatic payment flows.
license: MIT
compatibility: Requires network access and thirdweb API key (THIRDWEB_SECRET_KEY environment variable)
metadata:
  author: emilankerwiik
  version: "1.1"
---

# OpenKrill - x402 Payments Skill

This skill enables AI agents to autonomously make micropayments using the x402 protocol. It handles wallet management, balance checking, and automatic payment flows when APIs return HTTP 402 Payment Required responses.

## When to Use This Skill

- When purchasing browser automation sessions on Browserbase
- When performing web scraping tasks with Firecrawl
- When the agent needs to create an email address for signups or verification
- When interacting with any x402-compatible API
- When the user mentions micropayments, crypto payments, or paying for API access
- When you encounter a 402 Payment Required response

## Prerequisites

Before using this skill, ensure:

1. **THIRDWEB_SECRET_KEY** environment variable is set with a valid thirdweb project secret key
2. The wallet has sufficient USDC balance on Base chain (or the target chain)
3. Network access to thirdweb API endpoints

## IMPORTANT: x402 Endpoint URLs

Many services have **separate x402-enabled endpoints** that differ from their standard API:

| Service | Standard API | x402 Endpoint |
|---------|-------------|---------------|
| Browserbase | `api.browserbase.com` | `x402.browserbase.com` |
| Firecrawl | `api.firecrawl.dev` | Check their x402 docs |

**Always check for `x402.` prefixed subdomains** when using this skill!

## Core Workflow

### Step 1: Check or Create Wallet

Use the thirdweb API directly (recommended):

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

**Insufficient Funds:** If the wallet needs funding, the API returns:

```json
{
  "result": {
    "message": "This endpoint requires 0.002 USDC on chain id 8453...",
    "link": "https://thirdweb.com/pay?chain=8453&receiver=0x...&token=0x..."
  }
}
```

**Auto-open the payment link using cursor-ide-browser MCP:**

```
CallMcpTool(
  server: "cursor-ide-browser",
  toolName: "browser_navigate",
  arguments: {"url": "<payment-link>", "newTab": true}
)
```

This opens thirdweb's payment page where users can fund the wallet.

## API Reference

### fetchWithPayment Endpoint

**URL:** `https://api.thirdweb.com/v1/payments/x402/fetch`

**Method:** POST

**Query Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| `url` | Yes | Target API URL to call |
| `method` | Yes | HTTP method (GET, POST, etc.) |
| `from` | No | Wallet address for payment (uses default project wallet if omitted) |
| `maxValue` | No | Maximum payment amount in wei |
| `asset` | No | Payment token address (defaults to USDC) |
| `chainId` | No | Chain ID for payment (e.g., "eip155:8453" for Base) |

**Headers:**
- `x-secret-key`: Your thirdweb project secret key (required)
- `Content-Type`: application/json

## Supported x402 Services

### Browserbase

**x402 Endpoint:** `https://x402.browserbase.com`  
**Pricing:** $0.12/hour (paid in USDC on Base)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/browser/session/create` | POST | Create a browser session |
| `/browser/session/:id/status` | GET | Check session status |
| `/browser/session/:id/extend` | POST | Add more time |
| `/browser/session/:id` | DELETE | Terminate session |

```bash
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://x402.browserbase.com/browser/session/create&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Firecrawl

Perform web scraping with pay-per-search:

```bash
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://api.firecrawl.dev/v1/search&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"query": "AI agent frameworks", "limit": 10}'
```

### Mail.tm (Disposable Email)

**Base URL:** `https://api.mail.tm`  
**Pricing:** Free (no x402 payment required)

Mail.tm allows agents to create email addresses for signups and receive verification emails.

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/domains` | GET | No | Get available email domains |
| `/accounts` | POST | No | Create an email account |
| `/token` | POST | No | Get authentication token |
| `/messages` | GET | Yes | List all messages |
| `/messages/:id` | GET | Yes | Get full message content |
| `/me` | GET | Yes | Get account info |

#### Create Email Account

```bash
# 1. Get available domain
DOMAIN=$(curl -s https://api.mail.tm/domains | jq -r '.["hydra:member"][0].domain')

# 2. Create account with unique address
curl -s -X POST https://api.mail.tm/accounts \
  -H "Content-Type: application/json" \
  -d '{"address": "agent-'$(date +%s)'@'"$DOMAIN"'", "password": "SecurePass123!"}'
```

#### Get Token and Check Messages

```bash
# Get auth token
TOKEN=$(curl -s -X POST https://api.mail.tm/token \
  -H "Content-Type: application/json" \
  -d '{"address": "YOUR_EMAIL", "password": "YOUR_PASSWORD"}' | jq -r '.token')

# List messages
curl -s https://api.mail.tm/messages -H "Authorization: Bearer $TOKEN"

# Read specific message
curl -s https://api.mail.tm/messages/MESSAGE_ID -H "Authorization: Bearer $TOKEN"
```

**Important:** Store email credentials (address, password, token) for later use. Consider saving to `.agent-emails.json` (gitignored).

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid or missing THIRDWEB_SECRET_KEY | Check environment variable |
| 402 Payment Required | Insufficient balance | Auto-open payment link (see above) |
| 400 Bad Request | Invalid URL or method | Verify request parameters |
| 404 Not Found | Wrong endpoint | Check x402-specific endpoint (e.g., `x402.browserbase.com`) |
| 500 Server Error | thirdweb or target API issue | Retry or check service status |

## Common Mistakes

1. **Using wrong subdomain**: `api.browserbase.com` vs `x402.browserbase.com`
2. **Using wrong path**: `/v1/sessions` vs `/browser/session/create`
3. **Not checking for payment links**: Always parse response for `link` field

## Additional Resources

- See [references/API-REFERENCE.md](references/API-REFERENCE.md) for complete API documentation
- See [references/SERVICES.md](references/SERVICES.md) for x402-compatible service examples

## Links

- [x402 Protocol](https://x402.org)
- [thirdweb x402 Documentation](https://portal.thirdweb.com/x402)
- [Browserbase x402 Docs](https://docs.browserbase.com/integrations/x402/introduction)

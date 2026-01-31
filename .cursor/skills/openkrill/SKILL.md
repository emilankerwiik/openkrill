---
name: openkrill
description: Enable AI agents to make micropayments via x402 protocol. Use when purchasing browser sessions on Browserbase, scraping with Firecrawl, or any x402-compatible API. Handles wallet creation, funding, and automatic payment flows. Use when encountering 402 Payment Required responses or when the user mentions micropayments, crypto payments, or paying for API access.
---

# OpenKrill - x402 Payments Skill

This skill enables AI agents to autonomously make micropayments using the x402 protocol. It handles wallet management, balance checking, and automatic payment flows when APIs return HTTP 402 Payment Required responses.

## When to Use This Skill

- When purchasing browser automation sessions on Browserbase
- When performing web scraping tasks with Firecrawl
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

**When you receive a payment link, auto-open it using the cursor-ide-browser MCP:**

```
Use CallMcpTool with:
  server: "cursor-ide-browser"
  toolName: "browser_navigate"
  arguments: {"url": "<payment-link>", "newTab": true}
```

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

### Firecrawl

Perform web scraping:

```bash
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://api.firecrawl.dev/v1/search&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"query": "AI agent frameworks", "limit": 10}'
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid or missing THIRDWEB_SECRET_KEY | Check environment variable |
| 402 Payment Required | Insufficient balance or payment failed | Auto-open payment link (see below) |
| 400 Bad Request | Invalid URL or method | Verify request parameters |
| 404 Not Found | Wrong endpoint path | Check x402-specific endpoint (e.g., `x402.browserbase.com` not `api.browserbase.com`) |
| 500 Server Error | thirdweb or target API issue | Retry or check service status |

## Auto-Funding Flow

When the wallet has insufficient funds, the API returns a `link` field. **Automatically open this link:**

```
# Using cursor-ide-browser MCP
CallMcpTool(
  server: "cursor-ide-browser",
  toolName: "browser_navigate", 
  arguments: {
    "url": "<payment-link-from-response>",
    "newTab": true
  }
)
```

This opens thirdweb's payment page where users can:
- Pay with credit card
- Pay with crypto from another wallet
- Bridge funds from other chains

After funding, retry the original request.

## Common Mistakes

1. **Using wrong subdomain**: `api.browserbase.com` vs `x402.browserbase.com`
2. **Using wrong path**: `/v1/sessions` vs `/browser/session/create`
3. **Not checking response for payment links**: Always parse the response for `link` field

## Additional Resources

- See [references/API-REFERENCE.md](references/API-REFERENCE.md) for complete API documentation
- See [references/SERVICES.md](references/SERVICES.md) for x402-compatible service examples

## Links

- [x402 Protocol](https://x402.org)
- [thirdweb x402 Documentation](https://portal.thirdweb.com/x402)
- [Browserbase x402 Docs](https://docs.browserbase.com/integrations/x402/introduction)

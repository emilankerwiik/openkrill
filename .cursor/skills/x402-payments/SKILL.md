---
name: x402-payments
description: Enable AI agents to make micropayments via x402 protocol. Use when purchasing browser sessions on Browserbase, scraping with Firecrawl, or any x402-compatible API. Handles wallet creation, funding, and automatic payment flows. Use when encountering 402 Payment Required responses or when the user mentions micropayments, crypto payments, or paying for API access.
---

# x402 Payments Skill

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

## Core Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Check or create wallet
- [ ] Step 2: Check wallet balance
- [ ] Step 3: Make payment request
- [ ] Step 4: Handle response
```

### Step 1: Check or Create Wallet

First, ensure a server wallet exists. Run the wallet creation script:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/create-wallet.ts
```

Or use the thirdweb API directly:

```bash
curl -X POST https://api.thirdweb.com/v1/wallets/server \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"identifier": "agent-wallet-001"}'
```

The response will include the wallet address. Store this for subsequent operations.

### Step 2: Check Wallet Balance

Before making payments, verify sufficient USDC balance:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/check-balance.ts <wallet-address>
```

If balance is insufficient, guide the user to fund the wallet:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/fund-wallet.ts <wallet-address>
```

### Step 3: Make Payments with fetchWithPayment

Wrap all x402-compatible API calls using the fetch-with-payment script:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.browserbase.com/v1/sessions" \
  --method "POST" \
  --body '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

Or call the thirdweb API directly:

```bash
curl -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://api.browserbase.com/v1/sessions&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Step 4: Handle the Response

The fetchWithPayment endpoint will:
1. Make the initial request to the target API
2. If a 402 Payment Required response is received, automatically sign and submit payment
3. Retry the request with the payment header
4. Return the final response

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

Create browser automation sessions:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.browserbase.com/v1/sessions" \
  --method "POST" \
  --body '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Firecrawl

Perform web scraping:

```bash
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.firecrawl.dev/v1/search" \
  --method "POST" \
  --body '{"query": "AI agent frameworks", "limit": 10}'
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid or missing THIRDWEB_SECRET_KEY | Check environment variable |
| 402 Payment Required | Insufficient balance or payment failed | Fund wallet with USDC |
| 400 Bad Request | Invalid URL or method | Verify request parameters |
| 500 Server Error | thirdweb or target API issue | Retry or check service status |

## Utility Scripts

All scripts are located in `.cursor/skills/x402-payments/scripts/`:

| Script | Purpose | Usage |
|--------|---------|-------|
| `create-wallet.ts` | Create/retrieve server wallet | `npx ts-node create-wallet.ts [identifier]` |
| `check-balance.ts` | Check USDC and ETH balance | `npx ts-node check-balance.ts <address>` |
| `fetch-with-payment.ts` | Make x402 payment requests | `npx ts-node fetch-with-payment.ts --url <url> --method <method>` |
| `fund-wallet.ts` | Get funding instructions | `npx ts-node fund-wallet.ts <address>` |
| `list-services.ts` | List x402-compatible services | `npx ts-node list-services.ts` |

## Additional Resources

- See [references/API-REFERENCE.md](references/API-REFERENCE.md) for complete API documentation
- See [references/SERVICES.md](references/SERVICES.md) for x402-compatible service examples
- See [assets/config-template.json](assets/config-template.json) for environment configuration

## Links

- [x402 Protocol](https://x402.org)
- [thirdweb x402 Documentation](https://portal.thirdweb.com/x402)
- [Agent Skills Specification](https://agentskills.io/specification)

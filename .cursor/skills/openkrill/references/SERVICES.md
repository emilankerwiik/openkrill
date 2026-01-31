# x402-Compatible Services

This document lists services that accept micropayments via the x402 protocol.

**IMPORTANT:** x402-enabled services often use a different subdomain than their standard API. Always check for `x402.` prefixed endpoints!

---

## Browserbase

**Website:** https://browserbase.com  
**Documentation:** https://docs.browserbase.com/integrations/x402/introduction

### Overview

Browserbase is a cloud browser automation platform that enables agents to spin up headless browsers for web scraping, testing, and automation tasks. With x402 integration, agents can pay per browser session without API keys or billing setup.

### x402 Endpoint

**Base URL:** `https://x402.browserbase.com` (NOT `api.browserbase.com`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/browser/session/create` | POST | Create a browser session |
| `/browser/session/:id/status` | GET | Check session status |
| `/browser/session/:id/extend` | POST | Add more time |
| `/browser/session/:id` | DELETE | Terminate session |

#### Create Session
```
POST https://x402.browserbase.com/browser/session/create
```

Creates a new browser session.

**Request Body:**
```json
{
  "browserSettings": {
    "viewport": {
      "width": 1920,
      "height": 1080
    }
  }
}
```

**Response:**
```json
{
  "id": "session_abc123",
  "status": "running",
  "connectUrl": "wss://...",
  "debuggerUrl": "https://..."
}
```

#### Get Session Status
```
GET https://x402.browserbase.com/browser/session/{sessionId}/status
```

#### Extend Session
```
POST https://x402.browserbase.com/browser/session/{sessionId}/extend
```

#### Terminate Session
```
DELETE https://x402.browserbase.com/browser/session/{sessionId}
```

### Pricing

- **Rate:** $0.12/hour (paid in USDC on Base)
- Minimum purchase: ~0.002 USDC (5 minutes)

| Duration | Cost (USDC) |
|----------|-------------|
| 5 min | $0.01 |
| 15 min | $0.03 |
| 30 min | $0.06 |
| 60 min | $0.12 |

### Example Usage

```bash
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://x402.browserbase.com/browser/session/create&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

### Use Cases

- Web scraping and data extraction
- Automated testing
- Screenshot generation
- Form filling automation
- Monitoring website changes

---

## Firecrawl

**Website:** https://firecrawl.dev  
**Documentation:** https://docs.firecrawl.dev/x402/

### Overview

Firecrawl is a web scraping and search API that extracts structured data from websites. The x402 integration enables pay-per-search without subscriptions.

### Endpoints

#### Search
```
POST https://api.firecrawl.dev/v1/search
```

Search the web and return structured results.

**Request Body:**
```json
{
  "query": "AI agent frameworks 2024",
  "limit": 10,
  "formats": ["markdown"]
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "url": "https://example.com/article",
      "title": "Top AI Agent Frameworks",
      "content": "...",
      "markdown": "..."
    }
  ]
}
```

#### Scrape
```
POST https://api.firecrawl.dev/v1/scrape
```

Scrape a single URL and extract content.

**Request Body:**
```json
{
  "url": "https://example.com/page",
  "formats": ["markdown", "html"],
  "onlyMainContent": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://example.com/page",
    "markdown": "# Page Title\n\nContent...",
    "html": "<h1>Page Title</h1>...",
    "metadata": {
      "title": "Page Title",
      "description": "..."
    }
  }
}
```

#### Crawl
```
POST https://api.firecrawl.dev/v1/crawl
```

Crawl multiple pages from a starting URL.

**Request Body:**
```json
{
  "url": "https://example.com",
  "limit": 50,
  "maxDepth": 3
}
```

### Pricing

- Pay-per-request via x402
- Varies by operation complexity

### Example Usage

```bash
# Search
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://api.firecrawl.dev/v1/search&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"query": "machine learning tutorials", "limit": 5}'

# Scrape
curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=https://api.firecrawl.dev/v1/scrape&method=POST" \
  -H "Content-Type: application/json" \
  -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
  -d '{"url": "https://docs.example.com/guide", "formats": ["markdown"]}'
```

### Use Cases

- Research and information gathering
- Content aggregation
- Competitive analysis
- Documentation extraction
- Data collection for training

---

## Adding New Services

As the x402 ecosystem grows, more services will support micropayments. To use any x402-compatible service:

1. **Check for x402 Support**
   - Look for x402 documentation or 402 Payment Required in API responses
   - **Check for x402-specific subdomain** (e.g., `x402.service.com` vs `api.service.com`)

2. **Identify the Correct Endpoint**
   - Visit the service's root x402 URL to see available endpoints
   - Example: `curl https://x402.browserbase.com/` shows all endpoints

3. **Use thirdweb fetchWithPayment**
   ```bash
   curl -s -X POST "https://api.thirdweb.com/v1/payments/x402/fetch?url=<x402-endpoint>&method=<HTTP-method>" \
     -H "Content-Type: application/json" \
     -H "x-secret-key: $THIRDWEB_SECRET_KEY" \
     -d '<request-body>'
   ```

4. **Handle Insufficient Funds**
   - If response contains a `link` field, auto-open it with cursor-ide-browser MCP
   - User funds wallet, then retry the request

---

## Service Directory

| Service | Category | Endpoint Base | Status |
|---------|----------|---------------|--------|
| Browserbase | Browser Automation | api.browserbase.com | Active |
| Firecrawl | Web Scraping | api.firecrawl.dev | Active |

For the latest list of x402-compatible services, visit:
- https://x402.org
- https://portal.thirdweb.com/x402

---

## Tips for Agents

1. **Start with small requests** to verify payment works
2. **Cache results** when possible to reduce costs
3. **Check balance** before making expensive requests
4. **Use appropriate limits** on search/scrape operations
5. **Handle errors gracefully** - retry on transient failures

# x402-Compatible Services

This document lists services that accept micropayments via the x402 protocol.

---

## Browserbase

**Website:** https://browserbase.com  
**Documentation:** https://docs.browserbase.com/integrations/x402/introduction

### Overview

Browserbase is a cloud browser automation platform that enables agents to spin up headless browsers for web scraping, testing, and automation tasks. With x402 integration, agents can pay per browser session without API keys or billing setup.

### Endpoints

#### Create Session
```
POST https://api.browserbase.com/v1/sessions
```

Creates a new browser session.

**Request Body:**
```json
{
  "browserSettings": {
    "viewport": {
      "width": 1920,
      "height": 1080
    },
    "blockAds": true
  },
  "timeout": 300000
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

#### Get Session
```
GET https://api.browserbase.com/v1/sessions/{sessionId}
```

Retrieves session details.

#### Delete Session
```
DELETE https://api.browserbase.com/v1/sessions/{sessionId}
```

Terminates a browser session.

### Pricing

- Pay-per-session: ~$0.01-0.05 depending on duration
- USDC payments via x402

### Example Usage

```bash
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.browserbase.com/v1/sessions" \
  --method "POST" \
  --body '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
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
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.firecrawl.dev/v1/search" \
  --method "POST" \
  --body '{"query": "machine learning tutorials", "limit": 5}'

# Scrape
npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
  --url "https://api.firecrawl.dev/v1/scrape" \
  --method "POST" \
  --body '{"url": "https://docs.example.com/guide", "formats": ["markdown"]}'
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

2. **Identify the Endpoint**
   - Find the API endpoint URL and required parameters

3. **Use fetchWithPayment**
   ```bash
   npx ts-node .cursor/skills/x402-payments/scripts/fetch-with-payment.ts \
     --url "<service-endpoint>" \
     --method "<HTTP-method>" \
     --body '<request-body>'
   ```

4. **Monitor Payments**
   - Check wallet balance after requests
   - Review transaction history on block explorer

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

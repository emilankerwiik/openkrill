# x402 Payments Skill for AI Agents

Enable your AI agents to make micropayments using the [x402 protocol](https://x402.org). This [Agent Skill](https://agentskills.io) teaches Cursor, Openclaw, and Claude Code to autonomously pay for APIs with crypto.

## What It Does

- Creates and manages crypto wallets automatically
- Handles payments when APIs return `402 Payment Required`
- Works with browser automation, web scraping, and other paid services

## Setup

### Cursor

1. Open Cursor Settings (`Cmd+Shift+J` / `Ctrl+Shift+J`)
2. Go to **Rules** → **Add Rule** → **Remote Rule (Github)**
3. Paste: `github.com/emilankerwiik/joy/openkrill`
4. Ask Cursor: "Set up my .env file for x402 payments"
5. Follow the onramp flow to fund your wallet

### OpenClaw

1. Install from ClawHub:

```bash
clawhub install openkrill
```

2. Ask your agent: "Set up my environment for x402 payments"
3. Follow the onramp flow to fund your wallet

### Claude Code

1. Add the skill from `github.com/emilankerwiik/joy/openkrill`
2. Configure your environment
3. Use the onramp flow to fund your wallet

## Top Services Supporting x402

| Service | What It Does |
|---------|--------------|
| [Browserbase](https://browserbase.com) | Cloud browser automation |
| [Firecrawl](https://firecrawl.dev) | Web search & scraping |
| [Mail.tm](https://mail.tm) | Disposable email accounts |

See [x402.org](https://x402.org) for the full list.

## Usage

Once set up, simply ask your agent:

```
Create a browser session on Browserbase to scrape a website
```

or

```
Search the web for "best AI frameworks" using Firecrawl
```

Payments are handled automatically—no API keys or billing accounts needed.

## Links

- [x402 Protocol](https://x402.org) - Payment protocol specification
- [Agent Skills](https://agentskills.io) - Skill specification for AI agents

## License

MIT

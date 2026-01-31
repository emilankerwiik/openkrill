# x402 Payments Skill for AI Agents

Give your AI agents the ability to pay for APIs with crypto. This [Agent Skill](https://agentskills.io) enables Cursor (and other AI coding assistants) to make micropayments using the [x402 protocol](https://x402.org), allowing your agent to autonomously access paid services like browser automation and web scraping.

## What is This?

When AI agents need to interact with external services, they often hit paywalls or require API keys with billing accounts. The x402 protocol solves this by enabling pay-per-request micropayments with cryptocurrency (USDC on Base).

This skill teaches your AI agent to:
- Create and manage a crypto wallet
- Check wallet balances
- Automatically pay when APIs return `402 Payment Required`
- Interact with services like Browserbase (browser automation) and Firecrawl (web scraping)

---

## Requirements

Before you begin, you'll need:

| Requirement | Description | How to Get |
|-------------|-------------|------------|
| **Cursor** | AI-powered code editor | [cursor.com](https://cursor.com) |
| **thirdweb Account** | Free account for wallet management | [thirdweb.com](https://thirdweb.com) |
| **thirdweb Secret Key** | API key for server-side operations | Created in thirdweb dashboard |
| **USDC on Base** | Stablecoin for payments (~$10 recommended) | Coinbase, Moonpay, or bridge |
| **ETH on Base** | For gas fees (~$2 recommended) | Same as above |

---

## Complete Setup Guide

### Step 1: Add the Skill to Cursor

1. Open **Cursor** on your computer
2. Open the command palette with `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
3. Type **"Cursor Settings"** and select it (or use `Cmd+Shift+J` / `Ctrl+Shift+J`)
4. Navigate to the **"Rules"** tab in the sidebar
5. Click **"Add Rule"** → **"Remote Rule (Github)"**
6. Paste this URL:
   ```
   github.com/emilankerwiik/joy/openkrill
   ```
7. Click **Add** to install the skill

Your agent now knows how to make x402 payments. But first, we need to set up a wallet and fund it.

---

### Step 2: Create a thirdweb Account & Server Wallet

The skill uses [thirdweb](https://thirdweb.com) to manage wallets and process payments. thirdweb provides **server wallets**—secure, programmatic wallets that your AI agent can use without you managing private keys.

#### 2a. Create Your thirdweb Account

1. Go to **[thirdweb.com](https://thirdweb.com)**
2. Click **"Sign In"** (top right)
3. Choose your sign-in method:
   - **Email** (recommended for simplicity)
   - **Google**
   - **GitHub**
   - **Wallet** (MetaMask, Coinbase Wallet, etc.)
4. Complete the sign-up process

#### 2b. Create a Project & API Key

Once logged in, you'll be in the thirdweb dashboard. Now create an API key:

1. Click **"Settings"** in the left sidebar
2. Click **"API Keys"** tab
3. Click **"Create API Key"** button
4. Configure your key:
   - **Name**: `x402-agent` (or any memorable name)
   - **Allowed Domains**: Leave empty for now (or add `localhost` if you want)
   - **Allowed Bundle IDs**: Leave empty
5. Click **"Create"**

You'll now see two keys:
- **Client ID**: For frontend/browser use (you won't need this)
- **Secret Key**: For server-side operations (**this is what you need**)

6. Click **"Copy"** next to the Secret Key
7. **Save this somewhere safe**—you won't be able to see it again!

> ⚠️ **Security Note**: The secret key grants full access to create wallets and sign transactions. Never commit it to public repositories or share it publicly.

#### 2c. Understanding Server Wallets

thirdweb's **server wallets** are different from regular crypto wallets:

| Feature | Regular Wallet (MetaMask) | Server Wallet (thirdweb) |
|---------|---------------------------|--------------------------|
| Private key | You manage it | thirdweb manages it securely |
| Access | Browser extension | API with secret key |
| Use case | Manual transactions | Automated/programmatic |
| Recovery | Seed phrase | Tied to your thirdweb account |

When you create a server wallet, thirdweb:
- Generates and securely stores the private key
- Gives you the public wallet address
- Lets you sign transactions via API using your secret key

This means your AI agent can make payments without you ever handling private keys directly.

---

### Step 3: Configure Your Environment (.env File)

Your thirdweb secret key needs to be stored in an environment file so the scripts can access it.

#### If you're setting this up with Cursor:

Simply ask Cursor:
```
Set up my .env file for x402 payments
```

Cursor will:
1. Check if `.env` exists (create it if not)
2. Check if `THIRDWEB_SECRET_KEY` is configured
3. If not, open the thirdweb dashboard for you to get a key
4. Open the `.env` file for you to paste the key

#### Manual Setup:

1. **Create the `.env` file** in your project root:

```bash
touch .env
```

2. **Add your secret key** to the file:

```env
# x402 Payments Configuration
# Get your secret key at https://thirdweb.com/dashboard/settings/api-keys

# Required
THIRDWEB_SECRET_KEY=your-secret-key-here

# Optional - Override defaults
# X402_WALLET_ADDRESS=
# X402_CHAIN_ID=8453
# X402_MAX_PAYMENT=10.00
```

3. **Add `.env` to `.gitignore`** (if not already):

```bash
echo ".env" >> .gitignore
```

> 💡 **Tip**: If you already have a `.env` file with other variables, just add the `THIRDWEB_SECRET_KEY` line to it.

---

### Step 4: Create Your Agent Wallet

Now ask Cursor to create a wallet for your agent. In Cursor's chat (Cmd+L / Ctrl+L), type:

```
Create a wallet for x402 payments
```

Cursor will run the wallet creation script. Behind the scenes, it executes:

```bash
npx ts-node openkrill/scripts/create-wallet.ts
```

You'll see output like:

```
Creating/retrieving wallet with identifier: x402-agent-wallet

✓ Wallet ready
  Address: 0x1234567890abcdef1234567890abcdef12345678
  User ID: ...
  Created: 2025-01-31T12:00:00.000Z
```

**Save the wallet address**—you'll need it to fund the wallet.

> 💡 **Tip**: The same identifier always returns the same wallet. If you run the script again, you'll get the same address.

---

### Step 5: Fund Your Wallet

Your wallet needs two things:
1. **USDC** - for paying services (minimum $5-10 recommended)
2. **ETH** - for gas fees (minimum ~$1-2 recommended)

Both must be on **Base** network (Chain ID: 8453).

#### Option A: Direct Transfer (If you already have crypto)

If you already have USDC and ETH on Base:
1. Open your existing wallet (Coinbase, MetaMask, etc.)
2. Send USDC to your agent's wallet address on **Base network**
3. Send a small amount of ETH (~0.005 ETH) for gas fees

#### Option B: Buy with Card/Bank (Fiat Onramp)

If you're new to crypto, use a fiat onramp service:

| Provider | Link | Min Amount | Notes |
|----------|------|------------|-------|
| **Coinbase** | [coinbase.com](https://www.coinbase.com/) | $1 | Best for US users, supports direct bank transfer |
| **thirdweb Pay** | [thirdweb.com/pay](https://thirdweb.com/pay) | $1 | Integrated with thirdweb ecosystem |
| **Moonpay** | [moonpay.com](https://www.moonpay.com/) | $20 | Wide card support, global |
| **Transak** | [transak.com](https://transak.com/) | $15 | Many payment methods |

**Steps for onramping:**

1. Visit one of the providers above
2. Select **USDC** as the token to purchase
3. Select **Base** as the network
4. Enter your agent wallet address as the destination
5. Purchase at least **$10 USDC**
6. Repeat for **ETH on Base** (just $2-5 worth for gas)

#### Option C: Bridge from Another Chain

If you have USDC on Ethereum or another chain:

1. Go to [bridge.base.org](https://bridge.base.org/)
2. Connect your wallet
3. Bridge USDC from Ethereum → Base
4. Bridge a small amount of ETH for gas

---

### Step 6: Verify Your Balance

Ask Cursor to check your wallet balance:

```
Check my x402 wallet balance
```

Or run directly:

```bash
npx ts-node openkrill/scripts/check-balance.ts 0xYOUR_WALLET_ADDRESS
```

You should see:

```
Checking balance for: 0x1234...5678
Chain: Base (8453)

Balances:
  ETH:  0.005000 ETH
  USDC: $10.00

✓ Wallet is funded and ready for x402 payments
```

If you see "Wallet needs funding", go back to Step 5.

---

### Step 7: Make Your First Payment! 🎉

Now the exciting part. Ask Cursor to use a paid service. Here are some examples:

#### Example 1: Create a Browser Session (Browserbase)

```
Create a browser session on Browserbase to scrape a website
```

Cursor will automatically:
1. Call the Browserbase API
2. Receive a 402 Payment Required response
3. Sign and submit a USDC payment
4. Retry the request with the payment
5. Return the browser session details

#### Example 2: Search the Web (Firecrawl)

```
Search the web for "best AI agent frameworks 2025" using Firecrawl
```

#### Example 3: Scrape a Webpage (Firecrawl)

```
Scrape the content from https://docs.cursor.com using Firecrawl
```

#### Example 4: Create an Email Address (Mail.tm)

```
Create a disposable email address for me so I can sign up for a service
```

Cursor will automatically:
1. Fetch available email domains from Mail.tm
2. Create a unique email account
3. Return the email address and store credentials for later use

#### Example 5: Check Email Inbox

```
Check my agent email inbox for verification emails
```

#### Manual CLI Example

You can also run payments directly:

```bash
npx ts-node openkrill/scripts/fetch-with-payment.ts \
  --url "https://api.browserbase.com/v1/sessions" \
  --method "POST" \
  --body '{"browserSettings": {"viewport": {"width": 1920, "height": 1080}}}'
```

---

## How It Works

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Agent     │───▶│  thirdweb    │───▶│  Paid API   │
│  (Cursor)   │    │  x402 Proxy  │    │ (e.g. BB)   │
└─────────────┘    └──────────────┘    └─────────────┘
       │                  │                   │
       │  1. Request      │                   │
       │────────────────▶│                   │
       │                  │  2. Forward       │
       │                  │─────────────────▶│
       │                  │                   │
       │                  │  3. 402 Payment   │
       │                  │◀─────────────────│
       │                  │     Required      │
       │                  │                   │
       │                  │  4. Sign payment  │
       │                  │  5. Retry with    │
       │                  │     X-PAYMENT     │
       │                  │─────────────────▶│
       │                  │                   │
       │                  │  6. Success!      │
       │  7. Response     │◀─────────────────│
       │◀────────────────│                   │
       │                  │                   │
```

1. Your agent makes a request to an x402-compatible API
2. thirdweb's proxy forwards the request
3. The API responds with `402 Payment Required` and payment details
4. thirdweb signs a payment authorization using your wallet
5. The request is retried with the payment header
6. The API verifies the payment and returns the response
7. Your agent receives the data

All of this happens automatically—your agent just makes API calls and payments are handled behind the scenes.

---

## Supported Services

| Service | What it Does | Endpoint | Pricing |
|---------|--------------|----------|---------|
| [Browserbase](https://browserbase.com) | Cloud browser automation | `x402.browserbase.com` | ~$0.01-0.05/session |
| [Firecrawl](https://firecrawl.dev) | Web search & scraping | `api.firecrawl.dev/v1/search` | Pay per search |
| [Firecrawl Scrape](https://firecrawl.dev) | Single page scraping | `api.firecrawl.dev/v1/scrape` | Pay per scrape |
| [Mail.tm](https://mail.tm) | Disposable email accounts | `api.mail.tm` | Free |

More services are being added to the x402 ecosystem. See [x402.org](https://x402.org) for the latest.

---

## Troubleshooting

### "THIRDWEB_SECRET_KEY environment variable is not set"

Make sure your secret key is properly configured:
```bash
# Check if it's set
echo $THIRDWEB_SECRET_KEY

# If empty, export it
export THIRDWEB_SECRET_KEY='your-key-here'
```

### "Wallet needs funding" / "402 Payment Required"

Your wallet doesn't have enough USDC or ETH:
1. Check balance: `npx ts-node openkrill/scripts/check-balance.ts YOUR_ADDRESS`
2. Fund the wallet with USDC and ETH on Base (see Step 5)

### "Invalid Ethereum address format"

Make sure you're using a valid Ethereum address starting with `0x` followed by 40 hexadecimal characters.

### Payments are failing

1. Verify your wallet has sufficient balance
2. Check you have ETH for gas fees
3. Ensure you're on Base network (chain ID 8453)
4. Try with a small request first to confirm setup works

### Can't find the wallet I created earlier

Run the list command to see all wallets:
```bash
npx ts-node openkrill/scripts/create-wallet.ts list
```

---

## Project Structure

```
joy/
├── openkrill/                    # The Agent Skill
│   ├── SKILL.md                  # Main skill definition (what agents read)
│   ├── scripts/                  # Executable TypeScript utilities
│   │   ├── create-wallet.ts      # Create/retrieve server wallets
│   │   ├── check-balance.ts      # Check ETH & USDC balances
│   │   ├── fund-wallet.ts        # Funding instructions & onramp links
│   │   ├── fetch-with-payment.ts # Core x402 fetch wrapper
│   │   ├── list-services.ts      # List x402-compatible services
│   │   └── create-email.ts       # Create/manage disposable emails
│   ├── references/               # Detailed documentation
│   │   ├── API-REFERENCE.md      # Complete API docs
│   │   └── SERVICES.md           # Service-specific guides
│   └── assets/
│       └── config-template.json  # Configuration template
└── landing/                      # Landing page (Next.js)
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Create wallet | `npx ts-node openkrill/scripts/create-wallet.ts` |
| List wallets | `npx ts-node openkrill/scripts/create-wallet.ts list` |
| Check balance | `npx ts-node openkrill/scripts/check-balance.ts <address>` |
| Funding help | `npx ts-node openkrill/scripts/fund-wallet.ts <address>` |
| List services | `npx ts-node openkrill/scripts/list-services.ts` |
| Make payment | `npx ts-node openkrill/scripts/fetch-with-payment.ts --url <url> --method POST --body '{...}'` |
| Create email | `npx ts-node openkrill/scripts/create-email.ts` |
| List emails | `npx ts-node openkrill/scripts/create-email.ts list` |
| Check inbox | `npx ts-node openkrill/scripts/create-email.ts messages <email>` |
| Read message | `npx ts-node openkrill/scripts/create-email.ts read <email> <messageId>` |

---

## Links

- [x402 Protocol](https://x402.org) - The payment protocol specification
- [thirdweb x402 Docs](https://portal.thirdweb.com/x402) - thirdweb's x402 documentation
- [Agent Skills](https://agentskills.io) - The skill specification for AI agents
- [Browserbase x402](https://docs.browserbase.com/integrations/x402/introduction) - Browser automation docs
- [Firecrawl x402](https://docs.firecrawl.dev/x402/) - Web scraping docs

---

## License

MIT

---

## Contributing

Contributions are welcome! Feel free to:
- Add support for new x402-compatible services
- Improve documentation
- Report issues

Open a PR or issue on [GitHub](https://github.com/emilankerwiik/joy).

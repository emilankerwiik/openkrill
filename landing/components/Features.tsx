"use client";

import {
  CreditCard,
  Wallet,
  Globe,
  Search,
  Layers,
  DollarSign,
} from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Automatic Payments",
    description:
      "x402 protocol automatically handles 402 Payment Required responses. No manual intervention needed.",
  },
  {
    icon: Wallet,
    title: "Wallet Management",
    description:
      "Create and manage server wallets via thirdweb API. Same identifier always returns the same wallet.",
  },
  {
    icon: Globe,
    title: "Browserbase",
    description:
      "Spin up cloud browser sandboxes for web automation, scraping, and testing with pay-per-session pricing.",
  },
  {
    icon: Search,
    title: "Firecrawl",
    description:
      "Pay-per-scrape web extraction. Search and crawl websites with structured data output.",
  },
  {
    icon: Layers,
    title: "Multi-chain",
    description:
      "Payments work on Base, Arbitrum, and 170+ EVM chains. Low fees on L2 networks.",
  },
  {
    icon: DollarSign,
    title: "USDC Payments",
    description:
      "Stablecoin-based payments mean no volatility. Know exactly what you are spending.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-coral-500 font-medium text-sm mb-3">Features</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4">
            Everything agents need to pay.
          </h2>
          <p className="text-lg text-neutral-500">
            A complete toolkit for enabling autonomous payments in your AI agents.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card p-6 rounded-2xl bg-white border border-neutral-200"
            >
              <div className="w-10 h-10 rounded-xl bg-coral-50 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-coral-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

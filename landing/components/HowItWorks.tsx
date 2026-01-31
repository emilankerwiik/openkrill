"use client";

const steps = [
  {
    number: "01",
    title: "Configure API key",
    description:
      "Get your secret key from thirdweb dashboard and set the THIRDWEB_SECRET_KEY environment variable.",
    code: "export THIRDWEB_SECRET_KEY='your-key'",
  },
  {
    number: "02",
    title: "Create wallet",
    description:
      "The agent creates a server wallet using a unique identifier. Fund it with USDC and ETH for gas.",
    code: "npx ts-node scripts/create-wallet.ts",
  },
  {
    number: "03",
    title: "Discover services",
    description:
      "List available services like Browserbase and Firecrawl that accept x402 micropayments.",
    code: "npx ts-node scripts/list-services.ts",
  },
  {
    number: "04",
    title: "Make payments",
    description:
      "Wrap API calls with fetchWithPayment. The x402 protocol handles payment negotiation automatically.",
    code: "npx ts-node scripts/fetch-with-payment.ts --url <api>",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <p className="text-coral-500 font-medium text-sm mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4">
            Escape the swarm in minutes
          </h2>
          <p className="text-lg text-neutral-500">
            Be free to create browser automations, track prediction markets, pull data from the web, and more in a few steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-neutral-50 border border-neutral-100"
            >
              {/* Step number */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-neutral-200">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-neutral-900">
                  {step.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                {step.description}
              </p>

              {/* Code */}
              <div className="code-block px-4 py-3 text-sm overflow-x-auto">
                <code className="text-neutral-700">{step.code}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

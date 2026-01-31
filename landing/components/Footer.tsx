"use client";

import { Github } from "lucide-react";

const links = {
  resources: [
    { name: "Agent Skills Spec", href: "https://agentskills.io/specification" },
    { name: "x402 Protocol", href: "https://x402.org" },
    { name: "thirdweb Docs", href: "https://portal.thirdweb.com/x402" },
  ],
  services: [
    { name: "Browserbase", href: "https://browserbase.com" },
    { name: "Firecrawl", href: "https://firecrawl.dev" },
    { name: "thirdweb", href: "https://thirdweb.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="py-16 bg-white border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">
              Joy
            </h3>
            <p className="text-neutral-500 text-sm mb-4">
              An open-source Agent Skill for enabling AI agents to make micropayments via x402.
            </p>
            <a
              href="https://github.com/emilankerwiik/openkrill"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              <span>emilankerwiik/openkrill</span>
            </a>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-neutral-900 font-medium text-sm mb-4">Resources</h4>
              <ul className="space-y-3">
                {links.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-neutral-900 font-medium text-sm mb-4">Services</h4>
              <ul className="space-y-3">
                {links.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-neutral-900 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-neutral-400 text-sm">
            Built with the{" "}
            <a
              href="https://agentskills.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Agent Skills
            </a>{" "}
            open standard
          </p>
          <p className="text-neutral-400 text-sm">MIT License</p>
        </div>
      </div>
    </footer>
  );
}

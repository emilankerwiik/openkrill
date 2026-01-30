"use client";

import CopyInstructions from "./CopyInstructions";

const editors = [
  { name: "Cursor", logo: "/logos/cursor.svg" },
  { name: "Claude Code", logo: "/logos/claude.svg" },
  { name: "Codex", logo: "/logos/openai.svg" },
  { name: "VS Code", logo: "/logos/vscode.svg" },
  { name: "Antigravity", logo: "/logos/antigravity.svg" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-12 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
            <span className="text-neutral-600 text-sm">Built for the onchain economy</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-[1.1] tracking-tight mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Give Opus 4.5 money to build faster.
        </h1>

        {/* Subheadline */}
        <p 
          className="text-lg md:text-xl text-neutral-500 max-w-2xl mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Two-click enable your coding agent to purchase browser sessions, scrape websites, 
          and access premium APIs without profiles, keys and environment variables.
        </p>

        {/* CTA buttons */}
        <div 
          className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CopyInstructions />
          <a
            href="https://portal.thirdweb.com/x402"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
          >
            Learn about x402 →
          </a>
        </div>

        {/* Editor logos */}
        <div 
          className="mt-24 animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <p className="text-xs text-neutral-400 uppercase tracking-wider mb-6">
            Works with your favorite code editor
          </p>
          <div className="flex flex-wrap items-center gap-8">
            {editors.map((editor) => (
              <div key={editor.name} className="flex items-center gap-2.5 text-neutral-500 hover:text-neutral-700 transition-colors">
                <img 
                  src={editor.logo} 
                  alt={editor.name} 
                  className="w-6 h-6"
                />
                <span className="text-sm font-medium">{editor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

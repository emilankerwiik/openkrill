"use client";

import CopyInstructions from "./CopyInstructions";

const editors = [
  { name: "OpenClaw", logo: "/logos/openclaw.png", circular: false },
  { name: "Cursor", logo: "/logos/cursor.png", circular: true },
  { name: "Claude", logo: "/logos/claude.png", circular: true },
];

export default function Hero() {
  return (
    <section className="pt-16 pb-12 bg-white relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="gradient-blob top-20 -right-40 opacity-60" />
      
      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
            <span className="text-neutral-600 text-sm">Built for YC founders</span>
          </div>
        </div>

        {/* Main headline */}
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-[1.1] tracking-tight mb-4 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Openkrill is an agent skill for micropayments.
        </h1>

        {/* Subheadline */}
        <h2 
          className="text-lg md:text-xl text-neutral-500 max-w-2xl mb-6 animate-fade-in font-normal"
          style={{ animationDelay: "0.2s" }}
        >
          Prefill a wallet for your coding agent<br className="hidden sm:inline" /> to pay for its own tools on demand.
        </h2>

        {/* CTA buttons */}
        <div 
          className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <CopyInstructions />
        </div>

        {/* Editor logos */}
        <div 
          className="mt-12 animate-fade-in"
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
                  className={`w-6 h-6 ${editor.circular ? 'rounded-full' : ''}`}
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

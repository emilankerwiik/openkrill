"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const SKILL_COMMAND = "/create-skill Help me create this skill for Cursor: github.com/emilankerwiik/joy/x402-payments";

export default function CopyInstructions() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-btn px-6 py-3.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors flex items-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Paste to code editor</span>
        </>
      ) : (
        <>
          <span>Copy Command</span>
          <Copy className="w-4 h-4 opacity-60" />
        </>
      )}
    </button>
  );
}

export function CopyInstructionsCard() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="install" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-3xl bg-white border border-neutral-200">
          <div className="text-center">
            <p className="text-emerald-600 font-medium text-sm mb-3">Install</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Add to your editor in seconds.
            </h2>
            <p className="text-neutral-500 mb-8 max-w-md mx-auto">
              Run this command in your AI code editor:
            </p>

            {/* Command display and copy */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-full max-w-2xl">
                <div className="code-block flex items-center justify-between px-4 py-4 text-left">
                  <code className="text-neutral-700 text-sm break-all">
                    {SKILL_COMMAND}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 ml-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                    aria-label="Copy command"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Simple instruction */}
            <p className="text-neutral-400 text-sm">
              Paste this command into your editor and let the AI do the rest.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

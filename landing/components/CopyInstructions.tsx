"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CLAWHUB_COMMAND = "clawhub install openkrill";
const SKILL_COMMAND = "/create-skill github.com/emilankerwiik/openkrill";

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
      className="copy-btn px-6 py-3.5 bg-coral-500 text-white text-sm font-medium rounded-full hover:bg-coral-600 transition-colors flex items-center gap-2"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Paste to code editor</span>
        </>
      ) : (
        <>
          <span>Copy instructions</span>
          <Copy className="w-4 h-4 opacity-60" />
        </>
      )}
    </button>
  );
}

export function CopyInstructionsCard() {
  const [copiedClawhub, setCopiedClawhub] = useState(false);
  const [copiedSkill, setCopiedSkill] = useState(false);

  const handleCopyClawhub = async () => {
    try {
      await navigator.clipboard.writeText(CLAWHUB_COMMAND);
      setCopiedClawhub(true);
      setTimeout(() => setCopiedClawhub(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleCopySkill = async () => {
    try {
      await navigator.clipboard.writeText(SKILL_COMMAND);
      setCopiedSkill(true);
      setTimeout(() => setCopiedSkill(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="install" className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-neutral-200">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Ask your agent to add the skill
          </h2>

          {/* Clawhub command display and copy */}
          <div className="mb-4">
            <div className="w-full max-w-2xl">
              <div className="code-block flex items-center justify-between px-4 py-4 text-left">
                <code className="text-neutral-700 text-sm break-all">
                  {CLAWHUB_COMMAND}
                </code>
                <button
                  onClick={handleCopyClawhub}
                  className="flex-shrink-0 ml-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  aria-label="Copy clawhub command"
                >
                  {copiedClawhub ? (
                    <Check className="w-4 h-4 text-coral-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Skill command display and copy */}
          <div className="mb-4">
            <div className="w-full max-w-2xl">
              <div className="code-block flex items-center justify-between px-4 py-4 text-left">
                <code className="text-neutral-700 text-sm break-all">
                  {SKILL_COMMAND}
                </code>
                <button
                  onClick={handleCopySkill}
                  className="flex-shrink-0 ml-4 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
                  aria-label="Copy skill command"
                >
                  {copiedSkill ? (
                    <Check className="w-4 h-4 text-coral-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Manual instructions */}
          <p className="text-neutral-500 text-sm max-w-md">
            In your code editor you can also open settings, find rules, click new skills, and paste repo.
          </p>
        </div>
      </div>
    </section>
  );
}

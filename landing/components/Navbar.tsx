"use client";

import { Github } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="font-semibold text-lg text-neutral-900">
          Joy
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
          >
            How it works
          </a>
          <a
            href="#install"
            className="text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
          >
            Install
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/emilankerwiik/joy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/emilankerwiik/joy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

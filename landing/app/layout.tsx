import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Openkrill | micropayments for agents",
  description:
    "Enable AI agents to make micropayments via x402 protocol. Purchase browser sessions on Browserbase, scrape with Firecrawl, and more - all with automatic crypto payments.",
  keywords: [
    "Openkrill",
    "x402",
    "AI agents",
    "micropayments",
    "cryptocurrency",
    "Cursor",
    "Agent Skills",
    "Browserbase",
    "Firecrawl",
    "thirdweb",
  ],
  authors: [{ name: "Emil Ankerwiik" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🦐</text></svg>",
  },
  openGraph: {
    title: "Openkrill",
    description: "Give AI agents the power to pay with x402 micropayments",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}

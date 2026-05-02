import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductPulse — Find Real Pain Points from Reddit & Hacker News",
  description:
    "AI-powered research tool that autonomously mines Reddit and Hacker News to surface genuine product opportunities and unmet user needs. Built for founders, PMs, and indie hackers.",
  keywords: [
    "product research",
    "pain points",
    "Reddit analysis",
    "Hacker News",
    "market research",
    "indie hacker",
    "startup research",
    "user feedback mining",
  ],
  authors: [{ name: "Ayan Joshi" }],
  openGraph: {
    title: "ProductPulse — Find Real Pain Points from Reddit & HN",
    description:
      "AI agent that autonomously searches Reddit and Hacker News to surface product opportunities. 100% free to run.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductPulse — Find Real Pain Points from Reddit & HN",
    description:
      "AI agent that autonomously searches Reddit and Hacker News to surface product opportunities.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📡</text></svg>"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
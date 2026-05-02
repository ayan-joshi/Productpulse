import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Workspace — ProductPulse",
  description:
    "Run an AI agent to mine Reddit and Hacker News for real user pain points, unmet needs, and product opportunities in any niche.",
  openGraph: {
    title: "Research Workspace — ProductPulse",
    description:
      "Run an AI agent to mine Reddit and HN for real product pain points in any niche. Results in ~90 seconds.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Workspace — ProductPulse",
    description: "AI agent that mines Reddit + HN for real user pain points. Free, runs in ~90s.",
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}

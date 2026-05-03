"use client";

import { useState } from "react";

interface Props {
  onNicheChange: (v: string) => void;
  onRun: (niche: string) => void;
}

const CATEGORIES = [
  {
    label: "SaaS",
    niches: ["CRM for freelancers", "AI writing assistants", "no-code app builders"],
  },
  {
    label: "Health",
    niches: ["sleep tracking apps", "posture correction tools", "ADHD productivity tools"],
  },
  {
    label: "Creator",
    niches: ["newsletter monetization", "YouTube thumbnail tools", "podcast editing software"],
  },
  {
    label: "E-commerce",
    niches: ["Indian baby products", "sustainable packaging", "D2C skincare India"],
  },
];

export default function TrendingNiches({ onNicheChange, onRun }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div
      className="rounded-2xl border p-5 space-y-3"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em]">
        Popular niches to explore
      </p>

      {/* Category tabs */}
      <div className="flex gap-1.5 flex-wrap">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActiveIdx(i)}
            className="text-xs px-3 py-1 rounded-full border transition-all cursor-pointer"
            style={
              i === activeIdx
                ? {
                    background: "rgba(99,102,241,0.18)",
                    borderColor: "rgba(99,102,241,0.5)",
                    color: "#a5b4fc",
                  }
                : {
                    background: "transparent",
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Niche chips */}
      <div className="flex flex-col gap-2">
        {CATEGORIES[activeIdx].niches.map((n) => (
          <button
            key={n}
            onClick={() => {
              onNicheChange(n);
              onRun(n);
            }}
            className="w-full text-left text-xs px-3 py-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
              e.currentTarget.style.background = "rgba(99,102,241,0.06)";
              e.currentTarget.style.color = "#e2e8f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <span>{n}</span>
            <svg
              className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { ResearchReport } from "@/lib/agent";

interface Props {
  report: ResearchReport;
  niche: string;
  isExample?: boolean;
}

function Section({
  title,
  emoji,
  children,
  defaultOpen = true,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
      >
        <span className="font-medium text-sm flex items-center gap-2">
          <span>{emoji}</span>
          {title}
        </span>
        <svg
          className="w-4 h-4 text-slate-400 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function reportToMarkdown(report: ResearchReport, niche: string): string {
  const lines: string[] = [`# ProductPulse Report: ${niche}\n`];

  if (report.pain_points.length > 0) {
    lines.push("## Top Pain Points\n");
    report.pain_points.forEach((pp, i) => {
      lines.push(`### ${i + 1}. ${pp.title} (${pp.frequency}x mentions)`);
      pp.quotes.forEach((q) => lines.push(`> "${q}"`));
      lines.push("");
    });
  }

  if (report.unmet_needs.length > 0) {
    lines.push("## Unmet Needs\n");
    report.unmet_needs.forEach((n) => lines.push(`- ${n}`));
    lines.push("");
  }

  if (report.recurring_questions.length > 0) {
    lines.push("## Recurring Questions\n");
    report.recurring_questions.forEach((q) => lines.push(`- ${q}`));
    lines.push("");
  }

  if (report.opportunities.length > 0) {
    lines.push("## Product Opportunities\n");
    report.opportunities.forEach((o) => {
      lines.push(`### ${o.idea}`);
      lines.push(o.rationale);
      lines.push("");
    });
  }

  if (report.sources.length > 0) {
    lines.push("## Top Sources\n");
    report.sources.forEach((s, i) => lines.push(`${i + 1}. [${s.title}](${s.url}) — score: ${s.score}`));
  }

  return lines.join("\n");
}

function downloadJSON(report: ResearchReport, niche: string) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `productpulse-${niche.replace(/\s+/g, "-")}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportDisplay({ report, niche, isExample = false }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopyMarkdown() {
    await navigator.clipboard.writeText(reportToMarkdown(report, niche));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex flex-col gap-0.5">
          <span className="text-green-400 text-sm font-medium flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Research Report
            {niche && <span className="text-slate-500 font-normal ml-1">— {niche}</span>}
          </span>
          {!isExample && report.sources.length > 0 && (
            <span className="text-xs text-slate-500 pl-6">
              Analyzed {report.sources.length} source{report.sources.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {!isExample && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {copied ? (
                <><svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg> Copied</>
              ) : (
                <><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy MD</>
              )}
            </button>
            <button
              onClick={() => downloadJSON(report, niche)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "transparent" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download JSON
            </button>
          </div>
        )}
      </div>

      {/* Example report banner */}
      {isExample && (
        <div
          className="rounded-xl px-4 py-3 text-xs flex items-center gap-2 border"
          style={{ background: "rgba(99,102,241,0.07)", borderColor: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}
        >
          <span>📋</span>
          <span>Sample report for <strong>solopreneur productivity tools</strong> — enter your own niche and run the agent to generate real insights.</span>
        </div>
      )}

      {/* Pain Points */}
      {report.pain_points.length > 0 && (
        <Section title="Top Pain Points" emoji="🔴" defaultOpen={true}>
          <div className="space-y-3">
            {report.pain_points.map((pp, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-medium text-sm flex-1">{pp.title}</h4>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                  >
                    {pp.frequency}x
                  </span>
                </div>
                {pp.quotes.length > 0 && (
                  <div className="space-y-1.5">
                    {pp.quotes.slice(0, 2).map((q, qi) => (
                      <blockquote
                        key={qi}
                        className="text-xs italic text-slate-400 pl-3 border-l-2"
                        style={{ borderColor: "rgba(99,102,241,0.3)" }}
                      >
                        &ldquo;{q}&rdquo;
                      </blockquote>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Unmet Needs */}
      {report.unmet_needs.length > 0 && (
        <Section title="Unmet Needs" emoji="🕳️" defaultOpen={false}>
          <ul className="space-y-2">
            {report.unmet_needs.map((need, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-indigo-400 mt-0.5">→</span>
                {need}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Recurring Questions */}
      {report.recurring_questions.length > 0 && (
        <Section title="Recurring Questions" emoji="❓" defaultOpen={false}>
          <ul className="space-y-2">
            {report.recurring_questions.map((q, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-amber-400 mt-0.5">?</span>
                {q}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Opportunities */}
      {report.opportunities.length > 0 && (
        <Section title="Product Opportunities" emoji="💡" defaultOpen={true}>
          <div className="space-y-3">
            {report.opportunities.map((opp, i) => (
              <div
                key={i}
                className="rounded-xl p-4"
                style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)" }}
              >
                <h4 className="font-medium text-sm mb-1">{opp.idea}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{opp.rationale}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Sources */}
      {report.sources.length > 0 && (
        <Section title="Top Sources" emoji="📎" defaultOpen={false}>
          <div className="space-y-2">
            {report.sources.slice(0, 8).map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-xs text-slate-400 hover:text-indigo-300 transition-colors group"
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 text-xs font-medium"
                  style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8" }}
                >
                  {i + 1}
                </span>
                <span className="flex-1 group-hover:underline leading-snug">{src.title}</span>
                <span className="text-slate-600 shrink-0">▲ {src.score}</span>
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

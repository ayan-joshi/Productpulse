import { EXAMPLE_REPORT, EXAMPLE_NICHE } from "@/lib/exampleReport";

export default function ReportPreview() {
  const pp = EXAMPLE_REPORT.pain_points.slice(0, 2);
  const opps = EXAMPLE_REPORT.opportunities.slice(0, 2);

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 font-medium text-sm mb-3 uppercase tracking-widest">
            Real output
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            This is what you actually get
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A structured research report pulled from real community discussions — not surveys, not Google Trends.
          </p>
        </div>

        {/* Mock browser chrome */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}
        >
          {/* Browser bar */}
          <div
            className="px-4 py-3 border-b flex items-center gap-3"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
          >
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div
              className="flex-1 max-w-xs mx-auto rounded-md px-3 py-1 text-xs text-slate-500 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}
            >
              productpulse.app/research
            </div>
            <span className="text-xs text-green-400 flex items-center gap-1.5">
              <span className="pulse-dot" style={{ width: 6, height: 6 }} />
              Report ready
            </span>
          </div>

          {/* Report content */}
          <div className="p-6 sm:p-8 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Research Report
              <span className="text-slate-500 font-normal">— {EXAMPLE_NICHE}</span>
            </div>

            {/* Pain points */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="px-5 py-4 flex items-center gap-2 text-sm font-medium border-b" style={{ borderColor: "var(--border)" }}>
                <span>🔴</span> Top Pain Points
              </div>
              <div className="px-5 pb-5 pt-4 space-y-3">
                {pp.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border)" }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h4 className="font-medium text-sm flex-1">{item.title}</h4>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{ background: "rgba(239,68,68,0.15)", color: "#f87171" }}
                      >
                        {item.frequency}x
                      </span>
                    </div>
                    <blockquote
                      className="text-xs italic text-slate-400 pl-3 border-l-2"
                      style={{ borderColor: "rgba(99,102,241,0.3)" }}
                    >
                      &ldquo;{item.quotes[0]}&rdquo;
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              <div className="px-5 py-4 flex items-center gap-2 text-sm font-medium border-b" style={{ borderColor: "var(--border)" }}>
                <span>💡</span> Product Opportunities
              </div>
              <div className="px-5 pb-5 pt-4 space-y-3">
                {opps.map((opp, i) => (
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
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between pt-2 flex-wrap gap-4">
              <p className="text-xs text-slate-500">
                Sample for <span className="text-slate-400">{EXAMPLE_NICHE}</span> — your niche will produce different insights
              </p>
              <a
                href="/research"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                  boxShadow: "0 0 20px rgba(99,102,241,0.2)",
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Run for your niche →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

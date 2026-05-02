"use client";

interface Props {
  niche: string;
  running: boolean;
  recentSearches: string[];
  onNicheChange: (v: string) => void;
  onRun: (niche: string) => void;
}

const exampleNiches = [
  "solopreneur productivity tools",
  "standing desk ergonomics",
  "Indian baby products",
  "B2B sales automation",
  "AI writing assistants",
];

export default function ResearchForm({
  niche,
  running,
  recentSearches,
  onNicheChange,
  onRun,
}: Props) {
  const canRun = niche.trim().length > 0 && !running;

  return (
    <div
      className="space-y-5 rounded-2xl border p-6 sm:p-7"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div
        className="rounded-xl border px-4 py-3 text-xs text-slate-400"
        style={{ background: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.18)" }}
      >
        AI model configured on server. You only need to choose the niche.
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5" htmlFor="niche">
          Niche or topic to research
        </label>
        <input
          id="niche"
          type="text"
          placeholder="e.g. solopreneur productivity tools"
          value={niche}
          onChange={(e) => onNicheChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && canRun) onRun(niche);
          }}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            background: "rgba(10,10,15,0.65)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      {recentSearches.length > 0 && (
        <div>
          <p className="text-xs text-slate-500 mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((n) => (
              <button
                key={n}
                onClick={() => onNicheChange(n)}
                className="text-xs px-3 py-1 rounded-full border transition-all cursor-pointer flex items-center gap-1.5"
                style={{
                  borderColor: "rgba(99,102,241,0.25)",
                  color: "#818cf8",
                  background: "rgba(99,102,241,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)";
                  e.currentTarget.style.background = "rgba(99,102,241,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
                  e.currentTarget.style.background = "rgba(99,102,241,0.06)";
                }}
              >
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs text-slate-500 mb-2">Try one of these:</p>
        <div className="flex flex-wrap gap-2">
          {exampleNiches.map((n) => (
            <button
              key={n}
              onClick={() => onNicheChange(n)}
              className="text-xs px-3 py-1 rounded-full border transition-all cursor-pointer"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onRun(niche)}
        disabled={!canRun}
        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
        style={{
          background: canRun ? "linear-gradient(135deg, #6366f1, #7c3aed)" : "rgba(99,102,241,0.2)",
          color: canRun ? "#fff" : "rgba(255,255,255,0.4)",
          cursor: canRun ? "pointer" : "not-allowed",
          boxShadow: canRun ? "0 0 24px rgba(99,102,241,0.2)" : "none",
        }}
      >
        {running ? (
          <>
            <span className="pulse-dot" />
            Agent running...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Run Agent
          </>
        )}
      </button>

      <p className="text-xs text-center text-slate-500">
        Community data from Reddit JSON and HN Algolia APIs
      </p>
    </div>
  );
}

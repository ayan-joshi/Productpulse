const steps = [
  {
    number: "01",
    title: "Enter your niche",
    description:
      "Type in any topic — 'solopreneur productivity', 'standing desk ergonomics', 'pet tech'. The agent handles the rest.",
    code: null,
  },
  {
    number: "02",
    title: "Agent identifies communities",
    description:
      "The AI suggests the most relevant subreddits and confirms the best search queries for your niche.",
    code: null,
  },
  {
    number: "03",
    title: "Deep search across platforms",
    description:
      "Searches each subreddit + global Reddit + Hacker News. Prioritizes posts with frustration keywords — 'hate', 'wish', 'broken', 'why can't'.",
    code: null,
  },
  {
    number: "04",
    title: "Deep-reads high-signal posts",
    description:
      "Fetches full post body + top comments from 8-10 of the most relevant posts. Extracts real sentiment, not just titles.",
    code: null,
  },
  {
    number: "05",
    title: "Synthesizes a product report",
    description:
      "Returns a structured JSON report with pain points ranked by frequency, user quotes, unmet needs, and 3-5 actionable product ideas.",
    code: "pain_points: [{\"title\": \"...\", \"frequency\": 12, \"quotes\": [...]}]",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 font-medium text-sm mb-3 uppercase tracking-widest">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            From niche to insights in{" "}
            <span className="gradient-text">5 steps</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            The agent runs autonomously — you just watch the live progress log and
            get a full report when it's done.
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex gap-6 glow-border rounded-2xl p-6"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="shrink-0">
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ color: "rgba(99,102,241,0.3)" }}
                >
                  {step.number}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.description}</p>
                {step.code && (
                  <pre
                    className="mt-3 text-xs font-mono text-slate-500 rounded-lg p-3 overflow-x-auto"
                    style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)" }}
                  >
                    {step.code}
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
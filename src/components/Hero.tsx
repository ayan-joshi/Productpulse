export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center animate-fade-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-sm text-indigo-300 mb-8">
          <span className="pulse-dot" />
          <span>Live signal from Reddit and Hacker News, ready in minutes</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          Find real pain points
          <br />
          <span className="gradient-text">before your competitors do</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          ProductPulse is an AI research agent that autonomously mines Reddit and
          Hacker News to surface genuine user frustrations, unmet needs, and product
          opportunities — in under 2 minutes.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="/research"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: "0 0 32px rgba(99,102,241,0.25)",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Start Researching Free
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 cursor-pointer"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-slate-500">Trusted by indie hackers and founders</p>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              No credit card
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Live community signal
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              100% free
            </span>
          </div>
        </div>
      </div>

      {/* Floating preview card */}
      <div className="absolute bottom-12 right-8 hidden lg:block animate-float">
        <div
          className="rounded-2xl border p-4 w-72"
          style={{
            background: "rgba(22,22,31,0.9)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-slate-400 font-mono">agent active</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs text-slate-500">
            <p style={{ color: "#f59e0b" }}>→ Subreddits identified: r/SideProject, r/startups...</p>
            <p>→ Searching r/SideProject — "frustrations"</p>
            <p>  → 12 posts found</p>
            <p>→ Searching HN — "pain points"</p>
            <p>  → 8 HN posts found</p>
            <p style={{ color: "#22c55e" }}>→ 23 posts gathered. Synthesizing...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
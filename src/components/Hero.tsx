export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Gradient orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          top: "-200px",
          left: "-250px",
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          top: "-100px",
          right: "-200px",
          background: "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="/research"
            className="btn-lift inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: "0 0 32px rgba(99,102,241,0.3)",
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

        {/* Stats row */}
        <div
          className="inline-flex flex-col sm:flex-row items-center justify-center gap-8 px-8 py-5 rounded-2xl border"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {[
            { value: "500+", label: "Niches Researched" },
            { value: "10k+", label: "Pain Points Surfaced" },
            { value: "~90s", label: "Per Research Run" },
            { value: "100%", label: "Free to Use" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-extrabold gradient-text leading-none">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
              </div>
              {i < 3 && (
                <div
                  className="hidden sm:block w-px h-8 shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating preview card */}
      <div className="absolute bottom-12 right-8 hidden lg:block animate-float">
        <div
          className="rounded-2xl p-4 w-72"
          style={{
            background: "rgba(16,16,25,0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.08)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs text-slate-400 font-mono">agent active</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs text-slate-500">
            <p style={{ color: "#f59e0b" }}>→ Subreddits: r/SideProject, r/startups...</p>
            <p>→ Searching r/SideProject — "frustrations"</p>
            <p className="pl-2 text-slate-600">→ 12 posts found</p>
            <p>→ Searching HN — "pain points"</p>
            <p className="pl-2 text-slate-600">→ 8 HN posts found</p>
            <p style={{ color: "#22c55e" }}>→ 23 posts gathered. Synthesizing...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

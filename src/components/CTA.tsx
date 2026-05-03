export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div
          className="glow-pulse rounded-3xl p-12 border"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.06) 50%, rgba(10,10,15,0.8) 100%)",
            borderColor: "rgba(99,102,241,0.2)",
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(168,85,247,0.2))",
              boxShadow: "0 0 30px rgba(99,102,241,0.2)",
            }}
          >
            <svg className="w-7 h-7" style={{ color: "#a5b4fc" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stop guessing what users want
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-lg mx-auto">
            ProductPulse gives you actual user complaints — not survey data, not Google
            Trends. Real people, real problems, ready to solve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/research"
              className="btn-lift inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                boxShadow: "0 0 40px rgba(99,102,241,0.3)",
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Try ProductPulse Free
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            No account needed &bull; Runs in about 90 seconds &bull; Focused on real user pain points
          </p>
        </div>
      </div>
    </section>
  );
}

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className="rounded-3xl p-12 glow-border"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.05) 100%)",
          }}
        >
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer"
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
          <p className="mt-4 text-xs text-slate-500">
            No account needed &bull; Runs in about 90 seconds &bull; Focused on real user pain points
          </p>
        </div>
      </div>
    </section>
  );
}
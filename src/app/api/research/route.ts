import { runAgent, type ResearchReport } from "@/lib/agent";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const niche = searchParams.get("niche") ?? "";
    const apiKey = process.env.GROQ_API_KEY ?? "";

    if (!niche.trim()) {
      return new Response(JSON.stringify({ error: "niche is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!apiKey.trim()) {
      return new Response(JSON.stringify({ error: "GROQ_API_KEY is missing on the server" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const encode = (s: string) => {
          try { controller.enqueue(new TextEncoder().encode(s)); } catch { /* closed */ }
        };

        try {
          const report: ResearchReport = await runAgent(
            niche.trim(),
            apiKey.trim(),
            (msg) => encode(`data: ${JSON.stringify({ type: "progress", msg })}\n\n`)
          );
          encode(`data: ${JSON.stringify({ type: "report", report })}\n\n`);
          controller.close();
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          encode(`data: ${JSON.stringify({ type: "error", msg })}\n\n`);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
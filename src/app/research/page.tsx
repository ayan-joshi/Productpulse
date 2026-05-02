"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/research/Navbar";
import ResearchForm from "@/components/research/ResearchForm";
import ActivityLog from "@/components/research/ActivityLog";
import ReportDisplay from "@/components/research/ReportDisplay";
import type { ResearchReport } from "@/lib/agent";
import { EXAMPLE_REPORT, EXAMPLE_NICHE } from "@/lib/exampleReport";

interface LogEntry {
  msg: string;
  type: "progress" | "error" | "success";
}

const HISTORY_KEY = "pp_recent_niches";

function loadHistory(): string[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveToHistory(niche: string, prev: string[]): string[] {
  const updated = [niche, ...prev.filter((n) => n !== niche)].slice(0, 5);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export default function ResearchPage() {
  const searchParams = useSearchParams();
  const [niche, setNiche] = useState("");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [report, setReport] = useState<ResearchReport | null>(EXAMPLE_REPORT);
  const [isExample, setIsExample] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const esRef = useRef<EventSource | null>(null);
  const autoRanRef = useRef(false);

  useEffect(() => {
    setRecentSearches(loadHistory());
  }, []);

  useEffect(() => {
    const nicheParam = searchParams.get("niche");
    if (nicheParam && !autoRanRef.current) {
      autoRanRef.current = true;
      setNiche(nicheParam);
      handleRun(nicheParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (esRef.current) esRef.current.close();
    };
  }, []);

  function appendLog(msg: string, type: LogEntry["type"] = "progress") {
    setLogs((prev) => [...prev.slice(-80), { msg, type }]);
  }

  async function handleRun(nicheVal: string) {
    if (esRef.current) esRef.current.close();
    setRunning(true);
    setLogs([]);
    setReport(null);
    setIsExample(false);
    setError(null);

    const source = new EventSource(`/api/research?niche=${encodeURIComponent(nicheVal)}`);
    esRef.current = source;

    source.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "progress") {
        appendLog(data.msg, "progress");
      } else if (data.type === "report") {
        setReport(data.report);
        appendLog("Report generated successfully", "success");
        setRecentSearches((prev) => saveToHistory(nicheVal, prev));
        source.close();
        setRunning(false);
      } else if (data.type === "error") {
        setError(data.msg);
        appendLog(`Error: ${data.msg}`, "error");
        source.close();
        setRunning(false);
      }
    };

    source.onerror = () => {
      setError("Connection lost. Please try again.");
      source.close();
      setRunning(false);
    };
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-semibold text-indigo-400 mb-2 uppercase tracking-[0.2em]">
                Research workspace
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Turn community chatter into product insight
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Search one niche, watch the collection process live, and review a structured report without leaving the page.
              </p>
            </div>
            <ResearchForm
              niche={niche}
              running={running}
              recentSearches={recentSearches}
              onNicheChange={setNiche}
              onRun={handleRun}
            />
            {logs.length > 0 && <ActivityLog logs={logs} />}
          </div>

          <div className="min-w-0">
            {error && (
              <div
                className="rounded-xl p-4 border text-sm mb-4"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  borderColor: "rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </div>
            )}

            {report && (
              <ReportDisplay
                report={report}
                niche={isExample ? EXAMPLE_NICHE : niche}
                isExample={isExample}
              />
            )}

            {!report && !error && !running && (
              <div
                className="rounded-2xl border border-dashed min-h-[420px] p-8 sm:p-12 flex flex-col items-center justify-center text-center"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)", background: "rgba(255,255,255,0.01)" }}
              >
                <div className="text-4xl mb-4">📊</div>
                <p className="font-medium mb-1 text-white">No report yet</p>
                <p className="text-sm text-slate-500 max-w-md">
                  Choose a niche on the left and run the agent to generate your research report.
                </p>
              </div>
            )}

            {running && !report && (
              <div
                className="rounded-2xl border border-dashed min-h-[420px] p-8 sm:p-12 flex flex-col items-center justify-center text-center"
                style={{ borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.03)" }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="pulse-dot" />
                  <span className="text-indigo-400 font-medium">Agent running...</span>
                </div>
                <p className="text-sm text-slate-500 max-w-md">
                  Usually finishes in about 60 to 90 seconds. Follow the activity log while the report is being prepared.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

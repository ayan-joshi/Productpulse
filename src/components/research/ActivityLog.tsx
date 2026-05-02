"use client";

interface LogEntry {
  msg: string;
  type: "progress" | "error" | "success";
}

interface Props {
  logs: LogEntry[];
}

export default function ActivityLog({ logs }: Props) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="text-sm font-medium flex items-center gap-2">
          <span className="pulse-dot" />
          Activity Log
        </span>
        <span className="text-xs text-slate-500">{logs.length} events</span>
      </div>
      <div
        className="p-4 h-72 overflow-y-auto space-y-0.5"
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        {logs.map((log, i) => (
          <div
            key={i}
            className="log-line"
            data-type={log.type}
            style={
              log.type === "error"
                ? { color: "#fca5a5", borderLeftColor: "#ef4444" }
                : log.type === "success"
                ? { color: "#86efac", borderLeftColor: "#22c55e" }
                : {}
            }
          >
            {log.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
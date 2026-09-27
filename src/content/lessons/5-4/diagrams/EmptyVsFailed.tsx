const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Row = {
  y: number;
  event: [string, string];
  returns: [string, string];
  report: string;
  verdict: string;
  ok: boolean;
};

const rows: Row[] = [
  { y: 48, event: ["Query ran", "0 matches"], returns: ["status: success", "results: []"], report: "No trials found", verdict: "✓ a real answer", ok: true },
  { y: 128, event: ["Timeout", "query didn't run"], returns: ["status: failure", "type: timeout"], report: "GAP: not searched", verdict: "✓ an honest gap", ok: true },
  { y: 208, event: ["Timeout", "query didn't run"], returns: ["status: success", "results: []"], report: "No evidence exists", verdict: "✗ a false claim", ok: false },
];

export function EmptyVsFailed() {
  return (
    <svg
      viewBox="0 0 576 344"
      role="img"
      aria-labelledby="empty-vs-failed-title empty-vs-failed-desc"
      className="w-full max-w-[576px]"
    >
      <title id="empty-vs-failed-title">An access failure is not an empty result</title>
      <desc id="empty-vs-failed-desc">
        Three cases. A query that ran and found no matches returns success with
        an empty list, and the report correctly says no trials were found. A
        timeout returned as a failure becomes a labeled gap in the report. The
        same timeout returned as success with an empty list looks identical to
        the first case, and the report falsely states that no evidence exists.
      </desc>
      <defs>
        <marker
          id="empty-vs-failed-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
      </defs>

      <text x="92" y="32" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        What happened
      </text>
      <text x="288" y="32" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        Subagent returns
      </text>
      <text x="484" y="32" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        Report says
      </text>

      {rows.map((r) => (
        <g key={r.y}>
          <rect x="16" y={r.y} width="152" height="64" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x="92" y={r.y + 27} textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
            {r.event[0]}
          </text>
          <text x="92" y={r.y + 47} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {r.event[1]}
          </text>

          <line x1="168" y1={r.y + 32} x2="198" y2={r.y + 32} stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#empty-vs-failed-arrow)" />

          <rect
            x="200"
            y={r.y}
            width="176"
            height="64"
            rx="8"
            fill={r.ok ? "var(--surface)" : "var(--danger-soft)"}
            stroke={r.ok ? "var(--border)" : "var(--danger)"}
            strokeWidth="1.5"
          />
          <text x="288" y={r.y + 27} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {r.returns[0]}
          </text>
          <text x="288" y={r.y + 47} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {r.returns[1]}
          </text>

          <line x1="376" y1={r.y + 32} x2="406" y2={r.y + 32} stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#empty-vs-failed-arrow)" />

          <rect
            x="408"
            y={r.y}
            width="152"
            height="64"
            rx="8"
            fill={r.ok ? "var(--success-soft)" : "var(--danger-soft)"}
            stroke={r.ok ? "var(--success)" : "var(--danger)"}
            strokeWidth="1.5"
          />
          <text x="484" y={r.y + 27} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {r.report}
          </text>
          <text x="484" y={r.y + 47} textAnchor="middle" fontFamily={sans} fontSize="12" fill={r.ok ? "var(--success)" : "var(--danger)"}>
            {r.verdict}
          </text>
        </g>
      ))}

      <rect x="16" y="288" width="544" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="313" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Report a failure as a failure; empty success means the query ran
      </text>
    </svg>
  );
}

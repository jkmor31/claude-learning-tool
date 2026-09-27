const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const fields = ["failure_type", "attempted", "partial_results", "alternatives"];

const options = [
  { x: 20, label: "Re-delegate narrower" },
  { x: 204, label: "Try another source" },
  { x: 388, label: "Proceed, mark gap" },
];

export function LocalRecoveryThenPropagate() {
  return (
    <svg
      viewBox="0 0 576 640"
      role="img"
      aria-labelledby="local-recovery-title local-recovery-desc"
      className="w-full max-w-[576px]"
    >
      <title id="local-recovery-title">Recover locally first, then propagate what&apos;s left</title>
      <desc id="local-recovery-desc">
        A subagent&apos;s search fails. It retries locally, with backoff and a
        limited number of attempts, if the failure is transient. If that
        resolves it, work continues and the coordinator never sees the error.
        If not, the subagent propagates a structured error with failure_type,
        attempted, partial_results and alternatives. The coordinator then
        decides: re-delegate a narrower query, try another source, or proceed
        and mark the gap. All paths end in a report with coverage annotations.
      </desc>
      <defs>
        <marker
          id="local-recovery-arrow"
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

      {/* failure */}
      <rect x="184" y="16" width="208" height="48" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="288" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Subagent search fails
      </text>
      <line x1="288" y1="64" x2="288" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />

      {/* local retry */}
      <rect x="160" y="96" width="256" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="288" y="119" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Retry locally
      </text>
      <text x="288" y="139" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        transient only · backoff · limited
      </text>
      <line x1="288" y1="152" x2="288" y2="182" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />

      {/* resolved? */}
      <path d="M288 184 L360 216 L288 248 L216 216 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="221" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Resolved?
      </text>

      {/* yes: continue */}
      <line x1="360" y1="216" x2="422" y2="216" stroke="var(--success)" strokeWidth="2" markerEnd="url(#local-recovery-arrow)" />
      <text x="390" y="208" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--success)">
        yes
      </text>
      <rect x="424" y="184" width="136" height="64" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="492" y="211" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Continue
      </text>
      <text x="492" y="231" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        coordinator not told
      </text>

      {/* no: propagate */}
      <line x1="288" y1="248" x2="288" y2="278" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />
      <text x="298" y="268" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        no
      </text>
      <rect x="24" y="280" width="528" height="88" rx="10" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="304" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Propagate a structured error
      </text>
      {fields.map((f, i) => {
        const x = 36 + i * 128;
        return (
          <g key={f}>
            <rect x={x} y="320" width="120" height="32" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" />
            <text x={x + 60} y="340" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
              {f}
            </text>
          </g>
        );
      })}
      <line x1="288" y1="368" x2="288" y2="398" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />

      {/* coordinator decides */}
      <rect x="184" y="400" width="208" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="288" y="425" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Coordinator decides
      </text>
      <line x1="288" y1="440" x2="288" y2="456" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="104" y1="456" x2="472" y2="456" stroke="var(--muted)" strokeWidth="1.5" />
      {options.map((o) => (
        <g key={o.label}>
          <line x1={o.x + 84} y1="456" x2={o.x + 84} y2="478" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />
          <rect x={o.x} y="480" width="168" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={o.x + 84} y="509" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {o.label}
          </text>
          <line x1={o.x + 84} y1="528" x2={o.x + 84} y2="544" stroke="var(--muted)" strokeWidth="1.5" />
        </g>
      ))}
      <line x1="104" y1="544" x2="472" y2="544" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="288" y1="544" x2="288" y2="574" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#local-recovery-arrow)" />

      {/* report */}
      <rect x="136" y="576" width="304" height="48" rx="10" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="288" y="605" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Report + coverage annotations
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const categories = [
  { x: 24, name: "transient", action: "Retry", detail: "with backoff" },
  { x: 136, name: "validation", action: "Fix input", detail: "or ask user" },
  { x: 248, name: "business", action: "Explain", detail: "or escalate" },
  { x: 360, name: "permission", action: "Stop", detail: "and escalate" },
];

export function ErrorRecovery() {
  return (
    <svg
      viewBox="0 0 480 352"
      role="img"
      aria-labelledby="error-recovery-title error-recovery-desc"
      className="w-full max-w-[480px]"
    >
      <title id="error-recovery-title">How the agent reads a tool result</title>
      <desc id="error-recovery-desc">
        The agent first checks isError. If it is false, the result is used as
        an answer, and an empty list is a valid answer. If it is true, the
        errorCategory decides the recovery: transient errors are retried with
        backoff, validation errors need the input fixed or the user asked,
        business errors are explained to the customer or escalated, and
        permission errors stop and escalate. Only transient errors are
        retryable.
      </desc>
      <defs>
        <marker
          id="error-recovery-arrow"
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

      {/* the result arrives */}
      <rect x="160" y="16" width="160" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="45" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Tool result
      </text>
      <line x1="240" y1="64" x2="240" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#error-recovery-arrow)" />

      {/* isError check */}
      <path d="M240 96 L312 136 L240 176 L168 136 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="141" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        isError
      </text>

      {/* false: a successful result, possibly empty */}
      <line x1="168" y1="136" x2="130" y2="136" stroke="var(--success)" strokeWidth="2" markerEnd="url(#error-recovery-arrow)" />
      <text x="148" y="156" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="600" fill="var(--success)">
        false
      </text>
      <rect x="16" y="104" width="112" height="64" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="72" y="131" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Use result
      </text>
      <text x="72" y="151" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        [] is valid
      </text>

      {/* true: branch on errorCategory */}
      <line x1="240" y1="176" x2="240" y2="208" stroke="var(--muted)" strokeWidth="1.5" />
      <text x="250" y="198" fontFamily={mono} fontSize="12" fontWeight="600" fill="var(--danger)">
        true
      </text>
      <text x="408" y="200" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        errorCategory
      </text>
      <line x1="72" y1="208" x2="408" y2="208" stroke="var(--muted)" strokeWidth="1.5" />
      {categories.map((c) => (
        <g key={c.name}>
          <line
            x1={c.x + 48}
            y1="208"
            x2={c.x + 48}
            y2="230"
            stroke="var(--muted)"
            strokeWidth="1.5"
            markerEnd="url(#error-recovery-arrow)"
          />
          <rect
            x={c.x}
            y="232"
            width="96"
            height="72"
            rx="8"
            fill={c.name === "transient" ? "var(--accent-soft)" : "var(--background)"}
            stroke={c.name === "transient" ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.5"
          />
          <text x={c.x + 48} y="256" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {c.name}
          </text>
          <text x={c.x + 48} y="276" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {c.action}
          </text>
          <text x={c.x + 48} y="294" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {c.detail}
          </text>
        </g>
      ))}

      {/* retryable vs not */}
      <path d="M24 316 V320 H120 V316" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="72" y="338" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        retryable
      </text>
      <path d="M136 316 V320 H456 V316" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
      <text x="296" y="338" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        not retryable as-is
      </text>
    </svg>
  );
}

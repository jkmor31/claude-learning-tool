const sans = "var(--font-geist-sans), sans-serif";

type Branch = {
  cx: number;
  x: number;
  condition: string;
  action: string;
  outcomeTitle: string;
  outcomeSub: string;
};

const branches: Branch[] = [
  {
    cx: 140,
    x: 16,
    condition: "Model misread a value",
    action: "Retry with error feedback",
    outcomeTitle: "Conflict clears",
    outcomeSub: "corrected on retry",
  },
  {
    cx: 420,
    x: 296,
    condition: "Invoice's own math is off",
    action: 'conflict_detected: true',
    outcomeTitle: "Escalate, don't retry",
    outcomeSub: "flag for accounts payable",
  },
];

export function ConflictRetryOrEscalate() {
  return (
    <svg
      viewBox="0 0 560 312"
      role="img"
      aria-labelledby="conflict-retry-or-escalate-title conflict-retry-or-escalate-desc"
      className="w-full max-w-[560px]"
    >
      <title id="conflict-retry-or-escalate-title">Whether the mismatch persists after retry decides retry vs escalate</title>
      <desc id="conflict-retry-or-escalate-desc">
        When line items don&apos;t sum to the total, a model misread
        resolves with a retry containing the specific error, and the
        conflict clears. When the invoice&apos;s own arithmetic is
        inconsistent, no retry fixes it; conflict_detected is set to true
        and the document is escalated to accounts payable instead of
        retried again.
      </desc>
      <defs>
        <marker
          id="conflict-retry-or-escalate-arrow"
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

      <rect x="80" y="16" width="400" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="280" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Line items don&apos;t sum to the total
      </text>

      {branches.map((b) => (
        <line
          key={`split-${b.cx}`}
          x1="280"
          y1="64"
          x2={b.cx}
          y2="96"
          stroke="var(--muted)"
          strokeWidth="1.5"
          markerEnd="url(#conflict-retry-or-escalate-arrow)"
        />
      ))}

      {branches.map((b) => (
        <g key={b.condition}>
          <rect x={b.x} y="96" width="248" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
          <text x={b.cx} y="124" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.condition}
          </text>

          <line x1={b.cx} y1="144" x2={b.cx} y2="168" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#conflict-retry-or-escalate-arrow)" />

          <rect x={b.x} y="168" width="248" height="48" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={b.cx} y="196" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.action}
          </text>

          <line x1={b.cx} y1="216" x2={b.cx} y2="240" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#conflict-retry-or-escalate-arrow)" />

          <rect x={b.x} y="240" width="248" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
          <text x={b.cx} y="264" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.outcomeTitle}
          </text>
          <text x={b.cx} y="282" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {b.outcomeSub}
          </text>
        </g>
      ))}
    </svg>
  );
}

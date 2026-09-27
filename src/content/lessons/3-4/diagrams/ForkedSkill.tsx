const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  heading: string;
  isForked: boolean;
};

const panels: Panel[] = [
  { x: 16, heading: "Without context: fork", isForked: false },
  { x: 248, heading: "With context: fork", isForked: true },
];

export function ForkedSkill() {
  return (
    <svg
      viewBox="0 0 480 296"
      role="img"
      aria-labelledby="forked-skill-title forked-skill-desc"
      className="w-full max-w-[480px]"
    >
      <title id="forked-skill-title">context: fork keeps verbose work out of the main session</title>
      <desc id="forked-skill-desc">
        Without context: fork, a skill&apos;s hundreds of file reads and search
        results land directly in the main session, cluttering it. With
        context: fork, the same work happens inside an isolated subagent
        context, and only its summary returns to the main session.
      </desc>
      <defs>
        <marker
          id="forked-skill-arrow"
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

      {panels.map((p) => {
        const cx = p.x + 108;
        const bx = p.x + 16;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="16" width="216" height="264" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            {/* skill invocation */}
            <rect x={bx} y="56" width="184" height="32" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={cx} y="77" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
              /analyze-deps runs
            </text>

            {p.isForked && (
              <line x1={cx} y1="88" x2={cx} y2="104" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#forked-skill-arrow)" />
            )}

            {/* where the verbose work happens */}
            <rect
              x={bx}
              y={p.isForked ? 104 : 88}
              width="184"
              height={p.isForked ? 96 : 112}
              rx="8"
              fill={p.isForked ? "var(--background)" : "var(--surface)"}
              stroke={p.isForked ? "var(--accent)" : "var(--border)"}
              strokeWidth="1.5"
              strokeDasharray={p.isForked ? "5 4" : undefined}
            />
            <text x={cx} y={p.isForked ? 128 : 116} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {p.isForked ? "Forked subagent" : "Hundreds of reads"}
            </text>
            <text x={cx} y={p.isForked ? 148 : 136} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.isForked ? "reads stay inside" : "and search results"}
            </text>
            {!p.isForked && (
              <text x={cx} y="184" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
                all land here
              </text>
            )}

            <line x1={cx} y1="200" x2={cx} y2="216" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#forked-skill-arrow)" />

            {/* outcome */}
            <rect
              x={bx}
              y="216"
              width="184"
              height="40"
              rx="8"
              fill={p.isForked ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.isForked ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="241" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {p.isForked ? "Only summary returns" : "Session cluttered"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

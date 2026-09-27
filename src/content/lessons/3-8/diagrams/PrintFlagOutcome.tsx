const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  heading: string;
  command: string;
  behaviorTitle: string;
  behaviorSub: string;
  outcomeTitle: string;
  outcomeSub: string;
  ok: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "No -p flag",
    command: 'claude "review PR"',
    behaviorTitle: "Waits for input",
    behaviorSub: "nobody can answer",
    outcomeTitle: "Job hangs",
    outcomeSub: "killed by timeout",
    ok: false,
  },
  {
    x: 248,
    heading: "With -p flag",
    command: 'claude -p "review PR"',
    behaviorTitle: "Runs to completion",
    behaviorSub: "no prompts needed",
    outcomeTitle: "Prints result",
    outcomeSub: "exits, 0 or non-zero",
    ok: true,
  },
];

export function PrintFlagOutcome() {
  return (
    <svg
      viewBox="0 0 480 332"
      role="img"
      aria-labelledby="print-flag-outcome-title print-flag-outcome-desc"
      className="w-full max-w-[480px]"
    >
      <title id="print-flag-outcome-title">Without -p, a CI job hangs waiting for input that never comes</title>
      <desc id="print-flag-outcome-desc">
        The same review command run without the -p flag starts an
        interactive session, waits for input nobody can provide, and the CI
        job hangs until the timeout kills it. Run with -p, it runs
        non-interactively to completion, prints the result, and exits with a
        status code the pipeline can branch on. The -p flag is the only
        difference between the two runs.
      </desc>
      <defs>
        <marker
          id="print-flag-outcome-arrow"
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
            <rect x={p.x} y="16" width="216" height="236" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            <rect x={bx} y="60" width="184" height="32" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={cx} y="81" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="600" fill="var(--foreground)">
              {p.command}
            </text>

            <line x1={cx} y1="92" x2={cx} y2="108" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#print-flag-outcome-arrow)" />

            <rect
              x={bx}
              y="112"
              width="184"
              height="56"
              rx="8"
              fill={p.ok ? "var(--accent-soft)" : "none"}
              stroke={p.ok ? "var(--accent)" : "var(--border)"}
              strokeWidth={p.ok ? 1.5 : 1.25}
              strokeDasharray={p.ok ? undefined : "5 4"}
            />
            <text x={cx} y="136" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {p.behaviorTitle}
            </text>
            <text x={cx} y="156" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.behaviorSub}
            </text>

            <line x1={cx} y1="168" x2={cx} y2="184" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#print-flag-outcome-arrow)" />

            <rect
              x={bx}
              y="188"
              width="184"
              height="48"
              rx="8"
              fill={p.ok ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.ok ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="210" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.outcomeTitle}
            </text>
            <text x={cx} y="228" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.outcomeSub}
            </text>
          </g>
        );
      })}

      <rect x="16" y="268" width="448" height="48" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="297" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        -p is the only difference between these two runs
      </text>
    </svg>
  );
}

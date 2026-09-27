const sans = "var(--font-geist-sans), sans-serif";

type Panel = {
  x: number;
  heading: string;
  reviewerTitle: string;
  reviewerSub: string;
  outcomeTitle: string;
  outcomeSub: string;
  independent: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "Self-review",
    reviewerTitle: "Session A reviews",
    reviewerSub: "same assumptions",
    outcomeTitle: "Misses same flaws",
    outcomeSub: "blind spot repeats",
    independent: false,
  },
  {
    x: 248,
    heading: "Independent review",
    reviewerTitle: "Session B reviews",
    reviewerSub: "diff + criteria only",
    outcomeTitle: "Catches more",
    outcomeSub: "no shared blind spot",
    independent: true,
  },
];

export function SelfReviewVsIndependent() {
  return (
    <svg
      viewBox="0 0 480 352"
      role="img"
      aria-labelledby="self-review-vs-independent-title self-review-vs-independent-desc"
      className="w-full max-w-[480px]"
    >
      <title id="self-review-vs-independent-title">An independent instance reviews better than the session that wrote the code</title>
      <desc id="self-review-vs-independent-desc">
        In both cases session A writes a feature. Asking session A to review
        its own change carries the same assumptions that produced the flaws,
        so it misses the same flaws. Asking an independent session, seeing
        only the diff and the review criteria, catches more because it
        shares no blind spot with the code that was written. The fix is to
        route review to a fresh instance.
      </desc>
      <defs>
        <marker
          id="self-review-vs-independent-arrow"
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
            <rect x={p.x} y="16" width="216" height="256" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            <rect x={bx} y="64" width="184" height="48" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={cx} y="93" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              Session A writes it
            </text>

            <line x1={cx} y1="112" x2={cx} y2="136" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#self-review-vs-independent-arrow)" />

            <rect
              x={bx}
              y="140"
              width="184"
              height="56"
              rx="8"
              fill={p.independent ? "var(--accent-soft)" : "none"}
              stroke={p.independent ? "var(--accent)" : "var(--border)"}
              strokeWidth={p.independent ? 1.5 : 1.25}
              strokeDasharray={p.independent ? undefined : "5 4"}
            />
            <text x={cx} y="164" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {p.reviewerTitle}
            </text>
            <text x={cx} y="184" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.reviewerSub}
            </text>

            <line x1={cx} y1="196" x2={cx} y2="220" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#self-review-vs-independent-arrow)" />

            <rect
              x={bx}
              y="224"
              width="184"
              height="48"
              rx="8"
              fill={p.independent ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.independent ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="246" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.outcomeTitle}
            </text>
            <text x={cx} y="264" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.outcomeSub}
            </text>
          </g>
        );
      })}

      <rect x="16" y="288" width="448" height="48" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="317" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Fix: review with a fresh claude -p run or subagent
      </text>
    </svg>
  );
}

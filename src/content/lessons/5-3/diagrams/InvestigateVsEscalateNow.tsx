const sans = "var(--font-geist-sans), sans-serif";

type Panel = {
  x: number;
  heading: string;
  lines: string[];
  verdict: string;
  reason: string;
  isRight: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "Investigate before escalating",
    lines: ["Look up the order,", "check status first"],
    verdict: "Delays the handoff",
    reason: "customer already asked",
    isRight: false,
  },
  {
    x: 304,
    heading: "Escalate right away",
    lines: ["Hand off immediately,", "no investigation first"],
    verdict: "Honors the request",
    reason: "nothing gained by waiting",
    isRight: true,
  },
];

export function InvestigateVsEscalateNow() {
  return (
    <svg
      viewBox="0 0 576 336"
      role="img"
      aria-labelledby="investigate-vs-escalate-title investigate-vs-escalate-desc"
      className="w-full max-w-[576px]"
    >
      <title id="investigate-vs-escalate-title">An explicit request for a human should be honored immediately, not investigated first</title>
      <desc id="investigate-vs-escalate-desc">
        A customer asks to be connected to a person. Investigating the
        order and checking status before escalating delays the handoff the
        customer already asked for. Escalating right away, with no
        investigation first, honors the request, since nothing is gained
        by waiting.
      </desc>

      <rect x="16" y="16" width="544" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="288" y="41" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        Customer says: &quot;Connect me to a person, please.&quot;
      </text>

      {panels.map((p) => {
        const cx = p.x + 128;
        const bx = p.x + 16;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="72" width="256" height="192" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="96" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            <rect x={bx} y="108" width="224" height="76" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            {p.lines.map((line, i) => (
              <text key={i} x={cx} y={138 + i * 20} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--foreground)">
                {line}
              </text>
            ))}

            <rect
              x={bx}
              y="192"
              width="224"
              height="56"
              rx="8"
              fill={p.isRight ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.isRight ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="214" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.verdict}
            </text>
            <text x={cx} y="232" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.reason}
            </text>
          </g>
        );
      })}

      <rect x="16" y="280" width="544" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="305" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        A request for a human is honored immediately, not investigated first
      </text>
    </svg>
  );
}

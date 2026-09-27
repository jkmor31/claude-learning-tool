const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  heading: string;
  code: string[];
  verdict: string;
  reason: string;
  isIssue: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "Required, non-nullable",
    code: ['"termination_notice_days":', '{"type": "integer"}'],
    verdict: "Fabricates 30",
    reason: "a plausible guess",
    isIssue: true,
  },
  {
    x: 304,
    heading: "Nullable + description",
    code: ['"termination_notice_days":', '{"type": ["integer","null"]}'],
    verdict: "Returns null",
    reason: "honest, flagged for review",
    isIssue: false,
  },
];

export function FabricationVsHonestNull() {
  return (
    <svg
      viewBox="0 0 576 336"
      role="img"
      aria-labelledby="fabrication-vs-honest-null-title fabrication-vs-honest-null-desc"
      className="w-full max-w-[576px]"
    >
      <title id="fabrication-vs-honest-null-title">A required field is filled with a guess; a nullable field can be honest</title>
      <desc id="fabrication-vs-honest-null-desc">
        A contract has no termination clause. When
        termination_notice_days is required and typed as an integer, the
        model has no truthful way to answer, so it fabricates a plausible
        value such as 30. When the same field is nullable, with a
        description saying null means no clause, the model returns null,
        an honest and checkable answer that can be routed for review.
      </desc>

      <rect x="16" y="16" width="544" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="288" y="41" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        termination_notice_days — no clause in this contract
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
            {p.code.map((line, i) => (
              <text
                key={i}
                x={cx}
                y={138 + i * 20}
                textAnchor="middle"
                fontFamily={mono}
                fontSize="12"
                fill="var(--foreground)"
              >
                {line}
              </text>
            ))}

            <rect
              x={bx}
              y="192"
              width="224"
              height="56"
              rx="8"
              fill={p.isIssue ? "var(--danger-soft)" : "var(--success-soft)"}
              stroke={p.isIssue ? "var(--danger)" : "var(--success)"}
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
        Required fields pressure fabrication; nullable fields are honest
      </text>
    </svg>
  );
}

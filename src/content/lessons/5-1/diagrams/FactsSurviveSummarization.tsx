const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const colCenters = [104, 320, 536];
const colX = [16, 232, 448];
const roundLabels = ["Round 0", "Round 1", "Round 2"];

const summaryBoxes = [
  { line1: "order 88213", line2: "$412.37 · Mar 14", caption: "exact", fill: "var(--surface)", stroke: "var(--border)", captionFill: "var(--muted)", font: mono },
  { line1: "refund issue", line2: "order + amount noted", caption: "losing detail", fill: "var(--surface)", stroke: "var(--border)", captionFill: "var(--muted)", font: sans },
  { line1: "billing issue", line2: "refund soon", caption: "specifics gone", fill: "var(--danger-soft)", stroke: "var(--danger)", captionFill: "var(--danger)", font: sans },
];

export function FactsSurviveSummarization() {
  return (
    <svg
      viewBox="0 0 640 344"
      role="img"
      aria-labelledby="facts-survive-title facts-survive-desc"
      className="w-full max-w-[640px]"
    >
      <title id="facts-survive-title">Case facts stay identical while the summary loses detail each round</title>
      <desc id="facts-survive-desc">
        Across three rounds of summarization, the summarized history goes
        from an exact order number, amount, and date in round 0, to a vague
        note about a refund issue in round 1, to a generic billing issue in
        round 2 where the specifics are gone. Below it, the case facts
        block holds the same order number, amount, and promised date in
        every round, because summarization never touches it.
      </desc>
      <defs>
        <marker
          id="facts-survive-arrow"
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

      <text x="16" y="28" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Summarized history — compresses further each round
      </text>

      {roundLabels.map((label, i) => (
        <text key={label} x={colCenters[i]} y="48" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
          {label}
        </text>
      ))}

      {summaryBoxes.map((b, i) => (
        <g key={`row1-${i}`}>
          <rect x={colX[i]} y="56" width="176" height="64" rx="8" fill={b.fill} stroke={b.stroke} strokeWidth="1.5" />
          <text x={colCenters[i]} y="80" textAnchor="middle" fontFamily={b.font} fontSize="12" fill="var(--foreground)">
            {b.line1}
          </text>
          <text x={colCenters[i]} y="100" textAnchor="middle" fontFamily={b.font} fontSize="12" fill="var(--foreground)">
            {b.line2}
          </text>
          <text x={colCenters[i]} y="132" textAnchor="middle" fontFamily={sans} fontSize="11" fill={b.captionFill}>
            {b.caption}
          </text>
        </g>
      ))}

      <line x1="192" y1="88" x2="232" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#facts-survive-arrow)" />
      <line x1="408" y1="88" x2="448" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#facts-survive-arrow)" />

      <text x="16" y="160" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Case facts block — outside summarization, unchanged
      </text>

      {colX.map((x, i) => (
        <g key={`row2-${i}`}>
          <rect x={x} y="176" width="176" height="64" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={colCenters[i]} y="200" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            order: 88213
          </text>
          <text x={colCenters[i]} y="220" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            promised_by: 03-14
          </text>
        </g>
      ))}

      <line x1="192" y1="208" x2="232" y2="208" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="408" y1="208" x2="448" y2="208" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="4 4" />

      <text x="320" y="256" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        identical every round
      </text>

      <rect x="16" y="280" width="608" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="320" y="305" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Facts stay exact while the summary keeps losing detail
      </text>
    </svg>
  );
}

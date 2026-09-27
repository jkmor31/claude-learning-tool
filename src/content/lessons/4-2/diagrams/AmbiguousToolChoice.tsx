const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  quote: string;
  chosenTool: string;
  chosenWhy: string;
  rejectedTool: string;
  rejectedWhy: string;
};

const panels: Panel[] = [
  {
    x: 16,
    quote: "“Check on order 5521?”",
    chosenTool: "get_order_status",
    chosenWhy: "general status question",
    rejectedTool: "not: get_shipment_tracking",
    rejectedWhy: "would miss unpaid orders",
  },
  {
    x: 336,
    quote: "“Where’s my package?”",
    chosenTool: "get_shipment_tracking",
    chosenWhy: "asks physical location",
    rejectedTool: "not: get_order_status",
    rejectedWhy: "already known to be shipped",
  },
];

export function AmbiguousToolChoice() {
  return (
    <svg
      viewBox="0 0 640 232"
      role="img"
      aria-labelledby="ambiguous-tool-choice-title ambiguous-tool-choice-desc"
      className="w-full max-w-[640px]"
    >
      <title id="ambiguous-tool-choice-title">Few-shot examples show which tool was chosen and why the other lost</title>
      <desc id="ambiguous-tool-choice-desc">
        For the request check on order 5521, get_order_status is chosen
        because it is a general status question, and get_shipment_tracking
        is rejected because it would miss an unpaid or cancelled order. For
        the request where is my package, get_shipment_tracking is chosen
        because it asks about physical location, and get_order_status is
        rejected because the order is already known to be shipped. Showing
        the rejected alternative and the reason teaches the underlying
        judgment.
      </desc>
      <defs>
        <marker
          id="ambiguous-tool-choice-arrow"
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
        const cx = p.x + 144;
        const bx = p.x + 16;
        return (
          <g key={p.quote}>
            <rect x={p.x} y="16" width="288" height="192" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
              {p.quote}
            </text>

            <line x1={cx} y1="48" x2={cx} y2="72" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#ambiguous-tool-choice-arrow)" />

            <rect x={bx} y="76" width="256" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
            <text x={cx} y="96" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.chosenTool}
            </text>
            <text x={cx} y="116" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
              {p.chosenWhy}
            </text>

            <rect
              x={bx}
              y="140"
              width="256"
              height="48"
              rx="8"
              fill="var(--surface)"
              stroke="var(--muted)"
              strokeWidth="1.25"
              strokeDasharray="5 4"
            />
            <text x={cx} y="158" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
              {p.rejectedTool}
            </text>
            <text x={cx} y="176" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
              {p.rejectedWhy}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

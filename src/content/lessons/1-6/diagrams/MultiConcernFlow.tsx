const sans = "var(--font-geist-sans), sans-serif";

const items = [
  { x: 16, label: "Order 4417", sub: "damaged item" },
  { x: 172, label: "Order 5102", sub: "double charge" },
  { x: 328, label: "Address", sub: "update needed" },
];

export function MultiConcernFlow() {
  return (
    <svg
      viewBox="0 0 480 440"
      role="img"
      aria-labelledby="multi-concern-flow-title multi-concern-flow-desc"
      className="w-full max-w-[480px]"
    >
      <title id="multi-concern-flow-title">Handling a multi-concern request</title>
      <desc id="multi-concern-flow-desc">
        A customer message with three issues is decomposed into distinct items.
        The customer is verified once, and that shared customer ID is used for
        all three items: order 4417 damaged, order 5102 double charge, and an
        address update. The three are investigated in parallel, and the results
        are combined into one unified reply that addresses every item.
      </desc>
      <defs>
        <marker
          id="multi-concern-flow-arrow"
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

      {/* incoming message */}
      <rect x="144" y="16" width="192" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="40" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Customer message
      </text>
      <text x="240" y="60" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        three issues
      </text>
      <line x1="240" y1="72" x2="240" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-concern-flow-arrow)" />

      {/* decompose */}
      <rect x="144" y="96" width="192" height="48" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="125" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Decompose
      </text>
      <line x1="240" y1="144" x2="240" y2="166" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#multi-concern-flow-arrow)" />

      {/* shared context */}
      <rect x="144" y="168" width="192" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="192" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Verify once
      </text>
      <text x="240" y="212" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        shared customer ID
      </text>

      {/* fan out */}
      <path d="M240 224 V248 H84 V270" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#multi-concern-flow-arrow)" />
      <path d="M240 248 H396 V270" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#multi-concern-flow-arrow)" />
      <line x1="240" y1="248" x2="240" y2="270" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#multi-concern-flow-arrow)" />
      <text x="16" y="252" fontFamily={sans} fontSize="13" fill="var(--muted)">
        parallel
      </text>

      {items.map((item) => (
        <g key={item.label}>
          <rect x={item.x} y="272" width="136" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={item.x + 68} y="296" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
            {item.label}
          </text>
          <text x={item.x + 68} y="316" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {item.sub}
          </text>
        </g>
      ))}

      {/* fan in */}
      <path d="M84 328 V344 H396 V328" fill="none" stroke="var(--success)" strokeWidth="2" />
      <line x1="240" y1="328" x2="240" y2="366" stroke="var(--success)" strokeWidth="2" markerEnd="url(#multi-concern-flow-arrow)" />

      {/* unified reply */}
      <rect x="144" y="368" width="192" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="240" y="392" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        One unified reply
      </text>
      <text x="240" y="412" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        every item addressed
      </text>
    </svg>
  );
}

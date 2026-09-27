const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const sources = [
  { x: 16, tool: "lookup_order", date: "Unix timestamp", status: '"SHIPPED"' },
  { x: 172, tool: "get_shipment", date: "ISO + offset", status: '"in_transit"' },
  { x: 328, tool: "get_payment", date: "ISO date only", status: "3" },
];

export function NormalizeOutputs() {
  return (
    <svg
      viewBox="0 0 480 344"
      role="img"
      aria-labelledby="normalize-outputs-title normalize-outputs-desc"
      className="w-full max-w-[480px]"
    >
      <title id="normalize-outputs-title">Normalizing tool results in a PostToolUse hook</title>
      <desc id="normalize-outputs-desc">
        Three tools return dates and statuses in different formats: lookup_order
        uses a Unix timestamp and &quot;SHIPPED&quot;, get_shipment uses ISO 8601 with a
        time zone offset and &quot;in_transit&quot;, and get_payment uses an ISO date and
        the numeric status 3. Every result passes through a PostToolUse hook,
        so the model only sees ISO 8601 dates in UTC and readable status names.
      </desc>
      <defs>
        <marker
          id="normalize-outputs-arrow"
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

      <text x="16" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        RAW TOOL RESULTS
      </text>
      {sources.map((s) => (
        <g key={s.tool}>
          <rect x={s.x} y="40" width="136" height="72" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s.x + 68} y="64" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {s.tool}
          </text>
          <text x={s.x + 68} y="84" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {s.date}
          </text>
          <text x={s.x + 68} y="102" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
            {s.status}
          </text>
        </g>
      ))}

      {/* every result goes through the hook */}
      <path d="M84 112 V136 H396 V112" fill="none" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="240" y1="112" x2="240" y2="166" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#normalize-outputs-arrow)" />

      <rect x="144" y="168" width="192" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="192" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        PostToolUse
      </text>
      <text x="240" y="212" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        normalize every result
      </text>
      <line x1="240" y1="224" x2="240" y2="254" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#normalize-outputs-arrow)" />

      <rect x="112" y="256" width="256" height="72" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="240" y="280" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Model sees one format
      </text>
      <text x="240" y="300" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        ISO 8601 dates in UTC
      </text>
      <text x="240" y="318" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        3 -&gt; &quot;pending_review&quot;
      </text>
    </svg>
  );
}

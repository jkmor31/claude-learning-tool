const sans = "var(--font-geist-sans), sans-serif";

type Option = {
  x: number;
  heading: string;
  output: string[];
  verdict: string;
  ok: boolean;
};

const optionsList: Option[] = [
  { x: 16, heading: "Pick one", output: ["18%"], verdict: "✗ hides B's evidence", ok: false },
  { x: 200, heading: "Average them", output: ["15%"], verdict: "✗ no source says 15%", ok: false },
  { x: 384, heading: "Annotate both", output: ["18% (A, revenue)", "12% (B, units)"], verdict: "✓ difference explained", ok: true },
];

export function ConflictAnnotateNotPick() {
  return (
    <svg
      viewBox="0 0 576 336"
      role="img"
      aria-labelledby="conflict-annotate-title conflict-annotate-desc"
      className="w-full max-w-[576px]"
    >
      <title id="conflict-annotate-title">Conflicting statistics: annotate, don&apos;t pick</title>
      <desc id="conflict-annotate-desc">
        Analyst A reports 18% growth, revenue-based; Analyst B reports 12%,
        from unit shipments. Picking one value reports 18% and hides B&apos;s
        evidence. Averaging reports 15%, a number no source gave. Annotating
        both keeps 18% attributed to A (revenue) and 12% to B (units), which
        explains the difference. Both values go to the coordinator to
        reconcile.
      </desc>
      <defs>
        <marker
          id="conflict-annotate-arrow"
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

      {/* the two sources */}
      {[
        { x: 120, name: "Analyst A · 18%", method: "revenue-based" },
        { x: 296, name: "Analyst B · 12%", method: "unit shipments" },
      ].map((s) => (
        <g key={s.name}>
          <rect x={s.x} y="16" width="160" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s.x + 80} y="36" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {s.name}
          </text>
          <text x={s.x + 80} y="54" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {s.method}
          </text>
        </g>
      ))}

      <line x1="288" y1="64" x2="288" y2="80" stroke="var(--muted)" strokeWidth="1.5" />
      <line x1="104" y1="80" x2="472" y2="80" stroke="var(--muted)" strokeWidth="1.5" />

      {optionsList.map((o) => {
        const cx = o.x + 88;
        return (
          <g key={o.heading}>
            <line x1={cx} y1="80" x2={cx} y2="102" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#conflict-annotate-arrow)" />
            <rect x={o.x} y="104" width="176" height="160" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="128" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {o.heading}
            </text>
            <rect x={o.x + 12} y="140" width="152" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            {o.output.length === 1 ? (
              <text x={cx} y="179" textAnchor="middle" fontFamily={sans} fontSize="20" fontWeight="700" fill="var(--foreground)">
                {o.output[0]}
              </text>
            ) : (
              o.output.map((line, i) => (
                <text key={line} x={cx} y={168 + i * 22} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
                  {line}
                </text>
              ))
            )}
            <rect
              x={o.x + 12}
              y="212"
              width="152"
              height="40"
              rx="8"
              fill={o.ok ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={o.ok ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="237" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--foreground)">
              {o.verdict}
            </text>
          </g>
        );
      })}

      <rect x="16" y="280" width="544" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="305" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Both values, with sources, go to the coordinator to reconcile
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

// Scale: 60% at x=136, 100% at x=464.
const x = (pct: number) => 136 + (pct - 60) * 8.2;
const BAR = 98;
const ticks = [60, 70, 80, 90, 100];
const buckets = ["< 0.80", "0.80–0.95", "≥ 0.95"];

const fields = [
  { name: "tax_id", top: 80, values: [61.0, 93.5, 99.1], threshold: "0.95" },
  { name: "total", top: 224, values: [88.0, 98.6, 99.8], threshold: "0.80" },
];

export function CalibrationByField() {
  return (
    <svg
      viewBox="0 0 560 408"
      role="img"
      aria-labelledby="calibration-by-field-title calibration-by-field-desc"
      className="w-full max-w-[560px]"
    >
      <title id="calibration-by-field-title">Calibrated thresholds differ per field</title>
      <desc id="calibration-by-field-desc">
        Illustrative validation-set results, with a 98% accuracy bar. For
        tax_id, extractions with reported confidence below 0.80 are 61.0%
        accurate, 0.80 to 0.95 are 93.5%, and 0.95 or above are 99.1%, so
        only the top bucket meets the bar and the auto-accept threshold is
        0.95. For total, the buckets are 88.0%, 98.6% and 99.8%, so the
        threshold can be 0.80.
      </desc>

      <text x="16" y="24" fontFamily={sans} fontSize="12" fill="var(--muted)">
        Actual accuracy by reported confidence (illustrative)
      </text>

      {ticks.map((t) => (
        <g key={t}>
          {fields.map((f) => (
            <line key={f.name} x1={x(t)} y1={f.top + 8} x2={x(t)} y2={f.top + 80} stroke="var(--border)" strokeWidth="1" />
          ))}
          <text x={x(t)} y="52" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {t}%
          </text>
        </g>
      ))}

      {/* the accuracy bar */}
      <line x1={x(BAR)} y1="60" x2={x(BAR)} y2="352" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x={x(BAR)} y="368" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        98% bar
      </text>

      {fields.map((f) => (
        <g key={f.name}>
          <text x="16" y={f.top} fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {f.name}
          </text>
          {f.values.map((v, i) => {
            const cy = f.top + 20 + i * 28;
            const meets = v >= BAR;
            return (
              <g key={i}>
                <text x="16" y={cy + 4} fontFamily={mono} fontSize="12" fill="var(--muted)">
                  {buckets[i]}
                </text>
                <line x1={x(60)} y1={cy} x2={x(100)} y2={cy} stroke="var(--border)" strokeWidth="1.5" />
                <circle
                  cx={x(v)}
                  cy={cy}
                  r="6"
                  fill={meets ? "var(--success)" : "var(--background)"}
                  stroke={meets ? "var(--success)" : "var(--danger)"}
                  strokeWidth="2"
                />
                <text x="480" y={cy + 4} fontFamily={sans} fontSize="12" fill="var(--foreground)">
                  {v.toFixed(1)}%
                </text>
              </g>
            );
          })}
          <text x="16" y={f.top + 104} fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
            → auto-accept at ≥ {f.threshold}
          </text>
        </g>
      ))}

      {/* legend */}
      <circle cx="22" cy="388" r="6" fill="var(--success)" stroke="var(--success)" strokeWidth="2" />
      <text x="36" y="392" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        meets bar
      </text>
      <circle cx="126" cy="388" r="6" fill="var(--background)" stroke="var(--danger)" strokeWidth="2" />
      <text x="140" y="392" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        below bar: human review
      </text>
    </svg>
  );
}

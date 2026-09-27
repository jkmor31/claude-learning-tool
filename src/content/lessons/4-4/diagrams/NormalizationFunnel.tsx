const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Funnel = {
  x: number;
  label: string;
  raw1: string;
  raw2: string;
  canonical: string;
};

const funnels: Funnel[] = [
  { x: 16, label: "Raw dates", raw1: "3 May 2026", raw2: "05/03/26", canonical: "2026-05-03" },
  { x: 344, label: "Raw amounts", raw1: "1.234,50", raw2: "$1,234.50", canonical: "1234.50" },
];

export function NormalizationFunnel() {
  return (
    <svg
      viewBox="0 0 684 268"
      role="img"
      aria-labelledby="normalization-funnel-title normalization-funnel-desc"
      className="w-full max-w-[684px]"
    >
      <title id="normalization-funnel-title">Normalization rules turn mixed formats into one canonical value</title>
      <desc id="normalization-funnel-desc">
        Two raw date formats, 3 May 2026 and 05/03/26, both normalize to
        2026-05-03. Two raw amount formats, 1.234,50 and $1,234.50, both
        normalize to 1234.50. A banner states that normalization rules in
        the prompt produce this single canonical value regardless of the
        source format.
      </desc>
      <defs>
        <marker
          id="normalization-funnel-arrow"
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

      {funnels.map((f) => {
        const cx = f.x + 156;
        const b1x = f.x + 8;
        const b2x = f.x + 164;
        const canonX = cx - 95;
        return (
          <g key={f.label}>
            <text x={cx} y="28" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {f.label}
            </text>

            <rect x={b1x} y="40" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={b1x + 70} y="67" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
              {f.raw1}
            </text>

            <rect x={b2x} y="40" width="140" height="44" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={b2x + 70} y="67" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
              {f.raw2}
            </text>

            <line
              x1={b1x + 70}
              y1="84"
              x2={cx - 55}
              y2="140"
              stroke="var(--muted)"
              strokeWidth="1.5"
              markerEnd="url(#normalization-funnel-arrow)"
            />
            <line
              x1={b2x + 70}
              y1="84"
              x2={cx + 55}
              y2="140"
              stroke="var(--muted)"
              strokeWidth="1.5"
              markerEnd="url(#normalization-funnel-arrow)"
            />

            <rect x={canonX} y="140" width="190" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
            <text x={cx} y="164" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {f.canonical}
            </text>
            <text x={cx} y="182" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              canonical
            </text>
          </g>
        );
      })}

      <rect x="16" y="212" width="640" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="336" y="237" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Normalization rules turn every raw format into one canonical value
      </text>
    </svg>
  );
}

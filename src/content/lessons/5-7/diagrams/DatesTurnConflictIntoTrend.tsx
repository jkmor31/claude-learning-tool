const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

// Right-panel chart: 2021 at x=336, 2025 at x=496; 4.0% at y=144, 6.5% at y=64.
const yearX = (year: number) => 336 + (year - 2021) * 40;
const rateY = (rate: number) => 144 - (rate - 4) * 32;

export function DatesTurnConflictIntoTrend() {
  return (
    <svg
      viewBox="0 0 560 248"
      role="img"
      aria-labelledby="dates-trend-title dates-trend-desc"
      className="w-full max-w-[560px]"
    >
      <title id="dates-trend-title">Dates turn an apparent contradiction into a trend</title>
      <desc id="dates-trend-desc">
        Without dates, one source says unemployment is 6.1% and another says
        4.2%, which looks like a contradiction. With dates, the 6.1% figure is
        from 2021 and the 4.2% figure from 2025, so plotted on a timeline they
        show a decline over time, not a disagreement.
      </desc>
      <defs>
        <marker
          id="dates-trend-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* without dates */}
      <rect x="16" y="16" width="256" height="216" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="40" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Without dates
      </text>
      <rect x="48" y="56" width="192" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="144" y="81" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        Source 1: 6.1%
      </text>
      <text x="144" y="123" textAnchor="middle" fontFamily={sans} fontSize="18" fontWeight="700" fill="var(--danger)">
        ≠
      </text>
      <rect x="48" y="136" width="192" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="144" y="161" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        Source 2: 4.2%
      </text>
      <rect x="32" y="184" width="224" height="36" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="144" y="207" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--foreground)">
        ✗ Looks like a contradiction
      </text>

      {/* with dates */}
      <rect x="288" y="16" width="256" height="216" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="416" y="40" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        With dates
      </text>
      <line x1="320" y1="152" x2="512" y2="152" stroke="var(--border)" strokeWidth="1.5" />
      {[2021, 2022, 2023, 2024, 2025].map((yr) => (
        <line key={yr} x1={yearX(yr)} y1="148" x2={yearX(yr)} y2="156" stroke="var(--border)" strokeWidth="1.5" />
      ))}
      <text x={yearX(2021)} y="172" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        2021
      </text>
      <text x={yearX(2025)} y="172" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        2025
      </text>
      <line
        x1={yearX(2021)}
        y1={rateY(6.1)}
        x2={yearX(2025) - 8}
        y2={rateY(4.2) - 2}
        stroke="var(--accent)"
        strokeWidth="2"
        markerEnd="url(#dates-trend-arrow)"
      />
      <circle cx={yearX(2021)} cy={rateY(6.1)} r="5" fill="var(--accent)" />
      <circle cx={yearX(2025)} cy={rateY(4.2)} r="5" fill="var(--accent)" />
      <text x={yearX(2021) + 12} y={rateY(6.1) - 6} fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        6.1%
      </text>
      <text x={yearX(2025)} y={rateY(4.2) - 12} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        4.2%
      </text>
      <rect x="304" y="184" width="224" height="36" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="416" y="207" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--foreground)">
        ✓ A trend over time
      </text>
    </svg>
  );
}

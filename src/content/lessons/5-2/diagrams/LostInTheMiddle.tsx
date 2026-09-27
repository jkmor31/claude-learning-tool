const sans = "var(--font-geist-sans), sans-serif";

const heightUnits = [9, 8, 6, 4, 2, 2, 2, 2, 4, 6, 8, 9];
const barX = heightUnits.map((_, i) => 36 + i * 48);
const baseline = 136;

function colorFor(i: number) {
  if (i <= 1 || i >= 10) return "var(--success)";
  if (i >= 4 && i <= 7) return "var(--danger)";
  return "var(--muted)";
}

export function LostInTheMiddle() {
  return (
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-labelledby="lost-in-middle-title lost-in-middle-desc"
      className="w-full max-w-[640px]"
    >
      <title id="lost-in-middle-title">Findings from the middle of a long input are the ones most often missed</title>
      <desc id="lost-in-middle-desc">
        An illustrative bar chart of twelve concatenated reports shows tall
        bars, meaning reliable use, for reports 1, 2, 11, and 12, short
        bars, meaning findings are often missed, for reports 5 through 8,
        and medium bars in between. Below the chart, the fix is a
        key-findings summary placed at the start plus explicit section
        headers per source.
      </desc>

      <line x1="16" y1={baseline} x2="624" y2={baseline} stroke="var(--border)" strokeWidth="1.5" />

      {heightUnits.map((v, i) => {
        const height = v * 8;
        return (
          <rect
            key={i}
            x={barX[i]}
            y={baseline - height}
            width="40"
            height={height}
            rx="3"
            fill={colorFor(i)}
          />
        );
      })}

      {heightUnits.map((_, i) => (
        <text key={`n${i}`} x={barX[i] + 20} y={baseline + 14} textAnchor="middle" fontFamily={sans} fontSize="10" fill="var(--muted)">
          {i + 1}
        </text>
      ))}

      <rect x="126" y="170" width="14" height="14" rx="3" fill="var(--success)" />
      <text x="146" y="181" fontFamily={sans} fontSize="11" fill="var(--foreground)">
        reliably used
      </text>

      <rect x="316" y="170" width="14" height="14" rx="3" fill="var(--muted)" />
      <text x="336" y="181" fontFamily={sans} fontSize="11" fill="var(--foreground)">
        transitional
      </text>

      <rect x="456" y="170" width="14" height="14" rx="3" fill="var(--danger)" />
      <text x="476" y="181" fontFamily={sans} fontSize="11" fill="var(--foreground)">
        often missed
      </text>

      <rect x="16" y="200" width="608" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="320" y="225" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Fix: key findings first, then explicit section headers per source
      </text>
    </svg>
  );
}

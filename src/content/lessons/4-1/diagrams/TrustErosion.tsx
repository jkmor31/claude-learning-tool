const sans = "var(--font-geist-sans), sans-serif";

type Bar = {
  label: string;
  sub: string;
  disabled?: boolean;
  noisy?: boolean;
};

type Panel = {
  x: number;
  heading: string;
  bars: Bar[];
  outcomeTitle: string;
  outcomeSub: string;
  recovered: boolean;
};

const baseBars: Bar[] = [
  { label: "Bugs", sub: "reliable" },
  { label: "Security", sub: "90% valid" },
];

const panels: Panel[] = [
  {
    x: 16,
    heading: "All categories live",
    bars: [...baseBars, { label: "Performance", sub: "15% valid", noisy: true }],
    outcomeTitle: "Trust collapses",
    outcomeSub: "security ignored too",
    recovered: false,
  },
  {
    x: 248,
    heading: "Performance disabled",
    bars: [...baseBars, { label: "Performance", sub: "(disabled)", disabled: true }],
    outcomeTitle: "Trust recovers",
    outcomeSub: "read again",
    recovered: true,
  },
];

export function TrustErosion() {
  return (
    <svg
      viewBox="0 0 480 400"
      role="img"
      aria-labelledby="trust-erosion-title trust-erosion-desc"
      className="w-full max-w-[480px]"
    >
      <title id="trust-erosion-title">A noisy category erodes trust in the categories that work</title>
      <desc id="trust-erosion-desc">
        With bugs at reliable accuracy, security at 90% valid, and
        performance suggestions at 15% valid all reporting live, developers
        stop reading the bot and dismiss even the accurate security
        findings. Disabling the noisy performance category while keeping
        bugs and security running restores trust in the reliable
        categories. A note below both panels says to re-enable performance
        once its criteria are tight.
      </desc>
      <defs>
        <marker
          id="trust-erosion-arrow"
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
        const cx = p.x + 108;
        const bx = p.x + 16;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="16" width="216" height="296" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            {p.bars.map((bar, i) => {
              const by = 56 + i * 56;
              const fill = bar.disabled
                ? "var(--surface)"
                : bar.noisy
                  ? "var(--danger-soft)"
                  : "var(--success-soft)";
              const stroke = bar.disabled ? "var(--muted)" : bar.noisy ? "var(--danger)" : "var(--success)";
              return (
                <g key={bar.label}>
                  <rect
                    x={bx}
                    y={by}
                    width="184"
                    height="48"
                    rx="6"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={bar.disabled ? 1.25 : 1.5}
                    strokeDasharray={bar.disabled ? "5 4" : undefined}
                  />
                  <text
                    x={cx}
                    y={by + 20}
                    textAnchor="middle"
                    fontFamily={sans}
                    fontSize="13"
                    fontWeight="700"
                    fill={bar.disabled ? "var(--muted)" : "var(--foreground)"}
                  >
                    {bar.label}
                  </text>
                  <text x={cx} y={by + 38} textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
                    {bar.sub}
                  </text>
                </g>
              );
            })}

            <line x1={cx} y1="216" x2={cx} y2="240" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#trust-erosion-arrow)" />

            <rect
              x={bx}
              y="244"
              width="184"
              height="48"
              rx="8"
              fill={p.recovered ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.recovered ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="264" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.outcomeTitle}
            </text>
            <text x={cx} y="282" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
              {p.outcomeSub}
            </text>
          </g>
        );
      })}

      <rect x="16" y="328" width="448" height="48" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="357" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Re-enable performance once its criteria are tight
      </text>
    </svg>
  );
}

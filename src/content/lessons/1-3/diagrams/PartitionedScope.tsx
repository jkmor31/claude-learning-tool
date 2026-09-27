const sans = "var(--font-geist-sans), sans-serif";

const rowYs = [72, 128, 184];
const slices = ["Solar", "Wind", "Storage"];

export function PartitionedScope() {
  return (
    <svg
      viewBox="0 0 480 272"
      role="img"
      aria-labelledby="partitioned-scope-title partitioned-scope-desc"
      className="w-full max-w-[480px]"
    >
      <title id="partitioned-scope-title">Same assignment vs partitioned scope</title>
      <desc id="partitioned-scope-desc">
        On the left, three subagents all receive the same assignment,
        renewable energy, and return overlapping findings. On the right, each
        subagent receives a distinct slice, solar, wind, or storage, and returns
        distinct findings.
      </desc>
      <defs>
        <marker
          id="partitioned-scope-arrow"
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

      {/* panels */}
      <rect x="16" y="16" width="216" height="240" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="44" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Same assignment
      </text>
      <rect x="248" y="16" width="216" height="240" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="44" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Partitioned
      </text>

      {/* left: every agent gets the whole topic */}
      <rect x="136" y="72" width="80" height="152" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="176" y="144" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Renewable
      </text>
      <text x="176" y="162" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        energy
      </text>
      {rowYs.map((y, i) => (
        <g key={`same-${y}`}>
          <rect x="32" y={y} width="64" height="40" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
          <text x="64" y={y + 25} textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {`Agent ${i + 1}`}
          </text>
          <line
            x1="96"
            y1={y + 20}
            x2="134"
            y2={120 + i * 28}
            stroke="var(--muted)"
            strokeWidth="1.5"
            markerEnd="url(#partitioned-scope-arrow)"
          />
        </g>
      ))}
      <text x="124" y="246" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        overlapping findings
      </text>

      {/* right: each agent gets its own slice */}
      {rowYs.map((y, i) => (
        <g key={`slice-${y}`}>
          <rect x="264" y={y} width="64" height="40" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
          <text x="296" y={y + 25} textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {`Agent ${i + 1}`}
          </text>
          <line
            x1="328"
            y1={y + 20}
            x2="366"
            y2={y + 20}
            stroke="var(--muted)"
            strokeWidth="1.5"
            markerEnd="url(#partitioned-scope-arrow)"
          />
          <rect x="368" y={y} width="80" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="408" y={y + 25} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {slices[i]}
          </text>
        </g>
      ))}
      <text x="356" y="246" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        distinct findings
      </text>
    </svg>
  );
}

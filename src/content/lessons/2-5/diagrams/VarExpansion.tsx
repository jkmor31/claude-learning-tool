const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const devs = [
  { x: 16, name: "Alice's shell", who: "acts as Alice" },
  { x: 168, name: "Bob's shell", who: "acts as Bob" },
  { x: 320, name: "Chen's shell", who: "acts as Chen" },
];

export function VarExpansion() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="var-expansion-title var-expansion-desc"
      className="w-full max-w-[480px]"
    >
      <title id="var-expansion-title">One committed reference, one token per developer</title>
      <desc id="var-expansion-desc">
        The committed .mcp.json file contains only the reference
        GITHUB_TOKEN in dollar-brace syntax. Each of three developers sets
        GITHUB_TOKEN in their own environment, which is not in git, so the
        server started for each developer acts as that developer in GitHub.
      </desc>
      <defs>
        <marker
          id="var-expansion-arrow"
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

      {/* the shared, committed file */}
      <rect x="112" y="16" width="256" height="88" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="42" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        .mcp.json
      </text>
      <text x="240" y="68" textAnchor="middle" fontFamily={mono} fontSize="14" fill="var(--foreground)">
        {'"${GITHUB_TOKEN}"'}
      </text>
      <text x="240" y="92" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        committed: names the credential
      </text>

      {/* fan-out to each developer */}
      <path d="M200 104 V120 H88 V150" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#var-expansion-arrow)" />
      <line x1="240" y1="104" x2="240" y2="150" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#var-expansion-arrow)" />
      <path d="M280 104 V120 H392 V150" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#var-expansion-arrow)" />

      {devs.map((d) => (
        <g key={d.name}>
          <rect x={d.x} y="152" width="144" height="80" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={d.x + 72} y="176" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
            {d.name}
          </text>
          <text x={d.x + 72} y="198" textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
            GITHUB_TOKEN
          </text>
          <text x={d.x + 72} y="220" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            own value, not in git
          </text>
          <line x1={d.x + 72} y1="232" x2={d.x + 72} y2="262" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#var-expansion-arrow)" />
          <rect x={d.x} y="264" width="144" height="40" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
          <text x={d.x + 72} y="289" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {d.who}
          </text>
        </g>
      ))}
    </svg>
  );
}

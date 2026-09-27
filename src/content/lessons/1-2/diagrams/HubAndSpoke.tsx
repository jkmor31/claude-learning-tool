const sans = "var(--font-geist-sans), sans-serif";

const subagents = [
  { name: "search", x: 16 },
  { name: "analyze", x: 132 },
  { name: "synthesize", x: 248 },
  { name: "report", x: 364 },
];
// Where each spoke leaves the coordinator's bottom edge.
const spokeStarts = [152, 208, 272, 328];

export function HubAndSpoke() {
  return (
    <svg
      viewBox="0 0 480 384"
      role="img"
      aria-labelledby="hub-and-spoke-title hub-and-spoke-desc"
      className="w-full max-w-[480px]"
    >
      <title id="hub-and-spoke-title">Hub-and-spoke coordinator</title>
      <desc id="hub-and-spoke-desc">
        The user talks only to the coordinator. The coordinator decomposes,
        delegates, routes, handles errors, and aggregates, and exchanges tasks
        and results with four subagents: search, analyze, synthesize, and
        report. Subagents never message each other directly.
      </desc>
      <defs>
        <marker
          id="hub-and-spoke-arrow"
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

      {/* user */}
      <rect x="184" y="16" width="112" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="41" textAnchor="middle" fontFamily={sans} fontSize="15" fill="var(--foreground)">
        User
      </text>
      <line
        x1="240"
        y1="58"
        x2="240"
        y2="94"
        stroke="var(--accent)"
        strokeWidth="2"
        markerStart="url(#hub-and-spoke-arrow)"
        markerEnd="url(#hub-and-spoke-arrow)"
      />

      {/* coordinator */}
      <rect x="96" y="96" width="288" height="88" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <text x="240" y="126" textAnchor="middle" fontFamily={sans} fontSize="16" fontWeight="700" fill="var(--foreground)">
        Coordinator
      </text>
      <text x="240" y="150" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        decompose · delegate · route
      </text>
      <text x="240" y="168" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        handle errors · aggregate
      </text>

      {/* spokes: tasks down, results up */}
      {subagents.map((s, i) => (
        <line
          key={s.name}
          x1={spokeStarts[i]}
          y1="186"
          x2={s.x + 50}
          y2="262"
          stroke="var(--accent)"
          strokeWidth="2"
          markerStart="url(#hub-and-spoke-arrow)"
          markerEnd="url(#hub-and-spoke-arrow)"
        />
      ))}

      {/* subagents */}
      {subagents.map((s) => (
        <g key={s.name}>
          <rect x={s.x} y="264" width="100" height="44" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s.x + 50} y="291" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
            {s.name}
          </text>
        </g>
      ))}

      {/* blocked direct path between subagents */}
      <path
        d="M66 308 V336 H298 V308"
        fill="none"
        stroke="var(--danger)"
        strokeWidth="1.75"
        strokeDasharray="5 4"
      />
      <circle cx="182" cy="336" r="10" fill="var(--surface)" stroke="var(--danger)" strokeWidth="1.75" />
      <path d="M177 331 L187 341 M187 331 L177 341" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />
      <text x="182" y="364" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        no direct subagent messages
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const subagents = [
  { name: "Search", x: 16 },
  { name: "Doc analysis", x: 132 },
  { name: "Synthesis", x: 248 },
  { name: "Report", x: 364 },
];

export function ResearchArchitecture() {
  return (
    <svg
      viewBox="0 0 480 448"
      role="img"
      aria-labelledby="research-architecture-title research-architecture-desc"
      className="w-full max-w-[480px]"
    >
      <title id="research-architecture-title">Multi-agent research system reference architecture</title>
      <desc id="research-architecture-desc">
        A topic enters the coordinator, which decomposes, partitions, delegates
        and checks coverage; on restart it also loads a manifest. The
        coordinator sends Task calls with goals and complete inputs to four
        subagents (search, document analysis, synthesis and report) in
        parallel, and each returns structured results or structured errors to
        the coordinator. Only synthesis has a scoped verify_fact tool.
      </desc>
      <defs>
        <marker
          id="research-architecture-arrow"
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

      {/* inputs */}
      <rect x="48" y="16" width="160" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="128" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Topic
      </text>
      <line x1="128" y1="64" x2="128" y2="94" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#research-architecture-arrow)" />

      <rect
        x="272"
        y="16"
        width="160"
        height="48"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="352" y="36" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Manifest
      </text>
      <text x="352" y="54" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        on restart · 5.5
      </text>
      <line
        x1="352"
        y1="64"
        x2="352"
        y2="94"
        stroke="var(--muted)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        markerEnd="url(#research-architecture-arrow)"
      />

      {/* coordinator */}
      <rect x="16" y="96" width="448" height="72" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <text x="240" y="124" textAnchor="middle" fontFamily={sans} fontSize="16" fontWeight="700" fill="var(--foreground)">
        Coordinator
      </text>
      <text x="240" y="150" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        decompose · partition · delegate · check coverage
      </text>

      {/* spokes: Task calls down, results up */}
      {subagents.map((s) => {
        const c = s.x + 50;
        return (
          <g key={s.name}>
            <line
              x1={c - 14}
              y1="168"
              x2={c - 14}
              y2="238"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#research-architecture-arrow)"
            />
            <line
              x1={c + 14}
              y1="240"
              x2={c + 14}
              y2="170"
              stroke="var(--muted)"
              strokeWidth="1.5"
              markerEnd="url(#research-architecture-arrow)"
            />
          </g>
        );
      })}

      {/* subagents */}
      {subagents.map((s) => (
        <g key={s.name}>
          <rect x={s.x} y="240" width="100" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={s.x + 50} y="269" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {s.name}
          </text>
        </g>
      ))}

      {/* scoped cross-role tool */}
      <line x1="298" y1="288" x2="298" y2="326" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#research-architecture-arrow)" />
      <rect x="232" y="328" width="132" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="298" y="349" textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        verify_fact
      </text>
      <text x="298" y="367" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        scoped · 2.3
      </text>

      {/* legend */}
      <line x1="24" y1="404" x2="56" y2="404" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#research-architecture-arrow)" />
      <text x="68" y="408" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        Task call: goals + complete inputs, in parallel (1.5)
      </text>
      <line x1="56" y1="428" x2="24" y2="428" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#research-architecture-arrow)" />
      <text x="68" y="432" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        structured results or structured errors (5.4)
      </text>
    </svg>
  );
}

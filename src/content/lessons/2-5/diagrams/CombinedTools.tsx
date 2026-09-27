const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const sources = [
  { y: 64, name: "github", kind: "MCP server", mono: true },
  { y: 144, name: "issues", kind: "MCP server", mono: true },
  { y: 224, name: "Built-ins", kind: "Grep, Read, ...", mono: false },
];

const tools = [
  { name: "mcp__github__create_issue", builtin: false },
  { name: "mcp__issues__search", builtin: false },
  { name: "Grep", builtin: true },
  { name: "Read", builtin: true },
  { name: "...", builtin: true },
];

export function CombinedTools() {
  return (
    <svg
      viewBox="0 0 480 336"
      role="img"
      aria-labelledby="combined-tools-title combined-tools-desc"
      className="w-full max-w-[480px]"
    >
      <title id="combined-tools-title">Every configured server feeds one tool list</title>
      <desc id="combined-tools-desc">
        Two MCP servers, github and issues, and the built-in tools all feed
        into a single list of tools the agent sees at once:
        mcp__github__create_issue, mcp__issues__search, Grep, Read, and more.
        The agent does not choose a server first.
      </desc>
      <defs>
        <marker
          id="combined-tools-arrow"
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

      {/* sources */}
      {sources.map((s) => (
        <g key={s.name}>
          <rect x="16" y={s.y} width="144" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text
            x="88"
            y={s.y + 24}
            textAnchor="middle"
            fontFamily={s.mono ? mono : sans}
            fontSize="14"
            fontWeight={s.mono ? 600 : 700}
            fill="var(--foreground)"
          >
            {s.name}
          </text>
          <text x="88" y={s.y + 43} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {s.kind}
          </text>
          <line x1="160" y1={s.y + 28} x2="206" y2={s.y + 28} stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#combined-tools-arrow)" />
        </g>
      ))}

      {/* the agent's single tool list */}
      <rect x="208" y="16" width="256" height="304" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="336" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        {"Agent's tools, all at once"}
      </text>
      {tools.map((t, i) => (
        <g key={t.name}>
          <rect
            x="224"
            y={64 + i * 40}
            width="224"
            height="32"
            rx="6"
            fill={t.builtin ? "none" : "var(--accent-soft)"}
            stroke={t.builtin ? "var(--border)" : "var(--accent)"}
            strokeWidth="1.25"
          />
          <text x="236" y={64 + i * 40 + 21} fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {t.name}
          </text>
        </g>
      ))}
      <text x="336" y="292" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        discovered at connection time
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Leaf = { y: number; lines: [string, ...string[]] };
type Column = { header: string; x: number; leaves: Leaf[] };

// Each leaf: first line is the condition (muted), the rest are the destination (mono).
const columns: Column[] = [
  {
    header: "Convention",
    x: 16,
    leaves: [
      { y: 240, lines: ["whole repo", "CLAUDE.md"] },
      { y: 296, lines: ["one folder", "folder/CLAUDE.md"] },
      { y: 352, lines: ["file pattern", ".claude/rules/", "paths: [globs]"] },
    ],
  },
  {
    header: "Workflow",
    x: 168,
    leaves: [
      { y: 240, lines: ["run on demand", ".claude/commands/"] },
      { y: 296, lines: ["verbose / restricted", ".claude/skills/", "context: fork", "allowed-tools"] },
    ],
  },
  {
    header: "Tool integration",
    x: 320,
    leaves: [{ y: 240, lines: ["shared servers", ".mcp.json", "${ENV} creds"] }],
  },
];

export function WhereItBelongs() {
  return (
    <svg
      viewBox="0 0 480 440"
      role="img"
      aria-labelledby="where-it-belongs-title where-it-belongs-desc"
      className="w-full max-w-[480px]"
    >
      <title id="where-it-belongs-title">Where an instruction or workflow belongs</title>
      <desc id="where-it-belongs-desc">
        First ask who needs it: if only you, it goes in ~/.claude/. If the team
        needs it, it goes in the repository, and the next question is what it
        is. A convention goes in the project CLAUDE.md for the whole repo, a
        folder&apos;s CLAUDE.md for one folder, or a .claude/rules/ file with
        paths globs for a file pattern. A workflow goes in .claude/commands/, or
        in .claude/skills/ with context: fork and allowed-tools when it needs
        isolation or restricted tools. A tool
        integration goes in .mcp.json with credentials from environment
        variables.
      </desc>
      <defs>
        <marker
          id="where-it-belongs-arrow"
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

      {/* Q1: who needs it? */}
      <rect x="168" y="16" width="144" height="40" rx="20" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="41" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Who needs it?
      </text>

      {/* only me -> ~/.claude/ */}
      <line x1="312" y1="36" x2="374" y2="36" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#where-it-belongs-arrow)" />
      <text x="343" y="28" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        only me
      </text>
      <rect x="376" y="16" width="88" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="420" y="40" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        ~/.claude/
      </text>

      {/* the team -> Q2 */}
      <line x1="240" y1="56" x2="240" y2="102" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#where-it-belongs-arrow)" />
      <text x="250" y="84" fontFamily={sans} fontSize="12" fill="var(--muted)">
        the team → in the repo
      </text>

      {/* Q2: what is it? */}
      <rect x="168" y="104" width="144" height="40" rx="20" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="129" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        What is it?
      </text>

      {/* fan out to the three kinds */}
      <path d="M240 144 V168 M88 168 H392" fill="none" stroke="var(--accent)" strokeWidth="2" />
      {columns.map((col) => (
        <line
          key={col.header}
          x1={col.x + 72}
          y1="168"
          x2={col.x + 72}
          y2="190"
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#where-it-belongs-arrow)"
        />
      ))}

      {columns.map((col) => (
        <g key={col.header}>
          <rect x={col.x} y="192" width="144" height="32" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={col.x + 72} y="213" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
            {col.header}
          </text>

          {col.leaves.map((leaf) => {
            const h = 12 + leaf.lines.length * 18;
            return (
              <g key={leaf.lines[1]}>
                <rect x={col.x} y={leaf.y} width="144" height={h} rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
                {leaf.lines.map((line, i) => (
                  <text
                    key={line}
                    x={col.x + 72}
                    y={leaf.y + 19 + i * 18}
                    textAnchor="middle"
                    fontFamily={i === 0 ? sans : mono}
                    fontSize="12"
                    fill={i === 0 ? "var(--muted)" : "var(--foreground)"}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  );
}

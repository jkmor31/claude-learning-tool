const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const files = [
  { path: "~/.claude/CLAUDE.md", role: "user: your preferences", strip: "1. user", onDemand: false },
  { path: "CLAUDE.md (repo root)", role: "project: team standards", strip: "2. project", onDemand: false },
  { path: "packages/api/CLAUDE.md", role: "directory: API rules", strip: "3. directory", onDemand: true },
];

const rowYs = [64, 136, 208];

export function ConfigStack() {
  return (
    <svg
      viewBox="0 0 480 304"
      role="img"
      aria-labelledby="config-stack-title config-stack-desc"
      className="w-full max-w-[480px]"
    >
      <title id="config-stack-title">CLAUDE.md files combine into one context</title>
      <desc id="config-stack-desc">
        Three CLAUDE.md files apply when working in packages/api: the
        user-level file, the project file at the repo root, and the
        directory file in packages/api. All three are added to the session
        context in order, user first and directory last, so none replaces
        another. The directory file loads on demand.
      </desc>
      <defs>
        <marker
          id="config-stack-arrow"
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

      <text x="116" y="36" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Files that apply
      </text>
      <text x="376" y="36" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Session context
      </text>

      {/* the context panel */}
      <rect x="288" y="48" width="176" height="216" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />

      {files.map((f, i) => {
        const y = rowYs[i];
        const dash = f.onDemand ? "5 4" : undefined;
        return (
          <g key={f.path}>
            {/* file card */}
            <rect x="16" y={y - 8} width="200" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray={dash} />
            <text x="28" y={y + 14} fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {f.path}
            </text>
            <text x="28" y={y + 36} fontFamily={sans} fontSize="12" fill="var(--muted)">
              {f.role}
            </text>

            {/* card -> context */}
            <line
              x1="216"
              y1={y + 20}
              x2="302"
              y2={y + 20}
              stroke="var(--muted)"
              strokeWidth="1.5"
              strokeDasharray={dash}
              markerEnd="url(#config-stack-arrow)"
            />

            {/* strip in the context */}
            <rect x="304" y={y} width="144" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.25" strokeDasharray={dash} />
            <text x="376" y={y + 25} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {f.strip}
            </text>

            {i > 0 && (
              <text x="376" y={y - 11} textAnchor="middle" fontFamily={sans} fontSize="16" fontWeight="700" fill="var(--accent)">
                +
              </text>
            )}
          </g>
        );
      })}

      <text x="116" y="288" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        dashed: loads on demand
      </text>
      <text x="376" y="288" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        read top to bottom
      </text>
    </svg>
  );
}

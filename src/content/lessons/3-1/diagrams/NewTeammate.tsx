const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  heading: string;
  hasUserFile: boolean;
  userNote: string;
  outcome: string;
};

const panels: Panel[] = [
  { x: 16, heading: "Original developer", hasUserFile: true, userNote: "holds the conventions", outcome: "follows conventions" },
  { x: 248, heading: "New teammate", hasUserFile: false, userNote: "not on this machine", outcome: "ignores conventions" },
];

export function NewTeammate() {
  return (
    <svg
      viewBox="0 0 480 352"
      role="img"
      aria-labelledby="new-teammate-title new-teammate-desc"
      className="w-full max-w-[480px]"
    >
      <title id="new-teammate-title">Why the new teammate misses the conventions</title>
      <desc id="new-teammate-desc">
        Both developers load the same committed project CLAUDE.md. The
        original developer also has a user-level file in the home directory
        that holds the team conventions, so Claude follows them. The new
        teammate has no such file, so Claude ignores the conventions. The fix
        is to move the conventions into the project CLAUDE.md.
      </desc>
      <defs>
        <marker
          id="new-teammate-arrow"
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
        const ok = p.hasUserFile;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="16" width="216" height="256" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            {/* user-level file */}
            <rect
              x={bx}
              y="64"
              width="184"
              height="48"
              rx="6"
              fill={ok ? "var(--surface)" : "none"}
              stroke="var(--border)"
              strokeWidth="1.25"
              strokeDasharray={ok ? undefined : "5 4"}
            />
            <text x={bx + 12} y="84" fontFamily={mono} fontSize="13" fontWeight="600" fill={ok ? "var(--foreground)" : "var(--muted)"}>
              {"~/.claude/CLAUDE.md"}
            </text>
            <text x={bx + 12} y="103" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.userNote}
            </text>

            <text x={cx} y="125" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--muted)">
              +
            </text>

            {/* project-level file, identical for both */}
            <rect x={bx} y="128" width="184" height="48" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={bx + 12} y="148" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
              CLAUDE.md
            </text>
            <text x={bx + 12} y="167" fontFamily={sans} fontSize="12" fill="var(--muted)">
              project, same for both
            </text>

            <line x1={cx} y1="176" x2={cx} y2="206" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#new-teammate-arrow)" />

            {/* outcome */}
            <rect
              x={bx}
              y="208"
              width="184"
              height="40"
              rx="8"
              fill={ok ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={ok ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
              strokeDasharray={ok ? undefined : "5 4"}
            />
            <text x={cx} y="233" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {p.outcome}
            </text>
          </g>
        );
      })}

      {/* the fix */}
      <rect x="16" y="288" width="448" height="48" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="317" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Fix: move conventions to project CLAUDE.md
      </text>
    </svg>
  );
}

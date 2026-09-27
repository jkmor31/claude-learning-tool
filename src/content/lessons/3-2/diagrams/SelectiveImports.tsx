const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type FileRow = { name: string; y: number };
type PackageGroup = { label: string; rows: FileRow[]; boxY: number; boxH: number; captionY: number };

const groups: PackageGroup[] = [
  {
    label: "payments/CLAUDE.md",
    rows: [
      { name: "api-errors.md", y: 80 },
      { name: "money-handling.md", y: 128 },
      { name: "pci-logging.md", y: 176 },
    ],
    boxY: 64,
    boxH: 128,
    captionY: 56,
  },
  {
    label: "web/CLAUDE.md",
    rows: [
      { name: "react-components.md", y: 240 },
      { name: "accessibility.md", y: 288 },
    ],
    boxY: 224,
    boxH: 80,
    captionY: 216,
  },
  {
    label: "db/CLAUDE.md",
    rows: [{ name: "sql-migrations.md", y: 352 }],
    boxY: 336,
    boxH: 48,
    captionY: 328,
  },
];

export function SelectiveImports() {
  return (
    <svg
      viewBox="0 0 640 424"
      role="img"
      aria-labelledby="selective-imports-title selective-imports-desc"
      className="w-full max-w-[640px]"
    >
      <title id="selective-imports-title">Each package imports only its own standards</title>
      <desc id="selective-imports-desc">
        A shared standards folder holds six files, one topic each. The
        payments package CLAUDE.md imports api-errors, money-handling, and
        pci-logging. The web package imports react-components and
        accessibility. The db package imports sql-migrations. No package
        imports a standard it doesn&apos;t need.
      </desc>
      <defs>
        <marker
          id="selective-imports-arrow"
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

      <text x="116" y="28" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        standards/ (one copy each)
      </text>

      {groups.map((g) => (
        <g key={g.label}>
          <rect x="440" y={g.boxY} width="184" height={g.boxH} rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="440" y={g.captionY} fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {g.label}
          </text>
          <text
            x="532"
            y={g.boxY + g.boxH / 2 + 5}
            textAnchor="middle"
            fontFamily={sans}
            fontSize="12"
            fill="var(--muted)"
          >
            {g.rows.length === 1 ? "imports 1 standard" : `imports ${g.rows.length} standards`}
          </text>

          {g.rows.map((r) => (
            <g key={r.name}>
              <rect x="16" y={r.y - 16} width="200" height="32" rx="6" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
              <text x="116" y={r.y + 5} textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
                {r.name}
              </text>
              <line
                x1="216"
                y1={r.y}
                x2="434"
                y2={r.y}
                stroke="var(--muted)"
                strokeWidth="1.5"
                markerEnd="url(#selective-imports-arrow)"
              />
            </g>
          ))}
        </g>
      ))}

      <text x="116" y="408" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        each standard maintained once
      </text>
      <text x="532" y="408" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        only the relevant files load
      </text>
    </svg>
  );
}

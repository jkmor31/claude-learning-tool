const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Tone = "plain" | "wrong" | "found" | "catalog";

type Step = { name: string; tag?: string; tone: Tone };

const explore: Step[] = [
  { name: "list_directories", tone: "plain" },
  { name: "list_directories", tone: "plain" },
  { name: "search_docs", tone: "plain" },
  { name: "read_doc v1.md", tag: "wrong", tone: "wrong" },
  { name: "read_doc v2.md", tag: "found", tone: "found" },
];

const catalog: Step[] = [
  { name: "docs catalog", tag: "resource", tone: "catalog" },
  { name: "read_doc v2.md", tag: "found", tone: "found" },
];

const toneStyles: Record<Tone, { fill: string; stroke: string; tag: string; dash?: string }> = {
  plain: { fill: "var(--background)", stroke: "var(--border)", tag: "var(--muted)" },
  wrong: { fill: "var(--danger-soft)", stroke: "var(--danger)", tag: "var(--danger)", dash: "5 4" },
  found: { fill: "var(--success-soft)", stroke: "var(--success)", tag: "var(--success)" },
  catalog: { fill: "var(--accent-soft)", stroke: "var(--accent)", tag: "var(--accent)" },
};

function Steps({ x, steps }: { x: number; steps: Step[] }) {
  const cx = x + 92;
  return (
    <g>
      {steps.map((s, i) => {
        const st = toneStyles[s.tone];
        const y = 64 + i * 48;
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={cx}
                y1={y - 16}
                x2={cx}
                y2={y - 2}
                stroke="var(--muted)"
                strokeWidth="1.5"
                markerEnd="url(#catalog-vs-exploration-arrow)"
              />
            )}
            <rect x={x} y={y} width="184" height="32" rx="6" fill={st.fill} stroke={st.stroke} strokeWidth="1.25" strokeDasharray={st.dash} />
            <text x={x + 12} y={y + 21} fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {s.name}
            </text>
            {s.tag && (
              <text x={x + 172} y={y + 21} textAnchor="end" fontFamily={sans} fontSize="12" fontWeight="600" fill={st.tag}>
                {s.tag}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function CatalogVsExploration() {
  return (
    <svg
      viewBox="0 0 480 352"
      role="img"
      aria-labelledby="catalog-vs-exploration-title catalog-vs-exploration-desc"
      className="w-full max-w-[480px]"
    >
      <title id="catalog-vs-exploration-title">Exploring with tools vs reading a catalog resource</title>
      <desc id="catalog-vs-exploration-desc">
        Left, tools only: the agent calls list_directories twice, then
        search_docs, then reads the wrong page, billing v1, before reading
        billing v2. That is five calls and one wrong turn. Right, with a docs
        catalog resource: the agent reads the catalog, then goes straight to
        billing v2.
      </desc>
      <defs>
        <marker
          id="catalog-vs-exploration-arrow"
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

      <rect x="16" y="16" width="216" height="320" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Tools only
      </text>
      <Steps x={32} steps={explore} />
      <text x="124" y="316" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        5 calls, 1 wrong turn
      </text>

      <rect x="248" y="16" width="216" height="320" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        With a catalog
      </text>
      <Steps x={264} steps={catalog} />
      <text x="356" y="316" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        straight to the right page
      </text>
    </svg>
  );
}

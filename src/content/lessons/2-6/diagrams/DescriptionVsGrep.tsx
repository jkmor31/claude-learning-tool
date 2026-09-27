const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type ChipState = "ignored" | "fallback" | "picked" | "skipped";

const tagText: Record<ChipState, string> = {
  ignored: "ignored",
  fallback: "picked",
  picked: "picked",
  skipped: "not this",
};

function Chip({ x, y, name, detail, state }: { x: number; y: number; name: string; detail: string; state: ChipState }) {
  const picked = state === "picked";
  const ignored = state === "ignored";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="184"
        height="48"
        rx="6"
        fill={picked ? "var(--accent-soft)" : "var(--background)"}
        stroke={picked ? "var(--accent)" : ignored ? "var(--danger)" : "var(--border)"}
        strokeWidth={picked ? 2 : 1.25}
        strokeDasharray={ignored ? "5 4" : undefined}
      />
      <text x={x + 12} y={y + 20} fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        {name}
      </text>
      <text x={x + 12} y={y + 38} fontFamily={sans} fontSize="12" fill="var(--muted)">
        {detail}
      </text>
      <text
        x={x + 172}
        y={y + 20}
        textAnchor="end"
        fontFamily={sans}
        fontSize="12"
        fontWeight="600"
        fill={picked ? "var(--accent)" : ignored ? "var(--danger)" : state === "fallback" ? "var(--foreground)" : "var(--muted)"}
      >
        {tagText[state]}
      </text>
    </g>
  );
}

export function DescriptionVsGrep() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="description-vs-grep-title description-vs-grep-desc"
      className="w-full max-w-[480px]"
    >
      <title id="description-vs-grep-title">A vague MCP tool description vs a detailed one</title>
      <desc id="description-vs-grep-desc">
        The user asks who calls parseInvoice. When find_symbol is described
        only as Find symbols, the model ignores it and picks the familiar
        built-in Grep. When the find_symbol description explains that it
        resolves aliases and re-exports and when to use it, the model picks
        find_symbol, and Grep stays the tool for free-text searches.
      </desc>
      <defs>
        <marker
          id="description-vs-grep-arrow"
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

      {/* the question */}
      <rect x="16" y="16" width="448" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        {'"Who calls parseInvoice?"'}
      </text>
      <line x1="124" y1="64" x2="124" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#description-vs-grep-arrow)" />
      <line x1="356" y1="64" x2="356" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#description-vs-grep-arrow)" />

      {/* vague description */}
      <rect x="16" y="96" width="216" height="208" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="124" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Vague description
      </text>
      <Chip x={32} y={144} name="find_symbol" detail={'"Find symbols."'} state="ignored" />
      <Chip x={32} y={208} name="Grep" detail="built-in, familiar" state="fallback" />
      <text x="124" y="284" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        better tool ignored
      </text>

      {/* detailed description */}
      <rect x="248" y="96" width="216" height="208" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="124" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Detailed description
      </text>
      <Chip x={264} y={144} name="find_symbol" detail="aliases, re-exports" state="picked" />
      <Chip x={264} y={208} name="Grep" detail="free-text search" state="skipped" />
      <text x="356" y="284" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        right tool, Grep kept
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type ChipState = "unsure" | "picked" | "skipped";

function Chip({ x, y, name, detail, state }: { x: number; y: number; name: string; detail: string; state: ChipState }) {
  const picked = state === "picked";
  const unsure = state === "unsure";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="184"
        height="48"
        rx="6"
        fill={picked ? "var(--accent-soft)" : "var(--background)"}
        stroke={picked ? "var(--accent)" : unsure ? "var(--danger)" : "var(--border)"}
        strokeWidth={picked ? 2 : 1.25}
        strokeDasharray={unsure ? "5 4" : undefined}
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
        fontSize={unsure ? 14 : 12}
        fontWeight="600"
        fill={picked ? "var(--accent)" : unsure ? "var(--danger)" : "var(--muted)"}
      >
        {picked ? "picked" : unsure ? "?" : "not this"}
      </text>
    </g>
  );
}

export function ToolRouting() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="tool-routing-title tool-routing-desc"
      className="w-full max-w-[480px]"
    >
      <title id="tool-routing-title">Minimal descriptions vs descriptions with boundaries</title>
      <desc id="tool-routing-desc">
        The user asks whether anyone has reported the Android login bug. With
        minimal descriptions, search_docs and search_tickets look equally
        plausible and the choice is a coin flip. With descriptions that state
        what each tool is for and when not to use it, search_tickets is clearly
        the tool for reported issues and search_docs is for how-to questions,
        so the model picks search_tickets.
      </desc>
      <defs>
        <marker
          id="tool-routing-arrow"
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

      {/* the user's question */}
      <rect x="16" y="16" width="448" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        {'"Has anyone reported the Android login bug?"'}
      </text>
      <line x1="124" y1="64" x2="124" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#tool-routing-arrow)" />
      <line x1="356" y1="64" x2="356" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#tool-routing-arrow)" />

      {/* minimal descriptions */}
      <rect x="16" y="96" width="216" height="208" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="124" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Minimal descriptions
      </text>
      <Chip x={32} y={144} name="search_docs" detail={'"Searches documentation."'} state="unsure" />
      <Chip x={32} y={208} name="search_tickets" detail={'"Searches tickets."'} state="unsure" />
      <text x="124" y="284" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        coin flip
      </text>

      {/* descriptions with boundaries */}
      <rect x="248" y="96" width="216" height="208" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="124" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        With boundaries
      </text>
      <Chip x={264} y={144} name="search_docs" detail="how-to questions" state="skipped" />
      <Chip x={264} y={208} name="search_tickets" detail="reported issues" state="picked" />
      <text x="356" y="284" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        clear choice
      </text>
    </svg>
  );
}

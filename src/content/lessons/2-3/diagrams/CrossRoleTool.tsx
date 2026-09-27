const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type ChipState = "narrow" | "granted" | "absent";

function Chip({ x, y, name, state }: { x: number; y: number; name: string; state: ChipState }) {
  const absent = state === "absent";
  const narrow = state === "narrow";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="176"
        height="32"
        rx="6"
        fill={absent ? "none" : "var(--accent-soft)"}
        stroke={absent ? "var(--border)" : "var(--accent)"}
        strokeWidth={narrow ? 2 : 1.25}
        strokeDasharray={absent ? "5 4" : undefined}
      />
      <text
        x={x + 12}
        y={y + 21}
        fontFamily={mono}
        fontSize="13"
        fontWeight={absent ? 400 : 600}
        fill={absent ? "var(--muted)" : "var(--foreground)"}
      >
        {name}
      </text>
      {state !== "granted" && (
        <text
          x={x + 164}
          y={y + 21}
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fontWeight={narrow ? 600 : 400}
          fill={narrow ? "var(--accent)" : "var(--muted)"}
        >
          {narrow ? "read-only" : "not granted"}
        </text>
      )}
    </g>
  );
}

export function CrossRoleTool() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="cross-role-tool-title cross-role-tool-desc"
      className="w-full max-w-[480px]"
    >
      <title id="cross-role-tool-title">A narrow cross-role tool for the synthesis agent</title>
      <desc id="cross-role-tool-desc">
        The synthesis agent has a narrow, read-only verify_fact tool for
        frequent simple checks, but not web_search. The search agent has
        web_search and load_document. Complex research still makes a round
        trip from the synthesis agent through the coordinator to the search
        agent and back.
      </desc>
      <defs>
        <marker
          id="cross-role-tool-arrow"
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

      {/* coordinator and the round trip for complex cases */}
      <rect x="160" y="16" width="160" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="45" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Coordinator
      </text>
      <path
        d="M120 158 V40 H158"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.5"
        markerStart="url(#cross-role-tool-arrow)"
        markerEnd="url(#cross-role-tool-arrow)"
      />
      <path
        d="M322 40 H360 V158"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.5"
        markerStart="url(#cross-role-tool-arrow)"
        markerEnd="url(#cross-role-tool-arrow)"
      />
      <text x="240" y="96" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        complex cases:
      </text>
      <text x="240" y="114" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        round trip
      </text>

      {/* synthesis agent */}
      <rect x="16" y="160" width="208" height="128" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="120" y="186" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Synthesis agent
      </text>
      <Chip x={32} y={200} name="verify_fact" state="narrow" />
      <Chip x={32} y={240} name="web_search" state="absent" />

      {/* search agent */}
      <rect x="256" y="160" width="208" height="128" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="360" y="186" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Search agent
      </text>
      <Chip x={272} y={200} name="web_search" state="granted" />
      <Chip x={272} y={240} name="load_document" state="granted" />

      <text x="120" y="308" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        simple checks: no round trip
      </text>
    </svg>
  );
}

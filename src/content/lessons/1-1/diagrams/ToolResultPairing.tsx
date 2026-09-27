const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

function Row({
  y,
  kind,
  middle,
  id,
  strong,
}: {
  y: number;
  kind: string;
  middle?: string;
  id?: string;
  strong?: boolean;
}) {
  return (
    <g>
      <rect
        x="64"
        y={y}
        width="320"
        height="32"
        rx="6"
        fill={strong ? "var(--accent-soft)" : "var(--surface)"}
        stroke={strong ? "var(--accent)" : "var(--border)"}
        strokeWidth="1.25"
      />
      <text x="76" y={y + 21} fontFamily={mono} fontSize="13" fontWeight={strong ? 600 : 400} fill={strong ? "var(--accent)" : "var(--muted)"}>
        {kind}
      </text>
      {middle && (
        <text x={kind.length > 8 ? 172 : 156} y={y + 21} fontFamily={mono} fontSize="13" fill="var(--muted)">
          {middle}
        </text>
      )}
      {id && (
        <text x="372" y={y + 21} textAnchor="end" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
          {id}
        </text>
      )}
    </g>
  );
}

export function ToolResultPairing() {
  return (
    <svg
      viewBox="0 0 448 400"
      role="img"
      aria-labelledby="tool-result-pairing-title tool-result-pairing-desc"
      className="w-full max-w-[448px]"
      style={{ maxWidth: 448 }}
    >
      <title id="tool-result-pairing-title">Pairing tool_use and tool_result blocks</title>
      <desc id="tool-result-pairing-desc">
        The assistant turn holds a text block and two tool_use blocks with ids
        toolu_01A and toolu_01B. The next user message holds two tool_result
        blocks, one per tool_use, each carrying the matching tool_use_id.
        Both results travel together in that one user message.
      </desc>
      <defs>
        <marker
          id="tool-result-pairing-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* user message */}
      <text x="48" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        USER
      </text>
      <rect x="48" y="36" width="352" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="76" y="65" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        “Where are orders 4417 and 5120?”
      </text>

      {/* assistant turn */}
      <text x="48" y="112" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        ASSISTANT
      </text>
      <text x="400" y="112" textAnchor="end" fontFamily={mono} fontSize="12" fill="var(--muted)">
        full response.content
      </text>
      <rect x="48" y="120" width="352" height="128" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <Row y={128} kind="text" middle="“Let me check both.”" />
      <Row y={168} kind="tool_use" middle="lookup_order" id="toolu_01A" strong />
      <Row y={208} kind="tool_use" middle="lookup_order" id="toolu_01B" strong />

      {/* one user message with all results */}
      <text x="48" y="280" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        USER · ONE MESSAGE
      </text>
      <rect x="48" y="288" width="352" height="88" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <Row y={296} kind="tool_result" id="toolu_01A" strong />
      <Row y={336} kind="tool_result" id="toolu_01B" strong />

      {/* id matching: A on the left, B on the right, so the links never cross */}
      <path
        d="M64 184 H28 V312 H62"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.75"
        markerEnd="url(#tool-result-pairing-arrow)"
      />
      <path
        d="M384 224 H424 V352 H386"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.75"
        strokeDasharray="6 4"
        markerEnd="url(#tool-result-pairing-arrow)"
      />
    </svg>
  );
}

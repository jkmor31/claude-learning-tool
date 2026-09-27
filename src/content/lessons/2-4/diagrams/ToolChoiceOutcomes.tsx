const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const columns = [
  { x: 160, label: "Text reply" },
  { x: 264, label: "Tool X" },
  { x: 368, label: "Other tool" },
];

const rows = [
  { y: 48, name: "auto", note: "default", allowed: [true, true, true] },
  { y: 104, name: "any", note: "must call a tool", allowed: [false, true, true] },
  { y: 160, name: "tool: X", note: "forced", allowed: [false, true, false] },
  { y: 216, name: "none", note: "no tool calls", allowed: [true, false, false] },
];

function Cell({ x, y, allowed }: { x: number; y: number; allowed: boolean }) {
  const cx = x + 48;
  const cy = y + 24;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="96"
        height="48"
        rx="6"
        fill={allowed ? "var(--accent-soft)" : "none"}
        stroke={allowed ? "var(--accent)" : "var(--border)"}
        strokeWidth="1.25"
        strokeDasharray={allowed ? undefined : "5 4"}
      />
      {allowed ? (
        <path
          d={`M${cx - 9} ${cy} L${cx - 3} ${cy + 6} L${cx + 9} ${cy - 7}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d={`M${cx - 5} ${cy - 5} L${cx + 5} ${cy + 5} M${cx + 5} ${cy - 5} L${cx - 5} ${cy + 5}`}
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </g>
  );
}

export function ToolChoiceOutcomes() {
  return (
    <svg
      viewBox="0 0 480 280"
      role="img"
      aria-labelledby="tool-choice-outcomes-title tool-choice-outcomes-desc"
      className="w-full max-w-[480px]"
    >
      <title id="tool-choice-outcomes-title">What each tool_choice setting allows</title>
      <desc id="tool-choice-outcomes-desc">
        A grid of tool_choice settings against possible responses. auto allows
        a text reply, tool X, or any other tool. any allows tool X or any other
        tool, but no text reply. Forced tool X allows only a call to tool X.
        none allows only a text reply.
      </desc>

      {columns.map((c) => (
        <text key={c.label} x={c.x + 48} y="32" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--muted)">
          {c.label}
        </text>
      ))}

      {rows.map((r) => (
        <g key={r.name}>
          <text x="16" y={r.y + 21} fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
            {r.name}
          </text>
          <text x="16" y={r.y + 39} fontFamily={sans} fontSize="12" fill="var(--muted)">
            {r.note}
          </text>
          {columns.map((c, i) => (
            <Cell key={c.label} x={c.x} y={r.y} allowed={r.allowed[i]} />
          ))}
        </g>
      ))}
    </svg>
  );
}

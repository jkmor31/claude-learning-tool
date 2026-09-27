const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const tools = ["Read", "WebSearch", "Edit", "Bash"];
const rowYs = [64, 104, 144, 184];

type State = "listed" | "absent" | "inherited";

function Chip({ x, y, name, state, risky }: { x: number; y: number; name: string; state: State; risky?: boolean }) {
  const absent = state === "absent";
  const inherited = state === "inherited" && risky;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="184"
        height="32"
        rx="6"
        fill={absent ? "none" : inherited ? "var(--danger-soft)" : "var(--accent-soft)"}
        stroke={absent ? "var(--border)" : inherited ? "var(--danger)" : "var(--accent)"}
        strokeWidth="1.25"
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
      <text x={x + 172} y={y + 21} textAnchor="end" fontFamily={sans} fontSize="12" fill={inherited ? "var(--danger)" : "var(--muted)"}>
        {absent ? "doesn’t exist" : state === "inherited" ? "inherited" : "listed"}
      </text>
    </g>
  );
}

export function ToolsScope() {
  return (
    <svg
      viewBox="0 0 480 264"
      role="img"
      aria-labelledby="tools-scope-title tools-scope-desc"
      className="w-full max-w-[480px]"
    >
      <title id="tools-scope-title">A tools list vs no tools field</title>
      <desc id="tools-scope-desc">
        Two synthesizer subagents. The one defined with tools set to Read has
        only Read; WebSearch, Edit, and Bash don’t exist in its session. The
        one defined without a tools field inherits every tool available to
        subagents, including WebSearch, Edit, and Bash.
      </desc>

      {/* panels */}
      <rect x="16" y="16" width="216" height="232" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="44" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        {'tools=["Read"]'}
      </text>
      <rect x="248" y="16" width="216" height="232" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="44" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        No tools field
      </text>

      {tools.map((name, i) => (
        <g key={name}>
          <Chip x={32} y={rowYs[i]} name={name} state={i === 0 ? "listed" : "absent"} />
          <Chip x={264} y={rowYs[i]} name={name} state="inherited" risky={i > 0} />
        </g>
      ))}

      <text x="124" y="236" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        least privilege
      </text>
      <text x="356" y="236" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        every tool, by default
      </text>
    </svg>
  );
}

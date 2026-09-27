const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function AgenticLoop() {
  return (
    <svg
      viewBox="0 0 480 384"
      role="img"
      aria-labelledby="agentic-loop-title agentic-loop-desc"
      className="w-full max-w-[480px]"
      style={{ maxWidth: 480 }}
    >
      <title id="agentic-loop-title">The agentic loop</title>
      <desc id="agentic-loop-desc">
        Send messages and tool definitions to Claude, then check stop_reason.
        On tool_use, run each requested tool, append the assistant turn and the
        tool results to the messages, and send again. On end_turn, return the
        answer. Any other stop_reason is handled explicitly, not treated as success.
      </desc>
      <defs>
        <marker
          id="agentic-loop-arrow"
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

      {/* 1. Send */}
      <rect x="56" y="16" width="176" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="40" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Send messages
      </text>
      <text x="144" y="60" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        + tool definitions
      </text>
      <line x1="144" y1="72" x2="144" y2="102" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#agentic-loop-arrow)" />

      {/* 2. Decision */}
      <path d="M144 104 L224 144 L144 184 L64 144 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="149" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        stop_reason
      </text>

      {/* tool_use branch (main path) */}
      <line x1="144" y1="184" x2="144" y2="230" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#agentic-loop-arrow)" />
      <text x="154" y="212" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--accent)">
        tool_use
      </text>

      <rect x="56" y="232" width="176" height="48" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="261" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Run each tool
      </text>
      <line x1="144" y1="280" x2="144" y2="310" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#agentic-loop-arrow)" />

      <rect x="56" y="312" width="176" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="336" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Append assistant turn
      </text>
      <text x="144" y="356" textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--muted)">
        + tool_results
      </text>

      {/* loop back to send */}
      <path d="M56 340 H32 V44 H54" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#agentic-loop-arrow)" />
      <text
        x="46"
        y="200"
        textAnchor="middle"
        fontFamily={sans}
        fontSize="13"
        fill="var(--muted)"
        transform="rotate(-90 46 200)"
      >
        next iteration
      </text>

      {/* exits to the right */}
      <path d="M224 144 H248 V256 H318" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#agentic-loop-arrow)" />
      <line x1="248" y1="144" x2="318" y2="144" stroke="var(--success)" strokeWidth="2" markerEnd="url(#agentic-loop-arrow)" />
      <text x="284" y="136" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--success)">
        end_turn
      </text>
      <text x="284" y="248" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        other
      </text>

      <rect x="320" y="112" width="144" height="64" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="392" y="140" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Return answer
      </text>
      <text x="392" y="160" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        loop ends
      </text>

      <rect
        x="320"
        y="224"
        width="144"
        height="64"
        rx="8"
        fill="var(--danger-soft)"
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="392" y="252" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Handle explicitly
      </text>
      <text x="392" y="272" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        max_tokens, …
      </text>
    </svg>
  );
}

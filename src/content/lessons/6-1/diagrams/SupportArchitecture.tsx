const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const tools = [
  { name: "get_customer", x: 32, y: 448 },
  { name: "lookup_order", x: 264, y: 448 },
  { name: "process_refund", x: 32, y: 474 },
  { name: "escalate_to_human", x: 264, y: 474 },
];

type Row = { label: string; lesson: string };

function Rows({ rows, x, right, y }: { rows: Row[]; x: number; right: number; y: number }) {
  return (
    <>
      {rows.map((r, i) => (
        <g key={r.label}>
          <text x={x} y={y + i * 24} fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {r.label}
          </text>
          <text x={right} y={y + i * 24} textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {r.lesson}
          </text>
        </g>
      ))}
    </>
  );
}

export function SupportArchitecture() {
  return (
    <svg
      viewBox="0 0 480 528"
      role="img"
      aria-labelledby="support-architecture-title support-architecture-desc"
      className="w-full max-w-[480px]"
    >
      <title id="support-architecture-title">Support resolution agent reference architecture</title>
      <desc id="support-architecture-desc">
        A customer message enters the Agent SDK loop, whose system prompt holds
        escalation criteria with few-shot examples and a case facts block. Tool
        calls pass down through PreToolUse hooks (identity gate, refund limit)
        to a custom MCP server with get_customer, lookup_order, process_refund
        and escalate_to_human. Tool results pass back up through PostToolUse
        hooks that trim fields and normalize formats before reaching the loop.
        Each part is labeled with the lesson that covers it.
      </desc>
      <defs>
        <marker
          id="support-architecture-arrow"
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

      {/* customer message */}
      <rect x="160" y="16" width="160" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="41" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Customer message
      </text>
      <line x1="240" y1="56" x2="240" y2="86" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#support-architecture-arrow)" />

      {/* agent loop */}
      <rect x="16" y="88" width="448" height="104" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <text x="32" y="115" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Agent loop (Agent SDK)
      </text>
      <text x="448" y="115" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        1.1
      </text>
      <Rows
        x={32}
        right={448}
        y={146}
        rows={[
          { label: "escalation criteria + few-shot", lesson: "5.3, 4.2" },
          { label: "case facts block (outside summaries)", lesson: "5.1" },
        ]}
      />

      {/* tool calls down, results up */}
      <line x1="124" y1="192" x2="124" y2="254" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#support-architecture-arrow)" />
      <text x="134" y="228" fontFamily={sans} fontSize="12" fill="var(--muted)">
        tool calls
      </text>
      <line x1="356" y1="254" x2="356" y2="194" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#support-architecture-arrow)" />
      <text x="366" y="228" fontFamily={sans} fontSize="12" fill="var(--muted)">
        tool results
      </text>

      {/* PreToolUse hooks */}
      <rect x="16" y="256" width="216" height="96" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="32" y="282" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        PreToolUse
      </text>
      <Rows
        x={32}
        right={216}
        y={310}
        rows={[
          { label: "identity gate", lesson: "1.6" },
          { label: "refund limit", lesson: "1.7" },
        ]}
      />

      {/* PostToolUse hooks */}
      <rect x="248" y="256" width="216" height="96" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="264" y="282" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        PostToolUse
      </text>
      <Rows
        x={264}
        right={448}
        y={310}
        rows={[
          { label: "trim to key fields", lesson: "5.2" },
          { label: "normalize formats", lesson: "1.7" },
        ]}
      />

      <line x1="124" y1="352" x2="124" y2="390" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#support-architecture-arrow)" />
      <line x1="356" y1="390" x2="356" y2="354" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#support-architecture-arrow)" />

      {/* MCP server */}
      <rect x="16" y="392" width="448" height="120" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="32" y="418" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        MCP server (custom)
      </text>
      <text x="448" y="418" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        2.1–2.5
      </text>
      {tools.map((t) => (
        <text key={t.name} x={t.x} y={t.y} fontFamily={mono} fontSize="13" fill="var(--foreground)">
          {t.name}
        </text>
      ))}
      <text x="240" y="500" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        detailed descriptions · structured errors · env-var creds
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";

type Item = { label: string; kind?: "bridge" | "missing" };

const coordinatorItems: Item[] = [
  { label: "User's message" },
  { label: "Earlier turns" },
  { label: "Other results" },
  { label: "Delegation prompt", kind: "bridge" },
];
const subagentItems: Item[] = [
  { label: "Own system prompt" },
  { label: "Own tools" },
  { label: "No coordinator history", kind: "missing" },
  { label: "Delegation prompt", kind: "bridge" },
];
const rowYs = [72, 120, 168, 216];

function Rows({ items, x }: { items: Item[]; x: number }) {
  return (
    <>
      {items.map((item, i) => {
        const bridge = item.kind === "bridge";
        const missing = item.kind === "missing";
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={rowYs[i]}
              width="176"
              height="36"
              rx="6"
              fill={bridge ? "var(--accent-soft)" : missing ? "none" : "var(--surface)"}
              stroke={bridge ? "var(--accent)" : missing ? "var(--danger)" : "var(--border)"}
              strokeWidth="1.25"
              strokeDasharray={missing ? "5 4" : undefined}
            />
            <text
              x={x + 88}
              y={rowYs[i] + 23}
              textAnchor="middle"
              fontFamily={sans}
              fontSize={missing ? 13 : 14}
              fontWeight={bridge ? 600 : 400}
              fill={missing ? "var(--danger)" : "var(--foreground)"}
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </>
  );
}

export function ContextIsolation() {
  return (
    <svg
      viewBox="0 0 480 272"
      role="img"
      aria-labelledby="context-isolation-title context-isolation-desc"
      className="w-full max-w-[480px]"
      style={{ maxWidth: 480 }}
    >
      <title id="context-isolation-title">What a subagent’s context contains</title>
      <desc id="context-isolation-desc">
        The coordinator’s context holds the user’s message, earlier turns,
        other subagents’ results, and the delegation prompt it writes. The
        subagent’s context holds only its own system prompt, its own tools, and
        that delegation prompt. The coordinator’s history is not inherited.
      </desc>
      <defs>
        <marker
          id="context-isolation-arrow"
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

      {/* panels */}
      <rect x="16" y="16" width="208" height="248" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="120" y="48" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Coordinator
      </text>
      <rect x="256" y="16" width="208" height="248" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="360" y="48" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Subagent
      </text>

      <Rows items={coordinatorItems} x={32} />
      <Rows items={subagentItems} x={272} />

      {/* history does not cross */}
      <line x1="224" y1="138" x2="256" y2="138" stroke="var(--danger)" strokeWidth="1.75" strokeDasharray="4 3" />
      <circle cx="240" cy="138" r="9" fill="var(--surface)" stroke="var(--danger)" strokeWidth="1.75" />
      <path d="M236 134 L244 142 M244 134 L236 142" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />

      {/* the delegation prompt is the only bridge */}
      <line x1="208" y1="234" x2="270" y2="234" stroke="var(--accent)" strokeWidth="2.5" markerEnd="url(#context-isolation-arrow)" />
    </svg>
  );
}

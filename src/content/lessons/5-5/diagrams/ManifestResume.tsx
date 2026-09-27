const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const agents = [
  { name: "mapper", done: true },
  { name: "refund-tracer", done: true },
  { name: "subscription-tracer", done: false },
  { name: "test-inventory", done: false },
];

const files = [
  { x: 32, w: 144, label: "manifest.json" },
  { x: 192, w: 160, label: "state/mapper.json" },
  { x: 368, w: 160, label: "state/refunds.json" },
];

export function ManifestResume() {
  return (
    <svg
      viewBox="0 0 560 424"
      role="img"
      aria-labelledby="manifest-resume-title manifest-resume-desc"
      className="w-full max-w-[560px]"
    >
      <title id="manifest-resume-title">Resuming a multi-agent exploration from a manifest</title>
      <desc id="manifest-resume-desc">
        On disk, surviving the crash, are manifest.json and the saved outputs
        state/mapper.json and state/refunds.json. On restart the coordinator
        loads the manifest. The completed agents, mapper and refund-tracer,
        are skipped. The pending agents, subscription-tracer and
        test-inventory, are run with the saved state injected into their
        prompts.
      </desc>
      <defs>
        <marker
          id="manifest-resume-arrow"
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

      {/* what survives on disk */}
      <rect x="16" y="16" width="528" height="88" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="32" y="36" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        On disk: survives the crash
      </text>
      {files.map((f) => (
        <g key={f.label}>
          <rect
            x={f.x}
            y="48"
            width={f.w}
            height="40"
            rx="6"
            fill={f.label === "manifest.json" ? "var(--accent-soft)" : "var(--background)"}
            stroke={f.label === "manifest.json" ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.25"
          />
          <text x={f.x + f.w / 2} y="72" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {f.label}
          </text>
        </g>
      ))}

      {/* coordinator loads the manifest */}
      <path d="M104 88 V160 H174" fill="none" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#manifest-resume-arrow)" />
      <text x="112" y="132" fontFamily={sans} fontSize="12" fill="var(--muted)">
        loads
      </text>
      <rect x="176" y="136" width="208" height="48" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="280" y="165" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Coordinator resumes
      </text>
      <line x1="280" y1="184" x2="280" y2="206" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#manifest-resume-arrow)" />

      <text x="136" y="228" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        Agent
      </text>
      <text x="408" y="228" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        On resume
      </text>

      {agents.map((a, i) => {
        const y = 240 + i * 44;
        return (
          <g key={a.name}>
            <rect x="32" y={y} width="208" height="36" rx="6" fill="var(--background)" stroke="var(--border)" strokeWidth="1.25" />
            <text x="136" y={y + 23} textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
              {a.name}
            </text>
            <line x1="240" y1={y + 18} x2="286" y2={y + 18} stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#manifest-resume-arrow)" />
            <rect
              x="288"
              y={y}
              width="240"
              height="36"
              rx="6"
              fill={a.done ? "var(--surface)" : "var(--accent-soft)"}
              stroke={a.done ? "var(--border)" : "var(--accent)"}
              strokeWidth="1.25"
              strokeDasharray={a.done ? "5 4" : undefined}
            />
            <text
              x="408"
              y={y + 23}
              textAnchor="middle"
              fontFamily={sans}
              fontSize="13"
              fontWeight={a.done ? "400" : "600"}
              fill={a.done ? "var(--muted)" : "var(--foreground)"}
            >
              {a.done ? "completed: skip" : "pending: run with state"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

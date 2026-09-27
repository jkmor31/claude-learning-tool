const sans = "var(--font-geist-sans), sans-serif";

const readBars = [88, 104, 120, 136, 152, 168];

const phase2 = [
  { y: 48, task: "trace A" },
  { y: 112, task: "trace B" },
  { y: 176, task: "trace C" },
];

export function PhaseSummaryHandoff() {
  return (
    <svg
      viewBox="0 0 576 296"
      role="img"
      aria-labelledby="phase-summary-title phase-summary-desc"
      className="w-full max-w-[576px]"
    >
      <title id="phase-summary-title">Summarize one phase and inject it into the next</title>
      <desc id="phase-summary-desc">
        Phase 1 mapping subagents do many raw file reads. Their key findings
        are condensed into a Phase 1 summary of modules, entry points and
        owners. That summary is injected into the prompt of each Phase 2
        subagent, alongside its own tracing task. The raw file reads are not
        carried forward into Phase 2.
      </desc>
      <defs>
        <marker
          id="phase-summary-arrow"
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

      <text x="96" y="32" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Phase 1: mapping
      </text>
      <text x="480" y="32" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Phase 2: tracing
      </text>

      {/* phase 1: verbose exploration */}
      <rect x="16" y="48" width="160" height="176" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="96" y="72" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Mapping subagents
      </text>
      {readBars.map((y, i) => (
        <rect key={y} x="32" y={y} width={i % 2 === 0 ? 128 : 104} height="10" rx="3" fill="var(--surface)" stroke="var(--border)" strokeWidth="1" />
      ))}
      <text x="96" y="204" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        raw file reads
      </text>

      <line x1="176" y1="136" x2="214" y2="136" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#phase-summary-arrow)" />

      {/* the compact summary */}
      <rect x="216" y="80" width="144" height="112" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="104" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Phase 1 summary
      </text>
      {["modules", "entry points", "owners"].map((t, i) => (
        <text key={t} x="288" y={132 + i * 20} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--foreground)">
          {t}
        </text>
      ))}

      {/* injected into every phase 2 prompt */}
      {phase2.map((p) => (
        <g key={p.task}>
          <line x1="360" y1="136" x2="398" y2={p.y + 24} stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#phase-summary-arrow)" />
          <rect x="400" y={p.y} width="160" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <rect x="412" y={p.y + 12} width="80" height="24" rx="5" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1" />
          <text x="452" y={p.y + 28} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--foreground)">
            summary
          </text>
          <text x="502" y={p.y + 29} fontFamily={sans} fontSize="12" fill="var(--foreground)">
            {p.task}
          </text>
        </g>
      ))}

      {/* raw reads stop here */}
      <path d="M96 224 V256 H464" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1="472" y1="244" x2="472" y2="268" stroke="var(--danger)" strokeWidth="2.5" />
      <text x="288" y="280" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        raw reads are not carried forward
      </text>
    </svg>
  );
}

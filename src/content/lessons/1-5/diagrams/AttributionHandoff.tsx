const sans = "var(--font-geist-sans), sans-serif";

const stages = ["Search", "Coordinator", "Synthesizer", "Report"];
const colXs = [16, 128, 240, 352];
const fields = ["claim", "source", "date"];
// How many fields survive at each stage when findings are passed as prose.
const proseKept = [3, 2, 1, 1];

function Cell({ x, y, kept }: { x: number; y: number; kept: number }) {
  return (
    <g>
      <rect x={x} y={y} width="96" height="108" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      {fields.map((field, i) => {
        const lost = i >= kept;
        const cy = y + 12 + i * 32;
        return (
          <g key={field}>
            <rect
              x={x + 8}
              y={cy}
              width="80"
              height="24"
              rx="5"
              fill={lost ? "none" : "var(--accent-soft)"}
              stroke={lost ? "var(--danger)" : "var(--accent)"}
              strokeWidth="1.25"
              strokeDasharray={lost ? "4 3" : undefined}
            />
            <text
              x={x + 48}
              y={cy + 16}
              textAnchor="middle"
              fontFamily={sans}
              fontSize="12"
              fontWeight={lost ? 400 : 600}
              fill={lost ? "var(--danger)" : "var(--foreground)"}
            >
              {lost ? `no ${field}` : field}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Arrows({ y }: { y: number }) {
  return (
    <>
      {colXs.slice(0, 3).map((x) => (
        <line
          key={x}
          x1={x + 96}
          y1={y}
          x2={x + 110}
          y2={y}
          stroke="var(--muted)"
          strokeWidth="1.5"
          markerEnd="url(#attribution-handoff-arrow)"
        />
      ))}
    </>
  );
}

export function AttributionHandoff() {
  return (
    <svg
      viewBox="0 0 464 336"
      role="img"
      aria-labelledby="attribution-handoff-title attribution-handoff-desc"
      className="w-full max-w-[464px]"
    >
      <title id="attribution-handoff-title">Attribution across handoffs</title>
      <desc id="attribution-handoff-desc">
        A finding travels from the search subagent through the coordinator and
        the synthesizer to the report. Passed as prose, it loses its date at
        the coordinator and its source at the synthesizer, so the report has a
        bare claim. Passed as a structured record, the claim, source, and date
        all reach the report.
      </desc>
      <defs>
        <marker
          id="attribution-handoff-arrow"
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

      {stages.map((stage, i) => (
        <text
          key={stage}
          x={colXs[i] + 48}
          y="28"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="13"
          fontWeight="700"
          fill="var(--foreground)"
        >
          {stage}
        </text>
      ))}

      {/* prose handoff */}
      <text x="16" y="56" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--danger)">
        PROSE HANDOFF
      </text>
      {colXs.map((x, i) => (
        <Cell key={`prose-${x}`} x={x} y={64} kept={proseKept[i]} />
      ))}
      <Arrows y={118} />

      {/* structured record */}
      <text x="16" y="204" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--success)">
        STRUCTURED RECORD
      </text>
      {colXs.map((x) => (
        <Cell key={`record-${x}`} x={x} y={212} kept={3} />
      ))}
      <Arrows y={266} />
    </svg>
  );
}

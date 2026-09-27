const sans = "var(--font-geist-sans), sans-serif";

// One minute of subagent work = 96 units. Sequential bars leave a 16-unit gap for the coordinator turn.
const seqXs = [16, 128, 240, 352];
const parYs = [176, 212, 248, 284];

export function ParallelTimeline() {
  return (
    <svg
      viewBox="0 0 480 352"
      role="img"
      aria-labelledby="parallel-timeline-title parallel-timeline-desc"
      className="w-full max-w-[480px]"
    >
      <title id="parallel-timeline-title">Sequential vs parallel subagent spawning</title>
      <desc id="parallel-timeline-desc">
        Illustrative timeline of four independent subtasks of about 60 seconds
        each. With one Task call per coordinator turn, the four run back to
        back with a coordinator turn between each, taking about 4 minutes.
        With four Task calls in one response, all four run at once and finish
        in about 1 minute, the time of the slowest.
      </desc>

      {/* sequential */}
      <text x="16" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        ONE TASK CALL PER TURN
      </text>
      {seqXs.map((x, i) => (
        <g key={`seq-${x}`}>
          <rect x={x} y="40" width="96" height="32" rx="6" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
          <text x={x + 48} y="61" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {`Task ${i + 1}`}
          </text>
          {i < 3 && <circle cx={x + 104} cy="56" r="4" fill="var(--muted)" />}
        </g>
      ))}
      <line x1="120" y1="64" x2="120" y2="76" stroke="var(--muted)" strokeWidth="1" />
      <text x="120" y="90"textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        coordinator turn
      </text>
      <path d="M16 100 V110 H448 V100" fill="none" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="232" y="130" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        ≈ 4 min: the sum
      </text>

      {/* parallel */}
      <text x="16" y="164" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        FOUR TASK CALLS IN ONE RESPONSE
      </text>
      <text x="448" y="164" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        60 s each, illustrative
      </text>
      {parYs.map((y, i) => (
        <g key={`par-${y}`}>
          <rect x="16" y={y} width="96" height="28" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="64" y={y + 19} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
            {`Task ${i + 1}`}
          </text>
        </g>
      ))}
      <path d="M16 320 V330 H112 V320" fill="none" stroke="var(--success)" strokeWidth="1.5" />
      <text x="128" y="334" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        ≈ 1 min: the slowest
      </text>
    </svg>
  );
}

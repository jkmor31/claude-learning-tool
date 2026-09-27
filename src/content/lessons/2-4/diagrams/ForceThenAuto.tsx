const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Tone = "forced" | "plain" | "done" | "stuck";

type Turn = { label: string; call: string; tone: Tone };

const boxYs = [64, 136, 208, 280];

const good: Turn[] = [
  { label: "Turn 1: forced", call: "extract_metadata", tone: "forced" },
  { label: "Turn 2: auto", call: "lookup_company", tone: "plain" },
  { label: "Turn 3: auto", call: "classify_sector", tone: "plain" },
  { label: "Turn 4: auto", call: "end_turn", tone: "done" },
];

const bad: Turn[] = [
  { label: "Turn 1: forced", call: "extract_metadata", tone: "forced" },
  { label: "Turn 2: forced", call: "extract_metadata", tone: "plain" },
  { label: "Turn 3: forced", call: "extract_metadata", tone: "plain" },
  { label: "Turn N: forced", call: "no end_turn", tone: "stuck" },
];

const toneStyles: Record<Tone, { fill: string; stroke: string; dash?: string }> = {
  forced: { fill: "var(--accent-soft)", stroke: "var(--accent)" },
  plain: { fill: "var(--background)", stroke: "var(--border)" },
  done: { fill: "var(--success-soft)", stroke: "var(--success)" },
  stuck: { fill: "var(--danger-soft)", stroke: "var(--danger)", dash: "5 4" },
};

function Column({ x, turns }: { x: number; turns: Turn[] }) {
  const cx = x + 92;
  return (
    <g>
      {turns.map((t, i) => {
        const s = toneStyles[t.tone];
        const y = boxYs[i];
        return (
          <g key={i}>
            {i > 0 && (
              <line
                x1={cx}
                y1={y - 24}
                x2={cx}
                y2={y - 2}
                stroke="var(--muted)"
                strokeWidth="1.5"
                markerEnd="url(#force-then-auto-arrow)"
              />
            )}
            <rect x={x} y={y} width="184" height="48" rx="8" fill={s.fill} stroke={s.stroke} strokeWidth="1.5" strokeDasharray={s.dash} />
            <text x={cx} y={y + 20} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {t.label}
            </text>
            <text x={cx} y={y + 38} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
              {t.call}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function ForceThenAuto() {
  return (
    <svg
      viewBox="0 0 480 384"
      role="img"
      aria-labelledby="force-then-auto-title force-then-auto-desc"
      className="w-full max-w-[480px]"
    >
      <title id="force-then-auto-title">Forcing the first step vs forcing every turn</title>
      <desc id="force-then-auto-desc">
        Left: turn 1 forces extract_metadata, then turns 2 to 4 use auto, so
        the model calls lookup_company and classify_sector and finally ends
        with end_turn. Right: every turn is forced, so the model calls
        extract_metadata again and again, never reaches end_turn, and the loop
        only stops at the iteration backstop.
      </desc>
      <defs>
        <marker
          id="force-then-auto-arrow"
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

      <rect x="16" y="16" width="216" height="352" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Force first, then auto
      </text>
      <Column x={32} turns={good} />
      <text x="124" y="352" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        loop ends normally
      </text>

      <rect x="248" y="16" width="216" height="352" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Forced every turn
      </text>
      <Column x={264} turns={bad} />
      <text x="356" y="352" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        stops at backstop
      </text>
    </svg>
  );
}

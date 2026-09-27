const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  heading: string;
  responseLine1: string;
  responseLine2: string;
  step: string;
  outcomeTitle: string;
  outcomeSub: string;
  ok: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "Prompt-requested JSON",
    responseLine1: 'Sure! { "vendor":',
    responseLine2: '"Acme", ...',
    step: "json.loads(text)",
    outcomeTitle: "ValueError",
    outcomeSub: "breaks the pipeline",
    ok: false,
  },
  {
    x: 312,
    heading: "Tool use + input_schema",
    responseLine1: "tool_use block",
    responseLine2: 'name: "extract_invoice"',
    step: "block.input",
    outcomeTitle: "Already a dict",
    outcomeSub: "no parse step",
    ok: true,
  },
];

export function ParseFailureVsToolUse() {
  return (
    <svg
      viewBox="0 0 600 328"
      role="img"
      aria-labelledby="parse-failure-vs-tool-use-title parse-failure-vs-tool-use-desc"
      className="w-full max-w-[600px]"
    >
      <title id="parse-failure-vs-tool-use-title">
        Prompted JSON needs parsing; tool use returns already-parsed input
      </title>
      <desc id="parse-failure-vs-tool-use-desc">
        Asking for JSON in the prompt produces response text that must be
        parsed, for example with json.loads, which can throw a parse error
        on malformed output such as a trailing comma or a stray sentence.
        Defining an extraction tool and reading the tool_use block&apos;s
        input skips that parse step entirely, because the arguments arrive
        already parsed as a dictionary. Neither approach checks whether the
        values themselves are correct.
      </desc>
      <defs>
        <marker
          id="parse-failure-vs-tool-use-arrow"
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

      {panels.map((p) => {
        const cx = p.x + 136;
        const bx = p.x + 16;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="16" width="272" height="240" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            <rect x={bx} y="56" width="240" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x={cx} y="78" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
              {p.responseLine1}
            </text>
            <text x={cx} y="98" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
              {p.responseLine2}
            </text>

            <line x1={cx} y1="112" x2={cx} y2="132" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#parse-failure-vs-tool-use-arrow)" />

            <rect x={bx} y="132" width="240" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" strokeDasharray="5 4" />
            <text x={cx} y="157" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="700" fill="var(--foreground)">
              {p.step}
            </text>

            <line x1={cx} y1="172" x2={cx} y2="192" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#parse-failure-vs-tool-use-arrow)" />

            <rect
              x={bx}
              y="192"
              width="240"
              height="56"
              rx="8"
              fill={p.ok ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.ok ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="214" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.outcomeTitle}
            </text>
            <text x={cx} y="234" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.outcomeSub}
            </text>
          </g>
        );
      })}

      <rect x="16" y="272" width="568" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="300" y="297" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Eliminates syntax errors — semantic errors still need validation
      </text>
    </svg>
  );
}

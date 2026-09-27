const sans = "var(--font-geist-sans), sans-serif";

type Branch = {
  cx: number;
  x: number;
  condition: string;
  action: string;
  outcomeTitle: string;
  outcomeSub: string;
};

const branches: Branch[] = [
  {
    cx: 140,
    x: 16,
    condition: "Present, wrong format",
    action: "Add few-shot examples",
    outcomeTitle: "Extracted correctly",
    outcomeSub: "not a schema problem",
  },
  {
    cx: 420,
    x: 296,
    condition: "Genuinely absent",
    action: "Make field nullable",
    outcomeTitle: "Returns null",
    outcomeSub: "not a few-shot problem",
  },
];

export function AbsentVsHardToFind() {
  return (
    <svg
      viewBox="0 0 560 312"
      role="img"
      aria-labelledby="absent-vs-hard-to-find-title absent-vs-hard-to-find-desc"
      className="w-full max-w-[560px]"
    >
      <title id="absent-vs-hard-to-find-title">Whether the value is present but hard to find changes the fix</title>
      <desc id="absent-vs-hard-to-find-desc">
        A required field comes back null. If the information is present in
        an unexpected format, few-shot examples of that format extract it
        correctly, which is not a schema problem. If the information is
        genuinely absent from the document, making the field nullable lets
        it correctly return null, which is not a few-shot problem.
      </desc>
      <defs>
        <marker
          id="absent-vs-hard-to-find-arrow"
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

      <rect x="80" y="16" width="400" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="280" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Required field returns null
      </text>

      {branches.map((b) => (
        <line
          key={`split-${b.cx}`}
          x1="280"
          y1="64"
          x2={b.cx}
          y2="96"
          stroke="var(--muted)"
          strokeWidth="1.5"
          markerEnd="url(#absent-vs-hard-to-find-arrow)"
        />
      ))}

      {branches.map((b) => (
        <g key={b.condition}>
          <rect x={b.x} y="96" width="248" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
          <text x={b.cx} y="124" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.condition}
          </text>

          <line x1={b.cx} y1="144" x2={b.cx} y2="168" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#absent-vs-hard-to-find-arrow)" />

          <rect x={b.x} y="168" width="248" height="48" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={b.cx} y="196" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.action}
          </text>

          <line x1={b.cx} y1="216" x2={b.cx} y2="240" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#absent-vs-hard-to-find-arrow)" />

          <rect x={b.x} y="240" width="248" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
          <text x={b.cx} y="264" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
            {b.outcomeTitle}
          </text>
          <text x={b.cx} y="282" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
            {b.outcomeSub}
          </text>
        </g>
      ))}
    </svg>
  );
}

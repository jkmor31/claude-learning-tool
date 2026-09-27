const sans = "var(--font-geist-sans), sans-serif";

const issues = [
  { text: "Issue 1 — order 88213 — late delivery — tracking sent", y: 204 },
  { text: "Issue 2 — order 90117 — charged twice $59.00×2 — refund approved R-5520", y: 248 },
  { text: "Issue 3 — address change — waiting on customer confirmation", y: 292 },
];

export function MixedNarrativeVsIssueLayer() {
  return (
    <svg
      viewBox="0 0 640 344"
      role="img"
      aria-labelledby="mixed-narrative-title mixed-narrative-desc"
      className="w-full max-w-[640px]"
    >
      <title id="mixed-narrative-title">One mixed narrative lets amounts bleed between issues; a separate layer per issue does not</title>
      <desc id="mixed-narrative-desc">
        A single narrative mentions a late delivery on order 88213, a
        double charge of $59.00 times two on order 90117, and an address
        change, with an arrow showing the double-charge amount being
        misapplied to the late-delivery order. Below, the same three
        issues are extracted into a separate structured layer, one box per
        issue with its own order id, amount, and status, so nothing
        crosses between them.
      </desc>
      <defs>
        <marker id="mixed-narrative-arrow-danger" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--danger)" />
        </marker>
        <marker id="mixed-narrative-arrow-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
      </defs>

      <text x="16" y="28" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        One mixed narrative
      </text>

      <rect x="16" y="44" width="608" height="100" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="32" y="68" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        Order 88213: late delivery, tracking sent
      </text>
      <text x="32" y="92" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        Order 90117: charged twice, $59.00 × 2
      </text>
      <text x="32" y="116" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        Address change requested for future orders
      </text>

      <path
        d="M300 88 Q356 50 70 48"
        fill="none"
        stroke="var(--danger)"
        strokeWidth="1.5"
        markerEnd="url(#mixed-narrative-arrow-danger)"
      />
      <text x="356" y="46" textAnchor="middle" fontFamily={sans} fontSize="10" fill="var(--danger)">
        misapplied
      </text>

      <line x1="320" y1="144" x2="320" y2="168" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#mixed-narrative-arrow-muted)" />
      <text x="332" y="160" fontFamily={sans} fontSize="11" fill="var(--muted)">
        extract
      </text>

      <text x="16" y="188" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Separate issue layer — one entry per issue
      </text>

      {issues.map((it) => (
        <g key={it.text}>
          <rect x="16" y={it.y} width="608" height="36" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="320" y={it.y + 23} textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--foreground)">
            {it.text}
          </text>
        </g>
      ))}
    </svg>
  );
}

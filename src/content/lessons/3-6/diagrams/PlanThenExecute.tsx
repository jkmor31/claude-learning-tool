const sans = "var(--font-geist-sans), sans-serif";

export function PlanThenExecute() {
  return (
    <svg
      viewBox="0 0 640 240"
      role="img"
      aria-labelledby="plan-then-execute-title plan-then-execute-desc"
      className="w-full max-w-[640px]"
    >
      <title id="plan-then-execute-title">Plan mode for investigation, then direct execution to implement</title>
      <desc id="plan-then-execute-desc">
        A three-step flow: plan mode explores the codebase and proposes an
        approach without making any edits, then you review and adjust the
        plan, then, once approved, direct execution implements it file by
        file and runs tests.
      </desc>
      <defs>
        <marker
          id="plan-then-execute-arrow"
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

      {/* step 1: plan mode, no edits yet */}
      <rect x="16" y="56" width="184" height="128" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="108" y="88" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        1 · Plan mode
      </text>
      <text x="108" y="114" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        Explore, propose
      </text>
      <text x="108" y="134" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        an approach
      </text>
      <text x="108" y="164" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        no edits yet
      </text>

      <line x1="200" y1="120" x2="228" y2="120" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#plan-then-execute-arrow)" />

      {/* step 2: review */}
      <rect x="232" y="56" width="176" height="128" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="320" y="88" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        2 · Review
      </text>
      <text x="320" y="114" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        You adjust the
      </text>
      <text x="320" y="134" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        plan, then approve
      </text>

      <line x1="408" y1="120" x2="436" y2="120" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#plan-then-execute-arrow)" />

      {/* step 3: execute */}
      <rect x="440" y="56" width="184" height="128" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="532" y="88" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        3 · Execute
      </text>
      <text x="532" y="114" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        Implements file
      </text>
      <text x="532" y="134" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        by file, runs tests
      </text>

      <text x="320" y="216" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        the wrong approach is caught before step 3, not after
      </text>
    </svg>
  );
}

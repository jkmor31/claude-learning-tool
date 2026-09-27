const sans = "var(--font-geist-sans), sans-serif";

const files = [
  { x: 16, label: "File 1" },
  { x: 152, label: "File 2" },
  { x: 344, label: "File N" },
];

export function ReviewPasses() {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-labelledby="review-passes-title review-passes-desc"
      className="w-full max-w-[480px]"
    >
      <title id="review-passes-title">Per-file passes plus an integration pass</title>
      <desc id="review-passes-desc">
        In pass 1, each file in the pull request is reviewed on its own, in
        parallel, for local issues. Their findings and the diffs feed pass 2, a
        cross-file integration pass that looks for data flow problems, interface
        mismatches, and inconsistent patterns. The result is one consolidated
        review.
      </desc>
      <defs>
        <marker
          id="review-passes-arrow"
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

      {/* pass 1 */}
      <text x="16" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        PASS 1: PER FILE, IN PARALLEL
      </text>
      {files.map((f) => (
        <g key={f.label}>
          <rect x={f.x} y="40" width="120" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
          <text x={f.x + 60} y="64" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
            {f.label}
          </text>
          <text x={f.x + 60} y="84" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
            local issues
          </text>
        </g>
      ))}
      <text x="308" y="73" textAnchor="middle" fontFamily={sans} fontSize="16" fontWeight="600" fill="var(--muted)">
        ...
      </text>

      {/* findings converge */}
      <path d="M76 96 V120 H404 V96" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1="212" y1="96" x2="212" y2="120" stroke="var(--accent)" strokeWidth="2" />
      <line x1="240" y1="120" x2="240" y2="166" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#review-passes-arrow)" />
      <text x="250" y="148" fontFamily={sans} fontSize="12" fill="var(--muted)">
        findings + diffs
      </text>

      {/* pass 2 */}
      <text x="16" y="160" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        PASS 2: INTEGRATION
      </text>
      <rect x="112" y="168" width="256" height="96" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="194" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Cross-file pass
      </text>
      <text x="240" y="214" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        data flow
      </text>
      <text x="240" y="232" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        interface mismatches
      </text>
      <text x="240" y="250" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        inconsistent patterns
      </text>
      <line x1="240" y1="264" x2="240" y2="294" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#review-passes-arrow)" />

      {/* result */}
      <rect x="112" y="296" width="256" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="240" y="325" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Consolidated review
      </text>
    </svg>
  );
}

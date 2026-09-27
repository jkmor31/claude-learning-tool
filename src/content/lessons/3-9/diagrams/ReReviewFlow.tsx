const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function ReReviewFlow() {
  return (
    <svg
      viewBox="0 0 640 448"
      role="img"
      aria-labelledby="re-review-flow-title re-review-flow-desc"
      className="w-full max-w-[640px]"
    >
      <title id="re-review-flow-title">Prior findings carry forward, so re-review reports only what changed</title>
      <desc id="re-review-flow-desc">
        On push 1, review runs and produces three findings. When push 2
        fixes the code, the second review reads that prior-findings file
        alongside the new diff, and reports one new issue and marks the
        other two resolved, instead of repeating all three. A posting
        script then updates the comment threads without duplicating any of
        them.
      </desc>
      <defs>
        <marker
          id="re-review-flow-arrow"
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

      {/* round 1 */}
      <rect x="80" y="24" width="160" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="160" y="49" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Push 1
      </text>

      <line x1="160" y1="64" x2="160" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="40" y="92" width="240" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="160" y="112" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Review (independent)
      </text>
      <text x="160" y="130" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        sees diff + criteria
      </text>

      <line x1="160" y1="140" x2="160" y2="164" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="80" y="168" width="160" height="40" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="160" y="193" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        3 findings
      </text>

      <text x="400" y="172" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        carried forward as prior-findings.json
      </text>
      <path
        d="M 240 188 L 560 188 L 560 340 L 284 340"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        markerEnd="url(#re-review-flow-arrow)"
      />

      {/* round 2 */}
      <rect x="80" y="248" width="160" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="160" y="273" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Push 2 — fixes
      </text>

      <line x1="160" y1="288" x2="160" y2="312" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="40" y="316" width="240" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="160" y="338" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Review, same PR
      </text>
      <text x="160" y="358" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        + prior findings
      </text>

      <line x1="160" y1="372" x2="160" y2="392" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="80" y="392" width="200" height="40" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="180" y="417" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        1 new · 2 resolved
      </text>

      <line x1="280" y1="412" x2="316" y2="412" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="320" y="392" width="140" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="390" y="417" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--foreground)">
        Posting script
      </text>

      <line x1="460" y1="412" x2="492" y2="412" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#re-review-flow-arrow)" />

      <rect x="496" y="392" width="128" height="40" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="560" y="417" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="700" fill="var(--foreground)">
        No duplicates
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";

export function ReviewRouting() {
  return (
    <svg
      viewBox="0 0 600 408"
      role="img"
      aria-labelledby="review-routing-title review-routing-desc"
      className="w-full max-w-[600px]"
    >
      <title id="review-routing-title">Routing extractions between human review and auto-accept</title>
      <desc id="review-routing-desc">
        Each extraction arrives with field-level confidence. If the source
        document is ambiguous or contradictory, it goes to the human review
        queue regardless of confidence. Otherwise, if confidence is below the
        field&apos;s calibrated threshold, it also goes to review. The queue is
        prioritized by document value and critical fields. Extractions at or
        above the threshold are auto-accepted, and a stratified random sample
        of them is audited. If a segment&apos;s sampled error rate rises above
        its bar, that segment goes back to human review; otherwise
        auto-accepting continues.
      </desc>
      <defs>
        <marker
          id="review-routing-arrow"
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

      {/* input */}
      <rect x="16" y="16" width="256" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Extraction + field confidence
      </text>
      <line x1="144" y1="64" x2="144" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />

      {/* check 1: source */}
      <rect x="16" y="96" width="256" height="48" rx="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="125" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Ambiguous or contradictory?
      </text>
      <line x1="272" y1="120" x2="334" y2="120" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />
      <text x="302" y="112" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        yes
      </text>
      <line x1="144" y1="144" x2="144" y2="174" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />
      <text x="154" y="164" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        no
      </text>

      {/* check 2: calibrated confidence */}
      <rect x="16" y="176" width="256" height="48" rx="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="205" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Confidence ≥ field threshold?
      </text>
      <line x1="272" y1="200" x2="334" y2="200" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />
      <text x="302" y="192" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        no
      </text>
      <line x1="144" y1="224" x2="144" y2="254" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />
      <text x="154" y="244" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        yes
      </text>

      {/* human review queue */}
      <rect x="336" y="96" width="208" height="128" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="440" y="140" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Human review queue
      </text>
      <text x="440" y="164" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        prioritized: high-value docs,
      </text>
      <text x="440" y="182" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        critical fields first
      </text>

      {/* auto-accept */}
      <rect x="16" y="256" width="256" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="144" y="285" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Auto-accept
      </text>
      <line x1="272" y1="280" x2="334" y2="280" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />

      {/* ongoing sampling */}
      <rect x="336" y="256" width="208" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="440" y="277" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Stratified sample
      </text>
      <text x="440" y="295" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        by document type, vendor
      </text>
      <line x1="440" y1="304" x2="440" y2="334" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />

      <rect x="336" y="336" width="208" height="48" rx="24" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="440" y="365" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Error rate above bar?
      </text>

      {/* yes: segment back to review */}
      <path d="M544 360 H576 V160 H546" fill="none" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#review-routing-arrow)" />
      <text x="560" y="352" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--danger)">
        yes
      </text>

      {/* no: keep auto-accepting */}
      <path d="M336 360 H144 V306" fill="none" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#review-routing-arrow)" />
      <text x="240" y="352" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--success)">
        no: keep going
      </text>
    </svg>
  );
}

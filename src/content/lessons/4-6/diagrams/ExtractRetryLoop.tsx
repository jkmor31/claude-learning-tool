const sans = "var(--font-geist-sans), sans-serif";

export function ExtractRetryLoop() {
  return (
    <svg
      viewBox="0 0 656 256"
      role="img"
      aria-labelledby="extract-retry-loop-title extract-retry-loop-desc"
      className="w-full max-w-[656px]"
    >
      <title id="extract-retry-loop-title">Validation failures trigger a targeted retry with the specific error</title>
      <desc id="extract-retry-loop-desc">
        The invoice text feeds an extraction step that produces JSON, which
        a validation step checks for summed line items, date order, and
        swapped fields. On failure, a retry request carries the original
        document, the failed extraction, and the specific validation
        errors back to the extraction step. On success, the extraction is
        valid and ready to use.
      </desc>
      <defs>
        <marker
          id="extract-retry-loop-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
        <marker
          id="extract-retry-loop-arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
        <marker
          id="extract-retry-loop-arrow-success"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--success)" />
        </marker>
      </defs>

      {/* top row */}
      <rect x="16" y="56" width="160" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="96" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Invoice
      </text>
      <text x="96" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        the document
      </text>

      <line x1="176" y1="88" x2="228" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#extract-retry-loop-arrow)" />

      <rect x="232" y="56" width="160" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="312" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Extract
      </text>
      <text x="312" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        produce JSON
      </text>

      <line x1="392" y1="88" x2="444" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#extract-retry-loop-arrow)" />

      <rect x="448" y="56" width="160" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="528" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Validate
      </text>
      <text x="528" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        sums, dates, fields
      </text>

      {/* fail path: loops back with the retry payload */}
      <text x="488" y="140" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        fail
      </text>
      <path
        d="M 488 120 L 488 184 L 312 184 L 312 120"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        markerEnd="url(#extract-retry-loop-arrow-accent)"
      />
      <text x="400" y="176" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        doc + output + errors
      </text>

      {/* pass path: exits to done */}
      <text x="568" y="140" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--success)">
        pass
      </text>
      <line x1="568" y1="120" x2="568" y2="164" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#extract-retry-loop-arrow-success)" />

      <rect x="488" y="168" width="160" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="568" y="192" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Valid
      </text>
      <text x="568" y="212" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        ready to use
      </text>
    </svg>
  );
}

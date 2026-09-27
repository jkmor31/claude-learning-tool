const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function BatchCorrelateResubmit() {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-labelledby="batch-correlate-resubmit-title batch-correlate-resubmit-desc"
      className="w-full max-w-[720px]"
    >
      <title id="batch-correlate-resubmit-title">
        Results are correlated by custom_id, and only the failures are resubmitted
      </title>
      <desc id="batch-correlate-resubmit-desc">
        Documents are submitted together as a batch, each request carrying a
        custom_id. After processing, results are correlated back to their
        requests by that custom_id. Most succeed and are saved. The rest
        fail for reasons like a transient error or a document too large for
        the context window, so only those custom_ids are resubmitted, with
        oversized documents chunked into parts, looping back into the same
        submit step.
      </desc>
      <defs>
        <marker
          id="batch-correlate-resubmit-arrow"
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
          id="batch-correlate-resubmit-arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* top row: documents -> submit -> processing */}
      <rect x="16" y="56" width="152" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="92" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Documents
      </text>
      <text x="92" y="102" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        each has custom_id
      </text>

      <line x1="168" y1="88" x2="200" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />

      <rect x="200" y="56" width="168" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="284" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Submit batch
      </text>
      <text x="284" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        one request per doc
      </text>

      <line x1="368" y1="88" x2="400" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />

      <rect x="400" y="56" width="152" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="476" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Processing
      </text>
      <text x="476" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        up to 24h
      </text>

      <line x1="476" y1="120" x2="476" y2="144" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />

      {/* correlated results */}
      <rect x="328" y="144" width="296" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="476" y="164" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Results correlated
      </text>
      <text x="476" y="182" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        matched by custom_id
      </text>

      {/* branch down to succeeded / failed */}
      <line x1="476" y1="192" x2="340" y2="216" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />
      <line x1="476" y1="192" x2="580" y2="216" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />

      <rect x="232" y="216" width="216" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="340" y="236" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Succeeded
      </text>
      <text x="340" y="254" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        most requests
      </text>

      <rect x="472" y="216" width="216" height="48" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="580" y="236" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Failed (subset)
      </text>
      <text x="580" y="254" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        transient or oversized
      </text>

      <line x1="340" y1="264" x2="340" y2="288" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />
      <line x1="580" y1="264" x2="580" y2="288" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#batch-correlate-resubmit-arrow)" />

      <rect x="232" y="288" width="216" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="340" y="308" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Saved
      </text>
      <text x="340" y="326" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        ready to use
      </text>

      <rect x="472" y="288" width="216" height="48" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="580" y="308" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Resubmit failed IDs
      </text>
      <text x="580" y="326" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        chunk oversized docs
      </text>

      {/* loop back to submit, routed clear of every box */}
      <path
        d="M 688 312 L 704 312 L 704 32 L 284 32 L 284 56"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        markerEnd="url(#batch-correlate-resubmit-arrow-accent)"
      />
      <text x="494" y="26" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        resubmit
      </text>
    </svg>
  );
}

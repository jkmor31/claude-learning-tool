const sans = "var(--font-geist-sans), sans-serif";

export function BatchSlaTimeline() {
  return (
    <svg
      viewBox="0 0 640 232"
      role="img"
      aria-labelledby="batch-sla-timeline-title batch-sla-timeline-desc"
      className="w-full max-w-[640px]"
    >
      <title id="batch-sla-timeline-title">
        A 4-hour submission window keeps the worst case inside a 30-hour SLA
      </title>
      <desc id="batch-sla-timeline-desc">
        A document that arrives right after a submission waits up to 4
        hours for the next submission window, then up to 24 hours of batch
        processing, reaching a worst case of 28 hours. That leaves a
        2-hour margin before the 30-hour SLA deadline for collecting
        results and resubmitting failures.
      </desc>

      <text x="64" y="32" fontFamily={sans} fontSize="12" fill="var(--muted)">
        Doc arrives
      </text>
      <text x="624" y="32" textAnchor="end" fontFamily={sans} fontSize="12" fontWeight="700" fill="var(--danger)">
        SLA: 30h
      </text>

      {/* worst-case marker at 28h */}
      <line x1="587" y1="64" x2="587" y2="192" stroke="var(--muted)" strokeWidth="1.25" strokeDasharray="4 4" />
      {/* SLA deadline at 30h */}
      <line x1="624" y1="64" x2="624" y2="192" stroke="var(--danger)" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* segment labels */}
      <text x="101" y="88" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="700" fill="var(--foreground)">
        Wait
      </text>
      <text x="101" y="104" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        &#8804;4h
      </text>

      <text x="363" y="88" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="700" fill="var(--foreground)">
        Processing
      </text>
      <text x="363" y="104" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        &#8804;24h
      </text>

      <text x="606" y="88" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="700" fill="var(--foreground)">
        Margin
      </text>
      <text x="606" y="104" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        2h
      </text>

      {/* the bar, three segments to scale */}
      <rect x="64" y="112" width="75" height="56" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <rect x="139" y="112" width="448" height="56" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <rect x="587" y="112" width="37" height="56" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />

      {/* ticks */}
      <line x1="64" y1="168" x2="64" y2="180" stroke="var(--muted)" strokeWidth="1.25" />
      <line x1="139" y1="168" x2="139" y2="180" stroke="var(--muted)" strokeWidth="1.25" />
      <line x1="587" y1="168" x2="587" y2="180" stroke="var(--muted)" strokeWidth="1.25" />
      <line x1="624" y1="168" x2="624" y2="180" stroke="var(--muted)" strokeWidth="1.25" />

      <text x="64" y="196" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        0h
      </text>
      <text x="139" y="196" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        4h
      </text>
      <text x="587" y="196" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--foreground)" fontWeight="700">
        28h
      </text>
      <text x="587" y="212" textAnchor="middle" fontFamily={sans} fontSize="10" fill="var(--muted)">
        worst case
      </text>
      <text x="624" y="196" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--danger)" fontWeight="700">
        30h
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function PrerequisiteGate() {
  return (
    <svg
      viewBox="0 0 480 312"
      role="img"
      aria-labelledby="prerequisite-gate-title prerequisite-gate-desc"
      className="w-full max-w-[480px]"
    >
      <title id="prerequisite-gate-title">A prerequisite gate in a PreToolUse hook</title>
      <desc id="prerequisite-gate-desc">
        The model calls process_refund. Before it runs, a PreToolUse hook checks
        whether a verified customer ID has been recorded. If yes, the tool runs.
        If no, the call is denied with a reason telling the model to verify
        first. The model calls get_customer, which records the verified ID, and
        then retries process_refund, which now passes the gate.
      </desc>
      <defs>
        <marker
          id="prerequisite-gate-arrow"
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

      {/* the gated call */}
      <rect x="56" y="16" width="176" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="40" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        process_refund
      </text>
      <text x="144" y="60" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        requested by model
      </text>
      <line x1="144" y1="72" x2="144" y2="102" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#prerequisite-gate-arrow)" />

      {/* the hook's check */}
      <path d="M144 104 L240 144 L144 184 L48 144 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="140" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        PreToolUse
      </text>
      <text x="144" y="159" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        ID verified?
      </text>

      {/* yes: the tool runs */}
      <line x1="144" y1="184" x2="144" y2="230" stroke="var(--success)" strokeWidth="2" markerEnd="url(#prerequisite-gate-arrow)" />
      <text x="154" y="212" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        yes
      </text>
      <rect x="56" y="232" width="176" height="64" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="144" y="259" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Tool runs
      </text>
      <text x="144" y="279" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        refund issued
      </text>

      {/* no: denied with a reason */}
      <line
        x1="240"
        y1="144"
        x2="286"
        y2="144"
        stroke="var(--danger)"
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd="url(#prerequisite-gate-arrow)"
      />
      <text x="263" y="136" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        no
      </text>
      <rect
        x="288"
        y="112"
        width="176"
        height="64"
        rx="8"
        fill="var(--danger-soft)"
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="376" y="140" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Deny + reason
      </text>
      <text x="376" y="160" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        &quot;verify first&quot;
      </text>

      {/* the model reads the reason and verifies */}
      <line x1="376" y1="112" x2="376" y2="74" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#prerequisite-gate-arrow)" />
      <text x="368" y="97" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        model reads
      </text>
      <rect x="288" y="16" width="176" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="376" y="40" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        get_customer
      </text>
      <text x="376" y="60" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        records verified ID
      </text>

      {/* retry */}
      <line x1="288" y1="44" x2="234" y2="44" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#prerequisite-gate-arrow)" />
      <text x="260" y="36" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--accent)">
        retry
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";

export function SessionFork() {
  return (
    <svg
      viewBox="0 0 480 328"
      role="img"
      aria-labelledby="session-fork-title session-fork-desc"
      className="w-full max-w-[480px]"
    >
      <title id="session-fork-title">Forking a session</title>
      <desc id="session-fork-desc">
        The original session holds the shared analysis and stays unchanged.
        Forking copies its history into two new sessions: fork A plans
        mocking-based unit tests and fork B plans containerized integration
        tests. Both forks still work in the same working directory, which is
        not forked, so file edits from one are visible to the other.
      </desc>
      <defs>
        <marker
          id="session-fork-arrow"
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

      {/* original */}
      <rect x="152" y="16" width="176" height="72" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="42" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Original session
      </text>
      <text x="240" y="61" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        shared analysis
      </text>
      <text x="240" y="77" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        stays unchanged
      </text>

      {/* fork */}
      <path d="M240 88 V120 H120 V150" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#session-fork-arrow)" />
      <path d="M240 120 H360 V150" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#session-fork-arrow)" />
      <text x="250" y="108" fontFamily={sans} fontSize="12" fill="var(--muted)">
        copies history
      </text>

      <rect x="40" y="152" width="160" height="64" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="120" y="178" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Fork A
      </text>
      <text x="120" y="198" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        mocking plan
      </text>

      <rect x="280" y="152" width="160" height="64" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="360" y="178" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Fork B
      </text>
      <text x="360" y="198" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        integration test plan
      </text>

      {/* shared files */}
      <line
        x1="120"
        y1="216"
        x2="120"
        y2="262"
        stroke="var(--danger)"
        strokeWidth="1.75"
        strokeDasharray="5 4"
        markerEnd="url(#session-fork-arrow)"
      />
      <line
        x1="360"
        y1="216"
        x2="360"
        y2="262"
        stroke="var(--danger)"
        strokeWidth="1.75"
        strokeDasharray="5 4"
        markerEnd="url(#session-fork-arrow)"
      />
      <text x="240" y="244" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        both edit here
      </text>
      <rect x="40" y="264" width="400" height="48" rx="8" fill="var(--danger-soft)" stroke="var(--danger)" strokeWidth="1.5" />
      <text x="240" y="293" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        One working directory: not forked
      </text>
    </svg>
  );
}

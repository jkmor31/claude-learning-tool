const sans = "var(--font-geist-sans), sans-serif";

export function RefinementLoop() {
  return (
    <svg
      viewBox="0 0 480 456"
      role="img"
      aria-labelledby="refinement-loop-title refinement-loop-desc"
      className="w-full max-w-[480px]"
    >
      <title id="refinement-loop-title">Iterative refinement loop</title>
      <desc id="refinement-loop-desc">
        The coordinator decomposes the topic, delegates search and analysis,
        and synthesizes. It then checks the synthesis against explicit coverage
        criteria. If they pass, it returns the final result. If there are gaps,
        it sends a targeted follow-up for each gap, re-delegates, and
        re-synthesizes. If the maximum number of rounds is reached first, it
        returns the result along with a list of the gaps that remain.
      </desc>
      <defs>
        <marker
          id="refinement-loop-arrow"
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

      {/* 1. Decompose */}
      <rect x="56" y="16" width="176" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="45" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="600" fill="var(--foreground)">
        Decompose
      </text>
      <line x1="144" y1="64" x2="144" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#refinement-loop-arrow)" />

      {/* 2. Delegate */}
      <rect x="56" y="96" width="176" height="56" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="120" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Delegate research
      </text>
      <text x="144" y="140" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        search · analysis
      </text>
      <line x1="144" y1="152" x2="144" y2="182" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#refinement-loop-arrow)" />

      {/* 3. Synthesize */}
      <rect x="56" y="184" width="176" height="48" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="213" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Synthesize
      </text>
      <line x1="144" y1="232" x2="144" y2="262" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#refinement-loop-arrow)" />

      {/* 4. Evaluate */}
      <path d="M144 264 L224 304 L144 344 L64 304 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="309" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Criteria met?
      </text>

      {/* yes: done */}
      <line x1="144" y1="344" x2="144" y2="390" stroke="var(--success)" strokeWidth="2" markerEnd="url(#refinement-loop-arrow)" />
      <text x="154" y="372" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        yes
      </text>
      <rect x="56" y="392" width="176" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="144" y="421" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Final result
      </text>

      {/* no: targeted follow-up */}
      <line x1="224" y1="304" x2="286" y2="304" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#refinement-loop-arrow)" />
      <text x="254" y="296" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--accent)">
        gaps
      </text>
      <rect x="288" y="272" width="176" height="64" rx="8" fill="var(--background)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="376" y="299" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Targeted follow-up
      </text>
      <text x="376" y="319" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        one query per gap
      </text>

      {/* loop back to delegation */}
      <path d="M376 272 V124 H234" fill="none" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#refinement-loop-arrow)" />
      <text x="304" y="116" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        re-delegate
      </text>

      {/* backstop */}
      <line
        x1="376"
        y1="336"
        x2="376"
        y2="390"
        stroke="var(--muted)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        markerEnd="url(#refinement-loop-arrow)"
      />
      <text x="386" y="368" fontFamily={sans} fontSize="13" fill="var(--muted)">
        max rounds hit
      </text>
      <rect
        x="288"
        y="392"
        width="176"
        height="48"
        rx="8"
        fill="var(--danger-soft)"
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="376" y="421" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Result + open gaps
      </text>
    </svg>
  );
}

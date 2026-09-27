const sans = "var(--font-geist-sans), sans-serif";

export function TestIterationLoop() {
  return (
    <svg
      viewBox="0 0 640 256"
      role="img"
      aria-labelledby="test-iteration-loop-title test-iteration-loop-desc"
      className="w-full max-w-[640px]"
    >
      <title id="test-iteration-loop-title">Test-driven iteration loops on the actual failure, not a paraphrase</title>
      <desc id="test-iteration-loop-desc">
        Write tests covering behavior, edge cases, and performance, then have
        Claude implement until they pass, then run the tests. On failure,
        the actual failure output goes back to Claude to revise the
        implementation, and the tests run again. Once the tests pass, the
        loop ends.
      </desc>
      <defs>
        <marker
          id="test-iteration-loop-arrow"
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
          id="test-iteration-loop-arrow-accent"
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
          id="test-iteration-loop-arrow-success"
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
        Write tests
      </text>
      <text x="96" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        edge cases, perf
      </text>

      <line x1="176" y1="88" x2="228" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#test-iteration-loop-arrow)" />

      <rect x="232" y="56" width="160" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="312" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Implement
      </text>
      <text x="312" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        until tests pass
      </text>

      <line x1="392" y1="88" x2="444" y2="88" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#test-iteration-loop-arrow)" />

      <rect x="448" y="56" width="160" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="528" y="82" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Run tests
      </text>
      <text x="528" y="102" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        check the output
      </text>

      {/* fail path: loops back with the raw failure */}
      <text x="488" y="140" textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="600" fill="var(--accent)">
        fail
      </text>
      <path
        d="M 488 120 L 488 184 L 312 184 L 312 120"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        markerEnd="url(#test-iteration-loop-arrow-accent)"
      />
      <text x="400" y="176" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        share the failure output
      </text>

      {/* pass path: exits to done */}
      <text x="568" y="140" textAnchor="middle" fontFamily={sans} fontSize="11" fontWeight="600" fill="var(--success)">
        pass
      </text>
      <line x1="568" y1="120" x2="568" y2="164" stroke="var(--success)" strokeWidth="1.5" markerEnd="url(#test-iteration-loop-arrow-success)" />

      <rect x="488" y="168" width="160" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="568" y="192" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Tests pass
      </text>
      <text x="568" y="212" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        done
      </text>
    </svg>
  );
}

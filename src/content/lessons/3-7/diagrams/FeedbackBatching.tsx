const sans = "var(--font-geist-sans), sans-serif";

export function FeedbackBatching() {
  return (
    <svg
      viewBox="0 0 640 320"
      role="img"
      aria-labelledby="feedback-batching-title feedback-batching-desc"
      className="w-full max-w-[640px]"
    >
      <title id="feedback-batching-title">Interacting issues go together; independent issues go one at a time</title>
      <desc id="feedback-batching-desc">
        Three interacting issues, retry hides error, timeout shorter than
        backoff, and log misses attempts, are sent together in one detailed
        message, producing one coherent fix that handles all three. Three
        independent issues, a typo, a missing index, and a flaky date
        format, are sent as three separate rounds, each fixed and verified
        before the next is sent.
      </desc>
      <defs>
        <marker
          id="feedback-batching-arrow"
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

      {/* panel A: interacting issues */}
      <rect x="16" y="16" width="280" height="288" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="156" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Interacting issues
      </text>

      <text x="40" y="76" fontFamily={sans} fontSize="12" fill="var(--muted)">
        • retry hides error
      </text>
      <text x="40" y="96" fontFamily={sans} fontSize="12" fill="var(--muted)">
        • timeout &lt; backoff
      </text>
      <text x="40" y="116" fontFamily={sans} fontSize="12" fill="var(--muted)">
        • log misses attempts
      </text>

      <line x1="156" y1="128" x2="156" y2="160" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#feedback-batching-arrow)" />

      <rect x="40" y="164" width="232" height="44" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="156" y="191" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        One detailed message
      </text>

      <line x1="156" y1="208" x2="156" y2="232" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#feedback-batching-arrow)" />

      <rect x="40" y="236" width="232" height="48" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="156" y="258" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        One coherent fix
      </text>
      <text x="156" y="276" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        handles all three
      </text>

      {/* panel B: independent issues, one round at a time */}
      <rect x="336" y="16" width="288" height="288" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="480" y="44" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Independent issues
      </text>

      <rect x="360" y="64" width="240" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="480" y="86" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Round 1 — typo
      </text>
      <text x="480" y="106" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        fixed, verified
      </text>

      <line x1="480" y1="120" x2="480" y2="136" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#feedback-batching-arrow)" />

      <rect x="360" y="140" width="240" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="480" y="162" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Round 2 — index
      </text>
      <text x="480" y="182" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        fixed, verified
      </text>

      <line x1="480" y1="196" x2="480" y2="212" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#feedback-batching-arrow)" />

      <rect x="360" y="216" width="240" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="480" y="238" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Round 3 — date fmt
      </text>
      <text x="480" y="258" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        fixed, verified
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";

export function StaleHistory() {
  return (
    <svg
      viewBox="0 0 480 192"
      role="img"
      aria-labelledby="stale-history-title stale-history-desc"
      className="w-full max-w-[480px]"
    >
      <title id="stale-history-title">Session history vs the files on disk</title>
      <desc id="stale-history-desc">
        The resumed session holds the contents of 40 files as they were read
        yesterday. 37 of those files are unchanged on disk, so those reads are
        still valid. 3 files were refactored overnight, so the session&apos;s copies
        of them are stale and don&apos;t match the files on disk.
      </desc>

      <text x="16" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        SESSION HISTORY
      </text>
      <text x="296" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        FILES ON DISK NOW
      </text>

      {/* still valid */}
      <rect x="16" y="40" width="168" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="100" y="64" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        37 file reads
      </text>
      <text x="100" y="84" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        from yesterday
      </text>
      <rect x="296" y="40" width="168" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="380" y="64" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        37 files
      </text>
      <text x="380" y="84" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        unchanged
      </text>
      <line x1="184" y1="72" x2="296" y2="72" stroke="var(--success)" strokeWidth="2" />
      <text x="240" y="64" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        still valid
      </text>

      {/* stale */}
      <rect
        x="16"
        y="120"
        width="168"
        height="56"
        rx="8"
        fill="var(--danger-soft)"
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="100" y="144" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        3 file reads
      </text>
      <text x="100" y="164" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        old contents
      </text>
      <rect x="296" y="120" width="168" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="380" y="144" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        3 files
      </text>
      <text x="380" y="164" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        refactored overnight
      </text>
      <line x1="184" y1="152" x2="296" y2="152" stroke="var(--danger)" strokeWidth="1.75" strokeDasharray="5 4" />
      <circle cx="240" cy="152" r="9" fill="var(--surface)" stroke="var(--danger)" strokeWidth="1.75" />
      <path d="M236 148 L244 156 M244 148 L236 156" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />
      <text x="240" y="134" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        stale
      </text>
    </svg>
  );
}

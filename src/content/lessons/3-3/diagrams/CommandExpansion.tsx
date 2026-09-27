const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function CommandExpansion() {
  return (
    <svg
      viewBox="0 0 640 328"
      role="img"
      aria-labelledby="command-expansion-title command-expansion-desc"
      className="w-full max-w-[640px]"
    >
      <title id="command-expansion-title">A command file expands before Claude sees it</title>
      <desc id="command-expansion-desc">
        Two placeholders in a command file are filled in before Claude reads
        the prompt: dollar ARGUMENTS is replaced with the text typed after
        the slash command, and a line starting with an exclamation mark and
        a command in backticks is replaced with that shell command&apos;s output.
        The filled-in file becomes the expanded prompt Claude receives.
      </desc>
      <defs>
        <marker
          id="command-expansion-arrow"
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

      {/* left inputs */}
      <rect x="16" y="56" width="168" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="100" y="76" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        Typed after
      </text>
      <text x="100" y="93" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        /command
      </text>

      <rect x="16" y="216" width="168" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="100" y="236" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        Shell command
      </text>
      <text x="100" y="253" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        output
      </text>

      <line x1="184" y1="80" x2="228" y2="80" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#command-expansion-arrow)" />
      <line x1="184" y1="240" x2="228" y2="240" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#command-expansion-arrow)" />

      {/* command file panel */}
      <rect x="216" y="16" width="232" height="288" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="332" y="40" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill="var(--foreground)">
        review.md
      </text>

      <rect x="232" y="60" width="200" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="332" y="85" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        $ARGUMENTS
      </text>

      <text x="332" y="164" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        rest of the prompt
      </text>

      <rect x="232" y="220" width="200" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="332" y="245" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        {"!`command`"}
      </text>

      {/* to expanded prompt */}
      <line x1="448" y1="160" x2="484" y2="160" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#command-expansion-arrow)" />

      <rect x="488" y="132" width="136" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="556" y="155" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Expanded
      </text>
      <text x="556" y="173" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        prompt
      </text>

      <line x1="556" y1="188" x2="556" y2="224" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#command-expansion-arrow)" />

      <rect x="488" y="228" width="136" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="556" y="261" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Claude sees it
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function StructuredFindingsFlow() {
  return (
    <svg
      viewBox="0 0 480 464"
      role="img"
      aria-labelledby="structured-findings-flow-title structured-findings-flow-desc"
      className="w-full max-w-[480px]"
    >
      <title id="structured-findings-flow-title">A schema turns Claude&apos;s review into postable comments</title>
      <desc id="structured-findings-flow-desc">
        The PR diff goes into claude -p with --output-format json and
        --json-schema. The result&apos;s structured_output.findings field holds a
        schema-conforming array. A posting script reads that array and posts
        one inline PR comment per finding, with no prose parsing involved.
      </desc>
      <defs>
        <marker
          id="structured-findings-flow-arrow"
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

      {/* 1: the diff */}
      <rect x="90" y="16" width="300" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="240" y="40" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill="var(--foreground)">
        git diff
      </text>
      <text x="240" y="60" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        the PR&apos;s changed lines
      </text>

      <line x1="240" y1="72" x2="240" y2="96" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#structured-findings-flow-arrow)" />

      {/* 2: claude -p with schema */}
      <rect x="90" y="100" width="300" height="88" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="240" y="124" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="700" fill="var(--foreground)">
        claude -p
      </text>
      <text x="240" y="144" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        --output-format json
      </text>
      <text x="240" y="162" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        --json-schema findings.json
      </text>

      <line x1="240" y1="188" x2="240" y2="212" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#structured-findings-flow-arrow)" />

      {/* 3: structured output */}
      <rect x="90" y="216" width="300" height="64" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="240" y="240" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
        structured_output.findings
      </text>
      <text x="240" y="260" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        schema-conforming array
      </text>

      <line x1="240" y1="280" x2="240" y2="304" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#structured-findings-flow-arrow)" />

      {/* 4: posting script */}
      <rect x="90" y="308" width="300" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="240" y="332" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Posting script
      </text>
      <text x="240" y="352" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        reads findings[]
      </text>

      <line x1="240" y1="364" x2="240" y2="388" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#structured-findings-flow-arrow)" />

      {/* 5: outcome */}
      <rect x="90" y="392" width="300" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="240" y="416" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Inline PR comments
      </text>
      <text x="240" y="436" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        one per finding
      </text>
    </svg>
  );
}

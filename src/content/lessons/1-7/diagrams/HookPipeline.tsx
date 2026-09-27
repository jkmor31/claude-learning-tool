const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function HookPipeline() {
  return (
    <svg
      viewBox="0 0 480 424"
      role="img"
      aria-labelledby="hook-pipeline-title hook-pipeline-desc"
      className="w-full max-w-[480px]"
    >
      <title id="hook-pipeline-title">PreToolUse and PostToolUse around a tool call</title>
      <desc id="hook-pipeline-desc">
        The model requests a tool. The PreToolUse hook runs first and can allow,
        deny, or modify the call. If it denies, the tool never runs and the model
        gets the reason. If it allows, the tool executes, then the PostToolUse
        hook runs and can replace the result or add context. Only then does the
        model read the result, possibly transformed.
      </desc>
      <defs>
        <marker
          id="hook-pipeline-arrow"
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

      {/* request */}
      <rect x="56" y="16" width="176" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="45" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Model requests tool
      </text>
      <line x1="144" y1="64" x2="144" y2="94" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#hook-pipeline-arrow)" />

      {/* PreToolUse */}
      <rect x="56" y="96" width="176" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="120" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        PreToolUse
      </text>
      <text x="144" y="140" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        allow / deny / modify
      </text>

      {/* deny branch */}
      <line
        x1="232"
        y1="124"
        x2="286"
        y2="124"
        stroke="var(--danger)"
        strokeWidth="2"
        strokeDasharray="5 4"
        markerEnd="url(#hook-pipeline-arrow)"
      />
      <text x="259" y="116" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        deny
      </text>
      <rect
        x="288"
        y="96"
        width="176"
        height="56"
        rx="8"
        fill="var(--danger-soft)"
        stroke="var(--danger)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
      />
      <text x="376" y="120" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Tool never runs
      </text>
      <text x="376" y="140" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        model gets the reason
      </text>

      {/* allow: execute */}
      <line x1="144" y1="152" x2="144" y2="182" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#hook-pipeline-arrow)" />
      <text x="154" y="172" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--accent)">
        allow
      </text>
      <rect x="56" y="184" width="176" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="144" y="213" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Tool executes
      </text>
      <line x1="144" y1="232" x2="144" y2="262" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#hook-pipeline-arrow)" />

      {/* PostToolUse */}
      <rect x="56" y="264" width="176" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="144" y="288" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        PostToolUse
      </text>
      <text x="144" y="308" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        replace / add context
      </text>
      <line x1="144" y1="320" x2="144" y2="350" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#hook-pipeline-arrow)" />

      {/* timing note */}
      <text x="248" y="284" fontFamily={sans} fontSize="12" fill="var(--muted)">
        after the tool,
      </text>
      <text x="248" y="302" fontFamily={sans} fontSize="12" fill="var(--muted)">
        before the model
      </text>

      {/* model reads */}
      <rect x="56" y="352" width="176" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="144" y="376" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Model reads result
      </text>
      <text x="144" y="396" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        possibly transformed
      </text>
    </svg>
  );
}

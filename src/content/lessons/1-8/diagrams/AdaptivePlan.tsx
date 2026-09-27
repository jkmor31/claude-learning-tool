const sans = "var(--font-geist-sans), sans-serif";

export function AdaptivePlan() {
  return (
    <svg
      viewBox="0 0 480 208"
      role="img"
      aria-labelledby="adaptive-plan-title adaptive-plan-desc"
      className="w-full max-w-[480px]"
    >
      <title id="adaptive-plan-title">A plan that adapts to a discovery</title>
      <desc id="adaptive-plan-desc">
        The initial plan is to test the payment service, then auth. Mapping
        discovers that a global config opens a real database connection at
        import time. The revised plan adds a new first task, a config fixture,
        followed by testing payments and then auth.
      </desc>
      <defs>
        <marker
          id="adaptive-plan-arrow"
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

      {/* initial plan */}
      <text x="16" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        PLAN
      </text>
      <rect x="16" y="40" width="128" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="80" y="69" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Test payments
      </text>
      <rect x="16" y="96" width="128" height="48" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="80" y="125" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Test auth
      </text>

      <line x1="144" y1="64" x2="174" y2="64" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#adaptive-plan-arrow)" />

      {/* discovery */}
      <text x="176" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        MAPPING FINDS
      </text>
      <rect x="176" y="40" width="128" height="104" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="78" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Global config
      </text>
      <text x="240" y="98" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        opens a real DB
      </text>
      <text x="240" y="116" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        at import time
      </text>

      <line x1="304" y1="64" x2="334" y2="64" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#adaptive-plan-arrow)" />

      {/* revised plan */}
      <text x="336" y="28" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        REVISED PLAN
      </text>
      <rect x="336" y="40" width="128" height="56" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="400" y="64" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Config fixture
      </text>
      <text x="400" y="83" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--accent)">
        new first task
      </text>
      <rect x="336" y="104" width="128" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="400" y="129" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Test payments
      </text>
      <rect x="336" y="152" width="128" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="400" y="177" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Test auth
      </text>
    </svg>
  );
}

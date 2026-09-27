const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type FileRow = {
  y: number;
  path: string;
  tag: string;
  match: boolean;
  targetY: number;
};

const rows: FileRow[] = [
  { y: 64, path: "cart/Cart.test.tsx", tag: "matches pattern", match: true, targetY: 64 },
  { y: 136, path: "auth/Login.test.tsx", tag: "matches pattern", match: true, targetY: 116 },
  { y: 208, path: "api/routes.ts", tag: "no match", match: false, targetY: 208 },
  { y: 280, path: "infra/main.tf", tag: "no match", match: false, targetY: 264 },
];

export function PathRuleTrigger() {
  return (
    <svg
      viewBox="0 0 640 328"
      role="img"
      aria-labelledby="path-rule-trigger-title path-rule-trigger-desc"
      className="w-full max-w-[640px]"
    >
      <title id="path-rule-trigger-title">One path-scoped rule triggers on matching files, in any folder</title>
      <desc id="path-rule-trigger-desc">
        A single rule file, testing.md, has paths set to a glob matching
        test.tsx files. Editing cart/Cart.test.tsx or auth/Login.test.tsx
        matches the pattern, so the rule loads and its testing conventions
        apply. Editing api/routes.ts or infra/main.tf does not match, so the
        rule does not load and nothing changes. The same rule covers both
        matching folders without any per-folder configuration.
      </desc>
      <defs>
        <marker
          id="path-rule-trigger-arrow"
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

      {/* the shared rule, drawn as a backdrop every file passes through */}
      <rect x="232" y="16" width="176" height="296" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="320" y="42" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
        testing.md
      </text>
      <text x="320" y="64" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        paths:
      </text>
      <text x="320" y="82" textAnchor="middle" fontFamily={mono} fontSize="12" fontWeight="600" fill="var(--foreground)">
        {"[\"**/*.test.tsx\"]"}
      </text>
      <text x="320" y="292" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        matches by pattern,
      </text>
      <text x="320" y="308" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        not by folder
      </text>

      {/* outcome boxes */}
      <rect x="456" y="32" width="168" height="120" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="540" y="66" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Rule loads
      </text>
      <text x="540" y="90" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        testing conventions
      </text>
      <text x="540" y="112" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        get applied
      </text>

      <rect x="456" y="184" width="168" height="112" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" strokeDasharray="5 4" />
      <text x="540" y="222" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Rule doesn&apos;t load
      </text>
      <text x="540" y="246" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        no change to
      </text>
      <text x="540" y="266" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        context
      </text>

      {/* file cards and their lines to the matching outcome */}
      {rows.map((r) => (
        <g key={r.path}>
          <rect
            x="16"
            y={r.y - 24}
            width="192"
            height="48"
            rx="8"
            fill={r.match ? "var(--accent-soft)" : "var(--surface)"}
            stroke={r.match ? "var(--accent)" : "var(--border)"}
            strokeWidth="1.25"
          />
          <text x="28" y={r.y - 4} fontFamily={mono} fontSize="12" fontWeight="600" fill="var(--foreground)">
            {r.path}
          </text>
          <text x="28" y={r.y + 16} fontFamily={sans} fontSize="11" fill="var(--muted)">
            {r.tag}
          </text>
          <line
            x1="208"
            y1={r.y}
            x2="450"
            y2={r.targetY}
            stroke={r.match ? "var(--accent)" : "var(--muted)"}
            strokeWidth="1.5"
            strokeDasharray={r.match ? undefined : "5 4"}
            markerEnd="url(#path-rule-trigger-arrow)"
          />
        </g>
      ))}
    </svg>
  );
}

import type { ReactNode } from "react";

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Row = { label: ReactNode; key: string; lesson: string };

const reviewRows: Row[] = [
  {
    key: "p",
    label: (
      <>
        <tspan fontFamily={mono}>claude -p</tspan>, JSON + schema
      </>
    ),
    lesson: "3.8",
  },
  { key: "tools", label: "read-only tools", lesson: "" },
  {
    key: "criteria",
    label: (
      <>
        criteria from <tspan fontFamily={mono}>CLAUDE.md</tspan>
      </>
    ),
    lesson: "3.9, 4.1",
  },
  { key: "passes", label: "per-file + integration passes", lesson: "4.8" },
  { key: "prior", label: "prior findings: new issues only", lesson: "3.9" },
];

export function LedgerlinePipeline() {
  return (
    <svg
      viewBox="0 0 480 496"
      role="img"
      aria-labelledby="ledgerline-pipeline-title ledgerline-pipeline-desc"
      className="w-full max-w-[480px]"
    >
      <title id="ledgerline-pipeline-title">Ledgerline CI review pipeline</title>
      <desc id="ledgerline-pipeline-desc">
        When a pull request is opened or updated, two jobs run. The blocking
        review job uses the synchronous API: claude -p with JSON output and a
        schema, read-only tools, review criteria from CLAUDE.md, per-file plus
        integration passes, and prior findings in context so it reports only new or unaddressed issues. Its structured_output
        becomes inline PR comments. The non-blocking test job has the existing
        tests and fixtures in context so it writes no duplicates. Separately, a
        nightly tech-debt audit runs on the Message Batches API with a custom_id
        per file, because nobody is waiting for it.
      </desc>
      <defs>
        <marker
          id="ledgerline-pipeline-arrow"
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

      {/* trigger */}
      <rect x="104" y="16" width="272" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="41" textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        pull_request opened / updated
      </text>
      <path d="M240 56 V72 M156 72 H388" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <line x1="156" y1="72" x2="156" y2="102" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#ledgerline-pipeline-arrow)" />
      <line x1="388" y1="72" x2="388" y2="102" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#ledgerline-pipeline-arrow)" />

      {/* review job */}
      <rect x="16" y="104" width="280" height="184" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <text x="32" y="131" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Review job
      </text>
      <text x="280" y="131" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        blocking · sync API
      </text>
      <line x1="32" y1="143" x2="280" y2="143" stroke="var(--border)" strokeWidth="1" />
      {reviewRows.map((r, i) => (
        <g key={r.key}>
          <text x="32" y={166 + i * 26} fontFamily={sans} fontSize="13" fill="var(--foreground)">
            {r.label}
          </text>
          <text x="280" y={166 + i * 26} textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
            {r.lesson}
          </text>
        </g>
      ))}

      {/* test job */}
      <rect x="312" y="104" width="152" height="184" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="328" y="131" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Test job
      </text>
      <text x="328" y="152" fontFamily={sans} fontSize="12" fill="var(--muted)">
        non-blocking
      </text>
      <text x="328" y="186" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        existing tests
      </text>
      <text x="328" y="206" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        and fixtures
      </text>
      <text x="328" y="226" fontFamily={sans} fontSize="13" fill="var(--foreground)">
        in context
      </text>
      <text x="328" y="266" fontFamily={sans} fontSize="12" fill="var(--muted)">
        no duplicates · 3.9
      </text>

      {/* output */}
      <line x1="156" y1="288" x2="156" y2="318" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#ledgerline-pipeline-arrow)" />
      <rect x="16" y="320" width="280" height="56" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="156" y="343" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Inline PR comments
      </text>
      <text x="156" y="363" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        from <tspan fontFamily={mono}>structured_output</tspan>
      </text>

      {/* divider: nightly, nobody waiting */}
      <line x1="16" y1="400" x2="464" y2="400" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 4" />

      <rect x="16" y="424" width="96" height="40" rx="20" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="64" y="449" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        nightly
      </text>
      <line x1="112" y1="444" x2="142" y2="444" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#ledgerline-pipeline-arrow)" />

      <rect x="144" y="416" width="320" height="64" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="160" y="440" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Tech-debt audit
      </text>
      <text x="448" y="440" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        nobody waits · 4.7
      </text>
      <text x="160" y="464" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        Message Batches API, <tspan fontFamily={mono}>custom_id</tspan> per file
      </text>
    </svg>
  );
}

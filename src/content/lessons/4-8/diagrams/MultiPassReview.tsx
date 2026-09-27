const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const files = [
  { label: "file1.py", y: 16 },
  { label: "file2.py", y: 112 },
  { label: "file3.py", y: 208 },
];

export function MultiPassReview() {
  return (
    <svg
      viewBox="0 0 688 280"
      role="img"
      aria-labelledby="multi-pass-review-title multi-pass-review-desc"
      className="w-full max-w-[688px]"
    >
      <title id="multi-pass-review-title">
        Per-file passes catch local issues; a separate integration pass catches cross-file ones
      </title>
      <desc id="multi-pass-review-desc">
        Three changed files each get their own local review pass, running
        in parallel with full attention on one file. All three feed a
        separate integration pass, which takes the local findings plus
        interface summaries and checks data flow and contracts between
        files. The result is combined findings with no contradictions
        between passes.
      </desc>
      <defs>
        <marker
          id="multi-pass-review-arrow"
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

      {files.map((f) => {
        const cyFile = f.y + 28;
        return (
          <g key={f.label}>
            <rect x="16" y={f.y} width="110" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x="71" y={cyFile + 5} textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {f.label}
            </text>

            <line x1="126" y1={cyFile} x2="150" y2={cyFile} stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-pass-review-arrow)" />

            <rect x="150" y={f.y} width="140" height="56" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            <text x="220" y={f.y + 22} textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              Local pass
            </text>
            <text x="220" y={f.y + 40} textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
              logic, null, leaks
            </text>
          </g>
        );
      })}

      {/* converge each local pass into the integration pass */}
      <line x1="290" y1="44" x2="328" y2="110" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-pass-review-arrow)" />
      <line x1="290" y1="140" x2="328" y2="140" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-pass-review-arrow)" />
      <line x1="290" y1="236" x2="328" y2="170" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-pass-review-arrow)" />

      <rect x="328" y="92" width="168" height="96" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="412" y="122" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Integration pass
      </text>
      <text x="412" y="142" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        cross-file flow
      </text>
      <text x="412" y="160" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        + local findings
      </text>

      <line x1="496" y1="140" x2="528" y2="140" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#multi-pass-review-arrow)" />

      <rect x="528" y="112" width="140" height="56" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="598" y="134" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Combined
      </text>
      <text x="598" y="152" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        no contradictions
      </text>
    </svg>
  );
}

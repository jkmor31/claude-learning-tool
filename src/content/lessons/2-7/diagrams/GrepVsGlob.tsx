const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const lines = [
  { text: "import { calculateTax }", hit: true, indent: 0 },
  { text: 'from "./tax";', hit: false, indent: 0 },
  { text: 'test("adds tax", () =>', hit: false, indent: 0 },
  { text: "calculateTax(100));", hit: true, indent: 16 },
];

function ToolBox({ y, name, pattern, note }: { y: number; name: string; pattern: string; note: string }) {
  return (
    <g>
      <rect x="16" y={y} width="152" height="80" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="92" y={y + 24} textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        {name}
      </text>
      <text x="92" y={y + 46} textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        {pattern}
      </text>
      <text x="92" y={y + 67} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        {note}
      </text>
    </g>
  );
}

export function GrepVsGlob() {
  return (
    <svg
      viewBox="0 0 480 256"
      role="img"
      aria-labelledby="grep-vs-glob-title grep-vs-glob-desc"
      className="w-full max-w-[480px]"
    >
      <title id="grep-vs-glob-title">Glob matches the path; Grep searches the contents</title>
      <desc id="grep-vs-glob-desc">
        One file, src/billing/tax.test.ts. Glob with the pattern star-star
        slash star dot test dot ts matches the file path without opening the
        file. Grep for calculateTax matches the two lines inside the file
        that contain that text.
      </desc>
      <defs>
        <marker
          id="grep-vs-glob-arrow"
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

      {/* the file */}
      <rect x="200" y="16" width="264" height="224" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="208" y="24" width="248" height="40" rx="6" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.25" />
      <text x="220" y="49" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        src/billing/tax.test.ts
      </text>
      <line x1="200" y1="72" x2="464" y2="72" stroke="var(--border)" strokeWidth="1.25" />
      <text x="452" y="92" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        contents
      </text>
      {lines.map((l, i) => {
        const y = 104 + i * 32;
        return (
          <g key={i}>
            {l.hit && <rect x="208" y={y} width="248" height="28" rx="4" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.25" />}
            <text x={220 + l.indent} y={y + 19} fontFamily={mono} fontSize="13" fill={l.hit ? "var(--foreground)" : "var(--muted)"}>
              {l.text}
            </text>
          </g>
        );
      })}

      {/* the tools */}
      <ToolBox y={16} name="Glob" pattern="**/*.test.ts" note="matches names" />
      <line x1="168" y1="44" x2="206" y2="44" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#grep-vs-glob-arrow)" />

      <ToolBox y={136} name="Grep" pattern="calculateTax" note="searches contents" />
      <path d="M168 176 H184 V118 H206" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#grep-vs-glob-arrow)" />
      <path d="M184 176 V214 H206" fill="none" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#grep-vs-glob-arrow)" />
    </svg>
  );
}

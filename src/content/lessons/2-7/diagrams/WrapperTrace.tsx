const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

const callers = [
  { file: "checkout.ts", uses: "uses chargeCard", viaAlias: false },
  { file: "renewals.ts", uses: "uses legacyCharge", viaAlias: true },
  { file: "admin.ts", uses: "uses legacyCharge", viaAlias: true },
];

function Caller({ x, y, file, uses, found }: { x: number; y: number; file: string; uses: string; found: boolean }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="184"
        height="48"
        rx="6"
        fill={found ? "var(--success-soft)" : "none"}
        stroke={found ? "var(--success)" : "var(--danger)"}
        strokeWidth="1.25"
        strokeDasharray={found ? undefined : "5 4"}
      />
      <text x={x + 12} y={y + 20} fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        {file}
      </text>
      <text x={x + 12} y={y + 38} fontFamily={sans} fontSize="12" fill="var(--muted)">
        {uses}
      </text>
      <text
        x={x + 172}
        y={y + 20}
        textAnchor="end"
        fontFamily={sans}
        fontSize="12"
        fontWeight="600"
        fill={found ? "var(--success)" : "var(--danger)"}
      >
        {found ? "found" : "missed"}
      </text>
    </g>
  );
}

export function WrapperTrace() {
  return (
    <svg
      viewBox="0 0 480 424"
      role="img"
      aria-labelledby="wrapper-trace-title wrapper-trace-desc"
      className="w-full max-w-[480px]"
    >
      <title id="wrapper-trace-title">Grepping one name vs every exported name</title>
      <desc id="wrapper-trace-desc">
        The wrapper module src/payments/index.ts exports chargeCard, the same
        function as legacyCharge, and everything from ./refunds. Grepping only
        for chargeCard finds checkout.ts but misses renewals.ts and admin.ts,
        which import legacyCharge. Collecting every exported name first and
        grepping for each finds all three callers.
      </desc>
      <defs>
        <marker
          id="wrapper-trace-arrow"
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

      {/* the wrapper module */}
      <rect x="96" y="16" width="288" height="112" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="42" textAnchor="middle" fontFamily={mono} fontSize="14" fontWeight="600" fill="var(--foreground)">
        src/payments/index.ts
      </text>
      <text x="112" y="68" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        chargeCard
      </text>
      <text x="112" y="90" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        chargeCard as legacyCharge
      </text>
      <text x="112" y="112" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        * from ./refunds
      </text>

      <line x1="160" y1="128" x2="124" y2="158" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#wrapper-trace-arrow)" />
      <line x1="320" y1="128" x2="356" y2="158" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#wrapper-trace-arrow)" />

      {/* one name only */}
      <rect x="16" y="160" width="216" height="248" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="124" y="188" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Grep chargeCard only
      </text>
      {callers.map((c, i) => (
        <Caller key={c.file} x={32} y={208 + i * 56} file={c.file} uses={c.uses} found={!c.viaAlias} />
      ))}
      <text x="124" y="392" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--danger)">
        1 of 3 callers
      </text>

      {/* every exported name */}
      <rect x="248" y="160" width="216" height="248" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="356" y="188" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="700" fill="var(--foreground)">
        Grep every name
      </text>
      {callers.map((c, i) => (
        <Caller key={c.file} x={264} y={208 + i * 56} file={c.file} uses={c.uses} found />
      ))}
      <text x="356" y="392" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--success)">
        all callers
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";

type Panel = {
  x: number;
  heading: string;
  lines: string[];
  verdict: string;
  reason: string;
  isRight: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    heading: "Guess by heuristic",
    lines: ["Pick the most recent account,", "or the matching area code"],
    verdict: "Risks the wrong account",
    reason: "may expose another customer's data",
    isRight: false,
  },
  {
    x: 304,
    heading: "Ask for another identifier",
    lines: ['"Could you confirm the email', 'or ZIP on the account?"'],
    verdict: "Confirms the right account",
    reason: "small cost, no guessing",
    isRight: true,
  },
];

export function AskDontGuess() {
  return (
    <svg
      viewBox="0 0 576 336"
      role="img"
      aria-labelledby="ask-dont-guess-title ask-dont-guess-desc"
      className="w-full max-w-[576px]"
    >
      <title id="ask-dont-guess-title">A lookup with multiple matches is resolved by asking, not by guessing</title>
      <desc id="ask-dont-guess-desc">
        A customer lookup by name returns three matching accounts.
        Guessing by heuristic, such as the most recently active account or
        one matching the customer&apos;s area code, risks selecting the
        wrong account and exposing another customer&apos;s data. Asking
        the customer to confirm an additional identifier, such as the
        email or ZIP code on the account, confirms the right account at a
        small cost.
      </desc>

      <rect x="16" y="16" width="544" height="40" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="288" y="41" textAnchor="middle" fontFamily={sans} fontSize="13" fill="var(--muted)">
        get_customer(name=&quot;Sam Rivera&quot;) → 3 matches
      </text>

      {panels.map((p) => {
        const cx = p.x + 128;
        const bx = p.x + 16;
        return (
          <g key={p.heading}>
            <rect x={p.x} y="72" width="256" height="192" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="96" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.heading}
            </text>

            <rect x={bx} y="108" width="224" height="76" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            {p.lines.map((line, i) => (
              <text key={i} x={cx} y={138 + i * 20} textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--foreground)">
                {line}
              </text>
            ))}

            <rect
              x={bx}
              y="192"
              width="224"
              height="56"
              rx="8"
              fill={p.isRight ? "var(--success-soft)" : "var(--danger-soft)"}
              stroke={p.isRight ? "var(--success)" : "var(--danger)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="214" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.verdict}
            </text>
            <text x={cx} y="232" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
              {p.reason}
            </text>
          </g>
        );
      })}

      <rect x="16" y="280" width="544" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="305" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Multiple matches call for another identifier, never a heuristic guess
      </text>
    </svg>
  );
}

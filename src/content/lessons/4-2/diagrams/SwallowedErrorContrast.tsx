const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Panel = {
  x: number;
  context: string;
  code: string[];
  verdict: string;
  reason: string;
  isIssue: boolean;
};

const panels: Panel[] = [
  {
    x: 16,
    context: "Cache read",
    code: ["catch (e) {", "  logger.warn(e);", "  return fallback; }"],
    verdict: "NOT an issue",
    reason: "miss is intended",
    isIssue: false,
  },
  {
    x: 304,
    context: "chargeCard()",
    code: ["catch (e) {", "  return null;", "}"],
    verdict: "IS an issue",
    reason: "silent free order",
    isIssue: true,
  },
];

export function SwallowedErrorContrast() {
  return (
    <svg
      viewBox="0 0 576 280"
      role="img"
      aria-labelledby="swallowed-error-contrast-title swallowed-error-contrast-desc"
      className="w-full max-w-[576px]"
    >
      <title id="swallowed-error-contrast-title">Context, not the shape of the catch, decides whether it is a genuine issue</title>
      <desc id="swallowed-error-contrast-desc">
        Two catch blocks that swallow an error look alike. In a cache read,
        logging the error and returning a fallback is not an issue, because
        a cache miss must never fail the request. In chargeCard, catching
        the error and returning null is a genuine issue, because the caller
        treats null as no charge needed and a payment failure silently
        becomes a free order. A contrast pair like this teaches the model
        the surrounding context that separates the two cases.
      </desc>

      {panels.map((p) => {
        const cx = p.x + 128;
        const bx = p.x + 16;
        return (
          <g key={p.context}>
            <rect x={p.x} y="16" width="256" height="192" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
            <text x={cx} y="40" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.context}
            </text>

            <rect x={bx} y="52" width="224" height="76" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
            {p.code.map((line, i) => (
              <text
                key={i}
                x={cx}
                y={74 + i * 18}
                textAnchor="middle"
                fontFamily={mono}
                fontSize="11"
                fill="var(--foreground)"
              >
                {line}
              </text>
            ))}

            <rect
              x={bx}
              y="136"
              width="224"
              height="56"
              rx="8"
              fill={p.isIssue ? "var(--danger-soft)" : "var(--success-soft)"}
              stroke={p.isIssue ? "var(--danger)" : "var(--success)"}
              strokeWidth="1.5"
            />
            <text x={cx} y="158" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
              {p.verdict}
            </text>
            <text x={cx} y="176" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
              {p.reason}
            </text>
          </g>
        );
      })}

      <rect x="16" y="224" width="544" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="288" y="249" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Context decides, not the shape of the catch
      </text>
    </svg>
  );
}

const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

type Row = {
  y: number;
  input: string;
  outputLine1: string;
  outputLine2: string;
  wrong?: string;
};

const rows: Row[] = [
  {
    y: 48,
    input: '"a pinch of salt"',
    outputLine1: "quantity: null",
    outputLine2: 'unit: "pinch"',
    wrong: "0.5 g",
  },
  {
    y: 136,
    input: '"2-3 cloves garlic"',
    outputLine1: "min: 2, max: 3",
    outputLine2: 'unit: "clove"',
    wrong: "2.5 cloves",
  },
  {
    y: 224,
    input: '"one 14-oz can beans"',
    outputLine1: "qty: 1",
    outputLine2: 'unit: "can (14 oz)"',
  },
];

export function InformalValueNormalization() {
  return (
    <svg
      viewBox="0 0 680 312"
      role="img"
      aria-labelledby="informal-value-normalization-title informal-value-normalization-desc"
      className="w-full max-w-[680px]"
    >
      <title id="informal-value-normalization-title">Few-shot examples keep informal quantities honest instead of invented</title>
      <desc id="informal-value-normalization-desc">
        A pinch of salt is extracted as a null quantity with the unit
        pinch, not invented as 0.5 grams. 2 to 3 cloves of garlic is kept
        as a minimum of 2 and a maximum of 3, not averaged to 2.5 cloves.
        One 14-ounce can of beans is extracted as a quantity of 1 with the
        unit can, 14 ounces, keeping the package size instead of converting
        it. The two invented values on the right are what the model
        produces without these examples.
      </desc>

      <text x="116" y="32" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        Raw phrase
      </text>
      <text x="388" y="32" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        Correct extraction
      </text>
      <text x="600" y="32" textAnchor="middle" fontFamily={sans} fontSize="11" fill="var(--muted)">
        Avoid inventing
      </text>

      {rows.map((r) => (
        <g key={r.input}>
          <rect x="16" y={r.y} width="200" height="72" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
          <text x="116" y={r.y + 40} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {r.input}
          </text>

          <rect x="248" y={r.y} width="280" height="72" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
          <text x="388" y={r.y + 32} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {r.outputLine1}
          </text>
          <text x="388" y={r.y + 52} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--foreground)">
            {r.outputLine2}
          </text>

          {r.wrong && (
            <g>
              <rect
                x="536"
                y={r.y + 8}
                width="128"
                height="56"
                rx="8"
                fill="var(--danger-soft)"
                stroke="var(--danger)"
                strokeWidth="1.25"
                strokeDasharray="5 4"
              />
              <text x="600" y={r.y + 28} textAnchor="middle" fontFamily={sans} fontSize="10" fill="var(--muted)">
                not:
              </text>
              <text
                x="600"
                y={r.y + 48}
                textAnchor="middle"
                fontFamily={mono}
                fontSize="13"
                fontWeight="700"
                textDecoration="line-through"
                fill="var(--danger)"
              >
                {r.wrong}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

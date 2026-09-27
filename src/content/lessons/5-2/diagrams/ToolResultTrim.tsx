const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function ToolResultTrim() {
  return (
    <svg
      viewBox="0 0 640 328"
      role="img"
      aria-labelledby="tool-result-trim-title tool-result-trim-desc"
      className="w-full max-w-[640px]"
    >
      <title id="tool-result-trim-title">Trimming a verbose tool result keeps only the fields each role needs</title>
      <desc id="tool-result-trim-desc">
        A lookup_order result with 43 fields, including warehouse_id,
        fraud_score, and tax_region, is trimmed either in the tool itself
        or in a PostToolUse hook. A returns agent keeps order_id,
        delivered_at, items, return_window_ends, and return_eligible. A
        fraud agent keeps a different set from the same lookup: order_id,
        fraud_score, ip_address, payment_method, and customer_id.
      </desc>
      <defs>
        <marker id="tool-result-trim-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
      </defs>

      <rect x="120" y="16" width="400" height="48" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.25" />
      <text x="320" y="36" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        lookup_order result — 43 fields
      </text>
      <text x="320" y="54" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--muted)">
        warehouse_id, fraud_score, tax_region, ...
      </text>

      <line x1="320" y1="64" x2="320" y2="104" stroke="var(--muted)" strokeWidth="1.5" />
      <text x="334" y="88" fontFamily={sans} fontSize="11" fill="var(--muted)">
        trim: in the tool, or a
      </text>
      <text x="334" y="102" fontFamily={sans} fontSize="11" fill="var(--muted)">
        PostToolUse hook
      </text>

      <line x1="320" y1="104" x2="168" y2="136" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#tool-result-trim-arrow)" />
      <line x1="320" y1="104" x2="488" y2="136" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#tool-result-trim-arrow)" />

      <rect x="32" y="136" width="272" height="112" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="168" y="156" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Returns agent keeps
      </text>
      <text x="168" y="176" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        order_id
      </text>
      <text x="168" y="194" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        delivered_at, items
      </text>
      <text x="168" y="212" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        return_window_ends, return_eligible
      </text>

      <rect x="352" y="136" width="272" height="112" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="488" y="156" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="700" fill="var(--foreground)">
        Fraud agent keeps
      </text>
      <text x="488" y="176" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        order_id
      </text>
      <text x="488" y="194" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        fraud_score, ip_address
      </text>
      <text x="488" y="212" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--foreground)">
        payment_method, customer_id
      </text>

      <rect x="16" y="264" width="608" height="40" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="320" y="289" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--foreground)">
        Trim to the fields each role needs — not globally
      </text>
    </svg>
  );
}

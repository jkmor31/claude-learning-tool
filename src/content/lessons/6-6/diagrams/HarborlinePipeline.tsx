const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function HarborlinePipeline() {
  return (
    <svg
      viewBox="0 0 480 656"
      role="img"
      aria-labelledby="harborline-pipeline-title harborline-pipeline-desc"
      className="w-full max-w-[480px]"
    >
      <title id="harborline-pipeline-title">
        Harborline invoice extraction pipeline
      </title>
      <desc id="harborline-pipeline-desc">
        Documents arrive two ways: urgent ones through a synchronous call, the
        nightly run through Message Batches with the document id as custom_id.
        Both go to the extraction call, which uses the extract_invoice tool with
        a strict JSON schema, normalization rules and two to four examples of
        different layouts. Your validator runs schema and semantic checks. A
        fixable error goes to a retry with the document, the output and the
        exact errors, which loops back to extraction; once the retry cap is hit,
        the record goes to human review. Valid records, and records whose
        information is absent (null stays null, no retry), go to a router that
        uses calibrated field confidence and conflict flags. High-confidence
        records go to the ERP with a stratified QA sample; low-confidence or
        conflicting records go to the human review queue.
      </desc>
      <defs>
        <marker
          id="harborline-pipeline-arrow"
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

      {/* documents */}
      <rect
        x="176"
        y="16"
        width="128"
        height="40"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x="240"
        y="41"
        textAnchor="middle"
        fontFamily={sans}
        fontSize="14"
        fill="var(--foreground)"
      >
        Documents
      </text>
      <path
        d="M240 56 V68 M124 68 H356"
        fill="none"
        stroke="var(--muted)"
        strokeWidth="1.5"
      />
      <line
        x1="124"
        y1="68"
        x2="124"
        y2="86"
        stroke="var(--muted)"
        strokeWidth="1.5"
        markerEnd="url(#harborline-pipeline-arrow)"
      />
      <line
        x1="356"
        y1="68"
        x2="356"
        y2="86"
        stroke="var(--muted)"
        strokeWidth="1.5"
        markerEnd="url(#harborline-pipeline-arrow)"
      />

      {/* intake paths */}
      <rect
        x="16"
        y="88"
        width="216"
        height="68"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x="32"
        y="109"
        fontFamily={sans}
        fontSize="13"
        fontWeight="600"
        fill="var(--foreground)"
      >
        Urgent
      </text>
      <text
        x="216"
        y="109"
        textAnchor="end"
        fontFamily={sans}
        fontSize="12"
        fill="var(--muted)"
      >
        4.7
      </text>
      <text x="32" y="128" fontFamily={sans} fontSize="12" fill="var(--muted)">
        synchronous call
      </text>

      <rect
        x="248"
        y="88"
        width="216"
        height="68"
        rx="8"
        fill="var(--background)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      <text
        x="264"
        y="109"
        fontFamily={sans}
        fontSize="13"
        fontWeight="600"
        fill="var(--foreground)"
      >
        Nightly
      </text>
      <text
        x="448"
        y="109"
        textAnchor="end"
        fontFamily={sans}
        fontSize="12"
        fill="var(--muted)"
      >
        4.7
      </text>
      <text x="264" y="128" fontFamily={sans} fontSize="12" fill="var(--muted)">
        Message Batches API
      </text>
      <text x="264" y="145" fontFamily={mono} fontSize="12" fill="var(--muted)">
        custom_id = document id
      </text>

      <g transform="translate(0 16)">
        {/* merge into extraction */}
        <path
          d="M124 140 V152 M356 140 V152 M124 152 H356"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <line
          x1="152"
          y1="152"
          x2="152"
          y2="170"
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#harborline-pipeline-arrow)"
        />

        {/* extraction call */}
        <rect
          x="16"
          y="172"
          width="272"
          height="128"
          rx="10"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <text
          x="32"
          y="196"
          fontFamily={sans}
          fontSize="15"
          fontWeight="700"
          fill="var(--foreground)"
        >
          Extraction call
        </text>
        <text
          x="272"
          y="196"
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          4.4
        </text>
        <text
          x="32"
          y="220"
          fontFamily={sans}
          fontSize="13"
          fill="var(--foreground)"
        >
          tool: <tspan fontFamily={mono}>extract_invoice</tspan>
        </text>
        <text
          x="32"
          y="240"
          fontFamily={sans}
          fontSize="13"
          fill="var(--foreground)"
        >
          strict JSON schema
        </text>
        <text
          x="272"
          y="240"
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          4.5
        </text>
        <text
          x="32"
          y="264"
          fontFamily={sans}
          fontSize="13"
          fill="var(--foreground)"
        >
          normalization rules
        </text>
        <text
          x="32"
          y="284"
          fontFamily={sans}
          fontSize="13"
          fill="var(--foreground)"
        >
          2–4 layout examples
        </text>
        <text
          x="272"
          y="284"
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          4.3
        </text>

        {/* validator */}
        <line
          x1="152"
          y1="300"
          x2="152"
          y2="326"
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#harborline-pipeline-arrow)"
        />
        <rect
          x="16"
          y="328"
          width="272"
          height="56"
          rx="8"
          fill="var(--background)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="32"
          y="351"
          fontFamily={sans}
          fontSize="14"
          fontWeight="600"
          fill="var(--foreground)"
        >
          Validator (your code)
        </text>
        <text
          x="272"
          y="351"
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          4.6
        </text>
        <text
          x="32"
          y="372"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          schema + semantic checks
        </text>

        {/* retry loop */}
        <line
          x1="288"
          y1="356"
          x2="326"
          y2="356"
          stroke="var(--muted)"
          strokeWidth="1.5"
          markerEnd="url(#harborline-pipeline-arrow)"
        />
        <rect
          x="328"
          y="312"
          width="136"
          height="88"
          rx="8"
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="344"
          y="333"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          fixable error
        </text>
        <text
          x="344"
          y="353"
          fontFamily={sans}
          fontSize="13"
          fontWeight="600"
          fill="var(--foreground)"
        >
          Retry with
        </text>
        <text
          x="344"
          y="371"
          fontFamily={sans}
          fontSize="12"
          fill="var(--foreground)"
        >
          document, output,
        </text>
        <text
          x="344"
          y="388"
          fontFamily={sans}
          fontSize="12"
          fill="var(--foreground)"
        >
          exact errors
        </text>
        <path
          d="M396 312 V236 H290"
          fill="none"
          stroke="var(--muted)"
          strokeWidth="1.5"
          markerEnd="url(#harborline-pipeline-arrow)"
        />

        {/* retry cap reached -> human review */}
        <line
          x1="396"
          y1="400"
          x2="396"
          y2="542"
          stroke="var(--muted)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
          markerEnd="url(#harborline-pipeline-arrow)"
        />
        <text
          x="404"
          y="468"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          retry cap
        </text>
        <text
          x="404"
          y="484"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          reached
        </text>

        {/* validator -> router */}
        <line
          x1="152"
          y1="384"
          x2="152"
          y2="430"
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#harborline-pipeline-arrow)"
        />
        <text
          x="162"
          y="403"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          valid, or info absent:
        </text>
        <text
          x="162"
          y="419"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          null stays null, no retry
        </text>

        {/* router */}
        <rect
          x="16"
          y="432"
          width="272"
          height="72"
          rx="8"
          fill="var(--background)"
          stroke="var(--border)"
          strokeWidth="1.5"
        />
        <text
          x="32"
          y="455"
          fontFamily={sans}
          fontSize="14"
          fontWeight="600"
          fill="var(--foreground)"
        >
          Router
        </text>
        <text
          x="272"
          y="455"
          textAnchor="end"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          5.6
        </text>
        <text
          x="32"
          y="475"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          calibrated field confidence
        </text>
        <text
          x="32"
          y="493"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          conflict flags
        </text>

        {/* router -> outcomes */}
        <path
          d="M152 504 V520 M124 520 H356"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        />
        <line
          x1="124"
          y1="520"
          x2="124"
          y2="542"
          stroke="var(--success)"
          strokeWidth="2"
          markerEnd="url(#harborline-pipeline-arrow)"
        />
        <line
          x1="356"
          y1="520"
          x2="356"
          y2="542"
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#harborline-pipeline-arrow)"
        />

        <rect
          x="16"
          y="544"
          width="216"
          height="80"
          rx="8"
          fill="var(--success-soft)"
          stroke="var(--success)"
          strokeWidth="1.5"
        />
        <text
          x="124"
          y="568"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="14"
          fontWeight="600"
          fill="var(--foreground)"
        >
          ERP
        </text>
        <text
          x="124"
          y="588"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          high confidence
        </text>
        <text
          x="124"
          y="608"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          + stratified QA sample
        </text>

        <rect
          x="248"
          y="544"
          width="216"
          height="80"
          rx="8"
          fill="var(--accent-soft)"
          stroke="var(--accent)"
          strokeWidth="1.5"
        />
        <text
          x="356"
          y="568"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="14"
          fontWeight="600"
          fill="var(--foreground)"
        >
          Human review queue
        </text>
        <text
          x="356"
          y="588"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          low confidence
        </text>
        <text
          x="356"
          y="608"
          textAnchor="middle"
          fontFamily={sans}
          fontSize="12"
          fill="var(--muted)"
        >
          or conflict
        </text>
      </g>
    </svg>
  );
}

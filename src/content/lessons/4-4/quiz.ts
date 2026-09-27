import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A pipeline asks Claude to \"return the invoice fields as JSON\" and parses the response text with json.loads. About 0.8% of 60,000 monthly documents fail to parse because of trailing commas, unescaped quotes, or a sentence before the JSON.",
    prompt: "What is the most reliable fix?",
    choices: [
      "Add \"Return ONLY valid JSON, no other text\" to the prompt in bold.",
      "Define an extraction tool whose input_schema describes the invoice fields, and read the structured data from the tool_use block's input.",
      "Write a regex-based repair step that fixes common JSON errors before parsing.",
      "Lower the temperature to 0 so the output is always valid.",
    ],
    correct: [1],
    explanation:
      "Tool use with a JSON schema is the most reliable way to get schema-compliant output, and it eliminates syntax errors, because the input arrives already parsed (B). Firmer prompt wording (A) reduces but doesn't eliminate the failures. Regex repair (C) is fragile and can silently corrupt values. Temperature 0 (D) doesn't guarantee valid JSON.",
  },
  {
    type: "single",
    scenario:
      "After switching to tool use with a strict JSON schema, an invoice pipeline has zero parse failures. But a finance audit finds that 3% of extractions report a total that doesn't match the sum of the extracted line items.",
    prompt: "How should the team think about this?",
    choices: [
      "The schema is misconfigured, because a strict schema should prevent this.",
      "Switch back to plain JSON output, which handles arithmetic better.",
      "Add more required fields to the schema until the totals match.",
      "This is a semantic error, which schemas don't prevent. Add validation that compares the line-item sum with the total, and handle mismatches.",
    ],
    correct: [3],
    explanation:
      "Strict schemas eliminate syntax and structural errors but not semantic ones like totals that don't add up; those need validation (D). A correctly configured schema still can't check arithmetic (A). Plain JSON (B) brings back syntax failures without fixing semantics. More required fields (C) don't make values consistent with each other.",
  },
  {
    type: "multi",
    scenario:
      "A document-processing service receives invoices, receipts, and purchase orders, unlabeled. Each type has its own extraction tool and schema. The service must always get structured output, never a prose reply.",
    prompt: "Which TWO statements describe the right setup?",
    choices: [
      "Define all three extraction tools and set tool_choice to {\"type\": \"any\"}, so the model must call one and chooses which schema fits.",
      "Force extract_invoice for every document, since invoices are most common.",
      "Read the extracted fields from the input of the tool_use block the model returns.",
      "Use tool_choice \"auto\", since the model usually calls a tool anyway.",
      "Ask the model to return JSON in text and choose the schema itself.",
    ],
    correct: [0, 2],
    explanation:
      "\"any\" guarantees a tool call while letting the model choose the right schema (A), and the data comes from the tool_use input (C). Forcing one extractor (B) pushes receipts and purchase orders into the invoice schema. \"auto\" (D) allows occasional prose replies. Text JSON (E) reintroduces syntax failures.",
  },
  {
    type: "single",
    scenario:
      "An extraction tool's schema defines invoice_date as a string. Across vendors, results include \"2026-05-03\", \"03/05/2026\", \"May 3rd, 2026\", and \"3.5.26\". All pass schema validation, but downstream date parsing fails on most of them.",
    prompt: "What is the best fix?",
    choices: [
      "Remove invoice_date from the schema.",
      "Add a retry that re-extracts any date not in ISO format.",
      "Add normalization rules to the prompt (and the field description) requiring YYYY-MM-DD, including how to handle ambiguous day and month order.",
      "Change the field's type to number.",
    ],
    correct: [2],
    explanation:
      "The schema guarantees a string but not which format, so normalization rules alongside the schema make values consistent (C). Removing the field (A) loses needed data. Retries (B) spend extra calls fixing what an upfront rule prevents. A number type (D) doesn't represent dates and doesn't settle day versus month order.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about structured output with tool use are correct?",
    choices: [
      "A strict JSON schema guarantees the extracted values are factually correct.",
      "Tool use with a JSON schema eliminates JSON syntax errors in the output.",
      "tool_choice \"auto\" guarantees the model calls a tool.",
      "With tool use, you must still parse a JSON string from the response text.",
      "Values placed in the wrong field are a semantic error that the schema doesn't catch.",
    ],
    correct: [1, 4],
    explanation:
      "Tool use with a schema eliminates syntax errors (B), and a value in the wrong field is a semantic error the schema can't detect (E). Schemas don't guarantee correctness (A). \"auto\" lets the model reply with text instead (C). The tool_use input arrives already parsed (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Replace text JSON with a tool-based extractor and measure the difference",
  context:
    "Build the same extraction two ways, prompt-requested JSON versus a tool with a JSON schema, and measure syntax, structural, and semantic errors separately. Work in ccarf-lab/exercises/4-4/.",
  requirements: [
    "Create 40 varied invoice or receipt texts, including line items, several date formats and currencies, and a few with deliberately inconsistent totals.",
    "Version A: ask for JSON in the prompt, parse the text with a JSON parser, and log parse failures and schema violations.",
    "Version B: define an extraction tool (with strict: true if your model supports it), force or require the tool call, and read the tool_use input.",
    "Add a validation step to both: check that the line items sum to the total and that dates parse as ISO.",
    "Add normalization rules to Version B's prompt and field descriptions, and rerun.",
  ],
  successCriteria: [
    "A table shows syntax errors, structural errors, and semantic errors for each version.",
    "Version B has zero syntax errors, and its semantic errors are caught by validation rather than slipping through.",
    "After the normalization rules, every date in Version B's output parses as YYYY-MM-DD.",
  ],
  stretchGoals: [
    "Add a second and third document type with their own tools and use tool_choice any. Measure how often the right schema is chosen.",
    "Try the same extraction with structured outputs (output_config.format) and compare with the tool approach.",
  ],
};

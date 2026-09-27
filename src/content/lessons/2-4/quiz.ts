import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your extraction pipeline defines three tools: extract_invoice, extract_receipt, and extract_purchase_order, each with its own JSON schema. Documents arrive unlabeled. With the default tool_choice, about 4% of responses are a prose summary with no tool call, which breaks the downstream parser.",
    prompt: "What is the best configuration change?",
    choices: [
      "Force extract_invoice with {\"type\": \"tool\", \"name\": \"extract_invoice\"}, since invoices are the most common type.",
      "Set tool_choice to {\"type\": \"any\"}, so the model must call one of the extraction tools while still choosing which schema fits.",
      "Keep auto and add \"Always respond with a tool call\" to the system prompt.",
      "Keep auto and raise max_tokens so the model has room to call a tool.",
    ],
    correct: [1],
    explanation:
      "\"any\" guarantees a tool call instead of conversational text, and it leaves the model free to pick the right schema, which is exactly what you need when the document type is unknown (Task 2.3). Forcing one extractor (A) would push receipts and purchase orders into the invoice schema. A prompt instruction (C) is probabilistic. max_tokens (D) has nothing to do with whether the model chooses a tool.",
  },
  {
    type: "single",
    scenario:
      "In a document-enrichment pipeline, extract_metadata must always run before the enrichment tools (lookup_company, classify_sector), because they need its output. Sometimes the model skips straight to lookup_company using a guessed company name.",
    prompt: "How should you configure tool_choice?",
    choices: [
      "Set tool_choice to \"any\" on every request.",
      "Remove the enrichment tools from the request entirely.",
      "Add few-shot examples showing extract_metadata being called first.",
      "Force {\"type\": \"tool\", \"name\": \"extract_metadata\"} on the first request, then use \"auto\" for the follow-up turns that handle enrichment.",
    ],
    correct: [3],
    explanation:
      "Forced selection guarantees the specific first step, and switching back to auto lets the model choose enrichment steps and finish normally. That's the guide's pattern. \"any\" (A) guarantees some tool call, not extract_metadata specifically. Removing the enrichment tools (B) breaks the pipeline's later steps. Few-shot examples (C) are probabilistic.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about tool_choice are correct?",
    choices: [
      "With \"auto\", the model may return text instead of calling a tool.",
      "With \"any\", the model must call the specific tool you name.",
      "With {\"type\": \"tool\", \"name\": \"X\"}, the model must call tool X.",
      "With \"none\", the model must call at least one tool.",
      "\"any\" guarantees that the extracted values are semantically correct.",
    ],
    correct: [0, 2],
    explanation:
      "auto lets the model choose text or tools (A), and forced selection requires the named tool (C). \"any\" requires some tool but lets the model choose which one (B). \"none\" prevents tool calls (D). No tool_choice setting guarantees correct values (E). It guarantees a call and well-formed arguments, and semantic errors still need validation.",
  },
  {
    type: "single",
    scenario:
      "To make sure an agent always uses its tools, a developer sets tool_choice to {\"type\": \"any\"} on every request in the agentic loop. Now every run ends only when the iteration backstop is hit, and users never get a final answer.",
    prompt: "What is the cause and the fix?",
    choices: [
      "The backstop is too low. Raise it so the agent has room to finish.",
      "The tools' descriptions are unclear. Rewrite them so the agent knows when it's done.",
      "Forcing a tool call on every turn means the model can never respond with text and end_turn. Force only where a call is required, and use auto for the rest.",
      "Switch to tool_choice \"none\" for the whole loop.",
    ],
    correct: [2],
    explanation:
      "With any (or forced selection) on every request, a text-only final answer is impossible, so the loop never ends naturally. Force only the step that must happen, and let later turns use auto. Raising the backstop (A) just makes the runaway loop longer. Descriptions (B) aren't the problem. \"none\" for the whole loop (D) disables tools entirely.",
  },
  {
    type: "multi",
    prompt: "Which TWO are appropriate uses of tool_choice {\"type\": \"any\"}?",
    choices: [
      "Letting the model decide freely between calling a tool and replying in text",
      "Guaranteeing the model calls a tool rather than returning conversational text",
      "Ensuring one specific named tool runs before any others",
      "Preventing the model from using tools on a text-only turn",
      "Getting structured output when several extraction schemas exist and the document type isn't known in advance",
    ],
    correct: [1, 4],
    explanation:
      "\"any\" guarantees a tool call (B) and is especially useful when the model must choose among several schemas (E). Free choice between text and tools is auto (A). Ensuring one specific tool runs is forced selection (C). Preventing tool use is none (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Control tool calls with tool_choice in an extraction pipeline",
  context:
    "Build a small document pipeline that uses every tool_choice mode deliberately. Use the Messages API directly so you control tool_choice on each request. Work in ccarf-lab/exercises/2-4/.",
  requirements: [
    "Create 20 short sample documents: invoices, receipts, and purchase orders, plus two ambiguous or messy ones. Define an extraction tool for each type with its own input_schema.",
    "Run all 20 with tool_choice auto and count responses that contain no tool call.",
    "Rerun with tool_choice any. Count responses with no tool call, and responses where the wrong document type's schema was chosen.",
    "Add an enrichment step: an extract_metadata tool plus lookup_company and classify_sector. Force extract_metadata on the first request, then switch to auto, and confirm from your logs that extract_metadata always comes first.",
    "Deliberately send tool_choice any on every turn of the enrichment loop (with a backstop of 8) and record what happens.",
    "Add one semantic check to the extraction step, such as line items summing to the stated total, and record how many any-mode extractions were well-formed but wrong.",
  ],
  successCriteria: [
    "The any runs have zero text-only responses. Record the auto-mode count next to it.",
    "In the forced-first runs, extract_metadata is the first tool call every time, and the loop ends with end_turn.",
    "The every-turn-forced run hits the backstop, and your notes explain why.",
    "Your semantic-check results show that tool_choice guarantees structure, not correctness.",
  ],
  stretchGoals: [
    "Try the same pipeline on a model that rejects forced tool use. Handle the error by falling back to auto plus an explicit instruction, and check that a tool call was actually made.",
    "Add disable_parallel_tool_use to the enrichment step and compare latency and ordering with parallel calls allowed.",
  ],
};

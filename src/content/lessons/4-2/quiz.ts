import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A review system's prompt has a detailed paragraph describing the required output: file and line, a description of the issue, a severity, and a concrete suggested fix. Output still varies: some findings omit the fix, some are paragraphs, and some put the severity first.",
    prompt: "What is the most effective change?",
    choices: [
      "Add two or three few-shot examples of complete findings in exactly the desired format.",
      "Write the format description in capital letters.",
      "Add \"Follow the format exactly\" at the end of the prompt.",
      "Lower max_tokens so the findings are shorter.",
    ],
    correct: [0],
    explanation:
      "Few-shot examples are the most effective way to get consistent format when detailed instructions alone are inconsistent (A). Capital letters (B) and an extra reminder (C) repeat the instruction that's already failing. A token limit (D) truncates output rather than shaping it.",
  },
  {
    type: "multi",
    scenario:
      "A support agent has get_order_status and get_shipment_tracking tools. For requests like \"any news on my order?\" or \"is 5521 on its way?\", it picks inconsistently between them, even with good tool descriptions.",
    prompt: "Which TWO techniques follow the guide's approach?",
    choices: [
      "Add a rule listing every possible customer phrasing and which tool it maps to.",
      "Merge the two tools into one so there's no choice to make.",
      "Add 2–4 few-shot examples of ambiguous requests, each showing which tool was chosen and why the other was rejected.",
      "Choose example requests that sit at the boundary between the tools rather than obvious cases.",
      "Add ten examples of clear-cut requests like \"track my package.\"",
    ],
    correct: [2, 3],
    explanation:
      "Targeted examples with reasoning about the rejected alternative (C), chosen at the ambiguous boundary (D), teach the judgment and generalize to new phrasings. A phrasing lookup table (A) can't cover novel requests. Merging tools (B) removes a useful distinction instead of teaching it. Clear-cut examples (E) don't address the ambiguous cases that are failing.",
  },
  {
    type: "single",
    scenario:
      "A code-review prompt flags every caught exception that isn't re-thrown. Many flags are false positives: in cache and telemetry code, swallowing errors is intended. But a swallowed error in payment code last month caused real losses.",
    prompt: "Which approach best reduces false positives while still catching the dangerous cases?",
    choices: [
      "Stop flagging swallowed exceptions entirely.",
      "Keep flagging all of them, since some are dangerous.",
      "Ask the model to flag only swallowed exceptions it's highly confident about.",
      "Add few-shot examples contrasting an acceptable swallowed error (a cache read with a logged fallback) with a genuine issue (a payment call returning null), explaining why context makes the difference.",
    ],
    correct: [3],
    explanation:
      "Contrast pairs showing acceptable versus genuine cases, with the reasoning, reduce false positives while letting the model generalize the judgment (D). Stopping the check (A) misses the payment case. Flagging everything (B) keeps the noise. Confidence filtering (C) doesn't teach the distinction between the two contexts.",
  },
  {
    type: "single",
    prompt: "Why do few-shot examples that include reasoning generalize better than a list of specific rules?",
    choices: [
      "The model memorizes the examples and only matches inputs that look like them.",
      "The reasoning shows the underlying principle, so the model can apply the same judgment to inputs that don't match any listed case.",
      "Examples make the prompt shorter than rules.",
      "Rules are ignored by the model, while examples are always followed.",
    ],
    correct: [1],
    explanation:
      "Reasoning conveys the principle behind each choice, which is what transfers to novel cases (B). Pure surface matching (A) is what happens without the reasoning. Examples usually make prompts longer (C). Rules aren't ignored (D); they just can't anticipate every case.",
  },
  {
    type: "multi",
    prompt: "Which TWO are good practices when writing few-shot examples for ambiguous judgment?",
    choices: [
      "Use a small number of examples, typically 2–4, that target the hard cases.",
      "Make all examples nearly identical so the pattern is unmistakable.",
      "Include only the final answer, never the reasoning, to save tokens.",
      "Use as many examples as possible, since more examples always improve accuracy.",
      "Show why a plausible alternative was rejected, not only which choice was made.",
    ],
    correct: [0, 4],
    explanation:
      "A few targeted examples (A) that explain why the alternative lost (E) teach generalizable judgment. Near-identical examples (B) encourage latching onto incidental features. Dropping the reasoning (C) loses the principle. Piling on examples (D) bloats the prompt and can narrow behavior.",
  },
];

export const bonus: BonusScenario = {
  title: "Teach an ambiguous routing decision with few-shot examples",
  context:
    "Build a small ticket router with overlapping categories, and measure how few-shot examples with reasoning change its consistency on cases it has never seen. Work in ccarf-lab/exercises/4-2/.",
  requirements: [
    "Define four routing targets with real overlap, such as billing, account_access, technical_issue, and order_status, and a structured output (tool or JSON schema) with target and reason.",
    "Write 30 test tickets, including at least 12 ambiguous ones that could reasonably go to two targets. Label the correct target and a one-line justification for each.",
    "Baseline: instructions and descriptions only. Run all 30 three times and measure accuracy and run-to-run agreement on the ambiguous tickets.",
    "Add 3 few-shot examples at the boundaries, each showing the chosen target, the rejected alternative, and why. None of your test tickets may appear in them.",
    "Rerun three times, and compare accuracy and agreement on the ambiguous tickets.",
    "Add a format example for the reason field and check whether reasons become consistently specific.",
  ],
  successCriteria: [
    "Accuracy and run-to-run agreement on the ambiguous tickets both improve with the few-shot examples. Record the numbers.",
    "At least one ambiguous ticket unlike any example is now routed correctly, showing generalization.",
    "Reasons follow the demonstrated format in every output.",
  ],
  stretchGoals: [
    "Remove the reasoning from the examples (keep only the answer) and measure what's lost.",
    "Try 1, 3, and 8 examples and plot accuracy against the number of examples.",
  ],
};

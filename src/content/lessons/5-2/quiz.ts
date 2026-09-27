import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A synthesis agent receives ten subagent reports concatenated into one long input and writes an executive summary. Audits show that findings from the first two and last two reports almost always appear in the summary, while important findings from reports 4 through 7 are often missing.",
    prompt: "What is the best change to the input?",
    choices: [
      "Shuffle the report order on each run so every report sometimes lands at the start.",
      "Remove reports 4 through 7 to shorten the input.",
      "Ask the synthesis agent to read the input twice.",
      "Put a key-findings summary at the beginning of the input and organize the detailed reports under explicit section headers.",
    ],
    correct: [3],
    explanation:
      "This is the \"lost in the middle\" effect, and the guide's mitigations are a key-findings summary at the start plus clear section headers (D). Shuffling (A) just moves which findings get lost on each run. Removing reports (B) discards real findings. \"Read twice\" (C) doesn't change how attention is distributed over a long input.",
  },
  {
    type: "multi",
    scenario:
      "A returns agent calls lookup_order for each order a customer mentions. Each result has 45 fields, including warehouse IDs, picker IDs, fraud scores and tax regions. Only about five fields matter for returns. In sessions with several orders, the agent starts confusing orders and running out of context.",
    prompt: "Which TWO changes follow the guide's approach?",
    choices: [
      "Upgrade to a model with a larger context window and change nothing else.",
      "Trim each lookup result to the return-relevant fields, such as delivery date, items, return window and eligibility, before it enters the context.",
      "Do the trimming in the tool itself or in a PostToolUse hook, so the verbose fields never accumulate in the conversation.",
      "Ask the model to ignore irrelevant fields.",
      "Summarize the conversation after each lookup.",
    ],
    correct: [1, 2],
    explanation:
      "Trimming verbose output to the relevant fields (B), in the tool or a PostToolUse hook before it accumulates (C), keeps context lean and focused. A bigger window (A) delays the problem and doesn't remove the noise. \"Ignore irrelevant fields\" (D) still spends the tokens and attention. Summarizing after each lookup (E) risks blurring the few fields that matter.",
  },
  {
    type: "single",
    scenario:
      "Research subagents each return about 3,000 words of narrative, including their reasoning and dead ends. The synthesis agent has a limited context budget, and with eight subagents it can't fit all the reports.",
    prompt: "What is the best change?",
    choices: [
      "Modify the subagents to return structured data (key facts, citations and relevance scores) instead of verbose content and reasoning chains.",
      "Truncate each report to its first 500 words.",
      "Run the synthesis agent once per report and concatenate the eight syntheses.",
      "Drop the lowest-quality half of the subagents.",
    ],
    correct: [0],
    explanation:
      "When downstream context is limited, upstream agents should return compact structured data rather than narrative (A). Truncation (B) cuts arbitrarily, often losing the conclusions. Per-report syntheses (C) never combine the evidence into one view. Dropping subagents (D) loses coverage.",
  },
  {
    type: "single",
    scenario:
      "A synthesis agent must reconcile two findings that conflict: one says a treatment is effective and the other says it isn't. The subagents returned only the claims, with no dates, source locations or study designs.",
    prompt: "What would most improve the synthesis?",
    choices: [
      "Tell the synthesis agent to choose the more plausible claim.",
      "Require subagents to include metadata such as publication date, source location and methodological context (for example, RCT vs cohort and sample size) in their structured output.",
      "Discard both conflicting findings.",
      "Ask the synthesis agent to average the two findings.",
    ],
    correct: [1],
    explanation:
      "Metadata lets synthesis weigh conflicting findings by recency, source and evidence strength (B). Picking the \"more plausible\" one (A) is a guess without that information. Discarding both (C) loses real evidence. Averaging claims (D) isn't meaningful for contradictory conclusions.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about context use are correct?",
    choices: [
      "Models reliably use information at the beginning and end of long inputs, but may overlook findings in the middle.",
      "Tool results take up context in proportion to how relevant they are.",
      "The order of sections in a long input has no effect on what the model uses.",
      "Adding more raw detail always improves an agent's accuracy.",
      "Verbose tool results can consume tokens far out of proportion to their relevance, so trimming them early helps.",
    ],
    correct: [0, 4],
    explanation:
      "Position effects mean the middle of long inputs is at risk (A), and verbose tool results waste context, so trimming helps (E). Token use isn't tied to relevance (B); a 45-field result costs the same whether 5 or 45 fields matter. Position matters (C). More raw detail often buries what matters (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Measure lost-in-the-middle and fix it",
  context:
    "Demonstrate position effects on a real synthesis task, then fix them with input structure and upstream changes. Work in ccarf-lab/exercises/5-2/.",
  requirements: [
    "Write 12 short research reports (about 400 words each) on one topic, and plant one distinctive, important finding in each. Record the 12 findings as ground truth.",
    "Baseline: concatenate the reports in order with no structure and ask for a synthesis. Score which planted findings appear, by report position. Repeat 3 times.",
    "Structured input: add a key-findings section at the top (generated by a cheap first pass) and section headers per report. Score again, 3 times.",
    "Upstream change: have each report producer return a structured record (claim, source, date, method, relevance) instead of prose, and synthesize from those records.",
    "Separately, build a lookup_order tool that returns 40+ fields, add a PostToolUse hook that trims it for a returns agent, and compare token use across a 6-order session.",
  ],
  successCriteria: [
    "A chart or table shows recall of planted findings by position for the baseline and the structured input.",
    "Middle-position recall improves with the key-findings summary and headers.",
    "The structured-record version fits in a smaller context budget with equal or better recall.",
    "The trimming hook cuts tool-result tokens by at least 80% in the 6-order session.",
  ],
  stretchGoals: [
    "Test whether moving the question to the end of the long input changes middle-position recall.",
    "Give different agents role-specific trimming hooks for the same tool and compare what each keeps.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An automated review's prompt says, \"Review this PR and report any problems.\" Developers report that about 70% of findings are style preferences, naming opinions, and suggestions that contradict the codebase's own conventions. The team adds \"Only report findings you are highly confident about.\" The false-positive rate barely changes.",
    prompt: "What is the most effective next change?",
    choices: [
      "Ask Claude to rate each finding's confidence from 1 to 10 and drop anything below 8.",
      "Add \"Be conservative and avoid false positives\" to the prompt as well.",
      "Replace the general instruction with explicit criteria: report bugs and security issues (with examples of each), and skip minor style and patterns that follow local conventions.",
      "Switch to a larger model, which will naturally report fewer false positives.",
    ],
    correct: [2],
    explanation:
      "False positives here come from a mismatch in what counts as a problem, and explicit report and skip categories fix that directly (C). Confidence scoring (A) filters on self-assessed certainty, and a style nit can be reported with high confidence. Another general instruction (B) is the approach that already failed. A larger model (D) still doesn't know your categories.",
  },
  {
    type: "multi",
    scenario:
      "A review bot reports three categories: security (about 92% of findings are valid), bugs (about 85% valid), and performance suggestions (about 12% valid). Surveys show developers now dismiss most bot comments without reading them, including the security findings.",
    prompt: "Which TWO actions best follow the guide?",
    choices: [
      "Temporarily disable the performance category while its criteria are improved, keeping security and bug findings running.",
      "Turn the whole bot off until every category exceeds 90% validity.",
      "Add a banner to every comment saying most findings are accurate.",
      "Rewrite the performance category's prompt with explicit criteria for what counts as a reportable performance issue, and re-enable it once it's validated on real PRs.",
      "Keep all three categories unchanged, since the security findings are good.",
    ],
    correct: [0, 3],
    explanation:
      "The noisy category is eroding trust in the accurate ones, so disabling it temporarily (A) while tightening its criteria (D) restores trust without losing the good categories. Turning everything off (B) throws away working categories. A banner (C) doesn't change the experience developers are reacting to. Changing nothing (E) lets the false positives keep undermining the security findings.",
  },
  {
    type: "single",
    scenario:
      "Across repeated runs on similar code, a classifier labels the same kind of unvalidated input as \"critical\" in some runs and \"minor\" in others. The prompt says, \"Assign severity: critical, major, or minor.\"",
    prompt: "What change will most improve consistency?",
    choices: [
      "Add \"be consistent with severity\" to the prompt.",
      "Define each severity level explicitly, with a concrete code example of what belongs at that level.",
      "Reduce the scale to two levels, serious and not serious.",
      "Run the classifier three times and take the most common severity.",
    ],
    correct: [1],
    explanation:
      "Explicit definitions anchored by concrete code examples give the model a stable reference for each level (B). Asking for consistency (A) doesn't say what consistent means. Fewer levels (C) moves the same ambiguity to one boundary instead of removing it. Majority voting (D) triples the cost and still averages over undefined criteria.",
  },
  {
    type: "single",
    prompt: "Which instruction is most likely to reduce false positives in a check of code comments?",
    choices: [
      "\"Check that all comments are accurate.\"",
      "\"Be conservative when flagging comments.\"",
      "\"Only flag comments you're sure about.\"",
      "\"Flag a comment only when the behavior it claims contradicts what the code actually does; don't flag comments that are terse or incomplete.\"",
    ],
    correct: [3],
    explanation:
      "The explicit criterion defines exactly what to report and what to skip (D). \"Accurate\" (A) invites flags for wording, completeness, and style. \"Be conservative\" (B) and \"only if sure\" (C) are general instructions that don't change what the model counts as a problem.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about precision in review prompts are correct?",
    choices: [
      "Confidence thresholds are the most reliable way to remove false positives.",
      "A category with many false positives can make developers distrust accurate findings in other categories.",
      "General instructions like \"only report high-confidence findings\" reliably improve precision.",
      "More findings per review always means better coverage and more value.",
      "Review criteria should say which issue types to skip, not only which to report.",
    ],
    correct: [1, 4],
    explanation:
      "Noisy categories erode trust in accurate ones (B), and good criteria define what to skip as well as what to report (E). Confidence thresholds filter on the wrong axis (A). General instructions don't improve precision the way categorical criteria do (C). Extra low-value findings reduce value by training developers to ignore the tool (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Measure and fix a noisy review prompt",
  context:
    "Build a small evaluation harness for a code-review prompt and use it to show the difference between vague and explicit criteria. Work in ccarf-lab/exercises/4-1/.",
  requirements: [
    "Collect or write 12 short diffs: 4 with real bugs, 2 with security issues, and 6 with only style changes or code that follows local conventions. Label each with its true findings.",
    "Run a vague prompt (\"review this and report problems\") over all 12 with structured output (file, line, category, severity, message). Compute precision and recall against your labels.",
    "Add \"be conservative, only report high-confidence findings\" and run again.",
    "Replace both with explicit report and skip criteria, including one example per category, and run again.",
    "Add severity definitions with a code example per level. Run the explicit prompt three times and measure how often each true finding gets the same severity.",
    "Pick your noisiest category, disable it, and recompute precision for the rest.",
  ],
  successCriteria: [
    "A table compares precision and recall for the vague, conservative, and explicit prompts.",
    "The explicit prompt has clearly higher precision than both others, without losing the security findings.",
    "Severity agreement across three runs is higher with the defined levels than without them.",
  ],
  stretchGoals: [
    "Try confidence-threshold filtering (drop findings rated below 8/10) and record which false positives survive it.",
    "Rewrite the disabled category's criteria until it reaches your precision bar, then re-enable it.",
  ],
};

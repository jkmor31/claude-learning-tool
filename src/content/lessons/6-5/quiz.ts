import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "The PR review bot's \"documentation accuracy\" category flags a comment on 40% of pull requests, and developers say most of those flags are wrong. They've started dismissing all of the bot's comments, including correct security findings. The prompt for this category says: \"Check that code comments are accurate. Be conservative.\"",
    prompt: "What is the best course of action?",
    choices: [
      "Add \"Only report findings you are highly confident in\" to the prompt.",
      "Run the review three times and post only the findings that appear in all three runs.",
      "Temporarily disable the documentation category while rewriting its criteria to flag a comment only when the behavior it describes contradicts what the code actually does.",
      "Keep posting documentation findings, but as collapsed comments.",
    ],
    correct: [2],
    explanation:
      "Turning off the noisy category restores trust in the accurate ones while explicit, categorical criteria fix the cause (C). Confidence-based instructions (A) don't tell the model which findings matter. Triple runs (B) triple the cost and can agree on the same false positive. Collapsing the comments (D) keeps the noise that is eroding trust.",
  },
  {
    type: "multi",
    scenario:
      "After each new commit on a pull request, the review job re-posts comments about issues that have already been fixed or discussed. Separately, the test-generation job keeps proposing tests for scenarios the suite already covers.",
    prompt: "Which TWO changes address these problems?",
    choices: [
      "Run the review only once per pull request, on the first commit.",
      "Include the prior review findings in context and instruct Claude to report only new or still-unaddressed issues.",
      "Drop any comment whose text exactly matches a previous comment before posting.",
      "Lower the temperature for both jobs.",
      "Include the existing test files for the changed modules in the test-generation context.",
    ],
    correct: [1, 4],
    explanation:
      "With the prior findings in context, the review can tell what's new or still open (B), and with the existing tests in context, the generator can see what's already covered (E). Reviewing only the first commit (A) misses problems introduced later. Exact-text matching (C) fails as soon as a finding is worded differently. Temperature (D) doesn't supply the missing information.",
  },
  {
    type: "single",
    scenario:
      "A pipeline script parses the review output with regular expressions to create inline PR comments. It breaks whenever Claude words a finding slightly differently, and some findings are silently dropped.",
    prompt: "What is the most reliable fix?",
    choices: [
      "Run Claude Code with --output-format json and --json-schema defining file, line, severity, category and message, and read the findings from structured_output.",
      "Add few-shot examples showing the exact wording the regular expressions expect.",
      "Ask Claude in the prompt to reply in JSON, then parse the reply.",
      "Post the entire review as a single PR comment instead of inline comments.",
    ],
    correct: [0],
    explanation:
      "The CLI's JSON output with a schema gives machine-parseable, schema-conforming findings (A). Few-shot examples (B) make the wording more consistent but don't guarantee it. A prompt-only request for JSON (C) isn't enforced and can still come back malformed. One big comment (D) avoids the parsing problem by giving up inline feedback.",
  },
  {
    type: "single",
    scenario:
      "An agent writes code for tickets and opens pull requests. At the end of the same session, it's asked to review its own changes, yet human reviewers keep finding subtle concurrency bugs it missed. The team proposes turning on extended thinking for the review step.",
    prompt: "What is the most effective change?",
    choices: [
      "Enable extended thinking for the review step, as proposed.",
      "Add \"Be highly critical of your own work\" to the review instruction.",
      "Have the same session review the changes twice.",
      "Run the review in an independent Claude instance that sees the diff and the review criteria but none of the generator's reasoning.",
    ],
    correct: [3],
    explanation:
      "A session that wrote the code keeps its own reasoning and tends not to question it, so an independent reviewer without that context catches more (D). Extended thinking (A), stronger instructions (B) and a second pass in the same session (C) all leave the reviewer inside the generator's context.",
  },
  {
    type: "multi",
    scenario:
      "Two problems in the CI output: an identical unchecked-null issue was rated \"critical\" on one PR and \"minor\" on another. And generated tests often assert trivial getters and build their own mock merchants instead of using the shared fixtures in fixtures/merchants.ts.",
    prompt: "Which TWO changes address these problems?",
    choices: [
      "Define each severity level in the review criteria with concrete code examples.",
      "Have Claude report a confidence score for each severity and drop anything below 0.8.",
      "Document the testing standards (what makes a test valuable) and the available fixtures in CLAUDE.md.",
      "Switch the CI jobs to a larger model.",
      "Let developers vote on the severity of each finding after it's posted.",
    ],
    correct: [0, 2],
    explanation:
      "Severity levels defined with code examples make classification consistent (A), and CLAUDE.md is how CI-invoked Claude Code learns the project's testing standards and fixtures (C). Confidence thresholds (B) don't fix undefined categories. A larger model (D) still doesn't know your definitions or fixtures. Developer votes (E) fix severities after the fact instead of at the source.",
  },
];

export const bonus: BonusScenario = {
  title: "Ship a Claude Code review pipeline",
  context:
    "Build a working CI pipeline for a repository you own: a blocking review, a test generator and a nightly batch audit. Work in ccarf-lab/exercises/6-5/, and use your ccarf-lab repo itself as the target if you don't have another.",
  requirements: [
    "Add a GitHub Actions workflow (or your CI of choice) that runs claude -p with --output-format json, --json-schema and read-only allowedTools, and turns structured_output into inline PR comments.",
    "Write review criteria in CLAUDE.md: what to report, what to skip, and three severity levels each with a code example. Add testing standards and a list of fixtures.",
    "Split reviews of PRs over five files into per-file passes plus an integration pass.",
    "On re-runs, pass the previous findings and report only new or unaddressed issues. Give the test generator the existing tests for the changed files.",
    "Add a nightly job that sends one request per file to the Message Batches API with a custom_id, and resubmits only failures.",
  ],
  successCriteria: [
    "A deliberately planted null-dereference bug gets an inline comment at the right line with the right severity.",
    "Pushing a fix for that bug produces no repeated comment on the next run.",
    "On a 10-PR sample, at least 80% of posted findings are ones you'd act on; record the rate.",
    "The nightly batch results are matched back to files by custom_id.",
  ],
  stretchGoals: [
    "Have one Claude session write a change and a separate instance review it, then compare with same-session self-review on the same change.",
    "Turn off your noisiest category for a week, rewrite its criteria, and measure its precision before and after.",
  ],
};

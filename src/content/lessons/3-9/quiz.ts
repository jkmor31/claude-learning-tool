import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A developer's workflow has Claude implement a feature, then in the same session asks, \"Now review your changes for bugs.\" The reviews almost always come back clean, yet QA keeps finding bugs in exactly the areas the implementation made assumptions about.",
    prompt: "What is the best change to the workflow?",
    choices: [
      "Ask the same session to review twice, since a second pass catches more.",
      "Add \"be extremely critical\" to the review request in the same session.",
      "Skip the review, since it isn't finding anything.",
      "Run the review in an independent instance, such as a fresh claude -p run or a separate subagent, that sees the diff and the review criteria but not the generating session's reasoning.",
    ],
    correct: [3],
    explanation:
      "The generating session reviews through its own assumptions; an independent instance without that context is more effective (D). A second pass in the same session (A) carries the same blind spots. \"Be critical\" (B) doesn't remove the shared context that causes the blindness. Dropping review (C) removes the check instead of making it work.",
  },
  {
    type: "multi",
    scenario:
      "An automated PR review runs on every push. On a PR with four pushes, it posted the same three comments four times each, including comments on issues the author had already fixed. Developers now ignore the bot.",
    prompt: "Which TWO changes address this?",
    choices: [
      "Include the previous review's findings in the context of each re-run.",
      "Run the review only once, on the first push, and never again.",
      "Raise the model temperature so the wording differs between runs.",
      "Delete all old bot comments before each run and post the full set again.",
      "Instruct Claude to report only new issues and prior issues that remain unaddressed, marking fixed ones as resolved.",
    ],
    correct: [0, 4],
    explanation:
      "Giving the re-run the prior findings (A) and asking only for new or still-open issues (E) removes duplicates and tracks what was fixed. Reviewing only the first push (B) misses problems introduced later. Different wording (C) still duplicates the issues. Deleting and reposting (D) loses the discussion threads and still reports fixed issues if the review doesn't know about them.",
  },
  {
    type: "single",
    scenario:
      "A CI job asks Claude to generate tests for changed modules. Reviewers find that about half the generated tests duplicate scenarios already in the existing test files, such as the empty-input case and the basic happy path.",
    prompt: "What is the most direct fix?",
    choices: [
      "Ask Claude to generate half as many tests.",
      "Delete the existing tests so there's nothing to duplicate.",
      "Provide the existing test files in context and ask for tests covering only behavior they don't already cover.",
      "Run a deduplication script over the generated tests after each run.",
    ],
    correct: [2],
    explanation:
      "Showing the existing tests lets generation target real gaps (C). Asking for fewer tests (A) cuts useful and duplicate tests alike. Deleting the suite (B) destroys coverage. A post-hoc script (D) can't reliably tell semantically duplicate scenarios apart, and the wasted generation still happens.",
  },
  {
    type: "single",
    scenario:
      "CI-generated tests are technically correct but low-value: many test trivial getters, they build large objects inline instead of using the shared fixture factories, and they miss the money-rounding edge cases that have caused real incidents.",
    prompt: "Where should the team make the change?",
    choices: [
      "In each developer's personal user-level configuration.",
      "In the project's CLAUDE.md: document the testing standards, what counts as a valuable test here (such as rounding edge cases), what to skip, and the available fixtures.",
      "In the pipeline's timeout setting, so the job has more time to think.",
      "Nowhere; low-value tests are an unavoidable side effect of automated generation.",
    ],
    correct: [1],
    explanation:
      "Testing standards, valuable-test criteria, and fixtures documented in CLAUDE.md reach CI-invoked Claude Code and raise quality while cutting low-value output (B). Personal configuration (A) doesn't exist on the CI runner. More time (C) doesn't supply missing criteria. The problem is fixable with explicit guidance (D).",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about high-signal CI prompts are correct?",
    choices: [
      "An independent review instance is more effective than asking the generating session to review its own changes.",
      "Telling Claude to \"only report important issues\" is enough to make reviews precise.",
      "Re-reviews work best when Claude has no knowledge of earlier findings, so it isn't biased.",
      "Documenting testing standards and available fixtures in CLAUDE.md improves the quality of generated tests.",
      "Generated tests are most useful when they re-cover the happy paths already tested.",
    ],
    correct: [0, 3],
    explanation:
      "Independent review beats self-review (A), and standards plus fixtures in CLAUDE.md improve test generation (D). Vague instructions like \"only important issues\" (B) do little for precision without specific criteria. Without prior findings (C), re-reviews duplicate comments and can't track what was fixed. Re-covering tested paths (E) adds maintenance without coverage.",
  },
];

export const bonus: BonusScenario = {
  title: "Upgrade your CI review to high signal",
  context:
    "Extend the Lesson 3.8 pipeline with independent review, incremental re-review, and gap-targeted test generation, then measure the noise before and after. Work in ccarf-lab/.github/ and write notes in ccarf-lab/exercises/3-9/.",
  requirements: [
    "Self-review baseline: in one session, have Claude implement a small feature with two subtle bugs you seed afterward (or that you know about), then ask it to review its own changes. Record what it catches.",
    "Run your CI review from Lesson 3.8 on the same diff as an independent instance and record what it catches.",
    "Store each review's structured findings as a workflow artifact. On later pushes, pass the prior findings in and ask for only new issues plus a resolved or still-open status for each prior one.",
    "Update the posting script to post only new findings and reply \"resolved\" on fixed threads.",
    "Add a test-generation job that attaches the existing test file for each changed module and asks for tests covering only uncovered behavior, each naming the gap it fills.",
    "Add testing standards, valuable-test criteria, and fixture locations to CLAUDE.md, and compare generated tests before and after.",
  ],
  successCriteria: [
    "The independent review catches at least one seeded bug that self-review missed. Record both results.",
    "Across three pushes to one PR, no finding is posted twice, and fixed issues are marked resolved.",
    "Generated tests duplicate none of the existing scenarios, and every new test names the gap it covers.",
    "After the CLAUDE.md update, generated tests use your fixture factories, and trivial getter tests disappear.",
  ],
  stretchGoals: [
    "Track the number of comments per PR and the share developers resolve as valid over a week of real use.",
    "Split the review into two independent passes (security and correctness) and merge their findings without duplicates.",
  ],
};

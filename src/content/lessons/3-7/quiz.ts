import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A developer asks Claude to \"convert our product titles to a clean, consistent format.\" Across five attempts, Claude produces five different interpretations: title case, sentence case, removing brand names, keeping brand names, and truncating long titles.",
    prompt: "What is the most effective next step?",
    choices: [
      "Repeat the same instruction, adding \"please be consistent.\"",
      "Provide 2–3 concrete examples of input titles and the exact expected output, chosen to show how brand names, casing, and length should be handled.",
      "Ask Claude to pick whichever format it thinks is best and stick with it.",
      "Write a longer prose description of the desired format.",
    ],
    correct: [1],
    explanation:
      "When prose is interpreted inconsistently, concrete input/output examples are the most effective way to communicate the transformation, especially examples that cover the points where interpretations differed (B). Asking for consistency (A) doesn't specify what to be consistent with. Letting Claude choose (C) gives up on your actual requirement. More prose (D) is the approach that's already failing.",
  },
  {
    type: "single",
    scenario:
      "Claude wrote a data migration script. In staging, it crashes on some rows. The developer has told Claude twice to \"handle missing data better,\" and each revision fails on a different kind of row.",
    prompt: "What should the developer do instead?",
    choices: [
      "Tell Claude to add try/except around the whole script so it never crashes.",
      "Ask Claude to review the script again more carefully.",
      "Switch to plan mode and ask for a design document.",
      "Provide specific test cases, such as a row with a null email and its exact expected output, and ask Claude to make them pass.",
    ],
    correct: [3],
    explanation:
      "Specific test cases with example input and expected output remove the ambiguity around edge cases like nulls (D). A blanket try/except (A) hides failures and can silently corrupt migrated data. Reviewing \"more carefully\" (B) doesn't tell Claude what correct means. A design document (C) is out of proportion when the issue is specific edge-case behavior.",
  },
  {
    type: "multi",
    scenario:
      "A developer is asking Claude to build a rate limiter for an internal API, a domain they haven't worked in before. They want to minimize rework.",
    prompt: "Which TWO techniques should they use before and during implementation?",
    choices: [
      "Use the interview pattern: ask Claude to question them about requirements such as limits per client, behavior when the limiter's store is down, and burst handling before writing code.",
      "Ask Claude to implement immediately and adjust based on production incidents.",
      "Write tests first that cover normal limits, edge cases such as bursts at window boundaries, and a performance requirement, then iterate by sharing the failures.",
      "Describe the rate limiter in one sentence so Claude has maximum flexibility.",
      "Avoid tests until the implementation is finished, so the tests match the code.",
    ],
    correct: [0, 2],
    explanation:
      "The interview pattern surfaces design considerations the developer might not anticipate in an unfamiliar domain (A), and test-first iteration with shared failures drives the implementation toward verified behavior (C). Learning from production incidents (B) is the costliest form of feedback. A one-sentence spec (D) leaves the important decisions unmade. Tests written to match finished code (E) check what the code does, not what it should do.",
  },
  {
    type: "single",
    scenario:
      "A review of Claude's new payment-retry code finds three problems: retries swallow the original error, the overall timeout is shorter than the retry backoff schedule, and the logs don't record which attempt failed. Each fix changes what the right answer is for the others.",
    prompt: "How should the developer give this feedback?",
    choices: [
      "Describe all three problems together in one detailed message, explaining how they interact, so Claude can design one coherent fix.",
      "Send the three problems one at a time, verifying each fix before sending the next.",
      "Send only the most severe problem and ignore the others.",
      "Ask Claude to rewrite the entire payment module from scratch.",
    ],
    correct: [0],
    explanation:
      "When issues interact, providing them together in one detailed message lets Claude find a fix that satisfies all of them (A). Sequential fixes (B) suit independent issues; here each fix would change the others and could undo earlier work. Ignoring problems (C) leaves known bugs in place. A full rewrite (D) throws away working code and adds new risk.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about iterative refinement are correct?",
    choices: [
      "Independent, unrelated issues are best combined into one large change so there's only one review.",
      "Test failures should be paraphrased briefly rather than pasted, to save tokens.",
      "Sharing the actual test failure output gives Claude precise feedback about what's wrong and what was expected.",
      "The interview pattern should be used for every task, including well-understood one-line fixes.",
      "Concrete input/output examples are most effective when they cover the cases where different interpretations would diverge.",
    ],
    correct: [2, 4],
    explanation:
      "Actual failure output is precise feedback (C), and good examples target the points of ambiguity (E). Independent issues are better fixed sequentially, so each change stays small and verifiable (A). Paraphrasing failures (B) loses the exact expected and received values. The interview pattern adds value in unfamiliar domains, not on one-line fixes (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Refine the same feature three ways and compare",
  context:
    "Build one small feature using each refinement technique and measure how many rounds each takes to reach correct behavior. Work in ccarf-lab/exercises/3-7/.",
  requirements: [
    "Pick a transformation with real ambiguity, such as normalizing messy addresses, parsing human durations (\"1h30m\", \"90 min\"), or cleaning CSV headers.",
    "Round A: describe it in prose only, and iterate with prose feedback until the output is correct or 6 rounds pass. Count the rounds.",
    "Round B: start fresh with the same prose plus 3 input/output examples chosen to cover the ambiguous cases. Count the rounds.",
    "Round C: write a test suite first, covering normal cases, at least 3 edge cases (nulls, empty strings, huge inputs), and one performance check. Implement by sharing only the raw test failures. Count the rounds.",
    "Use the interview pattern for a second, unfamiliar feature (for example a small cache with invalidation) and list the questions Claude asked that you hadn't considered.",
    "Introduce two interacting bugs and two independent ones, fix them with the batching strategy from this lesson, and note what happened.",
  ],
  successCriteria: [
    "A table compares rounds to correct behavior for A, B, and C.",
    "The Round C test suite passes, including the edge-case and performance tests.",
    "Your interview notes list at least three design questions that changed your implementation.",
    "Your notes show the interacting bugs fixed in one message and the independent ones one at a time.",
  ],
  stretchGoals: [
    "Send the interacting bugs one at a time on purpose, and record whether any fix undid a previous one.",
    "Turn your test-first workflow into a project skill that asks for tests before implementation.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An automated review of a 9-file database-migration pull request runs as one prompt containing every diff. It comments on naming in the first few files, misses a missing index in a later file, and approves a nullable-column pattern in one migration while flagging the identical pattern in another.",
    prompt: "How should you restructure the review?",
    choices: [
      "Switch to a model with a larger context window so all nine files fit comfortably.",
      "Run the same single-pass review three times and keep only findings that appear in at least two runs.",
      "Review each file in its own pass for local issues, then run a separate integration pass for cross-file concerns.",
      "Require developers to split migrations into pull requests of two or three files.",
    ],
    correct: [2],
    explanation:
      "Uneven depth, missed bugs, and self-contradiction are symptoms of attention dilution. Per-file passes give each file full attention, and an integration pass catches cross-file issues (Task 1.6). A larger context window (A) adds room, not attention. Keeping only findings that recur across runs (B) suppresses real bugs that are only caught some of the time. Making developers split PRs (D) shifts the burden onto them instead of fixing the review.",
  },
  {
    type: "single",
    scenario:
      "Every night a job processes new support tickets. For each one it must classify the category, extract the order ID and product, and draft a first reply. The steps are the same for every ticket.",
    prompt: "Which decomposition strategy fits best?",
    choices: [
      "A fixed prompt chain: classify, then extract, then draft, with each step's output feeding the next.",
      "Dynamic adaptive decomposition, where a planner agent decides the steps for each ticket.",
      "A single prompt that classifies, extracts, and drafts all at once.",
      "A multi-agent research coordinator that delegates each ticket to specialized subagents.",
    ],
    correct: [0],
    explanation:
      "The steps are predictable and identical for every ticket, which is exactly where prompt chaining excels: focused, checkable stages that run the same way each time. A planner agent (B) or a research coordinator (D) adds cost and variability to work that doesn't need adapting. One combined prompt (C) loses the ability to check and debug each stage separately.",
  },
  {
    type: "multi",
    scenario:
      "You're asked to \"add comprehensive tests\" to a 200,000-line legacy codebase that currently has no tests.",
    prompt: "Which TWO steps belong in a good approach?",
    choices: [
      "Generate tests file by file in alphabetical order until every file has a test file.",
      "First map the structure: modules, entry points, dependencies, and any existing test infrastructure.",
      "Write a complete plan up front and follow it exactly, without revising it.",
      "Aim for 100% line coverage before running any of the tests.",
      "Identify the highest-impact areas, such as critical paths and frequently changed or bug-prone code, and prioritize them.",
    ],
    correct: [1, 4],
    explanation:
      "The guide's pattern for open-ended work is to map the structure (B), identify high-impact areas (E), and then follow a prioritized plan that adapts as dependencies are discovered. Alphabetical order (A) spends effort without regard to impact. A frozen plan (C) can't adapt when you discover something like a global database dependency. Chasing full line coverage before running anything (D) produces low-value tests and delays feedback.",
  },
  {
    type: "single",
    scenario:
      "To investigate intermittent checkout failures, your team built a fixed six-step chain: check app logs → check the database → check the cache → check the payment gateway → check the CDN → write a report. The logs often reveal early that the cause is a specific third-party webhook, but the chain keeps working through the database, cache, and CDN checks anyway.",
    prompt: "What is the best improvement?",
    choices: [
      "Add more steps to the chain so it covers webhook-related causes too.",
      "Run all six checks in parallel to finish faster.",
      "Restart the chain from step 1 with more verbose logging whenever a run is inconclusive.",
      "Use adaptive decomposition, where each finding determines the next investigation subtask.",
    ],
    correct: [3],
    explanation:
      "Root-cause investigation is open-ended: what to check next depends on what you just found. Adaptive decomposition follows the evidence, so a webhook finding leads to webhook-focused subtasks. More fixed steps (A) make the script longer and just as blind. Parallel checks (B) are faster but still do mostly irrelevant work. Restarting with more logging (C) repeats the same rigid path.",
  },
  {
    type: "multi",
    prompt:
      "Why do per-file review passes plus a separate integration pass work better than one pass over a large change? Select TWO.",
    choices: [
      "The approach makes cross-file analysis unnecessary.",
      "Each file gets focused attention, so review depth is consistent across files.",
      "The approach guarantees there will be no false-positive findings.",
      "Cross-file issues, such as interface mismatches and data flow, get their own dedicated pass.",
      "The approach works only with models that have very large context windows.",
    ],
    correct: [1, 3],
    explanation:
      "Per-file passes avoid attention dilution, giving consistent depth (B), and the integration pass exists specifically for cross-file concerns (D). Cross-file analysis is still needed, which is the point of pass two (A). No structure guarantees zero false positives (C). The approach doesn't depend on a large context window (E). If anything, it reduces how much each pass has to hold.",
  },
];

export const bonus: BonusScenario = {
  title: "Chained review vs single pass, and an adaptive test plan",
  context:
    "Two experiments in ccarf-lab/exercises/1-8/. The first measures attention dilution in code review. The second practices dynamic decomposition on a small legacy module. Use the plain Messages API or the Agent SDK, whichever you're more comfortable with.",
  requirements: [
    "Create a small project of 8 to 10 source files with seeded problems: two local bugs (for example an off-by-one error and an unhandled None), one cross-file interface mismatch (a function signature changed in one file but not at a call site), one pattern that is fine in one file and buggy in another, and a few harmless style quirks.",
    "Review A: send all files in one prompt asking for a full review, and save the findings.",
    "Review B: run one pass per file for local issues (in parallel), then an integration pass that receives the diffs plus every per-file finding and looks for cross-file problems. Save the consolidated findings.",
    "Score both reviews against your list of seeded problems: true positives, misses, false positives, and contradictions.",
    "Adaptive plan: write a legacy module that pulls config from a global singleton that opens a (fake) database connection at import time. Ask an agent to plan tests for it by mapping the structure first, prioritizing, and revising the plan when it discovers blockers. Save each version of the plan.",
  ],
  successCriteria: [
    "Your score sheet shows the chained review catches the cross-file mismatch and has no contradictions, or documents clearly where it didn't and why.",
    "The saved plan versions show at least one revision caused by a discovery, such as the global database dependency becoming a new first task (\"introduce a fixture\" or \"create a seam\").",
  ],
  stretchGoals: [
    "Add a third review variant that runs the single-pass review three times and keeps only findings seen in at least two runs. Record which real bugs it suppresses.",
    "Wrap each step of the adaptive plan (\"test module X\") in a fixed analyze → write → run → fix chain, combining both strategies.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An agent generates a data-migration module and then, in the same session, is asked to \"thoroughly review the code you just wrote\" with extended thinking enabled. Its reviews rarely find anything, but QA later finds subtle bugs in exactly the assumptions the generator made.",
    prompt: "What is the most effective change?",
    choices: [
      "Increase the extended-thinking budget for the review step.",
      "Have a second, independent Claude instance review the module, given the code and review criteria but not the generator's reasoning.",
      "Ask the same session to review three times in a row.",
      "Add \"be extremely skeptical of your own work\" to the review prompt.",
    ],
    correct: [1],
    explanation:
      "An independent instance without the generator's reasoning context is more effective than self-review (B). More thinking (A), repeated passes (C), and skeptical instructions (D) all keep the generation reasoning in context, which is the cause of the blind spots.",
  },
  {
    type: "multi",
    scenario:
      "A pull request changes 28 files across an API layer, a service layer, and a database layer. A single review prompt over all 28 files misses obvious local bugs in several files and produces contradictory comments about where input validation should live.",
    prompt: "Which TWO changes follow the guide's architecture?",
    choices: [
      "Review each file in its own focused pass for local issues.",
      "Put all 28 files into an even longer single prompt with more detailed instructions.",
      "Review only the first 10 files, which usually contain the important changes.",
      "Add a separate cross-file integration pass that examines data flow and contracts between the layers.",
      "Ask the model to be consistent about validation placement.",
    ],
    correct: [0, 3],
    explanation:
      "Per-file passes (A) give each file full attention for local issues, and a separate integration pass (D) handles cross-file questions like where validation belongs. A longer single prompt (B) makes attention dilution worse. Reviewing a subset (C) misses the rest. A consistency instruction (E) doesn't remove the cause of the contradictions.",
  },
  {
    type: "single",
    scenario:
      "A team adopted per-file review passes, and local bug detection improved. But a bug slipped through where the API layer started sending a new currency field that the service layer silently dropped. Each file's own review looked fine.",
    prompt: "What is missing from the architecture?",
    choices: [
      "A larger model for the per-file passes.",
      "More per-file passes on each file.",
      "Self-review by the author's Claude session.",
      "A cross-file integration pass that checks data flow and contracts between files.",
    ],
    correct: [3],
    explanation:
      "Per-file passes can't see problems that only exist between files, which is what an integration pass is for (D). A larger model (A) or more passes per file (B) still looks at one file at a time. Self-review (C) brings back the generator's blind spots and still isn't a cross-file check.",
  },
  {
    type: "single",
    scenario:
      "A review system produces about 60 findings a day. The team wants the most reliable findings posted automatically, while doubtful ones get a human look before reaching developers.",
    prompt: "Which technique fits best?",
    choices: [
      "Post every finding automatically and let developers dismiss the wrong ones.",
      "Use self-reported confidence as the only criterion for what counts as an issue.",
      "Add a verification pass that self-reports a confidence level for each finding, and route by it: high to automatic posting, lower to a human review queue.",
      "Send every finding to a human reviewer.",
    ],
    correct: [2],
    explanation:
      "A verification pass with self-reported confidence enables calibrated routing of findings (C). Posting everything (A) exposes developers to doubtful findings and erodes trust. Confidence shouldn't replace explicit criteria for what counts as an issue (B). Reviewing everything by hand (D) wastes human effort on findings that are clearly reliable.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about review architectures are correct?",
    choices: [
      "Extended thinking in the generating session gives the same benefit as an independent reviewer.",
      "A model reviewing its own output in the same session tends not to question its earlier decisions, because it retains its reasoning context.",
      "A single prompt over many files gives each file the same attention as a focused pass.",
      "Per-file passes alone are sufficient for catching cross-file data-flow bugs.",
      "Splitting large reviews into per-file and integration passes reduces attention dilution and contradictory findings.",
    ],
    correct: [1, 4],
    explanation:
      "Retained reasoning makes self-review weak (B), and splitting into per-file and integration passes addresses dilution and contradictions (E). Extended thinking in the same session keeps the same frame (A). Attention thins across many files (C). Per-file passes can't see cross-file flows (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Build a two-stage, multi-instance review pipeline",
  context:
    "Turn your CI reviewer into a multi-instance, multi-pass system and measure what each layer adds. Work in ccarf-lab/exercises/4-8/.",
  requirements: [
    "Create a pull-request-sized change across at least 8 files in three layers, with seeded bugs: 3 local (one per file) and 2 cross-file (a dropped field, and a contract mismatch).",
    "Baseline 1: have the session that wrote the change review it, with extended thinking on. Record the bugs found.",
    "Baseline 2: one independent instance reviews all 8 files in a single prompt. Record the bugs found and any contradictory comments.",
    "Multi-pass: run a per-file pass for each file in parallel, then an integration pass given the local findings and interface summaries of each file.",
    "Add a verification pass that assigns each finding a confidence level (high, medium, or low) and routes it to auto-post, label, or a human queue.",
  ],
  successCriteria: [
    "A table shows the local and cross-file bugs caught by each of the three setups.",
    "The multi-pass setup catches both cross-file bugs, and your notes say which pass found them.",
    "There are no contradictory findings in the multi-pass output, or fewer than in Baseline 2.",
    "Every finding ends in a route, and your notes check whether the high-confidence ones were all valid.",
  ],
  stretchGoals: [
    "Measure how often each confidence level was actually right, and adjust the routing thresholds.",
    "Run the per-file passes as a Message Batch overnight and compare cost and time with running them synchronously.",
  ],
};

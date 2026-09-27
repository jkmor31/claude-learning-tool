import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A team wants to replace its homegrown event bus with a managed message queue. The bus is used in about 50 files across six services, and there are at least two viable designs: a thin adapter that keeps the current interface, or rewriting producers and consumers to the queue's native API.",
    prompt: "How should the developer approach this with Claude Code?",
    choices: [
      "Start in plan mode: have Claude explore how the bus is used, compare the two designs, and propose a plan to review before any edits.",
      "Use direct execution and ask Claude to start migrating the first service immediately.",
      "Use direct execution but ask Claude to be careful.",
      "Migrate each file in a separate new session so no context carries over.",
    ],
    correct: [0],
    explanation:
      "A large, multi-file change with more than one valid approach and architectural consequences is exactly what plan mode is for (A). Starting immediately (B) risks building the wrong design across 50 files. \"Be careful\" (C) doesn't add a design checkpoint. Separate sessions per file (D) lose the shared understanding the migration needs and don't decide the approach.",
  },
  {
    type: "single",
    scenario:
      "A production error report includes a stack trace pointing to line 88 of src/billing/invoice.ts, where a null customer address causes a crash. The fix is a guard clause in that one function.",
    prompt: "What is the most appropriate way to proceed?",
    choices: [
      "Use plan mode, and have Claude write a design document first.",
      "Use the Explore subagent to map the whole billing system first.",
      "Use direct execution: ask Claude to add the guard and a test for the null case.",
      "Ask Claude to propose three alternative architectures for invoice generation.",
    ],
    correct: [2],
    explanation:
      "A single-file fix with a clear stack trace and an obvious approach suits direct execution (C). A plan (A) adds ceremony without a decision to make. Mapping the whole system (B) spends time and context on discovery the stack trace already did. Architectural alternatives (D) are out of proportion to a guard clause.",
  },
  {
    type: "multi",
    scenario:
      "During a multi-phase refactor, a developer asks Claude to find every place the legacy logging library is used. Claude reads more than 70 files in the main session. By the time implementation starts, the context is nearly full, and Claude has started losing track of decisions made earlier in the conversation.",
    prompt: "Which TWO changes would best prevent this?",
    choices: [
      "Ask Claude to read the files more quickly.",
      "Delegate the discovery phase to the Explore subagent, so the file reading happens in its own context.",
      "Paste all 70 files into the prompt at the start instead.",
      "Have the Explore subagent return a summary of call sites grouped by usage pattern, which the main session uses for planning and implementation.",
      "Switch to direct execution so Claude stops reading files.",
    ],
    correct: [1, 3],
    explanation:
      "The Explore subagent isolates verbose discovery (B) and returns a compact summary to the main session (D), preserving context for later phases. Reading speed (A) doesn't change how much lands in context. Pasting the files (C) has the same context cost. Direct execution (E) still needs the discovery, and skipping it risks missing call sites.",
  },
  {
    type: "single",
    prompt: "What is the main benefit of using plan mode before a complex change?",
    choices: [
      "It makes Claude's edits run faster.",
      "It lets Claude skip reading files.",
      "It guarantees the generated code has no bugs.",
      "It allows safe exploration and design before any changes are made, catching a wrong approach before it causes costly rework.",
    ],
    correct: [3],
    explanation:
      "Plan mode's value is exploring and designing without edits, so a wrong approach is caught at the cheapest point (D). It doesn't speed up edits (A). Plan mode depends on reading files (B). No mode guarantees bug-free code (C); tests and review still matter.",
  },
  {
    type: "multi",
    prompt: "Which TWO tasks are the best candidates for plan mode?",
    choices: [
      "Choosing between two ways to integrate a payment provider, one needing a webhook endpoint and the other a polling worker",
      "Adding a date-format validation check to one function",
      "Renaming a local variable in one file",
      "Fixing a typo in an error message",
      "Upgrading a UI component library whose breaking changes affect 45 files",
    ],
    correct: [0, 4],
    explanation:
      "Choosing between integration approaches with different infrastructure (A) and a library migration touching 45 files (E) have architectural weight and multiple valid approaches. A single validation check (B), a local rename (C), and a typo fix (D) are well-scoped changes that suit direct execution.",
  },
];

export const bonus: BonusScenario = {
  title: "Plan a migration, then execute it, with Explore doing the digging",
  context:
    "Run a realistic plan-then-execute workflow on your lab repo and measure how the Explore subagent affects context use. Work in ccarf-lab/exercises/3-6/.",
  requirements: [
    "Create a small codebase where one helper, such as a logging or HTTP wrapper, is called from at least 20 files in varied ways, and write a replacement API with a different shape.",
    "Baseline: in a normal session, ask Claude to find every call site and describe the migration. Record the context used with /context.",
    "In a fresh session, start in plan mode and ask Claude to use the Explore subagent for discovery, then propose a migration plan with an order and risks. Record the context used again.",
    "Review the plan, change at least one decision, then approve and let Claude implement it with tests.",
    "Separately, give Claude a one-line bug with a clear stack trace and fix it with direct execution.",
  ],
  successCriteria: [
    "Your notes show lower main-session context use with Explore than in the baseline.",
    "The plan names every call-site pattern, and the implementation follows your amended plan.",
    "All tests pass after the migration, and no call site to the old helper remains.",
    "Your notes explain why the stack-trace bug didn't need plan mode.",
  ],
  stretchGoals: [
    "Give the migration to a session in direct execution without a plan, and compare how much rework it needed.",
    "Write a forked skill (Lesson 3.4) that runs the discovery step with agent: Explore, and reuse it for another migration.",
  ],
};

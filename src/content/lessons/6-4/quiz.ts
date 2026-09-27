import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An engineer asks the productivity agent to find every call to applyFuelSurcharge. It Greps for that name and reports six call sites, but the engineer knows there are more. The pricing/index.ts module exports the function under its own name and as legacySurcharge, and also has export * from \"./adjustments\".",
    prompt: "How should the agent find all the callers?",
    choices: [
      "Read the wrapper modules to list every name the function is exported under, then Grep for each name across the codebase.",
      "Glob for **/*surcharge* to find related files.",
      "Read every file in pricing/ and in every module that imports from it.",
      "Raise the Grep result limit and search again for applyFuelSurcharge.",
    ],
    correct: [0],
    explanation:
      "Callers that import an alias only show up when you search for every exported name, so collect the names from the wrappers first and Grep for each (A). Glob (B) matches file names, not call sites. Reading everything (C) is the upfront-reading anti-pattern and still depends on spotting aliases by eye. A higher limit (D) doesn't find names you aren't searching for.",
  },
  {
    type: "multi",
    scenario:
      "Asked to explain how the legacy invoicing module calculates late fees, the agent starts by reading all 140 files in invoicing/ and runs out of context before it answers.",
    prompt: "Which TWO changes fit the guide's approach?",
    choices: [
      "Switch to a model with a larger context window.",
      "Glob all the files in invoicing/ and read them in alphabetical order.",
      "Start with Grep for entry points, such as lateFee or the late-fee error message, then Read those files and follow their imports only as needed.",
      "Load the whole module into the system prompt.",
      "Delegate the verbose tracing to a read-only subagent that returns a summary of the flow.",
    ],
    correct: [2, 4],
    explanation:
      "Incremental exploration from Grep-found entry points reads only what the question needs (C), and a subagent keeps the verbose tracing out of the main context (E). A larger window (A) postpones the problem and buries the relevant code in the middle. Reading in alphabetical order (B) and loading everything into the prompt (D) are both upfront reading.",
  },
  {
    type: "single",
    scenario:
      "A lead asks the agent to add meaningful test coverage to a 200,000-line shipment-routing module that has almost none. The agent runs a fixed pipeline: for each file in alphabetical order, generate tests, run them, fix failures. Two weeks later there are hundreds of tests for trivial getters, and the core routing logic is still untested.",
    prompt: "What is the best change?",
    choices: [
      "Run the same pipeline across ten parallel subagents to finish faster.",
      "Add few-shot examples of high-quality unit tests to the prompt.",
      "Skip files shorter than 50 lines.",
      "Switch to dynamic decomposition: map the module's structure, identify the high-impact areas, and work from a prioritized plan that adapts as dependencies are discovered.",
    ],
    correct: [3],
    explanation:
      "An open-ended task needs a plan that comes from what the agent discovers, not a fixed per-file pipeline (D). Parallelizing (A) produces the wrong tests faster. Better examples (B) improve each test but not which code gets tested. A length filter (C) is a crude proxy for importance.",
  },
  {
    type: "single",
    scenario:
      "The team wants the agent to open Jira tickets, run read-only Postgres queries, and look up which team owns a service in the company's internal service catalog. A senior engineer proposes writing three custom MCP servers so that everything is built the same way.",
    prompt: "What is the best approach?",
    choices: [
      "Build all three custom servers, as proposed.",
      "Use existing, maintained servers for Jira and Postgres, and build a custom server only for the internal service catalog, exposing the catalog as a resource.",
      "Skip MCP and have the agent call each system with curl through Bash.",
      "Paste the service catalog into CLAUDE.md and use existing servers for the rest.",
    ],
    correct: [1],
    explanation:
      "Standard integrations should use existing servers, with custom servers reserved for team-specific systems, and a catalog fits naturally as a resource (B). Three custom servers (A) means owning auth, pagination and API changes for systems others already support. curl through Bash (C) loses structured tools, errors and scoping. A pasted catalog (D) goes stale and loads in every session whether it's needed or not.",
  },
  {
    type: "multi",
    scenario:
      "In one week: the code-mapper subagent, whose only job is answering questions about the code, edited two files to fix a typo it noticed. And the main agent ran git push --force to a shared branch, although its system prompt says never to force-push.",
    prompt: "Which TWO changes are most appropriate?",
    choices: [
      "Limit the code-mapper subagent to read-only tools such as Read, Grep and Glob.",
      "Add \"NEVER edit files\" in capital letters to the code-mapper's prompt.",
      "Remove Bash from the main agent entirely.",
      "Add a PreToolUse hook that denies Bash commands that force-push and tells the agent why.",
      "Require a person to approve every tool call the agent makes.",
    ],
    correct: [0, 3],
    explanation:
      "Scoping the subagent's tools to its role removes the ability to edit at all (A), and a hook turns the force-push rule into a guarantee (D). Stronger wording (B) is still prompt-based guidance. Removing Bash (C) also removes running tests and builds, which the agent needs. Approving every call (E) defeats the point of an automation tool when a targeted hook solves the problem.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a codebase assistant for a legacy repository",
  context:
    "Point a small Agent SDK assistant at an open-source project you haven't worked on (ideally one more than five years old) and make it genuinely useful. Work in ccarf-lab/exercises/6-4/.",
  requirements: [
    "Give the main agent the built-in tools plus Task, and define a read-only code-mapper subagent with Read, Grep and Glob that answers one question and returns a summary.",
    "Add PreToolUse hooks that block writes outside the repository and destructive Bash commands, and a PostToolUse hook that runs the project's formatter after edits.",
    "Connect one existing MCP server (for example GitHub) and write a small custom one that exposes a catalog resource of the repo's top-level modules with a one-line summary each.",
    "Ask five questions of increasing depth, from \"where is X defined?\" to \"how does a request flow from the entry point to storage?\", and log which tools the agent used for each.",
    "Generate one piece of boilerplate twice: once from a prose description, and once from an existing file used as a template. Compare the results.",
  ],
  successCriteria: [
    "Tool logs show Grep for content searches, Glob for file patterns, and incremental reading rather than bulk reads.",
    "At least one question requires tracing through a re-export, and the agent finds all the callers.",
    "The hooks block a deliberately requested force-push and a write to a path outside the repo.",
    "The template-based boilerplate matches house style without manual fixes.",
  ],
  stretchGoals: [
    "Fork the session after the structure analysis and try two refactoring approaches for the same module, then compare them.",
    "Ask for \"meaningful tests for the least-tested module\" and check whether the agent's plan changes after it discovers the module's dependencies.",
  ],
};

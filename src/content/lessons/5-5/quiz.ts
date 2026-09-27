import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Three hours into exploring a large payments codebase, an agent starts answering with phrases like \"this is typically handled in a service layer\" instead of naming the PaymentRouter and LedgerWriter classes it identified earlier. Two of its recent answers contradict findings from the first hour.",
    prompt: "What is happening, and what is the best remedy?",
    choices: [
      "The model has a bug with long sessions; restart and re-explore from scratch each hour.",
      "Context degradation. Have the agent keep a scratchpad file of key findings (classes, files, flows) and consult it for later questions, with verbose exploration delegated to subagents.",
      "The codebase is too large for Claude; split the repository.",
      "Raise the temperature so the agent explores more creatively.",
    ],
    correct: [1],
    explanation:
      "Generic \"typical pattern\" answers and inconsistency are the guide's signs of context degradation, and scratchpad files plus subagent delegation counteract it (B). Hourly restarts (A) throw away progress without a way to carry it forward. Splitting the repo (C) doesn't address how the session manages context. Temperature (D) is unrelated.",
  },
  {
    type: "multi",
    scenario:
      "An agent must understand a monorepo before a refactor. Its main context is filling with raw search results from questions like \"find all test files\" and \"trace every caller of the refund service.\"",
    prompt: "Which TWO practices follow the guide?",
    choices: [
      "Read every file into the main context once at the start, so later questions are answered from memory.",
      "Avoid subagents, because their summaries lose detail.",
      "Spawn subagents to investigate specific questions such as \"find all test files\" and \"trace refund flow dependencies\", each returning a summary.",
      "Paste the subagents' raw search output back into the main context for completeness.",
      "Keep the main agent focused on high-level coordination, working from the subagents' summaries.",
    ],
    correct: [2, 4],
    explanation:
      "Subagents isolate verbose exploration (C) so the main agent can hold the high-level picture (E). Reading everything up front (A) is the context flood that causes degradation. Avoiding subagents (B) keeps all the noise in the main context. Pasting raw output back (D) undoes the isolation.",
  },
  {
    type: "single",
    scenario:
      "A two-phase analysis first maps the architecture with several subagents, then spawns new subagents to trace specific flows. Phase 2 subagents keep re-deriving the module structure from scratch, spending most of their context on it.",
    prompt: "What is the best change?",
    choices: [
      "Summarize the key findings from Phase 1 (modules, entry points, ownership) and inject that summary into each Phase 2 subagent's initial context.",
      "Merge both phases into one very long session.",
      "Give Phase 2 subagents the full transcripts of every Phase 1 subagent.",
      "Skip Phase 1, since Phase 2 subagents rediscover the structure anyway.",
    ],
    correct: [0],
    explanation:
      "Summarizing each phase and injecting it into the next phase's prompts gives new subagents a compact, accurate starting point (A). One long session (B) brings back degradation. Full transcripts (C) flood the new subagents' contexts. Skipping Phase 1 (D) guarantees the duplicated work.",
  },
  {
    type: "single",
    scenario:
      "A multi-agent codebase audit runs for several hours. The process crashes during Phase 3, and the team has to rerun everything from the beginning.",
    prompt: "Which design prevents this?",
    choices: [
      "Run the whole audit in one agent so there's only one process to crash.",
      "Resume the crashed session with --resume and hope the context is intact.",
      "Save the final report more often.",
      "Have each agent export its state to a known location, and have the coordinator load a manifest on resume that records completed and pending work, injecting the saved state into agent prompts.",
    ],
    correct: [3],
    explanation:
      "Structured state exports plus a manifest the coordinator loads on resume is the guide's crash-recovery pattern (D). One agent (A) is still a single point of failure and degrades over a long run. Resuming a session (B) doesn't give a multi-agent system a recorded picture of what's done. Saving the report (C) doesn't help when the crash happens before the report exists.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about managing context in large codebase exploration are correct?",
    choices: [
      "Scratchpad files let key findings persist outside the context window, so they can be referenced for later questions.",
      "Context degradation can be solved permanently by using the largest available context window.",
      "Subagents should return their full raw tool output to the main agent.",
      "A coordinator that loads a manifest of agent state on resume can continue work after a crash without redoing completed phases.",
      "Generic answers citing \"typical patterns\" are a sign that exploration is going well.",
    ],
    correct: [0, 3],
    explanation:
      "Scratchpads persist findings across context boundaries (A), and manifests enable crash recovery (D). A larger window delays degradation but doesn't prevent it (B). Returning raw output (C) defeats the purpose of subagents. Generic \"typical pattern\" answers are a warning sign of degradation (E).",
  },
];

export const bonus: BonusScenario = {
  title: "Explore a real codebase with notes, subagents and a crash-safe manifest",
  context:
    "Map an unfamiliar open-source codebase with an exploration setup that resists context degradation and survives a crash. Work in ccarf-lab/exercises/5-5/.",
  requirements: [
    "Pick an open-source repository of at least 500 files that you haven't worked on.",
    "Write 12 questions about it, ranging from architecture to specific flows (\"what happens when X is called with Y?\"), and answer 4 of them yourself as spot-check ground truth.",
    "Baseline: ask all 12 in one long Claude Code session without special setup. Note where answers turn generic or inconsistent.",
    "Improved run: have the agent keep exploration-notes.md, use subagents (or the Explore agent) for specific investigations, and summarize after a mapping phase before tracing flows.",
    "Build a small coordinator script that writes each agent's output to state/<agent>.json and a manifest.json of completed and pending work. Kill it mid-run, restart, and have it resume from the manifest.",
  ],
  successCriteria: [
    "The improved run's answers to later questions cite specific files and classes, and your spot-checks agree with them.",
    "Your notes point to at least one place where the baseline drifted into generic or contradictory answers.",
    "After the forced crash, the coordinator resumes from the manifest without redoing completed agents.",
  ],
  stretchGoals: [
    "Compare /context usage at the end of both runs.",
    "Add an \"open questions\" section to the notes and have the agent work through it on its own in a later session.",
  ],
};

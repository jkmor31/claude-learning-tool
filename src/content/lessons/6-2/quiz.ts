import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A developer hits a crash in production. The stack trace points to line 88 of parseManifest.ts, where a field can be undefined, and the fix is a single null check in that function. A teammate suggests using plan mode first because \"it's always safer.\"",
    prompt: "How should the developer run this task?",
    choices: [
      "Use plan mode, since planning first is the safer default for every change.",
      "Have the Explore subagent map the whole codebase before touching the file.",
      "Use the interview pattern so Claude can ask about requirements before implementing.",
      "Use direct execution, since the change is small, well-understood and confined to one function.",
    ],
    correct: [3],
    explanation:
      "A single-file fix with a clear stack trace is the textbook case for direct execution (D). Plan mode (A) is for known complexity such as many files or architectural choices, and adds nothing here. Mapping the codebase (B) is wasted effort for a located bug. The interview pattern (C) is for unfamiliar domains with unclear requirements, and these requirements are clear.",
  },
  {
    type: "multi",
    scenario:
      "Three hours into a session exploring a legacy billing module, Claude starts describing \"a typical service layer\" instead of the InvoiceReconciler class it found earlier, and its answers to related questions no longer agree with each other.",
    prompt: "Which TWO changes best address this?",
    choices: [
      "Have Claude record key findings (class names, file paths, call chains) in a scratchpad file and refer to it for later questions.",
      "Repeat each question more firmly, reminding Claude to be specific.",
      "Delegate the remaining verbose discovery, such as finding every caller of reconcile(), to subagents that return summaries.",
      "Switch to a model with a larger context window.",
      "Remove the project CLAUDE.md to free up context space.",
    ],
    correct: [0, 2],
    explanation:
      "This is context degradation. A scratchpad file keeps findings exact across the session (A), and subagent delegation keeps verbose discovery output out of the main context (C). Rewording the question (B) doesn't restore lost detail. A larger window (D) doesn't fix how the information is organized. Removing CLAUDE.md (E) drops the team's standards to save a small amount of space.",
  },
  {
    type: "single",
    scenario:
      "The team wants a /release-notes workflow that analyzes several hundred commits, produces a lot of intermediate output, and then writes a summary. It should be available to everyone, shouldn't clutter the developer's main conversation, and should be limited to read-only git and file tools.",
    prompt: "What is the best way to set this up?",
    choices: [
      "Add the release-notes instructions to the project CLAUDE.md.",
      "Create a project skill in .claude/skills/release-notes/SKILL.md with context: fork and allowed-tools listing the read-only tools.",
      "Create a command in ~/.claude/commands/release-notes.md.",
      "Create a .claude/rules/ file with paths matching CHANGELOG.md.",
    ],
    correct: [1],
    explanation:
      "A project skill is shared through the repository, context: fork runs it in isolation so its output doesn't flood the session, and allowed-tools scopes its tools (B). CLAUDE.md (A) loads on every session and doesn't isolate anything. A user-level command (C) reaches only one developer. A path rule (D) loads conventions when matching files are read; it doesn't define an on-demand workflow.",
  },
  {
    type: "single",
    scenario:
      "Claude is writing a migration script that converts legacy date strings into ISO 8601. The developer has described the formats in two paragraphs of prose, but each attempt handles a different subset correctly, and the script crashes on records where the date is null.",
    prompt: "What is the most effective next step?",
    choices: [
      "Give Claude two or three concrete input/output examples, including a null input and its expected output.",
      "Rewrite the prose description in more detail and try again.",
      "Tell Claude to be more careful with edge cases.",
      "Switch to plan mode and ask Claude to design the migration again.",
    ],
    correct: [0],
    explanation:
      "When prose is interpreted inconsistently, concrete input/output examples, including the edge case, are the most effective way to show the transformation (A). More prose (B) is more of what already failed. \"Be more careful\" (C) gives no new information. Plan mode (D) is for architectural decisions, not for pinning down a transformation.",
  },
  {
    type: "multi",
    scenario:
      "A new hire says Claude ignores the team's API error-handling conventions, which the tech lead wrote in ~/.claude/CLAUDE.md. Separately, the project's root CLAUDE.md has grown to 900 lines, and conventions for test files, which sit next to the code across the repository, are applied inconsistently.",
    prompt: "Which TWO changes fix these problems most maintainably?",
    choices: [
      "Ask every developer to copy the tech lead's ~/.claude/CLAUDE.md into their own home directory.",
      "Place a CLAUDE.md with the test conventions in every directory that contains tests.",
      "Move the API conventions into the project CLAUDE.md, which is committed to the repository.",
      "Raise the model's effort setting so it reads the long CLAUDE.md more carefully.",
      "Move the test conventions into .claude/rules/testing.md with paths: [\"**/*.test.*\"].",
    ],
    correct: [2, 4],
    explanation:
      "Team conventions belong in the committed project CLAUDE.md so every developer gets them (C), and a path rule applies test conventions to matching files wherever they live while shrinking the root file (E). Copying files to home directories (A) works until the copies drift. A CLAUDE.md in every test folder (B) is hard to maintain and misses new folders. Effort (D) doesn't fix instructions that are hard to find in a 900-line file.",
  },
];

export const bonus: BonusScenario = {
  title: "Configure a repository for a whole team",
  context:
    "Set up a real repository (or a copy of one you know well) so Claude Code behaves the same way for every developer, then use it for three tasks of different sizes. Work in ccarf-lab/exercises/6-2/, and keep notes on what you observe.",
  requirements: [
    "Write a project CLAUDE.md under 150 lines with team standards, and move topic detail into @imported files or .claude/rules/ files.",
    "Add two path rules: one for an API or source folder, and one for test files with paths: [\"**/*.test.*\"]. Confirm with /memory or /context that each loads only when a matching file is read.",
    "Add a project command (/review with your checklist) and a project skill with context: fork and allowed-tools for a verbose workflow such as release notes.",
    "Add one MCP server to .mcp.json with credentials from an environment variable, and a personal one to your user config. Confirm both are available.",
    "Run three tasks: a one-line bug fix with direct execution, a multi-file refactor with plan mode first, and a transformation where you give Claude input/output examples after a prose attempt. Keep a scratchpad file during the refactor.",
  ],
  successCriteria: [
    "A second person (or a fresh clone in another directory) gets the same conventions, command and skill without copying anything by hand.",
    "The skill's intermediate output doesn't appear in the main conversation.",
    "Your notes record, for each of the three tasks, why the approach fit and what went wrong when you tried the other approach.",
  ],
  stretchGoals: [
    "Resume the refactor session the next day with --resume after changing two files by hand, tell Claude which files changed, and compare the result with starting fresh from a summary.",
    "Add a hook in .claude/settings.json that runs the formatter after every edit, and note how it differs from putting \"always run the formatter\" in CLAUDE.md.",
  ],
};

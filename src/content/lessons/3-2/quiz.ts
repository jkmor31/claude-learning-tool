import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A project's root CLAUDE.md has grown to 1,100 lines covering API design, testing, deployment, database migrations, and frontend styling. Three teams edit it, merge conflicts in it are common, and developers report that Claude sometimes misses guidance buried deep in the file.",
    prompt: "What is the best restructuring?",
    choices: [
      "Move the whole file to each developer's ~/.claude/CLAUDE.md so conflicts stop.",
      "Compress the file by removing all examples so it fits in fewer lines.",
      "Keep one file but add a table of contents at the top.",
      "Keep a short root CLAUDE.md and split the topics into focused files in .claude/rules/, such as testing.md, api-conventions.md, and deployment.md.",
    ],
    correct: [3],
    explanation:
      "The guide recommends splitting a large CLAUDE.md into topic-specific files in .claude/rules/ (D). That gives each topic an owner, removes conflicts in one shared file, and makes guidance easy to find. User-level files (A) stop sharing the conventions with the team. Removing examples (B) discards useful guidance and leaves the structural problem. A table of contents (C) doesn't fix ownership, conflicts, or size.",
  },
  {
    type: "multi",
    scenario:
      "A monorepo has a shared standards/ folder with eight standards files. The payments package needs the money-handling and PCI-logging standards; the web package needs the React and accessibility standards; neither needs the other's. Currently every standard is pasted into the root CLAUDE.md.",
    prompt: "Which TWO changes follow the guide's approach?",
    choices: [
      "Copy each relevant standard's text into the matching package's CLAUDE.md.",
      "Give each package its own CLAUDE.md that uses @import to include only the standards relevant to it.",
      "Put all eight standards into every package's CLAUDE.md so nothing is missed.",
      "Move the standards into each developer's user-level CLAUDE.md.",
      "Keep each standard in one file in standards/ and have the packages reference it rather than duplicating it.",
    ],
    correct: [1, 4],
    explanation:
      "Selective @import in each package's CLAUDE.md (B), with one maintained copy of each standard (E), is the guide's pattern. Copying text (A) means copies drift apart. Importing everything everywhere (C) brings back the noise the change was meant to remove. User-level files (D) aren't shared with the team.",
  },
  {
    type: "single",
    scenario:
      "The file packages/billing/CLAUDE.md contains the line \"@../../standards/invoicing.md\". A developer launches Claude Code from the repository root.",
    prompt: "How is the import path resolved?",
    choices: [
      "Relative to packages/billing/, the directory of the CLAUDE.md that contains the import, so it points to standards/invoicing.md at the repo root.",
      "Relative to the repository root where Claude Code was launched, so it points two levels above the repo.",
      "Relative to the user's home directory.",
      "Imports only work with absolute paths, so the line is ignored.",
    ],
    correct: [0],
    explanation:
      "Relative imports resolve from the file containing the import, not the launch directory (A). Resolving from the launch directory (B) would make imports break depending on where you start Claude. Imports aren't resolved from the home directory (C). Relative paths are allowed (D).",
  },
  {
    type: "single",
    scenario:
      "A team creates .claude/rules/ with testing.md, api-conventions.md, and deployment.md. None of the files has frontmatter. A developer asks when these rules will be loaded.",
    prompt: "What is the correct answer?",
    choices: [
      "Only when the developer types /rules.",
      "Only after each file is registered with an @import line in CLAUDE.md.",
      "At the start of every session, like CLAUDE.md, because rule files without path scoping apply unconditionally.",
      "Only when Claude edits a file named testing, api-conventions, or deployment.",
    ],
    correct: [2],
    explanation:
      "Rule files are discovered automatically, and without path scoping they load every session (C). No command is needed to activate them (A). They don't need to be imported from CLAUDE.md (B). A rule's file name describes its topic; it doesn't control when it loads, which is what paths frontmatter is for (D).",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about modular CLAUDE.md configuration are correct?",
    choices: [
      "The @import syntax lets a CLAUDE.md reference external files, keeping it modular.",
      "Standards should be copied into every package so each package is self-contained.",
      "A monolithic CLAUDE.md is preferred because rules in separate files are ignored.",
      ".claude/rules/ holds topic-specific rule files as an alternative to one monolithic CLAUDE.md.",
      "@import only works for files inside .claude/.",
    ],
    correct: [0, 3],
    explanation:
      "@import keeps CLAUDE.md modular (A), and .claude/rules/ organizes topic-specific rules (D). Copies drift (B). Rule files are loaded, not ignored (C). Imports can reference files anywhere in the project, and even outside it with approval (E).",
  },
];

export const bonus: BonusScenario = {
  title: "Modularize your lab repo's configuration",
  context:
    "Turn a deliberately bloated CLAUDE.md into a modular setup with shared standards and topic rules, and measure the difference. Work in ccarf-lab/exercises/3-2/ and the lab repo.",
  requirements: [
    "Write (or generate) a bloated root CLAUDE.md of 300+ lines that mixes build commands, API conventions, testing rules, deployment steps, and frontend style.",
    "Record a baseline: run /context in a session in each package and note the memory files and their approximate size.",
    "Create a standards/ folder with at least four standards files, and give packages/api/ and packages/web/ their own CLAUDE.md files that @import only the relevant ones.",
    "Move the remaining topics into .claude/rules/testing.md, api-conventions.md, and deployment.md, and cut the root CLAUDE.md to under 60 lines.",
    "Ask the same three tasks (one API change, one web change, one test) before and after, and note which instructions Claude followed each time.",
  ],
  successCriteria: [
    "Each standard exists in exactly one file, and git grep shows no duplicated standards text.",
    "/context shows the api package session loading API standards but not web ones, and vice versa.",
    "Claude follows the conventions for all three tasks at least as well as with the bloated file. Record any differences.",
  ],
  stretchGoals: [
    "Add a nested import chain (a standards file that imports another) and find how deep Claude Code will follow it.",
    "Mention a path in backticks inside CLAUDE.md and confirm it isn't imported.",
  ],
};

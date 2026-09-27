import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A frontend monorepo keeps each component's test file (*.test.tsx) next to its source file, across roughly 60 feature folders. The team has specific testing conventions, and Claude often ignores them when writing tests. Someone proposes adding a CLAUDE.md with the testing conventions to each of the 60 folders.",
    prompt: "What is the better approach?",
    choices: [
      "Put the testing conventions in each developer's ~/.claude/CLAUDE.md.",
      "Add the 60 CLAUDE.md files as proposed, and write a script to keep them in sync.",
      "Move all test files into a single tests/ folder so one directory-level CLAUDE.md can cover them.",
      "Create one .claude/rules/testing.md with paths: [\"**/*.test.tsx\"], so the conventions load whenever Claude works on a test file anywhere.",
    ],
    correct: [3],
    explanation:
      "A path-scoped rule with a glob pattern applies to a file type regardless of directory, which is exactly the guide's recommendation for conventions spread across the codebase (D). User-level files (A) don't reach teammates. Sixty synced copies (B) add maintenance and drift risk to work around the wrong tool. Restructuring the repo (C) changes the codebase to suit the configuration.",
  },
  {
    type: "multi",
    scenario:
      "A repository's root CLAUDE.md includes 80 lines of Terraform conventions. Only about one session in ten touches files under terraform/. Developers working on application code complain that Claude sometimes applies infrastructure advice to unrelated work.",
    prompt: "Which TWO statements describe the best fix and its effect?",
    choices: [
      "Move the Terraform conventions into .claude/rules/terraform.md with paths: [\"terraform/**/*\"].",
      "Move the Terraform conventions into ~/.claude/CLAUDE.md for the platform team only.",
      "The conventions will then load only when Claude works on files under terraform/, reducing irrelevant context and token use in other sessions.",
      "Add \"Ignore Terraform rules unless working on Terraform\" to the root CLAUDE.md.",
      "Path-scoped rules load in every session but are hidden from the model until needed.",
    ],
    correct: [0, 2],
    explanation:
      "A rule scoped with paths: [\"terraform/**/*\"] (A) loads only when matching files are in play, which cuts irrelevant context and tokens (C). User-level config (B) hides the conventions from anyone outside the platform team. A \"please ignore\" instruction (D) still spends the tokens and relies on the model to filter. Path-scoped rules don't load at all until a matching file is involved (E).",
  },
  {
    type: "single",
    prompt: "A rule file in .claude/rules/ has no YAML frontmatter. When does it load?",
    choices: [
      "Never, until it's given a paths field.",
      "At the start of every session, like CLAUDE.md.",
      "Only when Claude edits a file with the same name as the rule.",
      "Only when a user runs /memory.",
    ],
    correct: [1],
    explanation:
      "Rules without paths apply unconditionally and load every session (B). paths makes a rule conditional; it isn't required for the rule to load at all (A). The rule's file name is just its topic (C). /memory shows memory files; it doesn't activate them (D).",
  },
  {
    type: "single",
    scenario:
      "The payments team owns packages/payments/, a self-contained package. They have conventions for money handling that apply to every file in that package and nowhere else.",
    prompt: "Which configuration fits best?",
    choices: [
      "A rule with paths: [\"**/*\"].",
      "A rule with paths: [\"**/*.test.tsx\"].",
      "A directory-level packages/payments/CLAUDE.md (or an equivalent rule scoped to packages/payments/**).",
      "The repository's root CLAUDE.md, so every session sees the money-handling rules.",
    ],
    correct: [2],
    explanation:
      "When a convention belongs to one folder, a directory-level CLAUDE.md is a natural fit, and a rule scoped to that folder works too (C). A paths value of **/* (A) matches everything, so it's no longer conditional. A test-file pattern (B) targets the wrong files. The root file (D) loads the rules in every session, including those that never touch payments.",
  },
  {
    type: "multi",
    prompt: "Which TWO glob patterns in a rule's paths field would match src/features/cart/CartItem.test.tsx?",
    choices: [
      "*.test.tsx",
      "**/*.test.tsx",
      "tests/**/*.tsx",
      "src/*.test.tsx",
      "src/**/*.{ts,tsx}",
    ],
    correct: [1, 4],
    explanation:
      "**/*.test.tsx matches test files in any folder (B), and src/**/*.{ts,tsx} matches any .ts or .tsx file under src/ (E). *.test.tsx without ** matches only files at the root (A). tests/** requires a tests folder (C). src/*.test.tsx matches only files directly in src/ (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Replace folder-by-folder rules with path-scoped rules",
  context:
    "Convert your lab repo's conventions to path-scoped rules and show that they load only when relevant. Work in ccarf-lab/.claude/rules/ and write notes in ccarf-lab/exercises/3-5/.",
  requirements: [
    "Spread at least eight test files across four or more feature folders, and add an infra/ folder with a couple of Terraform or YAML files.",
    "Write .claude/rules/testing.md with paths covering your test files, and .claude/rules/infra.md with paths: [\"infra/**/*\"], each with three or four specific, checkable conventions.",
    "Start a session, ask Claude to edit a non-test source file, and check with /context that neither rule loaded.",
    "In the same or a new session, ask Claude to add a test in one feature folder, and confirm the testing rule loaded and its conventions were followed.",
    "Create a new feature folder with a test file and confirm the rule applies there without any configuration change.",
    "Write a short comparison of this setup against one CLAUDE.md per feature folder: files to maintain, and tokens loaded in a typical non-test session.",
  ],
  successCriteria: [
    "/context output shows each rule loading only in sessions that touch matching files.",
    "The test Claude writes in the new folder follows every convention in testing.md.",
    "Your comparison shows one testing rule replacing at least four folder-level files.",
  ],
  stretchGoals: [
    "Write a pattern that accidentally matches too much (for example **/*), observe the effect, and fix it.",
    "Add a user-level rule in ~/.claude/rules/ for a personal preference and confirm it applies across projects.",
  ],
};

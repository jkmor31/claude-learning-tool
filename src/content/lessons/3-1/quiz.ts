import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "For six months, Claude Code has followed the team's error-handling conventions perfectly for the senior developer who set the project up. Two engineers who joined this month report that Claude ignores those conventions in their sessions on the same repository, using the same model.",
    prompt: "What is the most likely cause?",
    choices: [
      "The new engineers' sessions are using a smaller context window.",
      "The conventions are written in the senior developer's ~/.claude/CLAUDE.md, which isn't shared through version control.",
      "The project's CLAUDE.md is too long for Claude to read in full.",
      "Claude needs several weeks of use in a repository before it learns its conventions.",
    ],
    correct: [1],
    explanation:
      "User-level instructions apply only to that user, so a teammate who clones the repo never receives them (B). The fix is to move team conventions into the project-level CLAUDE.md. Context window size (A) doesn't differ by person on the same model. A long project file (C) would affect everyone, including the senior developer. CLAUDE.md is loaded each session; Claude doesn't gradually learn a repo over weeks (D).",
  },
  {
    type: "multi",
    scenario:
      "A developer wants to organize three kinds of instructions: (1) \"Always explain your reasoning in bullet points\", a personal preference; (2) the team's build and test commands; (3) conventions that apply only to code in packages/payments/.",
    prompt: "Which TWO placements are correct?",
    choices: [
      "Put the personal preference in ~/.claude/CLAUDE.md.",
      "Put the build and test commands in ~/.claude/CLAUDE.md so they apply in every project.",
      "Put the personal preference in the repo's root CLAUDE.md so it's backed up in git.",
      "Put the payments conventions in packages/payments/CLAUDE.md.",
      "Put all three in the root CLAUDE.md, since only one CLAUDE.md is loaded at a time.",
    ],
    correct: [0, 3],
    explanation:
      "Personal preferences belong at user level (A), and directory-specific conventions belong in that directory's CLAUDE.md (D). Team build commands in user scope (B) wouldn't reach teammates. A personal preference in the root file (C) imposes it on the whole team. Multiple CLAUDE.md files are combined, not loaded one at a time (E).",
  },
  {
    type: "single",
    scenario:
      "A developer reports that Claude Code follows the team's naming rules in some sessions and ignores them in others. They're not sure which instruction files are being picked up, and they've been adding and removing rules in several places.",
    prompt: "What is the best first diagnostic step?",
    choices: [
      "Add \"IMPORTANT\" in capital letters to every naming rule.",
      "Delete all CLAUDE.md files and start over with a single one.",
      "Run /memory to see which memory files are loaded, and compare across the sessions that behave differently.",
      "Switch to a larger model, which follows instructions more consistently.",
    ],
    correct: [2],
    explanation:
      "The guide's tool for diagnosing inconsistent behavior is /memory, which shows which memory files are in use (C). Emphasis (A) doesn't help if the file isn't loaded at all. Deleting everything (B) discards working configuration before you know the cause. A larger model (D) can't follow instructions that aren't in its context.",
  },
  {
    type: "single",
    scenario:
      "A team's root CLAUDE.md says \"Never modify files in config/production/.\" Claude Code follows this almost always, but twice this quarter it edited a production config while fixing a related bug. The team needs a guarantee.",
    prompt: "What is the best change?",
    choices: [
      "Repeat the instruction in every directory-level CLAUDE.md.",
      "Move the instruction to each developer's ~/.claude/CLAUDE.md.",
      "Rewrite the instruction in capital letters with the word CRITICAL.",
      "Add a deterministic control, such as a PreToolUse hook or permission rule that blocks writes to config/production/.",
    ],
    correct: [3],
    explanation:
      "CLAUDE.md is context that makes compliance likely, not guaranteed. When something must never happen, use a deterministic control (D). Repeating the text (A) or adding emphasis (C) makes compliance more likely, not certain. Moving it to user scope (B) makes it apply to fewer people, not more reliably.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about the CLAUDE.md hierarchy are correct?",
    choices: [
      "A project-level CLAUDE.md replaces the user-level file, so only one is ever in context.",
      "Instructions in ~/.claude/CLAUDE.md are shared with teammates when they clone the repository.",
      "Project-level instructions can live in the repo's root CLAUDE.md or in .claude/CLAUDE.md.",
      "Directory-level CLAUDE.md files only work in the repository's root directory.",
      "A subdirectory's CLAUDE.md adds conventions specific to that part of the codebase on top of the broader files.",
    ],
    correct: [2, 4],
    explanation:
      "The project level can be the root CLAUDE.md or .claude/CLAUDE.md (C), and directory-level files add to the broader levels (E). Files are combined rather than replacing each other (A). User-level files live in your home directory and aren't in the repo (B). Directory-level files live in subdirectories, by definition (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Build and debug a three-level CLAUDE.md setup",
  context:
    "Set up the full CLAUDE.md hierarchy for your ccarf-lab repo, then deliberately break it the way the exam describes and diagnose it. Work in ccarf-lab/exercises/3-1/ and the lab repo root.",
  requirements: [
    "Create a small two-package layout in ccarf-lab (for example packages/api/ and packages/web/), each with a few source files.",
    "Write a project-level CLAUDE.md with build and test commands and two team conventions, plus a packages/api/CLAUDE.md with one API-only convention.",
    "Put one personal preference in ~/.claude/CLAUDE.md, such as always ending answers with a one-line summary.",
    "In a session, ask for a change in packages/api/ and one in packages/web/. Confirm with /memory (and /context) which files were loaded each time.",
    "Simulate the new-teammate bug: move one team convention from the project file into your user-level file, then run Claude Code as a different OS user or in a container with an empty home directory. Record what happens.",
    "Fix it by moving the convention back, and write a short note on how you diagnosed it.",
  ],
  successCriteria: [
    "The API-only convention is followed for the api change and doesn't appear in context for the web change.",
    "Your notes show the simulated new teammate missing the moved convention, and receiving it again after the fix.",
    "Your personal preference applies in your sessions and appears nowhere in the repository.",
  ],
  stretchGoals: [
    "Add a PreToolUse hook that blocks edits to a protected folder, and compare it with a CLAUDE.md instruction saying the same thing.",
    "Put two contradicting instructions at project and directory level, and record which one Claude follows over five runs.",
  ],
};

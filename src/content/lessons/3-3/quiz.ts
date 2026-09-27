import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A tech lead wrote a /security-review command that checks diffs against the team's security checklist. It lives in ~/.claude/commands/security-review.md on the lead's laptop. The lead wants every engineer on the team to run exactly the same review before opening a pull request.",
    prompt: "What should the lead do?",
    choices: [
      "Move the file to .claude/commands/security-review.md in the repository and commit it.",
      "Email the file to each engineer and ask them to save it in their own ~/.claude/commands/ folder.",
      "Paste the command's text into the project CLAUDE.md.",
      "Keep it in the lead's home directory and run reviews for everyone.",
    ],
    correct: [0],
    explanation:
      "Project-scoped commands in .claude/commands/ are shared through version control, so everyone gets the same command and future updates arrive with a pull (A). Emailed copies (B) drift apart and never receive updates. CLAUDE.md text (C) loads every session and doesn't create a /security-review command. Running every review personally (D) doesn't scale and isn't what the lead asked for.",
  },
  {
    type: "single",
    scenario:
      "A team command .claude/commands/deploy-check.md takes an environment name. Developers keep running /deploy-check with no argument and getting a confusing generic answer, because the command's prompt uses $ARGUMENTS for the environment.",
    prompt: "What is the most direct improvement?",
    choices: [
      "Rename the command to /deploy-check-with-environment.",
      "Remove $ARGUMENTS and hard-code the production environment.",
      "Move the command to user scope so each developer can edit it.",
      "Add argument-hint: [environment] to the command's frontmatter so developers see what to pass when they invoke it.",
    ],
    correct: [3],
    explanation:
      "argument-hint shows developers the required parameter when they invoke the command (D). A longer name (A) doesn't tell anyone the expected value. Hard-coding production (B) breaks the command for other environments. User scope (C) fragments a team workflow and doesn't solve the missing argument.",
  },
  {
    type: "multi",
    scenario:
      "Your team shares .claude/commands/review.md. You personally want a variant that also flags N+1 database queries, which the team doesn't consider part of its standard review.",
    prompt: "Which TWO approaches are appropriate?",
    choices: [
      "Edit .claude/commands/review.md to add the N+1 check and commit it without discussion.",
      "Create a personal command under a different name, such as ~/.claude/commands/review-perf.md.",
      "Create ~/.claude/commands/review.md with the same name so yours shadows the team version.",
      "Include the team's review steps in your personal variant and add the N+1 check to it.",
      "Delete the team command and replace it with yours.",
    ],
    correct: [1, 3],
    explanation:
      "A personal variant with a different name (B), built on the team's steps plus your addition (D), leaves the shared command unchanged. Editing the shared file without agreement (A) changes the review for everyone. Reusing the name (C) means one version silently takes priority, so you may stop running the team standard without noticing, and \"/review\" means different things to different people. Deleting the team command (E) removes a shared workflow.",
  },
  {
    type: "single",
    prompt: "A file is saved at .claude/commands/db/migrate.md in a project. How is it invoked?",
    choices: [
      "As /migrate.md",
      "It isn't; commands must be directly inside .claude/commands/, not in subfolders.",
      "As /db:migrate",
      "Only through the Skill tool, never by typing a slash command.",
    ],
    correct: [2],
    explanation:
      "Subfolders namespace commands, so db/migrate.md becomes /db:migrate (C). The .md extension isn't part of the name (A). Subfolders are supported (B). Commands are invoked by typing them after a slash (D).",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about custom slash commands are correct?",
    choices: [
      "Commands in ~/.claude/commands/ are shared with teammates who clone the repository.",
      "A command must be written in JSON.",
      "Project-scoped commands in .claude/commands/ are shared through version control.",
      "Commands can only be invoked by Claude, never by the user.",
      "$ARGUMENTS in a command's body is replaced with the text the user types after the command.",
    ],
    correct: [2, 4],
    explanation:
      "Project commands are shared through version control (C), and $ARGUMENTS receives the user's arguments (E). User-level commands stay on your machine (A). Commands are Markdown files, optionally with YAML frontmatter (B). Users invoke them by typing the slash command (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Build a team command set for your lab repo",
  context:
    "Create three project commands that encode a team standard, plus one personal variant, in your ccarf-lab repo. Work in ccarf-lab/.claude/commands/ and write notes in ccarf-lab/exercises/3-3/.",
  requirements: [
    "Write a docs/review-checklist.md with at least six concrete items, such as input validation on new endpoints and no secrets in logs.",
    "Create /review in .claude/commands/ that reviews staged changes against the checklist, accepts an optional focus area via $ARGUMENTS, and outputs a table with file, line, severity, and issue.",
    "Create /release-notes that injects the git log since the last tag with a command in the prompt, and groups commits into Features, Fixes, and Internal.",
    "Create /db:new-migration in a db/ subfolder that takes a description argument, with an argument-hint.",
    "Create a personal variant ~/.claude/commands/review-perf.md that runs the team review plus a performance check.",
    "Commit the project commands, clone the repo into a fresh folder, and confirm the three commands appear there while review-perf doesn't.",
  ],
  successCriteria: [
    "Running /review twice on the same staged diff gives the same output format and checklist coverage.",
    "/release-notes works without you pasting any git output.",
    "The fresh clone has the team commands and not your personal one.",
    "Running /db:new-migration with no argument shows the argument hint.",
  ],
  stretchGoals: [
    "Convert /review into a skill at .claude/skills/review/SKILL.md with the checklist as a supporting file, and compare the two versions.",
    "Stage a diff that violates two checklist items and check that /review catches both in three out of three runs.",
  ],
};

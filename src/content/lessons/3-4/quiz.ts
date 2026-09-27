import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A team's /map-architecture skill scans the whole codebase and produces a one-page summary of modules and their dependencies. Developers like the summary but complain that after running it, the main session is full of hundreds of file reads and search results, and Claude loses track of the task they were working on.",
    prompt: "What is the best change to the skill?",
    choices: [
      "Add \"be brief\" to the skill's instructions.",
      "Move the skill's instructions into CLAUDE.md so they're always loaded.",
      "Add context: fork to the skill's frontmatter so it runs in an isolated subagent context and returns only its summary.",
      "Tell developers to run /compact after every use of the skill.",
    ],
    correct: [2],
    explanation:
      "context: fork isolates verbose work in a subagent, so only the result reaches the main conversation (C). \"Be brief\" (A) might shorten the final summary but doesn't stop the intermediate reads from filling the session. Moving it into CLAUDE.md (B) adds its tokens to every session and doesn't isolate anything. /compact after every run (D) is a manual workaround that loses detail and relies on everyone remembering.",
  },
  {
    type: "single",
    scenario:
      "A /scaffold-component skill generates new component files from a template. During testing, it once ran a shell command that deleted a directory while \"cleaning up.\" The team wants the skill limited to reading templates and writing new files.",
    prompt: "Which frontmatter change does the exam guide recommend?",
    choices: [
      "Set argument-hint to [component-name].",
      "Configure allowed-tools to list only the read and write tools the skill needs, such as Read and Write.",
      "Set context: fork so the skill runs in a subagent.",
      "Add disable-model-invocation: true.",
    ],
    correct: [1],
    explanation:
      "The guide uses allowed-tools in skill frontmatter to restrict tool access during skill execution, such as limiting a skill to file operations to prevent destructive actions (B). (In current Claude Code, allowed-tools pre-approves the listed tools, so pair it with disallowed-tools or a deny rule for a hard guarantee.) argument-hint (A) only helps with parameters. A forked subagent (C) isolates context but still has tools. disable-model-invocation (D) controls who can trigger the skill, not what it can do.",
  },
  {
    type: "multi",
    scenario:
      "A team is deciding where to put three pieces of guidance: (1) \"Use pnpm, never npm\"; (2) a 60-line procedure for rotating API keys, needed a few times a year; (3) a 45-line checklist for writing database migrations, used about once a month.",
    prompt: "Which TWO decisions are best?",
    choices: [
      "Put \"Use pnpm, never npm\" in the project CLAUDE.md.",
      "Put all three in the project CLAUDE.md so Claude always knows them.",
      "Put the key-rotation procedure in CLAUDE.md, since security matters more than token cost.",
      "Put \"Use pnpm, never npm\" in a skill that developers invoke before installing packages.",
      "Make the key-rotation procedure and the migration checklist into skills that load when needed.",
    ],
    correct: [0, 4],
    explanation:
      "A universal rule that applies to almost every session belongs in CLAUDE.md (A), and task-specific procedures belong in skills loaded on demand (E). Putting everything in CLAUDE.md (B) or putting a rarely used procedure there (C) spends tokens every session on guidance that's rarely relevant. A skill for the pnpm rule (D) relies on someone remembering to invoke it, when it should apply always.",
  },
  {
    type: "single",
    scenario:
      "Developers frequently invoke the team's /bisect-regression skill without saying which test is failing, and it produces a generic essay about git bisect.",
    prompt: "Which frontmatter addition addresses this most directly?",
    choices: [
      "context: fork",
      "allowed-tools: Bash",
      "disable-model-invocation: true",
      "argument-hint: [failing-test-name]",
    ],
    correct: [3],
    explanation:
      "argument-hint prompts developers for the required parameter when they invoke the skill (D). context: fork (A) isolates output but doesn't ask for input. allowed-tools (B) concerns tools, not parameters. disable-model-invocation (C) stops Claude from triggering the skill automatically, which doesn't help when a person invokes it without the argument.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about skills are correct?",
    choices: [
      "Skills are loaded into every session, like CLAUDE.md.",
      "Personal variants of a team skill should go in ~/.claude/skills/ under a different name.",
      "A skill with context: fork sees the full main-conversation history and writes its intermediate output there.",
      "context: fork is useful for exploratory work such as brainstorming alternatives, so the main session receives only the outcome.",
      "Skills in ~/.claude/skills/ are shared with teammates through version control.",
    ],
    correct: [1, 3],
    explanation:
      "Personal variants belong in ~/.claude/skills/ with different names (B), and context: fork keeps exploratory context out of the main session (D). Skills load on demand, not every session (A). A forked skill runs in an isolated context and returns only its result (C). ~/.claude/skills/ is personal and not in the repo (E).",
  },
];

export const bonus: BonusScenario = {
  title: "Build a forked analysis skill and a scoped generator skill",
  context:
    "Create two project skills in your ccarf-lab repo, one that isolates verbose analysis and one with limited tools, and measure the effect on your main session. Work in ccarf-lab/.claude/skills/ and write notes in ccarf-lab/exercises/3-4/.",
  requirements: [
    "Create an analyze-deps skill (or a similar audit over many files) with a description, argument-hint, and a report template as a supporting file.",
    "Run it once without context: fork and use /context to record how much of the main session it consumed. Then add context: fork, run it again, and compare.",
    "Create a scaffold-exercise skill that creates exercises/<id>/ with a README template. List only the tools it needs in allowed-tools, and add disallowed-tools for Bash.",
    "Ask the scaffold skill to \"clean up old exercises\" and record what it's able to do.",
    "Move one task-specific procedure out of your CLAUDE.md into a skill, and write one sentence explaining why it belongs there.",
    "Create a personal variant of one skill in ~/.claude/skills/ under a different name.",
  ],
  successCriteria: [
    "The forked run leaves only the summary in your main session. Record the before and after context usage.",
    "The scaffold skill can't run shell commands, and your notes show the attempt being blocked.",
    "Invoking a skill without its argument shows the argument hint.",
    "Your personal variant appears for you and isn't in the repository.",
  ],
  stretchGoals: [
    "Set agent: Explore on the forked analysis skill and compare speed and output with the default subagent.",
    "Write a vague and a precise description for the same skill, and count how often Claude invokes it automatically for five matching requests.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A team adds a pipeline step that runs claude \"Review the changes in this pull request\". Locally the command works. In CI, the step never finishes and is killed by the job timeout after 60 minutes, with no output.",
    prompt: "What is the most likely fix?",
    choices: [
      "Increase the job timeout to 120 minutes.",
      "Pipe the word \"yes\" into the command so it answers any prompts.",
      "Run it with the -p (--print) flag so Claude Code runs non-interactively and exits when done.",
      "Set the environment variable CI=true so Claude Code detects the pipeline.",
    ],
    correct: [2],
    explanation:
      "Without -p, Claude Code starts an interactive session and waits for input that never comes; -p runs the task non-interactively and exits (C). A longer timeout (A) just waits longer. Piping \"yes\" (B) is a fragile hack that doesn't turn on non-interactive mode. CI=true (D) isn't how Claude Code switches to non-interactive mode.",
  },
  {
    type: "multi",
    scenario:
      "A review pipeline currently prints Claude's findings as prose, and a script uses regular expressions to pull out file names and line numbers for inline PR comments. The script breaks every few days when the prose format shifts.",
    prompt: "Which TWO changes should the team make?",
    choices: [
      "Add more regular expressions to cover each new prose variation.",
      "Run Claude Code with --output-format json and a --json-schema defining findings with file, line, severity, and message.",
      "Ask Claude in the prompt to \"always use the same format.\"",
      "Have the posting script read the schema-conforming findings from the structured_output field and post each one as an inline comment.",
      "Switch to plain-text output and post the whole review as one comment.",
    ],
    correct: [1, 3],
    explanation:
      "--output-format json with --json-schema produces schema-conforming findings (B) that a script can read reliably from structured_output (D). More regexes (A) keep chasing a moving format. A prompt instruction (C) is probabilistic and can't guarantee a schema. One big comment (E) gives up inline posting, which was the goal.",
  },
  {
    type: "single",
    scenario:
      "A CI job uses Claude Code to generate unit tests for changed files. The generated tests use a different mocking library than the team's, ignore the shared fixtures in test/fixtures/, and follow no consistent naming. Developers have been fixing them by hand.",
    prompt: "What is the most effective change?",
    choices: [
      "Document the testing standards, naming conventions, and available fixtures in the project's CLAUDE.md, which CI-invoked Claude Code loads.",
      "Put the conventions in the senior engineer's ~/.claude/CLAUDE.md.",
      "Switch the CI job to interactive mode so a developer can guide it.",
      "Run the job twice and keep whichever output looks better.",
    ],
    correct: [0],
    explanation:
      "CLAUDE.md is how CI-invoked Claude Code gets project context such as testing standards and fixtures (A). A personal user-level file (B) doesn't exist on the CI runner. Interactive mode (C) defeats automation and would hang. Running twice (D) doesn't give Claude the missing information.",
  },
  {
    type: "single",
    prompt: "What does adding --json-schema to a Claude Code run with --output-format json do?",
    choices: [
      "It validates the repository's JSON files against the schema.",
      "It formats the terminal output with colors.",
      "It makes Claude Code run interactively until the user approves the schema.",
      "It makes the response conform to the given JSON Schema, with the validated object in the structured_output field.",
    ],
    correct: [3],
    explanation:
      "--json-schema enforces the output's structure, and the conforming object appears in structured_output (D). It doesn't validate repository files (A), control terminal colors (B), or add interactive approval (C).",
  },
  {
    type: "multi",
    prompt: "Which TWO practices are appropriate when running Claude Code in a CI pipeline?",
    choices: [
      "Committing the Anthropic API key to the repository so the job can read it.",
      "Supplying the API key from the CI system's secret store.",
      "Giving the review job unrestricted permission to edit files and push commits, in case it needs to.",
      "Leaving -p off so the job can ask for clarification if needed.",
      "Pre-approving only the tools the job needs, such as read-only tools for a review job.",
    ],
    correct: [1, 4],
    explanation:
      "Credentials belong in the CI secret store (B), and a job should get only the tools its task requires (E). A committed key (A) is exposed to everyone with repo access. Unrestricted edit and push access for a review job (C) breaks least privilege. Without -p (D), the job hangs, since nobody can answer.",
  },
];

export const bonus: BonusScenario = {
  title: "Add a structured Claude review to your lab repo's CI",
  context:
    "Wire Claude Code into a GitHub Actions workflow in your ccarf-lab repo that reviews pull requests and posts inline comments from structured output. Work in ccarf-lab/.github/ and write notes in ccarf-lab/exercises/3-8/.",
  requirements: [
    "Add ANTHROPIC_API_KEY as a repository secret. Never commit it or print it in logs.",
    "Write .github/review-schema.json defining findings with file, line, severity (critical, major, minor), and message.",
    "Create a workflow on pull_request that computes the diff, runs claude -p with --output-format json, --json-schema, and read-only --allowedTools, and saves the result.",
    "Write a small script (Node or Python) that reads structured_output.findings and posts each as an inline review comment through the GitHub API (or gh).",
    "Add review criteria to CLAUDE.md, such as what counts as critical and what to ignore.",
    "Open a test PR with at least two deliberate bugs and one style-only change.",
  ],
  successCriteria: [
    "The job finishes without hanging and exits with a success code.",
    "Both deliberate bugs get inline comments on the correct lines, and the style-only change doesn't.",
    "The posting script contains no regular-expression parsing of prose.",
    "The workflow file and logs contain no secret values.",
  ],
  stretchGoals: [
    "Make the job fail when any critical finding is present, so it can block merging.",
    "Try the same job with --bare and pass the review criteria with --append-system-prompt-file, then compare the results.",
  ],
};

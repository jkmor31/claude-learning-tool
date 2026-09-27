import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Before deprecating a helper called formatCurrency, a developer asks Claude Code to find every place in a 3,000-file repository that calls it.",
    prompt: "Which built-in tool should the agent reach for first?",
    choices: [
      "Glob with the pattern **/formatCurrency*",
      "Read every file under src/ and scan each one",
      "Grep for formatCurrency across the codebase",
      "Bash to run the test suite and look for failures",
    ],
    correct: [2],
    explanation:
      "Finding callers means searching file contents, which is what Grep does (C). Glob (A) matches file names and paths, so it only finds files named after the function, not the places that call it. Reading every file (B) wastes context on thousands of irrelevant files. The test suite (D) shows only callers that happen to be tested, and only once they break.",
  },
  {
    type: "single",
    scenario:
      "An agent is asked to add a license header to every React component test file in a monorepo. Test files follow the naming convention *.test.tsx and live in many different folders.",
    prompt: "What is the best way to find the files?",
    choices: [
      "Glob with the pattern **/*.test.tsx",
      "Grep for the word \"test\" across the repository",
      "Read each package's package.json to find its test directory",
      "Grep for import statements from the testing library",
    ],
    correct: [0],
    explanation:
      "The files are identified by their names, so Glob with a recursive naming pattern is the right tool (A). Grepping for \"test\" (B) matches content in countless non-test files. package.json (C) doesn't reliably list individual test files. Grepping for testing-library imports (D) finds some test files but misses others and also picks up test utilities that aren't tests.",
  },
  {
    type: "multi",
    scenario:
      "An agent needs to change the timeout for only the payments service in config/services.ts. Every service block in the file contains an identical line, \"  timeout: 5000,\". The agent's Edit call fails because the old text matches four places.",
    prompt: "Which TWO statements are correct?",
    choices: [
      "Edit should be retried with the same old_string until it succeeds.",
      "Edit failed because its anchor text must be unique within the file.",
      "The agent should delete config/services.ts and recreate it from memory with Write.",
      "A reliable fallback is to Read the full file, change only the payments block, and Write the file back.",
      "The agent should switch to Bash and use sed to replace every occurrence of the line.",
    ],
    correct: [1, 3],
    explanation:
      "Edit needs an exact, unique match, which is why it failed (B), and Read + Write is the guide's reliable fallback when the anchor text isn't unique (D). Retrying the same call (A) fails the same way. Rewriting from memory (C) risks silently dropping content the agent didn't reproduce. A global sed replacement (E) changes all four services' timeouts, not just the payments one.",
  },
  {
    type: "single",
    scenario:
      "A new agent is asked to find why some password-reset emails are never sent, in an unfamiliar codebase of about 400 files. Its first plan is to Read every file in the src/ directory to \"understand the architecture\" before investigating.",
    prompt: "What is the better approach?",
    choices: [
      "Read every file, but summarize each one to save context.",
      "Glob for all .ts files and Read them in alphabetical order.",
      "Ask the user to paste in the relevant files.",
      "Grep for entry points such as the reset route or email-sending function, Read those files, and follow their imports only as far as the trace requires.",
    ],
    correct: [3],
    explanation:
      "The guide recommends building understanding incrementally: Grep to find entry points, then Read and follow imports (D). Reading everything, even with summaries (A), still spends effort and context on mostly irrelevant files. Reading files alphabetically (B) is the same up-front approach with an arbitrary order. Asking the user (C) hands back work the agent's tools can do.",
  },
  {
    type: "multi",
    scenario:
      "An agent must find every caller of the function sendReceipt before changing its signature. Grepping for sendReceipt finds 7 callers, but the tests show other call sites exist. The module src/notify/index.ts contains: export { sendReceipt as emailReceipt } from \"./email\"; export * from \"./sms\".",
    prompt: "Which TWO steps should the agent take?",
    choices: [
      "Read the wrapper module (and the modules it re-exports with export *) to list every name under which the function is exported.",
      "Conclude that the 7 Grep results are complete, since Grep searches every file.",
      "Glob for files named sendReceipt* to find the rest.",
      "Read every file that imports from src/notify to see what it uses, without searching.",
      "Grep for each exported name, such as emailReceipt, as well as sendReceipt, and combine the results.",
    ],
    correct: [0, 4],
    explanation:
      "The guide's technique is to identify all exported names first (A), then search for each one across the codebase (E). The 7 results miss aliased imports (B). Glob (C) matches file names, not call sites. Reading every importing file (D) is the up-front approach the guide warns against, when targeted Grep searches for each name get the same answer.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a tool-selection audit for your lab agent",
  context:
    "Measure how well an agent uses the six built-in tools on a real codebase, and fix the patterns that waste context. Work in ccarf-lab/exercises/2-7/.",
  requirements: [
    "Pick a real open-source repository with at least 200 files and a wrapper or barrel module that re-exports functions under other names (many TypeScript projects have an index.ts that does this).",
    "Write five tasks for it: find all callers of a function, find all files matching a naming pattern, explain a bug's flow from an error message, change one of several identical config lines, and find every caller of a re-exported function.",
    "Run each task with an Agent SDK agent limited to Read, Write, Edit, Grep, Glob, and Bash. Log every tool call with its input using a PostToolUse hook.",
    "Score each run: right tool for each search (Grep vs Glob), number of files read, and whether any Bash call did something a dedicated tool could have done.",
    "Add CLAUDE.md-style guidance or a system prompt covering incremental exploration and the export-names technique, and rerun the five tasks.",
  ],
  successCriteria: [
    "Your log shows Grep used for content searches and Glob for name patterns on every task after the guidance.",
    "Files read for the bug-flow task drop compared with the baseline. Record both numbers.",
    "The duplicate-config-line task completes correctly, with only the intended line changed, and your log shows how the agent handled the non-unique match.",
    "The re-export task finds callers that a single Grep for the original name missed.",
  ],
  stretchGoals: [
    "Add a PreToolUse hook that denies Bash commands starting with cat, grep, or find, and returns a message pointing to the dedicated tool.",
    "Compare Grep's files_with_matches and content output modes on the callers task, and record the token difference.",
  ],
};

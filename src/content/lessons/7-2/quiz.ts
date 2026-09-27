import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  // Scenario: code generation with Claude Code
  {
    type: "single",
    scenario:
      "Code generation with Claude Code. The billing package has its own CLAUDE.md with rules for currency handling. A developer says Claude ignored those rules while editing billing code, and wants to confirm which instruction files were actually loaded in the session.",
    prompt: "What should the developer do first?",
    choices: [
      "Copy the billing rules into the root CLAUDE.md so they load everywhere.",
      "Restart Claude Code with a verbose logging flag.",
      "Run /memory to see which CLAUDE.md files are loaded.",
      "Rename the billing file to CLAUDE.local.md.",
    ],
    correct: [2],
    explanation:
      "/memory shows which memory files are loaded, which is the first diagnostic step (C). Copying the rules into the root (A) changes the configuration before diagnosing it and loads billing rules everywhere. A logging flag (B) isn't the tool for checking loaded instructions. Renaming the file (D) makes it personal and ignored by version control, which doesn't address loading.",
  },
  {
    type: "single",
    scenario:
      "Code generation with Claude Code. The root CLAUDE.md has grown to 1,200 lines. The API, frontend and data teams each maintain their own sections, and merge conflicts in the file are frequent.",
    prompt: "What is the most maintainable restructuring?",
    choices: [
      "Split the content into topic files owned by each team and include them from the root CLAUDE.md with @import.",
      "Have each developer keep a trimmed personal copy in ~/.claude/CLAUDE.md.",
      "Delete the older half of the file to get it under 600 lines.",
      "Move all of the content into a single skill that developers invoke when needed.",
    ],
    correct: [0],
    explanation:
      "@import keeps CLAUDE.md modular, with each team owning its own file, which ends the merge conflicts (A). Personal copies (B) drift and stop being shared. Deleting content (C) loses standards arbitrarily. A skill (D) loads only when invoked, so standing standards would stop applying by default.",
  },
  {
    type: "multi",
    scenario:
      "Code generation with Claude Code. The team wants a /fix-issue command that takes an issue number and is available to everyone who clones the repository. One developer also wants a /standup command that summarizes their own recent commits, just for themselves.",
    prompt: "Which TWO files should be created?",
    choices: [
      "A fix-issue section in the project CLAUDE.md.",
      ".claude/commands/fix-issue.md in the repository, using $ARGUMENTS for the issue number.",
      ".claude/commands/standup.md in the repository.",
      "~/.claude/commands/standup.md in the developer's home directory.",
      "~/.claude/commands/fix-issue.md in each developer's home directory.",
    ],
    correct: [1, 3],
    explanation:
      "Project commands in .claude/commands/ are shared through the repository, and $ARGUMENTS passes the issue number (B). A personal command belongs in ~/.claude/commands/ (D). CLAUDE.md (A) holds instructions, not commands. A project standup command (C) pushes one person's workflow onto everyone. Per-developer copies of fix-issue (E) aren't shared and will drift.",
  },
  {
    type: "single",
    scenario:
      "Code generation with Claude Code. A developer is in plan mode, planning a migration from one ORM to another across about 60 files. Searching for every ORM call has produced hundreds of lines of results, and the main conversation's context is filling up before the plan is finished.",
    prompt: "What is the best way to continue?",
    choices: [
      "Leave plan mode and start making changes before the context runs out.",
      "Paste the search results into CLAUDE.md so they persist.",
      "Start a new session every 20 minutes.",
      "Use the Explore subagent for the discovery work, so it returns summaries instead of raw results to the main conversation.",
    ],
    correct: [3],
    explanation:
      "The Explore subagent isolates verbose discovery and returns a summary, preserving the main context for planning (D). Abandoning the plan (A) risks the rework plan mode exists to prevent. Pasting results into CLAUDE.md (B) loads them into every future session. Periodic restarts (C) lose the planning context repeatedly.",
  },
  {
    type: "single",
    scenario:
      "Code generation with Claude Code. A developer who hasn't worked with distributed caching asks Claude to add a cache in front of a pricing service. They aren't sure how stale prices should be handled or what should happen if the cache is unavailable.",
    prompt: "What is the most effective way to start?",
    choices: [
      "Ask Claude to implement a cache immediately, then iterate on whatever problems appear.",
      "Use the interview pattern: have Claude ask questions about invalidation, staleness tolerance and failure modes before implementing.",
      "Write a detailed prose specification alone before involving Claude.",
      "Give Claude input/output examples of cached and uncached responses.",
    ],
    correct: [1],
    explanation:
      "In an unfamiliar domain, the interview pattern surfaces considerations the developer hasn't anticipated before any code is written (B). Implementing first (A) bakes in decisions nobody made on purpose. A solo specification (C) is limited by the same unfamiliarity. Input/output examples (D) clarify transformations, not design choices such as invalidation.",
  },

  // Scenario: Claude Code for CI/CD
  {
    type: "single",
    scenario:
      "Claude Code for CI/CD. The pull request review job runs claude -p with a review prompt. Twice this month, the job modified files in the workspace while \"fixing\" issues it found, and those changes ended up in a later commit. A review job should never change code.",
    prompt: "What is the most appropriate change?",
    choices: [
      "Limit the job's tools to read-only ones, for example --allowedTools \"Read,Grep,Glob\".",
      "Add \"Do not modify any files\" to the review prompt.",
      "Run the job with permission checks disabled so it can't get stuck.",
      "Add a note to CLAUDE.md that reviews must not edit files.",
    ],
    correct: [0],
    explanation:
      "Tool access in CI should be decided up front, and a review job only needs read access (A). Prompt instructions (B) and CLAUDE.md notes (D) are guidance, and the job has already ignored similar intent. Disabling permission checks (C) removes the last safeguard and makes the problem worse.",
  },
  {
    type: "multi",
    scenario:
      "Claude Code for CI/CD. The review bot flags \"possible null reference\" on nearly every use of optional chaining, and comments on naming styles that match the rest of the codebase. Developers have started ignoring it.",
    prompt: "Which TWO changes will most improve precision?",
    choices: [
      "Write explicit criteria: report bugs, security issues and data-loss risks; skip style points and patterns consistent with the surrounding code.",
      "Tell the bot to report only findings it is highly confident in.",
      "Raise the temperature so the bot considers a wider range of issues.",
      "Require three review runs to agree before a comment is posted.",
      "Add few-shot examples: one real null bug that should be flagged, and one safe optional-chaining use that shouldn't, each with the reasoning.",
    ],
    correct: [0, 4],
    explanation:
      "Explicit report/skip criteria (A) and examples showing where the line falls (E) teach the bot what matters. Confidence-based instructions (B) don't define which findings are worth reporting. Higher temperature (C) adds variability, not precision. Requiring agreement across runs (D) triples the cost and can agree on the same false positive.",
  },
  {
    type: "single",
    scenario:
      "Claude Code for CI/CD. A pull request changes 25 files across the API, service and database layers. The per-file review catches local issues well, but misses that the API now sends a field the database layer no longer accepts.",
    prompt: "What should be added to the review?",
    choices: [
      "A second per-file pass with a stricter prompt.",
      "A rule that pull requests may touch at most 10 files.",
      "A separate integration pass that examines data flow across files and layers.",
      "A larger model for the per-file passes.",
    ],
    correct: [2],
    explanation:
      "Per-file passes can't see cross-file contracts, so an integration pass focused on data flow is the missing piece (C). Another per-file pass (A) has the same blind spot. A size limit (B) shifts the problem onto developers. A larger model (D) still looks at one file at a time.",
  },
  {
    type: "single",
    scenario:
      "Claude Code for CI/CD. A nightly security audit of 400 repositories uses synchronous API calls, and nobody reads the results until the next morning. Each request currently relies on the model calling a read_file tool several times to pull in the files it wants to inspect.",
    prompt: "How should the team cut costs?",
    choices: [
      "Move the audit to the Message Batches API unchanged.",
      "Move it to the Message Batches API, restructuring each request to include the files it needs, since batch requests can't run tools mid-request.",
      "Keep synchronous calls, since the audit uses tools.",
      "Move it to batches, falling back to synchronous calls if a batch takes more than an hour.",
    ],
    correct: [1],
    explanation:
      "The audit is latency-tolerant, so batches fit, but each request has to be self-contained because a batch request can't execute tools and continue (B). Moving it unchanged (A) breaks the multi-turn tool use. Staying synchronous (C) gives up the savings when a restructure makes batches work. A timeout fallback (D) adds complexity and doesn't solve the tool-calling problem.",
  },
  {
    type: "single",
    scenario:
      "Claude Code for CI/CD. Developers dismiss about 30% of the review bot's findings, but the team can't tell which kinds of findings get dismissed, so it doesn't know which criteria to fix.",
    prompt: "What change makes the dismissals analyzable?",
    choices: [
      "Ask developers to write a free-text reason whenever they dismiss a finding.",
      "Cut the number of findings by 30% across the board.",
      "Switch to a different model and compare dismissal rates.",
      "Add a detected_pattern field to each structured finding, and analyze dismissal rates by pattern.",
    ],
    correct: [3],
    explanation:
      "Recording which code construct triggered each finding lets the team see which patterns get dismissed and fix those criteria (D). Free-text reasons (A) are inconsistent and hard to aggregate. An across-the-board cut (B) removes good findings along with bad ones. A model switch (C) changes everything at once without explaining anything.",
  },

  // Scenario: structured data extraction
  {
    type: "single",
    scenario:
      "Structured data extraction. A pipeline extracts funding sources from research papers. Funding appears in a dedicated section in some papers, in the acknowledgments in others, and in footnotes in the rest. Extraction misses most footnote funding and occasionally invents a funder for papers that list none.",
    prompt: "What is the most effective improvement?",
    choices: [
      "Add few-shot examples covering each layout, including one paper with no funding statement whose correct output is null.",
      "Expand the instructions to describe the three possible locations in detail.",
      "Make the funding field required so the model always looks for it.",
      "Retry every extraction with the message \"Look harder for funding sources.\"",
    ],
    correct: [0],
    explanation:
      "Examples of varied document structures, including an honest null, improve recall and reduce fabrication (A). Longer instructions (B) are the approach that's already producing inconsistent results. A required field (C) increases the pressure to invent funders. A vague retry (D) gives no specific feedback and can't find funding that isn't there.",
  },
  {
    type: "multi",
    scenario:
      "Structured data extraction. The schema classifies insurance incidents with incident_type, an enum of fire, flood and theft. New kinds of incident, such as cyber fraud, are being forced into \"theft\", and reports that are genuinely ambiguous get a confident but wrong label.",
    prompt: "Which TWO schema changes address this?",
    choices: [
      "Replace the enum with a free-text field.",
      "Add 20 more incident types to the enum.",
      "Add an \"other\" value together with an incident_type_detail string.",
      "Make incident_type optional so the model can leave it out.",
      "Add an \"unclear\" value for reports that can't be classified confidently.",
    ],
    correct: [2, 4],
    explanation:
      "\"other\" plus a detail field handles categories you didn't anticipate (C), and \"unclear\" gives ambiguous reports an honest answer (E). Free text (A) loses the consistent categories downstream systems depend on. More values (B) will still miss the next new type. Leaving the field out (D) hides ambiguity instead of recording it.",
  },
  {
    type: "single",
    scenario:
      "Structured data extraction. The pipeline uses tool_use with a strict JSON schema, and every output parses. But in about 3% of invoices, the line-item amounts don't add up to the extracted total, and the accounting system rejects those records.",
    prompt: "What is the best fix?",
    choices: [
      "Tighten the schema, for example by requiring every amount to have two decimal places.",
      "Force the extraction tool with tool_choice.",
      "Validate the sum in code and, on a mismatch, retry with the document, the failed extraction and the specific discrepancy, flagging the record if it persists.",
      "Lower the temperature for extraction calls.",
    ],
    correct: [2],
    explanation:
      "Schemas guarantee structure, not arithmetic, so a semantic check with targeted retry feedback is needed (C). A stricter schema (A) still can't check a sum. Forcing the tool (B) guarantees a call, which is already happening. Temperature (D) doesn't create a check for the error.",
  },
  {
    type: "single",
    scenario:
      "Structured data extraction. Suppliers from several countries write dates as 03/04/2026 (meaning March in some countries and April in others) and amounts as either 1,234.50 or 1.234,50. The schema requires ISO 8601 dates and plain numbers, and extracted values are often wrong although they're correctly formatted.",
    prompt: "What should be added?",
    choices: [
      "A \"format\": \"date\" constraint on the schema's date fields.",
      "A regular expression that guesses the date format after extraction.",
      "A request to suppliers to change their invoice formats.",
      "Normalization rules in the prompt, keyed to the supplier's country, alongside the strict schema.",
    ],
    correct: [3],
    explanation:
      "A schema enforces the output shape but can't tell the model how to interpret ambiguous source formats, so normalization rules belong in the prompt (D). A format constraint (A) only checks the output shape, which is already correct. Guessing afterward (B) can't resolve 03/04 without knowing the source convention. Changing suppliers' formats (C) isn't within the system's control.",
  },
  {
    type: "multi",
    scenario:
      "Structured data extraction. A validation-retry loop sends the document, the failed extraction and the specific error back to the model. The team wants to stop spending retries on failures that can't be fixed this way.",
    prompt: "Which TWO failures is a retry with error feedback likely to fix?",
    choices: [
      "A supplier tax ID that doesn't appear anywhere in the document.",
      "A date extracted as \"4 March 2026\" instead of 2026-03-04.",
      "A shipping address placed in the billing_address field.",
      "A contract end date defined only in a master agreement that wasn't provided.",
      "A signature date that appears only in an image the pipeline didn't process.",
    ],
    correct: [1, 2],
    explanation:
      "Format mistakes (B) and values in the wrong field (C) can be corrected because the information is in the document. A missing tax ID (A), a date in an external agreement (D) and text inside an unprocessed image (E) aren't available to the model, so retries can't recover them. Those should become nulls routed to review, or be fixed by supplying the missing input.",
  },
];

export const bonus: BonusScenario = {
  title: "Audit your lab against Domains 3 and 4",
  context:
    "Turn the CI and extraction skills on your own work: build a headless Claude Code job that audits your ccarf-lab repository against the practices from Modules 3 and 4. Work in ccarf-lab/exercises/7-2/.",
  requirements: [
    "Write an audit checklist in CLAUDE.md with explicit criteria: what counts as a finding (for example a prompt-only rule for something that must always hold, or a required field that could force fabrication) and what to skip.",
    "Define a findings schema with file, line, category, severity, detected_pattern and a suggested fix, and run the audit with claude -p, --output-format json, --json-schema and read-only tools.",
    "Split the audit into per-exercise passes plus one cross-exercise pass that looks for inconsistencies between your implementations.",
    "Write a small script that turns structured_output into a Markdown report grouped by category and severity.",
  ],
  successCriteria: [
    "The job runs unattended from start to finish and never modifies a file.",
    "Every finding points to a real file and line, and you'd act on at least 70% of them.",
    "Re-running after you fix two findings, with the previous report passed in, reports only new or unaddressed issues.",
  ],
  stretchGoals: [
    "Run the job on a schedule in CI, and compare the cost of a Message Batches version that includes each exercise's files in its request.",
  ],
};

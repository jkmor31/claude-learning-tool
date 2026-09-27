import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A support agent must verify a customer's identity with get_customer before issuing any refund. The team is reviewing four proposed controls.",
    prompt: "Which proposal is an anti-pattern if used as the only control?",
    choices: [
      "A prerequisite gate that blocks process_refund until get_customer has returned a verified ID in this session.",
      "A PreToolUse hook that checks the session state and denies unverified refund calls.",
      "A system prompt that states verification is mandatory before any refund.",
      "A process_refund backend that rejects calls without a valid verification token.",
    ],
    correct: [2],
    explanation:
      "A prompt-only rule is \"prompt for a guarantee\": it works most of the time, which isn't enough for money (C). The gate (A), the hook (B) and backend enforcement (D) are all deterministic controls.",
  },
  {
    type: "multi",
    scenario: "A team is choosing escalation triggers for its support agent.",
    prompt: "Which TWO proposed triggers are anti-patterns?",
    choices: [
      "The customer explicitly asks for a human.",
      "The sentiment score of the customer's message falls below -0.6.",
      "Policy doesn't address what the customer is asking for.",
      "The agent's self-rated confidence falls below 7 out of 10.",
      "The agent can't make meaningful progress after repeated attempts.",
    ],
    correct: [1, 3],
    explanation:
      "Sentiment (B) is a wrong proxy, since frustration doesn't measure complexity, and self-rated confidence (D) is uncalibrated. An explicit request (A), a policy gap (C) and lack of progress (E) are the guide's escalation triggers.",
  },
  {
    type: "single",
    scenario:
      "Two credible reports give different adoption rates for the same technology in the same year: 34% and 41%. The synthesis agent is deciding how to present them.",
    prompt: "Which behavior is the anti-pattern?",
    choices: [
      "Reporting 37.5%, the average, and citing both reports.",
      "Reporting both figures, each attributed to its source.",
      "Noting that one report surveyed enterprises and the other surveyed all businesses.",
      "Placing the figure in a \"contested findings\" section of the report.",
    ],
    correct: [0],
    explanation:
      "Averaging is arbitrary selection: it produces a number neither source reported (A). Attributing both (B), explaining the method difference (C) and marking the figure as contested (D) all preserve the evidence.",
  },
  {
    type: "multi",
    scenario:
      "A research system's subagents sometimes hit timeouts and unavailable sources. The team is reviewing five error-handling proposals.",
    prompt: "Which TWO proposals are anti-patterns?",
    choices: [
      "The subagent retries a transient failure locally before reporting it.",
      "The subagent returns its failure type, the attempted query and any partial results.",
      "After a timeout, the subagent returns an empty result marked as successful.",
      "The final report notes which topic areas have gaps because sources were unavailable.",
      "The coordinator stops the entire research run as soon as any subagent fails.",
    ],
    correct: [2, 4],
    explanation:
      "Returning an empty success (C) is silent suppression, and stopping the whole run (E) is all-or-nothing failure. Local retries (A), structured error context (B) and coverage annotations (D) are the recommended patterns.",
  },
  {
    type: "single",
    scenario:
      "A team is setting up Claude Code in CI for pull request reviews and test generation.",
    prompt: "Which setup choice is the anti-pattern?",
    choices: [
      "Running claude -p with --output-format json and --json-schema.",
      "Having the session that generated a change also review it, with an instruction to be thorough.",
      "Including the previous review's findings when re-running after new commits.",
      "Including existing test files when generating new tests.",
    ],
    correct: [1],
    explanation:
      "Same-session self-review keeps the generator's reasoning and is less likely to question it, so an independent instance should review (B). The other three are the recommended CI practices.",
  },
  {
    type: "multi",
    scenario:
      "A code-review bot has a high false-positive rate, and the team is collecting proposals for fixing it.",
    prompt: "Which TWO proposals are anti-patterns?",
    choices: [
      "Defining which categories to report (bugs, security) and which to skip (minor style).",
      "Adding \"Be conservative and only report issues you're highly confident in.\"",
      "Defining each severity level with a concrete code example.",
      "Temporarily disabling the noisiest category while its criteria are rewritten.",
      "Running five review passes and posting only findings that a majority agree on, as the main fix.",
    ],
    correct: [1, 4],
    explanation:
      "\"Be conservative\" (B) is a vague instruction that doesn't define which findings matter, and majority voting as the main fix (E) is a bigger hammer that multiplies cost without fixing the criteria. Categorical criteria (A), severity examples (C) and temporarily disabling a noisy category (D) are the guide's approach.",
  },
  {
    type: "single",
    scenario:
      "An extraction retry keeps failing because the required value appears only in an attachment the pipeline never received.",
    prompt: "Which proposal will NOT help?",
    choices: [
      "Supply the attachment to the extraction step.",
      "Accept null for the field and route the record to human review.",
      "Record that the value is missing from the source document.",
      "Raise the retry limit from 3 to 10.",
    ],
    correct: [3],
    explanation:
      "More retries are a bigger hammer: no retry can find information that isn't in the input (D). Supplying the input (A), accepting null with review (B) and recording why the value is missing (C) all deal with the real cause.",
  },
  {
    type: "single",
    scenario:
      "A support agent handles conversations that often run 40 turns and cover several issues. The team is reviewing its context strategy.",
    prompt: "Which practice is the anti-pattern?",
    choices: [
      "Every few turns, summarizing the whole history, amounts and dates included, into a short paragraph that becomes the agent's only memory of earlier turns.",
      "Keeping a case facts block with amounts, dates and order IDs in every prompt.",
      "Trimming order lookups to the relevant fields before they enter context.",
      "Sending the conversation history with each request.",
    ],
    correct: [0],
    explanation:
      "Progressive summarization blurs exact values and commitments, so it can't be the only memory (A). A case facts block (B), trimmed tool output (C) and sending the conversation history (D) keep the facts accurate.",
  },
  {
    type: "single",
    scenario:
      "A platform team is planning MCP integrations for its internal agents.",
    prompt: "Which decision is the anti-pattern?",
    choices: [
      "Using the vendor's maintained GitHub MCP server.",
      "Building a custom server for the company's internal deploy-approval workflow.",
      "Writing a custom Postgres MCP server \"for full control\", although a maintained one covers the team's needs.",
      "Exposing the service catalog as an MCP resource.",
    ],
    correct: [2],
    explanation:
      "Rebuilding a standard integration is over-engineering: the team would own auth, maintenance and security fixes for no gain (C). An existing server for a standard system (A), a custom server for a company-specific workflow (B) and a catalog resource (D) all follow the guide.",
  },
  {
    type: "single",
    scenario:
      "A coordinator agent delegates research subtasks to specialized subagents, and the team is rewriting the coordinator's instructions.",
    prompt: "Which style of instruction fits the guide?",
    choices: [
      "Detailed step-by-step procedures telling each subagent exactly which searches to run, in order.",
      "Research goals and quality criteria that each subagent's output must meet.",
      "A minimal instruction, \"Research the topic\", leaving everything to the subagents.",
      "An instruction for subagents to coordinate directly with each other when their topics overlap.",
    ],
    correct: [1],
    explanation:
      "Goals and quality criteria let subagents adapt while keeping them on target (B). Rigid procedures (A) stop subagents from adapting to what they find. A bare instruction (C) gives no quality bar. Direct subagent-to-subagent communication (D) bypasses the coordinator's routing.",
  },
  {
    type: "multi",
    scenario: "A team is reviewing how developers chose between plan mode and direct execution last month.",
    prompt: "Which TWO choices were anti-patterns?",
    choices: [
      "Using plan mode to fix a one-character typo in an error message.",
      "Using plan mode to choose between two integration approaches with different infrastructure needs.",
      "Using direct execution to add a single validation check to one function.",
      "Using direct execution for a 50-file framework migration with two viable strategies.",
      "Planning a library migration in plan mode, then executing the agreed plan directly.",
    ],
    correct: [0, 3],
    explanation:
      "Plan mode for a trivial fix (A) adds overhead for nothing, and direct execution for a large migration with competing strategies (D) risks costly rework. Plan mode for architectural choices (B), direct execution for a small scoped change (C), and planning then executing (E) are the recommended matches.",
  },
  {
    type: "single",
    scenario:
      "An extraction step must always return structured output through one of three extraction tools, one per document type.",
    prompt: "Which configuration is the anti-pattern?",
    choices: [
      "Defining each extraction tool with a JSON schema for its document type.",
      "Setting tool_choice to \"any\" so the model must call one of the tools.",
      "Forcing a specific tool when one extraction must run before the others.",
      "Leaving tool_choice as \"auto\" and relying on a prompt instruction to call a tool.",
    ],
    correct: [3],
    explanation:
      "With \"auto\", the model may answer in text, so a prompt instruction is prompting for a guarantee (D). Schemas per tool (A), \"any\" (B) and forcing a tool for ordering (C) are the recommended configurations.",
  },
  {
    type: "single",
    scenario:
      "An extraction team wants to reduce how much human review it needs.",
    prompt: "Which proposal is the anti-pattern?",
    choices: [
      "Calibrating review thresholds against a labeled validation set.",
      "Sampling high-confidence records with stratified random sampling to measure ongoing error rates.",
      "Routing records with conflicting source data to review first.",
      "Auto-approving every record the model rates 9 or higher out of 10, without calibration.",
    ],
    correct: [3],
    explanation:
      "Uncalibrated self-rated confidence is unreliable as an automation threshold (D). Calibration (A), stratified sampling (B) and routing conflicts to review (C) are the guide's practices.",
  },
  {
    type: "multi",
    scenario:
      "A coordinator passes work to subagents. The team is writing guidelines for how it does this.",
    prompt: "Which TWO are correct practices?",
    choices: [
      "Relying on subagents to see the coordinator's conversation history.",
      "Including the complete prior findings a subagent needs directly in its prompt.",
      "Emitting several Task calls in a single response when subtasks are independent.",
      "Spawning one subagent per turn so each can build on the last.",
      "Condensing earlier findings into a prose summary before passing them on.",
    ],
    correct: [1, 2],
    explanation:
      "Subagents see only their prompt, so complete findings must be passed in (B), and independent subagents should be spawned together in one response (C). Assuming inherited context (A), spawning one per turn when the work is independent (D) and prose summaries that drop attribution (E) are all anti-patterns.",
  },
  {
    type: "single",
    scenario:
      "A team wants every developer's Claude Code sessions to follow the same coding conventions.",
    prompt: "Which approach is the anti-pattern?",
    choices: [
      "Putting the conventions in the committed project CLAUDE.md.",
      "Keeping the conventions in the tech lead's ~/.claude/CLAUDE.md and sharing it with teammates when they ask.",
      "Using .claude/rules/ files with paths globs for conventions that apply to particular file types.",
      "Splitting long conventions into topic files included with @import.",
    ],
    correct: [1],
    explanation:
      "A user-level file only reaches its owner, so sharing it by hand misses teammates and drifts (B). The committed project CLAUDE.md (A), path rules (C) and @import (D) all keep shared conventions in the repository.",
  },
];

export const bonus: BonusScenario = {
  title: "Build an anti-pattern linter for agent configurations",
  context:
    "Turn the catalog into a tool: a Claude-powered linter that reviews agent code, prompts and Claude Code configuration for the anti-patterns in this lesson. Work in ccarf-lab/exercises/7-3/, and run it over your own earlier exercises.",
  requirements: [
    "Write the linter's criteria as explicit rules, one per anti-pattern family, each with a short example that should be flagged and one that shouldn't.",
    "Define a findings schema (file, line, family, evidence, suggested fix) and enforce it with tool use and a JSON schema, or with claude -p and --json-schema.",
    "Check each file on its own, then run one cross-file pass for issues such as a rule that appears only in a prompt when a hook exists elsewhere.",
    "Seed a test directory with ten planted anti-patterns across all five domains and three clean files, and measure what the linter catches.",
  ],
  successCriteria: [
    "The linter finds at least eight of the ten planted anti-patterns.",
    "It flags nothing in the clean files.",
    "Running it on your ccarf-lab exercises produces at least one finding you agree with and fix.",
  ],
  stretchGoals: [
    "Add a detected_pattern breakdown and track which families you dismiss most often, then rewrite those criteria.",
  ],
};

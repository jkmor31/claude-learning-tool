import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  // Scenario: customer support resolution agent
  {
    type: "single",
    scenario:
      "Customer support agent. A developer wrote a custom agent loop that exits whenever the model's response contains a text block. Customers often receive \"Let me check that order for you\" and then nothing else, even though the same response also contained a lookup_order tool call.",
    prompt: "What is the correct fix?",
    choices: [
      "Instruct the model not to write any text before calling a tool.",
      "Continue the loop while stop_reason is \"tool_use\": run the tools, append the tool_result blocks and send the conversation again, stopping only on \"end_turn\".",
      "Always run exactly three iterations of the loop, then return the last text.",
      "Check the response text for phrases like \"let me check\" and continue the loop when one appears.",
    ],
    correct: [1],
    explanation:
      "stop_reason is the signal that the model wants a tool run, and a response can contain text alongside a tool call (B). Suppressing text (A) treats a normal response shape as the bug. A fixed iteration count (C) cuts off longer tasks and wastes calls on short ones. Parsing the text (D) is fragile and ignores the field designed for this.",
  },
  {
    type: "multi",
    scenario:
      "Customer support agent. The project's .mcp.json contains the backend API token in plain text and has been committed to the repository. Engineers have also been adding their own experimental MCP servers to the same file, so everyone on the team now loads them.",
    prompt: "Which TWO changes fix these problems?",
    choices: [
      "Add .mcp.json to .gitignore so the configuration is no longer shared.",
      "Replace the token with environment variable expansion, such as ${SUPPORT_API_TOKEN}, and have each engineer set the variable locally.",
      "Hard-code the token in the MCP server's source code instead.",
      "Keep the token in .mcp.json but rotate it every week.",
      "Move personal experimental servers into each engineer's user-scoped configuration, leaving only shared servers in .mcp.json.",
    ],
    correct: [1, 4],
    explanation:
      "Environment variable expansion keeps secrets out of the committed file (B), and user scope is the place for personal, experimental servers (E). Ignoring .mcp.json (A) stops sharing the servers everyone needs. Moving the token into source code (C) still commits it. Rotating it weekly (D) still leaves a live secret in version control.",
  },
  {
    type: "single",
    scenario:
      "Customer support agent. A customer's birthday cake was delivered a day late, and they ask to be reimbursed $180 for the catering they had to buy instead. The company's policy covers refunding shipping fees for late deliveries but says nothing about other costs a late delivery causes.",
    prompt: "What should the agent do?",
    choices: [
      "Decline the request, citing the late-delivery policy.",
      "Refund the shipping fee and close the case.",
      "Escalate to a human with a structured handoff: the order, the delay, the $180 request, and a note that policy doesn't cover consequential costs.",
      "Approve a goodwill credit of up to $50 as a compromise.",
    ],
    correct: [2],
    explanation:
      "When policy is silent on what the customer is asking for, that's a policy gap, and a human should decide (C). Declining (A) treats silence as a no. Refunding only the fee (B) ignores the actual request. A self-invented compromise (D) makes policy the agent has no authority to make.",
  },
  {
    type: "single",
    scenario:
      "Customer support agent. get_customer returns account dates as Unix timestamps, lookup_order returns ISO 8601 dates, and the billing tool returns payment status as the numbers 1–4. The agent sometimes gets return-window eligibility wrong and misreads payment statuses.",
    prompt: "What is the most reliable fix?",
    choices: [
      "Add a PostToolUse hook that converts all dates to ISO 8601 and status codes to named values before the model sees the results.",
      "Explain each tool's formats in the system prompt.",
      "Add few-shot examples showing correct date conversions.",
      "Add a date-conversion tool that the agent can call when it needs one.",
    ],
    correct: [0],
    explanation:
      "Normalizing tool results in a hook removes the inconsistency deterministically, before the model has a chance to misread it (A). Prompt explanations (B) and examples (C) still leave the model doing conversions it gets wrong. A conversion tool (D) only helps when the agent realizes it needs to call it.",
  },
  {
    type: "multi",
    scenario:
      "Customer support agent. lookup_order returns an empty list both when the order service is unavailable and when the customer really has no orders. During an outage, the agent told customers with open orders that they had no orders on file.",
    prompt: "Which TWO changes should the tool make?",
    choices: [
      "When the order service is unavailable, return an error with errorCategory \"transient\" and isRetryable true.",
      "Return an error whenever the list is empty.",
      "Return \"Operation failed\" for every failure, to keep responses simple.",
      "Keep returning an empty list as a successful result when the query ran and found no orders.",
      "Have the agent retry every empty result three times before answering.",
    ],
    correct: [0, 3],
    explanation:
      "The fix is to separate the two cases: a structured, retryable error for an access failure (A), and an empty success for a query that found nothing (D). Treating every empty list as an error (B) makes real absences look like failures. A generic message (C) hides what went wrong. Retrying empty results (E) wastes calls when the answer really is \"no orders\".",
  },

  // Scenario: multi-agent research system
  {
    type: "single",
    scenario:
      "Multi-agent research system. Every query, including simple ones such as \"What year was this standard first published?\", runs through all four subagents: search, document analysis, synthesis and report. Simple questions take about 90 seconds and cost as much as full research tasks.",
    prompt: "What is the most effective change?",
    choices: [
      "Run the four subagents in parallel instead of in sequence.",
      "Remove the report subagent to shorten the pipeline.",
      "Cache the results of previous queries.",
      "Have the coordinator assess each query's requirements and invoke only the subagents it needs.",
    ],
    correct: [3],
    explanation:
      "The coordinator should choose subagents based on the query rather than always running the full pipeline (D). Running them in parallel (A) doesn't work because the stages depend on each other, and it still does unnecessary work. Removing the report agent (B) breaks the full research tasks. A cache (C) only helps with repeated questions.",
  },
  {
    type: "multi",
    scenario:
      "Multi-agent research system. The synthesis agent's report sometimes cites the wrong page numbers and attributes statistics to the wrong document. The document-analysis subagent returns free-text notes, and the coordinator passes them to synthesis as one block of text with a source list at the end.",
    prompt: "Which TWO changes fix the attribution problem?",
    choices: [
      "Ask the synthesis agent to double-check its citations before finishing.",
      "Give the synthesis agent the full original documents as well as the findings.",
      "Have the document-analysis subagent return structured findings with the document name, page and excerpt attached to each claim.",
      "Reduce the number of documents analyzed per query.",
      "Have the coordinator pass those findings to synthesis as structured records, keeping content and metadata separate rather than flattening them into text.",
    ],
    correct: [2, 4],
    explanation:
      "Attribution has to be captured at the source (C) and preserved through the handoff (E). Self-checking (A) can't recover mappings that were never passed along. Full documents (B) add a lot of context without linking claims to sources. Fewer documents (D) reduce coverage without fixing how sources are tracked.",
  },
  {
    type: "single",
    scenario:
      "Multi-agent research system. The synthesis agent receives about 60 pages of findings from nine search subagents, concatenated in the order they finished. Reports consistently leave out findings from the subagents whose results land in the middle of the input.",
    prompt: "What is the best fix?",
    choices: [
      "Shuffle the order of the findings on each run so that no subagent is always in the middle.",
      "Put a summary of key findings at the start of the input and organize the details under explicit section headers per subtopic.",
      "Switch the synthesis agent to a model with a larger context window.",
      "Cut the middle subagents' findings down to one sentence each.",
    ],
    correct: [1],
    explanation:
      "Leading with key findings and adding clear structure counters the lost-in-the-middle effect (B). Shuffling (A) just moves the loss to different findings each run. A larger window (C) doesn't change how attention is distributed. Cutting findings (D) discards information instead of making it findable.",
  },
  {
    type: "single",
    scenario:
      "Multi-agent research system. A two-hour session has built a detailed analysis of a document collection. The team wants to try two report structures, one organized by region and one by technology, without the first attempt influencing the second.",
    prompt: "What is the best approach?",
    choices: [
      "Resume the session, try the regional structure, then try the technology structure in the same session.",
      "Start two new sessions and repeat the analysis in each.",
      "Fork the session from the analysis baseline into two branches, one for each structure.",
      "Ask for both structures in a single prompt in the current session.",
    ],
    correct: [2],
    explanation:
      "Forking gives two independent branches that share the same analysis baseline (C). Trying both in one session (A) lets the first attempt shape the second. Repeating the analysis (B) wastes two hours of work. One combined prompt (D) mixes the two approaches together.",
  },
  {
    type: "single",
    scenario:
      "Multi-agent research system. The coordinator has 18 tools: every search, document and formatting tool, plus the Task tool. Logs show it sometimes calls formatting tools in the middle of research and often picks the wrong one of several similar search tools instead of delegating.",
    prompt: "What is the most effective change?",
    choices: [
      "Give the coordinator only the tools it needs to coordinate, and give each subagent only the tools for its own role.",
      "Rewrite all 18 tool descriptions in more detail.",
      "Set tool_choice to \"any\" for the coordinator.",
      "List the tools in the order they should normally be used.",
    ],
    correct: [0],
    explanation:
      "Too many tools, several of them outside the coordinator's role, degrade selection, so scoping tools by role fixes the cause (A). Better descriptions (B) help a little but leave 18 overlapping choices. tool_choice \"any\" (C) forces a tool call without improving which one is chosen. Ordering (D) isn't a mechanism the model relies on for selection.",
  },

  // Scenario: developer productivity tools
  {
    type: "single",
    scenario:
      "Developer productivity. An engineer asks the agent to list every Terraform file inside any directory named modules, anywhere in a large monorepo, so the provider version in each one can be updated.",
    prompt: "Which tool should the agent use first?",
    choices: [
      "Grep for \"provider\" across the repository.",
      "Read each top-level directory and look for modules folders.",
      "Bash with ls in each folder.",
      "Glob with a pattern such as **/modules/**/*.tf.",
    ],
    correct: [3],
    explanation:
      "Finding files by path and extension is a Glob job (D). Grep (A) searches file contents, so it would also match provider blocks outside modules directories. Reading directories one by one (B) is slow, upfront exploration. Bash (C) works around a dedicated tool that does the job directly.",
  },
  {
    type: "multi",
    scenario:
      "Developer productivity. Phase 1 of a task mapped the payment module's dependencies and produced a lot of discovery output. Phase 2 will migrate 30 call sites using subagents. The main session's context is now 85% full.",
    prompt: "Which TWO steps best prepare for phase 2?",
    choices: [
      "Give each phase 2 subagent the full phase 1 transcript.",
      "Run /compact, instructing it to keep the dependency map and the list of call sites.",
      "Start over and repeat phase 1 in a fresh session.",
      "Summarize phase 1's key findings and put the summary into each phase 2 subagent's initial prompt.",
      "Rely on the phase 2 subagents inheriting the main session's context.",
    ],
    correct: [1, 3],
    explanation:
      "Compacting with instructions frees space while keeping what matters (B), and a summary injected into each subagent's prompt gives it the context it needs without the noise (D). The full transcript (A) floods each subagent with discovery output. Starting over (C) throws away phase 1. Subagents don't inherit context (E), so relying on it leaves them uninformed.",
  },
  {
    type: "single",
    scenario:
      "Developer productivity. The team wants to automate a weekly chore: bump dependency versions, update the lockfile, run the test suite, and write a changelog entry. The steps are the same every week.",
    prompt: "Which decomposition fits best?",
    choices: [
      "Dynamic decomposition, letting the agent plan the steps from scratch each week.",
      "A single prompt asking the agent to do everything at once.",
      "A coordinator with four specialized subagents, one per step.",
      "Prompt chaining: a fixed sequence of steps, with a check after each one before moving on.",
    ],
    correct: [3],
    explanation:
      "A predictable, repeated sequence is exactly what prompt chaining is for (D). Dynamic decomposition (A) suits open-ended investigation, and replanning a known workflow each week adds variability for no benefit. One big prompt (B) loses the checkpoints between steps. A multi-agent setup (C) adds coordination overhead to a linear task.",
  },
  {
    type: "single",
    scenario:
      "Developer productivity. The team's internal MCP tool query_logs searches production logs across all services by time range, service and trace ID. Its description reads \"Queries logs.\" The agent keeps using Grep on local log files instead and misses production issues.",
    prompt: "What is the most effective first step?",
    choices: [
      "Rewrite the description to explain what query_logs searches, its parameters and outputs, and when to use it instead of Grep.",
      "Remove Grep from the agent's tools.",
      "Add \"Always prefer MCP tools\" to the system prompt.",
      "Force tool_choice to query_logs for every request.",
    ],
    correct: [0],
    explanation:
      "Tool descriptions drive selection, and this one gives the agent no reason to prefer query_logs (A). Removing Grep (B) also breaks legitimate local searches. A blanket preference (C) doesn't tell the agent when query_logs fits. Forcing it (D) breaks every request that doesn't involve logs.",
  },
  {
    type: "multi",
    scenario:
      "Developer productivity. Two rules must always hold: the agent must never change migration files that have already been applied, and the test suite must run after every change to source files.",
    prompt: "Which TWO mechanisms enforce these rules?",
    choices: [
      "A PreToolUse hook that denies Edit and Write calls on applied migration files and explains why.",
      "A note in CLAUDE.md saying not to edit applied migrations.",
      "A PostToolUse hook that runs the test suite after Edit or Write on source files and returns the results to the agent.",
      "A system prompt instruction to remember to run the tests.",
      "Removing the Edit tool from the agent entirely.",
    ],
    correct: [0, 2],
    explanation:
      "Rules that must always hold belong in hooks: a PreToolUse hook blocks the forbidden edit (A), and a PostToolUse hook runs the tests every time (C). CLAUDE.md notes (B) and prompt instructions (D) are guidance the agent can miss. Removing Edit (E) blocks all legitimate editing.",
  },
];

export const bonus: BonusScenario = {
  title: "Write exam items for your weakest area",
  context:
    "Writing good distractors is one of the fastest ways to understand why they're wrong. Use your results from this exam to write your own items. Work in ccarf-lab/exercises/7-1/.",
  requirements: [
    "List every question you missed or marked as a guess, with the lesson it maps to and one sentence on why the right answer is right.",
    "For your weakest domain among 1, 2 and 5, write five new scenario-style items: context, symptom, qualifier and four options, with at least one multi-select.",
    "Make each distractor a recognizable anti-pattern (prompt-only enforcement, over-engineering, treating a symptom, a feature that doesn't exist) and name it in the explanation.",
    "Base every item on the exam guide's task statements and the lessons, never on anything seen in a real exam.",
    "Swap items with a study partner, or ask Claude to answer them cold, and revise any item where the intended answer wasn't clearly best.",
  ],
  successCriteria: [
    "Each item has exactly one defensible answer (or the stated number for multi-select), and the explanation says why each distractor fails.",
    "At least one item tests the same idea as a question you missed, from a different angle.",
    "Retaking this exam at least a day later, you score 12 or higher.",
  ],
  stretchGoals: [
    "Save your items as JSON in the same shape as this app's quiz files, and load them into a small quiz runner of your own.",
  ],
};

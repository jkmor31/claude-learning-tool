import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your MCP order tools return {\"isError\": true, \"text\": \"Operation failed\"} for every failure. Logs show the agent retrying malformed order IDs three times in a row, and telling customers to \"try again later\" when a refund is outside the return window.",
    prompt: "What is the most effective fix?",
    choices: [
      "Add a system prompt instruction telling the agent to retry at most once.",
      "Remove isError so the agent reads failures as ordinary tool output.",
      "Tell the agent to always escalate when any tool fails.",
      "Return structured error metadata: an errorCategory (transient, validation, business, or permission), an isRetryable flag, and a readable description.",
    ],
    correct: [3],
    explanation:
      "The agent can't pick the right recovery because every failure looks the same. Structured categories and a retry flag let it fix its input for validation errors, explain policy for business errors, and retry only transient ones (Task 2.2). Capping retries (A) still retries hopeless calls and still mishandles policy errors. Dropping isError (B) makes failures indistinguishable from data. Escalating everything (C) throws away cases the agent could handle.",
  },
  {
    type: "multi",
    scenario: "Your search_orders tool queries a customer database.",
    prompt: "Which TWO statements describe the correct way to report results?",
    choices: [
      "A timeout should be returned as an empty result list, so the agent can keep going.",
      "A search that runs successfully and finds no matching orders should return an empty list as a normal, non-error result.",
      "A timeout should be flagged with isError and a transient, retryable category.",
      "Empty results and timeouts should be reported the same way, for simplicity.",
      "An empty result should be flagged with isError, because no data came back.",
    ],
    correct: [1, 2],
    explanation:
      "A valid empty result is a successful answer (B), and an access failure is a retryable transient error (C). Reporting a timeout as empty (A) leads the agent to confidently tell a customer they have no orders. Treating the two the same way (D) hides the difference the agent needs. Flagging an empty result as an error (E) causes pointless retries or escalations for a question that was actually answered.",
  },
  {
    type: "single",
    scenario:
      "A customer asks for a refund on an order delivered 45 days ago. Policy allows refunds within 30 days.",
    prompt: "Which response from process_refund best supports the agent?",
    choices: [
      "{ isError: true, text: \"Refund failed\" }",
      "{ isError: false, result: null }",
      "{ isError: true, errorCategory: \"business\", isRetryable: false, description: \"Delivered 45 days ago; limit 30\", customerMessage: \"Returns are accepted within 30 days of delivery, and this order arrived 45 days ago.\" }",
      "{ isError: true, errorCategory: \"business\", isRetryable: true, description: \"Outside refund window\" }",
    ],
    correct: [2],
    explanation:
      "Business-rule violations should be marked non-retryable and include a customer-friendly explanation the agent can relay (C). A generic failure (A) leaves the agent guessing. Marking it a success with a null result (B) hides the failure entirely. isRetryable: true (D) invites retries that can never succeed.",
  },
  {
    type: "single",
    scenario:
      "A research system's web-search subagent hits intermittent 503 errors from one provider. Right now it passes every 503 straight to the coordinator, which re-delegates the whole search task. Latency and cost have tripled.",
    prompt: "What is the best design?",
    choices: [
      "Have the coordinator retry every failed task automatically, up to five times.",
      "Have the subagent retry transient errors locally with backoff, and escalate to the coordinator only failures it can't resolve, along with its partial results and what it tried.",
      "Have the subagent catch all errors and return empty results, so the coordinator never sees failures.",
      "Stop the whole research workflow whenever any subagent hits an error.",
    ],
    correct: [1],
    explanation:
      "The guide calls for local recovery of transient failures within subagents, propagating only unresolved errors with partial results and attempt details (B). Retries at the coordinator (A) redo whole tasks over a single blip. Swallowing errors as empty results (C) silently produces incomplete reports. Stopping everything on any error (D) discards work that could have succeeded.",
  },
  {
    type: "multi",
    prompt: "Which TWO of these failures are generally worth retrying without changing anything?",
    choices: [
      "The order_date parameter was sent as \"next Tuesday\" instead of YYYY-MM-DD",
      "The request timed out after 10 seconds",
      "The refund amount exceeds the $500 policy limit",
      "The caller isn't authorized to access this customer's account",
      "The service returned 503 Service Unavailable",
    ],
    correct: [1, 4],
    explanation:
      "Timeouts (B) and service unavailability (E) are transient, so the same request may succeed shortly. A bad date format (A) is a validation error, so the input must be fixed before retrying. A policy limit (C) is a business error and won't change on retry. A permission error (D) needs escalation, not repetition.",
  },
];

export const bonus: BonusScenario = {
  title: "Add error categories to your support tools and watch the agent recover",
  context:
    "Upgrade the support tools from Lessons 1.6 and 1.7 so every failure is categorized, then confirm the agent handles each category differently. If you haven't turned the tools into an MCP server yet, return the same fields in your tool_result content with is_error. Work in ccarf-lab/exercises/2-2/.",
  requirements: [
    "Define one error shape used by all tools: errorCategory (transient, validation, business, or permission), isRetryable, description, and an optional customerMessage and retryAfterSeconds.",
    "Make the backends produce each category on demand: lookup_order times out for order 9999 (transient), rejects IDs that don't match ORD-\\d{5} (validation), process_refund rejects orders over 30 days old (business), and any customer flagged \"restricted\" returns a permission error.",
    "Make search_orders return an empty list, not an error, when an email has no orders. Also add a \"db_down\" switch that makes it return a transient error instead.",
    "Baseline: temporarily have every failure return the generic \"Operation failed,\" run one scenario per category, and record what the agent does.",
    "Switch to structured errors and rerun the same scenarios.",
    "In your Lesson 1.2–1.5 research coordinator, have the search subagent retry transient errors up to 3 times with backoff, and return partial results plus a record of what it tried when it gives up.",
  ],
  successCriteria: [
    "With structured errors, the agent retries only the transient case, asks for or corrects the ID in the validation case, relays the customerMessage in the business case, and stops or escalates in the permission case.",
    "With db_down on, the agent says it couldn't check orders right now, and never claims the customer has no orders.",
    "The coordinator's final report names the subtopic that failed and why, instead of silently leaving it out.",
  ],
  stretchGoals: [
    "Count retries per scenario across baseline and structured runs, and put the wasted-retry savings in a table.",
    "Add a PostToolUse hook that logs every error by category, then write a one-paragraph weekly-report summary from those logs.",
  ],
};

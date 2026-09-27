import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your support agent's system prompt says \"Never issue a refund above $500 without manager approval.\" An audit of 2,000 conversations finds three refunds between $540 and $910 that went through without approval. Finance wants a guarantee this can't happen.",
    prompt: "What is the most effective change?",
    choices: [
      "Move the refund rule to the top of the system prompt and write it in capital letters.",
      "Add a PreToolUse hook that denies any process_refund call above $500 and tells the agent to route the case to escalate_to_human instead.",
      "Add few-shot examples showing the agent declining refunds above $500.",
      "Mention the $500 limit in the process_refund tool description.",
    ],
    correct: [1],
    explanation:
      "Financial limits need a deterministic control, and a PreToolUse hook blocks every over-limit call and redirects it to escalation (B). Stronger wording (A), few-shot examples (C) and description text (D) are all prompt-based guidance with a non-zero failure rate, which is exactly what the audit found.",
  },
  {
    type: "multi",
    scenario:
      "Twenty-five turns into a conversation about two separate problems, the agent confirms a refund of \"about $80\" (the charge was $86.40) and forgets that it promised a replacement would ship by October 3. The context also holds six order lookups, each returning 45 fields.",
    prompt: "Which TWO changes most directly fix this?",
    choices: [
      "Keep a case facts block with amounts, dates, order IDs and promises made, included in every turn outside the summarized history.",
      "Switch to a model with a larger context window.",
      "Summarize the conversation more aggressively every five turns to free up space.",
      "Ask the customer to restate their order details every ten turns.",
      "Trim order lookup results to the fields relevant to returns and refunds in a PostToolUse hook, before they enter context.",
    ],
    correct: [0, 4],
    explanation:
      "Exact figures and commitments survive when they're kept in a persistent case facts block (A), and trimming verbose lookups stops irrelevant fields from crowding the context (E). A larger window (B) doesn't stop summaries from blurring numbers. More aggressive summarization (C) is the cause of the vague \"about $80\", not the cure. Making the customer repeat themselves (D) pushes the system's job onto the customer.",
  },
  {
    type: "single",
    scenario:
      "A customer writes: \"I want to talk to a human agent, now.\" From their earlier message, the underlying issue looks like a simple shipping address change that the agent could complete in one tool call.",
    prompt: "What should the agent do?",
    choices: [
      "Look up the account and order first so the handoff is complete, then ask whether they still want a human.",
      "Acknowledge the frustration and offer to change the address, since the fix is straightforward.",
      "Change the address, then escalate so a human can confirm it.",
      "Escalate right away with escalate_to_human, passing a structured summary of what's known so far.",
    ],
    correct: [3],
    explanation:
      "An explicit request for a human is honored immediately, without first investigating (D). Investigating first (A) and acting before escalating (C) both ignore the request. Offering to resolve (B) is right when a customer is frustrated but hasn't asked for a person; here they have.",
  },
  {
    type: "single",
    scenario:
      "process_refund returns {\"error\": \"Refund failed\"} for every failure. When the payment processor times out, the agent tells customers their refund was denied. When an order is past the return window, the agent retries the call several times before giving up.",
    prompt: "What is the best fix?",
    choices: [
      "Add a system prompt instruction to retry every failed refund up to three times.",
      "Have process_refund retry internally until it succeeds and always return success.",
      "Return structured errors with an errorCategory, an isRetryable flag and a customer-facing message, so the agent retries transient timeouts and explains policy violations.",
      "Escalate every failed refund to a human agent.",
    ],
    correct: [2],
    explanation:
      "The agent can only recover correctly if it can tell a transient timeout from a business-rule violation, which structured error metadata provides (C). Retrying everything (A) still wastes attempts on policy violations. Retrying until success (B) can hang and hides real failures behind a false success. Escalating every failure (D) sends routine timeouts to humans and lowers first-contact resolution.",
  },
  {
    type: "multi",
    scenario:
      "A review of escalated cases finds two problems. Human agents, who can't see the conversation transcript, spend the first five minutes re-asking customers for details. And several escalations involved the wrong account: when get_customer returned more than one match for a name, the agent chose the most recently active account.",
    prompt: "Which TWO changes address these problems?",
    choices: [
      "Attach the customer's last three messages to each escalation.",
      "Require escalate_to_human to receive a structured handoff: customer ID, issue, root cause, what was tried, amount involved and a recommended action.",
      "When there are multiple matches, choose the account with the most orders instead.",
      "Instruct the agent to ask for another identifier, such as an email or order number, when get_customer returns multiple matches.",
      "Have the agent rate its confidence in the account match and escalate when the score is below 6.",
    ],
    correct: [1, 3],
    explanation:
      "A structured handoff gives the human everything needed without the transcript (B), and asking for another identifier resolves multiple matches without guessing (D). The last three messages (A) usually miss the facts established earlier. Picking by order count (C) is still a heuristic guess. Self-rated confidence (E) is poorly calibrated, and the agent was already confident when it picked the wrong account.",
  },
];

export const bonus: BonusScenario = {
  title: "Build the support resolution agent end to end",
  context:
    "Combine the pieces from Modules 1, 2 and 5 into one working support agent with a mock backend. Work in ccarf-lab/exercises/6-1/, and reuse your code from earlier exercises where it fits.",
  requirements: [
    "Build a mock MCP server with get_customer, lookup_order, process_refund and escalate_to_human, backed by a JSON fixture of 20 customers (including two with the same name) and 40 orders. Write detailed, differentiated tool descriptions.",
    "Return structured errors from every tool: transient (simulated timeouts on 10% of refund calls), validation, business (return window, already refunded) and permission, each with isRetryable and a customer-facing message.",
    "Add PreToolUse hooks for the identity gate and a $500 refund limit that redirects to escalation, and a PostToolUse hook that trims order lookups to return-relevant fields and normalizes dates.",
    "Keep a case facts block rebuilt every turn, and write escalation criteria with at least two few-shot examples on each side of the line.",
    "Write 20 test conversations covering straightforward refunds, an explicit request for a human, a policy gap, a duplicate name, an over-limit refund and a multi-concern message. Run them and log each outcome.",
  ],
  successCriteria: [
    "At least 16 of the 20 test conversations reach the expected outcome, and every miss is written up with its root cause.",
    "No refund is issued without a verified customer ID or above the limit, across all runs.",
    "Every escalation carries a structured handoff that a person could act on without the transcript.",
    "Simulated timeouts are retried and never reported to the customer as a denial.",
  ],
  stretchGoals: [
    "Measure first-contact resolution across the test set, then change one thing (a description, an example or a criterion) and measure again.",
    "Add a sentiment-based escalation rule as an experiment and show which test cases it gets wrong.",
  ],
};

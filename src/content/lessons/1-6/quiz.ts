import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your account-support agent has tools named verify_identity (sends and checks a one-time code) and change_account_email. The system prompt says \"ALWAYS complete verify_identity before changing any account details.\" An audit finds that in about 3% of conversations, often when customers insist they're in a hurry, the agent calls change_account_email without completing verification.",
    prompt: "What is the most effective fix?",
    choices: [
      "Rewrite the instruction in capital letters and repeat it at the end of the system prompt.",
      "Add few-shot examples of the agent completing verification before email changes, even when the customer is in a hurry.",
      "Add a programmatic prerequisite that blocks change_account_email until verify_identity has succeeded for that account.",
      "Review a monthly sample of email changes and retrain the prompt when violations appear.",
    ],
    correct: [2],
    explanation:
      "Account takeover risk requires a deterministic guarantee. A prerequisite gate checks whether verification actually succeeded and blocks the change until it has. Prompt emphasis (A) and few-shot examples (B) may lower the 3%, but prompts always have some failure rate. A monthly audit (D) finds violations after accounts may already be compromised.",
  },
  {
    type: "multi",
    prompt:
      "For a customer support agent, which TWO requirements should be enforced programmatically rather than through prompt instructions?",
    choices: [
      "Never issue a refund above $500 without human approval.",
      "Use a warm, apologetic tone with frustrated customers.",
      "Verify the customer's identity before changing any account details.",
      "Keep replies under about 150 words unless the customer asks for detail.",
      "Suggest a relevant help-center article when one exists.",
    ],
    correct: [0, 2],
    explanation:
      "Refund limits (A) and identity verification before account changes (C) have financial and security consequences, so they need deterministic enforcement. Tone (B), reply length (D), and article suggestions (E) are style and judgment matters where occasional deviation is acceptable, so prompt guidance is the right tool.",
  },
  {
    type: "single",
    scenario:
      "When your agent escalates, it calls escalate_to_human with a free-text note such as \"Customer upset about refund.\" Human agents can't see the conversation transcript, so they re-verify each customer and ask them to explain the problem again. Handle time for escalated cases has doubled.",
    prompt: "What is the best fix?",
    choices: [
      "Have the agent tell customers, before escalating, to be ready to repeat their issue to the human.",
      "Attach the full raw conversation transcript to every escalation.",
      "Escalate earlier in the conversation, so there's less history for the human to reconstruct.",
      "Make escalate_to_human require a structured summary: customer ID, verification status, issue, root cause, amount, actions taken, and a recommended action.",
    ],
    correct: [3],
    explanation:
      "The guide calls for structured handoff summaries (customer ID, root cause, refund amount, recommended action) because the human doesn't have the transcript. A required schema guarantees those fields are there. Warning customers to repeat themselves (A) accepts the problem. A raw transcript (B) makes the human read and re-analyze the whole conversation to find the facts. Escalating earlier (C) doesn't change what the human receives and may escalate cases the agent could have resolved.",
  },
  {
    type: "single",
    scenario:
      "A customer writes: \"Order 4417 arrived broken, I was charged twice for order 5102, and I need to update my shipping address.\" Logs show the agent often resolves the broken item, closes with a friendly summary, and never addresses the other two issues. This happens in about 40% of multi-issue messages.",
    prompt: "What is the best approach?",
    choices: [
      "Ask customers, through an automatic reply, to send one issue per message.",
      "Decompose the message into distinct items, verify the customer once, investigate each item in parallel using that shared context, and send one reply that resolves every item.",
      "Handle one issue per turn and wait for the customer to bring up the next one.",
      "Escalate every message that contains more than one issue to a human.",
    ],
    correct: [1],
    explanation:
      "The guide's pattern is to decompose multi-concern requests into distinct items, investigate each in parallel with shared context, and synthesize a unified resolution. Pushing the burden to customers (A, C) worsens the experience and still depends on them re-raising issues. Escalating every multi-issue message (D) throws away cases the agent could fully resolve and hurts first-contact resolution.",
  },
  {
    type: "multi",
    scenario:
      "You add a PreToolUse hook that denies process_refund when the customer hasn't been verified, returning permissionDecision \"deny\" with a reason.",
    prompt: "Which TWO statements about this gate are correct?",
    choices: [
      "The gate works only if the model reads and follows the verification instruction in the system prompt.",
      "The denial reason is returned to the model, so it can take the missing step, such as calling get_customer, and then retry.",
      "Once the gate is in place, verification guidance should be removed from the prompt and tool descriptions entirely.",
      "Few-shot examples showing verification first would make the gate unnecessary.",
      "The gate should check recorded state, such as a verified customer ID saved when verification succeeded, rather than what the model says it did.",
    ],
    correct: [1, 4],
    explanation:
      "The deny reason reaches the model and steers it to comply (B), and the gate's guarantee comes from checking recorded state (E), not the model's claims. The gate is deterministic regardless of the prompt (A). Keeping the guidance in the prompt (C) still helps: the model gets the order right most of the time and avoids wasted, denied calls. Few-shot examples (D) remain probabilistic, so they can't replace the gate.",
  },
];

export const bonus: BonusScenario = {
  title: "Add a prerequisite gate, a refund limit, and structured escalation",
  context:
    "Return to your Lesson 1.1 support agent (the manual loop with get_customer, lookup_order, and process_refund) and harden it. Copy it to ccarf-lab/exercises/1-6/. You'll put the gate in your own loop, just before tools execute. It's the same idea as a PreToolUse hook, which you'll use in the Agent SDK in Lesson 1.7.",
  requirements: [
    "Make get_customer verify identity: it takes an email and ZIP code, and on a match records the customer_id in a per-conversation verified set.",
    "Before executing lookup_order or process_refund, check that the customer_id is in the verified set. If it isn't, don't run the tool. Return a tool_result with is_error: true and a reason that tells the model to verify first.",
    "Add a refund limit: process_refund is blocked for amounts over $500, and the reason tells the model to escalate instead.",
    "Add an escalate_to_human tool with a required JSON schema: customer_id, identity_verified, issue, root_cause, amount, why_escalated, actions_taken (a list), recommended_action, and customer_expectation.",
    "Baseline first: with the gate turned off and only a prompt instruction to verify, run a pushy message (\"I'm in a rush, just refund order 4417 now\") 10 times and count refunds issued before verification.",
    "Then turn the gate on and repeat the 10 runs.",
    "Test a multi-concern message covering a damaged item, a duplicate charge, and an address change, and check that the final reply addresses all three.",
  ],
  successCriteria: [
    "With the gate on, zero refunds are issued before verification across all runs. Record the baseline count next to it.",
    "An over-limit refund produces an escalate_to_human call whose input validates against your schema, with every required field filled.",
    "The multi-concern run verifies the customer once, investigates the issues in parallel (several tool_use blocks in one response), and resolves all three in one reply.",
  ],
  stretchGoals: [
    "Show the escalation JSON to someone who hasn't seen the conversation and ask whether they could act on it without questions. Revise the schema based on what they had to ask.",
    "Move the verification check into process_refund's own backend logic as well, so the rule holds even if a future loop forgets the gate.",
  ],
};

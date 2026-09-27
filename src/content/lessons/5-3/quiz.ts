import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A customer opens a chat with: \"I don't want to deal with a bot. Connect me to a person, please.\" Their issue, a missing delivery, is one the agent could likely resolve in two tool calls.",
    prompt: "What should the agent do?",
    choices: [
      "Escalate to a human immediately, without first investigating the issue.",
      "Look up the order first, so the human agent has context, then escalate.",
      "Explain that it can probably solve the problem faster and ask for the order number.",
      "Resolve the issue and then offer a human if the customer is still unhappy.",
    ],
    correct: [0],
    explanation:
      "An explicit request for a human should be honored immediately, without attempting investigation first (A). Investigating first (B), persuading the customer to stay (C) and resolving anyway (D) all override what the customer clearly asked for.",
  },
  {
    type: "multi",
    scenario:
      "A customer writes: \"This is the THIRD time I'm asking. Where is my refund?\" The agent can see the refund was approved but never released, and it has a tool to release it. The customer hasn't asked for a human.",
    prompt: "Which TWO behaviors are correct?",
    choices: [
      "Escalate immediately, because the customer's sentiment is strongly negative.",
      "Escalate because this is the third contact about the same issue.",
      "Acknowledge the frustration and offer to release the refund now, with a clear timeline.",
      "If the customer then says they still want a person, escalate at that point.",
      "Ask the customer to rate their frustration from 1 to 10 before deciding.",
    ],
    correct: [2, 3],
    explanation:
      "Frustration with a solvable issue calls for acknowledging it and offering the fix (C), escalating only if the customer reiterates that they want a person (D). Sentiment (A) and repeat contact alone (B) aren't escalation triggers when the agent can resolve the issue. A frustration rating (E) wastes the customer's time.",
  },
  {
    type: "single",
    scenario:
      "A customer asks the agent to match a competitor's lower price. The company's price-adjustment policy covers only drops in the company's own prices within 14 days of purchase. It says nothing about competitors.",
    prompt: "What should the agent do?",
    choices: [
      "Approve the match, since the policy's purpose is to give customers the best price.",
      "Escalate, because the policy is silent on competitor price matching and a human needs to decide.",
      "Deny the request, telling the customer the policy doesn't allow competitor matching.",
      "Offer a partial adjustment as a compromise.",
    ],
    correct: [1],
    explanation:
      "A request the policy doesn't address is a policy gap, and gaps are escalation triggers (B). Approving (A) or offering a compromise (D) creates an unauthorized precedent. Denying (C) misstates the policy, which is silent rather than prohibitive.",
  },
  {
    type: "single",
    scenario:
      "A support agent calls get_customer(name=\"Jordan Lee\") and gets three matching accounts in different cities. The customer's message doesn't include an account number or email.",
    prompt: "What should the agent do next?",
    choices: [
      "Choose the most recently active account.",
      "Choose the account whose city matches the customer's IP address location.",
      "Show the customer details from all three accounts and ask which one is theirs.",
      "Ask the customer for an additional identifier, such as the email or ZIP code on the account, before proceeding.",
    ],
    correct: [3],
    explanation:
      "Multiple matches call for asking for another identifier rather than choosing heuristically (D). Recency (A) and IP location (B) are heuristics that can select the wrong person's account. Showing all three accounts (C) discloses other customers' data.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about escalation design are correct?",
    choices: [
      "Escalating whenever customer sentiment turns negative is a reliable way to catch complex cases.",
      "Explicit escalation criteria with few-shot examples in the system prompt help the agent decide consistently when to escalate and when to resolve.",
      "A self-reported confidence below a threshold is a reliable escalation trigger.",
      "Complex multi-step cases that policy covers should always be escalated.",
      "Inability to make meaningful progress is an appropriate escalation trigger.",
    ],
    correct: [1, 4],
    explanation:
      "Explicit criteria plus examples drive consistent decisions (B), and being unable to make progress is a real trigger (E). Sentiment (A) and self-reported confidence (C) are unreliable proxies for complexity. Complexity alone isn't a trigger when policy covers the case (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Build and test an escalation policy for your support agent",
  context:
    "Add explicit escalation logic to the support agent from Module 1, and test it against a suite of tricky conversations. Work in ccarf-lab/exercises/5-3/.",
  requirements: [
    "Write a short policy document for your fictional store covering refunds, price adjustments (own prices only) and returns. Leave at least two realistic gaps.",
    "Add escalation criteria and 4 few-shot examples to the agent's system prompt, and an escalate_to_human tool that takes a structured handoff (Lesson 1.6).",
    "Make get_customer return multiple matches for common names, and instruct the agent to ask for another identifier.",
    "Write 16 test conversations with expected outcomes: 4 explicit requests for a human, 4 frustrated but solvable, 4 policy gaps, and 4 ambiguous-match cases.",
    "Run the suite and score each conversation on whether it escalated, whether it escalated at the right moment, and whether it guessed an identity.",
  ],
  successCriteria: [
    "All 4 explicit requests escalate on the first agent turn, with no tool calls before the handoff.",
    "At least 3 of the 4 frustrated cases are resolved without escalation, and any customer who reiterates is escalated.",
    "All 4 policy gaps escalate instead of being approved or denied.",
    "No ambiguous-match case proceeds without the customer providing another identifier.",
  ],
  stretchGoals: [
    "Add a sentiment-based trigger as an experiment and record how many unnecessary escalations it causes on the frustrated-but-solvable set.",
    "Log each escalation's reason category and check that the reasons match the three real triggers.",
  ],
};

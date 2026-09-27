import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A support agent summarizes older turns whenever a conversation passes 30 messages. In long sessions, it starts making mistakes: it quotes the wrong refund amount, forgets the deadline the customer was promised, and once told a customer their issue was resolved when it wasn't.",
    prompt: "What is the most effective fix?",
    choices: [
      "Summarize more often, so each summary covers fewer messages.",
      "Extract transactional facts such as order numbers, amounts, dates, statuses and promised deadlines into a persistent case-facts block included in every prompt, outside the summarized history.",
      "Tell the model in the system prompt to remember important numbers.",
      "Stop summarizing and truncate the oldest messages instead.",
    ],
    correct: [1],
    explanation:
      "A structured facts block kept outside summarization preserves exactly the specifics that summaries blur (B). Summarizing more often (A) runs more rounds of the same lossy process. A memory instruction (C) can't recover facts that are no longer in context. Truncation (D) drops the early facts entirely.",
  },
  {
    type: "multi",
    scenario:
      "In one conversation, a customer raises three problems: a late delivery on one order, a double charge on another, and an address change for future orders. Later in the session, the agent applies the double-charge amount to the late-delivery order and asks the customer to reconfirm an address they already confirmed.",
    prompt: "Which TWO changes address this?",
    choices: [
      "Keep a separate structured context layer listing each issue with its order ID, amount and status.",
      "Ask the customer to open a separate conversation for each problem.",
      "Summarize the conversation after every turn.",
      "Update each issue's status in that structured layer as it progresses, and include the layer in every prompt.",
      "Increase max_tokens so the agent can write longer replies.",
    ],
    correct: [0, 3],
    explanation:
      "A per-issue structured layer (A), kept current and included every turn (D), keeps the issues from blurring together. Forcing separate conversations (B) pushes the problem onto the customer. Constant summarization (C) makes the loss of specifics worse. Output length (E) is unrelated.",
  },
  {
    type: "single",
    scenario:
      "A developer builds a chat assistant on the Messages API. To save tokens, each request sends only the system prompt and the user's latest message. Users complain the assistant ignores what they said a moment ago: \"yes, the second option\" gets a confused reply.",
    prompt: "What is the cause?",
    choices: [
      "The model's context window is too small.",
      "The system prompt is too long.",
      "The API is stateless, so each request must include the conversation history the model should consider; sending only the latest message loses the thread.",
      "The temperature is set too high.",
    ],
    correct: [2],
    explanation:
      "The model only sees what's in each request, so the history must be passed every time (C). The window isn't the issue when almost nothing is sent (A). System prompt length (B) and temperature (D) don't explain losing the previous turn.",
  },
  {
    type: "single",
    prompt: "Which kind of information is most at risk when a long conversation is progressively summarized?",
    choices: [
      "The general topic of the conversation.",
      "The customer's name.",
      "The fact that the customer is unhappy.",
      "Specific numbers, dates, percentages and customer-stated expectations, such as \"refund by March 14 or I'll dispute the charge.\"",
    ],
    correct: [3],
    explanation:
      "Summaries keep the gist and tend to condense specifics like amounts, dates and stated expectations into vague phrases (D). The general topic (A) and overall sentiment (C) are exactly what summaries keep. A name (B) is usually retained and, in any case, belongs in the facts block too.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about preserving context in long interactions are correct?",
    choices: [
      "Once a conversation is summarized, the case facts no longer need to be sent.",
      "A larger context window removes the need to manage what's in context.",
      "Case facts should be kept verbatim and structured, outside the part of the history that gets summarized.",
      "Summaries should replace the facts block to save tokens.",
      "Recent turns can stay verbatim while older turns are summarized, alongside a persistent facts block.",
    ],
    correct: [2, 4],
    explanation:
      "Facts stay exact and structured outside summarization (C), and a layered prompt keeps recent turns verbatim with older ones summarized (E). The facts must be sent every time (A). Larger windows postpone the problem, and very long inputs have their own attention issues (B, Lesson 5.2). Replacing facts with summaries (D) is exactly the failure this lesson prevents.",
  },
];

export const bonus: BonusScenario = {
  title: "Stress-test summarization with a long support session",
  context:
    "Build a support agent that survives a long, multi-issue conversation without losing its facts, and prove it against a naive summarizer. Work in ccarf-lab/exercises/5-1/.",
  requirements: [
    "Script a 60-turn customer conversation, played by a second Claude instance or a fixed script, with three issues, at least six specific amounts and dates, and one customer-stated deadline.",
    "Version A: summarize everything older than the last 10 turns into one paragraph whenever the history passes 20 turns.",
    "Version B: the same summarizer, plus a case_facts block and an open_issues layer that a small extraction step updates after each turn, both injected at the top of every prompt.",
    "At turns 20, 40 and 60, ask the agent the same five factual questions (amounts, deadlines, statuses per issue) and score the answers.",
    "Log the prompt size at each checkpoint for both versions.",
  ],
  successCriteria: [
    "Version B answers all fifteen checkpoint questions correctly. Record Version A's score next to it.",
    "Version B never mixes up amounts or statuses between the three issues.",
    "Your notes show the specific facts that Version A's summaries lost.",
  ],
  stretchGoals: [
    "Change a fact mid-conversation (a new deadline) and confirm Version B updates it in place rather than keeping both.",
    "Run the same test through Claude Code with /compact and compare what survives compaction.",
  ],
};

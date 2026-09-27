import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your support agent's loop ends with: if any(block.type == \"text\" for block in response.content): return the text. In production, about 20% of conversations end with the agent saying \"Let me pull up your order details\" and then nothing happens.",
    prompt: "What is the most effective fix?",
    choices: [
      "Raise max_tokens so the model has room to finish the tool call after writing its text.",
      "Add a system prompt instruction telling the model never to write text before calling a tool.",
      "Branch on stop_reason: continue the loop when it is \"tool_use\" and return the answer only when it is \"end_turn\".",
      "Add an iteration cap of 10 so the agent gets several chances to complete the task.",
    ],
    correct: [2],
    explanation:
      "The model often writes text and a tool_use block in the same response. Treating any text as completion returns the narration and throws away the pending tool call, which is one of the three anti-patterns in Task 1.1. Raising max_tokens (A) doesn't help, because the response wasn't truncated. The loop discarded it. A prompt instruction (B) fights normal model behavior and still leaves the broken check in place. An iteration cap (D) has nothing to do with it: the loop exits on the first iteration.",
  },
  {
    type: "multi",
    prompt: "Which TWO of these loop-control approaches does the exam guide identify as anti-patterns?",
    choices: [
      "Ending the loop when the assistant's text contains phrases like \"Task complete\" or \"I'm done\".",
      "Continuing the loop while stop_reason is \"tool_use\".",
      "Stopping after a fixed number of iterations as the primary way the loop ends.",
      "Appending tool_result blocks to the conversation before the next request.",
      "Treating stop_reason \"end_turn\" as the signal that the agent has finished.",
    ],
    correct: [0, 2],
    explanation:
      "Parsing natural-language signals (A) and using iteration caps as the primary stopping mechanism (C) are both named anti-patterns. B, D, and E describe the correct loop: continue on \"tool_use\", append results between iterations, and finish on \"end_turn\". A cap is still acceptable as a safety backstop, as long as hitting it counts as a failure rather than a normal finish.",
  },
  {
    type: "single",
    scenario:
      "After a refactor, your agent calls lookup_order with the same order ID over and over until it hits the safety backstop. Logs show the tool runs successfully each time and your code prints the correct result. Each new request contains the original user message and the assistant's tool_use turn, but nothing after that.",
    prompt: "What is the most likely root cause?",
    choices: [
      "The lookup_order description is too vague, so the model isn't sure the tool answers the question.",
      "The tool result is never appended as a tool_result block in a user message, so the model never sees what the tool returned.",
      "The model needs few-shot examples showing how to use a lookup result once it has one.",
      "The order service returns too many fields, and the model loses track of the answer.",
    ],
    correct: [1],
    explanation:
      "The API is stateless, so the model only knows what's in the messages you send. The logs show the result is computed but never added to the history, so every request looks as if the tool hasn't run yet and the model sensibly calls it again. Description quality (A), few-shot examples (C), and verbose output (D) are real concerns in other situations, but none of them explains a model that literally never receives the result.",
  },
  {
    type: "single",
    scenario:
      "Your customer support agent handles returns, billing disputes, and account issues. After one incident in which a refund went to the wrong account, a teammate proposes replacing model-driven tool selection with a fixed script: always call get_customer → lookup_order → check_refund_policy → process_refund, in that order, for every request.",
    prompt: "What is the best response to this proposal?",
    choices: [
      "Adopt it. A fixed sequence is always more reliable than letting the model choose tools.",
      "Keep model-driven selection and add a system prompt rule that get_customer must always be called first.",
      "Reject any code-level constraint. Agents should decide everything themselves.",
      "Keep model-driven selection for deciding which tools each request needs, and add a programmatic prerequisite that blocks process_refund until get_customer has returned a verified customer ID.",
    ],
    correct: [3],
    explanation:
      "High-ambiguity support requests need model-driven decisions. A fixed script (A) makes a billing question run a refund pipeline and breaks on anything unanticipated. But the incident shows that one rule must always hold, so it should be enforced in code, not in the prompt (B), which only raises compliance probabilistically. D keeps the agent adaptive and guarantees the critical rule (previewing Tasks 1.4 and 1.5). C ignores that deterministic guardrails are exactly right for must-hold business rules.",
  },
  {
    type: "multi",
    scenario:
      "A response arrives with stop_reason \"tool_use\" and three content blocks: text \"I'll check both orders.\", a tool_use lookup_order(4417), and a tool_use lookup_order(5102). The first lookup succeeds; the second times out.",
    prompt: "Which TWO actions are correct?",
    choices: [
      "Drop the failed call and return only the successful result, so the model isn't distracted by the error.",
      "Return both tool_result blocks in a single user message, each with the tool_use_id of the call it answers.",
      "Treat the response as final, since it contains text, and show \"I'll check both orders.\" to the customer.",
      "Return the timeout as a tool_result with is_error: true and a description of what failed.",
      "Send the successful result now, then send the failed one in a separate user message after retrying.",
    ],
    correct: [1, 3],
    explanation:
      "Parallel tool calls are answered together in one user message, matched by tool_use_id (B), and every tool_use needs a result, including failures, reported with is_error: true (D) so the model can decide whether to retry, explain, or escalate. Dropping the failed call (A) leaves an unanswered tool_use and hides the failure. C is the text-as-completion anti-pattern. Splitting results across messages (E) breaks the turn structure and discourages future parallel calls.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a correct agentic loop from scratch",
  context:
    "Before you use frameworks that run the loop for you, build it by hand once, so you can recognize each anti-pattern when an exam option describes it. Work in ccarf-lab/exercises/1-1/ using the SDK you set up in Lesson 0.1. You'll reuse these tools and fake data in later lessons (hooks in 1.7, structured errors in 2.2, and the Scenario 1 capstone).",
  requirements: [
    "Define three tools with an in-memory fake backend: get_customer(email), lookup_order(order_id), and process_refund(order_id, amount). Seed four or five customers and orders, including one late order.",
    "Write the loop yourself (no tool runner, no Agent SDK). Continue on \"tool_use\", return on \"end_turn\", and raise on any other stop_reason.",
    "Append the full assistant content every iteration, and return every tool result in one user message with matching tool_use_id values.",
    "Make lookup_order raise for unknown order IDs, and return those failures as tool_result blocks with is_error: true.",
    "Add an iteration backstop (for example 25) that raises an error or escalates when reached. It must never return a partial answer as success.",
    "Log one line per iteration: iteration number, stop_reason, tool calls requested, and the current message count.",
    "Run five test prompts: one that needs no tool, a single lookup, a multi-step refund (\"Order 4417 was late, I want a refund\"), a parallel request (\"Check orders 4417 and 5102\"), and an unknown order ID.",
  ],
  successCriteria: [
    "The no-tool prompt finishes in one iteration with stop_reason \"end_turn\".",
    "The parallel request shows two tool_use blocks in a single response, answered in a single user message.",
    "The unknown-order prompt ends with the agent explaining the problem to the customer rather than crashing or looping.",
    "At least one log line shows a response containing both text and a tool_use block, and your loop correctly continued instead of stopping.",
  ],
  stretchGoals: [
    "Deliberately reintroduce each of the three anti-patterns (text-as-completion, parsing \"done\", cap-as-stop) one at a time, and write a sentence in notes/principles.md describing the failure you observed.",
    "Rebuild the same agent with the SDK's tool runner and compare the code size. List which parts of your manual loop the runner now handles for you.",
  ],
};

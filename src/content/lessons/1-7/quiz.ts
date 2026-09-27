import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your support agent's lookup_order MCP tool returns created_at as a Unix timestamp (for example 1726000000), while get_shipment returns ISO 8601 strings with time-zone offsets. The agent sometimes tells customers their order is outside the 30-day return window when it isn't.",
    prompt: "What is the most effective fix?",
    choices: [
      "Add a system prompt instruction telling the agent to carefully convert Unix timestamps before comparing dates.",
      "Add few-shot examples showing correct conversions from Unix timestamps to calendar dates.",
      "Switch to a larger model that handles timestamp arithmetic more reliably.",
      "Add a PostToolUse hook that converts every timestamp from these tools to ISO 8601 UTC before the model sees the result.",
    ],
    correct: [3],
    explanation:
      "Normalizing formats in a PostToolUse hook fixes the data deterministically, on every call, before the model processes it (Task 1.5). Prompt instructions (A) and few-shot examples (B) make the model do the conversion itself, which is probabilistic and still fails sometimes. A larger model (C) may err less often, but it's still doing mental arithmetic that the data layer should handle.",
  },
  {
    type: "multi",
    prompt:
      "Company policy: refunds over $500 must never be issued automatically. They go to a human. Which TWO describe a correct hook-based implementation?",
    choices: [
      "A PreToolUse hook on process_refund that denies the call when the amount argument exceeds $500.",
      "A PostToolUse hook on process_refund that checks the amount after the refund completes and flags it for review.",
      "A system prompt rule, plus a hook that logs violations for a weekly compliance review.",
      "A hook that asks the model to confirm whether the amount is over the limit before allowing the call.",
      "A deny reason telling the model not to retry and to call escalate_to_human with a structured handoff.",
    ],
    correct: [0, 4],
    explanation:
      "Blocking in PreToolUse based on the actual amount argument (A) guarantees the refund never runs, and a deny reason that names the escalation workflow (E) redirects the agent instead of leaving it stuck or retrying. PostToolUse (B) runs after the money has already moved. Logging for later review (C) detects violations but doesn't prevent them. Asking the model (D) puts the guarantee back in probabilistic hands.",
  },
  {
    type: "single",
    prompt:
      "You need to (1) stop the agent from writing to files under /config and (2) remove customers' full card numbers from order lookups before the agent reads them. Which hook types should you use?",
    choices: [
      "PostToolUse for both jobs.",
      "PreToolUse for both jobs.",
      "PreToolUse to block the writes, and PostToolUse to redact the card numbers.",
      "PostToolUse to block the writes, and PreToolUse to redact the card numbers.",
    ],
    correct: [2],
    explanation:
      "Blocking an action has to happen before it executes, so it belongs in PreToolUse. Redacting data from a tool's result has to happen after the tool returns and before the model reads it, so it belongs in PostToolUse. A PostToolUse block (A, D) comes after the write has already happened, and a PreToolUse hook (B, D) runs before there's any output to redact.",
  },
  {
    type: "single",
    scenario:
      "A third-party billing MCP server reports payment status as an integer: 1 = authorized, 2 = captured, 3 = pending review, 4 = declined. The agent sometimes tells customers their payment failed when the status is 3. You can't modify the server.",
    prompt: "What is the best fix?",
    choices: [
      "Ask the vendor to return descriptive status strings in a future API version.",
      "Add a PostToolUse hook that maps the numeric codes to descriptive status strings before the agent sees the result.",
      "Put the table of status codes and their meanings in the system prompt.",
      "Escalate every order with status 3 to a human agent.",
    ],
    correct: [1],
    explanation:
      "A PostToolUse hook normalizes the codes into labels the model can't misread, on every call, without changing the server. Waiting on the vendor (A) doesn't fix anything now. A code table in the prompt (C) still depends on the model applying it correctly every time. Escalating every status-3 order (D) overloads human agents with cases the agent could explain itself.",
  },
  {
    type: "multi",
    prompt: "In which TWO situations should you use a hook rather than a prompt instruction?",
    choices: [
      "You want the agent to use a friendlier, more conversational tone.",
      "A business rule requires guaranteed compliance, such as never exceeding a refund limit.",
      "You'd like the agent to keep answers shorter.",
      "Tool results must reach the model in one consistent format, no matter which MCP server produced them.",
      "You want the agent to suggest relevant follow-up questions.",
    ],
    correct: [1, 3],
    explanation:
      "Hooks are for deterministic guarantees: must-hold business rules (B) and consistent data formats (D). Tone (A), answer length (C), and follow-up suggestions (E) are behavioral preferences where occasional variation is fine, so prompt instructions are the right, simpler tool.",
  },
];

export const bonus: BonusScenario = {
  title: "Normalize messy backends and enforce a refund limit with SDK hooks",
  context:
    "Build a support agent with the Claude Agent SDK whose tools return inconsistently formatted data, then fix that with hooks. Expose your fake backends as in-process MCP tools using the SDK's custom-tool helpers (see the Agent SDK custom tools docs), so they're named mcp__support__<tool>. Work in ccarf-lab/exercises/1-7/.",
  requirements: [
    "Build three fake backends with deliberately inconsistent formats: lookup_order (created_at as a Unix timestamp), get_shipment (ISO 8601 with a non-UTC offset), and get_payment (status as an integer code from 1 to 4). Seed a few orders, including one that is 29 days old and one with payment status 3.",
    "Add a PostToolUse hook for these three tools that converts every timestamp to ISO 8601 UTC and every payment code to a descriptive status. Log each result before and after normalization.",
    "Add a PreToolUse hook on process_refund that denies amounts over $500, with a reason that points the agent to escalate_to_human. Reuse your structured handoff schema from Lesson 1.6.",
    "Baseline: with the PostToolUse hook turned off, ask 10 date- and status-dependent questions (\"Is order 1003 still returnable?\", \"Did my payment go through?\") and count the wrong answers.",
    "Repeat the same 10 questions with the hook turned on.",
    "Request a $750 refund and confirm that the refund never runs and an escalation is created.",
  ],
  successCriteria: [
    "With normalization on, all 10 date and status answers are correct. Record the baseline error count next to that result.",
    "The before/after logs show that every tool result reaching the model uses one date format and descriptive statuses.",
    "The $750 request produces a denied process_refund call followed by an escalate_to_human call with a complete handoff, and the refund backend is never called.",
  ],
  stretchGoals: [
    "Add trimming to the PostToolUse hook so lookup_order returns only the fields the agent needs, and measure the token savings per lookup (a preview of Lesson 5.2).",
    "Add a PreToolUse hook that uses updatedInput to clamp any page_size argument to 50, and confirm the tool receives the clamped value.",
  ],
};

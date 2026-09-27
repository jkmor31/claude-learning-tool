import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Two weeks before your exam, a practice test shows you at 60% in Domain 1 (Agentic Architecture & Orchestration) and 60% in Domain 5 (Context Management & Reliability). You only have time to substantially improve one.",
    prompt: "Which domain should you prioritize, and why?",
    choices: [
      "Domain 5, because lower-weighted domains contain fewer concepts and are faster to master.",
      "Either one, because each domain must independently meet a minimum percentage for you to pass.",
      "Domain 1, because at 27% weight it accounts for roughly 16 scored items versus about 9 for Domain 5, so the same percentage gain is worth nearly twice as many items.",
      "Domain 5, because the score report shows each domain's percentage separately and a weak domain stands out to reviewers.",
    ],
    correct: [2],
    explanation:
      "Pass/fail is based only on your total scaled score. The per-domain percentages are diagnostic and there is no per-domain minimum, which rules out B and D. Given a fixed amount of improvement, the heavier domain gives more total items. Domain 1 also overlaps with Domains 2 and 5 in three of the six scenarios, so the gains carry over.",
  },
  {
    type: "multi",
    prompt: "Which TWO of these topics does the exam guide explicitly list as out of scope?",
    choices: [
      "Forcing a specific tool call with tool_choice: {\"type\": \"tool\", \"name\": \"...\"}",
      "Prompt caching implementation details beyond knowing the feature exists",
      "Environment variable expansion in .mcp.json for credentials",
      "Fine-tuning Claude models or training custom models",
      "Correlating Message Batches API results with custom_id",
    ],
    correct: [1, 3],
    explanation:
      "Prompt caching internals and fine-tuning are both on the out-of-scope list. Forced tool_choice (Tasks 2.3/4.3), .mcp.json environment variable expansion (Task 2.4), and custom_id correlation (Task 4.5) are all explicitly in scope.",
  },
  {
    type: "single",
    scenario:
      "An accounts-payable agent must never issue a payment above $10,000 without human approval. The system prompt states this rule, and in testing the agent follows it 99.2% of the time.",
    prompt: "What is the most appropriate change?",
    choices: [
      "Rewrite the rule in capital letters and move it to the end of the system prompt, where recency makes the model weigh it more heavily.",
      "Add few-shot examples showing the agent declining to process large payments and requesting approval instead.",
      "Have the agent rate its confidence from 1 to 10 before each payment and require approval whenever it scores below 8.",
      "Add a hook that intercepts outgoing payment tool calls, blocks any above $10,000, and routes them to a human-approval workflow.",
    ],
    correct: [3],
    explanation:
      "\"Must never\" with financial consequences calls for a deterministic guarantee. Prompt wording (A) and few-shot examples (B) can raise compliance, but both remain probabilistic, and a 0.8% failure rate on large payments is unacceptable. Self-reported confidence (C) is poorly calibrated and doesn't even measure the right thing: the rule is about the amount, not how sure the model feels. Intercepting the tool call (Task 1.5) enforces the rule every time.",
  },
  {
    type: "single",
    scenario:
      "Your invoice-extraction pipeline always fills purchase_order_number. An audit finds that about 6% of invoices have no PO number at all, and for those the model returned plausible-looking invented values. The JSON schema marks the field as required.",
    prompt: "What is the most effective first step?",
    choices: [
      "Add \"Never hallucinate or invent values\" to the extraction prompt.",
      "Make purchase_order_number nullable (optional) in the schema so the model can return null when the document has no PO number.",
      "Train a classifier on audited invoices to detect fabricated PO numbers after extraction.",
      "Switch to a larger model, which hallucinates less on extraction tasks.",
    ],
    correct: [1],
    explanation:
      "The root cause is the schema. A required field gives the model no valid way to say \"absent,\" so it fills in a value. Making the field nullable removes that pressure (Task 4.3). A generic anti-hallucination instruction (A) leaves the conflicting requirement in place. A classifier (C) is over-engineering before the cheap fix has been tried. A bigger model (D) still faces the same contradiction.",
  },
  {
    type: "multi",
    prompt:
      "When comparing answer options on a CCAR-F scenario question, which TWO characteristics most reliably mark an option as a distractor?",
    choices: [
      "It enforces a required tool-call order programmatically when the business consequences are financial.",
      "It routes decisions using the model's own self-reported confidence about how hard the case is.",
      "It returns structured error metadata including an error category and an isRetryable flag.",
      "It adds a new ML classifier or routing layer before prompt, criteria, or tool-description fixes have been tried.",
      "It splits a large multi-file review into per-file passes plus a separate cross-file integration pass.",
    ],
    correct: [1, 3],
    explanation:
      "Uncalibrated self-assessment used as a gate (B) and infrastructure-first over-engineering (D) are two of the most common distractor patterns in the sample questions. A and E match the correct answers to official sample questions, and C is the structured-error pattern the guide recommends (Task 2.2). One nuance: field-level confidence calibrated against a labeled validation set IS a legitimate technique (Task 5.5). The anti-pattern is trusting uncalibrated self-assessment.",
  },
];

export const bonus: BonusScenario = {
  title: "Set up your CCAR-F lab repository",
  context:
    "The guide's preparation advice is hands-on: build an Agent SDK agent, configure Claude Code for a real project, design MCP tools, and build an extraction pipeline. Every bonus in this course adds to one repository, so by Module 6 you'll have working versions of all six exam scenarios. Set up that repository now, along with the study notes you'll keep adding to.",
  requirements: [
    "Create a git repo named ccarf-lab. Pick Python or TypeScript and use it for the whole course.",
    "Install the Anthropic SDK (anthropic / @anthropic-ai/sdk) and the Claude Agent SDK (claude-agent-sdk / @anthropic-ai/claude-agent-sdk). Read your API key from an environment variable, and add .env to .gitignore before creating it.",
    "Write a hello_tool script that sends one Messages API request with a single simple tool (for example get_current_time) and prints the response's stop_reason plus the type of each content block. Don't build a full loop yet; that's Lesson 1.1.",
    "Add a project-level CLAUDE.md that describes the repo's purpose and language and includes a convention: every exercise lives in exercises/<lesson-id>/.",
    "Create notes/principles.md with the eight exam principles from this lesson rewritten in your own words, each with one realistic example that isn't taken from the lesson.",
    "Create notes/study-plan.md that works backward from your target exam date and assigns modules to weeks, giving Module 1 the most time.",
  ],
  successCriteria: [
    "A prompt that needs the tool (\"What time is it?\") prints stop_reason \"tool_use\" and a tool_use content block. A prompt that doesn't need it prints \"end_turn\".",
    "git status and git log show no API keys or .env files tracked.",
    "Running /memory in a Claude Code session opened inside ccarf-lab shows your project CLAUDE.md loaded.",
  ],
  stretchGoals: [
    "Add a personal preference to ~/.claude/CLAUDE.md, confirm with /memory that it loads at user level, and note why a teammate cloning ccarf-lab would never see it (preview of Lesson 3.1).",
    "Add a README table listing all 50 lessons with a column for bonus-build status.",
  ],
};

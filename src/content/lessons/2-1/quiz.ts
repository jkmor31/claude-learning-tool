import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A support agent has two tools: search_docs (\"Searches documentation.\") and search_tickets (\"Searches tickets.\"). Both take a single query string. When users ask \"Has anyone else reported this crash?\", the agent calls search_docs about half the time.",
    prompt: "What is the most effective first step?",
    choices: [
      "Add eight few-shot examples to the system prompt showing which questions go to each tool.",
      "Add a keyword-based routing layer that picks the tool before the model sees the request.",
      "Expand both descriptions to explain what each searches and returns, the input formats, example queries, and when to use it instead of the other.",
      "Merge the two tools into one search tool that queries both sources.",
    ],
    correct: [2],
    explanation:
      "Descriptions are the primary mechanism the model uses to select tools, and these two give it almost nothing to work with. Expanding them fixes the root cause cheaply. Few-shot examples (A) add tokens without fixing the descriptions. A routing layer (B) is over-engineering and bypasses the model's language understanding. Merging (D) can be a valid redesign, but it's more effort than a first step warrants.",
  },
  {
    type: "multi",
    prompt: "Which TWO elements does the exam guide say a tool description should include?",
    choices: [
      "The input formats it accepts, such as identifier patterns",
      "The programming language the tool is implemented in",
      "Boundaries explaining when to use this tool versus similar ones",
      "The name of the engineer who maintains the tool",
      "A complete list of every other tool available in the system",
    ],
    correct: [0, 2],
    explanation:
      "The guide lists input formats, example queries, edge cases, and boundary explanations. Input formats (A) and boundaries (C) help the model match requests to the right tool. The implementation language (B) and the maintainer's name (D) don't affect selection. Listing every other tool (E) adds noise, because the model already sees all the tools. Name only the look-alikes worth distinguishing.",
  },
  {
    type: "single",
    scenario:
      "Your agents use one analyze_document(document, instructions) tool for everything: extracting figures, summarizing, and checking claims. Its outputs vary widely in structure, and the synthesis agent that consumes them often misreads what kind of result it received.",
    prompt: "What is the best redesign?",
    choices: [
      "Keep one tool, but lengthen its description to cover all three uses in detail.",
      "Add a free-text \"task\" parameter so callers can explain what they want.",
      "Switch to a larger model that interprets the varied outputs more reliably.",
      "Split it into purpose-specific tools such as extract_data_points, summarize_content, and verify_claim_against_source, each with a defined input and output contract.",
    ],
    correct: [3],
    explanation:
      "A generic tool doing three different jobs produces inconsistent outputs. Splitting it gives each job a recognizable name and a predictable output shape (Task 2.1). A longer description (A) doesn't fix the varying outputs. A free-text task parameter (B) makes the tool even more generic. A larger model (C) still gets unpredictable result shapes.",
  },
  {
    type: "single",
    scenario:
      "Your support agent's tools all have thorough descriptions, including escalate_to_human, which clearly says it is for requests to speak with a person. Yet the agent escalates whenever a customer uses the word \"manager,\" even in questions like \"How do I change my account manager's email?\" The system prompt includes: \"If the customer mentions a manager, escalate.\"",
    prompt: "What is the most effective fix?",
    choices: [
      "Rewrite escalate_to_human's description to be even more specific.",
      "Revise the keyword-triggered system prompt instruction to describe the situation instead, such as when a customer asks to speak with a human or supervisor.",
      "Add few-shot examples of \"manager\" questions that should not escalate.",
      "Remove escalate_to_human and let a separate classifier handle escalation.",
    ],
    correct: [1],
    explanation:
      "A keyword-sensitive system prompt instruction is overriding a good tool description. The guide calls for reviewing system prompts for exactly this. The description (A) is already clear, so the conflicting instruction is the problem. Few-shot examples (C) work around the instruction instead of removing it. Removing the tool (D) is a drastic redesign for what is a one-line prompt problem.",
  },
  {
    type: "multi",
    scenario:
      "A research system has two tools, analyze_content and analyze_document, with nearly identical descriptions. The coordinator routes web search results and uploaded PDFs to the wrong one about a third of the time. In practice, analyze_content only ever processes web search results.",
    prompt: "Which TWO changes best remove the overlap?",
    choices: [
      "Add \"IMPORTANT\" to the start of both descriptions.",
      "Rename analyze_content to extract_web_results and describe it as processing web search output only.",
      "Randomize the order the tools are listed in each request.",
      "Rewrite analyze_document's description to state that it handles uploaded or fetched documents, and point to the web-results tool for search output.",
      "Add a third, general-purpose analysis tool as a fallback.",
    ],
    correct: [1, 3],
    explanation:
      "Renaming with a purpose-specific name and description (B) and rewriting the other tool with clear boundaries (D) eliminate the functional overlap, which is the guide's own example. Emphasis words (A) don't add information. Tool order (C) doesn't resolve ambiguity. A third general tool (E) adds another option to confuse.",
  },
];

export const bonus: BonusScenario = {
  title: "Measure tool-selection accuracy, then improve it",
  context:
    "Build a small tool-selection eval so you can see the effect of descriptions instead of guessing. You don't need to implement the tools. You're only checking which tool the model chooses. Work in ccarf-lab/exercises/2-1/.",
  requirements: [
    "Define five tools, including two deliberately similar pairs: search_orders vs search_customers, and search_docs vs search_tickets. Start with one-line descriptions.",
    "Write 25 labeled test queries with the tool that should be chosen. Include at least 8 ambiguous ones (for example \"Did Jane's order ship?\" or \"Is the export button supposed to do that?\").",
    "Write a script that sends each query, records the first tool_use block's name, and reports accuracy overall and on the ambiguous subset.",
    "Round 2: rewrite every description with purpose, return shape, input formats, example queries, boundaries, and edge cases. Rerun the eval.",
    "Round 3: add a keyword-triggered line to the system prompt (for example \"Whenever an order is mentioned, check the customer record\"). Rerun the eval and record the regression.",
    "Round 4: replace the keyword line with a situation-based instruction and rerun.",
  ],
  successCriteria: [
    "A results table shows accuracy for all four rounds, overall and on the ambiguous subset.",
    "Round 2 improves ambiguous-query accuracy noticeably over round 1, round 3 shows a measurable regression, and round 4 recovers it.",
    "Your notes identify the specific description changes that fixed the most misroutes.",
  ],
  stretchGoals: [
    "Add a generic analyze_text tool, measure how often it steals queries from the specific tools, then split it into two purpose-specific tools and measure again.",
    "Run each query three times and report consistency, meaning how often the same query picks the same tool.",
  ],
};

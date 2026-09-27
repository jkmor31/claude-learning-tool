import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your multi-agent research system is asked for \"a competitive analysis of the electric vehicle market.\" The final report covers only Tesla's and BYD's pricing, and says nothing about charging infrastructure, battery supply chains, or regulation. Logs show the coordinator created three subtasks: \"Tesla pricing strategy,\" \"BYD pricing strategy,\" and \"Tesla vs BYD price comparison.\" Every subagent completed its subtask successfully.",
    prompt: "What is the most likely root cause?",
    choices: [
      "The synthesis subagent summarizes too aggressively and drops findings about infrastructure and regulation.",
      "The coordinator's task decomposition is too narrow, so no subagent was ever assigned the missing dimensions.",
      "The search subagent's queries are too narrow and need to cover more EV market topics.",
      "The report subagent's template lacks sections for supply chain and regulatory analysis.",
    ],
    correct: [1],
    explanation:
      "The logs show the gap: all three subtasks are about pricing for two companies. The subagents did exactly what they were assigned, so the problem is the assignment. The synthesis agent (A) can't drop findings nobody produced. The search agent (C) searched for the topics it was given. The report template (D) can't fill in content that was never researched. When every subagent succeeds but coverage is missing, check the coordinator's decomposition first.",
  },
  {
    type: "multi",
    prompt:
      "According to the exam guide, which TWO are benefits of routing all subagent communication through the coordinator?",
    choices: [
      "Lower end-to-end latency than letting subagents pass results directly to each other",
      "Observability: the full flow of work can be traced from one place",
      "Subagents no longer need context passed to them explicitly",
      "Consistent error handling, because failures surface in one component with one recovery policy",
      "Subagents automatically share memory across invocations",
    ],
    correct: [1, 3],
    explanation:
      "The guide lists observability, consistent error handling, and controlled information flow. Routing through a hub usually adds a hop rather than removing one, so A is wrong. Subagents still need context passed explicitly (C), and they don't share memory between invocations (E), no matter how communication is routed.",
  },
  {
    type: "single",
    scenario:
      "Earlier in the conversation, a user gave the coordinator three vendor contracts and asked it to focus on data-retention clauses for EU customers. The coordinator then invokes a document-analysis subagent with the prompt: \"Analyze the contracts for the relevant clauses.\" The subagent returns a generic summary of every clause type, with no mention of the EU.",
    prompt: "What is the most likely cause?",
    choices: [
      "The subagent uses a smaller model that can't follow multi-part instructions.",
      "The document-analysis tool's description is too vague to steer the subagent.",
      "The coordinator's max_tokens is too low to hold the full contract text.",
      "The subagent doesn't inherit the coordinator's conversation, so it never received the contracts' content, the focus on data retention, or the EU constraint.",
    ],
    correct: [3],
    explanation:
      "Subagents start with isolated context. \"The contracts\" and \"the relevant clauses\" point to information that exists only in the coordinator's history, which the subagent never saw. The fix is to put the contract text, the clause criteria, and the EU constraint directly in the delegation prompt. Model size (A), tool descriptions (B), and max_tokens (C) don't explain a subagent that is missing the task's key facts.",
  },
  {
    type: "single",
    scenario:
      "To save a round trip, a teammate proposes that the search subagent send its results directly to the synthesis subagent, bypassing the coordinator. Last month, two production reports shipped with missing sections because searches failed silently.",
    prompt: "What is the best response?",
    choices: [
      "Keep routing results through the coordinator, so it can see every result, detect failed or empty searches, and decide what the synthesis subagent receives.",
      "Adopt the proposal. Removing the coordinator hop reduces latency, which matters most for research reports.",
      "Let the synthesis subagent call the search subagent directly whenever it needs more information.",
      "Merge all subagents into one agent with every tool, so there are no handoffs to lose information in.",
    ],
    correct: [0],
    explanation:
      "The incidents are exactly what hub-and-spoke prevents: with results flowing through the coordinator, a failed search is noticed and handled in one place instead of quietly becoming a gap. Direct passing (B) and agent-to-agent calls (C) both remove that visibility and control. Collapsing into one agent (D) reintroduces the context overload and tool sprawl that motivated splitting the work in the first place.",
  },
  {
    type: "multi",
    prompt: "Which TWO of these are the coordinator's responsibilities in a hub-and-spoke system?",
    choices: [
      "Running web searches itself to double-check every subagent's findings",
      "Automatically sharing its full conversation history with each subagent",
      "Breaking the request into subtasks and deciding which subagents to invoke based on its complexity",
      "Letting subagents negotiate among themselves which one handles each subtask",
      "Aggregating subagent results and handling their errors",
    ],
    correct: [2, 4],
    explanation:
      "The guide assigns the coordinator decomposition, delegation (including choosing subagents by query complexity), information routing, error handling, and result aggregation. Doing the subagents' work itself (A) defeats specialization. Conversation history is never shared automatically (B); the coordinator passes context explicitly. Subagents negotiating among themselves (D) is a mesh, not hub-and-spoke.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a minimal hub-and-spoke research coordinator",
  context:
    "Build a small coordinator with isolated subagents using plain Messages API calls. Each subagent is a separate API call with its own system prompt and a fresh messages array. You'll switch to the Agent SDK's Task tool in Lesson 1.4, but building it by hand first shows you exactly where context stops and starts. Use a local corpus instead of live web search so every run is repeatable. Work in ccarf-lab/exercises/1-2/.",
  requirements: [
    "Create a corpus of 12 to 15 short notes (a few sentences each, and it's fine to have Claude draft them) on \"How are cities adapting to extreme heat?\" Spread them across at least six dimensions, such as public health, tree canopy, building codes, the energy grid, outdoor workers, and public transit.",
    "Build a search subagent with one tool, search_corpus(query), that returns matching notes along with their filenames. Build a synthesis subagent that has no tools and writes a cited summary from the findings it's given.",
    "Build a coordinator that decomposes the question into subtasks, invokes the search subagent once per subtask, passes the collected findings (with filenames) to the synthesis subagent, and returns the result. Reuse your Lesson 1.1 loop for any agent that has tools.",
    "Give every subagent a new messages array containing only the coordinator's prompt. Never pass the coordinator's own history.",
    "Log every handoff at the coordinator: which subagent, the prompt it received, and a short summary of what it returned.",
    "Run it twice: once with a coordinator prompt that just says \"decompose into subtasks,\" and once with a prompt that first requires listing the topic's major dimensions and then creating at least one subtask per dimension.",
  ],
  successCriteria: [
    "The handoff log shows every piece of information that reached each subagent, with no hidden channels.",
    "An isolation check passes: tell the coordinator a fact in conversation (for example \"only consider US cities\"), leave it out of a subagent prompt, and confirm the subagent ignores it. Then add it to the prompt and confirm the subagent follows it.",
    "Comparing the two runs, the dimension-first prompt covers noticeably more of the corpus's six dimensions. Record the coverage of each run in notes/principles.md.",
  ],
  stretchGoals: [
    "Make the search subagent fail for one subtask, for example by raising an error, and have the coordinator report the coverage gap in the final output instead of silently skipping it (a preview of Lesson 5.4).",
    "Add a \"quick answer\" path where the coordinator skips synthesis for simple factual questions and answers from a single search. This previews Lesson 1.3's dynamic subagent selection.",
  ],
};

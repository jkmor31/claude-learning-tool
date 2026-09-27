import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "The search and analysis subagents complete successfully and their logs show dozens of findings. The coordinator then spawns the synthesis subagent with the prompt \"Synthesize the findings gathered so far into a structured summary.\" The synthesis agent replies that it has no findings to work with.",
    prompt: "What is the most effective fix?",
    choices: [
      "Enable shared memory so subagents can read each other's results.",
      "Give the synthesis agent web search tools so it can gather the findings itself.",
      "Include the complete findings from search and analysis, as structured records, directly in the synthesis agent's prompt.",
      "Increase the synthesis agent's max_tokens setting.",
    ],
    correct: [2],
    explanation:
      "Subagents don't inherit the coordinator's context, so the synthesis agent sees only what its prompt contains, and the findings must be passed in explicitly (C). Shared memory between subagents (A) isn't how the pattern works and would bypass the coordinator. Web search for synthesis (B) duplicates work and gives it tools outside its role. max_tokens (D) limits output length and has nothing to do with missing input.",
  },
  {
    type: "multi",
    scenario:
      "For the topic \"urban heat mitigation\", the coordinator spawns three search subagents one per turn, waiting for each to finish before starting the next. Each gets the same prompt, \"Research urban heat mitigation,\" and about 70% of the sources they return are shared.",
    prompt: "Which TWO changes reduce both latency and duplication?",
    choices: [
      "Add a deduplication step after all three searches finish.",
      "Assign each subagent a distinct subtopic or source type, such as green infrastructure, building materials and municipal policy.",
      "Give the three subagents a shared store where they can check what the others have already found.",
      "Emit all three Task calls in a single coordinator response so the subagents run in parallel.",
      "Replace the three subagents with one search agent allowed three times as many turns.",
    ],
    correct: [1, 3],
    explanation:
      "Partitioning the scope stops the overlap at its source (B), and multiple Task calls in one response run independent subagents in parallel (D). Deduplicating afterward (A) removes the repeats but still pays for the wasted searches. A shared store (C) routes communication around the coordinator. One agent with more turns (E) makes the run slower, not faster.",
  },
  {
    type: "single",
    scenario:
      "The document-analysis subagent gets a 403 error on 3 of 12 documents because they're behind a paywall. For those, it returns an empty analysis list with status \"success\". The final report states that \"no studies have examined long-term effects,\" which a reviewer knows is false: two of the paywalled papers did.",
    prompt: "What is the best fix?",
    choices: [
      "Report access failures as structured errors (failure type, documents affected, what was attempted, partial results) kept distinct from valid empty results, and have the report note the coverage gap.",
      "Stop the whole research run whenever any document fails to load.",
      "Retry the paywalled documents with exponential backoff until they load.",
      "Instruct the synthesis agent to avoid absolute statements such as \"no studies\".",
    ],
    correct: [0],
    explanation:
      "Returning an access failure as an empty success is silent suppression, which produced the false claim. Structured errors let the coordinator tell a failure from a real absence and annotate the gap (A). Ending the run (B) throws away the nine documents that worked. Retrying a permission error (C) won't succeed. Softer wording (D) hides the symptom while the pipeline still misreports what it found.",
  },
  {
    type: "single",
    scenario:
      "The document-analysis subagent has a generic fetch_url tool. It sometimes follows links inside documents to login pages, cookie banners and advertisements, and then analyzes that content as if it were a source document.",
    prompt: "What is the most effective change?",
    choices: [
      "Add a system prompt instruction to fetch only research documents.",
      "Give the subagent additional tools so it can classify each page before analyzing it.",
      "Force tool_choice to fetch_url so the subagent always fetches before analyzing.",
      "Replace fetch_url with a load_document tool that validates the URL points to an accepted document type or source before loading it.",
    ],
    correct: [3],
    explanation:
      "Replacing a generic tool with a constrained one that validates its input stops the misuse at the tool boundary (D). A prompt instruction (A) is guidance the agent already fails to follow reliably. More tools (B) add decision complexity without fixing the unconstrained fetch. Forcing fetch_url (C) makes the problem more frequent.",
  },
  {
    type: "multi",
    scenario:
      "A 40-minute research run crashed during synthesis after every search and analysis subagent had finished, and restarting reran everything from scratch. Separately, reviewers note that reports often have thin sections that the coordinator never revisits before the report is written.",
    prompt: "Which TWO changes address these problems?",
    choices: [
      "Have each agent export its state to a known location and the coordinator keep a manifest that it loads on restart, passing the relevant state into each agent's prompt.",
      "Raise the overall timeout for the research run.",
      "Merge all the subagents into a single agent to avoid handoffs.",
      "Have the report agent fill thin sections with general background information.",
      "After synthesis, have the coordinator check coverage against the research goals, send targeted queries for the gaps, and rerun synthesis until coverage is sufficient.",
    ],
    correct: [0, 4],
    explanation:
      "State exports plus a manifest let the coordinator resume from where the run stopped (A), and an iterative refinement loop finds and fills gaps before the report is written (E). A longer timeout (B) doesn't help with a crash. One agent (C) loses the isolation and parallelism that make the system work. Filling gaps with general background (D) hides them behind unsourced text.",
  },
];

export const bonus: BonusScenario = {
  title: "Build the research system end to end",
  context:
    "Bring together your coordinator, subagents, structured errors and provenance work into one system that produces a cited report. Work in ccarf-lab/exercises/6-3/, and reuse code from your Module 1 and Module 5 exercises.",
  requirements: [
    "Define four subagents (search, document analysis, synthesis, report) with their own descriptions, system prompts and tool lists of four or five tools each. Give synthesis a narrow verify_fact tool and no web search.",
    "Write a coordinator prompt built on research goals and quality criteria. Have it partition the topic into distinct subtopics and spawn independent subagents with several Task calls in one response.",
    "Pass findings as structured claim records (claim, excerpt, source, URL, published date, data period) through every step, never as prose summaries.",
    "Make subagents retry transient failures locally and return structured errors with partial results otherwise. Simulate a timeout and a 403, and check that the report lists the resulting coverage gaps.",
    "Add a refinement loop that checks coverage after synthesis and re-delegates for gaps, and write state plus a manifest after each stage so a killed run can resume.",
  ],
  successCriteria: [
    "Every factual sentence in the final report cites a claim record, and a conflicting pair of figures appears with both sources.",
    "The parallel run finishes noticeably faster than a version that spawns one subagent per turn; record both times.",
    "Killing the process during synthesis and restarting skips the finished search and analysis stages.",
    "The report names the gaps caused by the simulated failures instead of stating that no information exists.",
  ],
  stretchGoals: [
    "Give the coordinator a deliberately narrow decomposition prompt, show the coverage gap it causes, and show the refinement loop catching it.",
    "Log every message through the coordinator and build a timeline view of one run.",
  ],
};

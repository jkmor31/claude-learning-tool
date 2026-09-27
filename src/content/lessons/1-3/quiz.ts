import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your research system sends every request through search → document analysis → synthesis → report. Users complain that simple factual questions (\"What year did the GDPR take effect?\") take about 40 seconds and cost as much as full research reports.",
    prompt: "What is the most effective change?",
    choices: [
      "Switch every subagent to a cheaper, faster model.",
      "Remove the report subagent from the pipeline to cut one stage for all requests.",
      "Have the coordinator analyze each request and invoke only the subagents it needs, so simple questions get a single search.",
      "Cache previous answers and return them when a similar question arrives.",
    ],
    correct: [2],
    explanation:
      "The root cause is a fixed pipeline, so the fix is dynamic selection in the coordinator (Task 1.2). A cheaper model everywhere (A) still runs four stages for a one-line answer and may hurt complex reports. Removing the report subagent (B) breaks the requests that need it. Caching (D) only helps exact repeats and leaves the over-processing in place.",
  },
  {
    type: "multi",
    scenario:
      "Three search subagents each receive the assignment \"Research renewable energy adoption.\" About 70% of their combined findings are duplicates.",
    prompt: "Which TWO changes best reduce the duplication?",
    choices: [
      "Give each subagent a distinct subtopic, such as solar, wind, and battery storage, with explicit out-of-scope notes.",
      "Add more search subagents so the unique findings outweigh the duplicates.",
      "Add \"avoid duplicating the other agents' work\" to each subagent's prompt.",
      "Give each subagent a distinct source type, such as academic research, industry reports, and government statistics.",
      "Keep the assignments and remove duplicate findings during synthesis.",
    ],
    correct: [0, 3],
    explanation:
      "Partitioning by subtopic (A) or source type (D) prevents the duplicate work in the first place. More agents with the same assignment (B) means more duplication. Subagents have isolated context and can't see each other's work, so \"avoid duplicating\" (C) gives them nothing to act on. Deduplicating in synthesis (E) cleans up the output but still pays for the redundant searches.",
  },
  {
    type: "single",
    scenario:
      "Your coverage criteria require at least two independent sources for each major section. After synthesis, the coordinator finds that the \"implementation costs\" section cites only one source. Every other section passes.",
    prompt: "What should the coordinator do next?",
    choices: [
      "Ask the synthesis subagent to expand the costs section using its own general knowledge.",
      "Send a search subagent a targeted follow-up query about implementation costs, then re-invoke synthesis with the new findings.",
      "Rerun the entire pipeline from decomposition onward to refresh all sections.",
      "Ship the report, because most sections meet the criteria.",
    ],
    correct: [1],
    explanation:
      "The refinement loop re-delegates a targeted query for the specific gap, then re-synthesizes. Filling the gap from the model's own knowledge (A) adds unsourced claims to a report that promises citations. Rerunning everything (C) repeats work that already passed and wastes calls. Shipping (D) ignores the stated quality criteria.",
  },
  {
    type: "single",
    scenario:
      "Your refinement loop always runs exactly three rounds. Some reports still have gaps after round three. Others met every criterion after round one and spent two rounds for nothing.",
    prompt: "What is the best stopping design?",
    choices: [
      "Increase the loop to five rounds so fewer reports ship with gaps.",
      "Stop as soon as the synthesis output contains a phrase like \"coverage is complete.\"",
      "Reduce the loop to one round to eliminate wasted work.",
      "Stop when the coordinator's check against explicit coverage criteria passes, and keep a maximum-round backstop that lists any remaining gaps when it's reached.",
    ],
    correct: [3],
    explanation:
      "The loop should end on the actual condition (criteria met), with a backstop for gaps that can't be filled, and hitting the backstop should surface those gaps rather than hide them. A different fixed count (A, C) repeats the iteration-cap anti-pattern from Lesson 1.1. Stopping on a phrase in the output (B) is the natural-language-signal anti-pattern.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about dividing research work among subagents are correct?",
    choices: [
      "As long as no two assignments overlap, the combined results are guaranteed to cover the whole topic.",
      "Overlapping assignments waste calls and can make one source look like several independent confirmations.",
      "Narrower assignments are always better because they minimize duplication.",
      "Subagents will coordinate among themselves to avoid duplicate work if the prompt tells them to.",
      "A good split has no overlap between assignments and no gaps in coverage of the question.",
    ],
    correct: [1, 4],
    explanation:
      "Overlap is costly and distorts evidence (B), and the goal is a split that is mutually exclusive and collectively exhaustive (E). Avoiding overlap doesn't guarantee coverage (A); that's the narrow-decomposition gap from Lesson 1.2. Narrower isn't automatically better (C), because it can create gaps. Subagents are isolated and can't coordinate with each other (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Add selection, partitioning, and a refinement loop to your coordinator",
  context:
    "Extend the hub-and-spoke coordinator from Lesson 1.2 (reuse its heat-adaptation corpus) so it behaves like a coordinator that thinks about the work. Copy it to ccarf-lab/exercises/1-3/ so you can compare the two versions.",
  requirements: [
    "Dynamic selection: before delegating, have the coordinator classify the request as a quick fact, a focused question, or broad research, and use only the subagents that class needs. Log the chosen path.",
    "Partitioning: for broad research, have the coordinator list the topic's dimensions, then give each search subagent a distinct dimension with an explicit \"out of scope\" line naming the other dimensions.",
    "Coverage criteria: every dimension must be supported by at least two distinct corpus notes. Write the criteria into the coordinator's prompt.",
    "Refinement loop: after synthesis, have the coordinator return a structured coverage check (dimension → note count). For each failing dimension, send one targeted follow-up search, then re-synthesize.",
    "Backstop: allow at most three follow-up rounds. If criteria still fail, the final output must list the dimensions that remain under-supported.",
    "Test three requests: a quick fact answered by a single note (for example \"Which city extended cooling-center hours?\", adjusted to a fact your corpus contains), a focused question (\"How are building codes changing?\"), and a broad one (\"How are cities adapting to extreme heat?\").",
  ],
  successCriteria: [
    "The quick-fact request uses a single search and no synthesis. The broad request uses the full path.",
    "Duplicate notes across search subagents drop sharply compared with your Lesson 1.2 version. Count and record both numbers.",
    "Remove the notes for one dimension so it can't reach two sources. The run then stops at the backstop and names that dimension as a gap instead of pretending it's covered.",
  ],
  stretchGoals: [
    "Partition by source type instead of subtopic: tag each note as research, news, or government, and compare coverage and duplication with the subtopic partition.",
    "Log the total API calls per request type, and write one sentence in notes/principles.md about what dynamic selection saved.",
  ],
};

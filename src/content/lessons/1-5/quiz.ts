import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "In your research system's final reports, many statistics have no citation, and some are attributed to the wrong source. The search subagents return prose summaries (\"According to a recent industry report, adoption grew 34%...\"), and the coordinator joins them into one block of text for the synthesis subagent.",
    prompt: "What is the most effective fix?",
    choices: [
      "Add \"Always cite your sources\" to the synthesis subagent's system prompt.",
      "Have the search subagents return structured records that keep each claim separate from its source metadata (URL, title, date, page), and pass those records intact to synthesis.",
      "Give the synthesis subagent a larger context window so it can hold more of the raw search output.",
      "Let the synthesis subagent run its own web searches to find sources for the claims it receives.",
    ],
    correct: [1],
    explanation:
      "Attribution is lost at the handoff, because prose summaries mix claims with half-remembered sources. Structured records that separate content from metadata preserve attribution through every stage (Task 1.3). \"Always cite\" (A) can't help when the synthesizer never received the sources. A larger context (C) doesn't bring back metadata that was never passed. Re-searching (D) duplicates work, expands the synthesizer's role, and may attach the wrong sources.",
  },
  {
    type: "single",
    scenario:
      "Your coordinator researches four independent subtopics for each request. Logs show it emits one Task call, waits for the result, then emits the next, over four turns. End-to-end latency is roughly the sum of the four subagents' run times.",
    prompt: "What change most directly reduces latency?",
    choices: [
      "Switch the research subagents to a faster model.",
      "Merge the four subtopics into one subagent assignment.",
      "Increase max_tokens so each subagent finishes in fewer iterations.",
      "Have the coordinator emit all four Task calls in a single response, so the subagents run in parallel.",
    ],
    correct: [3],
    explanation:
      "The subtasks are independent, so spawning them together with multiple Task calls in one response cuts latency from the sum of their run times to roughly the slowest one. A faster model (A) shaves each step but keeps them sequential. Merging (B) gives up both parallelism and the focus of separate assignments. max_tokens (C) has nothing to do with the sequential spawning.",
  },
  {
    type: "multi",
    scenario: "The coordinator is about to invoke the synthesis subagent for a research report.",
    prompt: "Which TWO things belong in the delegation prompt?",
    choices: [
      "A reference like \"Use the findings gathered earlier in this conversation.\"",
      "The complete findings from the search and document-analysis subagents, with their source metadata.",
      "Nothing beyond the task name, because the synthesizer inherits the coordinator's context.",
      "The report's goal, audience, and quality criteria, such as citation and coverage requirements.",
      "The coordinator's entire raw conversation transcript, including unrelated turns.",
    ],
    correct: [1, 3],
    explanation:
      "The synthesizer needs the complete findings, with provenance (B), and the goal and quality bar for this report (D). A pointer to \"earlier findings\" (A) refers to context the synthesizer never had. Subagents don't inherit context (C). Dumping the full raw transcript (E) buries the relevant material and wastes context. Pass what the task needs, in a usable structure.",
  },
  {
    type: "single",
    scenario:
      "Your coordinator's prompt is a 12-step procedure with exact search queries for each step. When a scripted query returns nothing relevant, the subagents keep following the script, and the reports end up with holes. They also ignore promising sources they come across that the script didn't anticipate.",
    prompt: "What is the best improvement?",
    choices: [
      "Add more steps that cover what to do when each query fails.",
      "Replace the procedure with a fixed decision tree of backup queries.",
      "Rewrite the prompt around the research goal and explicit quality criteria, and let the subagents choose their own search path.",
      "Add an automatic retry that reruns each failed query up to three times.",
    ],
    correct: [2],
    explanation:
      "The guide recommends coordinator prompts that state research goals and quality criteria rather than step-by-step procedures, so subagents can adapt to what they find. More steps (A) and a decision tree (B) make the script bigger but just as brittle. Retrying the same failed query (D) returns the same nothing.",
  },
  {
    type: "multi",
    prompt: "In which TWO situations is spawning subagents in parallel the right choice?",
    choices: [
      "The subtasks are independent: none needs another's output.",
      "Subtask B needs to read Subtask A's findings before it starts.",
      "The subagents need to exchange findings with each other partway through their work.",
      "You want total latency to be about the slowest subtask rather than the sum of all of them.",
      "The synthesis step should run at the same time as the research it summarizes.",
    ],
    correct: [0, 3],
    explanation:
      "Parallel spawning fits independent subtasks (A), and its benefit is latency close to the slowest subtask (D). Dependent work (B, E) must run in order, because a subagent can't use results that don't exist yet. Subagents can't exchange findings mid-run (C). They're isolated, and in hub-and-spoke all communication goes through the coordinator.",
  },
];

export const bonus: BonusScenario = {
  title: "Structured findings, parallel spawning, and goal-based delegation",
  context:
    "Upgrade the Agent SDK coordinator from Lesson 1.4 so information survives each handoff and independent work runs in parallel. Copy it to ccarf-lab/exercises/1-5/. Add a published date to the frontmatter of each corpus note so findings can carry dates.",
  requirements: [
    "In the researcher's system prompt, require output as JSON records with an id, subtopic, claim, excerpt, source (corpus filename), and published date.",
    "Have the coordinator pass the complete, unmodified findings JSON to the synthesizer, and have the synthesizer cite findings by id, for example [F3].",
    "Write an attribution checker script that fails if the report cites an id that doesn't exist, cites a finding whose source file isn't in the corpus, or contains a sentence with a number but no citation.",
    "Parallelism: tell the coordinator to launch all independent researcher calls in one response. Record the wall-clock time from the first spawn to the last result.",
    "For comparison, run a version whose coordinator is told to research one subtopic per turn, and record its time too.",
    "Goal vs procedure: write two coordinator prompts, one scripted with exact queries and one stating the goal and quality criteria. Delete the notes one scripted query depends on, then run both.",
  ],
  successCriteria: [
    "The attribution checker passes on the normal run with zero broken or missing citations.",
    "The parallel run finishes in roughly the time of the slowest researcher, noticeably faster than the one-per-turn run. Record both times.",
    "In the goal vs procedure comparison, the goal-based coordinator recovers from the missing notes, by finding alternatives or flagging the gap, and the scripted one doesn't.",
  ],
  stretchGoals: [
    "Deliberately flatten the findings into prose before synthesis, rerun the attribution checker, and count how many citations break.",
    "Add a coordinator step that removes duplicate findings by source file before synthesis, and log how many duplicates it removed.",
  ],
};

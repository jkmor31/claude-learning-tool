import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A team runs two Claude workloads: (1) a code check that must pass before a pull request can merge, while the developer waits, and (2) a weekly security audit across 300 repositories, reviewed by the security team on Monday mornings. Both currently use the synchronous API, and costs are high.",
    prompt: "What is the best change?",
    choices: [
      "Move both workloads to the Message Batches API for the 50% savings.",
      "Keep both on the synchronous API, since batches are unreliable.",
      "Move the pre-merge check to the batch API and keep the weekly audit synchronous.",
      "Keep the pre-merge check synchronous and move the weekly audit to the Message Batches API.",
    ],
    correct: [3],
    explanation:
      "Blocking workflows need the synchronous API, while latency-tolerant work like a weekly audit gets 50% savings in a batch (D). Batching the pre-merge check (A, C) could leave developers waiting up to 24 hours. Batches aren't unreliable (B); they just trade latency for cost.",
  },
  {
    type: "multi",
    scenario:
      "A nightly batch of 12,000 contract extractions finishes. 11,850 succeeded. Of the 150 failures, 110 were transient errors or expired, and 40 failed because the contracts exceeded the context window.",
    prompt: "Which TWO actions are correct?",
    choices: [
      "Resubmit the entire batch of 12,000 so every result comes from the same run.",
      "Use the custom_id values of the failed results to resubmit only those 150 requests.",
      "Chunk the 40 oversized contracts into sections, submit each section as its own request, and merge the results.",
      "Drop the 40 oversized contracts from processing permanently.",
      "Resubmit the 40 oversized contracts unchanged, since they may succeed next time.",
    ],
    correct: [1, 2],
    explanation:
      "Resubmit only the failures, identified by custom_id (B), and modify the ones that failed for a structural reason by chunking them (C). Rerunning everything (A) pays twice for 11,850 good results. Dropping documents (D) loses data. Unchanged oversized documents (E) will fail again.",
  },
  {
    type: "single",
    scenario:
      "An engineer wants to convert a research agent to the Message Batches API. The agent calls web_search and fetch_page, reads the results, and decides what to search next, typically over 6–10 turns.",
    prompt: "What is the key problem?",
    choices: [
      "The batch API doesn't support multi-turn tool calling within a request: it can't execute tools mid-request and continue, so the agentic loop can't run inside a batch.",
      "Batches don't support tool definitions at all.",
      "Batches only work with the smallest models.",
      "Batch results are returned in random order, so the agent's turns would be shuffled.",
    ],
    correct: [0],
    explanation:
      "Each batch request is single-shot; there's no loop to run tools and send results back (A). Tool definitions are allowed, for example a forced extraction tool (B). Batches support the same models as the Messages API (C). Result order is handled with custom_id and isn't the core problem (D).",
  },
  {
    type: "single",
    scenario:
      "Documents arrive continuously. The business requires extraction results within 30 hours of each document's arrival. Batch processing can take up to 24 hours, and the team wants about 2 hours of margin for collecting results and resubmitting failures.",
    prompt: "How often should the team submit batches?",
    choices: [
      "Once a day.",
      "Every 12 hours.",
      "Every 4 hours.",
      "Every 30 hours.",
    ],
    correct: [2],
    explanation:
      "30 hours minus 24 for processing leaves 6 hours; reserving 2 for handling results gives a 4-hour submission window, so the worst case is 4 + 24 = 28 hours (C). Daily (A) allows a 24 + 24 = 48-hour worst case. 12-hour windows (B) allow 36 hours. A 30-hour window (D) misses the SLA badly.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about the Message Batches API are correct?",
    choices: [
      "Batches guarantee results within one hour.",
      "Results come back in the same order the requests were submitted.",
      "Each request's custom_id is echoed in its result, so you can correlate responses with requests.",
      "Batches cost the same as synchronous calls but run faster.",
      "Refining the prompt on a small sample before a large batch reduces costly resubmissions.",
    ],
    correct: [2, 4],
    explanation:
      "custom_id correlates each result with its request (C), and refining on a sample first maximizes first-pass success (E). There's no latency guarantee, and the window is up to 24 hours (A). Result order isn't guaranteed (B). Batches cost 50% less and aren't faster (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Run a real extraction batch end to end",
  context:
    "Take the Lesson 4.6 extractor through the batch path: refine on a sample, submit, collect by custom_id, and recover failures selectively. Work in ccarf-lab/exercises/4-7/.",
  requirements: [
    "Assemble at least 200 documents (generated or public), including 5 deliberately too large for your chosen max context, and give each a stable ID.",
    "Refine the extraction prompt synchronously on a 20-document sample until validation passes on at least 19.",
    "Submit the full set as a batch with custom_id values like doc-<id>, poll until it ends, and store each result by custom_id.",
    "Build a resubmission step that collects the failed custom_ids, chunks the oversized documents into sections (doc-<id>-part<n>), and submits only those.",
    "Merge the chunked results back into one record per document, and run validation on everything.",
    "Record the token usage and cost of the batch next to an estimate of the same work done synchronously.",
  ],
  successCriteria: [
    "Every document ends with exactly one validated result or an explicit escalation, matched by custom_id.",
    "The resubmission batch contains only failed IDs, never the whole set.",
    "Your cost comparison shows the batch at about half the synchronous price.",
  ],
  stretchGoals: [
    "Write a scheduler that submits every N hours and prove on paper that it meets a 30-hour SLA.",
    "Add prompt caching for a long shared system prompt and measure the combined savings with batching.",
  ],
};

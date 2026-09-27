import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A research coordinator delegates a literature search to a subagent. The subagent's database connection times out halfway through. It returns {\"status\": \"error\", \"message\": \"search unavailable\"}. The coordinator retries the identical request three times, all fail, and it then drops the topic from the report.",
    prompt: "What change would best improve the coordinator's recovery?",
    choices: [
      "Have the coordinator retry ten times instead of three.",
      "Have the subagent return an empty result list marked as success, so the workflow continues.",
      "Have the subagent return structured error context: the failure type (timeout), what it attempted, the partial results it already had, and possible alternatives.",
      "Terminate the whole research task when any subagent fails, so no incomplete report is produced.",
    ],
    correct: [2],
    explanation:
      "Structured context lets the coordinator re-delegate only the missing part, try an alternative, or proceed with a labeled gap (C). More identical retries (A) repeat the blind approach. Returning empty as success (B) is silent suppression, which makes the report claim there's nothing to find. Terminating everything (D) throws away the other subagents' good work.",
  },
  {
    type: "multi",
    scenario:
      "A synthesis report states \"No studies have examined long-term outcomes of the treatment.\" Investigation shows the subagent responsible for long-term studies hit an authentication failure and returned an empty result list with status \"success.\"",
    prompt: "Which TWO changes address the root cause?",
    choices: [
      "Report access failures, such as auth errors and timeouts, with a failure status, distinct from successful queries that found no matches.",
      "Have the synthesis agent treat every empty result as a probable error.",
      "Remove long-term outcomes from the report's scope.",
      "Ask the synthesis agent to double-check its claims.",
      "Add coverage annotations to the synthesis so topics with unavailable sources are marked as gaps instead of stated as findings.",
    ],
    correct: [0, 4],
    explanation:
      "Distinguishing access failures from valid empty results (A) stops failures from looking like findings, and coverage annotations (E) surface the gap to readers. Treating all empties as errors (B) discards real \"no results\" answers. Narrowing the scope (C) hides the problem. Double-checking (D) can't help when the input itself misrepresents what happened.",
  },
  {
    type: "single",
    scenario:
      "A coordinator running eight research subagents is flooded with error reports. Most are single timeouts or rate-limit responses that would succeed if retried after a short wait. The coordinator's context fills with error handling instead of research.",
    prompt: "What is the best change?",
    choices: [
      "Have the coordinator ignore all errors from subagents.",
      "Run the subagents one at a time to avoid rate limits.",
      "Increase the coordinator's context window.",
      "Have subagents handle transient failures locally with limited retries and backoff, and propagate only errors they can't resolve, along with what was attempted and any partial results.",
    ],
    correct: [3],
    explanation:
      "Local recovery for transient failures, with only unresolved errors propagated, keeps the coordinator focused and well informed (D). Ignoring errors (A) hides real failures. Running sequentially (B) gives up parallelism for a problem that local retries solve. A bigger window (C) makes room for noise instead of removing it.",
  },
  {
    type: "single",
    prompt: "What is the key difference between an access failure and a valid empty result?",
    choices: [
      "An access failure always means the data doesn't exist.",
      "An access failure means the query didn't run successfully, so nothing is known; a valid empty result means the query ran and found no matches, which is itself an answer.",
      "They mean the same thing and should be reported the same way.",
      "A valid empty result should always be retried.",
    ],
    correct: [1],
    explanation:
      "One tells you nothing about the answer, and the other is an answer (B). An access failure says nothing about whether data exists (A). Treating them the same (C) causes false \"no evidence\" claims. Retrying a successful empty query (D) wastes calls.",
  },
  {
    type: "multi",
    prompt: "Which TWO are anti-patterns in multi-agent error handling?",
    choices: [
      "Returning structured error context with partial results.",
      "Silently returning an empty result as success when the query actually failed.",
      "Annotating the final report with gaps caused by unavailable sources.",
      "Terminating the entire workflow because one of many subagents failed.",
      "Having subagents retry transient failures locally before propagating.",
    ],
    correct: [1, 3],
    explanation:
      "Silent suppression (B) and terminating everything on a single failure (D) are the two anti-patterns the guide names. Structured error context (A), coverage annotations (C) and local recovery for transient failures (E) are the recommended practices.",
  },
];

export const bonus: BonusScenario = {
  title: "Inject failures into your research system and make it degrade gracefully",
  context:
    "Add failure injection to the research coordinator from Module 1, and make the system recover, continue, and label its gaps. Work in ccarf-lab/exercises/5-4/.",
  requirements: [
    "Wrap each subagent's search tool with a failure injector that can simulate a timeout, an auth error, a rate limit, or a valid empty result.",
    "Define a subagent result schema with status, failure_type, attempted, partial_results, coverage and alternatives.",
    "Add local retry with backoff in the subagent for rate limits and single timeouts (max 2), and propagate everything else with full context.",
    "Update the coordinator to decide per failure: re-delegate a narrower query, try an alternative source, or continue and record a gap.",
    "Make the final report include coverage annotations per topic.",
    "Run five scenarios: no failures, one transient failure, one permanent auth failure, one valid empty result, and three simultaneous failures.",
  ],
  successCriteria: [
    "Transient failures never reach the coordinator. Your logs show the local retries succeeding.",
    "The auth-failure topic appears in the report as a labeled gap, never as \"no evidence found.\"",
    "The valid-empty topic is reported as a real finding of no results, distinct from the gap.",
    "No scenario aborts the whole task, and every report states its coverage.",
  ],
  stretchGoals: [
    "Show the old generic-error behavior next to the new one on the same scenario, and compare the reports.",
    "Have the coordinator track alternatives already tried, so it never re-delegates the same failing query.",
  ],
};

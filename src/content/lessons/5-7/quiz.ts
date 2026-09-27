import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A multi-agent research system produces well-written reports, but fact-checkers can't trace most claims to a source. Logs show the search subagents did record sources, but the coordinator summarizes their findings in prose before passing them to the synthesis agent.",
    prompt: "What is the most effective fix?",
    choices: [
      "Ask the synthesis agent to add citations at the end from its general knowledge.",
      "Remove the synthesis step and publish the raw subagent outputs.",
      "Require subagents to output structured claim-source mappings (source URL, document name and relevant excerpt) and require the coordinator and synthesis agent to preserve and merge them.",
      "Have fact-checkers search for sources for each claim after publication.",
    ],
    correct: [2],
    explanation:
      "Attribution is lost when findings are compressed without their mappings, so structured claim-source records preserved through every step fix the cause (C). Citations from general knowledge (A) can be fabricated or wrong. Dropping synthesis (B) loses the value of the report. Post-hoc searching (D) is slow and treats the symptom.",
  },
  {
    type: "multi",
    scenario:
      "Two credible industry analysts report different 2025 growth figures for the same market: 18% and 12%. The synthesis agent currently picks the figure from the better-known analyst and reports only that one.",
    prompt: "Which TWO changes follow the guide?",
    choices: [
      "Report the average, 15%, as a compromise.",
      "Include both values in the report, each attributed to its source.",
      "Keep choosing the better-known analyst, since reputation indicates accuracy.",
      "Note the methodological context that may explain the difference, such as revenue-based versus unit-based measurement.",
      "Drop the growth figure entirely, since the sources disagree.",
    ],
    correct: [1, 3],
    explanation:
      "Conflicts should be annotated with source attribution (B), and preserving each source's methodological context often explains the gap (D). An average (A) is a number neither source reported. Picking by reputation (C) is an arbitrary selection that hides the other evidence. Dropping the figure (E) discards credible information.",
  },
  {
    type: "single",
    scenario:
      "A report flags a \"contradiction\": one source says a country's unemployment rate is 6.1% and another says 4.2%. It turns out the first figure is from 2021 and the second from 2025.",
    prompt: "What would have prevented this false contradiction?",
    choices: [
      "Using only the most recent source for every statistic.",
      "Asking the synthesis agent to be more careful about contradictions.",
      "Removing statistics that differ between sources.",
      "Requiring subagents to include publication or data collection dates in their structured outputs, so temporal differences are interpreted correctly.",
    ],
    correct: [3],
    explanation:
      "Dates in structured outputs let synthesis see a trend rather than a conflict (D). Using only the newest source (A) throws away useful history and still needs dates to know which is newest. \"Be careful\" (B) doesn't supply the missing information. Removing differing statistics (C) loses data.",
  },
  {
    type: "single",
    scenario:
      "A document-analysis subagent finds two different contract values in the same filing: $4.2M in the summary and $4.6M in an amended schedule. It currently reports only $4.6M, reasoning that amendments usually supersede summaries.",
    prompt: "What should the subagent do instead?",
    choices: [
      "Complete its analysis with both values included and explicitly annotated, including where each appears, and let the coordinator decide how to reconcile them.",
      "Keep reporting the amended value, since the reasoning is usually right.",
      "Report the lower value to be conservative.",
      "Stop the analysis and return an error.",
    ],
    correct: [0],
    explanation:
      "The guide says to complete the analysis with conflicting values included and annotated, leaving reconciliation to the coordinator (A). Picking the amended value (B) or the lower one (C) makes an editorial choice silently and hides the other evidence. Stopping (D) wastes the rest of the analysis.",
  },
  {
    type: "multi",
    prompt: "Which TWO practices improve a multi-source synthesis report?",
    choices: [
      "Separating well-established findings from contested ones, preserving each source's own characterization, such as \"preliminary.\"",
      "Converting all content, including financial data, into uniform prose paragraphs for consistency.",
      "Removing qualifiers such as \"small sample\" to make the findings read more clearly.",
      "Presenting a single best value for every statistic, with no mention of disagreements.",
      "Rendering financial data as tables, news as prose and technical findings as structured lists.",
    ],
    correct: [0, 4],
    explanation:
      "Explicit established and contested sections that keep sources' characterizations (A), and rendering each content type in its natural form (E), make reports trustworthy and readable. Uniform prose (B) makes numbers hard to compare. Removing qualifiers (C) overstates the evidence. Hiding disagreements (D) removes uncertainty the reader needs to see.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a provenance-preserving research report",
  context:
    "Upgrade the research system's synthesis so every claim is traceable, conflicts are visible, and the report is structured by certainty. Work in ccarf-lab/exercises/5-7/.",
  requirements: [
    "Pick a topic with real disagreement or change over time, and assemble 10–15 sources, including at least two that report different figures for the same thing and one older source whose figure has since changed.",
    "Define a claim record: claim, source, url or document, excerpt, publication_date, data_date and method. Make every search subagent return a list of these.",
    "Change the coordinator to pass records through unchanged, annotating conflicts it detects without resolving them.",
    "Instruct the synthesis agent to produce Well-established, Contested and Gaps sections, with inline citations and one table for any numeric comparison.",
    "Write a checker script that confirms every sentence with a number or factual claim in the report has at least one citation that maps to a record.",
  ],
  successCriteria: [
    "The checker finds no uncited factual claims in the final report.",
    "Both conflicting figures appear in the Contested section with their sources and a note on methodology.",
    "The older figure is presented as an earlier data point with its date, not as a contradiction.",
    "At least one numeric comparison is rendered as a table.",
  ],
  stretchGoals: [
    "Run the old prose-handoff pipeline on the same sources and count the claims that lost attribution.",
    "Add excerpt verification: the checker confirms each excerpt actually appears in its source document.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A pipeline extracts sample_size and methodology from research papers. For papers with a dedicated Methods section, accuracy is high. For about 30% of papers, which describe their methods inside the introduction or results (\"we surveyed 412 clinicians...\"), both fields come back null, even though the information is there.",
    prompt: "What is the most effective fix?",
    choices: [
      "Make both fields required in the schema so the model must fill them.",
      "Retry each null extraction up to three times.",
      "Tell the model in the prompt to \"look harder for the methodology.\"",
      "Add few-shot examples showing correct extraction from a paper with a Methods section and from a paper where the methodology is embedded in the text.",
    ],
    correct: [3],
    explanation:
      "The information is present but in a structure the model doesn't expect, and examples showing each structure fix that directly (D). Making fields required (A) pushes the model toward fabricating values when it can't find them. Retries (B) repeat the same misunderstanding. \"Look harder\" (C) doesn't show where to look.",
  },
  {
    type: "multi",
    scenario:
      "A recipe-extraction pipeline turns \"a pinch of salt\" into 0.5 g, \"2-3 cloves\" into 2.5 cloves, and \"a handful of basil\" into 20 g. Reviewers call these hallucinated values.",
    prompt: "Which TWO changes would most reduce these errors?",
    choices: [
      "Add an instruction to convert every quantity into grams.",
      "Add few-shot examples showing informal amounts kept as their unit with null for the missing number, and ranges kept as a minimum and maximum.",
      "Change the schema so quantity can be null and ranges have separate min and max fields.",
      "Raise the temperature so the model is less rigid.",
      "Delete informal ingredients from the documents before extraction.",
    ],
    correct: [1, 2],
    explanation:
      "Examples demonstrating how informal values are extracted (B), plus a schema that can represent a range or a missing number (C), stop the model from inventing precision. Converting everything to grams (A) forces the invention. Higher temperature (D) adds randomness, not accuracy. Deleting informal ingredients (E) loses real data.",
  },
  {
    type: "single",
    scenario:
      "Your pipeline extracts cited sources from reports. Some reports end with a bibliography; others only use inline citations such as (Okafor 2023) with no reference list. The sources field is empty for most inline-citation reports.",
    prompt: "What should you add to the prompt?",
    choices: [
      "Few-shot examples showing sources extracted from a bibliography and from inline citations.",
      "A rule telling the model to skip reports without a bibliography.",
      "An instruction to generate plausible citations when none are listed.",
      "A requirement that every report must have at least five sources.",
    ],
    correct: [0],
    explanation:
      "Showing both citation structures teaches the model where sources can appear (A). Skipping the reports (B) discards data that's present. Generating citations (C) is fabrication. A minimum count (D) pressures the model to invent sources for reports that cite fewer.",
  },
  {
    type: "single",
    scenario:
      "An invoice extractor returns null for the required total field on 15% of invoices. You investigate and find two groups: some invoices label the total \"Amount due\" or \"Balance,\" and others genuinely have no total, because they're packing slips that were misfiled as invoices.",
    prompt: "What is the best way to handle the two groups?",
    choices: [
      "Add few-shot examples for both groups, and have the model estimate a total for the packing slips.",
      "Retry all the nulls until a total appears.",
      "Add few-shot examples showing totals labeled \"Amount due\" and \"Balance\" for the first group, and treat the second group as missing data: allow null and route those documents for review.",
      "Remove the total field from the schema.",
    ],
    correct: [2],
    explanation:
      "Few-shot examples fix data that's present in an unexpected format, while genuinely absent data should be allowed to be null and handled separately (C). Estimating totals for packing slips (A) is fabrication. Retries (B) can't produce a value that isn't there and may pressure the model to invent one. Removing the field (D) loses it for the 85% of invoices where it works.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about few-shot examples in extraction are correct?",
    choices: [
      "Few-shot examples can reduce hallucination when documents contain informal measurements.",
      "Few-shot examples can recover information that's absent from the source document.",
      "Every example should fill every field, so the model learns never to leave one empty.",
      "Examples showing varied document structures help with fields that come back empty despite being present.",
      "Examples should use the same document structure every time, for consistency.",
    ],
    correct: [0, 3],
    explanation:
      "Examples reduce hallucination with informal values (A) and fix empty extractions caused by unfamiliar structures (D). No technique recovers absent information (B). Always filling every field (C) teaches fabrication; include a legitimately null example. Examples should cover the varied structures you see (E).",
  },
];

export const bonus: BonusScenario = {
  title: "Fix empty and hallucinated fields in a real extraction set",
  context:
    "Build an extractor for a messy document set, diagnose its failures, and fix them with targeted few-shot examples. Work in ccarf-lab/exercises/4-3/.",
  requirements: [
    "Gather 25 documents of one kind with varied structure: recipes from different sites, papers with and without Methods sections, or invoices from different vendors. Include at least 3 where a target field is genuinely absent.",
    "Define an extraction schema (as a tool input_schema) with 5–7 fields, including one informal-value field such as quantity or duration. Label the ground truth by hand.",
    "Run with instructions only. Categorize every error as a hallucination, an empty-but-present field, or correct.",
    "Group the empty-but-present failures by cause, and write one short few-shot example per group, plus one example with a legitimately null field.",
    "Rerun on the documents that weren't used as examples and recategorize the errors.",
  ],
  successCriteria: [
    "A before-and-after table shows hallucinations and empty-but-present errors for each field.",
    "Empty-but-present errors drop on held-out documents, not just on the ones used as examples.",
    "The genuinely absent fields are returned as null after the change, not filled with invented values.",
  ],
  stretchGoals: [
    "Make one field required instead of nullable and measure how many fabrications appear on documents that lack it.",
    "Add normalization rules (units, date format) next to the examples and measure format consistency.",
  ],
};

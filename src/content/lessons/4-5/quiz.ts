import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A lease-extraction tool's schema requires every field, including pet_deposit_amount (a number). An audit finds that for leases with no pet clause, the extractor usually returns 250 or 500, common deposit amounts, instead of indicating that the lease doesn't mention one.",
    prompt: "What is the best schema change?",
    choices: [
      "Keep the field required and add \"do not guess\" to the prompt.",
      "Remove pet_deposit_amount from the schema entirely.",
      "Make pet_deposit_amount nullable, and describe in the field that null means the lease has no pet deposit clause.",
      "Change the field's type to string so the model can write any explanation.",
    ],
    correct: [2],
    explanation:
      "A required field forces the model to produce a value even when none exists, so making it nullable, with guidance on when to use null, removes the pressure to fabricate (C). A prompt instruction (A) conflicts with a schema that still demands a number. Removing the field (B) loses it for leases that do have a pet clause. A free-text string (D) gives up the typed value downstream code needs.",
  },
  {
    type: "multi",
    scenario:
      "A support-ticket classifier uses \"category\": {\"enum\": [\"billing\", \"shipping\", \"returns\", \"account\"]}. A new warranty program has launched, and warranty tickets are being labeled \"returns\" or \"account\" seemingly at random. Other unusual tickets also get forced into the four categories.",
    prompt: "Which TWO schema changes follow the guide's pattern?",
    choices: [
      "Add \"other\" to the category enum.",
      "Add every conceivable future category to the enum now.",
      "Make category a free-text string with no enum.",
      "Remove the enum and ask the model to invent category names consistently.",
      "Add a nullable category_detail string that records the actual category when \"other\" is chosen.",
    ],
    correct: [0, 4],
    explanation:
      "\"other\" (A) plus a detail field (E) keeps the enum clean for downstream code while recording categories that don't fit, and the detail values show when to add a new category such as warranty. Guessing every future category (B) is impossible and bloats the list. Free text (C) and invented names (D) lose the consistency the enum provides.",
  },
  {
    type: "single",
    scenario:
      "A review-sentiment classifier has the enum [\"positive\", \"negative\", \"neutral\"]. Reviewers find that sarcastic or mixed reviews are labeled inconsistently: the same review gets different labels on different runs, which skews the weekly sentiment report.",
    prompt: "What is the most appropriate schema change?",
    choices: [
      "Add \"other\" with a detail field.",
      "Make sentiment nullable.",
      "Remove \"neutral\" so the model must choose a side.",
      "Add \"unclear\" to the enum, so genuinely ambiguous reviews are isolated instead of scattered across real labels.",
    ],
    correct: [3],
    explanation:
      "\"unclear\" is the guide's enum value for ambiguous cases, and it keeps them out of the real categories (D). \"other\" (A) means the item is clearly something not on the list, which isn't the problem here. null (B) suggests the information is absent, when the review is present but ambiguous. Removing neutral (C) forces even more guesses.",
  },
  {
    type: "single",
    prompt: "Why can making every field required in an extraction schema reduce accuracy?",
    choices: [
      "Required fields make the JSON invalid more often.",
      "When a document doesn't contain the information, a required field pushes the model to fabricate a plausible value to satisfy the schema.",
      "Required fields slow down extraction significantly.",
      "Models ignore the required list, so it has no effect.",
    ],
    correct: [1],
    explanation:
      "With no valid way to say \"absent,\" the model fills the field with a plausible guess (B). Required fields don't make JSON invalid (A), and speed isn't the concern (C). Schema enforcement does make models honor the required list, which is exactly why it causes fabrication (D).",
  },
  {
    type: "multi",
    prompt: "Which TWO pairings of situation and schema design are correct?",
    choices: [
      "An invoice currency that isn't in the enum list → set the currency field to \"unclear\".",
      "A field some source documents don't contain → make it nullable.",
      "A text that could reasonably fit two categories → use \"other\" plus a detail field.",
      "A category that's clearly identifiable but not on the list → \"other\" plus a detail string.",
      "A value that's always present in valid documents → make it nullable, just in case.",
    ],
    correct: [1, 3],
    explanation:
      "Missing information calls for a nullable field (B), and a clear but unlisted category calls for \"other\" plus detail (D). An unlisted but identifiable currency is \"other\", not \"unclear\" (A). Ambiguity between categories is \"unclear\", not \"other\" (C). A field that's always present should stay required and non-null, so a missing value is caught (E).",
  },
];

export const bonus: BonusScenario = {
  title: "Stress-test a schema with absent, unlisted and ambiguous data",
  context:
    "Design an extraction schema twice, once naively and once with nullable fields and honest enum exits, and measure how the design changes fabrication. Work in ccarf-lab/exercises/4-5/.",
  requirements: [
    "Collect 30 documents of one type (contracts, job postings or product listings). Deliberately include 8 missing an important field, 5 with a category outside your enum, and 5 that are genuinely ambiguous.",
    "Schema A: every field required, and closed enums with no \"other\" or \"unclear\". Extract all 30 and label each result correct, fabricated, or forced into the wrong category.",
    "Schema B: nullable fields with descriptions of when to use null, \"other\" plus a detail field for the extensible category, and \"unclear\" for the ambiguous one.",
    "Extract all 30 with Schema B using the same prompt and model, and label the results the same way.",
    "Write downstream handling: route null required-for-business fields and \"unclear\" items to a review queue, and log \"other\" details.",
  ],
  successCriteria: [
    "A table compares fabrications and forced categories for Schema A and Schema B.",
    "Schema B returns null for most of the 8 missing-field documents, where Schema A invented values.",
    "The \"other\" detail log contains the real unlisted categories, and the ambiguous items land in \"unclear\".",
  ],
  stretchGoals: [
    "Run Schema B with strict: true (every field required but nullable) and confirm the results match.",
    "Group the \"other\" details and propose which one to promote into the enum.",
  ],
};

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An extraction pipeline processes shipping manifests. About 30% of them have no carrier reference number. Auditors find that for these manifests, the extracted records contain plausible-looking carrier references that don't exist. The schema defines carrier_ref as a required string.",
    prompt: "What is the most effective fix?",
    choices: [
      "Add \"Never make up values\" to the extraction prompt.",
      "Make carrier_ref nullable and instruct the model to return null when the manifest doesn't contain one.",
      "Validate carrier_ref against the expected format and retry when it fails.",
      "Force the extraction tool with tool_choice so the model always calls it.",
    ],
    correct: [1],
    explanation:
      "A required non-null field pushes the model to produce a value, so allowing null when the information is absent removes the pressure to fabricate (B). A prompt instruction (A) fights the schema rather than fixing it. Format validation (C) can't tell a well-formed invented value from a real one, and retrying can't find information that isn't there. Forcing the tool (D) guarantees a call, not a truthful value.",
  },
  {
    type: "multi",
    scenario:
      "A pipeline receives a mix of invoices, credit notes and receipts, with one extraction tool per document type. With tool_choice set to \"auto\", about 4% of responses are prose summaries with no tool call, which break the downstream parser. Separately, the team needs extract_metadata to run before any enrichment tools.",
    prompt: "Which TWO changes address these requirements?",
    choices: [
      "Merge the three extraction tools into a single tool with every field optional.",
      "Add \"Always call a tool\" to the system prompt.",
      "Set tool_choice to \"any\" for the extraction step, so the model must call one of the tools but can choose which.",
      "Force extract_metadata with tool_choice {\"type\": \"tool\", \"name\": \"extract_metadata\"} on the first request, and run enrichment in follow-up turns.",
      "Fall back to parsing the prose responses with regular expressions.",
    ],
    correct: [2, 3],
    explanation:
      "\"any\" guarantees a tool call while letting the model pick the right schema for an unknown document type (C), and forcing a named tool guarantees that step runs first (D). One all-optional tool (A) loses the per-type structure and invites empty fields. A prompt instruction (B) still leaves \"auto\" free to answer in text. Regex parsing (E) keeps the fragile path the schema was meant to remove.",
  },
  {
    type: "single",
    scenario:
      "Validation catches two kinds of failure. Some dates come back as \"4 Mar 2026\" instead of YYYY-MM-DD. And on 12% of contracts, contract_end_date is missing because the contract refers to a master agreement that isn't included. The pipeline currently retries every failure up to five times with the message \"Extraction invalid, try again.\"",
    prompt: "What is the best redesign?",
    choices: [
      "Retry the date errors with the document, the failed extraction and the specific validation error. Don't retry the missing end dates: accept null and route those records for review, or supply the master agreement.",
      "Raise the retry limit to ten for both kinds of failure.",
      "Keep the generic retry message but lower the temperature on retries.",
      "Make contract_end_date required so the model has to fill it in.",
    ],
    correct: [0],
    explanation:
      "Retries with specific error feedback fix format problems, because the information is in the document, while information that's only in another document can't be recovered by retrying (A). More retries (B) and lower temperature (C) waste calls on the absent field, and the generic message gives no guidance for the dates. Making the field required (D) invites fabricated end dates.",
  },
  {
    type: "single",
    scenario:
      "After three months, extraction accuracy on a labeled validation set of 2,000 records is 97%. The operations director proposes removing human review for every record the model marks as high confidence. Nobody has broken the accuracy down any further.",
    prompt: "What should the team do before reducing human review?",
    choices: [
      "Approve the proposal, since 97% exceeds the accuracy target.",
      "Remove review only for invoices, since they're the most common document type.",
      "Have the model rate its confidence from 1 to 10 and auto-approve anything above 8.",
      "Measure accuracy by document type and field, calibrate the confidence thresholds on the labeled set, and keep sampling high-confidence records with stratified random sampling afterward.",
    ],
    correct: [3],
    explanation:
      "An aggregate figure can hide weak segments, uncalibrated confidence isn't a safe threshold, and ongoing sampling catches new error patterns, so all three steps come first (D). Approving on the aggregate (A) risks automating a segment that's much less accurate. Choosing by volume (B) says nothing about accuracy. An uncalibrated self-rating (C) is the unreliable proxy the calibration step exists to replace.",
  },
  {
    type: "multi",
    scenario:
      "A nightly batch of 6,000 contracts finishes with 140 failed requests, 90 of them because the document exceeded the context limit. The team currently resubmits the entire batch the next night. They're also about to send 20,000 documents from a new supplier format straight into a batch using a brand-new prompt.",
    prompt: "Which TWO changes follow the guide?",
    choices: [
      "Move the nightly job to synchronous calls so requests don't fail.",
      "Resubmit only the failed requests, identified by custom_id, splitting the oversized documents into chunks.",
      "Resubmit the whole batch, but earlier in the evening.",
      "Match results to documents by their position in the results, since a batch returns them in submission order.",
      "Refine the new prompt on a representative sample first, to raise the first-pass success rate before batching all 20,000.",
    ],
    correct: [1, 4],
    explanation:
      "Resubmitting only the failures by custom_id, with the oversized documents chunked, avoids redoing 5,860 successful extractions (B), and testing the prompt on a sample prevents an expensive batch of avoidable failures (E). Synchronous calls (A) double the cost and don't fix the size problem. Resubmitting everything (C) wastes the successful work. Results should be matched by custom_id, not by position (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Build the extraction pipeline end to end",
  context:
    "Combine your Module 4 and Module 5 extraction work into one pipeline that could feed a real downstream system. Work in ccarf-lab/exercises/6-6/, using 50–100 documents of at least three layouts (invoices, receipts or contracts you create or find in public datasets).",
  requirements: [
    "Define an extraction tool with a schema that uses nullable fields, an enum with \"other\" + detail and \"unclear\", and stated_total, calculated_total and conflict_detected fields.",
    "Write normalization rules and three few-shot examples covering different layouts, and label 30 documents by hand as a validation set.",
    "Write a validator that checks the schema and the meaning (totals, date order, field placement), and a retry step that sends the document, the failed output and the specific errors, with a two-retry cap and no retries for absent information.",
    "Process the set through the Message Batches API with custom_id per document, and resubmit only failures (chunk at least one deliberately oversized document).",
    "Add field-level confidence, calibrate a review threshold on your labeled set, and report accuracy by document type and by field.",
  ],
  successCriteria: [
    "No extracted record contains a value that isn't in its source document; spot-check 20.",
    "Every total mismatch is either fixed by a retry or flagged with conflict_detected.",
    "Your accuracy report shows each document type and field separately, and you can name the weakest segment.",
    "Only the failed batch requests are resubmitted, and every result is matched back by custom_id.",
  ],
  stretchGoals: [
    "Add a stratified sample of high-confidence records to a review queue and track the error rate it finds over three runs.",
    "Record each field's page or section as provenance, and build a one-screen review view that shows each value next to its source excerpt.",
  ],
};

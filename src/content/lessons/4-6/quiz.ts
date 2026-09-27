import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An invoice pipeline's validator finds that the extracted line items sum to $3,180 while the extracted total is $3,810. The team wants the model to correct the extraction.",
    prompt: "What should the retry request contain?",
    choices: [
      "The original invoice, the failed extraction, and the specific validation error explaining the mismatch between the line-item sum and the total.",
      "The same request as before, sent again unchanged.",
      "Only the validation error message, without the document, to keep the request small.",
      "The original invoice plus the instruction \"be more accurate this time.\"",
    ],
    correct: [0],
    explanation:
      "The guide's retry pattern gives the model the document to re-read, its previous output, and the specific error to fix (A). An unchanged request (B) gives no new information. Without the document (C), the model can't check which value it misread. \"Be more accurate\" (D) doesn't say what was wrong.",
  },
  {
    type: "single",
    scenario:
      "A pipeline extracts purchase_order_number from supplier invoices. For some vendors, the field fails validation on every retry. Investigation shows those vendors never print the PO number on the invoice; it appears only in a separate order confirmation email that isn't provided to the pipeline.",
    prompt: "What is the right response?",
    choices: [
      "Increase the retry limit from 2 to 10.",
      "Add few-shot examples showing where PO numbers usually appear.",
      "Stop retrying for these cases: return null for the field, and route the document to a process that can supply the confirmation email or a person.",
      "Instruct the model to construct a likely PO number from the invoice date and vendor ID.",
    ],
    correct: [2],
    explanation:
      "Retries can't produce information that isn't in the provided source, so return null and escalate or fetch the missing source (C). More retries (A) waste money and pressure the model toward fabrication. Few-shot examples (B) help when the value is present in an unfamiliar place, not when it's absent. Constructing a PO number (D) is fabrication.",
  },
  {
    type: "multi",
    scenario:
      "Some vendor invoices contain their own arithmetic errors: the printed total doesn't match the printed line items. The team wants to tell these apart from cases where the model simply misread a number.",
    prompt: "Which TWO schema additions support this?",
    choices: [
      "Remove the total field so mismatches can't occur.",
      "Extract a calculated_total (the sum of the extracted line items) alongside the stated_total printed on the invoice.",
      "Force the model to make the total equal the line-item sum.",
      "Add a conflict_detected boolean that the model sets when the source data is internally inconsistent.",
      "Add a confidence score and discard any invoice below 90%.",
    ],
    correct: [1, 3],
    explanation:
      "Extracting both totals (B) exposes the discrepancy, and conflict_detected (D) records when the source itself is inconsistent, so it goes to review instead of a retry loop. Removing the total (A) loses needed data. Forcing agreement (C) hides the vendor's error by altering what the document says. Confidence filtering (E) doesn't separate misreads from source inconsistencies.",
  },
  {
    type: "single",
    scenario:
      "Developers dismiss about 40% of an automated reviewer's findings. The team wants to understand which kinds of code trigger the dismissed findings, so it can improve the prompt systematically.",
    prompt: "What is the most useful change to the finding schema?",
    choices: [
      "Add a confidence field to every finding.",
      "Add a free-text explanation to every finding.",
      "Remove low-severity findings from the output.",
      "Add a detected_pattern field naming the code construct that triggered each finding, and log it alongside whether the finding was accepted or dismissed.",
    ],
    correct: [3],
    explanation:
      "detected_pattern lets you group dismissals by the construct that caused them and find the patterns producing false positives (D). Confidence (A) doesn't tell you what kind of code is involved. Free text (B) is hard to aggregate. Removing low-severity findings (C) acts before you know which patterns are the problem.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about validation and retries are correct?",
    choices: [
      "Retries are effective for format mismatches and structural output errors, where the correct information is in the source.",
      "Tool use with a strict schema eliminates semantic errors such as totals that don't match line items.",
      "Retrying indefinitely will eventually recover information that isn't in the provided document.",
      "Semantic validation checks, such as comparing sums, must be written separately from the schema.",
      "A retry should omit the failed extraction so the model starts fresh.",
    ],
    correct: [0, 3],
    explanation:
      "Retries fix errors where the right answer is in the source (A), and semantic checks must be written as separate validation (D). Schemas don't catch semantic errors (B). No number of retries recovers absent information (C). Including the failed extraction (E) shows the model exactly what to correct.",
  },
];

export const bonus: BonusScenario = {
  title: "Build a validate-retry-escalate loop for invoice extraction",
  context:
    "Wrap the Lesson 4.4 extractor in validation, targeted retries, and escalation, and measure what each piece fixes. Work in ccarf-lab/exercises/4-6/.",
  requirements: [
    "Prepare 30 invoices: 20 clean, 4 with line items that are easy to misread, 3 whose own arithmetic is wrong, and 3 missing a PO number that you'll say lives in a separate email you don't provide.",
    "Add stated_total, calculated_total, and conflict_detected to the schema, and write validate() checks for the sum, the dates, and a field swap.",
    "Implement retry with error feedback (document, failed extraction, specific errors), capped at 2 retries.",
    "Before retrying, classify each failure as retryable (the information is in the document) or not (absent, or the source is inconsistent). Route non-retryable cases to an escalation queue.",
    "Log every attempt: the invoice, the attempt number, the errors, and the outcome.",
  ],
  successCriteria: [
    "The misread invoices are corrected on the first or second retry, and your log shows which error message fixed each one.",
    "The 3 arithmetically wrong invoices end with conflict_detected true and escalate without extra retries.",
    "The 3 missing-PO invoices return null and escalate immediately, with no invented PO numbers.",
  ],
  stretchGoals: [
    "Compare targeted retries with blind retries (the same request again) and record the success rate of each.",
    "Add a detected_pattern field to a code-review finding schema and simulate a week of accept and dismiss decisions to find the noisiest pattern.",
  ],
};

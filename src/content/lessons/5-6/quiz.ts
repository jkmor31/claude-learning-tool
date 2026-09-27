import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An insurance-claims extractor reaches 96.8% accuracy on a 5,000-document test set. The operations lead proposes turning off human review for all extractions next week.",
    prompt: "What should the team do first?",
    choices: [
      "Turn off review as proposed, since 96.8% exceeds the 95% target.",
      "Raise the target to 99% overall before automating.",
      "Ask the model to report its overall confidence in the system.",
      "Break accuracy down by document type and by field, and only reduce review for segments that meet the bar on their own.",
    ],
    correct: [3],
    explanation:
      "Aggregate accuracy can hide weak document types or fields, so validate per segment before automating (D). Automating on the overall number (A) risks letting a weak segment through unreviewed. A higher overall target (B) can still hide a failing segment. A self-reported overall confidence (C) isn't evidence of per-segment accuracy.",
  },
  {
    type: "multi",
    scenario:
      "A team wants to use the model's field-level confidence scores to decide which extracted fields need human review. They notice that fields reported at 0.9 confidence are sometimes wrong far more than 10% of the time, and it varies by field.",
    prompt: "Which TWO steps are correct?",
    choices: [
      "Measure actual accuracy at each reported confidence level on a labeled validation set.",
      "Use one fixed threshold of 0.9 for every field.",
      "Set each field's review threshold where its measured accuracy meets the required bar.",
      "Stop using confidence scores and review every field by hand permanently.",
      "Ask the model to be more honest about its confidence.",
    ],
    correct: [0, 2],
    explanation:
      "Calibration means measuring actual accuracy against reported confidence on labeled data (A), then setting thresholds per field from those measurements (C). One global threshold (B) ignores that calibration differs by field. Permanent full review (D) wastes the signal calibration makes usable. Asking for honesty (E) doesn't calibrate anything.",
  },
  {
    type: "single",
    scenario:
      "High-confidence extractions have been auto-accepted for three months with no reviews. A vendor quietly changed its invoice layout, and its tax IDs have been extracted into the wrong field ever since. Nobody noticed.",
    prompt: "Which practice would have caught this?",
    choices: [
      "Raising the auto-accept confidence threshold to 0.99.",
      "Ongoing stratified random sampling of high-confidence extractions (by document type or vendor), checked by people, to measure error rates and detect new error patterns.",
      "Re-running the original validation set every month.",
      "Asking the model to flag layout changes.",
    ],
    correct: [1],
    explanation:
      "Sampling auto-accepted extractions, stratified so each segment is represented, is how you detect novel error patterns and track error rates over time (B). A higher threshold (A) doesn't help if the model is confidently wrong on the new layout. The original validation set (C) doesn't contain the new layout. Self-flagging (D) is unreliable when the model doesn't know it's wrong.",
  },
  {
    type: "single",
    scenario:
      "A review team can handle 400 documents a day, but the pipeline processes 12,000. Some documents have conflicting values in the source itself, for example two different totals printed on one invoice, even though the model reports high confidence.",
    prompt: "How should documents be routed to reviewers?",
    choices: [
      "Randomly select 400 documents a day for review.",
      "Review only the documents with the highest dollar value.",
      "Route extractions with low calibrated confidence, and documents that are ambiguous or contradictory at the source regardless of confidence, to review, prioritizing within that queue.",
      "Route only low-confidence extractions, and trust anything with high confidence.",
    ],
    correct: [2],
    explanation:
      "Low confidence and ambiguous or contradictory sources both warrant human review, and prioritization makes the most of limited capacity (C). Random review (A) is good for sampling but poor for catching the likely errors. Value alone (B) ignores where errors occur. Trusting all high-confidence extractions (D) misses contradictory sources, where confidence doesn't mean correctness.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about human review and confidence calibration are correct?",
    choices: [
      "A plain random sample always gives enough examples of rare document types.",
      "Stratified sampling ensures small segments, such as rare document types, get enough samples to measure their error rates.",
      "Model-reported confidence is a reliable probability without any calibration.",
      "Once a segment is automated, it never needs to be reviewed again.",
      "Reducing human review should be justified per document type and field, not by an overall accuracy figure.",
    ],
    correct: [1, 4],
    explanation:
      "Stratification gives small segments enough samples (B), and automation should be justified per segment (E). A plain random sample underrepresents rare types (A). Raw confidence needs calibration against labeled data (C). Automated segments still need ongoing sampling to catch drift and new patterns (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Calibrate confidence and design a review queue",
  context:
    "Measure your extractor's accuracy by segment, calibrate its confidence per field, and build the routing and sampling around it. Work in ccarf-lab/exercises/5-6/.",
  requirements: [
    "Assemble a labeled set of at least 150 documents across three types, with one type deliberately harder (handwritten, scanned or messy), and make the hard type about 10% of the set.",
    "Have your extractor output a confidence score per field alongside each value.",
    "Compute overall accuracy, then accuracy by document type and by field. Record where the aggregate hides a weak segment.",
    "Calibrate: for each field, bucket extractions by reported confidence and measure actual accuracy. Choose per-field auto-accept thresholds for a 98% bar.",
    "Write a router that sends low-confidence fields and any document with conflict_detected to a review queue, ordered by document value and field criticality.",
    "Write a stratified sampler that picks a weekly audit sample of auto-accepted documents with a minimum per type.",
  ],
  successCriteria: [
    "Your table shows the overall accuracy and a lower per-segment accuracy that the overall number hid.",
    "The per-field thresholds differ, and each is justified by the measured accuracy in its bucket.",
    "The review queue receives every contradictory document, even at high confidence.",
    "The audit sample contains the rare document type in useful numbers.",
  ],
  stretchGoals: [
    "Change the prompt, re-run calibration, and show the thresholds shift.",
    "Simulate a new layout for one vendor and show your stratified sample catching it within one audit cycle.",
  ],
};

"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/content/types";
import { passThreshold } from "@/content/curriculum";
import { recordQuizResult } from "@/lib/progress";

const LETTERS = "ABCDEFGH";

function isCorrect(q: QuizQuestion, picked: number[]) {
  return picked.length === q.correct.length && q.correct.every((c) => picked.includes(c));
}

export function Quiz({ lessonId, questions }: { lessonId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<number[][]>(() => questions.map(() => []));
  const [submitted, setSubmitted] = useState(false);

  const score = questions.filter((q, i) => isCorrect(q, answers[i])).length;
  const threshold = passThreshold(questions.length);
  const passed = score >= threshold;
  const complete = questions.every((q, i) => answers[i].length === q.correct.length);

  function toggle(qi: number, ci: number) {
    if (submitted) return;
    setAnswers((prev) =>
      prev.map((picked, i) => {
        if (i !== qi) return picked;
        if (questions[qi].type === "single") return [ci];
        if (picked.includes(ci)) return picked.filter((c) => c !== ci);
        return picked.length < questions[qi].correct.length ? [...picked, ci] : picked;
      }),
    );
  }

  function submit() {
    setSubmitted(true);
    recordQuizResult(lessonId, score, passed);
  }

  function retry() {
    setAnswers(questions.map(() => []));
    setSubmitted(false);
  }

  return (
    <section aria-labelledby="quiz-heading" className="mt-14">
      <h2 id="quiz-heading" className="text-2xl font-semibold">Knowledge Check</h2>
      <p className="mt-1 text-sm text-muted">
        {questions.length} questions · pass with {threshold}/{questions.length}. Multi-select items are scored
        all-or-nothing, like the real exam.
      </p>

      <ol className="mt-6 space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          const right = isCorrect(q, picked);
          return (
            <li key={qi} className="rounded-xl border border-border bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">Question {qi + 1}</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs">
                  {q.type === "single" ? "Select 1" : `Select ${q.correct.length}`}
                </span>
              </div>
              {q.scenario && <p className="mt-3 text-sm italic text-muted">{q.scenario}</p>}
              <p className="mt-2 font-medium">{q.prompt}</p>

              <div className="mt-4 space-y-2">
                {q.choices.map((choice, ci) => {
                  const selected = picked.includes(ci);
                  const isAnswer = q.correct.includes(ci);
                  let tone = selected ? "border-accent bg-accent-soft" : "border-border hover:border-muted";
                  if (submitted) {
                    if (isAnswer) tone = "border-success bg-success-soft";
                    else if (selected) tone = "border-danger bg-danger-soft";
                    else tone = "border-border opacity-70";
                  }
                  return (
                    <button
                      key={ci}
                      type="button"
                      role={q.type === "single" ? "radio" : "checkbox"}
                      aria-checked={selected}
                      disabled={submitted}
                      onClick={() => toggle(qi, ci)}
                      className={`flex w-full gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${tone}`}
                    >
                      <span className="font-semibold">{LETTERS[ci]}.</span>
                      <span>{choice}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`mt-4 rounded-lg p-3 text-sm ${right ? "bg-success-soft" : "bg-danger-soft"}`}>
                  <p className="font-semibold">
                    {right ? "Correct" : "Incorrect"} — answer: {q.correct.map((c) => LETTERS[c]).join(", ")}
                  </p>
                  <p className="mt-1">{q.explanation}</p>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={!complete}
            className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white disabled:opacity-40"
          >
            Submit answers
          </button>
        ) : (
          <>
            <p className={`font-semibold ${passed ? "text-success" : "text-danger"}`}>
              {score}/{questions.length} — {passed ? "Passed" : "Not yet — review the explanations and retry"}
            </p>
            <button type="button" onClick={retry} className="rounded-lg border border-border px-4 py-2 text-sm">
              Retry quiz
            </button>
          </>
        )}
        {!submitted && !complete && <span className="text-sm text-muted">Answer every question to submit.</span>}
      </div>
    </section>
  );
}

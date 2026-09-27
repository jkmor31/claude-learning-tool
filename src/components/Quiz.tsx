"use client";

import { useEffect, useRef, useState } from "react";
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
  const missed = questions.map((q, i) => (isCorrect(q, answers[i]) ? -1 : i)).filter((i) => i >= 0);
  const sectionRef = useRef<HTMLElement>(null);

  // After submitting or retrying, bring the top of the quiz (with the result summary) into view.
  const [scrollKey, setScrollKey] = useState(0);
  useEffect(() => {
    if (scrollKey === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sectionRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, [scrollKey]);

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
    setScrollKey((k) => k + 1);
  }

  function retry() {
    setAnswers(questions.map(() => []));
    setSubmitted(false);
    setScrollKey((k) => k + 1);
  }

  return (
    <section ref={sectionRef} aria-labelledby="quiz-heading" className="mt-14 scroll-mt-20">
      <h2 id="quiz-heading" className="text-2xl font-semibold">Knowledge Check</h2>
      <p className="mt-1 text-sm text-muted">
        {questions.length} questions · pass with {threshold}/{questions.length}. Multi-select items are scored
        all-or-nothing, like the real exam.
      </p>

      {submitted && (
        <div
          role="status"
          className={`mt-5 rounded-xl border px-5 py-4 ${passed ? "border-success bg-success-soft" : "border-danger bg-danger-soft"}`}
        >
          <p className="text-lg font-semibold">
            {score}/{questions.length} · {passed ? "Passed" : "Not yet"}
          </p>
          {missed.length > 0 ? (
            <p className="mt-1 text-sm">
              Review {missed.length === 1 ? "the question" : "the questions"} you missed:{" "}
              {missed.map((i, n) => (
                <span key={i}>
                  {n > 0 && ", "}
                  <a href={`#q-${i + 1}`} className="font-medium underline underline-offset-2 hover:text-accent">
                    Q{i + 1}
                  </a>
                </span>
              ))}
              . Each one explains why the right answer is right and why the others aren&apos;t.
            </p>
          ) : (
            <p className="mt-1 text-sm">Every answer correct.</p>
          )}
        </div>
      )}

      <ol className="mt-6 space-y-6">
        {questions.map((q, qi) => {
          const picked = answers[qi];
          const right = isCorrect(q, picked);
          return (
            <li key={qi} id={`q-${qi + 1}`} className="scroll-mt-20 rounded-xl border border-border bg-surface p-5">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">Question {qi + 1}</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs">
                  {q.type === "single" ? "Select 1" : `Select ${q.correct.length}`}
                </span>
              </div>
              {q.scenario && <p className="mt-3 text-sm leading-relaxed">{q.scenario}</p>}
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

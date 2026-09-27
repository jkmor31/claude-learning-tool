"use client";

import { useEffect } from "react";
import { recordVisit, useProgress } from "@/lib/progress";

// Shown under the lesson title. Also records this lesson as the last one visited, which the home page's
// "Continue" button uses.
export function LessonStatus({ lessonId, questionCount }: { lessonId: string; questionCount: number }) {
  const progress = useProgress()[lessonId];

  useEffect(() => {
    recordVisit(lessonId);
  }, [lessonId]);

  if (!progress) return null;

  return progress.passed ? (
    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-medium text-success">
      <span aria-hidden>✓</span> Passed · best {progress.bestScore}/{questionCount}
    </p>
  ) : (
    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium">
      Not passed yet · best {progress.bestScore}/{questionCount}
    </p>
  );
}

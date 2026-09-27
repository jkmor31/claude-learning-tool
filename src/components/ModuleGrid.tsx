"use client";

import Link from "next/link";
import { allLessons, modules } from "@/content/curriculum";
import { useLastLesson, useProgress } from "@/lib/progress";

export function ModuleGrid({ builtIds }: { builtIds: string[] }) {
  const progress = useProgress();
  const lastId = useLastLesson();
  const unpassed = (l: (typeof allLessons)[number]) => builtIds.includes(l.id) && !progress[l.id]?.passed;

  // Resume where you left off: the last lesson you opened, or, if you've passed it, the next unpassed lesson
  // after it. Fall back to the first unpassed lesson in the course.
  const lastIndex = allLessons.findIndex((l) => l.id === lastId);
  const next =
    lastIndex >= 0 && !progress[allLessons[lastIndex].id]?.passed
      ? allLessons[lastIndex]
      : (allLessons.slice(lastIndex + 1).find(unpassed) ?? allLessons.find(unpassed));

  return (
    <>
      {next && (
        <Link
          href={`/lessons/${next.id}`}
          className="mt-8 inline-block rounded-lg bg-accent px-5 py-2.5 font-medium text-white"
        >
          {lastId || Object.keys(progress).length ? "Continue" : "Start"}: {next.id.replace("-", ".")} {next.title}
        </Link>
      )}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {modules.map((m) => {
          const passed = m.lessons.filter((l) => progress[l.id]?.passed).length;
          const first = m.lessons[0];
          return (
            <Link
              key={m.id}
              href={`/lessons/${first.id}`}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <div className="flex items-baseline justify-between text-xs text-muted">
                <span className="font-semibold uppercase tracking-wide">Module {m.id}</span>
                {m.weight && <span>{m.weight}% of exam</span>}
              </div>
              <h2 className="mt-1 font-semibold">{m.title}</h2>
              <p className="mt-1 text-sm text-muted">{m.summary}</p>
              <p className="mt-3 text-xs text-muted">
                {passed}/{m.lessons.length} passed
              </p>
            </Link>
          );
        })}
      </div>
    </>
  );
}

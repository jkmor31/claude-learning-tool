import { ModuleGrid } from "@/components/ModuleGrid";
import { allLessons } from "@/content/curriculum";
import { builtLessonIds } from "@/content/loaders";

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Exam code CCAR-F</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Claude Certified Architect – Foundations</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        {allLessons.length} lessons mapped to the official exam blueprint. Each lesson is a deep dive on one or two task
        statements, followed by a 5-question knowledge check in the exam&apos;s scenario style and a bonus build you
        complete on your own.
      </p>
      <ModuleGrid builtIds={[...builtLessonIds]} />
    </div>
  );
}

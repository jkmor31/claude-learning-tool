import Link from "next/link";
import { notFound } from "next/navigation";
import { BonusScenario } from "@/components/BonusScenario";
import { Quiz } from "@/components/Quiz";
import { allLessons, getLesson } from "@/content/curriculum";
import { lessonLoaders } from "@/content/loaders";

export function generateStaticParams() {
  return allLessons.map((l) => ({ id: l.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/lessons/[id]">) {
  const { id } = await params;
  const found = getLesson(id);
  return { title: found ? `${id.replace("-", ".")} ${found.lesson.title} · CCAR-F Prep` : "CCAR-F Prep" };
}

export default async function LessonPage({ params }: PageProps<"/lessons/[id]">) {
  const { id } = await params;
  const found = getLesson(id);
  if (!found) notFound();
  const { lesson, prev, next } = found;
  const loader = lessonLoaders[id];
  const content = loader ? await loader() : null;

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
        Module {lesson.moduleId} · {lesson.moduleTitle}
        {lesson.taskStatements.length > 0 && <> · Task {lesson.taskStatements.join(", ")}</>}
      </p>
      <h1 className="mt-2 text-3xl font-semibold leading-tight">
        <span className="text-muted">{id.replace("-", ".")}</span> {lesson.title}
      </h1>

      {content ? (
        <>
          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-accent prose-code:before:content-none prose-code:after:content-none prose-th:text-left">
            <content.Body />
          </div>
          <Quiz key={id} lessonId={id} questions={content.quiz} />
          <BonusScenario bonus={content.bonus} />
        </>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted">
          This lesson hasn&apos;t been written yet. It&apos;s on the roadmap.
        </div>
      )}

      <nav aria-label="Previous and next lesson" className="mt-14 flex justify-between gap-4 border-t border-border pt-6 text-sm">
        {prev ? (
          <Link href={`/lessons/${prev.id}`} className="hover:text-accent">
            ← {prev.id.replace("-", ".")} {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/lessons/${next.id}`} className="text-right hover:text-accent">
            {next.id.replace("-", ".")} {next.title} →
          </Link>
        )}
      </nav>
    </article>
  );
}

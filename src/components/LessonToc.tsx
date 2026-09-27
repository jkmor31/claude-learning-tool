"use client";

import { useEffect, useState } from "react";

type Section = { id: string; text: string };

// A heading counts as the current section once its top passes this far down the viewport.
const ACTIVE_OFFSET = 120;

// "On this page" contents for a lesson. It reads the rendered h2s (ids come from rehype-slug, plus the
// quiz and bonus headings) instead of taking them as props, so lessons need no extra authoring.
// "rail" is the sticky column on wide screens; "inline" is the collapsible box under the title elsewhere.
export function LessonToc({ variant }: { variant: "rail" | "inline" }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLHeadingElement>("article h2[id]"));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the headings only exist in the DOM after mount
    setSections(
      headings.map((h) => {
        const text = h.textContent?.trim() ?? "";
        // The bonus heading is the build's own title, so label it as the bonus in the contents.
        return { id: h.id, text: h.id === "bonus-heading" ? `Bonus: ${text}` : text };
      }),
    );

    let frame = 0;
    function update() {
      frame = 0;
      let current: string | null = null;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= ACTIVE_OFFSET) current = h.id;
        else break;
      }
      // A short last section can't scroll up to the offset, so at the bottom of the page mark it current.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && headings.length) current = headings[headings.length - 1].id;
      setActiveId(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  if (sections.length < 2) return null;

  const list = (
    <ol className="space-y-1 text-sm">
      {sections.map((s) => {
        const active = s.id === activeId;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              aria-current={active ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1 pl-3 leading-snug transition-colors ${
                active
                  ? "border-accent font-medium text-foreground"
                  : "border-transparent text-muted hover:border-border hover:text-foreground"
              }`}
            >
              {s.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "rail") {
    return (
      <nav aria-label="On this page" className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">On this page</p>
        <div className="border-l border-border">{list}</div>
      </nav>
    );
  }

  return (
    <details className="group mt-6 rounded-xl border border-border bg-surface px-4 py-3">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span>
          On this page <span className="font-normal text-muted">· {sections.length} sections</span>
        </span>
        <span aria-hidden className="text-muted transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <nav aria-label="On this page" className="mt-3 border-l border-border">
        {list}
      </nav>
    </details>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { modules } from "@/content/curriculum";
import { useProgress } from "@/lib/progress";

export function Sidebar({ builtIds }: { builtIds: string[] }) {
  // The static export uses trailing slashes (/lessons/1-4/), so strip it before comparing.
  const pathname = usePathname().replace(/\/$/, "");
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  // Modules the reader has opened or closed on phones. Untouched modules default to open only if they
  // contain the current lesson.
  const [toggled, setToggled] = useState<Record<string, boolean>>({});
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);
  const built = new Set(builtIds);
  const passedCount = Object.values(progress).filter((p) => p.passed).length;
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);
  const currentModuleId = modules.find((m) => m.lessons.some((l) => `/lessons/${l.id}` === pathname))?.id;

  // Keep the current lesson in view inside the lesson list: on desktop when the page changes, and on
  // phones when the menu opens. The nav is its own scroll container in both layouts.
  useEffect(() => {
    const nav = navRef.current;
    const el = activeRef.current;
    if (!nav || !el || nav.clientHeight === 0) return;
    const n = nav.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.top < n.top || r.bottom > n.bottom) nav.scrollTop += r.top - n.top - n.height / 2 + r.height / 2;
  }, [pathname, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <Link href="/" className="font-semibold">CCAR-F Prep</Link>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border px-3 py-1 text-sm"
          aria-expanded={open}
          aria-controls="lesson-nav"
        >
          {open ? "Close" : "Lessons"}
        </button>
      </div>

      {/* On phones the open menu is a panel pinned under the header, so it opens where you are on the
          page and scrolls on its own. On desktop it's the sticky sidebar. */}
      <nav
        id="lesson-nav"
        ref={navRef}
        aria-label="Lessons"
        className={`${open ? "block" : "hidden"} fixed inset-x-0 top-14 bottom-0 z-20 overflow-y-auto overscroll-contain bg-surface lg:sticky lg:inset-x-auto lg:top-0 lg:bottom-auto lg:z-auto lg:block lg:h-screen lg:w-80 lg:shrink-0 lg:border-r lg:border-border`}
      >
        <div className="hidden border-b border-border px-5 py-5 lg:block">
          <Link href="/" className="text-lg font-semibold">CCAR-F Prep</Link>
          <p className="mt-1 text-xs text-muted">Claude Certified Architect – Foundations</p>
        </div>
        <div className="px-5 pt-4 text-xs text-muted">
          {passedCount} of {total} lessons passed
          <div className="mt-2 h-1.5 rounded-full bg-border">
            <div className="h-1.5 rounded-full bg-accent" style={{ width: `${(passedCount / total) * 100}%` }} />
          </div>
        </div>
        <ol className="space-y-5 px-3 py-5 max-lg:space-y-1">
          {modules.map((m) => {
            const expanded = toggled[m.id] ?? m.id === currentModuleId;
            const listId = `module-${m.id}-lessons`;
            const modulePassed = m.lessons.filter((l) => progress[l.id]?.passed).length;
            const heading = (
              <>
                Module {m.id} · {m.title}
                {m.weight ? <span className="ml-1 font-normal normal-case">({m.weight}%)</span> : null}
              </>
            );
            return (
              <li key={m.id}>
                {/* Phones: a toggle per module. Desktop: every module stays open, so a plain label. */}
                <button
                  type="button"
                  onClick={() => setToggled((t) => ({ ...t, [m.id]: !expanded }))}
                  aria-expanded={expanded}
                  aria-controls={listId}
                  className="flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted hover:bg-background lg:hidden"
                >
                  <span aria-hidden className={`mt-px w-3 shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}>
                    ▸
                  </span>
                  <span className="flex-1">{heading}</span>
                  <span className="shrink-0 font-normal normal-case tabular-nums">
                    {modulePassed}/{m.lessons.length}
                  </span>
                </button>
                <div className="hidden px-2 text-xs font-semibold uppercase tracking-wide text-muted lg:block">{heading}</div>
                <ol id={listId} className={`${expanded ? "block" : "hidden"} mt-1.5 max-lg:mb-3 lg:block`}>
                  {m.lessons.map((l) => {
                    const href = `/lessons/${l.id}`;
                    const active = pathname === href;
                    const lp = progress[l.id];
                    const isBuilt = built.has(l.id);
                    return (
                      <li key={l.id}>
                        <Link
                          href={href}
                          ref={active ? activeRef : undefined}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`flex gap-2 rounded-md px-2 py-1.5 text-sm ${
                            active ? "bg-accent-soft font-medium text-foreground" : "hover:bg-background"
                          } ${isBuilt ? "" : "text-muted"}`}
                        >
                          <span className="w-4 shrink-0 text-center">
                            {lp?.passed ? (
                              <span className="text-success" title={`Passed · best ${lp.bestScore}`}>
                                ✓<span className="sr-only">Passed</span>
                              </span>
                            ) : lp ? (
                              <span className="text-accent" title={`Attempted · best ${lp.bestScore}, not passed yet`}>
                                ○<span className="sr-only">Attempted, not passed yet</span>
                              </span>
                            ) : (
                              <span className="text-muted" aria-hidden>
                                ·
                              </span>
                            )}
                          </span>
                          <span className="w-7 shrink-0 tabular-nums text-muted">{l.id.replace("-", ".")}</span>
                          <span>{l.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

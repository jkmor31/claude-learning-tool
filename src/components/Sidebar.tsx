"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { modules } from "@/content/curriculum";
import { useProgress } from "@/lib/progress";

export function Sidebar({ builtIds }: { builtIds: string[] }) {
  // The static export uses trailing slashes (/lessons/1-4/), so strip it before comparing.
  const pathname = usePathname().replace(/\/$/, "");
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const built = new Set(builtIds);
  const passedCount = Object.values(progress).filter((p) => p.passed).length;
  const total = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <>
      <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <Link href="/" className="font-semibold">CCAR-F Prep</Link>
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border px-3 py-1 text-sm"
          aria-expanded={open}
        >
          {open ? "Close" : "Lessons"}
        </button>
      </div>

      <nav
        aria-label="Lessons"
        className={`${open ? "block" : "hidden"} border-b border-border bg-surface lg:sticky lg:top-0 lg:block lg:h-screen lg:w-80 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r`}
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
        <ol className="space-y-5 px-3 py-5">
          {modules.map((m) => (
            <li key={m.id}>
              <div className="px-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Module {m.id} · {m.title}
                {m.weight ? <span className="ml-1 font-normal normal-case">({m.weight}%)</span> : null}
              </div>
              <ol className="mt-1.5">
                {m.lessons.map((l) => {
                  const href = `/lessons/${l.id}`;
                  const active = pathname === href;
                  const lp = progress[l.id];
                  const isBuilt = built.has(l.id);
                  return (
                    <li key={l.id}>
                      <Link
                        href={href}
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
          ))}
        </ol>
      </nav>
    </>
  );
}

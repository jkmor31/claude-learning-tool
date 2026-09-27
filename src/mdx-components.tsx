import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

const calloutStyles = {
  note: { label: "Note", className: "border-border bg-surface" },
  exam: { label: "Exam lens", className: "border-accent bg-accent-soft" },
  warning: { label: "Anti-pattern", className: "border-danger bg-danger-soft" },
} as const;

export function Callout({ type = "note", title, children }: { type?: keyof typeof calloutStyles; title?: string; children: ReactNode }) {
  const style = calloutStyles[type];
  return (
    <aside className={`not-prose my-6 rounded-lg border-l-4 px-4 py-3 text-sm leading-relaxed ${style.className}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide">{title ?? style.label}</p>
      <div className="[&_code]:font-mono [&_code]:text-[0.85em] [&_li]:ml-4 [&_li]:list-disc [&_p+p]:mt-2">{children}</div>
    </aside>
  );
}

export function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <aside className="not-prose my-8 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">Key takeaways</p>
      <div className="[&_li]:ml-4 [&_li]:list-disc [&_li+li]:mt-1.5 [&_code]:font-mono">{children}</div>
    </aside>
  );
}

// Wraps a lesson diagram (an inline SVG component) with a caption; wide diagrams scroll inside the frame on phones.
export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-8">
      <div className="overflow-x-auto rounded-xl border border-border bg-surface p-4 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full">
        {children}
      </div>
      {caption && <figcaption className="mt-2 text-center text-sm text-muted">{caption}</figcaption>}
    </figure>
  );
}

const components: MDXComponents = { Callout, KeyTakeaways, Figure };

export function useMDXComponents(): MDXComponents {
  return components;
}

import type { BonusScenario as Bonus } from "@/content/types";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</h3>
      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BonusScenario({ bonus }: { bonus: Bonus }) {
  return (
    <section aria-labelledby="bonus-heading" className="mt-14 rounded-xl border-2 border-dashed border-accent p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">Bonus · Build it yourself</p>
      <h2 id="bonus-heading" className="mt-1 text-2xl font-semibold">{bonus.title}</h2>
      <p className="mt-3 text-sm leading-relaxed">{bonus.context}</p>
      <List title="Requirements" items={bonus.requirements} />
      <List title="You're done when" items={bonus.successCriteria} />
      {bonus.stretchGoals && <List title="Stretch goals" items={bonus.stretchGoals} />}
    </section>
  );
}

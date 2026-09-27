@AGENTS.md

# CCAR-F Prep

Study app for the Claude Certified Architect – Foundations exam (code CCAR-F). 50 lessons mapped to the official exam guide's five domains and task statements. Lessons are built one at a time.

## Adding a lesson

1. Create `src/content/lessons/<id>/lesson.mdx` (deep dive) and `src/content/lessons/<id>/quiz.ts` (exports `quiz` and `bonus`).
2. Register the id in `src/content/loaders.ts`. Unregistered ids render a "coming soon" placeholder.
3. Lesson titles and task-statement mappings live in `src/content/curriculum.ts`; don't duplicate them in the MDX (the page renders the title).

## Content rules

- Build in blueprint order: Module 0 → 1 → 2 → 3 → 4 → 5 → 6 capstones → 7 practice exams.
- The official exam guide lives at `reference/exam-guide.pdf` (git-ignored; never commit or quote it at length). Read the relevant task statements from it before writing a lesson; if it's missing, ask the user for it.
- Never add real exam questions or anything a user saw in the actual exam (covered by the exam NDA).
- Ground every lesson in the official exam guide's "Knowledge of" / "Skills in" bullets for its task statements. Skip topics the guide lists as out of scope.
- Quiz: exactly 5 questions in the exam's scenario style (context → symptom → qualifier → options). Mix single-answer and multi-select ("Select N"); multi-select is scored all-or-nothing. Pass is 4/5.
- Spread correct answers across letter positions; never let one letter dominate a quiz. Explanations refer to options by letter, so recheck the letters after reordering choices.
- Explanations say why the correct answer is right AND why each distractor is wrong, naming the anti-pattern.
- Don't copy the guide's sample questions verbatim; write new scenarios that test the same judgment.
- Bonus builds accumulate in the learner's `ccarf-lab` repo (set up in lesson 0.1); each bonus adds to `exercises/<lesson-id>/`.
- MDX: escape `{`, `}`, and `<` in prose (use inline code). Available components: `<Callout type="note|exam|warning" title?>`, `<KeyTakeaways>`.

## Checks

`npx tsc --noEmit`, `npm run lint`, `npm run build`. For UI changes, run the app and exercise the quiz in a browser.

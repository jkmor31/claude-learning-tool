# CCAR-F Prep

A self-paced study app for the **Claude Certified Architect – Foundations** (CCAR-F) exam.

**Use it online:** https://jkmor31.github.io/claude-learning-tool/

> **Independent study aid. Not affiliated with, endorsed by, or sponsored by Anthropic.** "Claude" and "Anthropic" are trademarks of Anthropic, PBC. This app contains no actual exam content; all lessons and practice questions are original material based on the publicly available exam guide.

## What's inside

50 lessons organized to follow the exam blueprint:

| Module | Topic | Exam weight |
|---|---|---|
| 0 | Exam Orientation | — |
| 1 | Agentic Architecture & Orchestration | 27% |
| 2 | Tool Design & MCP Integration | 18% |
| 3 | Claude Code Configuration & Workflows | 20% |
| 4 | Prompt Engineering & Structured Output | 20% |
| 5 | Context Management & Reliability | 15% |
| 6 | Scenario Capstones (one per exam scenario) | — |
| 7 | Exam Readiness (mixed practice, anti-pattern drills) | — |

Each lesson has three parts:

1. **Deep dive** on one or two exam task statements.
2. **5-question knowledge check** in the exam's scenario style, mixing single-answer and multi-select questions. Pass with 4/5.
3. **Bonus build**: a hands-on exercise you complete in your own lab repo.

Lessons are being written one at a time. Lessons that aren't written yet show a placeholder.

Your progress is saved in your browser's local storage. Nothing is sent to a server, and progress doesn't sync between browsers or devices.

## Running it locally

Requires [Node.js](https://nodejs.org) 20.9 or newer.

```bash
git clone https://github.com/jkmor31/claude-learning-tool.git
cd claude-learning-tool
npm install
npm run dev
```

Then open http://localhost:3000.

To preview the production build, run `npm run build` then `npm start`. The build is a fully static site written to `out/`.

## Deployment

Every push to `main` builds the static site and publishes it to GitHub Pages via `.github/workflows/deploy.yml`. The workflow sets `PAGES_BASE_PATH` so the site works under `/claude-learning-tool/`.

The app is a static export, so server-only Next.js features (route handlers, server actions, middleware, cookies, image optimization) aren't available.

## Official exam resources

Get the official exam guide, registration, and exam policies from the Anthropic Partner Academy. Always treat the official guide as the authoritative reference; this app may lag behind changes to the exam.

If you're contributing lessons, put your own copy of the guide in `reference/` (git-ignored, so it's never committed or redistributed).

## Project structure

```
src/
  app/                 routes: home page and /lessons/[id]
  components/          sidebar, quiz engine, bonus build card
  content/
    curriculum.ts      all 50 lessons, their modules and task statements
    loaders.ts         registry of written lessons
    lessons/<id>/      lesson.mdx (deep dive) + quiz.ts (quiz and bonus build)
  lib/progress.ts      local-storage progress tracking
```

See `CLAUDE.md` for lesson-writing conventions.

## License

[MIT](LICENSE). The license covers this repository's code and original lesson content. It doesn't grant any rights to Anthropic's trademarks or to the official exam guide.

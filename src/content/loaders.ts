import type { LessonContent } from "./types";

type Loader = () => Promise<LessonContent>;

// Register each lesson here once its folder is written; unregistered lessons render as "coming soon".
export const lessonLoaders: Record<string, Loader> = {
  "0-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/0-1/lesson.mdx"),
      import("./lessons/0-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-1/lesson.mdx"),
      import("./lessons/1-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-2": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-2/lesson.mdx"),
      import("./lessons/1-2/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-3": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-3/lesson.mdx"),
      import("./lessons/1-3/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-4": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-4/lesson.mdx"),
      import("./lessons/1-4/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-5": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-5/lesson.mdx"),
      import("./lessons/1-5/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-6": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-6/lesson.mdx"),
      import("./lessons/1-6/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-7": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-7/lesson.mdx"),
      import("./lessons/1-7/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-8": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-8/lesson.mdx"),
      import("./lessons/1-8/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "1-9": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/1-9/lesson.mdx"),
      import("./lessons/1-9/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-1/lesson.mdx"),
      import("./lessons/2-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-2": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-2/lesson.mdx"),
      import("./lessons/2-2/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-3": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-3/lesson.mdx"),
      import("./lessons/2-3/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-4": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-4/lesson.mdx"),
      import("./lessons/2-4/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-5": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-5/lesson.mdx"),
      import("./lessons/2-5/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-6": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-6/lesson.mdx"),
      import("./lessons/2-6/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "2-7": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/2-7/lesson.mdx"),
      import("./lessons/2-7/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-1/lesson.mdx"),
      import("./lessons/3-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-2": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-2/lesson.mdx"),
      import("./lessons/3-2/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-3": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-3/lesson.mdx"),
      import("./lessons/3-3/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-4": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-4/lesson.mdx"),
      import("./lessons/3-4/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-5": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-5/lesson.mdx"),
      import("./lessons/3-5/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-6": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-6/lesson.mdx"),
      import("./lessons/3-6/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-7": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-7/lesson.mdx"),
      import("./lessons/3-7/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-8": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-8/lesson.mdx"),
      import("./lessons/3-8/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "3-9": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/3-9/lesson.mdx"),
      import("./lessons/3-9/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-1/lesson.mdx"),
      import("./lessons/4-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-2": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-2/lesson.mdx"),
      import("./lessons/4-2/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-3": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-3/lesson.mdx"),
      import("./lessons/4-3/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-4": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-4/lesson.mdx"),
      import("./lessons/4-4/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-5": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-5/lesson.mdx"),
      import("./lessons/4-5/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-6": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-6/lesson.mdx"),
      import("./lessons/4-6/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-7": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-7/lesson.mdx"),
      import("./lessons/4-7/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "4-8": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/4-8/lesson.mdx"),
      import("./lessons/4-8/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-1": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-1/lesson.mdx"),
      import("./lessons/5-1/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-2": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-2/lesson.mdx"),
      import("./lessons/5-2/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-3": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-3/lesson.mdx"),
      import("./lessons/5-3/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-4": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-4/lesson.mdx"),
      import("./lessons/5-4/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-5": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-5/lesson.mdx"),
      import("./lessons/5-5/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-6": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-6/lesson.mdx"),
      import("./lessons/5-6/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
  "5-7": async () => {
    const [{ default: Body }, { quiz, bonus }] = await Promise.all([
      import("./lessons/5-7/lesson.mdx"),
      import("./lessons/5-7/quiz"),
    ]);
    return { Body, quiz, bonus };
  },
};

export const builtLessonIds = new Set(Object.keys(lessonLoaders));

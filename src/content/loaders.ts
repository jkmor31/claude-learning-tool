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
};

export const builtLessonIds = new Set(Object.keys(lessonLoaders));

import type { ComponentType } from "react";

export type QuestionType = "single" | "multi";

export interface QuizQuestion {
  type: QuestionType;
  /** Optional production context shown above the question, mirroring the exam's scenario framing. */
  scenario?: string;
  prompt: string;
  choices: string[];
  /** Indexes into `choices`. Single-answer questions have exactly one. */
  correct: number[];
  explanation: string;
}

export interface BonusScenario {
  title: string;
  context: string;
  requirements: string[];
  successCriteria: string[];
  stretchGoals?: string[];
}

export interface LessonContent {
  Body: ComponentType;
  quiz: QuizQuestion[];
  bonus: BonusScenario;
}

export interface LessonMeta {
  id: string;
  title: string;
  /** Exam task statements this lesson covers, e.g. ["1.2"]. */
  taskStatements: string[];
}

export interface Module {
  id: number;
  title: string;
  /** Exam domain weight as a percentage, when the module maps to a domain. */
  weight?: number;
  summary: string;
  lessons: LessonMeta[];
}

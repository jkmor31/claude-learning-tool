"use client";

import { useSyncExternalStore } from "react";

export interface LessonProgress {
  passed: boolean;
  bestScore: number;
}

export type ProgressMap = Record<string, LessonProgress>;

// A tiny localStorage-backed store shared by every component that reads it, and kept in sync across tabs.
function createStore<T>(key: string, empty: T) {
  const listeners = new Set<() => void>();
  let cache: T | null = null;

  function read(): T {
    if (cache !== null) return cache;
    try {
      const raw = window.localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : empty;
    } catch {
      cache = empty;
    }
    return cache;
  }

  function write(next: T) {
    cache = next;
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode, blocked site data): keep the value in memory for this visit.
    }
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        cache = null;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, read, () => empty);
  }

  return { read, write, useValue };
}

const EMPTY: ProgressMap = {};
const progressStore = createStore<ProgressMap>("ccarf-progress-v1", EMPTY);
const lastLessonStore = createStore<string | null>("ccarf-last-lesson-v1", null);

export const useProgress = progressStore.useValue;
export const useLastLesson = lastLessonStore.useValue;

export function recordQuizResult(lessonId: string, score: number, passed: boolean) {
  const current = progressStore.read();
  const prev = current[lessonId];
  progressStore.write({
    ...current,
    [lessonId]: {
      passed: passed || (prev?.passed ?? false),
      bestScore: Math.max(score, prev?.bestScore ?? 0),
    },
  });
}

export function recordVisit(lessonId: string) {
  if (lastLessonStore.read() !== lessonId) lastLessonStore.write(lessonId);
}

export function resetProgress() {
  progressStore.write({});
  lastLessonStore.write(null);
}

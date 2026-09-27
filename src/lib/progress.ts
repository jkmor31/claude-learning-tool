"use client";

import { useSyncExternalStore } from "react";

export interface LessonProgress {
  passed: boolean;
  bestScore: number;
}

export type ProgressMap = Record<string, LessonProgress>;

const STORAGE_KEY = "ccarf-progress-v1";
const EMPTY: ProgressMap = {};
const listeners = new Set<() => void>();
let cache: ProgressMap | null = null;

function read(): ProgressMap {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    cache = {};
  }
  return cache;
}

function write(next: ProgressMap) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode, blocked site data): keep progress in memory for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
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

export function useProgress(): ProgressMap {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

export function recordQuizResult(lessonId: string, score: number, passed: boolean) {
  const current = read();
  const prev = current[lessonId];
  write({
    ...current,
    [lessonId]: {
      passed: passed || (prev?.passed ?? false),
      bestScore: Math.max(score, prev?.bestScore ?? 0),
    },
  });
}

export function resetProgress() {
  write({});
}

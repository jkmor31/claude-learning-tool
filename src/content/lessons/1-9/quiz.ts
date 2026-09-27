import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Yesterday you started a long Claude Code investigation with claude -n payments-audit. Since then you've opened several other, unrelated sessions in the same directory. Now you want to continue the payments investigation with its full prior context.",
    prompt: "Which command should you run?",
    choices: [
      "claude --continue payments-audit",
      "claude --session payments-audit",
      "claude --resume payments-audit",
      "claude -p \"resume payments-audit\"",
    ],
    correct: [2],
    explanation:
      "--resume (or -r) takes a session name or ID and continues that specific conversation. --continue (A) resumes only the most recent session in the directory, which here would be one of the unrelated ones. --session (B) isn't a Claude Code flag. -p (D) runs a new non-interactive prompt and doesn't restore the named session.",
  },
  {
    type: "single",
    scenario:
      "Your resumed session previously analyzed 40 files. Overnight a teammate refactored 3 of them, renaming several functions. Now the agent's answers refer to the old function names.",
    prompt: "What is the most efficient fix?",
    choices: [
      "Start a new session and have the agent re-explore all 40 files from scratch.",
      "Tell the resumed session which 3 files changed and what changed, and ask it to re-read those before continuing.",
      "Keep going and correct the agent whenever it uses an outdated name.",
      "Fork the session so the fork gets a clean view of the code.",
    ],
    correct: [1],
    explanation:
      "Most of the prior context (37 of 40 files) is still valid, so resume and point the agent at the specific changes for targeted re-analysis (Task 1.7). Re-exploring everything (A) throws away valid work. Correcting as you go (C) leaves the stale results in play. A fork (D) copies the same stale history into a new session, so it gets no cleaner view.",
  },
  {
    type: "single",
    scenario:
      "A week after a deep analysis session, a large refactor landed that touched most of the files the agent analyzed. When you resume, the agent contradicts itself, cites code that no longer exists, and mixes old and new versions of the same functions.",
    prompt: "What is the most reliable way to continue?",
    choices: [
      "Resume and add an instruction to \"be careful about outdated information.\"",
      "Run /compact in the resumed session to shrink the old context.",
      "Fork the old session and continue in the fork.",
      "Start a new session with a structured summary of the conclusions that still hold, and have it re-read current files as needed.",
    ],
    correct: [3],
    explanation:
      "When most prior tool results are stale, the guide says starting fresh with a structured summary is more reliable than resuming. The summary keeps durable conclusions and drops outdated evidence. \"Be careful\" (A) leaves the stale results in the history. /compact (B) condenses the context but still builds on the outdated material. A fork (C) copies the same stale history.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about fork_session are correct?",
    choices: [
      "Forking resets the context, so the new session starts empty.",
      "A fork is a new session that starts with a copy of the original's history. The original session stays unchanged.",
      "Results from a fork are automatically merged back into the original session.",
      "Forks branch the conversation, not the filesystem. File edits made in one fork are visible to others working in the same directory.",
      "You have to re-run the original analysis inside each fork before exploring from it.",
    ],
    correct: [1, 3],
    explanation:
      "A fork copies the original history into a new, independent session and leaves the original untouched (B). Only the conversation is branched, not the working directory (D), so forks that edit files need separate working copies. Forks don't start empty (A), don't merge back automatically (C), and don't need the analysis re-run (E). Reusing that shared analysis is the whole point of forking.",
  },
  {
    type: "multi",
    prompt: "In which TWO situations is resuming the prior session better than starting fresh with a summary?",
    choices: [
      "Very little of the analyzed code has changed since the last session.",
      "Nearly every analyzed file has been rewritten by a large refactor.",
      "The resumed session has already started giving inconsistent answers that mix old and new code.",
      "A few files changed, and you can tell the agent exactly which ones and what changed.",
      "You're switching to a completely unrelated task in a different part of the codebase.",
    ],
    correct: [0, 3],
    explanation:
      "Resume when prior context is mostly valid (A), including when you can name the few changed files for targeted re-analysis (D). Widespread rewrites (B) and a session already contradicting itself (C) are the signs to start fresh with a structured summary. An unrelated task (E) doesn't benefit from the old context, so a new session is cleaner.",
  },
];

export const bonus: BonusScenario = {
  title: "Resume, re-sync, fork, and restart a real investigation",
  context:
    "Practice each session strategy on your own ccarf-lab repository, which by now has several exercises worth analyzing. Use the Claude Code CLI for the named-session steps and the Agent SDK for forking. Keep notes in ccarf-lab/exercises/1-9/notes.md.",
  requirements: [
    "Start a named session (claude -n lab-map) and ask Claude to map the repo: each exercise's purpose, shared utilities, and duplicated code. End the session.",
    "In a new terminal later, resume it with claude --resume lab-map and ask a follow-up that depends on the earlier analysis. Confirm it answers without re-reading everything.",
    "Change two files meaningfully (rename a shared helper, change a function's return type). Resume again without mentioning the changes, and ask a question that touches them. Record whether the answer is stale.",
    "Resume once more, this time listing exactly which files changed and how. Ask the same question and compare.",
    "Write a structured summary of the lab-map findings (goal, established facts, ruled out, open questions, files to re-read). Start a brand-new session with only that summary and compare its answers with the resumed session's.",
    "In the Agent SDK, capture the session ID of an analysis run and fork it twice with fork_session=True: one fork plans a shared utilities package, the other plans leaving each exercise self-contained. Run each fork in its own git worktree if it will edit files.",
  ],
  successCriteria: [
    "Your notes show the stale answer from the unannounced-change run and the corrected answer after you listed the changes.",
    "The fresh-with-summary session answers correctly without the contradictions of stale context, or your notes explain where the summary fell short and how you'd improve it.",
    "The two forks have different session IDs, the original session still resumes with its own history, and neither fork's file edits leaked into the other's worktree.",
  ],
  stretchGoals: [
    "Script the change-reporting step: generate the \"files changed since the last session\" message from git diff --stat against the commit you recorded when the session ended.",
    "Turn your structured-summary format into a reusable template in notes/, and use it at the end of every long session for a week.",
  ],
};

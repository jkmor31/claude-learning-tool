import type { LessonMeta, Module } from "./types";

export const PASS_THRESHOLD = 4;

export const modules: Module[] = [
  {
    id: 0,
    title: "Exam Orientation",
    summary: "How the CCAR-F exam is built, scored, and how to study for it.",
    lessons: [
      { id: "0-1", title: "Exam Blueprint, Scenarios, Scoring & Study Strategy", taskStatements: [] },
    ],
  },
  {
    id: 1,
    title: "Agentic Architecture & Orchestration",
    weight: 27,
    summary: "Agentic loops, coordinator-subagent systems, hooks, decomposition, and sessions.",
    lessons: [
      { id: "1-1", title: "The Agentic Loop: stop_reason, Tool Results & Termination", taskStatements: ["1.1"] },
      { id: "1-2", title: "Coordinator-Subagent Architecture: Hub-and-Spoke Fundamentals", taskStatements: ["1.2"] },
      { id: "1-3", title: "Dynamic Subagent Selection, Partitioning & Iterative Refinement", taskStatements: ["1.2"] },
      { id: "1-4", title: "Spawning Subagents: the Task Tool & AgentDefinition", taskStatements: ["1.3"] },
      { id: "1-5", title: "Context Passing & Parallel Subagent Spawning", taskStatements: ["1.3"] },
      { id: "1-6", title: "Multi-Step Workflow Enforcement & Escalation Handoffs", taskStatements: ["1.4"] },
      { id: "1-7", title: "Agent SDK Hooks: Tool Call Interception & Data Normalization", taskStatements: ["1.5"] },
      { id: "1-8", title: "Task Decomposition: Prompt Chaining vs Dynamic Decomposition", taskStatements: ["1.6"] },
      { id: "1-9", title: "Session Management: Resumption, Forking & Fresh Starts", taskStatements: ["1.7"] },
    ],
  },
  {
    id: 2,
    title: "Tool Design & MCP Integration",
    weight: 18,
    summary: "Tool descriptions, structured errors, tool distribution, MCP configuration, built-in tools.",
    lessons: [
      { id: "2-1", title: "Designing Effective Tool Interfaces & Boundaries", taskStatements: ["2.1"] },
      { id: "2-2", title: "Structured Error Responses for MCP Tools", taskStatements: ["2.2"] },
      { id: "2-3", title: "Scoped Tool Access & the Principle of Least Privilege", taskStatements: ["2.3"] },
      { id: "2-4", title: "Configuring tool_choice: auto, any & Forced Selection", taskStatements: ["2.3"] },
      { id: "2-5", title: "MCP Server Scoping & Credential Configuration", taskStatements: ["2.4"] },
      { id: "2-6", title: "MCP Resources & Build-vs-Buy Decisions", taskStatements: ["2.4"] },
      { id: "2-7", title: "Built-in Tools: Read, Write, Edit, Bash, Grep & Glob", taskStatements: ["2.5"] },
    ],
  },
  {
    id: 3,
    title: "Claude Code Configuration & Workflows",
    weight: 20,
    summary: "CLAUDE.md, rules, commands, skills, plan mode, iterative refinement, and CI/CD.",
    lessons: [
      { id: "3-1", title: "CLAUDE.md Configuration Hierarchy & Diagnosing Issues", taskStatements: ["3.1"] },
      { id: "3-2", title: "Modular CLAUDE.md: @import and .claude/rules/", taskStatements: ["3.1"] },
      { id: "3-3", title: "Custom Slash Commands: Project vs User Scope", taskStatements: ["3.2"] },
      { id: "3-4", title: "Skills & SKILL.md Frontmatter", taskStatements: ["3.2"] },
      { id: "3-5", title: "Path-Specific Rules for Conditional Convention Loading", taskStatements: ["3.3"] },
      { id: "3-6", title: "Plan Mode vs Direct Execution", taskStatements: ["3.4"] },
      { id: "3-7", title: "Iterative Refinement: Examples, TDD & the Interview Pattern", taskStatements: ["3.5"] },
      { id: "3-8", title: "Claude Code CLI for CI/CD Automation", taskStatements: ["3.6"] },
      { id: "3-9", title: "Designing High-Signal CI Review & Test-Generation Prompts", taskStatements: ["3.6"] },
    ],
  },
  {
    id: 4,
    title: "Prompt Engineering & Structured Output",
    weight: 20,
    summary: "Explicit criteria, few-shot, tool_use schemas, validation loops, batches, multi-pass review.",
    lessons: [
      { id: "4-1", title: "Explicit Criteria & Reducing False Positives", taskStatements: ["4.1"] },
      { id: "4-2", title: "Few-Shot Examples for Ambiguous-Case Judgment", taskStatements: ["4.2"] },
      { id: "4-3", title: "Few-Shot Examples for Extraction Accuracy", taskStatements: ["4.2"] },
      { id: "4-4", title: "Structured Output with tool_use", taskStatements: ["4.3"] },
      { id: "4-5", title: "JSON Schema Design: Nullable Fields, Enums & Extensibility", taskStatements: ["4.3"] },
      { id: "4-6", title: "Validation, Retry & Feedback Loops", taskStatements: ["4.4"] },
      { id: "4-7", title: "Batch Processing with the Message Batches API", taskStatements: ["4.5"] },
      { id: "4-8", title: "Multi-Instance & Multi-Pass Review Architectures", taskStatements: ["4.6"] },
    ],
  },
  {
    id: 5,
    title: "Context Management & Reliability",
    weight: 15,
    summary: "Case facts, position effects, escalation, error propagation, human review, provenance.",
    lessons: [
      { id: "5-1", title: "Extracting & Persisting Case Facts Across Long Sessions", taskStatements: ["5.1"] },
      { id: "5-2", title: "Position Effects & Trimming Verbose Tool Output", taskStatements: ["5.1"] },
      { id: "5-3", title: "Escalation Triggers & Ambiguity Resolution", taskStatements: ["5.2"] },
      { id: "5-4", title: "Error Propagation Across Multi-Agent Systems", taskStatements: ["5.3"] },
      { id: "5-5", title: "Context Management in Large Codebase Exploration", taskStatements: ["5.4"] },
      { id: "5-6", title: "Human Review Workflows & Confidence Calibration", taskStatements: ["5.5"] },
      { id: "5-7", title: "Provenance & Uncertainty in Multi-Source Synthesis", taskStatements: ["5.6"] },
    ],
  },
  {
    id: 6,
    title: "Scenario Capstones",
    summary: "One integrated build per official exam scenario, combining every domain.",
    lessons: [
      { id: "6-1", title: "Capstone: Customer Support Resolution Agent", taskStatements: [] },
      { id: "6-2", title: "Capstone: Code Generation with Claude Code", taskStatements: [] },
      { id: "6-3", title: "Capstone: Multi-Agent Research System", taskStatements: [] },
      { id: "6-4", title: "Capstone: Developer Productivity Tools", taskStatements: [] },
      { id: "6-5", title: "Capstone: Claude Code for CI/CD", taskStatements: [] },
      { id: "6-6", title: "Capstone: Structured Data Extraction", taskStatements: [] },
    ],
  },
  {
    id: 7,
    title: "Exam Readiness",
    summary: "Full-format mixed practice and cross-domain anti-pattern drills.",
    lessons: [
      { id: "7-1", title: "Mixed Practice Exam A (Domains 1, 2 & 5)", taskStatements: [] },
      { id: "7-2", title: "Mixed Practice Exam B (Domains 3 & 4)", taskStatements: [] },
      { id: "7-3", title: "Anti-Pattern Recognition Drill", taskStatements: [] },
    ],
  },
];

export const allLessons: (LessonMeta & { moduleId: number; moduleTitle: string })[] =
  modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title })));

export function getLesson(id: string) {
  const index = allLessons.findIndex((l) => l.id === id);
  if (index === -1) return undefined;
  return { lesson: allLessons[index], prev: allLessons[index - 1], next: allLessons[index + 1] };
}

import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "An analytics agent answers questions using a warehouse MCP server with tools list_tables, describe_table, and run_query. Logs show that before most answers it lists tables, describes three to six of them, and often runs a failing query against a column that doesn't exist before finding the right one. Answers are correct but slow and expensive.",
    prompt: "What is the most effective improvement?",
    choices: [
      "Expose the database schema (tables, columns, types, and relationships) as an MCP resource, so the agent can see the structure without exploratory calls.",
      "Remove list_tables and describe_table, so the agent must go straight to run_query.",
      "Add a system-prompt instruction: \"Minimize the number of tool calls you make.\"",
      "Retry failing queries automatically inside run_query until one succeeds.",
    ],
    correct: [0],
    explanation:
      "A schema is exactly the kind of content catalog the guide says to expose as a resource, giving the agent visibility into available data without exploratory calls (A). Removing the discovery tools (B) makes the agent guess column names and fail more often. A prompt instruction (C) doesn't give the agent the information it's missing. Blind retries (D) hide the problem and don't tell the agent what the right column is.",
  },
  {
    type: "multi",
    scenario:
      "Your team built an MCP tool, trace_calls, backed by a code-intelligence index. It resolves re-exports and import aliases across a large monorepo. In practice, the agent almost always uses the built-in Grep for \"who calls this function?\" questions and misses callers that import the function under an alias. trace_calls's description is \"Traces calls.\"",
    prompt: "Which TWO changes follow the guide's approach?",
    choices: [
      "Remove Grep from the agent's tools so it has no alternative.",
      "Rename trace_calls to grep_v2 so the model associates it with searching.",
      "Expand trace_calls's description to explain that it resolves aliases and re-exports across packages, and what it returns.",
      "State in the description when to prefer trace_calls over Grep (finding callers and definitions), and when Grep is still the right choice (free-text searches).",
      "Add a hook that blocks every Grep call.",
    ],
    correct: [2, 3],
    explanation:
      "The guide's fix is a detailed MCP tool description that explains capabilities and outputs (C) and draws a clear boundary with the built-in tool (D). Removing Grep (A) or blocking it with a hook (E) takes away the right tool for free-text searches. A misleading name (B) makes selection worse, because the tool isn't a text search.",
  },
  {
    type: "single",
    scenario:
      "A platform team wants their Claude Code agents to create and update Jira tickets. One engineer proposes writing a custom Jira MCP server from scratch so the team \"controls everything.\" A well-maintained MCP server for Jira already exists, and the team's only unusual requirement is a release-approval workflow that spans Jira, their deploy system, and a Slack channel.",
    prompt: "What is the best approach?",
    choices: [
      "Build the custom Jira server, since owning the code is always safer than depending on others.",
      "Skip MCP and have the agent call the Jira REST API through Bash with curl.",
      "Ask the agent to write its own Jira integration at the start of each session.",
      "Use the existing Jira server for standard ticket operations, and build a small custom server only for the team-specific release-approval workflow.",
    ],
    correct: [3],
    explanation:
      "The guide says to choose existing servers for standard integrations like Jira and reserve custom servers for team-specific workflows (D). Rebuilding Jira (A) means owning auth, pagination, and API changes to reproduce something that exists. Raw curl through Bash (B) gives up tool descriptions, structured errors, and scoped access. Regenerating an integration every session (C) is unreliable and wasteful.",
  },
  {
    type: "single",
    scenario:
      "A support agent handles questions about 2,000 open issues. The team is choosing how to give the agent awareness of what issues exist.",
    prompt: "Which design best follows the guide?",
    choices: [
      "Put the full text of all 2,000 issues into the system prompt at session start.",
      "Expose a compact issue-summary resource (ID, title, status, owner) and keep a get_issue tool for full details.",
      "Give the agent only a get_issue tool, so it fetches issues one at a time by guessing IDs.",
      "Give the agent Bash access to query the issue database directly.",
    ],
    correct: [1],
    explanation:
      "A compact catalog resource shows the agent what exists, and a tool fetches full details only for what it needs (B). Loading every issue's full text (A) wastes context and buries the relevant ones. Guessing IDs (C) forces exploratory calls, which is the problem resources solve. Raw database access (D) breaks least privilege and doesn't give the agent a map of the data.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about MCP resources and custom servers are correct?",
    choices: [
      "MCP resources can expose content catalogs such as documentation hierarchies, so an agent needs fewer exploratory tool calls.",
      "Resources replace tools entirely. A server should expose either resources or tools, never both.",
      "Custom MCP servers are preferred for standard integrations, since they can be tailored.",
      "A resource catalog should include the full content of every item so the agent never needs another call.",
      "Custom MCP servers are best reserved for team-specific workflows that existing servers don't cover.",
    ],
    correct: [0, 4],
    explanation:
      "Resources give agents visibility into available content without exploration (A), and custom servers are for team-specific workflows (E). Servers commonly offer both resources and tools: catalogs to see, tools to act or fetch details (B). Standard integrations should use existing servers (C). Catalogs should stay compact, with full content behind a tool or per-item resource (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Add a catalog resource and out-compete Grep",
  context:
    "Extend the notes MCP server from Lesson 2.5 with a resource catalog and a smarter search tool, then measure how the agent's behavior changes. Work in ccarf-lab/exercises/2-6/.",
  requirements: [
    "Grow the notes folder to at least 40 notes in nested subfolders, with a few near-duplicates and one outdated note per topic.",
    "Baseline: with only list_notes and read_note tools, ask five questions that each need a specific note. Log tool calls and total tokens per question.",
    "Add a notes://catalog resource listing each note's path, title, status (current or outdated), and a one-line summary. Rerun the five questions and compare.",
    "Add a find_related tool that follows [[wikilinks]] between notes. Give it a one-line description first, and count how often the agent uses Grep instead.",
    "Rewrite find_related's description to explain its capabilities, its output shape, and when to prefer it over Grep. Rerun and compare.",
    "In your notes, write down one standard integration you'd use an existing MCP server for, and one team-specific workflow that would justify a custom server.",
  ],
  successCriteria: [
    "The catalog cuts exploratory calls per question. Record the before and after numbers.",
    "The agent picks the current note over the outdated duplicate more often with the catalog than without it.",
    "The rewritten description measurably increases find_related usage on questions about linked notes, while Grep still gets used for free-text searches.",
  ],
  stretchGoals: [
    "Add a resource template (notes://note/{path}) and reference a note with an @ mention in Claude Code.",
    "Expose an MCP prompt, such as \"weekly review,\" and use it as a slash command.",
  ],
};

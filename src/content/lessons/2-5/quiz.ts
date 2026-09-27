import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "A tech lead set up an internal deployments MCP server last month, and it works well for them in Claude Code. Two new engineers cloned the repo this week, and Claude Code in their sessions has no deployment tools. The repository contains no .mcp.json file.",
    prompt: "What is the most likely cause and the right fix?",
    choices: [
      "The new engineers' Claude Code versions are too old. Have them upgrade.",
      "MCP tools only load after the first restart. Have them restart Claude Code twice.",
      "The server is configured in the tech lead's ~/.claude.json, which isn't shared. Move it into a project-scoped .mcp.json and commit it.",
      "Have each new engineer copy the tech lead's ~/.claude.json into their own home directory.",
    ],
    correct: [2],
    explanation:
      "User-level config in ~/.claude.json applies only to that user, so the server never reached the team. Shared team tooling belongs in the project's .mcp.json, which travels with the repo (C). Version (A) and restarts (B) don't explain a server that was never configured for them. Copying someone's ~/.claude.json (D) spreads their personal settings and servers, doesn't scale to future hires, and still leaves the repo without a shared definition.",
  },
  {
    type: "multi",
    scenario:
      "The team's committed .mcp.json configures a Jira MCP server with the header \"Authorization\": \"Bearer 8f3a...\", a real API token pasted in by the developer who set it up. The repository is about to be made public.",
    prompt: "Which TWO actions should the team take?",
    choices: [
      "Replace the literal token with an environment variable reference such as \"Bearer ${JIRA_API_TOKEN}\", with each developer setting the variable in their own environment.",
      "Move the Jira server into the setup developer's ~/.claude.json so the token is no longer in the repo.",
      "Delete the line in a new commit. Once it's gone from the latest version, it's safe.",
      "Rotate (revoke and reissue) the exposed token, since it remains in git history.",
      "Add .mcp.json to .gitignore so secrets can't be committed again.",
    ],
    correct: [0, 3],
    explanation:
      "Environment variable expansion keeps the shared server definition in the repo while each developer supplies their own credential (A). The exposed token is still in git history, so it must be rotated (D). Moving the server to one person's user config (B) hides the secret but takes the shared server away from the team. Deleting the line (C) leaves the token in history. Ignoring .mcp.json (E) removes the team's shared configuration entirely.",
  },
  {
    type: "single",
    scenario:
      "A developer wants to try a community MCP server for querying their personal notes app while they work in the team's repo. Nobody else on the team uses that app, and the developer isn't sure they'll keep the server.",
    prompt: "Where should they configure it?",
    choices: [
      "In the project's .mcp.json, so it's documented alongside the other servers.",
      "In their user-level ~/.claude.json, so it's available to them without affecting teammates.",
      "In the project's CLAUDE.md, as an instruction describing the server.",
      "In a new branch's .mcp.json that they never merge.",
    ],
    correct: [1],
    explanation:
      "Personal and experimental servers belong in user scope (B). Putting it in the project's .mcp.json (A) pushes an unrelated, unproven server onto every teammate. CLAUDE.md (C) holds instructions, not server configuration, so Claude Code wouldn't connect to anything. A never-merged branch (D) only works while that branch is checked out and is an awkward workaround for what user scope already does.",
  },
  {
    type: "single",
    scenario:
      "A project's .mcp.json configures a GitHub server and an internal code-intelligence server. Both expose a tool called search. Logs show the agent often calls the GitHub search when it needs a symbol lookup in the local monorepo, and vice versa.",
    prompt: "What explains this, and what is the best fix?",
    choices: [
      "Claude Code only connects to the first server in .mcp.json, so the second server's tool never loads.",
      "The agent chooses a server first and then a tool, so the fix is to reorder the servers in .mcp.json.",
      "MCP servers can't share tool names, so one of the servers is failing to start.",
      "Tools from all configured servers are available at the same time, and the two search tools overlap. Rewrite both descriptions to draw a clear boundary about what each searches and returns.",
    ],
    correct: [3],
    explanation:
      "Every configured server's tools are discovered at connection time and offered together, so the model is choosing between two overlapping tools with vague descriptions. Clear, contrasting descriptions fix that (D). Claude Code connects to all configured servers, not only the first (A). There is no server-first selection step, so ordering doesn't matter (B). Tools are namespaced by server (mcp__github__search vs mcp__codeintel__search), so matching tool names don't stop a server from starting (C).",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about MCP configuration in Claude Code are correct?",
    choices: [
      "Servers in ~/.claude.json are shared with teammates through version control.",
      "Environment variable expansion such as ${GITHUB_TOKEN} lets a committed .mcp.json reference credentials without containing them.",
      "An agent can use tools from only one MCP server per session.",
      "Committing API tokens to .mcp.json is acceptable in a private repository.",
      "Tools from all configured MCP servers are discovered when the agent connects and are available simultaneously.",
    ],
    correct: [1, 4],
    explanation:
      "Expansion keeps secrets out of the committed file (B), and tools from every configured server are discovered at connection time and available together (E). ~/.claude.json is user-level and isn't shared (A). Agents can use tools from many servers at once (C). A private repo still spreads a committed secret to everyone with access, forks, CI logs, and any future change in visibility (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Wire a shared MCP server and a personal one into your lab repo",
  context:
    "Give your ccarf-lab repo a team-ready MCP setup, with credentials kept out of git, plus a personal server of your own. Work in ccarf-lab/exercises/2-5/ and the lab repo's root.",
  requirements: [
    "Build or reuse a small stdio MCP server (Python or TypeScript) exposing two tools, such as list_notes and read_note over a folder of markdown notes. Have it require an API key from an environment variable and refuse to start without one.",
    "Add it to a project-scoped .mcp.json at the repo root, passing the key as ${LAB_NOTES_KEY}. Commit the file.",
    "Add a second, experimental server in user scope (claude mcp add --scope user ...) and confirm it doesn't appear in the repo's .mcp.json.",
    "Use ${VAR:-default} for one non-secret setting, such as the notes folder path.",
    "Start Claude Code in the repo and use /mcp to confirm both servers are connected and their tools are listed. Ask one question that needs a tool from each server in the same session.",
    "Write a short README section telling a teammate which environment variables to set before the shared server will work.",
  ],
  successCriteria: [
    "git grep for the real key value returns nothing, and the committed .mcp.json contains only ${...} references.",
    "Cloning the repo into a fresh folder and setting the variable is enough to get the shared server working.",
    "One Claude Code session uses tools from both servers, showing they're available simultaneously.",
    "Unsetting LAB_NOTES_KEY produces a clear startup failure, not a silent one.",
  ],
  stretchGoals: [
    "Give both servers a tool named search, observe how often the agent picks the wrong one, then fix it with contrasting descriptions.",
    "Load the same server into an Agent SDK agent via the mcpServers option, and allow only one of its tools with allowedTools.",
  ],
};

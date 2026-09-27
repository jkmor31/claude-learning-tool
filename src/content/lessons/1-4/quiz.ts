import type { BonusScenario, QuizQuestion } from "@/content/types";

export const quiz: QuizQuestion[] = [
  {
    type: "single",
    scenario:
      "Your research coordinator is configured with allowedTools: [\"WebSearch\", \"Read\"] and three well-described subagents in its agents option. In an unattended pipeline run, the logs show that the coordinator's attempts to spawn subagents never execute, and it ends up doing all the research itself.",
    prompt: "What is the most likely cause?",
    choices: [
      "The subagents' descriptions are too vague for the coordinator to choose between them.",
      "The subagents need a maxTurns value before they can be spawned.",
      "The coordinator's model isn't capable enough to delegate work.",
      "allowedTools doesn't include \"Task\", so the coordinator can't use the tool that spawns subagents.",
    ],
    correct: [3],
    explanation:
      "Subagents are spawned through the Task tool, and the guide states that a coordinator's allowedTools must include \"Task\" (\"Agent\" in current SDK versions). The logs show spawn attempts that never run, which is a permission problem, not a routing problem. Vague descriptions (A) would cause the wrong subagent to be picked, not zero spawns. maxTurns (B) is optional and limits a subagent's run. Model capability (C) doesn't explain calls that are attempted but never executed.",
  },
  {
    type: "multi",
    prompt: "Which TWO statements about AgentDefinition are correct?",
    choices: [
      "The prompt field is appended to the coordinator's system prompt.",
      "The description field tells the coordinator when to invoke this subagent.",
      "Omitting the tools field gives the subagent no tools.",
      "The tools field restricts which tools the subagent can use.",
      "A subagent defined with AgentDefinition inherits the coordinator's conversation history by default.",
    ],
    correct: [1, 3],
    explanation:
      "The description is the routing signal the coordinator uses to choose a subagent (B), and tools is a hard restriction on the subagent's tool set (D). The prompt field is the subagent's own system prompt, not an addition to the coordinator's (A). Omitting tools means the subagent inherits all available tools, not none (C). Subagents start without the coordinator's history (E).",
  },
  {
    type: "single",
    scenario:
      "Your synthesizer subagent is supposed to write summaries only from findings passed to it. Logs show it running its own web searches and occasionally editing files in the working directory. Its AgentDefinition has a description and a prompt, but no tools field.",
    prompt: "What is the cause and the fix?",
    choices: [
      "Without a tools field, it inherits every available tool. Set tools to the minimal list its role needs.",
      "Its prompt mentions verifying facts. Remove that sentence so it stops searching.",
      "The coordinator passes its own tool list to subagents. Remove WebSearch from the coordinator.",
      "Its description is too broad. Narrow it so the coordinator stops sending it research work.",
    ],
    correct: [0],
    explanation:
      "Omitting tools grants the subagent every tool available to subagents, so it can search and edit. The reliable fix is to restrict tools to what the role needs. Editing the prompt (B) is a probabilistic nudge that leaves the capability in place. The coordinator doesn't pass its tool list along (C), and removing its WebSearch would break legitimate research. The description (D) affects which tasks it receives, not which tools it can use.",
  },
  {
    type: "single",
    scenario:
      "Two subagents have the descriptions \"Analyzes content\" and \"Analyzes documents.\" The coordinator sends web search results to the document analyzer and uploaded PDFs to the content analyzer about 30% of the time.",
    prompt: "What is the most effective first step?",
    choices: [
      "Add a keyword-based routing classifier in front of the coordinator to choose the subagent.",
      "Merge the two subagents into a single general analysis subagent.",
      "Rewrite both descriptions to state what each one handles, the inputs it expects, and when to use it instead of the other.",
      "Require users to name the subagent they want in every request.",
    ],
    correct: [2],
    explanation:
      "The coordinator routes on descriptions, and these two are nearly identical, so clearer descriptions fix the root cause cheaply. A routing classifier (A) is over-engineering before trying the obvious fix. Merging (B) may be a valid redesign, but it's more work than a first step and loses specialization. Making users name subagents (D) pushes the system's job onto users.",
  },
  {
    type: "multi",
    scenario: "A coordinator spawns a subagent, which runs several tool calls and finishes.",
    prompt: "Which TWO statements are true?",
    choices: [
      "The subagent could read the coordinator's system prompt while it worked.",
      "The coordinator receives the subagent's final message as the Task tool's result.",
      "The subagent's state carries over automatically to the next time the coordinator invokes it.",
      "Every intermediate tool call and file the subagent read is appended to the coordinator's context.",
      "The subagent started without the coordinator's conversation history.",
    ],
    correct: [1, 4],
    explanation:
      "Only the subagent's final message returns to the coordinator, as the tool result (B), and the subagent starts with a fresh context that doesn't include the coordinator's history (E). It never sees the coordinator's system prompt (A). Each invocation starts fresh unless you explicitly resume the subagent's session (C). Intermediate work stays inside the subagent, which is the point of context isolation (D).",
  },
];

export const bonus: BonusScenario = {
  title: "Port your coordinator to the Agent SDK",
  context:
    "Rebuild the Lesson 1.2–1.3 research coordinator with the Claude Agent SDK, so the SDK runs the subagent loops and you configure them with AgentDefinition. Put the heat-adaptation corpus in ccarf-lab/exercises/1-4/corpus/ as individual Markdown files, so subagents can search it with built-in tools and you don't need a custom search tool yet (custom tools arrive in Module 2).",
  requirements: [
    "Define two subagents with AgentDefinition: corpus-researcher (tools: Grep, Glob, Read) and synthesizer (the most minimal tool list you can give it). Give each a specific description that says what it does, when to use it, and when not to.",
    "Put the durable role in each definition's prompt: output format and citation rules. Put the assignment and its context in the delegation, which the coordinator writes.",
    "Configure the coordinator's allowed tools to include Agent (\"Task\" on older SDK versions, and in exam terms), plus the tools the subagents use.",
    "Log every spawn from the message stream: tool_use blocks named Agent or Task, with the subagent_type and the first 200 characters of the delegation prompt. Also log which messages carry a parent_tool_use_id.",
    "Experiment 1: remove Agent from the allowed tools and rerun, then add it to disallowed tools instead and rerun. Record what the coordinator does each time. (Current SDKs treat allowed tools as an auto-approve list, so only the disallowed run is guaranteed to block delegation. See the lesson's real-world note.)",
    "Experiment 2: delete the synthesizer's tools field and rerun. Record which tools it now has and whether it uses any of them.",
    "Experiment 3: change both descriptions to \"Helps with research tasks\" and rerun three times. Record any routing mistakes, then restore the descriptions.",
  ],
  successCriteria: [
    "The normal run's log shows the researcher spawned for the research subtasks and the synthesizer spawned once with the findings in its delegation prompt.",
    "Your notes for the three experiments name the rule each one demonstrates: allowedTools needs the Task tool (the exam's rule) versus disallowedTools actually removing it (current SDK behavior), omitting tools means inheriting all tools, and descriptions drive routing.",
  ],
  stretchGoals: [
    "Define the same two subagents as Markdown files in .claude/agents/ and load them via the SDK's settings sources. Confirm that a programmatic definition with the same name takes precedence.",
    "Give the researcher a model override for a faster model and compare cost and quality against the default.",
  ],
};

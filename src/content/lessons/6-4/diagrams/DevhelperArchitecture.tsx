const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function DevhelperArchitecture() {
  return (
    <svg
      viewBox="0 0 480 512"
      role="img"
      aria-labelledby="devhelper-architecture-title devhelper-architecture-desc"
      className="w-full max-w-[480px]"
    >
      <title id="devhelper-architecture-title">devhelper reference architecture</title>
      <desc id="devhelper-architecture-desc">
        An engineer&apos;s request goes to the main agent, which has Read, Grep,
        Glob, Edit, Write, Bash and Task, plus goals, conventions and when to
        delegate. Hooks guard its tool calls: PreToolUse blocks writes outside
        the repo and destructive Bash, and PostToolUse runs the formatter after
        Edit or Write. Through Task it sends one question to a read-only
        code-mapper subagent with Read, Grep and Glob, which returns a summary.
        It also calls two MCP servers: the existing github server and a custom
        service-catalog server with a catalog resource and a find_symbol tool.
      </desc>
      <defs>
        <marker
          id="devhelper-architecture-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--muted)" />
        </marker>
      </defs>

      {/* request */}
      <rect x="160" y="16" width="160" height="40" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="240" y="41" textAnchor="middle" fontFamily={sans} fontSize="14" fill="var(--foreground)">
        Engineer&apos;s request
      </text>
      <line x1="240" y1="56" x2="240" y2="86" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#devhelper-architecture-arrow)" />

      {/* main agent */}
      <rect x="16" y="88" width="448" height="184" rx="10" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <text x="32" y="115" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Main agent (Agent SDK)
      </text>
      <text x="448" y="115" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        1.8, 3.7
      </text>
      <text x="32" y="142" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        Read Grep Glob Edit Write Bash Task
      </text>
      <text x="32" y="164" fontFamily={sans} fontSize="12" fill="var(--muted)">
        goals · conventions · when to delegate
      </text>

      {/* hooks on its tool calls */}
      <rect x="32" y="180" width="416" height="76" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="48" y="201" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--muted)">
        Hooks on its tool calls
      </text>
      <text x="432" y="201" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        1.7
      </text>
      <text x="48" y="223" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        PreToolUse
      </text>
      <text x="152" y="223" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        block writes outside repo, destructive Bash
      </text>
      <text x="48" y="243" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        PostToolUse
      </text>
      <text x="152" y="243" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        run formatter after Edit / Write
      </text>

      {/* Task down, summary up */}
      <line x1="104" y1="272" x2="104" y2="318" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#devhelper-architecture-arrow)" />
      <text x="96" y="300" textAnchor="end" fontFamily={mono} fontSize="12" fill="var(--muted)">
        Task
      </text>
      <line x1="144" y1="320" x2="144" y2="274" stroke="var(--muted)" strokeWidth="1.5" markerEnd="url(#devhelper-architecture-arrow)" />
      <text x="152" y="300" fontFamily={sans} fontSize="12" fill="var(--muted)">
        summary
      </text>

      {/* MCP calls */}
      <line x1="352" y1="272" x2="352" y2="318" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#devhelper-architecture-arrow)" />
      <text x="360" y="300" fontFamily={sans} fontSize="12" fill="var(--muted)">
        MCP tools
      </text>

      {/* code-mapper subagent */}
      <rect x="16" y="320" width="208" height="176" rx="8" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="120" y="364" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        code-mapper subagent
      </text>
      <text x="120" y="392" textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--foreground)">
        Read Grep Glob
      </text>
      <text x="120" y="418" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        read-only · 1.4, 2.3
      </text>
      <text x="120" y="446" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        one question in,
      </text>
      <text x="120" y="464" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        a summary out · 5.5
      </text>

      {/* MCP servers */}
      <rect x="240" y="320" width="224" height="176" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="256" y="343" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        MCP servers
      </text>
      <text x="448" y="343" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        2.6
      </text>

      <rect x="256" y="356" width="192" height="40" rx="6" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="272" y="381" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        github
      </text>
      <text x="436" y="381" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        existing
      </text>

      <rect x="256" y="408" width="192" height="72" rx="6" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="272" y="429" fontFamily={mono} fontSize="12" fill="var(--foreground)">
        service-catalog
      </text>
      <text x="436" y="429" textAnchor="end" fontFamily={sans} fontSize="12" fill="var(--muted)">
        custom
      </text>
      <text x="272" y="450" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        resource: catalog
      </text>
      <text x="272" y="469" fontFamily={sans} fontSize="12" fill="var(--foreground)">
        tool: <tspan fontFamily={mono}>find_symbol</tspan>
      </text>
    </svg>
  );
}

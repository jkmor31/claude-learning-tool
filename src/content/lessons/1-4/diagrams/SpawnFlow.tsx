const sans = "var(--font-geist-sans), sans-serif";
const mono = "var(--font-geist-mono), monospace";

export function SpawnFlow() {
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-labelledby="spawn-flow-title spawn-flow-desc"
      className="w-full max-w-[480px]"
    >
      <title id="spawn-flow-title">How a subagent is spawned</title>
      <desc id="spawn-flow-desc">
        The coordinator emits a tool_use block for the Agent (Task) tool with a
        subagent_type and a delegation prompt. The subagent runs its own
        agentic loop in a separate conversation. Its tool calls and the files
        it reads are not returned. Only its final message comes back to the
        coordinator as the tool_result.
      </desc>
      <defs>
        <marker
          id="spawn-flow-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      {/* panels */}
      <rect x="16" y="16" width="168" height="288" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="100" y="44" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Coordinator
      </text>
      <rect x="296" y="16" width="168" height="288" rx="10" fill="var(--background)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="380" y="44" textAnchor="middle" fontFamily={sans} fontSize="15" fontWeight="700" fill="var(--foreground)">
        Subagent
      </text>

      {/* coordinator: the spawn call */}
      <rect x="28" y="64" width="144" height="96" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="100" y="88" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        tool_use
      </text>
      <text x="100" y="108" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        Agent / Task
      </text>
      <text x="100" y="128" textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--muted)">
        subagent_type
      </text>
      <text x="100" y="148" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        delegation prompt
      </text>

      {/* coordinator: the result */}
      <rect x="28" y="216" width="144" height="72" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="100" y="248" textAnchor="middle" fontFamily={mono} fontSize="13" fontWeight="600" fill="var(--foreground)">
        tool_result
      </text>
      <text x="100" y="268" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        loop continues
      </text>

      {/* subagent: its own loop */}
      <rect x="308" y="64" width="144" height="72" rx="8" fill="var(--surface)" stroke="var(--border)" strokeWidth="1.5" />
      <text x="380" y="94" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Own agentic loop
      </text>
      <text x="380" y="116" textAnchor="middle" fontFamily={sans} fontSize="12" fill="var(--muted)">
        tool calls · file reads
      </text>
      <line x1="380" y1="136" x2="380" y2="214" stroke="var(--accent)" strokeWidth="1.5" markerEnd="url(#spawn-flow-arrow)" />
      <text x="388" y="180" fontFamily={sans} fontSize="12" fill="var(--muted)">
        finishes
      </text>

      {/* subagent: final message */}
      <rect x="308" y="216" width="144" height="72" rx="8" fill="var(--success-soft)" stroke="var(--success)" strokeWidth="1.5" />
      <text x="380" y="256" textAnchor="middle" fontFamily={sans} fontSize="14" fontWeight="600" fill="var(--foreground)">
        Final message
      </text>

      {/* spawn */}
      <line x1="172" y1="84" x2="306" y2="84" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#spawn-flow-arrow)" />
      <text x="240" y="76" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--accent)">
        spawn
      </text>

      {/* intermediate steps are not returned */}
      <line x1="308" y1="120" x2="172" y2="120" stroke="var(--danger)" strokeWidth="1.75" strokeDasharray="5 4" />
      <circle cx="240" cy="120" r="9" fill="var(--surface)" stroke="var(--danger)" strokeWidth="1.75" />
      <path d="M236 116 L244 124 M244 116 L236 124" stroke="var(--danger)" strokeWidth="2" strokeLinecap="round" />
      <text x="240" y="148" textAnchor="middle" fontFamily={sans} fontSize="12" fontWeight="600" fill="var(--danger)">
        not returned
      </text>

      {/* result */}
      <line x1="308" y1="252" x2="174" y2="252" stroke="var(--accent)" strokeWidth="2" markerEnd="url(#spawn-flow-arrow)" />
      <text x="240" y="244" textAnchor="middle" fontFamily={sans} fontSize="13" fontWeight="600" fill="var(--accent)">
        returns
      </text>
    </svg>
  );
}

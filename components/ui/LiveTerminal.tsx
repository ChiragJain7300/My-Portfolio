"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  IconTerminal2,
  IconCopy,
  IconCheck,
  IconCornerDownLeft,
  IconSparkles,
  IconTopologyStarRing3,
  IconActivity,
  IconLayersLinked,
  IconServer,
  IconCpu,
  IconDatabase,
} from "@tabler/icons-react";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

type TerminalTab = "terminal" | "architecture" | "telemetry";

export const LiveTerminal = () => {
  const [activeTab, setActiveTab] = useState<TerminalTab>("terminal");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string>("llm");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "chirag.status()",
      output: (
        <div className="text-xs space-y-1 font-mono text-zinc-300">
          <p className="text-emerald-400">✓ System initialized: Ready for new opportunities</p>
          <p>
            <span className="text-zinc-500">role:</span> Full Stack Developer & AI Automation Engineer
          </p>
          <p>
            <span className="text-zinc-500">focus:</span> Next.js · TypeScript · LLM Pipelines · n8n
          </p>
          <p>
            <span className="text-zinc-500">location:</span> India (Open to Remote Worldwide)
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeTab === "terminal" && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history, activeTab]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="text-xs space-y-1 font-mono text-zinc-300">
            <p className="text-cyan-400 font-semibold">Available commands:</p>
            <p><span className="text-amber-300">stack</span> : View technical proficiencies</p>
            <p><span className="text-amber-300">experience</span> : Current and past engineering roles</p>
            <p><span className="text-amber-300">contact</span> : Get in touch details</p>
            <p><span className="text-amber-300">clear</span> : Clear terminal output</p>
          </div>
        );
        break;

      case "stack":
        output = (
          <div className="text-xs space-y-1.5 font-mono text-zinc-300">
            <p className="text-indigo-400 font-semibold">Technical Stack:</p>
            <p><span className="text-zinc-500">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS, Framer Motion, shadcn</p>
            <p><span className="text-zinc-500">Backend:</span> Node.js, Express, REST APIs, PostgreSQL, MongoDB, NestJS, Supabase</p>
            <p><span className="text-zinc-500">AI & Automation:</span> LLM Pipelines, OpenAI API, n8n, Make.com, Web Scraping</p>
            <p><span className="text-zinc-500">Tools:</span> Git, Docker, Vercel, Sentry, Agile Workflows</p>
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="text-xs space-y-1.5 font-mono text-zinc-300">
            <p className="text-cyan-400 font-semibold">Experience Trajectory:</p>
            <p><span className="text-emerald-400">2025 - Present:</span> Full Stack Developer @ Inventam Tech Solutions (LLM & Automation)</p>
            <p><span className="text-zinc-400">2023 - 2025:</span> Freelance Full Stack Developer (Next.js & MERN)</p>
            <p><span className="text-zinc-400">2022:</span> Associate Consultant @ Mastek / Evosys</p>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="text-xs space-y-1 font-mono text-zinc-300">
            <p className="text-emerald-400">Direct Contact:</p>
            <p>Email: <span className="text-cyan-300 underline cursor-pointer" onClick={() => copyEmail()}>chiragjain7300@gmail.com</span></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/chirag-jain-7300" target="_blank" rel="noreferrer" className="text-blue-400 underline">linkedin.com/in/chirag-jain-7300</a></p>
            <p>GitHub: <a href="https://github.com/ChiragJain7300" target="_blank" rel="noreferrer" className="text-zinc-200 underline">github.com/ChiragJain7300</a></p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        output = (
          <p className="text-xs font-mono text-rose-400">
            Command not recognized: &quot;{trimmed}&quot;. Type <span className="text-amber-300">&quot;help&quot;</span> for available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("chiragjain7300@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0c0d14]/95 border border-white/15 shadow-2xl shadow-black/90 overflow-hidden backdrop-blur-2xl flex flex-col font-mono text-xs relative group">
      {/* Top subtle radiant beam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* Terminal Title Bar & Interactive Tabs */}
      <div className="flex items-center justify-between px-3 sm:px-3.5 py-2 sm:py-2.5 bg-[#11121c] border-b border-white/10 gap-1.5 sm:gap-2 select-none">
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
          <div className="flex items-center space-x-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          
          {/* Tab Switchers */}
          <div className="flex items-center space-x-0.5 sm:space-x-1 pl-1.5 sm:pl-2 border-l border-white/10">
            <button
              onClick={() => setActiveTab("terminal")}
              className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-md text-[10.5px] sm:text-[11px] transition-colors cursor-pointer ${
                activeTab === "terminal"
                  ? "bg-white/10 text-cyan-300 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <IconTerminal2 className="w-3 h-3 shrink-0" />
              <span>CLI</span>
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-md text-[10.5px] sm:text-[11px] transition-colors cursor-pointer ${
                activeTab === "architecture"
                  ? "bg-white/10 text-indigo-300 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <IconTopologyStarRing3 className="w-3 h-3 shrink-0" />
              <span>Pipeline</span>
            </button>
            <button
              onClick={() => setActiveTab("telemetry")}
              className={`flex items-center space-x-1 px-2 sm:px-2.5 py-1 rounded-md text-[10.5px] sm:text-[11px] transition-colors cursor-pointer ${
                activeTab === "telemetry"
                  ? "bg-white/10 text-emerald-300 font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <IconActivity className="w-3 h-3 shrink-0" />
              <span>Metrics</span>
            </button>
          </div>
        </div>

        {/* Icon-Only Copy Button with Tooltip */}
        <button
          onClick={copyEmail}
          title={copied ? "Email copied to clipboard!" : "Copy email (chiragjain7300@gmail.com)"}
          aria-label="Copy email address"
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-cyan-300 transition-all active:scale-95 border border-white/10 shrink-0 cursor-pointer flex items-center justify-center"
        >
          {copied ? (
            <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <IconCopy className="w-3.5 h-3.5 text-zinc-400 hover:text-cyan-300" />
          )}
        </button>
      </div>

      {/* Tab 1: Terminal Mode */}
      {activeTab === "terminal" && (
        <>
          <div
            ref={terminalContainerRef}
            className="p-4 sm:p-5 space-y-3 min-h-[260px] max-h-[340px] sm:max-h-[370px] overflow-y-auto cursor-text scrollbar-none"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <span className="text-cyan-400 font-bold">$</span>
                  <span className="text-zinc-200 font-semibold">{item.command}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 pt-1">
              <span className="text-cyan-400 font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help', 'stack', 'contact'..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none text-xs font-mono"
              />
              <button
                type="submit"
                aria-label="Execute command"
                className="text-zinc-500 hover:text-cyan-400 transition-colors p-1"
              >
                <IconCornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Suggested Quick Commands */}
          <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between overflow-x-auto gap-2">
            <div className="flex items-center space-x-1.5 shrink-0 text-[11px] text-zinc-500">
              <IconSparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quick:</span>
            </div>
            <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              {["stack", "experience", "contact"].map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => handleCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-cyan-300 text-[10.5px] transition-colors border border-white/5"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Tab 2: Interactive Architecture Pipeline */}
      {activeTab === "architecture" && (
        <div className="p-4 space-y-4 min-h-[260px] flex flex-col justify-between">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-cyan-400 font-semibold">PRODUCTION LLM PIPELINE</span>
            <span className="text-emerald-400">● Live Flow</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              {
                id: "ingest",
                label: "1. Ingestion",
                sub: "Webhooks / APIs",
                icon: <IconServer className="w-4 h-4 text-cyan-400" />,
                details: "Automated trigger points handling structured payloads and web-scraped documents.",
              },
              {
                id: "llm",
                label: "2. LLM Engine",
                sub: "OpenAI + n8n",
                icon: <IconCpu className="w-4 h-4 text-indigo-400" />,
                details: "Prompt-engineered pipelines with schema validation and fallback retry mechanisms.",
              },
              {
                id: "sink",
                label: "3. Delivery",
                sub: "PostgreSQL / UI",
                icon: <IconDatabase className="w-4 h-4 text-emerald-400" />,
                details: "Persisted structured insights and sub-second client state hydration.",
              },
            ].map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedNode === node.id
                    ? "bg-white/10 border-cyan-400/50 shadow-md shadow-cyan-500/10"
                    : "bg-white/5 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="mb-1.5">{node.icon}</div>
                <div className="text-xs font-semibold text-white truncate">{node.label}</div>
                <div className="text-[10px] text-zinc-500 truncate">{node.sub}</div>
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] text-zinc-300 font-sans">
            <span className="font-semibold text-cyan-300 font-mono block mb-1">Architecture Node Details:</span>
            {selectedNode === "ingest" && (
              <p>Triggers via n8n webhook and custom scraping workers with input sanitization and queue buffering.</p>
            )}
            {selectedNode === "llm" && (
              <p>LLM reasoning engine producing strict JSON schemas for SEO optimization and automated classification.</p>
            )}
            {selectedNode === "sink" && (
              <p>Structured indexing into PostgreSQL with automated real-time notification dispatch and Next.js frontend UI.</p>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: System Telemetry Benchmarks */}
      {activeTab === "telemetry" && (
        <div className="p-4 space-y-4 min-h-[260px] flex flex-col justify-between">
          <div className="text-[11px] text-zinc-400 flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-emerald-400 font-semibold">PRODUCTION BENCHMARKS</span>
            <span className="text-zinc-500">Verified Metrics</span>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">API OPTIMIZATION</span>
              <span className="text-lg font-bold text-cyan-400">+35%</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Latency Reduction (Mastek)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">LIGHTHOUSE PERFORMANCE</span>
              <span className="text-lg font-bold text-emerald-400">98/100</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Core Web Vitals</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">AUTOMATION UPTIME</span>
              <span className="text-lg font-bold text-indigo-400">99.9%</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">n8n Execution Reliability</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-zinc-500 block">TYPE SAFETY</span>
              <span className="text-lg font-bold text-amber-400">100%</span>
              <span className="text-[10px] text-zinc-400 block mt-0.5">Strict TypeScript Mode</span>
            </div>
          </div>

          <div className="text-[10.5px] text-zinc-500 text-center font-mono">
            Telemetry actively monitored with Sentry & Vercel Edge
          </div>
        </div>
      )}
    </div>
  );
};

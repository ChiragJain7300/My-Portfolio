"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Minus, Maximize2, RotateCcw } from "lucide-react";
import { projects, workExperience, developerProfile } from "@/data";

interface TerminalShellProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export function TerminalShell({ isOpen, onClose }: TerminalShellProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      command: "init",
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">Chirag Jain [Interactive Shell v2.4]</p>
          <p className="text-slate-400">
            Type <span className="text-emerald-400 font-bold">help</span> to list available commands or{" "}
            <span className="text-purple-400 font-bold">cat resume.json</span> to inspect bio metadata.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let result: React.ReactNode = null;

    if (trimmed === "help") {
      result = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
          <div><span className="text-cyan-400 font-bold">projects</span> - View all featured production projects</div>
          <div><span className="text-emerald-400 font-bold">exp</span> - View work experience & timeline</div>
          <div><span className="text-purple-400 font-bold">skills</span> - Display tech stack & competencies</div>
          <div><span className="text-amber-400 font-bold">cat resume.json</span> - Print JSON profile object</div>
          <div><span className="text-sky-400 font-bold">contact</span> - Show email, GitHub & LinkedIn</div>
          <div><span className="text-slate-400 font-bold">clear</span> - Clear terminal session output</div>
        </div>
      );
    } else if (trimmed === "projects") {
      result = (
        <div className="space-y-2">
          <p className="text-slate-400">Featured Production Projects ({projects.length}):</p>
          {projects.map((p) => (
            <div key={p.id} className="border-l-2 border-cyan-500 pl-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100">{p.title}</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400">{p.categoryLabel}</span>
              </div>
              <p className="text-xs text-slate-400">{p.des}</p>
              <div className="text-xs text-emerald-400 mt-0.5">Stack: {p.tags.join(" · ")}</div>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === "exp" || trimmed === "experience") {
      result = (
        <div className="space-y-2">
          <p className="text-slate-400">Career History ({developerProfile.yearsInProd}):</p>
          {workExperience.map((exp) => (
            <div key={exp.id} className="border-l-2 border-emerald-500 pl-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">{exp.title} — {exp.company}</span>
                <span className="text-slate-500">{exp.duration}</span>
              </div>
              <p className="text-xs text-slate-400">{exp.desc}</p>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === "skills" || trimmed === "stack") {
      result = (
        <div className="space-y-1 text-slate-300">
          <p><span className="text-cyan-400 font-bold">Frontend:</span> Next.js 15/16, React 19, TypeScript, Tailwind CSS, Redux Toolkit</p>
          <p><span className="text-emerald-400 font-bold">Backend:</span> Node.js (ESM), Express.js 5, MongoDB, PostgreSQL, REST & GraphQL APIs</p>
          <p><span className="text-purple-400 font-bold">AI & Automation:</span> n8n Workflows, OpenAI Agents, LLM Pipelines, Web Scraping, Make.com</p>
          <p><span className="text-amber-400 font-bold">DevOps & Tools:</span> PM2, Docker, Sentry, Mixpanel, Git, Linux, Vercel</p>
        </div>
      );
    } else if (trimmed === "cat resume.json") {
      result = (
        <pre className="text-xs text-cyan-300 bg-[#080d18] p-2 rounded overflow-x-auto">
          {JSON.stringify(
            {
              developer: developerProfile.name,
              title: developerProfile.role,
              focus: developerProfile.primaryFocus,
              location: developerProfile.location,
              email: developerProfile.email,
              experienceYears: developerProfile.yearsInProd,
              github: developerProfile.github,
              linkedin: developerProfile.linkedin,
            },
            null,
            2
          )}
        </pre>
      );
    } else if (trimmed === "contact") {
      result = (
        <div className="space-y-1">
          <p>Email: <a href={`mailto:${developerProfile.email}`} className="text-cyan-400 hover:underline">{developerProfile.email}</a></p>
          <p>GitHub: <a href={developerProfile.github} target="_blank" rel="noreferrer" className="text-slate-300 hover:underline">{developerProfile.github}</a></p>
          <p>LinkedIn: <a href={developerProfile.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{developerProfile.linkedin}</a></p>
        </div>
      );
    } else if (trimmed === "clear") {
      setOutputs([]);
      return;
    } else {
      result = (
        <p className="text-rose-400">
          Command not found: &ldquo;{cmd}&rdquo;. Type <span className="font-bold text-slate-200">help</span> for a list of commands.
        </p>
      );
    }

    setOutputs((prev) => [...prev, { command: cmd, output: result }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Interactive Terminal Shell"
      className="fixed bottom-12 right-4 z-40 w-full max-w-xl rounded-xl border border-slate-700 bg-[#090e1a]/95 backdrop-blur-md shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-xs"
    >
      {/* Window Titlebar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0d1424] border-b border-slate-800">
        <div className="flex items-center gap-2 text-slate-300">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-200">chirag@engineering-workspace:~</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setOutputs([])}
            title="Clear Terminal Output"
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            title="Close Terminal"
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-3 max-h-72 overflow-y-auto space-y-2 leading-relaxed">
        {outputs.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="text-cyan-400">➜</span>
              <span className="text-slate-400">~</span>
              <span className="text-slate-200">{item.command}</span>
            </div>
            <div className="pl-3.5">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Prompt */}
      <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-800 bg-[#070b14]">
        <span className="text-cyan-400 font-bold">➜</span>
        <span className="text-slate-400">~</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'projects', 'exp'..."
          className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none"
        />
      </div>
    </div>
  );
}

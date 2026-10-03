"use client";

import React, { useState } from "react";
import {
  Terminal,
  Search,
  UserCheck,
  Mail,
  Copy,
  Check,
  FileCode,
  FolderGit2,
  Briefcase,
  Layers,
} from "lucide-react";
import { developerProfile } from "@/data";

interface DevToolsHeaderProps {
  onOpenCommandPalette: () => void;
  onToggleTerminal: () => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export function DevToolsHeader({
  onOpenCommandPalette,
  onToggleTerminal,
  recruiterMode,
  onToggleRecruiterMode,
  activeTab,
  onSelectTab,
}: DevToolsHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#080d18]/90 backdrop-blur-md border-b border-slate-800 select-none">
      {/* Top Application Bar */}
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between gap-4">
        {/* Left: Window controls & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block border border-rose-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block border border-amber-600/50"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-600/50"></span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <span className="text-slate-300 font-semibold">{developerProfile.name}</span>
            <span className="text-slate-600">/</span>
            <span className="hidden md:inline text-slate-400">workspace</span>
            <span className="hidden md:inline text-slate-600">/</span>
            <span className="text-cyan-400">devtools-v2.6</span>
          </div>

          <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            PROD_READY
          </span>
        </div>

        {/* Center: Search / Cmd+K Pill */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg border border-slate-700/70 bg-[#0e1628]/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-mono transition-all w-48 sm:w-64"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">Search portfolio...</span>
          </div>
          <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
            ⌘K
          </kbd>
        </button>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          {/* Recruiter View Toggle */}
          <button
            onClick={onToggleRecruiterMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              recruiterMode
                ? "bg-cyan-400 text-cyan-950 font-bold shadow-md shadow-cyan-500/20"
                : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{recruiterMode ? "Exit Recruiter View" : "Recruiter View"}</span>
          </button>

          {/* Quick Copy Email */}
          <button
            onClick={handleCopyEmail}
            title={`Copy ${developerProfile.email}`}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden md:inline">{copied ? "Copied!" : "Email"}</span>
          </button>

          {/* Terminal Toggle */}
          <button
            onClick={onToggleTerminal}
            title="Open Interactive Shell (~)"
            className="p-1.5 rounded-lg border border-slate-700/60 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
          </button>
        </div>
      </div>

      {/* Workspace Tabs (when not in recruiter mode) */}
      {!recruiterMode && (
        <div className="border-t border-slate-800/70 bg-[#0a0f1d] px-4 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-1">
            <button
              onClick={() => onSelectTab("overview")}
              className={`flex items-center gap-2 px-3 py-2 border-b-2 text-xs font-mono transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "border-cyan-400 text-cyan-300 bg-[#0e1628]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workspace.tsx</span>
            </button>

            <button
              onClick={() => onSelectTab("projects")}
              className={`flex items-center gap-2 px-3 py-2 border-b-2 text-xs font-mono transition-colors whitespace-nowrap ${
                activeTab === "projects"
                  ? "border-cyan-400 text-cyan-300 bg-[#0e1628]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Projects.workbench</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-400">4</span>
            </button>

            <button
              onClick={() => onSelectTab("experience")}
              className={`flex items-center gap-2 px-3 py-2 border-b-2 text-xs font-mono transition-colors whitespace-nowrap ${
                activeTab === "experience"
                  ? "border-cyan-400 text-cyan-300 bg-[#0e1628]"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
              <span>Experience.gitlog</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

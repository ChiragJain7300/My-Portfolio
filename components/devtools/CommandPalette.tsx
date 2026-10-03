"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  FolderGit2,
  Briefcase,
  Terminal,
  UserCheck,
  Mail,
  FileText,
  Check,
  Command,
  X,
} from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/Icons";
import { projects, workExperience, developerProfile } from "@/data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleRecruiterView: () => void;
  onToggleTerminal: () => void;
  onSelectProject?: (id: number) => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Projects" | "Social";
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onToggleRecruiterView,
  onToggleTerminal,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    {
      id: "recruiter-view",
      title: "Toggle Recruiter Quick-View Mode",
      category: "Actions",
      icon: <UserCheck className="w-4 h-4 text-cyan-400" />,
      shortcut: "R",
      perform: () => {
        onToggleRecruiterView();
        onClose();
      },
    },
    {
      id: "copy-email",
      title: copiedEmail ? "Copied Email to Clipboard!" : `Copy Email (${developerProfile.email})`,
      category: "Actions",
      icon: copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-cyan-400" />,
      shortcut: "C",
      perform: () => {
        navigator.clipboard.writeText(developerProfile.email);
        setCopiedEmail(true);
        setTimeout(() => {
          setCopiedEmail(false);
          onClose();
        }, 800);
      },
    },
    {
      id: "terminal",
      title: "Open Interactive Dev Terminal",
      category: "Actions",
      icon: <Terminal className="w-4 h-4 text-purple-400" />,
      shortcut: "~",
      perform: () => {
        onToggleTerminal();
        onClose();
      },
    },
    {
      id: "nav-projects",
      title: "Jump to Projects Workbench",
      category: "Navigation",
      icon: <FolderGit2 className="w-4 h-4 text-cyan-400" />,
      shortcut: "1",
      perform: () => {
        const el = document.getElementById("projects-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-exp",
      title: "Jump to Experience Timeline",
      category: "Navigation",
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      shortcut: "2",
      perform: () => {
        const el = document.getElementById("experience-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    ...projects.map((project) => ({
      id: `proj-${project.id}`,
      title: `Project: ${project.title} (${project.categoryLabel})`,
      category: "Projects" as const,
      icon: <FolderGit2 className="w-4 h-4 text-indigo-400" />,
      perform: () => {
        if (onSelectProject) onSelectProject(project.id);
        const el = document.getElementById("projects-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    })),
    {
      id: "social-github",
      title: "Open GitHub Profile",
      category: "Social",
      icon: <GithubIcon className="w-4 h-4 text-slate-300" />,
      perform: () => {
        window.open(developerProfile.github, "_blank");
        onClose();
      },
    },
    {
      id: "social-linkedin",
      title: "Open LinkedIn Profile",
      category: "Social",
      icon: <LinkedinIcon className="w-4 h-4 text-sky-400" />,
      perform: () => {
        window.open(developerProfile.linkedin, "_blank");
        onClose();
      },
    },
  ];

  const filtered = actions.filter((action) =>
    action.title.toLowerCase().includes(query.toLowerCase()) ||
    action.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].perform();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-slate-700/80 bg-[#0e1628] shadow-2xl shadow-cyan-950/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-[#0c1322]">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. 'project', 'email', 'recruiter')..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search input"
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono px-1.5 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-slate-500 font-mono">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={() => action.perform()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm font-sans transition-all ${
                    isSelected
                      ? "bg-cyan-500/15 text-cyan-200 border border-cyan-500/30"
                      : "text-slate-300 hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="shrink-0">{action.icon}</span>
                    <span className="truncate">{action.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {action.category}
                    </span>
                    {action.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-slate-700/60 bg-slate-800/80 text-slate-400">
                        {action.shortcut}
                      </kbd>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-slate-800/80 bg-[#090e1a] text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>Chirag Jain DevWorkspace</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data";
import { X, ExternalLink, Lock, CheckCircle2, Copy, Check } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface ArchitectureModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ArchitectureModal({ project, onClose }: ArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<"blueprint" | "json">("blueprint");
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(project, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-2xl h-full bg-[#0d0d11] border-l border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden text-zinc-100 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-white/8 flex items-start justify-between bg-zinc-950/60">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 mb-2">
              <span className="text-[#e8e4dc]">PROJ_{String(project.id).padStart(2, "0")}</span>
              <span>·</span>
              <span className="uppercase tracking-wider">{project.categoryLabel}</span>
              {project.isPrivate ? (
                <span className="flex items-center gap-1 text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded text-[10px]">
                  <Lock className="w-2.5 h-2.5" /> PROPRIETARY
                </span>
              ) : (
                <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-[10px]">
                  PUBLIC
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-sans tracking-tight text-white">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-6 md:px-8 border-b border-white/8 bg-zinc-950/40 text-xs font-mono">
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === "blueprint"
                ? "border-[#e8e4dc] text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            SYSTEM BLUEPRINT
          </button>
          <button
            onClick={() => setActiveTab("json")}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === "json"
                ? "border-[#e8e4dc] text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            RAW DATA / SCHEMA
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          {activeTab === "blueprint" ? (
            <>
              {/* Executive Overview */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  System Overview
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-zinc-300">
                  {project.des}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Production Engineering Deliverables
                </h3>
                <div className="space-y-2.5">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/6"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs md:text-sm text-zinc-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Matrix */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Architecture &amp; Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 font-mono text-xs text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-zinc-400">JSON REPRESENTATION</span>
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                {JSON.stringify(project, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 md:p-8 border-t border-white/8 bg-zinc-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.link && project.link.startsWith("http") && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-colors"
              >
                <span>OPEN LIVE SYSTEM</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.github && !project.isPrivate && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>SOURCE REPO</span>
              </a>
            )}
            {project.isPrivate && (
              <span className="font-mono text-xs text-zinc-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-zinc-500" /> Source code protected under NDA
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            ESC TO CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

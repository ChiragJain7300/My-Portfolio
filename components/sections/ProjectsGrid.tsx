"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Terminal,
  CheckCircle2,
  Layers,
  Sparkles,
  Server,
  Boxes,
  FileJson,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { projects, Project } from "@/data";

interface ProjectsGridProps {
  selectedProjectId?: number | null;
}

export function ProjectsGrid({ selectedProjectId }: ProjectsGridProps) {
  const [filter, setFilter] = useState<string>("all");
  const [inspectedProject, setInspectedProject] = useState<Project | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<"highlights" | "json">("highlights");

  const categories = [
    { id: "all", label: "All Projects", count: projects.length },
    { id: "fullstack", label: "Full Stack / SSR", count: projects.filter((p) => p.category === "fullstack").length },
    { id: "ai", label: "AI & Automation", count: projects.filter((p) => p.category === "ai").length },
    { id: "backend", label: "Backend / Logistics", count: projects.filter((p) => p.category === "backend").length },
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <section id="projects-section" className="py-12 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        {/* Section Title & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Production Engineering Workbench
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Battle-tested full-stack platforms, high-concurrency Node services, and LLM automation engines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-[#0a0f1d] border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  filter === cat.id
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] px-1 rounded bg-slate-800 text-slate-500">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-800 hover:border-slate-700 bg-[#0e1628]/90 shadow-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5"
            >
              {/* Media / Visual Header */}
              <div className="relative h-48 w-full bg-[#080d18] border-b border-slate-800 overflow-hidden flex items-center justify-center">
                {project.img ? (
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover object-top opacity-85 hover:opacity-100 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  /* Custom Graphical Representation for Backend Logistics Platform */
                  <div className="w-full h-full p-4 bg-gradient-to-br from-[#0c1424] to-[#070b14] flex flex-col justify-between font-mono text-xs">
                    <div className="flex items-center justify-between text-slate-400">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-amber-400" />
                        <span className="font-semibold text-slate-200">WDM_CATALOG_SYNC_ENGINE</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Bol.com v10 ⇄ Monday.com
                      </span>
                    </div>

                    <div className="space-y-1.5 p-2 rounded bg-[#060a12] border border-slate-800/80 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>OAuth2 Token Expiry:</span>
                        <span className="text-emerald-400">30s Pre-Refresh Buffer (Race-Free)</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Recovery Runner:</span>
                        <span className="text-cyan-400">Self-Healing CronLog (PM2)</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Catalog Parser:</span>
                        <span className="text-amber-300">Streaming Set-Difference (A \ B)</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Node.js (ESM) · Express 5 · MongoDB</span>
                      <span className="text-emerald-400">● 99.98% SYNC UPTIME</span>
                    </div>
                  </div>
                )}

                {/* Category Badge overlay */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium backdrop-blur-md bg-[#080d18]/80 text-cyan-300 border border-cyan-500/30">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.des}</p>
                </div>

                {/* Key Engineering Highlights */}
                <div className="rounded-lg border border-slate-800/80 bg-[#090f1d] p-3 space-y-1.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Technical Highlights</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 shrink-0">▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action Links */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {project.link.startsWith("http") ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Server className="w-3 h-3" />
                        <span>Private Microservice</span>
                      </span>
                    )}

                    {!project.isPrivate && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-slate-400 hover:text-white"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setInspectedProject(project);
                      setActiveInspectorTab("highlights");
                    }}
                    className="flex items-center gap-1 px-2 py-1 rounded border border-slate-700/70 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Inspector Modal */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Architecture Details for ${inspectedProject.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="w-full max-w-2xl rounded-xl border border-slate-700 bg-[#0e1628] shadow-2xl overflow-hidden font-mono text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inspector Modal Header */}
            <div className="px-4 py-3 bg-[#0c1322] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white text-sm">{inspectedProject.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  {inspectedProject.categoryLabel}
                </span>
              </div>
              <button
                onClick={() => setInspectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Inspector Tabs */}
            <div className="flex border-b border-slate-800 bg-[#090f1d] px-4 gap-2">
              <button
                onClick={() => setActiveInspectorTab("highlights")}
                className={`py-2 px-3 border-b-2 font-mono transition-colors ${
                  activeInspectorTab === "highlights"
                    ? "border-cyan-400 text-cyan-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Engineering Blueprint
              </button>
              <button
                onClick={() => setActiveInspectorTab("json")}
                className={`py-2 px-3 border-b-2 font-mono transition-colors ${
                  activeInspectorTab === "json"
                    ? "border-cyan-400 text-cyan-300"
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                Schema Inspector (.json)
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              {activeInspectorTab === "highlights" ? (
                <div className="space-y-3 font-sans text-sm">
                  <p className="text-slate-300 leading-relaxed">{inspectedProject.des}</p>

                  <div className="rounded-lg border border-slate-800 bg-[#090e1a] p-3 space-y-2">
                    <span className="text-xs font-mono font-semibold uppercase text-cyan-400 block">
                      Production Architecture & Solved Challenges:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {inspectedProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 block">Technology Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <pre className="p-3 rounded-lg bg-[#070b14] border border-slate-800 text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(inspectedProject, null, 2)}
                </pre>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-2.5 bg-[#090f1d] border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">Chirag Jain Architectural Archive</span>
              {inspectedProject.link.startsWith("http") && (
                <a
                  href={inspectedProject.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:underline font-semibold"
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

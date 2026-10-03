"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/data";
import { ArchitectureModal } from "@/components/modals/ArchitectureModal";
import { ExternalLink, Lock, ArrowUpRight, Cpu, Layers } from "lucide-react";

const metricMap: Record<number, string> = {
  1: "NextAuth OAuth integration · Dynamic MongoDB search & tag indexing · Mobile-first responsive layout",
  2: "LLM structured JSON extraction · n8n webhook pipeline · Real-time keyword GAP analysis",
  3: "Race-free DB-cached OAuth2 token manager · Self-healing CronLog · 99.98% sync uptime",
  4: "High-traffic registration spike coverage · Redux booking engine · Zero-downtime bundle versioning",
};

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
  onInspect: (project: Project) => void;
}

function ProjectCard({ project, index, totalCards, onInspect }: ProjectCardProps) {
  return (
    <article
      className="project-card relative md:sticky w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#121217] p-4 sm:p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300"
      style={{
        "--card-index": index,
        zIndex: index + 1,
      } as React.CSSProperties}
    >
      {/* Top Monospace Metadata Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/8 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="text-white/40">[</span>
          <span className="text-[#e8e4dc] font-bold">0{index + 1}</span>
          <span className="text-white/40">]</span>
          <span className="text-zinc-500">/</span>
          <span className="text-zinc-400">0{totalCards}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="uppercase tracking-wide text-xs text-zinc-300">
            {project.categoryLabel}
          </span>
          {project.isPrivate ? (
            <span className="hidden sm:flex items-center gap-1 text-xs text-amber-300/80 px-2 py-0.5">
              <Lock className="w-3 h-3" /> PROPRIETARY
            </span>
          ) : (
            <span className="hidden sm:inline text-xs text-emerald-300 px-2 py-0.5">
              PRODUCTION
            </span>
          )}
        </div>
      </div>

      {/* Main Card Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 my-5 items-center">
        {/* Left Column: Details — reordered below image on single-column */}
        <div className="order-last md:order-first md:col-span-7 space-y-3">
          <h3 className="text-lg md:text-xl lg:text-2xl font-sans font-bold tracking-tight text-white">
            {project.title}
          </h3>

          <p className="text-sm text-zinc-300 leading-relaxed max-w-xl">
            {project.des}
          </p>

          {/* Business Metric Callout Box: Flat Typographical Divider */}
          <div className="py-2.5 my-2 border-y border-white/8">
            <div className="text-xs font-mono uppercase tracking-wide text-zinc-400 mb-1 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-[#e8e4dc]" />
              <span>Core Architectural Metric</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1.5 sm:gap-x-2 sm:gap-y-1 font-mono text-xs text-zinc-200">
              {(metricMap[project.id] || project.highlights[0]).split(" · ").map((chunk, cIdx, arr) => (
                <span key={cIdx} className="inline-flex items-center gap-2">
                  <span>{chunk}</span>
                  {cIdx < arr.length - 1 && <span className="hidden sm:inline text-zinc-500">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips: Subtle inline text list */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-0.5 font-mono text-xs text-zinc-400">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <span className="text-zinc-500">/</span>
                <span className="text-zinc-300">{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: 3D flip visual — front: image, back: tech stack */}
        <div className="order-first md:order-last md:col-span-5">
          <div className="card-flip-wrapper aspect-[16/9] w-full md:max-h-[220px] rounded-xl overflow-hidden">
            <div className="card-flip-inner rounded-xl">
              {/* ── Front face ── */}
              <div className="card-face bg-[#0d0d10] rounded-xl overflow-hidden">
                {project.img ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Hover hint */}
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/30 tracking-wider">HOVER → STACK</div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center p-6 text-center">
                    <Layers className="w-8 h-8 text-white/30 mb-2" />
                    <span className="font-mono text-xs text-white/70 tracking-wider font-semibold">
                      API Orchestration Pipeline
                    </span>
                    <span className="font-mono text-xs text-zinc-400 mt-1 max-w-[36ch]">
                      Bol.com v10 ⇄ Monday.com GraphQL ⇄ Node.js Concurrency
                    </span>
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-white/30 tracking-wider">HOVER → STACK</div>
                  </div>
                )}
              </div>

              {/* ── Back face — tech stack ── */}
              <div className="card-face card-face-back bg-[#121217] border border-white/10 rounded-xl p-5 flex flex-col justify-center">
                <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-3">TECH STACK</div>
                <div className="flex flex-wrap gap-x-2 gap-y-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-[#e8e4dc] tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 font-mono text-[9px] text-zinc-600 tracking-widest uppercase">
                  {project.isPrivate ? "PROPRIETARY · CLIENT PRODUCTION" : "OPEN SOURCE · VERIFIED DEPLOYMENT"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row */}
      <div className="pt-4 border-t border-white/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <button
          onClick={() => onInspect(project)}
          className="group flex items-center gap-1.5 text-xs font-mono text-white hover:text-[#e8e4dc] transition-colors"
        >
          <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[#e8e4dc]">
            INSPECT ARCHITECTURE
          </span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        <div className="flex flex-wrap gap-3 text-xs font-mono">
          {project.link && project.link.startsWith("http") && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <span>LIVE SYSTEM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <span className="text-zinc-400">
            {project.isPrivate ? "CLIENT PRODUCTION" : "VERIFIED DEPLOYMENT"}
          </span>
        </div>
      </div>
    </article>
  );
}

export function ProjectsStack() {
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative min-h-screen px-4 md:px-8 lg:px-12"
      style={{ paddingTop: "calc(4.5rem + 1rem)" }}  // navbar height + 1rem gap
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Compact one-line section badge ── */}
        <div className="flex items-center justify-between gap-3 text-[10px] sm:text-xs font-mono mb-4 pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <span className="text-[#e8e4dc] font-bold">[01]</span>
            <h2 className="uppercase tracking-widest text-zinc-400 font-semibold">
              Featured Engineering Systems
            </h2>
          </div>
          <span className="hidden sm:inline text-zinc-600 tracking-wider">
            {projects.length} SYSTEMS · SCROLL TO STACK
          </span>
        </div>

        {/* Stacking Cards Deck */}
        <div className="relative pb-28 space-y-8 sm:space-y-12 md:space-y-20">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalCards={projects.length}
              onInspect={(p) => setInspectingProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ArchitectureModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </section>
  );
}

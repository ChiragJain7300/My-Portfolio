"use client";

import React, { useState } from "react";
import { projects, Project, developerProfile } from "@/data";
import { ArchitectureModal } from "@/components/modals/ArchitectureModal";
import { ExternalLink, Lock, CheckCircle2, ArrowUpRight, Search, FileText, X } from "lucide-react";
import { useRecruiterMode } from "@/components/providers/RecruiterModeContext";

export function RecruiterTable() {
  const { toggleRecruiterMode } = useRecruiterMode();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "ALL SYSTEMS" },
    { id: "fullstack", label: "FULL STACK / SSR" },
    { id: "ai", label: "AI / LLM AUTOMATION" },
    { id: "backend", label: "BACKEND & CONCURRENCY" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.des.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 px-4 md:px-8 lg:px-16 pt-28 pb-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Recruiter Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#111116] border border-white/10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-1">
              <span className="text-[#e8e4dc] font-bold">RECRUITER &amp; CTO EVALUATION MATRIX</span>
              <span>·</span>
              <span>DENSE DATA VIEW</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-sans text-white">
              {developerProfile.name} — Technical Competency Ledger
            </h1>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              {developerProfile.primaryFocus} · {developerProfile.yearsInProd} in production
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="mailto:chiragjain7300@gmail.com?subject=Direct%20Interview%20Request%20%E2%80%94%20Chirag%20Jain"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-all shadow-[0_0_15px_rgba(232,228,220,0.2)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>REQUEST RESUME / INTERVIEW</span>
            </a>

            <button
              onClick={toggleRecruiterMode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 font-mono text-xs text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>RETURN TO STUDIO</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                  selectedCategory === c.id
                    ? "bg-[#e8e4dc] text-zinc-950 font-semibold"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stack or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111116] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#e8e4dc]"
            />
          </div>
        </div>

        {/* Dense Table */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d11]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/8 bg-zinc-950/60 font-mono text-xs text-zinc-400">
                <th className="py-3 px-4">SYS_ID</th>
                <th className="py-3 px-4">SYSTEM / PLATFORM</th>
                <th className="py-3 px-4">SPECIALIZATION</th>
                <th className="py-3 px-4">PRIMARY STACK</th>
                <th className="py-3 px-4">DEPLOYMENT</th>
                <th className="py-3 px-4 text-right">INSPECT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/6 font-mono text-xs">
              {filteredProjects.map((proj) => (
                <tr
                  key={proj.id}
                  onClick={() => setInspectingProject(proj)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <td className="py-4 px-4 text-[#e8e4dc] font-bold">
                    PROJ_{String(proj.id).padStart(2, "0")}
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-sans font-semibold text-white group-hover:text-[#e8e4dc] transition-colors text-sm">
                      {proj.title}
                    </div>
                    <div className="font-mono text-zinc-400 text-[11px] line-clamp-1 mt-0.5">
                      {proj.highlights[0]}
                    </div>
                  </td>

                  <td className="py-4 px-4 text-zinc-300">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/6 text-[11px]">
                      {proj.categoryLabel}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {proj.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded bg-white/[0.04] text-[10px] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="text-[10px] text-zinc-400">
                          +{proj.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    {proj.isPrivate ? (
                      <span className="flex items-center gap-1 text-amber-400/80 text-[11px]">
                        <Lock className="w-3 h-3" /> CLIENT NDA
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED LIVE
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setInspectingProject(proj);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 group-hover:text-white transition-colors"
                    >
                      <span>BLUEPRINT</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Quick Contact Strip */}
        <div className="p-6 rounded-xl border border-white/8 bg-[#111116] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>
            <span>EMAIL: </span>
            <a
              href="mailto:chiragjain7300@gmail.com"
              className="text-white hover:underline ml-1"
            >
              chiragjain7300@gmail.com
            </a>
          </div>
          <div>
            <span>GITHUB: </span>
            <a
              href="https://github.com/ChiragJain7300"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline ml-1"
            >
              ChiragJain7300
            </a>
          </div>
          <div>
            <span>LINKEDIN: </span>
            <a
              href="https://www.linkedin.com/in/chirag-jain-7300"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline ml-1"
            >
              chirag-jain-7300
            </a>
          </div>
        </div>
      </div>

      {/* Architecture Modal */}
      <ArchitectureModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </div>
  );
}

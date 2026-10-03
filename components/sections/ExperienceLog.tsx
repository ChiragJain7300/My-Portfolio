"use client";

import React, { useState } from "react";
import {
  Briefcase,
  GitCommit,
  Calendar,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Code2,
} from "lucide-react";
import { workExperience } from "@/data";

export function ExperienceLog() {
  const [expandedId, setExpandedId] = useState<number | null>(4); // default expand current role

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience-section" className="py-12 border-b border-slate-800/80 bg-devtools-dots">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Production Experience & Career Log
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Chronological engineering track record across production systems, consulting, and freelance deployments.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8">
          {workExperience.slice().reverse().map((exp, index) => {
            const isCurrent = exp.duration.includes("Present");
            const isExpanded = expandedId === exp.id;

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node icon */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isCurrent
                      ? "bg-[#090f1d] border-emerald-400 text-emerald-400 shadow-md shadow-emerald-500/20"
                      : "bg-[#090f1d] border-slate-700 text-slate-500 group-hover:border-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  <GitCommit className="w-3.5 h-3.5" />
                </div>

                {/* Experience Card */}
                <div className="rounded-xl border border-slate-800 bg-[#0e1628]/85 p-5 shadow-lg space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white tracking-tight">{exp.title}</h3>
                        {isCurrent && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Current Role
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{exp.desc}</p>

                  {/* Collapsible Detailed Engineering Bullets */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block">
                        Key Responsibilities & Deliverables:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Card Bottom: Tech Stack Chips & Expand Toggle */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 font-mono text-[11px] shrink-0 self-end sm:self-auto"
                    >
                      <span>{isExpanded ? "Collapse Details" : "Expand Details"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

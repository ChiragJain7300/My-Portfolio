"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Terminal,
  Sparkles,
  Award,
  Layers,
  Code2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { developerProfile, projects, workExperience } from "@/data";

interface RecruiterViewProps {
  onExitRecruiterMode: () => void;
  onOpenProject?: (id: number) => void;
}

export function RecruiterView({ onExitRecruiterMode, onOpenProject }: RecruiterViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner with Quick Switch */}
      <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl shadow-cyan-950/20">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Recruiter Quick-View Mode</h1>
            <p className="text-xs text-slate-400">
              High-signal executive briefing designed for technical recruiters and hiring managers.
            </p>
          </div>
        </div>

        <button
          onClick={onExitRecruiterMode}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition-colors shrink-0"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Switch to DevTools Workspace</span>
        </button>
      </div>

      {/* Profile & Executive Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-[#0e1628]/80 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{developerProfile.name}</h2>
              <p className="text-cyan-400 font-medium text-sm mt-0.5">{developerProfile.role}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {developerProfile.status}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {developerProfile.bio} Experienced in architecting mission-critical integrations, high-concurrency Node.js
            services, production Next.js web applications, and autonomous multi-agent LLM systems.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0a0f1d]">
              <span className="text-xs text-slate-500 block">Experience</span>
              <span className="text-base font-bold text-white font-mono">{developerProfile.yearsInProd}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0a0f1d]">
              <span className="text-xs text-slate-500 block">Location</span>
              <span className="text-base font-bold text-white font-mono">India (Remote)</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-800/80 bg-[#0a0f1d] col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 block">Work Style</span>
              <span className="text-base font-bold text-white font-mono">Global Remote</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold text-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Email!" : "Copy Email"}</span>
            </button>
            <a
              href={`mailto:${developerProfile.email}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Send Direct Email</span>
            </a>
            <a
              href={developerProfile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={developerProfile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Skills & Core Strengths */}
        <div className="rounded-xl border border-slate-800 bg-[#0e1628]/80 p-6 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            Core Competencies
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 font-medium block mb-1">Frontend Engineering</span>
              <p className="text-slate-200 font-mono">Next.js 15/16, React 19, TypeScript, Tailwind CSS, Redux</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block mb-1">Backend & API Orchestration</span>
              <p className="text-slate-200 font-mono">Node.js, Express.js 5, MongoDB, PostgreSQL, GraphQL, REST</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block mb-1">AI Automation & LLMs</span>
              <p className="text-slate-200 font-mono">n8n, Make, OpenAI Agents, Webhook Pipelines, DataForSEO</p>
            </div>
            <div>
              <span className="text-slate-400 font-medium block mb-1">Reliability & DevOps</span>
              <p className="text-slate-200 font-mono">Sentry Telemetry, PM2, Docker, Mixpanel, Zero-Downtime Cache</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Highlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Top Production Projects
          </h3>
          <span className="text-xs text-slate-500 font-mono">4 Production Case Studies</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-800 bg-[#0e1628]/60 p-5 space-y-3 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-slate-100 text-base">{project.title}</h4>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {project.categoryLabel}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{project.des}</p>

              <div className="space-y-1">
                {project.highlights.slice(0, 2).map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                    <span className="text-cyan-400 mt-0.5">▪</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                {project.link.startsWith("http") ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium"
                  >
                    <span>Live Production</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-500">Internal Enterprise API</span>
                )}

                <button
                  onClick={() => {
                    onExitRecruiterMode();
                    if (onOpenProject) onOpenProject(project.id);
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <span>Inspect Architecture</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience History Summary */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Employment & Track Record
        </h3>

        <div className="space-y-3">
          {workExperience.map((exp) => (
            <div
              key={exp.id}
              className="rounded-xl border border-slate-800 bg-[#0e1628]/50 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-200 text-sm">{exp.title}</h4>
                  <span className="text-xs text-cyan-400 font-mono">@{exp.company}</span>
                </div>
                <p className="text-xs text-slate-400">{exp.desc}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {exp.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-xs font-mono text-slate-400 shrink-0 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                {exp.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Terminal,
  Cpu,
  UserCheck,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { developerProfile } from "@/data";

interface HeroHeaderProps {
  onToggleRecruiterMode: () => void;
  onOpenTerminal: () => void;
  onScrollToProjects: () => void;
}

export function HeroHeader({
  onToggleRecruiterMode,
  onOpenTerminal,
  onScrollToProjects,
}: HeroHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 border-b border-slate-800/80 bg-devtools-grid">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Terminal & Bio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Top Status Capsule */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>ENGINEERING WORKSPACE // v2.6.4</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">{developerProfile.yearsInProd}</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I&apos;m <span className="text-cyan-400 font-extrabold">{developerProfile.name}</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium">
              {developerProfile.role}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Specializing in high-performance <strong className="text-slate-200">Next.js</strong> architectures, resilient{" "}
            <strong className="text-slate-200">Node.js microservices</strong>, and automated{" "}
            <strong className="text-slate-200">LLM pipelines & n8n workflows</strong>. Built for teams that need rock-solid, production-grade engineering.
          </p>

          {/* Primary Focus Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
            {["Next.js", "TypeScript", "Node.js", "LLM Pipelines", "n8n Automation", "REST & GraphQL"].map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-md border border-slate-700/80 bg-[#0e1628] text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onScrollToProjects}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-cyan-950 font-bold text-xs font-mono transition-all shadow-lg shadow-cyan-500/25"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onToggleRecruiterMode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 hover:border-cyan-500/40 bg-[#0e1628] text-slate-200 text-xs font-mono transition-colors"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Recruiter Quick-View</span>
            </button>

            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 hover:border-purple-500/40 bg-[#0e1628] text-slate-200 text-xs font-mono transition-colors"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Interactive Shell</span>
              <kbd className="text-[10px] bg-slate-900 px-1 py-0.5 rounded border border-slate-700 text-slate-400">~</kbd>
            </button>

            <button
              onClick={handleCopyEmail}
              title={`Copy ${developerProfile.email}`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-400 hover:text-white text-xs font-mono transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied Email!" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: DevTools Telemetry & System Status Card */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-slate-700/80 bg-[#0a0f1d]/90 shadow-2xl shadow-cyan-950/30 overflow-hidden font-mono text-xs">
            {/* Window Header */}
            <div className="px-4 py-2.5 bg-[#0e1628] border-b border-slate-800 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-semibold text-slate-200">system_manifest.json</span>
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                ACTIVE
              </span>
            </div>

            {/* System Key-Value Inspector */}
            <div className="p-4 space-y-3 bg-[#070b14]/70">
              <div className="flex items-start justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-500">engineer:</span>
                <span className="text-slate-200 font-semibold">&quot;{developerProfile.name}&quot;</span>
              </div>
              <div className="flex items-start justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-500">role_spec:</span>
                <span className="text-cyan-300">&quot;Full Stack & AI Automation&quot;</span>
              </div>
              <div className="flex items-start justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-500">prod_track_record:</span>
                <span className="text-emerald-400 font-bold">&quot;{developerProfile.yearsInProd}&quot;</span>
              </div>
              <div className="flex items-start justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-500">location_availability:</span>
                <span className="text-slate-300">&quot;India / Open to Global Remote&quot;</span>
              </div>
              <div className="flex items-start justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-500">architecture_patterns:</span>
                <span className="text-purple-300 text-right">
                  [&quot;Hybrid Queue&quot;, &quot;LLM Structured Extraction&quot;, &quot;Zero-Downtime Cache&quot;]
                </span>
              </div>
              <div className="flex items-start justify-between pt-1">
                <span className="text-slate-500">quick_ping:</span>
                <a
                  href={`mailto:${developerProfile.email}`}
                  className="text-cyan-400 hover:underline"
                >
                  &quot;{developerProfile.email}&quot;
                </a>
              </div>
            </div>

            {/* Micro Live Diagnostics */}
            <div className="px-4 py-2 bg-[#0d1424] border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Next.js 16 Edge Ready</span>
              </span>
              <span className="text-slate-500">0.00s cold start</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/data";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { useLenis } from "@/components/providers/LenisProvider";
import {
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  ArrowRight,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
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
  const { lenis } = useLenis();

  // Close on Escape key and rigorously lock Lenis + document scrolling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      // 1. Pause Lenis smooth scrolling engine so background cannot move
      lenis?.stop();

      // 2. Lock native document and body scrolling
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      // Restore Lenis and document scrolling on unmount / close
      lenis?.start();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, lenis]);

  if (!project) return null;

  // Resolve associated Case Study and Live Hosted Website URL
  const caseStudySlug =
    project.slug || (/^\/projects\/(.+)$/.exec(project.link)?.[1]);
  const caseStudy = caseStudySlug ? getCaseStudyBySlug(caseStudySlug) : undefined;
  const hasCaseStudy = Boolean(project.hasCaseStudy || caseStudy);
  const effectiveLiveUrl =
    project.liveUrl ||
    caseStudy?.liveUrl ||
    (project.link && project.link.startsWith("http") ? project.link : undefined);

  const handleCopyJson = () => {
    const payload = {
      ...project,
      caseStudyMetadata: caseStudy
        ? {
            slug: caseStudy.slug,
            role: caseStudy.role,
            timeline: caseStudy.timeline,
            status: caseStudy.status,
            impactMetrics: caseStudy.impactMetrics,
            components: caseStudy.architecture.components,
          }
        : undefined,
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="architecture-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overscroll-contain"
    >
      {/* Backdrop click area */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Slide-over Drawer Panel */}
      <div
        data-lenis-prevent
        className="relative w-full sm:max-w-xl md:max-w-2xl h-full max-h-screen bg-[#1c2225] border-l border-[var(--color-overlay0)]/30 shadow-2xl flex flex-col z-10 overflow-hidden text-[var(--color-subtext2)] animate-in slide-in-from-right duration-300 overscroll-contain"
      >
        {/* Header (fixed height, never shrinks) */}
        <div className="shrink-0 p-6 md:p-8 border-b border-[var(--color-overlay0)]/30 flex items-start justify-between bg-[#232a2e]/90">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-overlay2)] mb-1">
              <span className="text-[var(--color-green)] font-bold">
                PROJ_{String(project.id).padStart(2, "0")}
              </span>
              <span>·</span>
              <span className="uppercase tracking-wider">{project.categoryLabel}</span>

              {effectiveLiveUrl && (
                <span className="inline-flex items-center gap-1.5 text-[var(--color-green)] bg-[var(--color-green)]/15 border border-[var(--color-green)]/35 px-2 py-0.5 rounded text-[10px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                  LIVE HOSTED
                </span>
              )}

              {hasCaseStudy && (
                <span className="text-[var(--color-purple)] bg-[var(--color-purple)]/15 border border-[var(--color-purple)]/35 px-2 py-0.5 rounded text-[10px] font-semibold">
                  CASE STUDY
                </span>
              )}

              {project.isPrivate ? (
                <span className="flex items-center gap-1 text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded text-[10px]">
                  <Lock className="w-2.5 h-2.5" /> PROPRIETARY
                </span>
              ) : (
                <span className="text-[var(--color-green)] bg-[var(--color-green)]/15 border border-[var(--color-green)]/30 px-2 py-0.5 rounded text-[10px]">
                  PUBLIC
                </span>
              )}
            </div>

            <h2
              id="architecture-modal-title"
              className="text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-tight text-[var(--color-text)] leading-tight"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (fixed height, never shrinks) */}
        <div className="shrink-0 flex items-center px-6 md:px-8 border-b border-[var(--color-overlay0)]/30 bg-[#232a2e]/50 text-xs font-mono">
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "blueprint"
                ? "border-[var(--color-green)] text-[var(--color-green)] font-semibold"
                : "border-transparent text-[var(--color-overlay2)] hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>SYSTEM BLUEPRINT</span>
          </button>
          <button
            onClick={() => setActiveTab("json")}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === "json"
                ? "border-[var(--color-green)] text-[var(--color-green)] font-semibold"
                : "border-transparent text-[var(--color-overlay2)] hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>RAW DATA / SCHEMA</span>
          </button>
        </div>

        {/* Content Body (explicit min-h-0 and overscroll-contain for flawless vertical scrolling) */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto p-6 md:p-8 space-y-7 overscroll-contain touch-pan-y [scrollbar-gutter:stable]"
        >
          {activeTab === "blueprint" ? (
            <>
              {/* Executive Overview */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-overlay2)] mb-2 font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
                  System Overview
                </h3>
                <p className="text-sm md:text-base leading-relaxed text-[var(--color-text)] font-sans">
                  {caseStudy?.executiveSummary?.overview || project.des}
                </p>
              </div>

              {/* Case Study Impact Proofs if available */}
              {caseStudy && caseStudy.impactMetrics.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-overlay2)] mb-3 font-semibold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-green)]" />
                    Verified Production Impact Metrics
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono">
                    {caseStudy.impactMetrics.slice(0, 3).map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#232a2e]/70 border border-[var(--color-overlay0)]/30 space-y-1"
                      >
                        <span className="text-[var(--color-green)] text-base sm:text-lg font-bold block">
                          {metric.value}
                        </span>
                        <span className="text-zinc-200 text-xs font-semibold block truncate">
                          {metric.label}
                        </span>
                        <span className="text-[var(--color-overlay2)] text-[10.5px] font-sans block line-clamp-2">
                          {metric.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Architectural Components if available */}
              {caseStudy && caseStudy.architecture.components.length > 0 && (
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-overlay2)] mb-3 font-semibold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[var(--color-purple)]" />
                    Core Architecture Subsystems
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {caseStudy.architecture.components.slice(0, 4).map((comp, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#232a2e]/60 border border-[var(--color-overlay0)]/30 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-sans font-bold text-xs text-[var(--color-text)]">
                            {comp.name}
                          </span>
                          <span className="font-mono text-[9px] px-1.5 py-0.2 rounded-xs border border-[var(--color-green)]/30 text-[var(--color-green)] bg-[var(--color-green)]/5">
                            {comp.type}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] text-[var(--color-subtext2)] line-clamp-2 leading-relaxed">
                          {comp.role}
                        </p>
                        <span className="font-mono text-[10px] text-[var(--color-subtext1)] block truncate pt-1 border-t border-[var(--color-overlay0)]/20">
                          {comp.tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architectural Highlights */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-overlay2)] mb-3 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-green)]" />
                  Engineering Deliverables &amp; Fail-Safes
                </h3>
                <div className="space-y-2.5">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#232a2e]/60 border border-[var(--color-overlay0)]/30 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--color-green)] mt-0.5 shrink-0" />
                      <span className="text-xs md:text-sm text-[var(--color-subtext2)] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technology Stack Matrix */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-overlay2)] mb-3 font-semibold flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-[var(--color-blue)]" />
                  Technology Stack &amp; Dependencies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#232a2e] border border-[var(--color-overlay0)]/40 font-mono text-xs text-[var(--color-subtext1)]"
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
                <span className="font-mono text-xs text-[var(--color-overlay2)] font-semibold">
                  JSON ARCHITECTURAL CONTRACT
                </span>
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface1)] border border-[var(--color-overlay0)]/40 font-mono text-xs text-[var(--color-subtext2)] hover:text-white hover:border-[var(--color-green)]/40 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[var(--color-green)]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? "COPIED" : "COPY SCHEMA"}</span>
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-[#121618] border border-[var(--color-overlay0)]/30 font-mono text-xs text-[var(--color-subtext2)] overflow-x-auto leading-relaxed">
                {JSON.stringify(
                  {
                    ...project,
                    caseStudyMetadata: caseStudy
                      ? {
                          slug: caseStudy.slug,
                          role: caseStudy.role,
                          timeline: caseStudy.timeline,
                          status: caseStudy.status,
                          impactMetrics: caseStudy.impactMetrics,
                          components: caseStudy.architecture.components,
                        }
                      : undefined,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>

        {/* Action Footer (fixed height, never shrinks) */}
        <div className="shrink-0 p-5 md:p-6 border-t border-[var(--color-overlay0)]/30 bg-[#232a2e]/95 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Hosted Platform Link */}
            {effectiveLiveUrl && (
              <a
                href={effectiveLiveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-green)] text-[#1c2225] font-mono text-xs font-bold hover:bg-[#d8eed0] transition-all shadow-sm active:scale-95"
              >
                <span>OPEN LIVE SITE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Direct Case Study Link */}
            {hasCaseStudy && caseStudySlug && (
              <a
                href={`/projects/${caseStudySlug}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[var(--color-surface1)] border border-[var(--color-overlay0)]/40 hover:border-[var(--color-green)]/60 text-[var(--color-green)] hover:text-white font-mono text-xs font-semibold transition-all active:scale-95"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>FULL CASE STUDY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}

            {/* GitHub Source Code */}
            {project.github && !project.isPrivate && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--color-surface1)] border border-[var(--color-overlay0)]/40 text-[var(--color-subtext2)] hover:text-white font-mono text-xs transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>SOURCE REPO</span>
              </a>
            )}

            {project.isPrivate && (
              <span className="font-mono text-[11px] text-[var(--color-overlay2)] flex items-center gap-1.5 py-1">
                <Lock className="w-3 h-3 text-amber-400/80" /> Source code NDA protected
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[var(--color-overlay2)] hover:text-white transition-colors cursor-pointer py-1"
          >
            ESC TO CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArchitectureModal;

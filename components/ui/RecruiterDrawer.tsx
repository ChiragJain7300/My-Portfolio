"use client";

import React, { useEffect } from "react";
import { projects, workExperience, developerProfile } from "@/data";

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterDrawer({ isOpen, onClose }: RecruiterDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--color-base)]/95 backdrop-blur-md overflow-y-auto font-mono text-xs sm:text-sm select-text">
      <div className="max-w-6xl mx-auto p-3 sm:p-6 md:p-8">
        {/* Top Control Bar */}
        <div className="sticky top-0 bg-[var(--color-base)] py-2.5 border-b border-[var(--color-overlay0)] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-green)] font-bold">[TABLE VIEW]</span>
            <span className="text-[var(--color-subtext2)] text-xs sm:text-sm">Recruiter & Executive Summary</span>
          </div>
          <button
            onClick={onClose}
            className="ide-btn text-[var(--color-red)] hover:text-white text-xs sm:text-sm"
          >
            [close ESC]
          </button>
        </div>

        {/* Profile Summary Header */}
        <div className="my-6 p-4 sm:p-5 bg-[var(--color-surface1)] border border-[var(--color-overlay0)]">
          <div className="text-base sm:text-lg font-bold text-[var(--color-text)]">
            {developerProfile.name} — {developerProfile.role}
          </div>
          <div className="mt-1 text-xs sm:text-sm text-[var(--color-subtext2)]">
            {developerProfile.yearsInProd} · {developerProfile.location} · {developerProfile.email}
          </div>
          <div className="mt-2 text-xs sm:text-sm text-[var(--color-subtext0)] leading-relaxed">
            {developerProfile.bio}
          </div>
        </div>

        {/* Projects Matrix */}
        <div className="mt-8">
          <div className="text-base sm:text-lg font-bold text-[var(--color-green)] mb-3">
            01 / PRODUCTION SYSTEMS & SHIPMENTS ({projects.length})
          </div>
          <div className="overflow-x-auto border border-[var(--color-overlay0)]">
            <table className="w-full min-w-[640px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[var(--color-surface1)] text-[var(--color-subtext2)] border-b border-[var(--color-overlay0)]">
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Project</th>
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Domain</th>
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Key Architecture Highlights</th>
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Stack</th>
                  <th className="p-2.5">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-overlay0)] text-[var(--color-subtext0)]">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-[var(--color-surface0)] transition-colors">
                    <td className="p-2.5 font-medium text-[var(--color-text)] align-top whitespace-nowrap border-r border-[var(--color-overlay0)]">
                      {p.title}
                    </td>
                    <td className="p-2.5 align-top text-[var(--color-purple)] whitespace-nowrap border-r border-[var(--color-overlay0)]">
                      {p.categoryLabel}
                    </td>
                    <td className="p-2.5 align-top border-r border-[var(--color-overlay0)] min-w-[260px]">
                      <ul className="list-disc pl-4 space-y-1">
                        {p.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2.5 align-top border-r border-[var(--color-overlay0)] min-w-[180px]">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 bg-[var(--color-surface2)] text-xs text-[var(--color-subtext2)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-2.5 align-top whitespace-nowrap">
                      {p.link && p.link !== "#contact" ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--color-green)] hover:underline block"
                        >
                          [Demo ↗]
                        </a>
                      ) : null}
                      {p.isPrivate ? (
                        <span className="text-[var(--color-overlay2)] block">[Private NDA]</span>
                      ) : (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--color-blue)] hover:underline block"
                        >
                          [GitHub ↗]
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Experience Matrix */}
        <div className="mt-8">
          <div className="text-base sm:text-lg font-bold text-[var(--color-green)] mb-3">
            02 / ENGINEERING TIMELINE & ROLES ({workExperience.length})
          </div>
          <div className="overflow-x-auto border border-[var(--color-overlay0)]">
            <table className="w-full min-w-[640px] text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[var(--color-surface1)] text-[var(--color-subtext2)] border-b border-[var(--color-overlay0)]">
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Role & Organization</th>
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Duration</th>
                  <th className="p-2.5 border-r border-[var(--color-overlay0)]">Key Deliverables</th>
                  <th className="p-2.5">Core Competencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-overlay0)] text-[var(--color-subtext0)]">
                {workExperience.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[var(--color-surface0)] transition-colors">
                    <td className="p-2.5 font-medium text-[var(--color-text)] align-top whitespace-nowrap border-r border-[var(--color-overlay0)]">
                      <div>{exp.title}</div>
                      <div className="text-[var(--color-purple)] text-xs font-normal">
                        @{exp.company}
                      </div>
                    </td>
                    <td className="p-2.5 align-top whitespace-nowrap text-[var(--color-subtext2)] border-r border-[var(--color-overlay0)]">
                      {exp.duration}
                    </td>
                    <td className="p-2.5 align-top border-r border-[var(--color-overlay0)] min-w-[280px]">
                      <ul className="list-disc pl-4 space-y-1">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2.5 align-top min-w-[180px]">
                      <div className="flex flex-wrap gap-1">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 bg-[var(--color-surface2)] text-xs text-[var(--color-subtext2)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 pb-12 text-center">
          <button
            onClick={onClose}
            className="ide-btn px-4 py-2 text-[var(--color-green)]"
            style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
          >
            ← Return to IDE View
          </button>
        </div>
      </div>
    </div>
  );
}

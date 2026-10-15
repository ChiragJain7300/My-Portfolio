"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data";

interface PopupWindowProps {
  project: Project | null;
  onClose: () => void;
}

export function PopupWindow({ project, onClose }: PopupWindowProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
        <motion.div
          drag
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="pointer-events-auto w-full max-w-lg bg-[var(--color-base)] border border-[var(--color-overlay1)] shadow-2xl font-mono text-xs select-none"
        >
          {/* Draggable Title Bar */}
          <div className="cursor-move bg-[var(--color-surface1)] px-3 py-1.5 border-b border-[var(--color-overlay0)] flex items-center justify-between text-[var(--color-subtext2)]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-overlay2)]">⠿</span>
              <span className="font-semibold text-[var(--color-text)]">
                inspector://{project.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--color-red)] hover:bg-[var(--color-surface2)] px-1.5 py-0.5 rounded-xs transition-colors"
            >
              [×]
            </button>
          </div>

          {/* Window Body */}
          <div className="p-4 space-y-3 max-h-[75vh] overflow-y-auto select-text text-[var(--color-subtext0)]">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)]">
                Category
              </div>
              <div className="text-[var(--color-green)] font-semibold">
                {project.categoryLabel}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)]">
                Description
              </div>
              <p className="mt-0.5 leading-relaxed text-[var(--color-subtext2)]">
                {project.des}
              </p>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)]">
                Key Highlights
              </div>
              <ul className="mt-1 space-y-1 list-none pl-0">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--color-green)]">▪</span>
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-overlay2)]">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="ide-btn text-[11px]"
                    style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--color-overlay0)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {project.link && project.link !== "#contact" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="ide-btn text-[var(--color-green)]"
                    style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
                  >
                    <span>↗</span>
                    <span>Live Demo</span>
                  </a>
                )}
                {project.isPrivate ? (
                  <span className="text-[var(--color-subtext0)] opacity-75">
                    [🔒 Private / NDA]
                  </span>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="ide-btn text-[var(--color-subtext2)]"
                    style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
                  >
                    <span>↗</span>
                    <span>Source</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="ide-btn text-[var(--color-subtext0)] hover:text-[var(--color-text)]"
              >
                [close]
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

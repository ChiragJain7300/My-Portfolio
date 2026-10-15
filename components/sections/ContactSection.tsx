"use client";

import React, { useState } from "react";
import { developerProfile, socialMedia } from "@/data";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pt-8 pb-16 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-subtext2)]">
          ## contact-me
        </h2>
        <span className="text-xs sm:text-sm text-[var(--color-purple)] font-mono">
          [Available Worldwide]
        </span>
      </div>

      <p className="text-sm sm:text-base text-[var(--color-subtext0)] leading-relaxed max-w-[70ch]">
        Currently open to senior engineering roles, high-impact contracts, autonomous AI architecture, and technical advisory.
      </p>

      {/* Contact Action Block */}
      <div className="p-4 sm:p-6 border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/30 space-y-5 max-w-xl text-sm sm:text-base">
        {/* Email Direct */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-semibold tracking-wider text-[var(--color-overlay2)]">
            Direct Dispatch:
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={`mailto:${developerProfile.email}`}
              className="ide-btn text-xs sm:text-sm font-medium"
              style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
            >
              <span>✉</span>
              <span>{developerProfile.email}</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="ide-btn text-xs sm:text-sm"
              style={{
                "--btn-color": copied ? "var(--color-green)" : "var(--color-subtext2)",
              } as React.CSSProperties}
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "copied" : "copy"}</span>
            </button>
          </div>
        </div>

        {/* Social Network Nodes */}
        <div className="space-y-2 pt-3 border-t border-[var(--color-overlay0)]/40">
          <div className="text-xs uppercase font-semibold tracking-wider text-[var(--color-overlay2)]">
            Network Profiles:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {socialMedia.map((s) => (
              <a
                key={s.id}
                href={s.link}
                target="_blank"
                rel="noreferrer"
                className="ide-btn justify-between p-2.5 text-xs sm:text-sm"
                style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
              >
                <span className="flex items-center gap-1.5">
                  <span>↗</span>
                  <span className="font-semibold">{s.name}</span>
                </span>
                <span className="text-xs text-[var(--color-overlay2)] font-mono">
                  {s.name === "GitHub" ? "ChiragJain7300" : "chirag-jain-7300"}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Location & Timezone */}
        <div className="pt-3 border-t border-[var(--color-overlay0)]/40 text-xs sm:text-sm text-[var(--color-subtext1)] flex flex-wrap items-center justify-between gap-2">
          <span>{developerProfile.location}</span>
          <span className="text-[var(--color-green)] font-mono">UTC+5:30 (IST)</span>
        </div>
      </div>

      {/* Vim Empty Line Markers (Authentic ~ lines) */}
      <div className="pt-8 space-y-1 text-sm font-mono text-[var(--color-overlay0)]/60 select-none" aria-hidden="true">
        <div>~</div>
        <div>~</div>
        <div>~</div>
        <div>~</div>
        <div className="text-[11px] text-[var(--color-overlay0)]">
          -- EOF: chirag-jain/portfolio.md [RO] --
        </div>
      </div>
    </section>
  );
}

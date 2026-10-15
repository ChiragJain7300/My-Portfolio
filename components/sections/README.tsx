"use client";

import React, { useState } from "react";
import Link from "next/link";
import { developerProfile, socialMedia } from "@/data";

export function README() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="pt-2 pb-10 flex flex-col gap-3">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)]">
          # {developerProfile.name}
        </h1>
        <div className="text-sm sm:text-base text-green font-semibold">
          {developerProfile.role}
        </div>
        <div className="my-1 text-xs text-subtext2 flex flex-wrap items-center gap-2">
          <span>{developerProfile.yearsInProd}</span>
          <span>·</span>
          <span>{developerProfile.location}</span>
        </div>
      </div>

      {/* Primary Focus Quote */}
      <div className="border-l-2 border-[var(--color-green)] pl-3 py-1 bg-[var(--color-surface1)]/40 text-xs sm:text-sm text-[var(--color-subtext2)]">
        <span className="text-[var(--color-green)] select-none mr-2">&gt;</span>
        <span>{developerProfile.primaryFocus}</span>
      </div>

      {/* Action Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Link
          href="/contact"
          className="ide-btn"
          style={{ "--btn-color": "var(--color-purple)" } as React.CSSProperties}
        >
          <span>✉</span>
          <span>contact-me</span>
        </Link>
        <button
          onClick={handleCopyEmail}
          className="ide-btn"
          style={{
            "--btn-color": copied ? "var(--color-green)" : "var(--color-blue)",
          } as React.CSSProperties}
        >
          <span>📋</span>
          <span>{copied ? "copied!" : "copy email"}</span>
        </button>
        {socialMedia.map((s) => (
          <a
            key={s.id}
            href={s.link}
            target="_blank"
            rel="noreferrer"
            className="ide-btn"
            style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
          >
            <span>↗</span>
            <span>{s.name.toLowerCase()}</span>
          </a>
        ))}
      </div>

      {/* Quick Nav Shortcut Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
        <Link
          href="/projects"
          className="ide-btn"
          style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
        >
          <span>▤</span>
          <span>explore projects/</span>
        </Link>
        <Link
          href="/experience"
          className="ide-btn"
          style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
        >
          <span>▪</span>
          <span>experience/</span>
        </Link>
        <Link
          href="/lab"
          className="ide-btn"
          style={{ "--btn-color": "var(--color-yellow)" } as React.CSSProperties}
        >
          <span>⚡</span>
          <span>lab/</span>
        </Link>
      </div>

      {/* Bio Body */}
      <div className="text-xs sm:text-sm text-[var(--color-subtext0)] leading-relaxed space-y-3">
        <p>
          {developerProfile.bio} Currently building robust, resilient systems with an obsession for high concurrency, clear error budgets, and modular agentic workflows.
        </p>
        <p>
          Proven track record leading backend architectural overhauls, writing race-free token managers, self-healing cron recovery runners, and full-spectrum observability stacks.
        </p>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-2 text-xs bg-[var(--color-surface1)] px-3 py-1.5 border border-[var(--color-overlay0)] inline-flex">
        <span className="text-[var(--color-green)] cursor-blink">●</span>
        <span className="text-[var(--color-subtext2)]">Status:</span>
        <span className="font-semibold text-[var(--color-text)]">
          {developerProfile.status}
        </span>
      </div>

      {/* Acknowledgements Section */}
      <div className="pt-6 space-y-2 text-xs text-[var(--color-subtext1)] border-t border-[var(--color-overlay0)]/40">
        <div className="text-[var(--color-subtext2)] font-semibold">
          ## acknowledgements
        </div>
        <p className="leading-relaxed">
          Design system aesthetic inspired by the remarkable engineering of{" "}
          <a
            href="https://digitalmeadow.studio/info/about/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-green)] hover:underline inline-flex items-center gap-1"
          >
            <span>Digital Meadow</span>
            <span>↗</span>
          </a>
          . Built with Next.js 15, Tailwind CSS v4, and JetBrains Mono.
        </p>
      </div>
    </article>
  );
}

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
    <article className="space-y-4">
      {/* Title */}
      <div data-line-block className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
          # {developerProfile.name}
        </h1>
        <div className="text-sm sm:text-base text-green font-semibold">
          {developerProfile.role}
        </div>
        <div className="text-xs text-subtext2 flex flex-wrap items-center gap-2 pt-0.5">
          <span>{developerProfile.yearsInProd}</span>
          <span>·</span>
          <span>{developerProfile.location}</span>
        </div>
      </div>

      {/* Primary Focus Quote */}
      <div
        data-line-block
        className="border-l-2 border-[var(--color-green)] pl-3 py-1 bg-[var(--color-surface1)]/40 text-xs sm:text-sm text-[var(--color-subtext2)]"
      >
        <span className="text-[var(--color-green)] select-none mr-2">&gt;</span>
        <span>{developerProfile.primaryFocus}</span>
      </div>

      {/* Action Chips */}
      <div data-line-block className="flex flex-wrap items-center gap-2 text-xs pt-1">
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
      <div data-line-block className="flex flex-wrap items-center gap-2 text-xs">
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
      <div className="text-xs sm:text-sm text-[var(--color-subtext0)] leading-relaxed space-y-3 pt-1">
        <p data-line-block>
          {developerProfile.bio} Currently building robust, resilient systems with an obsession for high concurrency, clear error budgets, and modular agentic workflows.
        </p>
        <p data-line-block>
          Proven track record leading backend architectural overhauls, writing race-free token managers, self-healing cron recovery runners, and full-spectrum observability stacks.
        </p>
      </div>

      {/* Status Bar */}
      <div
        data-line-block
        className="flex items-center gap-2 text-xs bg-[var(--color-surface1)] px-3 py-1.5 border border-[var(--color-overlay0)] inline-flex my-1"
      >
        <span className="text-[var(--color-green)] cursor-blink">●</span>
        <span className="text-[var(--color-subtext2)]">Status:</span>
        <span className="font-semibold text-[var(--color-text)]">
          {developerProfile.status}
        </span>
      </div>

      {/* Acknowledgements Section */}
      <div className="pt-6 space-y-2 text-xs text-[var(--color-subtext1)] border-t border-[var(--color-overlay0)]/40">
        <div data-line-block className="text-[var(--color-subtext2)] font-semibold text-sm">
          ## acknowledgements
        </div>
        <p data-line-block className="leading-relaxed">
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
          . Built with Next.js 15, Tailwind CSS v4, and Iosevka Charon.
        </p>
      </div>
    </article>
  );
}

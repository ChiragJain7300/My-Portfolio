"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  IconMail,
  IconCopy,
  IconCheck,
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconArrowUp,
  IconArrowUpRight,
} from "@tabler/icons-react";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("chiragjain7300@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full pt-24 pb-12 relative overflow-hidden scroll-mt-28" id="contact">
      {/* Laser Gradient Divider Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-indigo-500/20 to-transparent" />

      {/* Atmospheric Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Recruiter Contact Card */}
      <div className="max-w-5xl mx-auto glass-card rounded-3xl p-8 sm:p-16 border border-black/[0.08] dark:border-white/10 shadow-xl shadow-black/[0.04] dark:shadow-black/60 flex flex-col items-center text-center space-y-8 relative overflow-hidden backdrop-blur-2xl bg-white/90 dark:bg-[#0d0e17]/90">
        {/* Availability Badge */}
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono text-emerald-800 dark:text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
          <span className="uppercase tracking-wider text-[11px] font-medium">Initiate Collaboration / Open for Hire</span>
        </div>

        {/* Sculptural Headline */}
        <div className="space-y-3.5 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-zinc-950 dark:text-white leading-[1.05]">
            Let&apos;s build <span className="font-light italic text-zinc-500 dark:text-zinc-400">something</span>{" "}
            <span className="text-gradient-cyan">exceptional</span>.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-sans font-light leading-relaxed">
            Whether you are expanding an engineering team, launching an AI automation engine, or building a high-performance web platform, let&apos;s connect.
          </p>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-md">
          <a
            href="mailto:chiragjain7300@gmail.com"
            className="group flex-1 min-w-[160px] inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-lg shadow-zinc-950/10 cursor-pointer"
          >
            <span>Send Direct Email</span>
            <IconArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={handleCopyEmail}
            className="flex-1 min-w-[160px] inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <IconCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Email Copied!</span>
              </>
            ) : (
              <>
                <IconCopy className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Connection Badges */}
        <div className="flex items-center space-x-3 pt-2">
          <a
            href="https://github.com/ChiragJain7300"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
          >
            <IconBrandGithub className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/chirag-jain-7300"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-400 text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
          >
            <IconBrandLinkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/ChiragJain7300"
            target="_blank"
            rel="noreferrer"
            aria-label="Resume"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-400 text-xs font-mono uppercase tracking-wider transition-colors shadow-sm"
          >
            <IconDownload className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Resume</span>
          </a>
        </div>
      </div>

      {/* Sub-Footer */}
      <div className="max-w-5xl mx-auto mt-14 pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        <div className="flex items-center space-x-2">
          <span>Chirag Jain · Full Stack & AI</span>
          <span>/</span>
          <span>© {currentYear}</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
        >
          <span className="uppercase tracking-wider text-[11px]">Back to top</span>
          <IconArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;

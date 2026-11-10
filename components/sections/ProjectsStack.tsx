"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { projects, Project } from "@/data";
import { ArchitectureModal } from "@/components/modals/ArchitectureModal";
import {
  Lock,
  ArrowUpRight,
  Server,
  Sparkles,
  Check,
  ChevronRight,
  Code2,
  FolderGit2,
  Cpu,
  Globe,
  Bot,
  Layers,
  Building2,
  Users,
  MessageSquare,
  ShieldCheck,
  Calendar,
  Utensils,
  ExternalLink,
} from "lucide-react";

type ProjectCategory = "all" | "fullstack" | "ai" | "backend";

// ─────────────────────────────────────────────────────────────────────────────
// Per-project accent color identity
// ─────────────────────────────────────────────────────────────────────────────
interface AccentTheme {
  /** Tailwind color class prefix, e.g. "cyan" */
  name: string;
  /** Spotlight glow rgba — used in radial-gradient */
  spotlightRgba: string;
  /** Border color class */
  border: string;
  /** Text color class */
  text: string;
  /** Subtle bg class */
  bg: string;
  /** Ambient mesh gradient class — goes behind card bg */
  mesh: string;
  /** Category icon */
  Icon: React.ElementType;
  /** Label for the animated status chip */
  statusLabel: string;
  /** Status chip color classes */
  statusColors: string;
  /** Live beacon indicator dot color class */
  statusDot: string;
  /** Header hairline gradient */
  hairline: string;
  /** CTA button gradient classes */
  cta: string;
  /** CTA border class */
  ctaBorder: string;
  /** CTA text class */
  ctaText: string;
  /** Big decorative numeral color */
  numeralColor: string;
}

const PROJECT_ACCENTS: Record<number, AccentTheme> = {
  // PromptPedia — sky/teal (Knowledge / Discovery)
  1: {
    name: "sky",
    spotlightRgba: "rgba(56, 189, 248, 0.10)",
    border: "hover:border-sky-500/50",
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    mesh: "from-sky-950/30 via-transparent to-teal-950/20",
    Icon: Globe,
    statusLabel: "LIVE ON VERCEL",
    statusColors:
      "bg-[#091824]/95 text-sky-200 border-sky-400/60 shadow-[0_0_12px_rgba(56,189,248,0.25)]",
    statusDot: "bg-sky-400",
    hairline:
      "from-transparent via-sky-500/50 via-teal-500/30 to-transparent",
    cta: "from-sky-500/20 via-teal-500/20 to-emerald-500/20 hover:from-sky-500/35 hover:to-emerald-500/35",
    ctaBorder: "border-sky-500/40 hover:border-sky-400",
    ctaText: "text-sky-200 hover:text-white",
    numeralColor: "text-sky-950/60",
  },
  // SEO Engine — amber/gold (AI automation)
  2: {
    name: "amber",
    spotlightRgba: "rgba(245, 158, 11, 0.09)",
    border: "hover:border-amber-500/50",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    mesh: "from-amber-950/30 via-transparent to-orange-950/20",
    Icon: Bot,
    statusLabel: "AI ENGINE",
    statusColors:
      "bg-[#241708]/95 text-amber-200 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    statusDot: "bg-amber-400",
    hairline:
      "from-transparent via-amber-500/50 via-orange-500/30 to-transparent",
    cta: "from-amber-500/20 via-orange-500/20 to-yellow-500/20 hover:from-amber-500/35 hover:to-yellow-500/35",
    ctaBorder: "border-amber-500/40 hover:border-amber-400",
    ctaText: "text-amber-200 hover:text-white",
    numeralColor: "text-amber-900/40",
  },
  // WDM Platform — cyan/blue (backend/systems)
  3: {
    name: "cyan",
    spotlightRgba: "rgba(6, 182, 212, 0.09)",
    border: "hover:border-cyan-500/50",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    mesh: "from-cyan-950/30 via-transparent to-indigo-950/20",
    Icon: Server,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#081e24]/95 text-cyan-200 border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    statusDot: "bg-cyan-400",
    hairline:
      "from-transparent via-cyan-500/50 via-indigo-500/30 to-transparent",
    cta: "from-cyan-500/20 via-indigo-500/20 to-purple-500/20 hover:from-cyan-500/35 hover:to-purple-500/35",
    ctaBorder: "border-cyan-500/40 hover:border-cyan-400",
    ctaText: "text-cyan-200 hover:text-white",
    numeralColor: "text-cyan-900/40",
  },
  // Just Walk India — emerald (fullstack/production)
  4: {
    name: "emerald",
    spotlightRgba: "rgba(16, 185, 129, 0.09)",
    border: "hover:border-emerald-500/50",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    mesh: "from-emerald-950/30 via-transparent to-teal-950/20",
    Icon: Layers,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#082016]/95 text-emerald-200 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    statusDot: "bg-emerald-400",
    hairline:
      "from-transparent via-emerald-500/50 via-teal-500/30 to-transparent",
    cta: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20 hover:from-emerald-500/35 hover:to-cyan-500/35",
    ctaBorder: "border-emerald-500/40 hover:border-emerald-400",
    ctaText: "text-emerald-200 hover:text-white",
    numeralColor: "text-emerald-900/40",
  },
  // Blanca Real Estate — teal/green (enterprise fullstack)
  5: {
    name: "teal",
    spotlightRgba: "rgba(20, 184, 166, 0.09)",
    border: "hover:border-teal-500/50",
    text: "text-teal-400",
    bg: "bg-teal-500/10",
    mesh: "from-teal-950/30 via-transparent to-emerald-950/20",
    Icon: Building2,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#08201c]/95 text-teal-200 border-teal-400/60 shadow-[0_0_12px_rgba(20,184,166,0.25)]",
    statusDot: "bg-teal-400",
    hairline:
      "from-transparent via-teal-500/50 via-emerald-500/30 to-transparent",
    cta: "from-teal-500/20 via-emerald-500/20 to-green-500/20 hover:from-teal-500/35 hover:to-green-500/35",
    ctaBorder: "border-teal-500/40 hover:border-teal-400",
    ctaText: "text-teal-200 hover:text-white",
    numeralColor: "text-teal-900/40",
  },
  // Inventam HRMS — warm ochre / stone (enterprise telemetry & statutory payroll)
  6: {
    name: "stone",
    spotlightRgba: "rgba(217, 119, 6, 0.09)",
    border: "hover:border-amber-600/50",
    text: "text-amber-300",
    bg: "bg-amber-600/10",
    mesh: "from-stone-900/40 via-transparent to-amber-950/20",
    Icon: Users,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#241708]/95 text-amber-100 border-amber-400/60 shadow-[0_0_12px_rgba(217,119,6,0.25)]",
    statusDot: "bg-amber-400",
    hairline:
      "from-transparent via-amber-600/50 via-stone-500/30 to-transparent",
    cta: "from-amber-600/20 via-stone-700/20 to-emerald-700/20 hover:from-amber-600/35 hover:to-emerald-700/35",
    ctaBorder: "border-amber-600/40 hover:border-amber-500",
    ctaText: "text-amber-100 hover:text-white",
    numeralColor: "text-amber-950/40",
  },
  // VecTalk AI — blue/indigo (RAG platform)
  7: {
    name: "blue",
    spotlightRgba: "rgba(59, 130, 246, 0.09)",
    border: "hover:border-blue-500/50",
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    mesh: "from-blue-950/30 via-transparent to-indigo-950/20",
    Icon: Bot,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#091526]/95 text-blue-200 border-blue-400/60 shadow-[0_0_12px_rgba(59,130,246,0.25)]",
    statusDot: "bg-blue-400",
    hairline:
      "from-transparent via-blue-500/50 via-indigo-500/30 to-transparent",
    cta: "from-blue-500/20 via-indigo-500/20 to-sky-500/20 hover:from-blue-500/35 hover:to-sky-500/35",
    ctaBorder: "border-blue-500/40 hover:border-blue-400",
    ctaText: "text-blue-200 hover:text-white",
    numeralColor: "text-blue-900/40",
  },
  // Verified Inbox — sky/cyan (email intelligence)
  8: {
    name: "sky",
    spotlightRgba: "rgba(14, 165, 233, 0.09)",
    border: "hover:border-sky-500/50",
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    mesh: "from-sky-950/30 via-transparent to-cyan-950/20",
    Icon: ShieldCheck,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#081824]/95 text-sky-200 border-sky-400/60 shadow-[0_0_12px_rgba(14,165,233,0.25)]",
    statusDot: "bg-sky-400",
    hairline:
      "from-transparent via-sky-500/50 via-cyan-500/30 to-transparent",
    cta: "from-sky-500/20 via-cyan-500/20 to-teal-500/20 hover:from-sky-500/35 hover:to-teal-500/35",
    ctaBorder: "border-sky-500/40 hover:border-sky-400",
    ctaText: "text-sky-200 hover:text-white",
    numeralColor: "text-sky-900/40",
  },
  // Cleaning App — amber/orange (field operations)
  9: {
    name: "amber",
    spotlightRgba: "rgba(245, 158, 11, 0.09)",
    border: "hover:border-amber-500/50",
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    mesh: "from-amber-950/30 via-transparent to-orange-950/20",
    Icon: Calendar,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#241708]/95 text-amber-200 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    statusDot: "bg-amber-400",
    hairline:
      "from-transparent via-amber-500/50 via-orange-500/30 to-transparent",
    cta: "from-amber-500/20 via-orange-500/20 to-yellow-500/20 hover:from-amber-500/35 hover:to-yellow-500/35",
    ctaBorder: "border-amber-500/40 hover:border-amber-400",
    ctaText: "text-amber-200 hover:text-white",
    numeralColor: "text-amber-900/40",
  },
  // EventCRM — rose/coral (event catering)
  10: {
    name: "rose",
    spotlightRgba: "rgba(244, 63, 94, 0.09)",
    border: "hover:border-rose-500/50",
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    mesh: "from-rose-950/30 via-transparent to-pink-950/20",
    Icon: Utensils,
    statusLabel: "CASE STUDY",
    statusColors:
      "bg-[#260e16]/95 text-rose-200 border-rose-400/60 shadow-[0_0_12px_rgba(244,63,94,0.25)]",
    statusDot: "bg-rose-400",
    hairline:
      "from-transparent via-rose-500/50 via-pink-500/30 to-transparent",
    cta: "from-rose-500/20 via-pink-500/20 to-red-500/20 hover:from-rose-500/35 hover:to-red-500/35",
    ctaBorder: "border-rose-500/40 hover:border-rose-400",
    ctaText: "text-rose-200 hover:text-white",
    numeralColor: "text-rose-900/40",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Tech tag color-coding by domain keyword
// ─────────────────────────────────────────────────────────────────────────────
function getTagStyle(tag: string): string {
  const t = tag.toLowerCase();
  if (t.match(/next\.?js|react|tailwind|typescript|javascript|redux/))
    return "bg-blue-500/10 text-blue-300 border-blue-500/20";
  if (t.match(/mongo|postgres|mysql|sql|prisma|drizzle/))
    return "bg-amber-500/10 text-amber-300 border-amber-500/20";
  if (t.match(/openai|llm|ai|gpt|gemini|claude|n8n|automation|agentic/))
    return "bg-purple-500/10 text-purple-300 border-purple-500/20";
  if (t.match(/node|express|pm2|cron|api|graphql|rest|grpc/))
    return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
  if (t.match(/docker|aws|gcp|vercel|railway|netlify|redis/))
    return "bg-sky-500/10 text-sky-300 border-sky-500/20";
  if (t.match(/bol\.com|monday\.com|mixpanel|sentry|meta|datafor/))
    return "bg-zinc-500/10 text-zinc-300 border-zinc-500/20";
  return "bg-white/5 text-zinc-400 border-white/8";
}

// ─────────────────────────────────────────────────────────────────────────────
// WDM Custom HUD Graphic
// ─────────────────────────────────────────────────────────────────────────────
function WdmHUD() {
  return (
    <div className="w-full h-full p-4 sm:p-5 flex flex-col justify-between bg-[#07080e] text-zinc-200 font-mono text-xs relative select-none">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-indigo-950/25 pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
        <div className="flex items-center space-x-1.5 text-cyan-400">
          <Server className="w-3.5 h-3.5 shrink-0" />
          <span className="font-semibold text-[11px] tracking-wide">WDM_CATALOG_PIPELINE</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          ● 04:00 AM Cron Active
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 z-10 my-auto">
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/8">
          <span className="text-[9px] text-zinc-500 block">OAUTH2 BUFFER</span>
          <span className="text-cyan-300 font-semibold text-[11px] block">30s Pre-Refresh</span>
        </div>
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/8">
          <span className="text-[9px] text-zinc-500 block">PARSER STREAM</span>
          <span className="text-indigo-300 font-semibold text-[11px] block">Set Diff (A ∖ B)</span>
        </div>
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/8">
          <span className="text-[9px] text-zinc-500 block">HEAP USAGE</span>
          <span className="text-emerald-300 font-semibold text-[11px] block">&lt;95 MB RAM</span>
        </div>
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/5 border border-white/8">
          <span className="text-[9px] text-zinc-500 block">INTEGRATION</span>
          <span className="text-amber-300 font-semibold text-[11px] block">4 Systems Unified</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/10 pt-2 z-10">
        <span>Bol.com v10 ⇄ Monday.com</span>
        <span className="text-cyan-400 font-semibold">Backend Lead</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card
// ─────────────────────────────────────────────────────────────────────────────
interface ProjectCardProps {
  project: Project;
  index: number;
  onInspect: (project: Project) => void;
}

function ModernProjectCard({ project, index, onInspect }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [imgError, setImgError] = useState(false);

  const accent = PROJECT_ACCENTS[project.id] ?? PROJECT_ACCENTS[1];
  const hasValidImg = Boolean(project.img) && !imgError;
  const editorialNum = String(index + 1).padStart(2, "0");

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -8 }}
      transition={{ type: "spring", stiffness: 340, damping: 28, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-xl sm:rounded-2xl border border-[var(--color-overlay0)]/30 bg-[#232a2e]/95 p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 ${accent.border} hover:shadow-[0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl`}
    >
      {/* Ambient mesh radial per-project accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent.mesh} pointer-events-none opacity-60`} />

      {/* Accent hairline on top — reveals on hover */}
      <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${accent.hairline} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Cursor spotlight glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              420px circle at ${mouseX}px ${mouseY}px,
              ${accent.spotlightRgba},
              transparent 80%
            )
          `,
        }}
      />

      {/* Large decorative editorial numeral */}
      <span
        className={`pointer-events-none absolute -bottom-4 -right-2 text-[6rem] sm:text-[9rem] font-black leading-none select-none ${accent.numeralColor} transition-opacity duration-300 group-hover:opacity-80`}
        aria-hidden="true"
      >
        {editorialNum}
      </span>

      <div className="relative z-10 flex flex-col h-full">
        {/* ── Top header bar ── */}
        <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 sm:mb-4 border-b border-white/[0.07] text-xs font-mono">
          <div className="flex items-center gap-2 min-w-0">
            {React.createElement(accent.Icon, { className: `w-3.5 h-3.5 ${accent.text} shrink-0` })}
            <span className={`font-semibold uppercase tracking-widest text-[10px] sm:text-[10.5px] ${accent.text} truncate`}>
              {project.categoryLabel}
            </span>
          </div>

          {/* Animated status pill */}
          <span
            className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[10.5px] font-mono font-semibold tracking-wider uppercase border backdrop-blur-md ${accent.statusColors}`}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-80 ${accent.statusDot}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${accent.statusDot} shadow-[0_0_6px_currentColor]`} />
            </span>
            <span>{accent.statusLabel}</span>
          </span>
        </div>

        {/* ── Visual media container ── */}
        <div className="relative w-full h-40 sm:h-48 md:h-52 rounded-xl overflow-hidden mb-4 sm:mb-5 bg-[#1c2225] border border-[var(--color-overlay0)]/30 group/img flex items-center justify-center">
          {hasValidImg ? (
            <>
              {/* Bottom gradient title reveal on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14]/90 via-transparent to-transparent z-10" />
              <div className={`absolute inset-0 bg-gradient-to-t ${accent.mesh} z-10 opacity-0 group-hover/img:opacity-60 transition-opacity duration-500`} />
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority={index < 2}
                onError={() => setImgError(true)}
                className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-[1.06]"
              />
              {project.liveUrl || (project.link && project.link.startsWith("http")) ? (
                <a
                  href={project.liveUrl || project.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-2.5 right-2.5 z-20 font-mono text-[9.5px] px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[var(--color-green)] border border-[var(--color-green)]/40 flex items-center gap-1.5 hover:bg-[var(--color-green)] hover:text-[#16191b] transition-all shadow-sm"
                  title="Open live hosted platform in new tab"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)] animate-pulse" />
                  <span>LIVE SITE ↗</span>
                </a>
              ) : (
                <div className="absolute top-2.5 right-2.5 z-20 font-mono text-[9px] px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-zinc-400 border border-white/10">
                  SYS_PREVIEW
                </div>
              )}
            </>
          ) : (
            <WdmHUD />
          )}
        </div>

        {/* ── Title & description ── */}
        <div className="space-y-1 mb-3.5 sm:mb-4">
          <h3 className={`text-base sm:text-lg lg:text-[1.2rem] font-bold tracking-tight text-white group-hover:${accent.text} transition-colors duration-300 leading-snug`}>
            {project.title}
          </h3>
          <p className="text-xs sm:text-[0.8rem] text-zinc-400 leading-relaxed font-sans line-clamp-2">
            {project.des}
          </p>
        </div>

        {/* ── Architectural highlights ── */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.025] border border-white/[0.07] space-y-2 mb-3.5 sm:mb-4 flex-1">
          <div className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${accent.text} mb-1`}>
            <Sparkles className="w-3 h-3" />
            <span>Architectural Highlights</span>
          </div>
          <ul className="space-y-1.5 text-[11px] sm:text-[0.72rem] text-zinc-300 font-sans">
            {project.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
                <span className="leading-snug text-zinc-300">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Tech stack chips (color-coded) ── */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-[10.5px] font-mono ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTA footer (Responsive: full-width primary + split secondary toolbar on mobile) ── */}
        <div className="mt-auto pt-3.5 sm:pt-4 border-t border-white/[0.07] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-2.5">
          {project.hasCaseStudy ? (
            <Link
              href={`/projects/${project.slug ?? "wdm-platform"}`}
              scroll={true}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }
              }}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r ${accent.cta} border ${accent.ctaBorder} ${accent.ctaText} font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg active:scale-95 group/btn`}
            >
              <span>Read Case Study</span>
              <ChevronRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          ) : (project.liveUrl || (project.link && project.link.startsWith("http"))) ? (
            <a
              href={project.liveUrl || project.link}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r ${accent.cta} border ${accent.ctaBorder} ${accent.ctaText} font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg active:scale-95 group/btn`}
            >
              <span>Launch Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          ) : (
            <div className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-500 font-mono text-xs uppercase tracking-wider select-none">
              <Lock className="w-3.5 h-3.5 text-amber-400/70" />
              <span>Client Deployment</span>
            </div>
          )}

          {/* Secondary Actions: Row on mobile, inline on desktop */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* If the project has BOTH a case study AND a hosted live platform, show a Live Site button */}
            {project.hasCaseStudy && (project.liveUrl || (project.link && project.link.startsWith("http"))) && (
              <a
                href={project.liveUrl || project.link}
                target="_blank"
                rel="noreferrer"
                title="Open Hosted Live Website"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-[var(--color-green)] text-[#16191b] font-mono text-xs font-bold hover:bg-[#d8eed0] transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Site</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => onInspect(project)}
              title="Inspect architectural schema & JSON contracts"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-[var(--color-subtext2)] hover:text-white font-mono text-xs transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Code2 className="w-3.5 h-3.5 text-[var(--color-green)]" />
              <span>Inspect</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Category filter config
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_ACCENT: Record<string, { active: string; pill: string }> = {
  all: {
    active: "text-white",
    pill: "bg-white/15 border-white/25",
  },
  fullstack: {
    active: "text-indigo-200",
    pill: "bg-indigo-500/20 border-indigo-500/40",
  },
  ai: {
    active: "text-amber-200",
    pill: "bg-amber-500/20 border-amber-500/40",
  },
  backend: {
    active: "text-cyan-200",
    pill: "bg-cyan-500/20 border-cyan-500/40",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectsStack() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "All Systems", count: projects.length },
    {
      id: "fullstack",
      label: "Full Stack",
      count: projects.filter((p) => p.category === "fullstack").length,
    },
    {
      id: "ai",
      label: "AI & Auto",
      count: projects.filter((p) => p.category === "ai").length,
    },
    {
      id: "backend",
      label: "Backend / Logistics",
      count: projects.filter((p) => p.category === "backend").length,
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const activeCatAccent = CATEGORY_ACCENT[activeTab] ?? CATEGORY_ACCENT.all;

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 md:px-8 lg:px-12 relative scroll-mt-20"
    >
      {/* Top laser accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-green)]/30 to-transparent" />

      {/* Ambient section background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(203,227,179,0.04),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12 relative">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-[var(--color-overlay0)]/30"
        >
          <div className="space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface0)]/80 border border-[var(--color-green)]/30 text-xs font-mono text-[var(--color-green)]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production Architecture Showcase</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-[var(--color-text)] leading-tight">
              Featured Systems{" "}
              <span className="text-[var(--color-green)]">
                &amp; Engineering Studies
              </span>
            </h2>

            <p className="text-xs sm:text-base text-zinc-400 font-sans max-w-2xl leading-relaxed">
              High-throughput logistics pipelines, SSR ticketing platforms, and
              autonomous LLM agents — engineered for resilient real-world production.
            </p>
          </div>

          {/* ── Category filter pills (Horizontally swipeable on narrow viewports without awkward wrapping) ── */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto shrink-0 scroll-smooth -mx-1 px-1 sm:mx-0 sm:px-1">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const catAccent = CATEGORY_ACCENT[cat.id] ?? CATEGORY_ACCENT.all;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveTab(cat.id as ProjectCategory)}
                  className={`relative px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                    isActive ? `${catAccent.active} font-semibold` : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectPill"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className={`absolute inset-0 ${activeCatAccent.pill} border rounded-lg shadow-sm`}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/5 text-zinc-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Project grid (Optimized responsive gaps) ── */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ModernProjectCard
                key={project.id}
                project={project}
                index={idx}
                onInspect={(p) => setInspectingProject(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Subtle footer count ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 pt-2 text-[10.5px] sm:text-[11px] font-mono text-zinc-500"
        >
          <div className="h-px flex-1 bg-white/[0.06]" />
          <span className="shrink-0">
            {filteredProjects.length} of {projects.length} systems shown
          </span>
          <div className="h-px flex-1 bg-white/[0.06]" />
        </motion.div>
      </div>

      {/* Architecture inspector modal */}
      <ArchitectureModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </section>
  );
}

export default ProjectsStack;

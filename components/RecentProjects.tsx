"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  IconCode,
  IconArrowUpRight,
  IconBrandGithub,
  IconSparkles,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconLock,
  IconServer,
  IconTicket,
  IconActivity,
  IconLayersLinked,
  IconCpu,
} from "@tabler/icons-react";
import { projects } from "@/data";

type ProjectCategory = "all" | "fullstack" | "ai" | "backend";

export const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const romanIndex = ["№ 01", "№ 02", "№ 03", "№ 04"][index] || `№ 0${index + 1}`;
  const hasValidImg = Boolean(project.img) && !imgError;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative rounded-3xl border border-black/[0.08] dark:border-white/10 bg-white/90 dark:bg-[#0d0e17]/90 p-6 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-cyan-600/40 dark:hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 backdrop-blur-xl shadow-sm"
    >
      {/* Editorial Top Hairline Accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-600/30 via-indigo-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Dynamic Cursor Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              450px circle at ${mouseX}px ${mouseY}px,
              rgba(2, 132, 199, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div>
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-4 font-mono text-xs text-zinc-500 dark:text-zinc-400 border-b border-zinc-100 dark:border-white/10 pb-3">
          <span className="text-zinc-900 dark:text-white font-semibold tracking-wider">{romanIndex}</span>
          <span className="text-[11px] tracking-widest text-cyan-700 dark:text-cyan-400 font-medium uppercase">
            {project.categoryLabel}
          </span>
        </div>

        {/* Project Preview Image / Dynamic Hardware Graphic Container */}
        <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-200 dark:border-white/10 flex items-center justify-center group/img">
          {hasValidImg ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 opacity-70" />
              <Image
                src={project.img}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                priority={index < 2}
                onError={() => setImgError(true)}
                className="object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
              />
            </>
          ) : project.graphicType === "logistics" ? (
            /* Custom Graphic for WDM Platform Logistics Engine */
            <div className="w-full h-full p-5 flex flex-col justify-between bg-[#080910] text-zinc-200 font-mono text-xs relative select-none">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-indigo-950/20 pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 z-10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <IconServer className="w-4 h-4" />
                  <span className="font-semibold text-[11px]">BOL.COM ➔ MONDAY.COM PIPELINE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  ● Self-Healing Cron
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 z-10 my-auto">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9.5px] text-zinc-500 block">OAUTH2 SERVICE</span>
                  <span className="text-cyan-300 font-semibold text-[11px]">Atomic Mongo Buffer</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[9.5px] text-zinc-500 block">CATALOG STREAM</span>
                  <span className="text-indigo-300 font-semibold text-[11px]">Set Difference Purge</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/10 pt-2 z-10">
                <span>Node.js (ESM) · Express 5 · PM2</span>
                <span className="text-cyan-400 font-semibold">Race-Free Locks</span>
              </div>
            </div>
          ) : (
            /* Custom Graphic for Just Walk India Ticketing Platform */
            <div className="w-full h-full p-5 flex flex-col justify-between bg-[#0b0c16] text-zinc-200 font-mono text-xs relative select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-950/20 via-transparent to-cyan-950/20 pointer-events-none" />

              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 z-10">
                <div className="flex items-center space-x-2 text-amber-400">
                  <IconTicket className="w-4 h-4" />
                  <span className="font-semibold text-[11px]">JUST WALK INDIA ENGINE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  Live Production
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-sans z-10 my-auto space-y-1">
                <div className="flex justify-between items-center text-xs text-white font-semibold font-mono">
                  <span>SSR TICKETING PASS</span>
                  <span className="text-emerald-400 font-mono text-[10.5px]">Next.js 15 App Router</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light">
                  Dynamic multi-participant attendee forms with Yup/Zod & zero-amount fee bypass logic.
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/10 pt-2 z-10">
                <span>React 19 · MUI v6 · Redux Toolkit</span>
                <span className="text-amber-400 font-semibold">Telemetry Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Project Title & Editorial Description */}
        <div className="space-y-2.5">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-white group-hover:text-cyan-700 dark:group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans font-light">
            {project.des}
          </p>
        </div>

        {/* Key Engineering Highlights Accordion */}
        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-white/10">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex items-center justify-between w-full text-xs font-mono text-zinc-700 dark:text-zinc-300 hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center space-x-1.5 font-medium tracking-wider uppercase text-[11px]">
              <IconSparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span>Architectural Proof ({project.highlights.length} Systems)</span>
            </span>
            {showDetails ? (
              <IconChevronUp className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            ) : (
              <IconChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            )}
          </button>

          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden pt-2.5 space-y-2"
              >
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans pl-1">
                    <IconCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-[10.5px] font-mono text-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-7 pt-5 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between gap-3">
        <a
          href={project.link}
          target={project.link.startsWith("#") ? "_self" : "_blank"}
          rel="noreferrer"
          className="flex-1 inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold text-xs tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-md shadow-zinc-950/10 cursor-pointer"
        >
          <span>{project.link.startsWith("#") ? "System Specs" : "Live Platform"}</span>
          <IconArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {project.isPrivate ? (
          <div
            title="Private Client Repository"
            className="inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider select-none shadow-sm"
          >
            <IconLock className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Private</span>
          </div>
        ) : (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-full bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
          >
            <IconBrandGithub className="w-4 h-4" />
            <span className="hidden sm:inline">Source</span>
          </a>
        )}
      </div>
    </div>
  );
};

const RecentProjects = () => {
  const [activeTab, setActiveTab] = useState<ProjectCategory>("all");

  const categories = [
    { id: "all", label: "All Index" },
    { id: "fullstack", label: "Full Stack" },
    { id: "ai", label: "AI & Automation" },
    { id: "backend", label: "Backend & APIs" },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  return (
    <section id="projects" className="py-28 scroll-mt-28 relative">
      {/* Laser Gradient Divider Top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-indigo-500/20 to-transparent" />

      {/* Editorial Corner Stamp */}
      <div className="absolute top-28 right-6 text-zinc-400 dark:text-zinc-600 font-mono text-xs select-none pointer-events-none hidden md:block">
        + 02 / EXHIBITION
      </div>

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-xs font-mono text-cyan-700 dark:text-cyan-400 shadow-sm">
          <IconCode className="w-3.5 h-3.5" />
          <span>Curated Engineering Exhibition</span>
        </div>
        <h2 className="heading">
          Featured Works & <span className="text-gradient-cyan">Systems</span>
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl font-sans font-light">
          A showcase of full-stack platforms, autonomous LLM pipelines, and production architectures engineered for scale.
        </p>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as ProjectCategory)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === cat.id
                  ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-semibold shadow-md shadow-zinc-950/10"
                  : "bg-white dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={idx} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RecentProjects;

"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRecruiterMode } from "@/components/providers/RecruiterModeContext";
import { NavBar } from "@/components/layout/NavBar";
import { Hero } from "@/components/sections/Hero";
import { ProjectsStack } from "@/components/sections/ProjectsStack";
import { EngineeringLab } from "@/components/sections/EngineeringLab";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ContactSection } from "@/components/sections/ContactSection";
import { RecruiterTable } from "@/components/sections/RecruiterTable";
import { Table, Sparkles } from "lucide-react";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  const { recruiterMode, toggleRecruiterMode } = useRecruiterMode();

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100">
      <ScrollProgress />
      {/* Floating Global Nav Bar */}
      <NavBar />

      <AnimatePresence mode="wait">
        {recruiterMode ? (
          <motion.div
            key="recruiter-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <RecruiterTable />
          </motion.div>
        ) : (
          <motion.main
            key="studio-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col pb-24"
          >
            <Hero />
            <ProjectsStack />
            <EngineeringLab />
            <ExperienceTimeline />
            <ContactSection />
          </motion.main>
        )}
      </AnimatePresence>

      <aside aria-label="View mode toggle" className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={toggleRecruiterMode}
          className="group flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-white/10 hover:border-white/20 text-xs font-mono text-zinc-300 hover:text-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all active:scale-95"
          title={recruiterMode ? "Switch back to interactive studio view" : "Switch to dense ATS/Recruiter evaluation table"}
        >
          {recruiterMode ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#e8e4dc] shrink-0" />
              <span className="font-semibold tracking-wider hidden xs:inline sm:inline">STUDIO VIEW</span>
              <span className="text-zinc-500 text-xs hidden md:inline">[ESC / R]</span>
            </>
          ) : (
            <>
              <Table className="w-3.5 h-3.5 text-[#e8e4dc] shrink-0" />
              <span className="font-semibold tracking-wider">RECRUITER TABLE</span>
              <span className="text-zinc-500 text-xs hidden sm:inline">[KEY: R]</span>
            </>
          )}
        </button>
      </aside>
    </div>
  );
}

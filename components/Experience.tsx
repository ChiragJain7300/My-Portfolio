"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaChevronRight } from "react-icons/fa";

import { workExperience } from "@/data";

const Experience = () => {
  const [activeTab, setActiveTab] = useState(workExperience.length - 1);
  const activeExp = workExperience[activeTab];

  return (
    <div className="py-32 w-full" id="experience">
      <h1 className="heading">
        My <span className="text-purple">work experience</span>
      </h1>

      <div className="w-full mt-16 max-w-4xl mx-auto flex flex-col md:flex-row items-stretch justify-start gap-8 min-h-[400px]">
        {/* Tab selection scroll list */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible border-b md:border-b-0 md:border-l border-white/10 shrink-0 select-none pb-2 md:pb-0 scrollbar-none">
          {workExperience.map((exp, idx) => {
            const isActive = idx === activeTab;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-4 text-left font-medium text-sm transition-colors duration-200 cursor-pointer whitespace-nowrap min-w-[120px] md:min-w-[180px]
                  ${isActive ? "text-purple" : "text-gray-400 hover:text-white"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-purple/10 border-b-2 md:border-b-0 md:border-l-2 border-purple z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{exp.company}</span>
              </button>
            );
          })}
        </div>

        {/* Selected experience details card panel */}
        <div className="flex-1 glassmorphism rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="flex-1"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {activeExp.title}{" "}
                    <span className="text-purple">@ {activeExp.company}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                    <FaCalendarAlt className="text-purple/70" />
                    <span className="font-mono text-xs tracking-wider">{activeExp.duration}</span>
                  </div>
                </div>
              </div>

              <ul className="mt-8 space-y-4 text-gray-300">
                {activeExp.bullets?.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm md:text-base leading-relaxed">
                    <span className="text-purple mt-1 shrink-0">
                      <FaChevronRight className="text-xs" />
                    </span>
                    <span>{bullet}</span>
                  </li>
                )) || <li>{activeExp.desc}</li>}
              </ul>

              {activeExp.tech && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 font-mono">
                    Technologies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.tech.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-purple/10 border border-purple/20 text-purple font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Experience;

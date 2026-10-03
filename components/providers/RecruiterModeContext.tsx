"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project } from "@/data";

interface RecruiterModeContextType {
  recruiterMode: boolean;
  setRecruiterMode: (val: boolean) => void;
  toggleRecruiterMode: () => void;
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextType>({
  recruiterMode: false,
  setRecruiterMode: () => {},
  toggleRecruiterMode: () => {},
  selectedProject: null,
  setSelectedProject: () => {},
});

export function useRecruiterMode() {
  return useContext(RecruiterModeContext);
}

export function RecruiterModeProvider({ children }: { children: React.ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Keyboard shortcut: Press "R" to toggle Recruiter Table
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if (e.key.toLowerCase() === "r" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setRecruiterMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleRecruiterMode = () => setRecruiterMode((prev) => !prev);

  return (
    <RecruiterModeContext.Provider
      value={{
        recruiterMode,
        setRecruiterMode,
        toggleRecruiterMode,
        selectedProject,
        setSelectedProject,
      }}
    >
      {children}
    </RecruiterModeContext.Provider>
  );
}

"use client";

import React, { useState } from "react";
import { IDEShell } from "./IDEShell";
import { ContentPane } from "./ContentPane";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { RecruiterDrawer } from "@/components/ui/RecruiterDrawer";

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const [isTableView, setIsTableView] = useState(false);

  return (
    <>
      {/* Top Right Performance Widget */}
      <ControlPanel />

      {/* Main IDE Grid Shell */}
      <IDEShell
        onToggleTableView={() => setIsTableView(!isTableView)}
        isTableView={isTableView}
      >
        <ContentPane>{children}</ContentPane>
      </IDEShell>

      {/* Recruiter / Executive Summary Table View */}
      <RecruiterDrawer
        isOpen={isTableView}
        onClose={() => setIsTableView(false)}
      />
    </>
  );
}

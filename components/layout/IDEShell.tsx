"use client";

import React from "react";
import { Sidebar } from "./Sidebar";

interface IDEShellProps {
  children: React.ReactNode;
  onToggleTableView?: () => void;
  isTableView?: boolean;
}

export function IDEShell({
  children,
  onToggleTableView,
  isTableView,
}: IDEShellProps) {
  return (
    <div className="flex flex-col md:grid md:grid-cols-[var(--sidebar-width)_1fr] min-h-screen bg-[var(--color-base)] text-[var(--color-subtext0)] w-full overflow-x-hidden">
      <Sidebar
        onToggleTableView={onToggleTableView}
        isTableView={isTableView}
      />
      <main id="main-content" className="bg-[var(--color-surface0)] min-h-screen min-w-0 w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}

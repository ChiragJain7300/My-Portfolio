"use client";

import React, { useState } from "react";

interface SubsystemInfo {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  role: string;
  tech: string;
  resilience: string;
}

const subsystemsData: Record<string, SubsystemInfo> = {
  scheduler: {
    id: "scheduler",
    name: "Automation & Cron Scheduler",
    category: "Ingestion Trigger",
    badge: "node-cron v4",
    badgeColor: "var(--color-yellow)",
    role: "Coordinates the 04:00 AM sequential morning ingestion pipeline and 07:00 AM self-healing recovery runner.",
    tech: "node-cron, Node.js process, PM2 daemon",
    resilience: "PM2 auto-restart on fatal crash, decoupled domain error isolation preventing cascading aborts.",
  },
  tokenManager: {
    id: "tokenManager",
    name: "OAuth2 Token Manager",
    category: "Auth Gateway",
    badge: "MongoDB Cache + 30s Buffer",
    badgeColor: "var(--color-green)",
    role: "Persists Bol.com Bearer tokens with an atomic 30-second pre-expiry buffer, reducing daily OAuth network calls by 98%.",
    tech: "MongoDB Token model, dayjs, Base64 Basic Auth",
    resilience: "Eliminates in-flight 401 race conditions when multiple intra-daily cron tasks execute in parallel.",
  },
  streamingParser: {
    id: "streamingParser",
    name: "Streaming Ingestion Parser",
    category: "Data Processing",
    badge: "csvtojson + Streams",
    badgeColor: "var(--color-blue)",
    role: "Streams binary CSV catalogue dumps directly into memory without intermediate disk writes, maintaining a sub-150MB heap.",
    tech: "Node.js Streams, csvtojson pipeline",
    resilience: "Guarded by a 50% catalog size threshold to prevent processing corrupt or truncated CSV chunks.",
  },
  reconciler: {
    id: "reconciler",
    name: "Set-Difference Reconciler",
    category: "Consistency Engine",
    badge: "A \\ B Delisting Algorithm",
    badgeColor: "var(--color-orange)",
    role: "Computes the set difference between database EANs and fresh CSV EANs, purging delisted products to ensure 100% catalog parity.",
    tech: "JavaScript Set (A \\ B), MongoDB Bulk Delete",
    resilience: "Prevents silent marketplace data drift where deleted products become ghost listings in internal databases.",
  },
  bolApi: {
    id: "bolApi",
    name: "Bol.com Retailer API v10",
    category: "External Marketplace",
    badge: "HTTPS + OAuth2 Bearer",
    badgeColor: "var(--color-blue)",
    role: "Provides automated async catalogue CSV exports, real-time stock balances, search ranking telemetry, and advertising metrics.",
    tech: "REST API v10, Async Process Status Polling",
    resilience: "Recursive 250ms polling with maximum depth guards and exponential backoff retry on HTTP 429/503.",
  },
  database: {
    id: "database",
    name: "MongoDB Database Layer",
    category: "Persistence & Audit",
    badge: "Mongoose v8",
    badgeColor: "var(--color-purple)",
    role: "Houses active offers with indexed EAN lookups, a 30-day TTL audit log collection, and singleton token records.",
    tech: "MongoDB 7.0, Mongoose v8, Compound Indexes",
    resilience: "TTL indexes automatically purge stale execution traces after 30 days without manual database maintenance.",
  },
};

interface NodeButtonProps {
  nodeId: string;
  selectedNode: string;
  onSelect: (id: string) => void;
  accentColor: string;
  label: string;
  title: string;
  description: string;
}

function NodeButton({ nodeId, selectedNode, onSelect, accentColor, label, title, description }: NodeButtonProps) {
  const isSelected = selectedNode === nodeId;

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      aria-controls="subsystem-inspector"
      onClick={() => onSelect(nodeId)}
      className={`w-full text-left p-3.5 rounded-md border transition-all cursor-pointer focus-visible:ring-2 focus-visible:outline-none min-h-[44px] ${
        isSelected
          ? "bg-[var(--color-surface1)] shadow-lg node-glow-active"
          : "bg-[var(--color-surface1)]/30 border-[var(--color-overlay0)]/40 hover:border-[var(--color-overlay1)]"
      }`}
      style={{
        borderColor: isSelected ? accentColor : undefined,
        focusVisibleRingColor: accentColor,
        "--glow-color": accentColor,
      } as React.CSSProperties}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: accentColor }}
        >
          [{label}]
        </span>
        <span
          className={`w-2 h-2 rounded-full transition-all ${isSelected ? "scale-125" : ""}`}
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />
      </div>
      <h4 className="font-sans text-sm font-bold text-[var(--color-text)] mt-1">
        {title}
      </h4>
      <p className="font-sans text-xs text-[var(--color-subtext2)] mt-1 leading-relaxed">
        {description}
      </p>
    </button>
  );
}

function FlowArrow({ text, color = "var(--color-overlay1)" }: { text: string; color?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-xs font-mono" aria-hidden="true">
      <span
        className="w-1.5 h-1.5 rounded-full flow-pulse-dot"
        style={{ backgroundColor: color }}
      />
      <span style={{ color }} className="text-[11px]">↓ {text}</span>
      <span
        className="w-1.5 h-1.5 rounded-full flow-pulse-dot"
        style={{ backgroundColor: color, animationDelay: "0.4s" }}
      />
    </div>
  );
}

export function SystemArchitectureDiagram() {
  const [selectedNode, setSelectedNode] = useState<string>("tokenManager");
  const activeInfo = subsystemsData[selectedNode] || subsystemsData.tokenManager;

  return (
    <div className="space-y-4">
      {/* Visual Diagram Canvas */}
      <div className="p-5 sm:p-6 bg-[var(--color-surface0)]/90 border border-[var(--color-overlay0)]/40 rounded-md space-y-6 relative overflow-hidden">
        {/* Subtle background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--color-overlay0) 1px, transparent 1px), linear-gradient(90deg, var(--color-overlay0) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse" aria-hidden="true" />
              <span className="font-bold text-[var(--color-text)]">
                INTERACTIVE ARCHITECTURE BLUEPRINT
              </span>
            </div>
            <span className="text-[11px] text-[var(--color-overlay2)]">
              [Select subsystem to inspect telemetry]
            </span>
          </div>

          {/* Diagram Nodes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
            {/* Column 1: Scheduling & Auth Gateway */}
            <div className="space-y-2 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-overlay2)] font-semibold flex items-center gap-1.5 mb-1">
                <span className="w-3 h-[2px] bg-[var(--color-yellow)] rounded-full" aria-hidden="true" />
                <span>01 Trigger &amp; Auth Layer</span>
              </div>

              <NodeButton
                nodeId="scheduler"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-yellow)"
                label="node-cron"
                title="Scheduler Engine"
                description="04:00 AM Task Pipeline + 07:00 AM Self-Healing Recovery"
              />

              <FlowArrow text="triggers sequential tasks" color="var(--color-yellow)" />

              <NodeButton
                nodeId="tokenManager"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-green)"
                label="OAuth2 Manager"
                title="DB Token Cache (30s Guard)"
                description="Atomic singleton token upsert eliminating 401 race conditions"
              />
            </div>

            {/* Column 2: Ingestion & Reconciliation Engine */}
            <div className="space-y-2 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-overlay2)] font-semibold flex items-center gap-1.5 mb-1">
                <span className="w-3 h-[2px] bg-[var(--color-blue)] rounded-full" aria-hidden="true" />
                <span>02 Core Processing Engine</span>
              </div>

              <NodeButton
                nodeId="streamingParser"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-blue)"
                label="Streaming Parser"
                title="csvtojson Stream Ingest"
                description="Pipes binary CSV directly to JSON in memory without disk I/O"
              />

              <FlowArrow text="parsed offers stream" color="var(--color-blue)" />

              <NodeButton
                nodeId="reconciler"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-orange)"
                label="Reconciliation"
                title="Set-Difference Pruning"
                description="Computes Stored \ Incoming EANs and purges delisted items"
              />
            </div>

            {/* Column 3: External Gateways & Database Layer */}
            <div className="space-y-2 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-overlay2)] font-semibold flex items-center gap-1.5 mb-1">
                <span className="w-3 h-[2px] bg-[var(--color-purple)] rounded-full" aria-hidden="true" />
                <span>03 Integrations &amp; Storage</span>
              </div>

              <NodeButton
                nodeId="bolApi"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-blue)"
                label="External API"
                title="Bol.com Retailer API v10"
                description="Async catalogue export with recursive 250ms process status polling"
              />

              <FlowArrow text="atomic bulk writes & audit" color="var(--color-purple)" />

              <NodeButton
                nodeId="database"
                selectedNode={selectedNode}
                onSelect={setSelectedNode}
                accentColor="var(--color-purple)"
                label="MongoDB 7.0"
                title="Data & Audit Layer"
                description="Collections: bolOffer (EAN index), CronLog (TTL), Token"
              />
            </div>
          </div>

          {/* Horizontal Data Flow Summary Bar */}
          <div className="p-3 bg-[var(--color-base)]/70 border border-[var(--color-overlay0)]/40 rounded-xs font-mono text-xs text-[var(--color-subtext2)] flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[var(--color-yellow)]">04:00 AM Cron</span>
              <span className="flow-pulse-dot inline-block w-1 h-1 rounded-full bg-[var(--color-overlay2)]" />
              <span className="text-[var(--color-overlay2)]">→</span>
              <span className="text-[var(--color-green)]">OAuth Guard (30s)</span>
              <span className="flow-pulse-dot inline-block w-1 h-1 rounded-full bg-[var(--color-overlay2)]" style={{ animationDelay: "0.3s" }} />
              <span className="text-[var(--color-overlay2)]">→</span>
              <span className="text-[var(--color-blue)]">Bol API Export</span>
              <span className="flow-pulse-dot inline-block w-1 h-1 rounded-full bg-[var(--color-overlay2)]" style={{ animationDelay: "0.6s" }} />
              <span className="text-[var(--color-overlay2)]">→</span>
              <span className="text-[var(--color-purple)]">MongoDB Reconciler</span>
            </div>
            <span className="text-[10px] text-[var(--color-green)] font-semibold">
              [Auto-recovers at 07:00 AM]
            </span>
          </div>

          {/* Selected Subsystem Detail Inspector - Accessible ARIA Live Region */}
          <div
            id="subsystem-inspector"
            role="region"
            aria-live="polite"
            aria-label={`Subsystem details for ${activeInfo.name}`}
            className="p-4 sm:p-5 bg-[var(--color-base)]/80 border rounded-md space-y-3 transition-colors"
            style={{
              borderColor: `color-mix(in srgb, ${activeInfo.badgeColor} 40%, transparent)`,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--color-overlay0)]/30">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeInfo.badgeColor }}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs font-bold text-[var(--color-green)]">
                  INSPECTING:
                </span>
                <h4 className="font-sans text-base font-bold text-[var(--color-text)]">
                  {activeInfo.name}
                </h4>
              </div>
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-xs border"
                style={{
                  color: activeInfo.badgeColor,
                  borderColor: `color-mix(in srgb, ${activeInfo.badgeColor} 40%, transparent)`,
                }}
              >
                {activeInfo.badge}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed">
              {activeInfo.role}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-2.5 bg-[var(--color-surface1)]/30 rounded-xs border border-[var(--color-overlay0)]/20">
                <strong className="text-[var(--color-overlay2)] block font-sans text-[11px] font-mono uppercase mb-1">
                  Technologies & Libraries:
                </strong>
                <span className="font-mono text-[11px] text-[var(--color-purple)]">
                  {activeInfo.tech}
                </span>
              </div>

              <div className="p-2.5 bg-[var(--color-surface1)]/30 rounded-xs border border-[var(--color-overlay0)]/20">
                <strong className="text-[var(--color-overlay2)] block text-[11px] font-mono uppercase mb-1">
                  Resilience & Error Handling:
                </strong>
                <span className="font-sans text-xs text-[var(--color-orange)]">
                  {activeInfo.resilience}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

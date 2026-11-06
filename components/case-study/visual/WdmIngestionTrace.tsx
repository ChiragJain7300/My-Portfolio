"use client";

import React, { useState, useEffect, useRef } from "react";

interface TraceStep {
  time: string;
  stage: string;
  title: string;
  status: "SUCCESS" | "INFO" | "METRIC";
  duration: string;
  memory: string;
  logSnippet: string;
  details: string;
  subsystem: string;
}

const TRACE_STEPS: TraceStep[] = [
  {
    time: "04:00:00.104",
    stage: "01_INIT",
    title: "Scheduler Trigger & Token Cache Lookup",
    status: "SUCCESS",
    duration: "42ms",
    memory: "41.2 MB",
    subsystem: "node-cron / TokenManager",
    details:
      "Cron fires 04:00 AM daily ingest. System queries MongoDB Token collection. Valid Bol.com OAuth2 Bearer token discovered with 482s TTL remaining (> 30s pre-expiry safety margin). Reused in-memory without initiating a costly remote OAuth handshake.",
    logSnippet: `[04:00:00] [Cron] Triggering morningTasks[0]: "getBolOffers"
[04:00:00] [OAuth] Token.findOne({ service: "bol_retailer" }) -> Cache HIT
[04:00:00] [OAuth] Valid token active until 04:08:12 CET (30s buffer satisfied). 0 network calls made.`,
  },
  {
    time: "04:00:01.840",
    stage: "02_EXPORT",
    title: "Bol.com Asynchronous Export Initiation",
    status: "INFO",
    duration: "185ms",
    memory: "44.6 MB",
    subsystem: "Bol.com API v10 Gateway",
    details:
      "Dispatched POST /retailer/offers/export with Bearer authorization. Bol.com queues the catalogue extraction job asynchronously and returns HTTP 202 Accepted with a unique tracking processStatusId.",
    logSnippet: `[04:00:01] [BolAPI] POST https://api.bol.com/retailer/offers/export
[04:00:01] [BolAPI] Response HTTP 202 Accepted. processStatusId="7749102"
[04:00:01] [BolAPI] Initializing recursive polling loop with 250ms cadence.`,
  },
  {
    time: "04:00:06.210",
    stage: "03_POLL",
    title: "Recursive Polling Loop & Export Completion",
    status: "SUCCESS",
    duration: "4,370ms",
    memory: "52.8 MB",
    subsystem: "Polling Engine",
    details:
      "Polled GET /retailer/process-status/7749102 every 250ms. Bol transitioned through PENDING -> PROCESSING -> SUCCESS after 4.37 seconds. Returned pre-signed CSV stream endpoint.",
    logSnippet: `[04:00:02] [Poll #01] status="PENDING" -> wait 250ms
[04:00:03] [Poll #05] status="PROCESSING" -> wait 250ms
[04:00:06] [Poll #17] status="SUCCESS" -> entityId="csv-export-881920.csv.gz"
[04:00:06] [Poll] Total polling latency: 4,370ms across 17 status checks.`,
  },
  {
    time: "04:00:08.450",
    stage: "04_STREAM",
    title: "Zero-Disk Streaming Ingestion & Parsing",
    status: "METRIC",
    duration: "7,820ms",
    memory: "92.4 MB peak",
    subsystem: "csvtojson Streaming Pipe",
    details:
      "Streamed gzip binary directly from Bol into csvtojson pipeline without spooling to local disk. Processed 14,820 product rows directly in chunks. Process RSS memory peaked safely at 92.4 MB, well below the PM2 512 MB memory restart limit.",
    logSnippet: `[04:00:08] [Stream] GET /retailer/offers/export/csv-export-881920 -> Pipe to csvtojson()
[04:00:11] [Stream] Chunked processing: 5,000 / 14,820 parsed. RSS: 68.4 MB
[04:00:14] [Stream] Chunked processing: 10,000 / 14,820 parsed. RSS: 84.1 MB
[04:00:16] [Stream] Completed 14,820 records in 7.82s. Memory peak: 92.4 MB. 0 disk bytes used.`,
  },
  {
    time: "04:00:18.120",
    stage: "05_RECONCILE",
    title: "Set-Difference Algorithm & Database Reconciliation",
    status: "SUCCESS",
    duration: "1,940ms",
    memory: "81.6 MB",
    subsystem: "Mongoose Reconciler",
    details:
      "All 14,820 incoming records upserted in bulk chunks. System extracted stored offerIds: 14,862. Reconciler computed set difference (Stored \\ Incoming): 42 products delisted on marketplace. Executed deleteMany for 42 stale IDs, achieving 100% catalog consistency.",
    logSnippet: `[04:00:16] [DB] Bulk upserting 14,820 offers into "bolOffer" collection... Done (1,480ms)
[04:00:17] [Reconciler] Stored EANs: 14,862 | Incoming EANs: 14,820
[04:00:17] [Reconciler] Stale Delta (Stored \\ Incoming) = 42 orphans identified.
[04:00:18] [DB] bolOffer.deleteMany({ offerId: { $in: [42 IDs] } }) -> 42 deleted. Zero orphaned items remain.`,
  },
  {
    time: "04:00:20.516",
    stage: "06_COMMIT",
    title: "CronLog Commit & Slack Webhook Heartbeat",
    status: "SUCCESS",
    duration: "88ms",
    memory: "58.1 MB",
    subsystem: "Audit & Telemetry",
    details:
      "Cron task recorded an audit document in CronLog with status '✅', elapsed duration 20,412ms, and 14,820 records processed. Dispatched an uptime heartbeat ping. The 07:00 AM self-healing cron skips this job because status is green.",
    logSnippet: `[04:00:20] [CronLog] Inserted audit record { taskName: "getBolOffers", status: "✅", durationMs: 20412, records: 14820 }
[04:00:20] [Telemetry] Execution completed in 20.41s without warnings.
[04:00:20] [Recovery] Self-healing audit tag: PASSED (Will NOT be flagged for retry at 07:00 AM).`,
  },
];

export function WdmIngestionTrace() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const activeStep = TRACE_STEPS[selectedStepIndex];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play stepper for pipeline playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setSelectedStepIndex((prev) => {
          if (prev >= TRACE_STEPS.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, selectedStepIndex]);

  const progressPercent = ((selectedStepIndex + 1) / TRACE_STEPS.length) * 100;

  return (
    <div className="p-4 sm:p-6 bg-[var(--color-surface0)]/90 border border-[var(--color-overlay0)]/50 rounded-md space-y-6 relative overflow-hidden">
      {/* Header & High-Level Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--color-overlay0)]/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded-xs bg-[var(--color-green)]/10 text-[var(--color-green)] border border-[var(--color-green)]/30 font-semibold">
              OPERATIONAL ARTIFACT
            </span>
            <span className="font-mono text-xs text-[var(--color-overlay2)]">
              // PRODUCTION RUN TRACE
            </span>
          </div>
          <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)] mt-1.5">
            04:00 AM Morning Ingestion Execution Trace
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] mt-0.5">
            Real anonymized production telemetry captured during a 14,820-item Bol.com catalog sync and reconciliation.
          </p>
        </div>

        {/* Global Run HUD */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs shrink-0">
          <div className="px-3 py-1.5 bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/40 rounded-xs">
            <span className="text-[var(--color-overlay2)] block text-[10px]">TOTAL DURATION</span>
            <span className="text-[var(--color-green)] font-bold">20.41s</span>
          </div>
          <div className="px-3 py-1.5 bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/40 rounded-xs">
            <span className="text-[var(--color-overlay2)] block text-[10px]">PEAK RSS MEMORY</span>
            <span className="text-[var(--color-purple)] font-bold">92.4 MB</span>
          </div>
          <div className="px-3 py-1.5 bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/40 rounded-xs">
            <span className="text-[var(--color-overlay2)] block text-[10px]">ORPHANS PURGED</span>
            <span className="text-[var(--color-yellow)] font-bold">42 items</span>
          </div>
        </div>
      </div>

      {/* Pipeline Visual Progress Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--color-overlay2)] text-[11px] uppercase tracking-wider font-semibold">
            Pipeline Execution Flow ({selectedStepIndex + 1} of {TRACE_STEPS.length})
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="ide-btn text-xs font-mono py-1 px-2.5 flex items-center gap-1.5"
              style={{
                "--btn-color": isPlaying ? "var(--color-yellow)" : "var(--color-green)",
              } as React.CSSProperties}
            >
              <span>{isPlaying ? "⏸ Pause" : "▶ Play Pipeline"}</span>
            </button>
            <button
              type="button"
              disabled={selectedStepIndex === 0}
              onClick={() => {
                setIsPlaying(false);
                setSelectedStepIndex((prev) => Math.max(0, prev - 1));
              }}
              className="ide-btn text-xs font-mono py-1 px-2 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ "--btn-color": "var(--color-overlay1)" } as React.CSSProperties}
              aria-label="Previous step"
            >
              ←
            </button>
            <button
              type="button"
              disabled={selectedStepIndex === TRACE_STEPS.length - 1}
              onClick={() => {
                setIsPlaying(false);
                setSelectedStepIndex((prev) => Math.min(TRACE_STEPS.length - 1, prev + 1));
              }}
              className="ide-btn text-xs font-mono py-1 px-2 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ "--btn-color": "var(--color-overlay1)" } as React.CSSProperties}
              aria-label="Next step"
            >
              →
            </button>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-[var(--color-surface1)] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[var(--color-green)] via-[var(--color-blue)] to-[var(--color-purple)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Interactive Step Navigator Grid */}
      <div
        role="tablist"
        aria-label="Ingestion Pipeline Stages"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2"
      >
        {TRACE_STEPS.map((step, idx) => {
          const isSelected = selectedStepIndex === idx;
          const isPast = idx < selectedStepIndex;

          return (
            <button
              key={step.stage}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`trace-panel-${step.stage}`}
              onClick={() => {
                setIsPlaying(false);
                setSelectedStepIndex(idx);
              }}
              className={`p-2.5 rounded-xs border text-left transition-all cursor-pointer font-sans min-h-[44px] relative ${
                isSelected
                  ? "bg-[var(--color-surface2)] border-[var(--color-green)] shadow-md node-glow-active"
                  : isPast
                  ? "bg-[var(--color-surface1)]/50 border-[var(--color-green)]/30 hover:bg-[var(--color-surface1)]"
                  : "bg-[var(--color-surface1)]/20 border-[var(--color-overlay0)]/30 hover:bg-[var(--color-surface1)]/50 text-[var(--color-subtext2)]"
              }`}
              style={{
                "--glow-color": "var(--color-green)",
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span
                  className={
                    isSelected
                      ? "text-[var(--color-green)] font-bold"
                      : isPast
                      ? "text-[var(--color-green)]/70"
                      : "text-[var(--color-overlay2)]"
                  }
                >
                  {isPast ? "✓" : `STEP ${idx + 1}`}
                </span>
                <span className="text-[var(--color-subtext1)] tabular-nums">{step.duration}</span>
              </div>
              <div
                className={`text-xs font-semibold mt-1 truncate ${
                  isSelected ? "text-[var(--color-text)]" : "text-[var(--color-subtext2)]"
                }`}
              >
                {step.title.split(" ")[0]} {step.title.split(" ")[1] || ""}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Inspector Panel */}
      <div
        id={`trace-panel-${activeStep.stage}`}
        role="tabpanel"
        aria-live="polite"
        className="p-4 sm:p-5 bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/40 rounded-md space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30">
          <div>
            <div className="font-mono text-xs text-[var(--color-green)] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-pulse" aria-hidden="true" />
              <span>STAGE 0{selectedStepIndex + 1} • {activeStep.stage}</span>
            </div>
            <h4 className="font-sans text-base font-bold text-[var(--color-text)] mt-0.5">
              {activeStep.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--color-subtext2)]">
              Subsystem: <span className="text-[var(--color-text)]">{activeStep.subsystem}</span>
            </span>
            <span className="text-[var(--color-overlay2)]">|</span>
            <span className="text-[var(--color-purple)]">{activeStep.memory}</span>
          </div>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-sm text-[var(--color-subtext2)] leading-relaxed">
          {activeStep.details}
        </p>

        {/* Authenticated Log Snippet Console */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--color-overlay2)]">
            <span>TERMINAL LOG STREAM [{activeStep.time}]</span>
            <span className="text-[var(--color-green)] font-semibold">STATUS: {activeStep.status}</span>
          </div>
          <pre className="p-3 sm:p-3.5 bg-[var(--color-base)] border border-[var(--color-overlay0)]/50 rounded-xs font-mono text-xs text-[var(--color-subtext1)] overflow-x-auto leading-relaxed whitespace-pre select-all">
            {activeStep.logSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
}

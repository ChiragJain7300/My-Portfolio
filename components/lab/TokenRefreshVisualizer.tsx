"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Lock, CheckCircle, ShieldCheck, Activity, Cpu, Server, Globe, RefreshCw, AlertTriangle } from "lucide-react";

export type RequestState = "idle" | "pending" | "hit401" | "queued" | "refreshing" | "replayed" | "done";

interface RequestLane {
  id: string;
  name: string;
  state: RequestState;
  statusCode: number | null;
  message: string;
}

const initialLanes: RequestLane[] = [
  { id: "req-1", name: "REQ_01 [GET /api/v1/orders]", state: "idle", statusCode: null, message: "Standby" },
  { id: "req-2", name: "REQ_02 [POST /api/v1/inventory]", state: "idle", statusCode: null, message: "Standby" },
  { id: "req-3", name: "REQ_03 [GET /api/v1/reports]", state: "idle", statusCode: null, message: "Standby" },
  { id: "req-4", name: "REQ_04 [PUT /api/v1/shipments]", state: "idle", statusCode: null, message: "Standby" },
  { id: "req-5", name: "REQ_05 [GET /api/v1/telemetry]", state: "idle", statusCode: null, message: "Standby" },
];

export interface TokenRefreshVisualizerProps {
  activeMode?: "single-flight" | "resumable" | "runtime";
}

export function TokenRefreshVisualizer({ activeMode = "single-flight" }: TokenRefreshVisualizerProps) {
  // ── Mode 1: Single-Flight State ──
  const [lanes, setLanes] = useState<RequestLane[]>(initialLanes);
  const [isRunning, setIsRunning] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tokenVersion, setTokenVersion] = useState("tok_v1_expired_9f8a");
  const [activeCodeLine, setActiveCodeLine] = useState<number | null>(null);

  // ── Mode 2: Resumable Jobs State ──
  const [cronStep, setCronStep] = useState<number>(0);
  const [cronStatus, setCronStatus] = useState<string>("IDLE · AWAITING CRON TRIGGER");
  const [savedCursor, setSavedCursor] = useState<number | null>(null);

  // ── Mode 3: Runtime-Aware State ──
  const [runtimeEnv, setRuntimeEnv] = useState<"client" | "server" | "edge">("client");

  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Reset when active mode changes
  useEffect(() => {
    resetSimulation();
  }, [activeMode]);

  const resetSimulation = () => {
    clearAllTimers();
    setIsRunning(false);
    setIsRefreshing(false);
    setTokenVersion("tok_v1_expired_9f8a");
    setActiveCodeLine(null);
    setLanes(initialLanes);
    setCronStep(0);
    setCronStatus("IDLE · AWAITING CRON TRIGGER");
    setSavedCursor(null);
  };

  // ── Fire Mode 1: Single-Flight ──
  const fireSimulation = () => {
    if (isRunning) return;
    resetSimulation();
    setIsRunning(true);

    setActiveCodeLine(1);
    setLanes((prev) =>
      prev.map((l) => ({
        ...l,
        state: "pending",
        statusCode: null,
        message: "Dispatching request over HTTP/2...",
      }))
    );

    const t1 = setTimeout(() => {
      setActiveCodeLine(5);
      setLanes((prev) =>
        prev.map((l) => ({
          ...l,
          state: "hit401",
          statusCode: 401,
          message: "401 Token Expired",
        }))
      );
    }, 700);

    const t2 = setTimeout(() => {
      setIsRefreshing(true);
      setActiveCodeLine(7);
      setLanes((prev) =>
        prev.map((l, idx) => {
          if (idx === 0) {
            return {
              ...l,
              state: "refreshing",
              message: "Acquired Mutex Lock → POST /auth/token",
            };
          }
          return {
            ...l,
            state: "queued",
            message: "Awaiting Mutex Release (Queued)",
          };
        })
      );
    }, 1200);

    const t3 = setTimeout(() => {
      const newToken = "tok_v2_active_" + Math.random().toString(36).substring(2, 7);
      setTokenVersion(newToken);
      setIsRefreshing(false);
      setActiveCodeLine(10);

      setLanes((prev) =>
        prev.map((l, idx) => {
          if (idx === 0) {
            return {
              ...l,
              state: "done",
              statusCode: 200,
              message: "200 OK (Refreshed In-Flight)",
            };
          }
          return {
            ...l,
            state: "replayed",
            message: "Replaying with new Bearer token...",
          };
        })
      );
    }, 2500);

    const t4 = setTimeout(() => {
      setLanes((prev) =>
        prev.map((l, idx) => (idx === 1 ? { ...l, state: "done", statusCode: 200, message: "200 OK (Resolved from Queue)" } : l))
      );
    }, 2800);

    const t5 = setTimeout(() => {
      setLanes((prev) =>
        prev.map((l, idx) => (idx === 2 ? { ...l, state: "done", statusCode: 200, message: "200 OK (Resolved from Queue)" } : l))
      );
    }, 3000);

    const t6 = setTimeout(() => {
      setLanes((prev) =>
        prev.map((l, idx) => (idx === 3 ? { ...l, state: "done", statusCode: 200, message: "200 OK (Resolved from Queue)" } : l))
      );
    }, 3200);

    const t7 = setTimeout(() => {
      setLanes((prev) =>
        prev.map((l, idx) => (idx === 4 ? { ...l, state: "done", statusCode: 200, message: "200 OK (Resolved from Queue)" } : l))
      );
      setIsRunning(false);
      setActiveCodeLine(12);
    }, 3400);

    timerRef.current = [t1, t2, t3, t4, t5, t6, t7];
  };

  // ── Fire Mode 2: Resumable Jobs ──
  const fireCronSimulation = () => {
    if (isRunning) return;
    resetSimulation();
    setIsRunning(true);
    setCronStep(1);
    setCronStatus("PROCESSING CHUNK 1/5 [0 - 1000]...");

    const c1 = setTimeout(() => {
      setCronStep(2);
      setCronStatus("PROCESSING CHUNK 2/5 [1001 - 2000]...");
    }, 800);

    const c2 = setTimeout(() => {
      setCronStep(3); // Failure!
      setCronStatus("ERROR: CHUNK 3 FAILED (HEAP MEMORY SPIKE) ✕");
    }, 1600);

    const c3 = setTimeout(() => {
      setSavedCursor(2000); // Record Cursor
      setCronStatus("PERSISTED CURSOR [2000] TO MONGODB CRONLOG ✓");
    }, 2400);

    const c4 = setTimeout(() => {
      setCronStep(4); // Resume from 2000
      setCronStatus("AUTOMATED RESUMPTION AT CURSOR [2000] → RETRYING CHUNK 3...");
    }, 3300);

    const c5 = setTimeout(() => {
      setCronStep(5); // Complete!
      setCronStatus("SUCCESS: CHUNKS 3-5 PROCESSED · ZERO DUPLICATE WORK");
      setIsRunning(false);
    }, 4200);

    timerRef.current = [c1, c2, c3, c4, c5];
  };

  const getStatusBadge = (lane: RequestLane) => {
    switch (lane.state) {
      case "idle":
        return <span className="text-zinc-400 font-mono text-[10px]">IDLE</span>;
      case "pending":
        return <span className="text-zinc-200 font-mono text-[10px] animate-pulse">DISPATCHING...</span>;
      case "hit401":
        return <span className="text-red-400 font-mono text-[10px]">401 UNAUTH</span>;
      case "queued":
        return (
          <span className="text-amber-300 font-mono text-[10px] flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" /> QUEUED
          </span>
        );
      case "refreshing":
        return (
          <span className="text-[#e8e4dc] font-mono text-[10px] flex items-center gap-1 font-semibold">
            <Activity className="w-2.5 h-2.5 animate-spin" /> REFRESH MUTEX
          </span>
        );
      case "replayed":
        return <span className="text-emerald-300 font-mono text-[10px]">REPLAYING...</span>;
      case "done":
        return (
          <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
            <CheckCircle className="w-2.5 h-2.5" /> 200 OK
          </span>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between p-3 sm:p-4 rounded-2xl bg-[#121217] border border-white/10 overflow-hidden">
      {/* ── MODE 1: SINGLE-FLIGHT REFRESH ── */}
      {activeMode === "single-flight" && (
        <div className="h-full flex flex-col justify-between space-y-3">
          {/* Top Telemetry Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#e8e4dc]" />
              <div className="font-mono text-xs text-zinc-300 font-semibold">
                MUTEX QUEUE SIMULATOR
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/8">
                <span className="text-zinc-400">BURST:</span>
                <span className="text-white font-bold">50 CONCURRENT 401s</span>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 border border-white/8">
                <span className="text-zinc-400">REFRESH CALLS:</span>
                <span className="text-emerald-400 font-bold">1</span>
              </div>

              <button
                onClick={resetSimulation}
                disabled={isRunning}
                className="p-1 text-zinc-400 hover:text-white disabled:opacity-40 transition-colors"
                title="Reset Simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Grid: Left Code, Right Lanes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
            {/* Left: Code Snippet */}
            <div className="lg:col-span-5 flex flex-col justify-between py-1 font-mono text-[11px] overflow-y-auto">
              <div className="space-y-1 text-zinc-300">
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 1 ? "bg-white/15 text-white" : ""}`}>
                  <span className="text-zinc-400">01</span> <span className="text-zinc-400">async function</span> <span className="text-[#e8e4dc] font-semibold">withAuth</span>(req) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 7 ? "bg-amber-400/20 text-amber-100" : ""}`}>
                  <span className="text-zinc-400">02</span>   <span className="text-zinc-400">if</span> (isRefreshing) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 7 ? "bg-amber-400/20 text-amber-100" : ""}`}>
                  <span className="text-zinc-400">03</span>     <span className="text-zinc-400">return await</span> queue.<span className="text-zinc-200">enqueue</span>(req);
                </div>
                <div className="px-2 py-0.5 rounded text-zinc-400">
                  <span className="text-zinc-400">04</span>   &#125;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 5 ? "bg-red-400/20 text-red-200" : ""}`}>
                  <span className="text-zinc-400">05</span>   <span className="text-zinc-400">try</span> &#123; <span className="text-zinc-400">return await</span> <span className="text-zinc-200">dispatch</span>(req); &#125;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 5 ? "bg-red-400/20 text-red-200" : ""}`}>
                  <span className="text-zinc-400">06</span>   <span className="text-zinc-400">catch</span> (err) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 7 ? "bg-amber-400/20 text-amber-100" : ""}`}>
                  <span className="text-zinc-400">07</span>     <span className="text-zinc-400">if</span> (err.status === 401) &#123;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 7 ? "bg-amber-400/20 text-amber-100" : ""}`}>
                  <span className="text-zinc-400">08</span>       isRefreshing = <span className="text-[#e8e4dc]">true</span>;
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 10 ? "bg-emerald-400/20 text-emerald-100" : ""}`}>
                  <span className="text-zinc-400">09</span>       token = <span className="text-zinc-400">await</span> <span className="text-zinc-200">refreshToken</span>();
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 10 ? "bg-emerald-400/20 text-emerald-100" : ""}`}>
                  <span className="text-zinc-400">10</span>       <span className="text-zinc-200">drainQueue</span>(token);
                </div>
                <div className={`px-2 py-0.5 rounded ${activeCodeLine === 12 ? "bg-emerald-400/20 text-emerald-100" : ""}`}>
                  <span className="text-zinc-400">11</span>       <span className="text-zinc-400">return await</span> <span className="text-zinc-200">dispatch</span>(req);
                </div>
              </div>

              <div className="pt-2 text-[10px] text-zinc-400">
                ACTIVE_TOKEN: <span className="text-[#e8e4dc]">{tokenVersion}</span>
              </div>
            </div>

            {/* Right: Request Lanes */}
            <div className="lg:col-span-7 divide-y divide-white/8 overflow-y-auto">
              {lanes.map((lane) => (
                <div key={lane.id} className="py-2 px-2 transition-colors duration-150">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-semibold text-zinc-200 truncate">
                      {lane.name}
                    </span>
                    {getStatusBadge(lane)}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mt-0.5">
                    <span>{lane.message}</span>
                    <span>{lane.statusCode ? `HTTP ${lane.statusCode}` : "--"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger Footer */}
          <div className="pt-2 border-t border-white/8 flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              50 concurrent 401s → 1 refresh call · 49 requests queued behind mutex
            </span>
            <button
              onClick={fireSimulation}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-all disabled:opacity-40"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isRunning ? "SIMULATING CONCURRENCY..." : "FIRE 50 CONCURRENT 401 BURST"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODE 2: RESUMABLE JOBS (CRONLOG) ── */}
      {activeMode === "resumable" && (
        <div className="h-full flex flex-col justify-between space-y-3">
          {/* Top Telemetry */}
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-semibold">
              <Cpu className="w-4 h-4 text-[#e8e4dc]" />
              <span>INCREMENTAL CRONLOG PIPELINE</span>
            </div>
            <div className="font-mono text-[10px] text-emerald-400">
              SAVED CURSOR: <span className="text-white font-bold">{savedCursor !== null ? savedCursor : "--"}</span>
            </div>
          </div>

          {/* Pipeline Progress Visualizer */}
          <div className="flex-1 flex flex-col justify-center space-y-4 py-2">
            <div className="font-mono text-xs text-zinc-300 px-2 py-1.5 rounded bg-white/5 border border-white/8 flex items-center justify-between">
              <span>STATUS:</span>
              <span className={cronStep === 3 ? "text-red-400 font-bold" : "text-[#e8e4dc] font-bold"}>{cronStatus}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>CHUNK EXECUTION FLOW (5000 RECORDS TOTAL)</span>
                <span>{cronStep >= 5 ? "100% COMPLETE" : `${Math.min(cronStep * 20, 100)}%`}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((chk) => {
                  let bg = "bg-white/5 text-zinc-500 border-white/10";
                  let label = `CHUNK 0${chk}`;
                  if (cronStep >= chk) {
                    if (chk === 3 && cronStep === 3) {
                      bg = "bg-red-500/20 text-red-300 border-red-500/40 animate-pulse";
                      label = `CHUNK 03 ✕`;
                    } else {
                      bg = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
                      label = `CHUNK 0${chk} ✓`;
                    }
                  }
                  return (
                    <div key={chk} className={`p-2.5 rounded-lg border font-mono text-[10px] text-center ${bg}`}>
                      <div className="font-bold">{label}</div>
                      <div className="text-[9px] opacity-70 mt-1">{(chk - 1) * 1000} - {chk * 1000}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/8 font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="text-zinc-500">// CronLog Mongodb Checkpoint Record</div>
              <div><span className="text-amber-300">const</span> jobState = <span className="text-[#e8e4dc]">await</span> db.cronLog.findOne(&#123; jobId: <span className="text-emerald-300">"export_daily"</span> &#125;);</div>
              <div><span className="text-amber-300">const</span> resumeCursor = jobState?.lastProcessedCursor || 0; <span className="text-zinc-500">// Skip completed chunks</span></div>
            </div>
          </div>

          {/* Action Trigger Footer */}
          <div className="pt-2 border-t border-white/8 flex items-center justify-between gap-3">
            <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
              Failed chunks persist cursor position to CronLog &rarr; resume without re-running completed work
            </span>
            <button
              onClick={fireCronSimulation}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-all disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${isRunning ? "animate-spin" : ""}`} />
              <span>{isRunning ? "PROCESSING PIPELINE..." : "SIMULATE FAILURE & CRONLOG RESUME"}</span>
            </button>
          </div>
        </div>
      )}

      {/* ── MODE 3: RUNTIME-AWARE REQUESTS ── */}
      {activeMode === "runtime" && (
        <div className="h-full flex flex-col justify-between space-y-3">
          {/* Environment Selector Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/8">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 font-semibold">
              <Globe className="w-4 h-4 text-[#e8e4dc]" />
              <span>ISOMORPHIC EXECUTION RESOLVER</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {(["client", "server", "edge"] as const).map((env) => (
                <button
                  key={env}
                  onClick={() => setRuntimeEnv(env)}
                  className={`px-2 py-1 rounded uppercase transition-all ${
                    runtimeEnv === env
                      ? "bg-white/15 text-white font-bold border border-white/20"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>

          {/* Context Details Visualizer */}
          <div className="flex-1 flex flex-col justify-center space-y-3 py-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl border font-mono text-[11px] space-y-2 transition-all ${runtimeEnv === "client" ? "bg-white/10 border-white/30" : "bg-white/2 border-white/8 opacity-60"}`}>
                <div className="flex items-center gap-2 font-bold text-white">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CLIENT BROWSER</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Axios Request Interceptor + LocalStorage Bearer + Automatic Mutex Retry Queue
                </div>
              </div>

              <div className={`p-3 rounded-xl border font-mono text-[11px] space-y-2 transition-all ${runtimeEnv === "server" ? "bg-white/10 border-white/30" : "bg-white/2 border-white/8 opacity-60"}`}>
                <div className="flex items-center gap-2 font-bold text-white">
                  <Server className="w-3.5 h-3.5 text-amber-400" />
                  <span>NEXT.JS SSR SERVER</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Server Component Cookies() Header Resolution + Isolated Per-Request Context
                </div>
              </div>

              <div className={`p-3 rounded-xl border font-mono text-[11px] space-y-2 transition-all ${runtimeEnv === "edge" ? "bg-white/10 border-white/30" : "bg-white/2 border-white/8 opacity-60"}`}>
                <div className="flex items-center gap-2 font-bold text-white">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>EDGE WORKER</span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  Lightweight Fetch Interceptor + Zero Node.js Dependency Standard Headers
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/8 font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="text-zinc-500">// Dynamic Interceptor Resolution</div>
              <div>
                <span className="text-amber-300">export function</span> createApiClient() &#123;<br />
                &nbsp;&nbsp;<span className="text-zinc-400">if</span> (typeof window !== <span className="text-emerald-300">"undefined"</span>) <span className="text-[#e8e4dc]">return</span> attachClientInterceptors();<br />
                &nbsp;&nbsp;<span className="text-[#e8e4dc]">return</span> attachServerFetchInterceptors();<br />
                &#125;
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-white/8 flex items-center justify-between text-[10px] font-mono text-zinc-400">
            <span>ISOMORPHIC HANDLER: AUTOMATICALLY SEAMLESS ACROSS SSR &amp; CLIENT</span>
            <span className="text-emerald-400 font-bold uppercase">ENV: {runtimeEnv} ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
}

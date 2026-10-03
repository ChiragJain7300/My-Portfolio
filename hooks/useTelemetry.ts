"use client";

import { useEffect, useState } from "react";

export interface TelemetryData {
  domNodes: number;
  renderTimeMs: number;
  memoryUsageMB: number | null;
  fcp: number | null;
  lcp: number | null;
  status: "ONLINE" | "OPTIMAL" | "RECORDING";
  route: string;
}

export function useTelemetry(): TelemetryData {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    domNodes: 0,
    renderTimeMs: 12,
    memoryUsageMB: null,
    fcp: null,
    lcp: null,
    status: "ONLINE",
    route: "/",
  });

  useEffect(() => {
    const startTime = performance.now();

    // DOM node counter
    const updateMetrics = () => {
      const nodeCount = typeof document !== "undefined" ? document.querySelectorAll("*").length : 0;
      const elapsed = Math.round(performance.now() - startTime);

      let memMB: number | null = null;
      if (typeof window !== "undefined" && (performance as any).memory) {
        memMB = Math.round((performance as any).memory.usedJSHeapSize / (1024 * 1024));
      }

      setTelemetry((prev) => ({
        ...prev,
        domNodes: nodeCount,
        renderTimeMs: elapsed > 0 ? elapsed : 14,
        memoryUsageMB: memMB,
      }));
    };

    updateMetrics();

    // Observe Performance entries (FCP, LCP)
    if (typeof PerformanceObserver !== "undefined") {
      try {
        const fcpObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              setTelemetry((prev) => ({
                ...prev,
                fcp: Math.round(entry.startTime),
              }));
            }
          }
        });
        fcpObserver.observe({ type: "paint", buffered: true });

        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            setTelemetry((prev) => ({
              ...prev,
              lcp: Math.round(lastEntry.startTime),
            }));
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch {
        // Fallback gracefully
      }
    }

    const interval = setInterval(updateMetrics, 2500);
    return () => clearInterval(interval);
  }, []);

  return telemetry;
}

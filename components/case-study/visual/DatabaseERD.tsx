"use client";

import React from "react";

export function DatabaseERD() {
  return (
    <div className="p-5 sm:p-6 bg-[var(--color-surface0)]/80 border border-[var(--color-overlay0)]/40 rounded-md space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-overlay0)]/30">
        <div>
          <span className="font-mono text-xs uppercase text-[var(--color-purple)] font-semibold block">
            Visual Schema Architecture
          </span>
          <h4 className="font-sans text-base font-bold text-[var(--color-text)]">
            Entity Relationship &amp; Index Blueprint
          </h4>
        </div>
        <span className="font-mono text-xs text-[var(--color-green)]">
          [MongoDB 7.0 Document Models]
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {/* Entity 1: bolOffer */}
        <div className="border border-[var(--color-overlay0)]/50 bg-[var(--color-surface1)]/30 rounded-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-[var(--color-surface1)] border-b border-[var(--color-overlay0)]/40 flex items-center justify-between">
              <span className="font-bold text-[var(--color-text)]">📁 bolOffer</span>
              <span className="text-[10px] text-[var(--color-blue)]">[Collection]</span>
            </div>

            <div className="p-3 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">offerId</span>
                <span className="text-[var(--color-purple)] text-[10px]">PK · String</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">ean</span>
                <span className="text-[var(--color-green)] text-[10px]">INDEX · String</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">sku</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">String</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">stock</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">Number</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">price</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">Number</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">lastSynced</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">Date</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[var(--color-surface0)]/60 border-t border-[var(--color-overlay0)]/30 text-[10px] text-[var(--color-subtext1)] font-sans">
            Optimized for rapid set-difference pruning &amp; barcode lookups.
          </div>
        </div>

        {/* Entity 2: CronLog */}
        <div className="border border-[var(--color-overlay0)]/50 bg-[var(--color-surface1)]/30 rounded-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-[var(--color-surface1)] border-b border-[var(--color-overlay0)]/40 flex items-center justify-between">
              <span className="font-bold text-[var(--color-text)]">📁 CronLog</span>
              <span className="text-[10px] text-[var(--color-yellow)]">[Audit Trail]</span>
            </div>

            <div className="p-3 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">_id</span>
                <span className="text-[var(--color-purple)] text-[10px]">PK · ObjectId</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">task</span>
                <span className="text-[var(--color-green)] text-[10px]">INDEX · String</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">status</span>
                <span className="text-[var(--color-green)] text-[10px]">INDEX · &quot;✅&quot;|&quot;❌&quot;</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">durationMs</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">Number</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">error</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">String</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">timestamp</span>
                <span className="text-[var(--color-orange)] text-[10px]">TTL (30 Days)</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[var(--color-surface0)]/60 border-t border-[var(--color-overlay0)]/30 text-[10px] text-[var(--color-subtext1)] font-sans">
            Powering 07:00 AM self-healing retry query with automated TTL cleanup.
          </div>
        </div>

        {/* Entity 3: Token */}
        <div className="border border-[var(--color-overlay0)]/50 bg-[var(--color-surface1)]/30 rounded-md overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-2.5 bg-[var(--color-surface1)] border-b border-[var(--color-overlay0)]/40 flex items-center justify-between">
              <span className="font-bold text-[var(--color-text)]">📁 Token</span>
              <span className="text-[10px] text-[var(--color-green)]">[Singleton]</span>
            </div>

            <div className="p-3 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">_id</span>
                <span className="text-[var(--color-purple)] text-[10px]">PK · ObjectId</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">bolToken</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">String (Encrypted)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-text)] font-semibold">bolExpiresAt</span>
                <span className="text-[var(--color-green)] text-[10px]">Date (-30s Guard)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--color-subtext2)]">updatedAt</span>
                <span className="text-[var(--color-overlay2)] text-[10px]">Date</span>
              </div>
            </div>
          </div>

          <div className="p-2.5 bg-[var(--color-surface0)]/60 border-t border-[var(--color-overlay0)]/30 text-[10px] text-[var(--color-subtext1)] font-sans">
            Single document upsert ensuring race-free in-flight token reuse.
          </div>
        </div>
      </div>
    </div>
  );
}


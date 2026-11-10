"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useLenis } from "@/components/providers/LenisProvider";
import { CaseStudy } from "@/types/case-study";
import { CaseStudyHero } from "./CaseStudyHero";
import { CaseStudyTOC } from "./CaseStudyTOC";
import { QuantitativeImpact } from "./QuantitativeImpact";
import { IndentedTree } from "./IndentedTree";
import { DatabaseExplorer } from "./DatabaseExplorer";
import { CodeWalkthrough } from "./CodeWalkthrough";
import { ApiExplorer } from "./ApiExplorer";
import { DecisionMatrix } from "./DecisionMatrix";
import { InterviewTalkingPoints } from "./InterviewTalkingPoints";
import { SystemArchitectureDiagram } from "./visual/SystemArchitectureDiagram";
import { SetDifferenceDiagram } from "./visual/SetDifferenceDiagram";
import { DatabaseERD } from "./visual/DatabaseERD";
import { WdmIngestionTrace } from "./visual/WdmIngestionTrace";
import { TokenRefreshVisualizer } from "@/components/lab/TokenRefreshVisualizer";
import { SectionReveal } from "./SectionReveal";
import {
  Server,
  Layers,
  ArrowRight,
  Database,
  RefreshCw,
  Cpu,
  Clock,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

interface CaseStudyViewProps {
  caseStudy: CaseStudy;
  prevSlug?: string;
  nextSlug?: string;
}

export function CaseStudyView({ caseStudy, prevSlug, nextSlug }: CaseStudyViewProps) {
  const { lenis } = useLenis();
  const isWdm = caseStudy.slug === "wdm-platform";

  // Ensure navigating to this case study always scrolls to the very top and recalculates dimensions
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.resize();
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const t = setTimeout(() => {
      lenis?.resize();
    }, 200);

    return () => clearTimeout(t);
  }, [lenis, caseStudy.slug]);

  // Convert capabilities to tree nodes
  const capabilityTreeNodes = caseStudy.capabilities.map((cat) => ({
    label: cat.category,
    badge: "SUBSYSTEM",
    badgeColor: "var(--color-purple)",
    children: cat.items.map((item) => ({
      label: item,
    })),
  }));

  const integrations = [
    {
      name: "Bol.com Retailer API v10",
      type: "External Marketplace",
      protocol: "OAuth2 Bearer · REST",
      role: "Catalogue CSV exports, real-time stock & advertising telemetry",
      status: "Sync Active",
      badgeColor: "text-[var(--color-green)] border-[var(--color-green)]/30 bg-[var(--color-green)]/10",
    },
    {
      name: "Monday.com Work OS",
      type: "Operations & CRM",
      protocol: "GraphQL Mutations",
      role: "Inventory board status synchronization & product enrichment pipelines",
      status: "Automated",
      badgeColor: "text-[var(--color-purple)] border-[var(--color-purple)]/30 bg-[var(--color-purple)]/10",
    },
    {
      name: "Import4You Logistics",
      type: "Freight & Shipping",
      protocol: "RESTful JSON Polling",
      role: "Container shipment tracking & cross-dock ETA reconciliation",
      status: "Automated",
      badgeColor: "text-[var(--color-blue)] border-[var(--color-blue)]/30 bg-[var(--color-blue)]/10",
    },
    {
      name: "Channeldock WMS",
      type: "Warehouse Management",
      protocol: "REST API",
      role: "Multi-warehouse physical stock count updates & order allocations",
      status: "Automated",
      badgeColor: "text-[var(--color-orange)] border-[var(--color-orange)]/30 bg-[var(--color-orange)]/10",
    },
  ];

  return (
    <article className="font-sans text-sm text-[var(--color-subtext2)] select-text pb-28">
      {/* Hero Section */}
      <CaseStudyHero caseStudy={caseStudy} />

      {/* Main 2-Column Documentation Grid: Locked Left 240px + Content */}
      <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-10 xl:gap-14 pt-8 sm:pt-12 items-start">
        {/* Sticky Table of Contents Sidebar */}
        <CaseStudyTOC />

        {/* Narrative Flow Body */}
        <div className="min-w-0">
          {/* ========================================================================= */}
          {/* PART I: EXECUTIVE BRIEFING (60-SECOND RECRUITER PATH)                     */}
          {/* ========================================================================= */}

          {/* Section 01: Project Overview */}
          <section id="overview" className="scroll-mt-16 pt-2 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  01
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Project Overview &amp; Context
                </h2>
              </div>

              <div className="space-y-4 font-sans text-sm sm:text-base leading-[1.75] text-[var(--color-subtext2)] max-w-[70ch] mb-8">
                <p>{caseStudy.executiveSummary.overview}</p>
                <p>{caseStudy.executiveSummary.businessContext}</p>
              </div>

              {/* Visual Subsystem Architecture Ribbon */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--color-overlay2)]">
                  <span className="uppercase tracking-wider font-semibold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[var(--color-green)]" />
                    {isWdm
                      ? "Four Disparate Systems Unified Into One Autonomous Hub"
                      : "Core Architectural Subsystems & Infrastructure Topology"}
                  </span>
                  <span className="hidden sm:inline text-[var(--color-green)] font-semibold">
                    {isWdm ? "Zero Manual Data Entry" : "Active Production Topology"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {(isWdm ? integrations : caseStudy.architecture.components.slice(0, 4)).map((item, idx) => {
                    const fallbackBadgeColors = [
                      "text-[var(--color-green)] border-[var(--color-green)]/30 bg-[var(--color-green)]/10",
                      "text-[var(--color-purple)] border-[var(--color-purple)]/30 bg-[var(--color-purple)]/10",
                      "text-[var(--color-blue)] border-[var(--color-blue)]/30 bg-[var(--color-blue)]/10",
                      "text-[var(--color-orange)] border-[var(--color-orange)]/30 bg-[var(--color-orange)]/10",
                    ];
                    const badgeClass = ("badgeColor" in item && item.badgeColor) ? item.badgeColor : fallbackBadgeColors[idx % 4];

                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/35 space-y-2 flex flex-col justify-between hover:border-[var(--color-green)]/40 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] text-[var(--color-overlay2)] uppercase">
                              0{idx + 1} // {item.type}
                            </span>
                            <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded-xs border ${badgeClass}`}>
                              ● {"status" in item && item.status ? item.status : "Verified Subsystem"}
                            </span>
                          </div>
                          <h3 className="font-sans text-sm font-bold text-[var(--color-text)]">
                            {item.name}
                          </h3>
                          <span className="font-mono text-[10px] text-[var(--color-subtext1)] block truncate">
                            {"protocol" in item && typeof item.protocol === "string" ? item.protocol : ("tech" in item ? String(item.tech) : "Core Subsystem")}
                          </span>
                        </div>

                        <p className="font-sans text-xs text-[var(--color-subtext2)] leading-relaxed pt-2 border-t border-[var(--color-overlay0)]/20 line-clamp-3">
                          {item.role}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>
          </section>

          {/* Section 02: Business Problem */}
          <section id="problem" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  02
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Business Problem &amp; Bottlenecks
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="p-5 sm:p-6 bg-[var(--color-surface1)]/20 border border-[var(--color-red)]/40 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[var(--color-red)]" aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-[var(--color-red)] flex items-center gap-1.5">
                      <span>✕</span>
                      <span>The Core Engineering Problem:</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--color-red)]" aria-hidden="true" />
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[var(--color-subtext2)]">
                    {caseStudy.executiveSummary.coreProblem}
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-[var(--color-surface1)]/20 border border-[var(--color-green)]/40 rounded-xl space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-[var(--color-green)]" aria-hidden="true" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-[var(--color-green)] flex items-center gap-1.5">
                      <span>✓</span>
                      <span>Engineered Architectural Solution:</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--color-green)]" aria-hidden="true" />
                  </div>
                  <p className="font-sans text-sm sm:text-[15px] leading-relaxed text-[var(--color-subtext2)]">
                    {caseStudy.executiveSummary.solutionStatement}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </section>

          {/* Section 03: Quantitative Impact */}
          <section id="impact" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  03
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Quantitative Engineering Impact
                </h2>
              </div>

              {/* Upgraded Hero KPI Hierarchy Component */}
              <QuantitativeImpact metrics={caseStudy.impactMetrics} />
            </SectionReveal>
          </section>

          {/* Section 04: System Architecture (Visual Centerpiece) */}
          <section id="architecture" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  04
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  System Architecture
                </h2>
              </div>

              <p className="font-sans text-sm sm:text-base leading-[1.75] text-[var(--color-subtext2)] max-w-[70ch] mb-8">
                {caseStudy.architecture.summary}
              </p>

              {/* Visual Architecture Centerpiece */}
              {isWdm ? (
                <SystemArchitectureDiagram />
              ) : (
                <div className="space-y-6">
                  {/* Visual Subsystem Component Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.architecture.components.map((comp, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-[var(--color-surface0)]/90 border border-[var(--color-overlay0)]/40 space-y-3 relative overflow-hidden"
                      >
                        <div className="flex items-start justify-between gap-2 pb-2 border-b border-[var(--color-overlay0)]/20">
                          <div>
                            <span className="font-mono text-[10px] text-[var(--color-green)] font-semibold uppercase">
                              SUBSYSTEM // {comp.type}
                            </span>
                            <h3 className="font-sans text-base font-bold text-[var(--color-text)] mt-0.5">
                              {comp.name}
                            </h3>
                          </div>
                          <span className="font-mono text-[10.5px] px-2 py-0.5 rounded bg-[var(--color-surface1)] text-[var(--color-subtext1)] border border-[var(--color-overlay0)]/40 shrink-0">
                            {comp.tech}
                          </span>
                        </div>

                        <p className="text-xs text-[var(--color-subtext2)] leading-relaxed">
                          {comp.role}
                        </p>

                        {(comp.inputs || comp.outputs) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[var(--color-overlay0)]/20 font-mono text-[11px]">
                            {comp.inputs && (
                              <div>
                                <span className="text-[var(--color-overlay2)] block text-[10px]">INPUT:</span>
                                <span className="text-[var(--color-subtext1)] truncate block">{comp.inputs}</span>
                              </div>
                            )}
                            {comp.outputs && (
                              <div>
                                <span className="text-[var(--color-overlay2)] block text-[10px]">OUTPUT:</span>
                                <span className="text-[var(--color-subtext1)] truncate block">{comp.outputs}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {comp.failureMode && (
                          <div className="p-2.5 rounded bg-[var(--color-surface1)]/40 border border-[var(--color-overlay0)]/20 text-[11px] font-sans">
                            <span className="text-[var(--color-yellow)] font-mono text-[10px] font-semibold block mb-0.5">
                              RESILIENCE &amp; FAULT ISOLATION:
                            </span>
                            <span className="text-[var(--color-subtext2)] leading-relaxed">
                              {comp.failureMode}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sequential Pipeline Flow Stages */}
                  {caseStudy.architecture.dataFlowSteps && caseStudy.architecture.dataFlowSteps.length > 0 && (
                    <div className="rounded-xl border border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)]/60 overflow-hidden shadow-lg mt-6">
                      <div className="px-4 py-3 bg-[var(--color-surface1)]/50 border-b border-[var(--color-overlay0)]/30 flex items-center justify-between font-mono text-xs">
                        <span className="font-semibold text-[var(--color-green)] flex items-center gap-2">
                          <Server className="w-3.5 h-3.5" />
                          <span>End-to-End Sequential Execution Flow</span>
                        </span>
                        <span className="text-[var(--color-overlay2)] text-[11px]">
                          {caseStudy.architecture.dataFlowSteps.length} Verified Stages
                        </span>
                      </div>

                      <div className="divide-y divide-[var(--color-overlay0)]/20 font-mono text-xs">
                        {caseStudy.architecture.dataFlowSteps.map((step) => (
                          <div
                            key={step.step}
                            className="p-3.5 sm:p-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center hover:bg-white/[0.015] transition-colors"
                          >
                            <div className="sm:col-span-1 text-[var(--color-green)] font-bold text-sm">
                              0{step.step}
                            </div>
                            <div className="sm:col-span-4 font-sans text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                              <span className="text-[var(--color-overlay2)] text-xs block font-mono">
                                {step.from} &rarr; {step.to}
                              </span>
                              {step.action}
                            </div>
                            <div className="sm:col-span-7 font-mono text-[11px] text-[var(--color-purple)] sm:text-right">
                              <span className="px-2 py-0.5 rounded bg-[var(--color-purple)]/10 border border-[var(--color-purple)]/25">
                                {step.protocolOrPayload}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SectionReveal>
          </section>

          {/* Section 05: Pivotal Decisions & Trade-offs (ADR) */}
          <section id="decisions" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  05
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Pivotal Engineering Decisions &amp; Trade-offs (ADR)
                </h2>
              </div>

              {/* Quick Visual ADR Scorecard Table */}
              <div className="mb-8 rounded-xl border border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)]/60 overflow-hidden shadow-lg">
                <div className="px-4 py-3 bg-[var(--color-surface1)]/50 border-b border-[var(--color-overlay0)]/30 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--color-green)] flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Executive ADR Comparison Matrix</span>
                  </span>
                  <span className="font-mono text-[11px] text-[var(--color-overlay2)]">
                    Scannable Trade-offs
                  </span>
                </div>

                <div className="divide-y divide-[var(--color-overlay0)]/30 font-sans text-xs">
                  {caseStudy.decisions.map((adr) => (
                    <div
                      key={adr.id}
                      className="grid grid-cols-1 sm:grid-cols-12 p-3 sm:p-4 gap-2 sm:gap-4 items-center hover:bg-white/[0.015] transition-colors"
                    >
                      <div className="sm:col-span-3 font-mono font-bold text-[var(--color-text)]">
                        {adr.title.split(" vs. ")[0] || adr.title}
                      </div>
                      <div className="sm:col-span-4 text-[var(--color-green)] flex items-center gap-1.5 font-medium">
                        <span>✓</span>
                        <span>{adr.chosenApproach}</span>
                      </div>
                      <div className="sm:col-span-2 text-[var(--color-overlay2)] line-through">
                        {adr.alternativesConsidered[0] || "Legacy Alternative"}
                      </div>
                      <div className="sm:col-span-3 text-[var(--color-subtext1)] font-sans text-xs line-clamp-2">
                        {adr.rationale}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accordion Detail Breakdown */}
              <DecisionMatrix decisions={caseStudy.decisions} />
            </SectionReveal>
          </section>

          {/* Section 06: Production Incidents & Solutions (STAR) */}
          <section id="challenges" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  06
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Production Incidents &amp; Solutions (STAR Method)
                </h2>
              </div>

              <div className="space-y-8">
                {caseStudy.challenges.map((chal, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/40 rounded-xl space-y-5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-red)] via-[var(--color-purple)] to-[var(--color-green)]" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30 pt-1">
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-overlay2)] block font-semibold">
                          INCIDENT CASE 0{i + 1}
                        </span>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)] mt-0.5">
                          {chal.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-mono text-xs text-[var(--color-orange)] bg-[var(--color-orange)]/10 border border-[var(--color-orange)]/30 px-2 py-0.5 rounded-xs">
                          Difficulty: {chal.difficulty}
                        </span>
                        <span className="font-mono text-xs text-[var(--color-green)] bg-[var(--color-green)]/10 border border-[var(--color-green)]/30 px-2 py-0.5 rounded-xs font-semibold">
                          ✓ RESOLVED
                        </span>
                      </div>
                    </div>

                    {/* Sequential Cause -> Effect Timeline Flow */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-sans text-xs sm:text-sm relative">
                      {/* S: Situation */}
                      <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-red)]/30 rounded-lg space-y-1.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[var(--color-red)] font-mono text-xs font-bold uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-red)]" />
                            [S] Situation
                          </div>
                          <p className="text-[var(--color-subtext2)] leading-relaxed text-xs">
                            {chal.problem}
                          </p>
                        </div>
                        <div className="pt-2 font-mono text-[10px] text-[var(--color-red)] flex items-center gap-1">
                          <span>Bottleneck Identified</span>
                          <ArrowRight className="w-3 h-3 ml-auto" />
                        </div>
                      </div>

                      {/* T: Task / Investigation */}
                      <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-purple)]/30 rounded-lg space-y-1.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[var(--color-purple)] font-mono text-xs font-bold uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-purple)]" />
                            [T] Root Cause
                          </div>
                          <p className="text-[var(--color-subtext2)] leading-relaxed text-xs">
                            {chal.investigation}
                          </p>
                        </div>
                        <div className="pt-2 font-mono text-[10px] text-[var(--color-purple)] flex items-center gap-1">
                          <span>Telemetry Pinpointed</span>
                          <ArrowRight className="w-3 h-3 ml-auto" />
                        </div>
                      </div>

                      {/* A: Action / Solution */}
                      <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-green)]/30 rounded-lg space-y-1.5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-[var(--color-green)] font-mono text-xs font-bold uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-green)]" />
                            [A] Implemented Fix
                          </div>
                          <p className="text-[var(--color-subtext2)] leading-relaxed text-xs">
                            {chal.solution}
                          </p>
                        </div>
                        <div className="pt-2 font-mono text-[10px] text-[var(--color-green)] flex items-center gap-1">
                          <span>Shipped to Prod</span>
                          <ArrowRight className="w-3 h-3 ml-auto" />
                        </div>
                      </div>

                      {/* R: Result / Outcome */}
                      <div className="p-4 bg-[var(--color-surface0)]/90 border border-[var(--color-blue)]/40 rounded-lg space-y-1.5 flex flex-col justify-between bg-gradient-to-b from-[var(--color-surface0)]/90 to-[var(--color-blue)]/10">
                        <div>
                          <div className="flex items-center gap-1.5 text-[var(--color-blue)] font-mono text-xs font-bold uppercase mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)]" />
                            [R] Measurable Result
                          </div>
                          <p className="text-[var(--color-text)] font-medium leading-relaxed text-xs">
                            {chal.outcome}
                          </p>
                        </div>
                        <div className="pt-2 font-mono text-[10px] text-[var(--color-green)] font-bold">
                          ✓ 100% OPERATIONAL RECOVERY
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </section>

          {/* ========================================================================= */}
          {/* EDITORIAL BOUNDARY: 60-SECOND BRIEFING ENDS / TECHNICAL APPENDIX BEGINS  */}
          {/* ========================================================================= */}
          <SectionReveal>
            <div className="my-16 sm:my-20 p-6 sm:p-8 bg-gradient-to-r from-[var(--color-surface0)]/90 via-[var(--color-surface1)]/30 to-[var(--color-surface0)]/90 border border-[var(--color-green)]/30 rounded-xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-green)] via-[var(--color-purple)] to-[var(--color-blue)]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-green)] font-bold">
                      // RECRUITER 60-SECOND BRIEFING COMPLETE
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--color-green)] animate-ping" />
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-[var(--color-text)] mt-1.5">
                    Technical Appendix &amp; Architectural Blueprints
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[var(--color-subtext2)] mt-1 max-w-2xl leading-relaxed">
                    Runtime telemetry logs, database schemas, API contracts, production code walkthroughs, and live concurrency simulations.
                  </p>
                </div>

                <div className="font-mono text-xs text-[var(--color-overlay2)] shrink-0 sm:text-right hidden sm:block">
                  <span className="text-[var(--color-green)] font-bold">SECTIONS 07 — 12</span>
                  <span className="block text-[10px] text-[var(--color-overlay2)] mt-0.5">↓ ARCHITECTURE DEEP DIVE</span>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* ========================================================================= */}
          {/* PART II: TECHNICAL APPENDIX                                               */}
          {/* ========================================================================= */}

          {/* Section 07: Pipeline & Execution Trace */}
          <section id="pipeline-trace" className="scroll-mt-16 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  07
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  {isWdm
                    ? "Operational Ingestion Pipeline & Execution Trace"
                    : "End-to-End Pipeline & Operational Execution Trace"}
                </h2>
              </div>

              {isWdm ? (
                <div className="space-y-10">
                  {/* Operational Trace Artifact */}
                  <WdmIngestionTrace />

                  {/* Algorithmic Highlight */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between pb-2">
                      <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                        Algorithmic Highlight: Set-Difference Reconciliation ($A \setminus B$)
                      </h3>
                      <span className="font-mono text-xs text-[var(--color-purple)] hidden sm:inline">
                        [O(n) In-Memory Delta]
                      </span>
                    </div>
                    <SetDifferenceDiagram />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Interactive Execution Flow Cards */}
                  <div className="rounded-xl border border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)]/80 p-5 sm:p-6 space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-overlay0)]/30">
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[var(--color-green)] font-semibold">
                          VERIFIED EXECUTION PIPELINE // {caseStudy.slug}.md
                        </span>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)] mt-0.5">
                          Sequential Operational Runtime Trace
                        </h3>
                      </div>
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-[var(--color-green)]/10 border border-[var(--color-green)]/30 text-[var(--color-green)] font-semibold shrink-0">
                        {caseStudy.architecture.dataFlowSteps.length} Stages Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {caseStudy.architecture.dataFlowSteps.map((step) => (
                        <div
                          key={step.step}
                          className="p-4 rounded-lg bg-[var(--color-surface1)]/30 border border-[var(--color-overlay0)]/30 space-y-2 flex flex-col justify-between hover:border-[var(--color-green)]/30 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between font-mono text-xs">
                              <span className="text-[var(--color-green)] font-bold">
                                STAGE 0{step.step}
                              </span>
                              <span className="text-[var(--color-overlay2)] text-[11px]">
                                {step.from} &rarr; {step.to}
                              </span>
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-[var(--color-text)] font-medium leading-snug">
                              {step.action}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-[var(--color-overlay0)]/20 font-mono text-[10.5px] text-[var(--color-purple)]">
                            <span className="opacity-70">PROTOCOL / PAYLOAD: </span>
                            <span className="font-semibold">{step.protocolOrPayload}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </SectionReveal>
          </section>

          {/* Section 08: Database Design & ERD */}
          <section id="database" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  08
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Database Design &amp; Schema
                </h2>
              </div>

              <div className="space-y-10">
                {isWdm && <DatabaseERD />}
                <DatabaseExplorer
                  engine={caseStudy.database.engine}
                  designPhilosophy={caseStudy.database.designPhilosophy}
                  tables={caseStudy.database.tables}
                />
              </div>
            </SectionReveal>
          </section>

          {/* Section 09: API & Integrations */}
          <section id="api" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  09
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  API Architecture &amp; Integrations
                </h2>
              </div>

              <ApiExplorer
                summary={caseStudy.apiArchitecture.summary}
                endpoints={caseStudy.apiArchitecture.endpoints}
              />
            </SectionReveal>
          </section>

          {/* Section 10: Code Implementation Walkthrough */}
          <section id="code" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  10
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Production Code Implementation
                </h2>
              </div>

              <CodeWalkthrough
                summary={caseStudy.codeWalkthrough.summary}
                snippets={caseStudy.codeWalkthrough.snippets}
              />
            </SectionReveal>
          </section>

          {/* Section 11: Subsystems, Resilience & Concurrency */}
          <section id="resilience" className="scroll-mt-16 pt-16 sm:pt-24 pb-16 sm:pb-24 border-b border-[var(--color-overlay0)]/30">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  11
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Subsystems, Fault Resilience &amp; Concurrency Simulation
                </h2>
              </div>

              <div className="space-y-10">
                {/* Feature Capabilities Tree */}
                <div className="space-y-4">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                    Modular Subsystems Breakdown
                  </h3>
                  <IndentedTree
                    title={`${caseStudy.title} Subsystems`}
                    nodes={capabilityTreeNodes}
                  />
                </div>

                {/* Self-Healing Cron Architecture Visual Sequence Flow */}
                <div className="space-y-4 pt-4 border-t border-[var(--color-overlay0)]/20">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                      {isWdm ? "Fault Isolation & Autonomous Cron Recovery Flow" : "Resilience Engineering & Fault Isolation Matrix"}
                    </h3>
                    <span className="font-mono text-xs text-[var(--color-green)] font-semibold">
                      {isWdm ? "[Self-Healing Daemon]" : "[Active Fail-Safes]"}
                    </span>
                  </div>

                  {/* Visual Step-by-Step Flow */}
                  <div className="p-5 rounded-xl bg-[var(--color-surface0)]/80 border border-[var(--color-overlay0)]/35 space-y-4">
                    {isWdm ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-lg bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/30 space-y-1">
                          <span className="text-[10px] text-[var(--color-overlay2)] block">STAGE 01</span>
                          <span className="text-[var(--color-green)] font-bold block">04:00 AM Cron Pipeline</span>
                          <p className="text-[11px] text-[var(--color-subtext2)] font-sans">
                            Executes morning sync tasks sequentially via Promise.allSettled().
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/30 space-y-1">
                          <span className="text-[10px] text-[var(--color-overlay2)] block">STAGE 02</span>
                          <span className="text-[var(--color-purple)] font-bold block">Isolated Boundaries</span>
                          <p className="text-[11px] text-[var(--color-subtext2)] font-sans">
                            Each external API call is trapped in a domain try/catch block.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[var(--color-surface1)]/50 border border-[var(--color-red)]/30 space-y-1">
                          <span className="text-[10px] text-[var(--color-red)] block">STAGE 03</span>
                          <span className="text-[var(--color-red)] font-bold block">CronLog Error Flag</span>
                          <p className="text-[11px] text-[var(--color-subtext2)] font-sans">
                            Transient errors are recorded with stack trace and status: ❌.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-[var(--color-surface1)]/50 border border-[var(--color-green)]/40 space-y-1 bg-[var(--color-green)]/5">
                          <span className="text-[10px] text-[var(--color-green)] block">STAGE 04</span>
                          <span className="text-[var(--color-green)] font-bold block">07:00 AM Auto-Recovery</span>
                          <p className="text-[11px] text-[var(--color-subtext2)] font-sans">
                            Daemon re-executes only failed tasks; updates audit log to ✅.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
                        {caseStudy.architecture.components.slice(0, 3).map((comp, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-[var(--color-surface1)]/50 border border-[var(--color-overlay0)]/30 space-y-1">
                            <span className="text-[10px] text-[var(--color-overlay2)] block uppercase">BOUNDARY 0{idx + 1}</span>
                            <span className="text-[var(--color-green)] font-bold block">{comp.name}</span>
                            <p className="text-[11px] text-[var(--color-subtext2)] font-sans">
                              {comp.failureMode || comp.role}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Resilience Mechanism Cards */}
                  {caseStudy.resilienceAndRecovery && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      {caseStudy.resilienceAndRecovery.mechanisms.map((mech, i) => (
                        <div
                          key={i}
                          className="p-4 sm:p-5 bg-[var(--color-surface1)]/25 border border-[var(--color-overlay0)]/40 rounded-xl space-y-2.5 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-sans text-sm font-bold text-[var(--color-text)]">
                                {mech.name}
                              </h4>
                              <span className="font-mono text-[10px] text-[var(--color-green)] font-semibold">
                                [RESILIENT]
                              </span>
                            </div>
                            <p className="font-sans text-xs text-[var(--color-subtext2)] leading-relaxed mt-1.5">
                              <strong className="text-[var(--color-red)]">Failure Mode:</strong> {mech.problem}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[var(--color-overlay0)]/20 font-sans text-xs text-[var(--color-green)] leading-relaxed">
                            <strong>Recovery:</strong> {mech.recoveryScenario}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Mutex Concurrency Simulation (WDM Only) */}
                {isWdm && (
                  <div className="space-y-4 pt-4 border-t border-[var(--color-overlay0)]/20">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                          Live Mutex Lock &amp; Single-Flight Concurrency Simulator
                        </h3>
                        <p className="font-sans text-xs text-[var(--color-subtext2)] mt-0.5">
                          Interactive demonstration of single-flight mutex token locking preventing redundant remote handshakes.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-[var(--color-yellow)] shrink-0">
                        [Interactive Lab]
                      </span>
                    </div>

                    <div className="border border-[var(--color-overlay0)]/40 bg-[var(--color-base)] p-3.5 rounded-xl overflow-hidden shadow-xl">
                      <TokenRefreshVisualizer activeMode="single-flight" />
                    </div>
                  </div>
                )}
              </div>
            </SectionReveal>
          </section>

          {/* Section 12: Interview Talking Points & V2 Roadmap */}
          <section id="interview-defense" className="scroll-mt-16 pt-16 sm:pt-24 pb-16">
            <SectionReveal>
              <div className="flex items-center gap-2.5 pb-3.5 mb-6 border-b border-[var(--color-overlay0)]/30">
                <span className="font-mono text-xs font-bold text-[var(--color-green)] px-2 py-0.5 rounded-xs border border-[var(--color-green)]/40 bg-[var(--color-green)]/10">
                  12
                </span>
                <h2 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
                  Interview Defense &amp; V2 Roadmap
                </h2>
              </div>

              <div className="space-y-10">
                {/* Interview Talking Points */}
                <div className="space-y-4">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                    Recruiter &amp; Engineering Interview Q&amp;A Cheat Sheet
                  </h3>
                  <InterviewTalkingPoints points={caseStudy.interviewTalkingPoints} />
                </div>

                {/* V2 Architectural Evolution: Now / Next / Later Table */}
                <div className="space-y-4 pt-4 border-t border-[var(--color-overlay0)]/20">
                  <h3 className="font-sans text-base sm:text-lg font-bold text-[var(--color-text)]">
                    Architectural Evolution: Now (V1) ➔ Next (V2) ➔ Vision (V3)
                  </h3>

                  <div className="rounded-xl border border-[var(--color-overlay0)]/40 bg-[var(--color-surface0)]/80 overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-overlay0)]/30">
                      {/* V1 Current */}
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-green)]" />
                          <span className="font-mono text-xs font-bold text-[var(--color-green)] uppercase">
                            Now: V1 Production (Current)
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs font-sans text-[var(--color-subtext2)]">
                          {isWdm ? (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-green)]">✓</span>
                                <span>Node-cron scheduled 04:00 AM pipeline</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-green)]">✓</span>
                                <span>MongoDB-cached OAuth2 token with 30s buffer</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-green)]">✓</span>
                                <span>EAN Set-Difference in-memory reconciler</span>
                              </li>
                            </>
                          ) : (
                            caseStudy.impactMetrics.slice(0, 3).map((metric, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[var(--color-green)]">✓</span>
                                <span>
                                  <strong>{metric.label}:</strong> {metric.detail}
                                </span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      {/* V2 Next */}
                      <div className="p-4 sm:p-5 space-y-3 bg-[var(--color-surface1)]/20">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-purple)]" />
                          <span className="font-mono text-xs font-bold text-[var(--color-purple)] uppercase">
                            Next: V2 Architecture Target
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs font-sans text-[var(--color-subtext2)]">
                          {isWdm ? (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-purple)]">➜</span>
                                <span>BullMQ worker queue with delayed retry jobs</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-purple)]">➜</span>
                                <span>Redis Cluster token caching with sub-millisecond TTL</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-purple)]">➜</span>
                                <span>Exponential backoff with jitter on Bol.com export polling</span>
                              </li>
                            </>
                          ) : (
                            caseStudy.futureImprovements.slice(0, 2).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[var(--color-purple)]">➜</span>
                                <span>{item}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>

                      {/* V3 Vision */}
                      <div className="p-4 sm:p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-blue)]" />
                          <span className="font-mono text-xs font-bold text-[var(--color-blue)] uppercase">
                            Vision: V3 Scale Evolution
                          </span>
                        </div>
                        <ul className="space-y-2 text-xs font-sans text-[var(--color-subtext2)]">
                          {isWdm ? (
                            <>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-blue)]">✦</span>
                                <span>Event-driven marketplace webhooks replacing cron polling</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-blue)]">✦</span>
                                <span>Multi-region MongoDB replica sets with read preference</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-[var(--color-blue)]">✦</span>
                                <span>OpenTelemetry distributed tracing across all 4 external APIs</span>
                              </li>
                            </>
                          ) : (
                            caseStudy.futureImprovements.slice(2, 4).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-[var(--color-blue)]">✦</span>
                                <span>{item}</span>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </section>

          {/* Pagination Navigation Footer */}
          <footer className="pt-12 border-t border-[var(--color-overlay0)]/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            {prevSlug ? (
              <Link
                href={`/projects/${prevSlug}`}
                className="ide-btn text-xs min-h-[44px]"
                style={{ "--btn-color": "var(--color-purple)" } as React.CSSProperties}
              >
                <span>←</span>
                <span>{prevSlug}.md</span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/#projects"
              className="ide-btn text-xs min-h-[44px]"
              style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
            >
              <span>↑ back to portfolio / projects</span>
            </Link>

            {nextSlug ? (
              <Link
                href={`/projects/${nextSlug}`}
                className="ide-btn text-xs min-h-[44px]"
                style={{ "--btn-color": "var(--color-purple)" } as React.CSSProperties}
              >
                <span>{nextSlug}.md</span>
                <span>→</span>
              </Link>
            ) : (
              <div />
            )}
          </footer>
        </div>
      </div>
    </article>
  );
}
export default CaseStudyView;

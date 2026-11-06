import React from "react";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data";
import { getCaseStudyBySlug, getAllCaseStudies } from "@/content/case-studies";
import { CaseStudyView } from "@/components/case-study/CaseStudyView";
import type { Metadata } from "next";

export function generateStaticParams() {
  const caseStudySlugs = getAllCaseStudies().map((c) => ({ slug: c.slug }));
  const projectSlugs = projects.map((p) => ({ slug: p.slug }));

  const slugMap = new Map();
  [...projectSlugs, ...caseStudySlugs].forEach((item) => {
    slugMap.set(item.slug, item);
  });

  return Array.from(slugMap.values());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  const project = getProjectBySlug(slug);

  if (!project && !caseStudy) return { title: "Project Not Found" };

  return {
    title: `${caseStudy ? caseStudy.title : project?.title} ~ Chirag Jain`,
    description: caseStudy ? caseStudy.tagline : project?.des,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!project && !caseStudy) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  if (caseStudy) {
    return (
      <main id="main-content" className="min-h-screen bg-[#1c2225] text-[#adc9bc] px-4 sm:px-8 py-8 sm:py-12 [scrollbar-gutter:stable]">
        <div className="max-w-7xl mx-auto">
          <CaseStudyView
            caseStudy={caseStudy}
            prevSlug={prevProject?.slug}
            nextSlug={nextProject?.slug}
          />
        </div>
      </main>
    );
  }

  // Fallback for projects that don't have a full case study yet
  return (
    <main id="main-content" className="min-h-screen bg-[#1c2225] text-[#adc9bc] px-4 sm:px-8 py-8 sm:py-12 [scrollbar-gutter:stable]">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between text-xs text-[var(--color-subtext1)] pb-2 border-b border-[var(--color-overlay0)]/40 font-mono">
          <a
            href="/#projects"
            className="ide-btn"
            style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
          >
            <span>←</span>
            <span>back to portfolio / projects</span>
          </a>
          <span className="text-[10px] text-[var(--color-overlay2)]">
            ID: #{project?.id} · {project?.category.toUpperCase()}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text)]">
          {project?.title}
        </h1>
        <p className="text-sm text-[var(--color-purple)] font-mono font-medium">
          Category: {project?.categoryLabel}
        </p>

        <div className="border-l-2 border-[var(--color-green)] pl-3 py-1 bg-[var(--color-surface1)]/40 text-sm text-[var(--color-subtext2)] leading-relaxed font-sans">
          {project?.des}
        </div>

        {/* Highlights */}
        <div className="space-y-2">
          <h2 className="text-xs uppercase font-bold text-[var(--color-subtext2)] font-mono">
            ## Architectural Highlights
          </h2>
          <ul className="space-y-2 list-none pl-0 text-sm">
            {project?.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-[var(--color-subtext0)] bg-[var(--color-surface1)]/20 p-2.5 border border-[var(--color-overlay0)]/40 font-sans"
              >
                <span className="text-[var(--color-green)] select-none font-bold">▪</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="space-y-2 font-mono">
          <h2 className="text-xs uppercase font-bold text-[var(--color-subtext2)]">
            ## Tech Stack &amp; Dependencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {project?.tags.map((tag) => (
              <span
                key={tag}
                className="ide-btn text-xs"
                style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="pt-6 border-t border-[var(--color-overlay0)]/40 flex items-center gap-4 text-xs font-mono">
          {project?.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="ide-btn"
              style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
            >
              <span>↗</span>
              <span>Launch Live System</span>
            </a>
          )}
          {project?.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="ide-btn"
              style={{ "--btn-color": "var(--color-blue)" } as React.CSSProperties}
            >
              <span>↗</span>
              <span>Inspect Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </main>
  );
}


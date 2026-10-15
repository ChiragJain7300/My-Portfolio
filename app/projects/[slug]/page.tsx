import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProjectBySlug } from "@/data";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} ~ Chirag Jain`,
    description: project.des,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="space-y-6 pt-2 pb-16 font-mono">
      {/* Top Breadcrumb & Back Link */}
      <div className="flex items-center justify-between text-xs text-[var(--color-subtext1)] pb-2 border-b border-[var(--color-overlay0)]/40">
        <Link
          href="/projects"
          className="ide-btn"
          style={{ "--btn-color": "var(--color-green)" } as React.CSSProperties}
        >
          <span>←</span>
          <span>back to projects/</span>
        </Link>
        <span className="text-[10px] text-[var(--color-overlay2)]">
          ID: #{project.id} · {project.category.toUpperCase()}
        </span>
      </div>

      {/* Main Title & Metadata */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
          # {project.title}
        </h1>
        <div className="mt-2 text-xs sm:text-sm text-[var(--color-purple)] font-medium">
          Category: {project.categoryLabel}
        </div>
      </div>

      {/* Description */}
      <div className="border-l-2 border-[var(--color-green)] pl-3 py-1 bg-[var(--color-surface1)]/40 text-xs sm:text-sm text-[var(--color-subtext2)] leading-relaxed">
        {project.des}
      </div>

      {/* Hero Visual / Screenshot if available */}
      {project.img && (
        <div className="border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/20 p-2 overflow-hidden">
          <div className="relative w-full aspect-video max-h-[360px]">
            <Image
              src={project.img}
              alt={project.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
          <div className="mt-2 text-[10px] text-[var(--color-overlay2)] text-right">
            [screenshot: {project.img.replace(/^\//, "")}]
          </div>
        </div>
      )}

      {/* Architecture Highlights */}
      <div className="space-y-2">
        <div className="text-xs uppercase font-bold text-[var(--color-subtext2)]">
          ## Architectural Highlights & Capabilities
        </div>
        <ul className="space-y-2 list-none pl-0 text-xs sm:text-sm">
          {project.highlights.map((highlight, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-[var(--color-subtext0)] bg-[var(--color-surface1)]/20 p-2.5 border border-[var(--color-overlay0)]/40"
            >
              <span className="text-[var(--color-green)] select-none font-bold">▪</span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <div className="text-xs uppercase font-bold text-[var(--color-subtext2)]">
          ## Tech Stack & Dependencies
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
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

      {/* Deployment & Repository Dispatch */}
      <div className="p-4 border border-[var(--color-overlay0)] bg-[var(--color-surface1)]/30 space-y-3">
        <div className="text-xs font-bold text-[var(--color-text)]">
          ## Deployment & Access
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {project.link && project.link !== "#contact" && (
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

          {project.isPrivate ? (
            <span className="text-[var(--color-overlay2)] text-xs px-2 py-1 bg-[var(--color-surface1)] border border-[var(--color-overlay0)]">
              🔒 Proprietary System (Client NDA Protected)
            </span>
          ) : (
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

      {/* File Pagination */}
      <div className="pt-6 border-t border-[var(--color-overlay0)] flex items-center justify-between text-xs">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="ide-btn"
            style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
          >
            <span>← {prevProject.slug}.md</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="ide-btn"
            style={{ "--btn-color": "var(--color-subtext2)" } as React.CSSProperties}
          >
            <span>{nextProject.slug}.md →</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </article>
  );
}

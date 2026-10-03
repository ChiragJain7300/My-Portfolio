"use client";

import React, { useState } from "react";
import { developerProfile } from "@/data";
import { Copy, Check, ArrowUpRight, Mail, Globe } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 0 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(developerProfile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative min-h-screen flex flex-col justify-between py-14 sm:py-20 md:py-24 px-4 md:px-8 lg:px-12 bg-[#09090b] border-t border-white/8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#e8e4dc] font-bold">[04]</span>
            <span className="tracking-wide uppercase text-zinc-300 font-semibold">
              DIRECT INITIATION · CONTACT
            </span>
          </div>

          <h2 className="text-[clamp(2.2rem,8vw,7rem)] font-sans font-black tracking-tight text-white uppercase leading-[0.95]"
          >
            Ready to ship<br />production systems.
          </h2>

          <p className="text-sm md:text-base text-zinc-300 leading-relaxed" style={{ maxWidth: "440px" }}>
            Currently open to senior engineering roles, high-impact contract systems, and technical advisory.
          </p>
        </div>

        {/* Editorial Flat Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/8">
          {/* Primary Email Column */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-2">
                <Mail className="w-3.5 h-3.5" />
                <span>PRIMARY INBOX</span>
              </div>
              <div className="text-2xl md:text-3xl font-bold font-sans text-white break-all">
                {developerProfile.email}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${developerProfile.email}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8e4dc] text-zinc-950 font-mono text-xs font-bold hover:bg-white transition-all active:scale-95"
              >
                <span>WRITE AN EMAIL</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-200 font-mono text-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>
            </div>
          </div>

          {/* Social and Networks Column */}
          <div className="space-y-6">
            <div className="font-mono text-xs text-zinc-400">NETWORKS &amp; REPOSITORIES</div>

            <div className="divide-y divide-white/8 font-mono text-xs">
              <a
                href={developerProfile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 hover:text-white transition-colors group"
              >
                <span className="flex items-center gap-2.5 text-zinc-200 group-hover:text-white">
                  <GithubIcon className="w-4 h-4 text-zinc-400" />
                  <span>GITHUB / ChiragJain7300</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={developerProfile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 hover:text-white transition-colors group"
              >
                <span className="flex items-center gap-2.5 text-zinc-200 group-hover:text-white">
                  <LinkedinIcon className="w-4 h-4 text-zinc-400" />
                  <span>LINKEDIN / in/chirag-jain-7300</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 pt-2">
              <Globe className="w-3.5 h-3.5 text-zinc-400" />
              <span>India · Available for remote positions globally</span>
            </div>
          </div>
        </div>

        {/* Footer Base Note */}
        <div className="pt-12 border-t border-white/8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div>
            <span>© 2026 CHIRAG JAIN · ASSEMBLED WITH EDITORIAL CRAFT</span>
          </div>
          <div className="flex items-center gap-4">
            <span>NEXT.JS 16 APP ROUTER</span>
            <span>·</span>
            <span>LENIS &amp; FRAMER MOTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

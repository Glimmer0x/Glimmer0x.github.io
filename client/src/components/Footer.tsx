/*
 * Footer — Computational Naturalism
 * Minimal footer with copyright, quick links, and external links
 */

import { Github, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#1A1A1A]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright + tagline */}
        <div>
          <p className="font-body text-xs font-light tracking-[0.15em] text-[#FAFAF8]/40">
            © {year} Liangxi Liu (Glimmer)
          </p>
          <p className="font-body text-[10px] font-light tracking-[0.1em] text-[#FAFAF8]/20 mt-1">
            AI · Systems · Computational Biology
          </p>
        </div>

        {/* External links only */}
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="font-body text-xs font-light tracking-[0.15em] uppercase text-[#FAFAF8]/35 hover:text-[#8B7355] transition-colors duration-300"
          >
            Blog
          </Link>
          <a
            href="https://github.com/Glimmer0x"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-light tracking-[0.15em] uppercase text-[#FAFAF8]/35 hover:text-[#8B7355] transition-colors duration-300 flex items-center gap-1.5"
          >
            <Github size={12} />
            GitHub
          </a>
          <a
            href="https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs font-light tracking-[0.15em] uppercase text-[#FAFAF8]/35 hover:text-[#8B7355] transition-colors duration-300 flex items-center gap-1.5"
          >
            <BookOpen size={12} />
            Scholar
          </a>
        </div>
      </div>
    </footer>
  );
}

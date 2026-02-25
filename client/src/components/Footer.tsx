/*
 * Footer — Computational Naturalism
 * Minimal footer with copyright, quick links, and external links
 */

import { Github, BookOpen } from "lucide-react";
import { Link } from "wouter";

const scrollItems = ["About", "Experience", "Research", "Projects", "Contact"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#1A1A1A]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="font-body text-xs font-light tracking-[0.15em] text-[#FAFAF8]/30">
          © {year} Liangxi Liu (Glimmer). All rights reserved.
        </p>

        {/* Nav links */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {scrollItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#FAFAF8]/30 hover:text-[#8B7355] transition-colors duration-300"
            >
              {item}
            </button>
          ))}

          {/* Blog link */}
          <Link
            href="/blog"
            className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#FAFAF8]/30 hover:text-[#8B7355] transition-colors duration-300"
          >
            Blog
          </Link>

          {/* GitHub external */}
          <a
            href="https://github.com/Glimmer0x"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAFAF8]/30 hover:text-[#8B7355] transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>

          {/* Google Scholar external */}
          <a
            href="https://scholar.google.com/citations?user=LOsVJ_8AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FAFAF8]/30 hover:text-[#8B7355] transition-colors duration-300"
            aria-label="Google Scholar"
          >
            <BookOpen size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

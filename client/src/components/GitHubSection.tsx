/*
 * GitHubSection — Quiet Luxury Minimalism
 * Displays GitHub contribution heatmap for Glimmer0x
 * Uses react-github-calendar with custom warm bronze theme
 */

import { useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Github, ExternalLink } from "lucide-react";

const GITHUB_USERNAME = "Glimmer0x";
const GITHUB_URL = "https://github.com/Glimmer0x";

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

// Custom warm bronze color theme matching the design system
const warmBronzeTheme = {
  light: [
    "#F0EBE3",   // empty — warm off-white
    "#E0D3C0",   // level 1
    "#C9B898",   // level 2
    "#AE9470",   // level 3
    "#8B7355",   // level 4 — full accent bronze
  ] as [string, string, string, string, string],
  dark: [
    "#F0EBE3",
    "#E0D3C0",
    "#C9B898",
    "#AE9470",
    "#8B7355",
  ] as [string, string, string, string, string],
};

export default function GitHubSection() {
  const headingRef = useScrollReveal();
  const calendarRef = useScrollReveal(0.05);

  return (
    <section id="github" className="py-28 md:py-36 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-16">
          <p className="section-label mb-4">06 — Open Source</p>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="flex items-end gap-6">
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
                GitHub
              </h2>
              <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block min-w-[60px]" />
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#8B7355] border border-[#C4B9A8] px-5 py-2.5 hover:border-[#8B7355] hover:bg-[#8B7355]/5 transition-all duration-400 mb-3"
            >
              <Github size={14} />
              @{GITHUB_USERNAME}
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>
          <p className="font-body text-base font-light text-[#1A1A1A]/50 mt-4 max-w-xl">
            Contributions across federated learning research, blockchain infrastructure, and AI tooling.
          </p>
        </div>

        {/* Contribution Calendar */}
        <div
          ref={calendarRef}
          className="fade-in-up"
          style={{ transitionDelay: "0.1s" }}
        >
          <div className="p-8 md:p-10 border border-[#C4B9A8]/40 bg-[#FAFAF8]">
            {/* Calendar label */}
            <p className="section-label mb-6">Contribution Activity · Last 12 Months</p>

            {/* Calendar wrapper */}
            <div className="overflow-x-auto pb-2">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                theme={warmBronzeTheme}
                colorScheme="light"
                blockSize={13}
                blockMargin={4}
                fontSize={12}
                style={{
                  fontFamily: "'Jost', system-ui, sans-serif",
                  color: "rgba(26,26,26,0.45)",
                  minWidth: "680px",
                }}
                labels={{
                  totalCount: "{{count}} contributions in the last year",
                }}
              />
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-5 justify-end">
              <span className="font-body text-xs text-[#1A1A1A]/35">Less</span>
              {warmBronzeTheme.light.map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: color,
                    border: "1px solid rgba(196,185,168,0.3)",
                  }}
                />
              ))}
              <span className="font-body text-xs text-[#1A1A1A]/35">More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

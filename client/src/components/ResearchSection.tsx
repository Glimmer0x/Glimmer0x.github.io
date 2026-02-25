/*
 * ResearchSection — Quiet Luxury Minimalism
 * Publications sourced from Google Scholar (auto-synced data)
 * Shows citation counts, venue badges, featured papers
 */

import { useEffect, useRef } from "react";
import { ExternalLink, BookOpen, Quote } from "lucide-react";
import { publications, scholarStats, type Publication } from "@/data/publications";

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

const venueColorMap: Record<string, string> = {
  "NeurIPS": "#6B8B7A",
  "TPAMI": "#8B7355",
  "BIBM": "#7A6B8B",
  "DOCS": "#7A8B6B",
  "VTC": "#8B6B7A",
  "arXiv": "#6B7A8B",
};

function getVenueColor(venue: string): string {
  for (const [key, color] of Object.entries(venueColorMap)) {
    if (venue.toUpperCase().includes(key)) return color;
  }
  return "#8B7355";
}

function getVenueBadge(venue: string): string {
  if (venue.includes("NeurIPS")) return "NeurIPS 2024";
  if (venue.includes("TPAMI")) return "TPAMI 2023";
  if (venue.includes("BIBM")) return "IEEE BIBM 2025";
  if (venue.includes("DOCS")) return "IEEE DOCS 2024";
  if (venue.includes("VTC")) return "IEEE VTC 2019";
  if (venue.includes("arXiv")) return "arXiv 2025";
  return venue.split(",")[0].trim().substring(0, 30);
}

export default function ResearchSection() {
  const headingRef = useScrollReveal();
  const statsRef = useScrollReveal();

  return (
    <section id="research" className="py-28 md:py-36 bg-[#FAFAF8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-12">
          <p className="section-label mb-4">03 — Research</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Publications
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <p className="font-body text-base font-light text-[#1A1A1A]/50 mt-4 max-w-xl">
            Research focused on federated learning, Bayesian inference, and privacy-preserving machine learning.
            Future directions include computational biology and AI-driven bioprinting.
            Data synced from{" "}
            <a
              href={scholarStats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] underline-animate"
            >
              Google Scholar
            </a>
            .
          </p>
        </div>

        {/* Scholar stats */}
        <div ref={statsRef} className="fade-in-up mb-16">
          <div className="flex flex-wrap gap-8 md:gap-16 py-8 border-y border-[#C4B9A8]/40">
            {[
              { value: scholarStats.totalCitations, label: "Total Citations" },
              { value: scholarStats.hIndex, label: "h-index" },
              { value: scholarStats.i10Index, label: "i10-index" },
              { value: publications.length, label: "Publications" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-4xl font-light text-[#1A1A1A]">{stat.value}</p>
                <p className="font-body text-xs tracking-[0.15em] uppercase text-[#8B7355]/70 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Publications list */}
        <div className="space-y-5">
          {publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} index={i} />
          ))}
        </div>

        {/* Scholar link */}
        <div className="mt-12 text-center">
          <a
            href={scholarStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#8B7355] border border-[#C4B9A8] px-6 py-3 hover:border-[#8B7355] hover:bg-[#8B7355]/5 transition-all duration-400"
          >
            <BookOpen size={14} />
            View Full Profile on Google Scholar
          </a>
        </div>
      </div>
    </section>
  );
}

function PublicationCard({ pub, index }: { pub: Publication; index: number }) {
  const ref = useScrollReveal(0.1);
  const venueColor = getVenueColor(pub.venue);
  const badge = getVenueBadge(pub.venue);

  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${index * 0.07}s` }}
    >
      <a
        href={pub.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex gap-5 p-6 md:p-7 border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_4px_30px_rgba(139,115,85,0.08)] block ${
          pub.featured
            ? "border-[#C4B9A8]/80 bg-[#F5F0E8]/40"
            : "border-[#C4B9A8]/30 bg-transparent"
        }`}
      >
        {/* Left accent bar */}
        <div
          className="w-0.5 shrink-0 rounded-full self-stretch"
          style={{ backgroundColor: venueColor }}
        />

        <div className="flex-1 min-w-0">
          {/* Venue badge + citation count */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="font-body text-xs font-medium tracking-[0.12em] uppercase px-2.5 py-1"
              style={{
                color: venueColor,
                backgroundColor: `${venueColor}15`,
                border: `1px solid ${venueColor}30`,
              }}
            >
              {badge}
            </span>
            {pub.citations > 0 && (
              <span className="flex items-center gap-1 font-body text-xs text-[#1A1A1A]/40">
                <Quote size={10} />
                {pub.citations} citations
              </span>
            )}
            {pub.featured && (
              <span className="font-body text-xs text-[#8B7355] flex items-center gap-1">
                <BookOpen size={10} />
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-display text-lg md:text-xl font-light text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#8B7355] transition-colors duration-400">
            {pub.title}
          </h3>

          {/* Authors */}
          <p className="font-body text-sm font-light text-[#1A1A1A]/50 mb-4 italic">
            {pub.authors}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {pub.tags.map((tag) => (
              <span
                key={tag}
                className="font-body text-xs font-light tracking-wide px-2.5 py-0.5 border border-[#C4B9A8]/40 text-[#1A1A1A]/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* External link icon */}
        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
          <ExternalLink size={15} className="text-[#8B7355]" />
        </div>
      </a>
    </div>
  );
}

/*
 * ResearchSection — Quiet Luxury Minimalism
 * Publications + Research Experience
 * Card-based layout with venue badges
 */

import { useEffect, useRef } from "react";
import { ExternalLink, BookOpen } from "lucide-react";

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

const publications = [
  {
    title: "PFL-MD: A Privacy-Preserving Federated Learning Framework for Melanoma Diagnosis with Multiple Party Fully Homomorphic Encryption",
    authors: "Liu, Liangxi, et al.",
    venue: "IEEE BIBM 2025",
    year: "2025",
    type: "Conference",
    color: "#7A6B8B",
    tags: ["Federated Learning", "Privacy", "Medical AI", "Homomorphic Encryption"],
  },
  {
    title: "FedLPA: One-shot Federated Learning with Layer-Wise Posterior Aggregation",
    authors: "Liu, X., Liu, L., Ye, F., Shen, Y., Li, X., Jiang, L., & Li, J.",
    venue: "NeurIPS 2024",
    year: "2024",
    type: "Conference",
    color: "#6B8B7A",
    tags: ["Federated Learning", "Bayesian Inference", "Neural Networks"],
    highlight: true,
  },
  {
    title: "A Bayesian Federated Learning Framework with Online Laplace Approximation",
    authors: "Liu, Liangxi, et al.",
    venue: "TPAMI 2023",
    year: "2023",
    type: "Journal",
    color: "#8B7355",
    tags: ["Bayesian Learning", "Laplace Approximation", "Non-IID Data"],
    highlight: true,
  },
  {
    title: "Evaluating Modern Approaches in 3D Scene Reconstruction: NeRF vs Gaussian-Based Methods",
    authors: "Zhou, Yiming, et al.",
    venue: "IEEE DOCS 2024",
    year: "2024",
    type: "Conference",
    color: "#7A8B6B",
    tags: ["NeRF", "3D Reconstruction", "Gaussian Splatting"],
  },
  {
    title: "Brain Storm Optimized Swarm Collaboration for Bus Scheduling",
    authors: "Liu, Liangxi, Siqing Ma, and Jun Steed Huang.",
    venue: "IEEE VTC 2019",
    year: "2019",
    type: "Conference",
    color: "#8B6B7A",
    tags: ["Swarm Intelligence", "Optimization", "Transportation"],
  },
];

const venueColors: Record<string, string> = {
  "NeurIPS 2024": "#6B8B7A",
  "TPAMI 2023": "#8B7355",
  "IEEE BIBM 2025": "#7A6B8B",
  "IEEE DOCS 2024": "#7A8B6B",
  "IEEE VTC 2019": "#8B6B7A",
};

export default function ResearchSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="research" className="py-28 md:py-36 bg-[#FAFAF8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">03 — Research</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Publications
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <p className="font-body text-base font-light text-[#1A1A1A]/50 mt-4 max-w-xl">
            Research focused on federated learning, Bayesian inference, and privacy-preserving machine learning.
          </p>
        </div>

        {/* Publications list */}
        <div className="space-y-6">
          {publications.map((pub, i) => (
            <PublicationCard key={i} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationCard({
  pub,
  index,
}: {
  pub: (typeof publications)[0];
  index: number;
}) {
  const ref = useScrollReveal(0.1);
  const venueColor = venueColors[pub.venue] || "#8B7355";

  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        className={`group relative flex gap-6 p-6 md:p-8 border transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_4px_30px_rgba(139,115,85,0.08)] ${
          pub.highlight
            ? "border-[#C4B9A8]/80 bg-[#F5F0E8]/50"
            : "border-[#C4B9A8]/30 bg-transparent"
        }`}
      >
        {/* Left accent */}
        <div
          className="w-0.5 shrink-0 rounded-full"
          style={{ backgroundColor: venueColor, minHeight: "100%" }}
        />

        <div className="flex-1 min-w-0">
          {/* Venue badge + year */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="font-body text-xs font-medium tracking-[0.15em] uppercase px-2.5 py-1"
              style={{
                color: venueColor,
                backgroundColor: `${venueColor}15`,
                border: `1px solid ${venueColor}30`,
              }}
            >
              {pub.venue}
            </span>
            <span className="font-body text-xs text-[#1A1A1A]/30">{pub.type}</span>
            {pub.highlight && (
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
          <ExternalLink size={16} className="text-[#8B7355]" />
        </div>
      </div>
    </div>
  );
}

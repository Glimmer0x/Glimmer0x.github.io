/*
 * ProjectsSection — Quiet Luxury Minimalism
 * Grid of featured projects with subtle card hover effects
 * Uses project-bg texture for card backgrounds
 */

import { useEffect, useRef } from "react";
import { Trophy, Zap, Shield, Search, ExternalLink } from "lucide-react";

const PROJECT_BG =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-3_1772031316000_na1fn_cHJvamVjdC1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTNfMTc3MjAzMTMxNjAwMF9uYTFmbl9jSEp2YW1WamRDMWlady5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=UvkHnxxS7-YIJFBCDDS0E-T9q7UBWDy70L~ZF4huZpbzdgBZikQ600nQYLhgfdNPATiIuNddNY6R5YoqBYyaitdT3KmJ6sTZrsq3DL7ApA82DThQHXCN~23fWu9-MvI2emig3QNt10YlGC3xVfMHWYy3WTCpQvbOFGVPGoLJdLbUBddbFqtrqyg-FgsCLY2dN0bFJQRt-dnr4NfOPy4XWBICgK3~5EUmd0GuuiVL~kauUFse5Sq86X-H9nMrlM7hC3MseNs~CYLZzKZCfv2hf5xB7~tYh9LdNy1nwx-VTC0uT6RPRSsfUL16H54DbG6L3l~P3UfSQneYHjH7pXp14w__";

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

const projectLinks: Record<string, string> = {
  "Fuzzy Search Engine": "https://github.com/Glimmer0x",
  "Blockchain Fraud Detection": "https://github.com/Glimmer0x",
  "AI Governance Platform": "https://github.com/Glimmer0x",
  "ETH Hackathon Projects": "https://github.com/Glimmer0x",
};

const projects = [
  {
    icon: <Search size={22} />,
    title: "Fuzzy Search Engine",
    subtitle: "OKBL · 20M+ Users",
    description:
      "Novel Two-Stage Ranking fuzzy search algorithm with substring caching and progressive dynamic programming. Reduced time complexity from O(N²) to O(N log N), increasing search hit rates by 42.1%.",
    metrics: [
      { label: "Hit Rate Increase", value: "+42.1%" },
      { label: "Speed Gain (Rust)", value: "+56%" },
    ],
    tags: ["Rust", "Algorithms", "Search", "Dynamic Programming"],
    color: "#8B7355",
    featured: true,
  },
  {
    icon: <Shield size={22} />,
    title: "Blockchain Fraud Detection",
    subtitle: "Pond Global · Coinbase, Near, Go Plus",
    description:
      "Crypto-native multimodal AI model and time-sequence Transformer for detecting fraudulent blockchain transactions at petabyte scale, processing billions of real-time requests.",
    metrics: [
      { label: "Seed Funding Raised", value: "$7.5M" },
      { label: "Scale", value: "PB-scale" },
    ],
    tags: ["Transformer", "Blockchain", "Kafka", "AWS", "Kubernetes"],
    color: "#6B8B7A",
    featured: true,
  },
  {
    icon: <Zap size={22} />,
    title: "AI Governance Platform",
    subtitle: "BreezeML · Adopted by Airbnb",
    description:
      "End-to-end ML governance platform with automated compliance checking. Serverless architecture using Go + Lambda + Neptune + DynamoDB, reducing batch processing time by 10×.",
    metrics: [
      { label: "Processing Time Reduction", value: "10×" },
      { label: "Architecture", value: "Serverless" },
    ],
    tags: ["Go", "AWS Lambda", "DynamoDB", "AI Governance"],
    color: "#7A6B8B",
    featured: false,
  },
  {
    icon: <Trophy size={22} />,
    title: "ETH Hackathon Projects",
    subtitle: "ETH Oxford 2024 · ETH Denver 2023",
    description:
      "Back-to-back First Prize winner at two of the world's most prestigious Ethereum hackathons. Built decentralized solutions for the Flock.io and Go Plus challenges.",
    metrics: [
      { label: "Hackathon Wins", value: "2× 1st" },
      { label: "Challenges", value: "Flock.io · Go Plus" },
    ],
    tags: ["Solidity", "Web3", "DeFi", "Smart Contracts"],
    color: "#8B7A55",
    featured: false,
  },
];

export default function ProjectsSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="projects" className="py-28 md:py-36 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">04 — Projects</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Featured Work
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} bgTexture={PROJECT_BG} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  bgTexture,
}: {
  project: (typeof projects)[0];
  index: number;
  bgTexture: string;
}) {
  const ref = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        className={`group relative h-full p-8 border transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_50px_rgba(139,115,85,0.1)] overflow-hidden ${
          project.featured
            ? "border-[#C4B9A8]/80 bg-[#FAFAF8]"
            : "border-[#C4B9A8]/40 bg-[#FAFAF8]/60"
        }`}
      >
        {/* Subtle bg texture on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none"
          style={{
            backgroundImage: `url(${bgTexture})`,
            backgroundSize: "cover",
          }}
        />

        {/* Top accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ backgroundColor: project.color }}
        />

        <div className="relative z-10">
          {/* Icon + title */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="p-2.5 shrink-0"
              style={{ color: project.color, backgroundColor: `${project.color}12` }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-light text-[#1A1A1A] leading-snug">
                {project.title}
              </h3>
              <p className="font-body text-xs font-light tracking-wider text-[#8B7355] uppercase mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Thin divider */}
          <div className="w-8 h-px mb-5" style={{ backgroundColor: project.color }} />

          {/* Description */}
          <p className="font-body text-sm font-light text-[#1A1A1A]/65 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {project.metrics.map((m) => (
              <div key={m.label} className="border-l-2 pl-3" style={{ borderColor: `${project.color}50` }}>
                <p className="font-display text-xl font-light" style={{ color: project.color }}>
                  {m.value}
                </p>
                <p className="font-body text-xs font-light text-[#1A1A1A]/40 tracking-wide mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          {/* Tags + Link */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-xs font-light tracking-wide px-2.5 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={projectLinks[project.title] ?? "https://github.com/Glimmer0x"}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 font-body text-xs font-light tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: project.color }}
              onClick={(e) => e.stopPropagation()}
            >
              View
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

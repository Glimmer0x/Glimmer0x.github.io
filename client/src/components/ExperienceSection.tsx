/*
 * ExperienceSection — Computational Naturalism
 * Vertical center-spine timeline with true alternating left/right cards
 */

import { useEffect, useRef } from "react";

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

const experiences = [
  {
    company: "OKBL USA Technology Inc.",
    location: "San Jose, US",
    role: "Software Engineer II",
    period: "Jun. 2024 – Present",
    color: "#8B7355",
    highlights: [
      "Spearheaded fuzzy search initiative, increasing search hit rates by **42.1%** and boosting user retention by **1.7%** for **20M+ users**",
      "Developed novel Two-Stage Ranking fuzzy search algorithm, reducing time complexity from **O(N²) to O(N log N)** and space from **O(N²) to O(N)**",
      "Engineered zero-shot document classifier for KYC verification using prompt-based multimodal embeddings",
      "Raised KYC approval rate by **7.1%** via on-device document detection & rectification model",
      "Migrated all on-device services to **Rust**, boosting response speed by **56%**",
    ],
    tags: ["Rust", "Search Algorithms", "ML", "KYC", "Multimodal AI"],
  },
  {
    company: "Pond Global Ltd.",
    location: "New York, US",
    role: "Founding Engineer",
    period: "Mar. 2024 – Jun. 2024",
    color: "#5A7A6A",
    highlights: [
      "Built crypto-native multimodal AI model for clients including **Coinbase**, **Near**, and **Go Plus** to identify blockchain transaction behaviors",
      "Developed petabyte-scale blockchain data pipelines for real-time crawling and processing of **billions of RTC requests**",
      "Led team building time-sequence Transformer models to detect fraudulent transactions, safeguarding **millions of dollars**",
      "Assisted in fundraising, securing **$7.5M seed funding** from top investors",
    ],
    tags: ["Blockchain", "Transformer", "AWS", "Kafka", "Kubernetes"],
  },
  {
    company: "BreezeML",
    location: "Los Angeles, US",
    role: "Backend & Infrastructure Engineer",
    period: "Oct. 2023 – Mar. 2024",
    color: "#7A6B8B",
    highlights: [
      "Developed end-to-end AI governance platform adopted by **Airbnb**, enabling automated compliance checking across ML pipelines",
      "Built scalable serverless backend with **Go + API Gateway + Lambda + Neptune + DynamoDB**",
      "Designed AWS SQS + Batch infrastructure, reducing time to delete 10,000 records from **30 min to 3 min**",
      "Developed automated Go reflection-based test data loader, earning commendation from the **Airbnb AI team**",
    ],
    tags: ["Go", "AWS Lambda", "DynamoDB", "Serverless", "AI Governance"],
  },
];

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-[#1A1A1A]">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function ExperienceCard({
  exp,
  isLeft,
  index,
}: {
  exp: (typeof experiences)[0];
  isLeft: boolean;
  index: number;
}) {
  const ref = useScrollReveal(0.1);

  const card = (
    <div
      className="bg-[#FAFAF8] p-8 border border-[#C4B9A8]/40 hover:border-[#8B7355]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(139,115,85,0.08)]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="font-display text-2xl font-light text-[#1A1A1A] mb-1">
            {exp.company}
          </h3>
          <p className="font-body text-sm font-medium text-[#1A1A1A]/60">
            {exp.role}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-body text-xs tracking-wider uppercase mb-1" style={{ color: exp.color }}>
            {exp.period}
          </p>
          <p className="font-body text-xs text-[#1A1A1A]/40">{exp.location}</p>
        </div>
      </div>

      {/* Thin accent line */}
      <div className="w-8 h-0.5 mb-6" style={{ backgroundColor: exp.color }} />

      {/* Highlights */}
      <ul className="space-y-3 mb-6">
        {exp.highlights.map((h, j) => (
          <li key={j} className="flex gap-3">
            <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: exp.color }} />
            <p className="font-body text-sm font-light text-[#1A1A1A]/70 leading-relaxed">
              <HighlightText text={h} />
            </p>
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs font-light tracking-wider px-3 py-1 border border-[#C4B9A8]/60 text-[#1A1A1A]/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="fade-in-up relative"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      {/* Mobile: simple stack */}
      <div className="md:hidden pl-10">
        {/* Mobile timeline dot */}
        <div
          className="absolute left-0 top-6 w-3 h-3 rounded-full border-2 border-[#F5F0E8]"
          style={{ backgroundColor: exp.color }}
        />
        {card}
      </div>

      {/* Desktop: true alternating layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_2px_1fr] md:gap-0 items-start">
        {/* Left slot */}
        <div className={`${isLeft ? "pr-12" : ""}`}>
          {isLeft && card}
        </div>

        {/* Center spine + dot + connector */}
        <div className="relative flex justify-center">
          <div
            className="absolute top-6 w-4 h-4 rounded-full border-2 border-[#F5F0E8] -translate-x-1/2 left-1/2 z-10 shadow-[0_0_0_3px] "
            style={{ backgroundColor: exp.color, boxShadow: `0 0 0 3px ${exp.color}25` }}
          />
          {/* Horizontal connector line to card */}
          {isLeft ? (
            <div
              className="absolute top-[1.625rem] right-1/2 w-12 h-px"
              style={{ backgroundColor: `${exp.color}50` }}
            />
          ) : (
            <div
              className="absolute top-[1.625rem] left-1/2 w-12 h-px"
              style={{ backgroundColor: `${exp.color}50` }}
            />
          )}
        </div>

        {/* Right slot */}
        <div className={`${!isLeft ? "pl-12" : ""}`}>
          {!isLeft && card}
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="py-28 md:py-36 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">02 — Experience</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Work History
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical spine — desktop only */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C4B9A8]/70 hidden md:block -translate-x-1/2" />
          {/* Vertical spine — mobile */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-[#C4B9A8]/50 md:hidden" />

          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} isLeft={i % 2 === 0} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

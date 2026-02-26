/*
 * ExperienceSection — Compact Alternating Timeline
 * Left/right alternating cards with center spine
 * Details collapsed by default, expand on click
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

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
  index,
  isLeft,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) {
  const ref = useScrollReveal(0.05);
  const [expanded, setExpanded] = useState(false);

  const card = (
    <div
      className={`border border-[#C4B9A8]/40 bg-[#FAFAF8] transition-all duration-300 cursor-pointer ${
        expanded
          ? "border-[#8B7355]/30 shadow-[0_4px_20px_rgba(139,115,85,0.07)]"
          : "hover:border-[#C4B9A8]/70"
      }`}
      onClick={() => setExpanded((v) => !v)}
    >
      <div className="p-5">
        {/* Accent line */}
        <div className="w-5 h-0.5 mb-3" style={{ backgroundColor: exp.color }} />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-light text-[#1A1A1A] leading-tight mb-0.5">
              {exp.company}
            </h3>
            <p className="font-body text-xs font-light text-[#1A1A1A]/50">{exp.role}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <p
              className="font-body text-[10px] tracking-wider uppercase"
              style={{ color: exp.color }}
            >
              {exp.period}
            </p>
            <p className="font-body text-[10px] text-[#1A1A1A]/35">{exp.location}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[10px] font-light tracking-wider px-2 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <div className="flex items-center gap-1.5">
          <ChevronDown
            size={12}
            className={`text-[#C4B9A8] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
          />
          <span className="font-body text-[10px] text-[#1A1A1A]/30 tracking-wide">
            {expanded ? "collapse" : "expand"}
          </span>
        </div>

        {/* Expandable highlights */}
        <div
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{ maxHeight: expanded ? "500px" : "0px" }}
        >
          <div className="border-t border-[#C4B9A8]/30 pt-4 mt-3">
            <ul className="space-y-2.5">
              {exp.highlights.map((h, j) => (
                <li key={j} className="flex gap-2.5">
                  <span
                    className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                    style={{ backgroundColor: exp.color }}
                  />
                  <p className="font-body text-xs font-light text-[#1A1A1A]/60 leading-relaxed">
                    <HighlightText text={h} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="fade-in-up relative flex items-start w-full"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {/* Left slot */}
      <div className="flex-1 pr-6">{isLeft ? card : null}</div>

      {/* Center dot */}
      <div className="relative shrink-0 w-6 flex flex-col items-center">
        <div
          className="w-2.5 h-2.5 rounded-full border-2 border-[#FAFAF8] ring-1 mt-5 z-10"
          style={{ backgroundColor: exp.color }}
        />
      </div>

      {/* Right slot */}
      <div className="flex-1 pl-6">{!isLeft ? card : null}</div>
    </div>
  );
}

export default function ExperienceSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-10">
          <p className="section-label mb-4">02 — Experience</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Work History
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <p className="font-body text-xs font-light text-[#1A1A1A]/35 mt-2">
            Click any card to expand details.
          </p>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="relative hidden md:block">
          {/* Vertical spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C4B9A8]/40 -translate-x-1/2" />
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.company} exp={exp} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="space-y-3 md:hidden">
          {experiences.map((exp, i) => {
            const [expanded, setExpanded] = useState(false);
            return (
              <div
                key={exp.company}
                className="border border-[#C4B9A8]/40 bg-[#FAFAF8] cursor-pointer"
                onClick={() => setExpanded((v) => !v)}
              >
                <div className="p-5">
                  <div className="w-5 h-0.5 mb-3" style={{ backgroundColor: exp.color }} />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-lg font-light text-[#1A1A1A] leading-tight mb-0.5">
                        {exp.company}
                      </h3>
                      <p className="font-body text-xs text-[#1A1A1A]/50">{exp.role}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p
                        className="font-body text-[10px] tracking-wider uppercase"
                        style={{ color: exp.color }}
                      >
                        {exp.period}
                      </p>
                      <p className="font-body text-[10px] text-[#1A1A1A]/35">{exp.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-[10px] px-2 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ChevronDown
                      size={12}
                      className={`text-[#C4B9A8] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                    />
                    <span className="font-body text-[10px] text-[#1A1A1A]/30">
                      {expanded ? "collapse" : "expand"}
                    </span>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-400"
                    style={{ maxHeight: expanded ? "500px" : "0px" }}
                  >
                    <div className="border-t border-[#C4B9A8]/30 pt-4 mt-3">
                      <ul className="space-y-2.5">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2.5">
                            <span
                              className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                              style={{ backgroundColor: exp.color }}
                            />
                            <p className="font-body text-xs font-light text-[#1A1A1A]/60 leading-relaxed">
                              <HighlightText text={h} />
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

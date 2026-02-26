/*
 * ExperienceSection — Compact two-column grid
 * Default: collapsed (shows role, company, period, tags only)
 * Expanded: shows bullet highlights on click
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
          <strong key={i} className="font-medium text-[#1A1A1A]">{part}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

function ExperienceCard({ exp, index }: { exp: (typeof experiences)[0]; index: number }) {
  const ref = useScrollReveal(0.1);
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      ref={ref}
      className="fade-in-up"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div
        className={`border border-[#C4B9A8]/40 bg-[#FAFAF8] transition-all duration-300 ${
          expanded ? "border-[#8B7355]/30 shadow-[0_4px_24px_rgba(139,115,85,0.07)]" : "hover:border-[#C4B9A8]/70"
        }`}
      >
        {/* Card header — always visible, clickable */}
        <button
          className="w-full text-left p-6 group"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              {/* Accent line */}
              <div className="w-6 h-0.5 mb-3" style={{ backgroundColor: exp.color }} />
              <h3 className="font-display text-xl font-light text-[#1A1A1A] leading-tight mb-1">
                {exp.company}
              </h3>
              <p className="font-body text-sm font-light text-[#1A1A1A]/55 mb-3">
                {exp.role}
              </p>
              {/* Tags — always visible */}
              <div className="flex flex-wrap gap-1.5">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body text-[10px] font-light tracking-wider px-2.5 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: period + location + chevron */}
            <div className="shrink-0 flex flex-col items-end gap-2">
              <p className="font-body text-xs tracking-wider uppercase" style={{ color: exp.color }}>
                {exp.period}
              </p>
              <p className="font-body text-xs text-[#1A1A1A]/35">{exp.location}</p>
              <ChevronDown
                size={14}
                className={`text-[#C4B9A8] transition-transform duration-300 mt-1 ${expanded ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </button>

        {/* Expandable details */}
        <div
          className={`overflow-hidden transition-all duration-400 ease-in-out`}
          style={{ maxHeight: expanded ? "600px" : "0px" }}
        >
          <div className="px-6 pb-6 pt-0">
            <div className="border-t border-[#C4B9A8]/30 pt-5">
              <ul className="space-y-3">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex gap-3">
                    <span
                      className="mt-[7px] w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: exp.color }}
                    />
                    <p className="font-body text-sm font-light text-[#1A1A1A]/65 leading-relaxed">
                      <HighlightText text={h} />
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="py-24 md:py-32 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-14">
          <p className="section-label mb-4">02 — Experience</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Work History
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <p className="font-body text-sm font-light text-[#1A1A1A]/40 mt-3">
            Click any card to expand details.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * TimelineSection — Unified Career + Education Timeline
 *
 * Key alignment principle:
 * - A single `TimelineRow` component handles BOTH work and education entries.
 * - The layout is a CSS Grid with 3 columns: [left (1fr)] [dot (32px)] [right (1fr)]
 * - The vertical spine is `absolute left-1/2` on the outer wrapper, which lands
 *   exactly at the center of the 32px dot column (since the grid fills 100% width).
 * - The dot is always `mx-auto` inside the 32px column → always centered on the spine.
 * - Both work and education use the SAME dot column markup — no separate component,
 *   no separate pt-* offset — eliminating any per-type alignment drift.
 * - `pt-[20px]` on the dot column aligns the dot with the first line of card content.
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, GraduationCap, Briefcase } from "lucide-react";

/* ─── Scroll reveal hook ─── */
function useScrollReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── Data types ─── */
type WorkEntry = {
  type: "work";
  company: string;
  location: string;
  role: string;
  period: string;
  color: string;
  tags: string[];
  highlights: string[];
};

type EduEntry = {
  type: "education";
  school: string;
  degree: string;
  period: string;
  note?: string;
  color: string;
};

type TimelineEntry = WorkEntry | EduEntry;

/* ─── Data ─── */
const timeline: TimelineEntry[] = [
  {
    type: "work",
    company: "OKBL USA Technology Inc.",
    location: "San Jose, US",
    role: "Software Engineer II",
    period: "Jun. 2024 – Present",
    color: "#8B7355",
    tags: ["Rust", "Search Algorithms", "ML", "KYC", "Multimodal AI"],
    highlights: [
      "Spearheaded fuzzy search initiative, increasing search hit rates by **42.1%** and boosting user retention by **1.7%** for **20M+ users**",
      "Developed novel Two-Stage Ranking fuzzy search algorithm, reducing time complexity from **O(N²) to O(N log N)**",
      "Engineered zero-shot document classifier for KYC verification using prompt-based multimodal embeddings",
      "Raised KYC approval rate by **7.1%** via on-device document detection & rectification model",
      "Migrated all on-device services to **Rust**, boosting response speed by **56%**",
    ],
  },
  {
    type: "education",
    school: "Northeastern University",
    degree: "M.S. in Computer Software Engineering",
    period: "2022 – 2024",
    note: "GPA 3.7 / 4.0",
    color: "#8B7355",
  },
  {
    type: "work",
    company: "Pond Global Ltd.",
    location: "New York, US",
    role: "Founding Engineer",
    period: "Mar. 2024 – Jun. 2024",
    color: "#5A7A6A",
    tags: ["Blockchain", "Transformer", "AWS", "Kafka", "Kubernetes"],
    highlights: [
      "Built crypto-native multimodal AI model for **Coinbase**, **Near**, and **Go Plus** to identify blockchain transaction behaviors",
      "Developed petabyte-scale blockchain data pipelines for real-time crawling of **billions of RTC requests**",
      "Led team building time-sequence Transformer models to detect fraudulent transactions, safeguarding **millions of dollars**",
      "Assisted in fundraising, securing **$7.5M seed funding** from top investors",
    ],
  },
  {
    type: "work",
    company: "BreezeML",
    location: "Los Angeles, US",
    role: "Backend & Infrastructure Engineer",
    period: "Oct. 2023 – Mar. 2024",
    color: "#7A6B8B",
    tags: ["Go", "AWS Lambda", "DynamoDB", "Serverless", "AI Governance"],
    highlights: [
      "Developed end-to-end AI governance platform adopted by **Airbnb**, enabling automated compliance checking across ML pipelines",
      "Built scalable serverless backend with **Go + API Gateway + Lambda + Neptune + DynamoDB**",
      "Designed AWS SQS + Batch infrastructure, reducing time to delete 10,000 records from **30 min to 3 min**",
      "Developed automated Go reflection-based test data loader, earning commendation from the **Airbnb AI team**",
    ],
  },
  {
    type: "education",
    school: "The University of Sheffield",
    degree: "M.S. in Advanced Computer Science",
    period: "2021 – 2022",
    note: "Distinction",
    color: "#5A7A6A",
  },
  {
    type: "education",
    school: "Southern University of Science and Technology",
    degree: "B.E. in Computer Science and Technology",
    period: "2015 – 2019",
    note: "National Outstanding Student",
    color: "#7A6B8B",
  },
];

/* ─── Highlight bold text ─── */
function HighlightText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <strong key={i} className="font-medium text-[#1A1A1A]">{p}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

/* ─── Work card content ─── */
function WorkCardContent({ entry }: { entry: WorkEntry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`border border-[#C4B9A8]/40 bg-[#FAFAF8] cursor-pointer transition-all duration-300 ${
        expanded ? "border-[#8B7355]/30 shadow-[0_4px_20px_rgba(139,115,85,0.07)]" : "hover:border-[#C4B9A8]/70"
      }`}
      onClick={() => setExpanded(v => !v)}
    >
      <div className="p-5">
        <div className="w-5 h-0.5 mb-3" style={{ backgroundColor: entry.color }} />
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-light text-[#1A1A1A] leading-tight mb-0.5">{entry.company}</h3>
            <p className="font-body text-xs font-light text-[#1A1A1A]/50">{entry.role}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <p className="font-body text-[10px] tracking-wider uppercase" style={{ color: entry.color }}>{entry.period}</p>
            <p className="font-body text-[10px] text-[#1A1A1A]/35">{entry.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.tags.map(tag => (
            <span key={tag} className="font-body text-[10px] font-light tracking-wider px-2 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <ChevronDown size={12} className={`text-[#C4B9A8] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          <span className="font-body text-[10px] text-[#1A1A1A]/30 tracking-wide">{expanded ? "collapse" : "expand"}</span>
        </div>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expanded ? "600px" : "0px" }}>
          <div className="border-t border-[#C4B9A8]/30 pt-4 mt-3">
            <ul className="space-y-2.5">
              {entry.highlights.map((h, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <p className="font-body text-xs font-light text-[#1A1A1A]/60 leading-relaxed"><HighlightText text={h} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Education card content ─── */
function EduCardContent({ entry }: { entry: EduEntry }) {
  return (
    <div className="py-3 px-4 border-l-2" style={{ borderLeftColor: entry.color + "80" }}>
      <div className="flex items-start gap-2">
        <GraduationCap size={13} style={{ color: entry.color }} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-display text-base font-light text-[#1A1A1A] leading-tight">{entry.school}</p>
          <p className="font-body text-xs font-light text-[#1A1A1A]/50 mt-0.5">{entry.degree}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-body text-[10px] tracking-wider" style={{ color: entry.color }}>{entry.period}</span>
            {entry.note && (
              <>
                <span className="text-[#C4B9A8] text-[10px]">·</span>
                <span className="font-body text-[10px] text-[#1A1A1A]/40">{entry.note}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Unified timeline row ───────────────────────────────────────────────────
 *
 * SINGLE component for both work and education.
 * The dot column is IDENTICAL in both cases:
 *   - same `pt-[20px]` top padding
 *   - same `flex flex-col items-center` centering
 *   - same `mx-auto` on the dot element
 *
 * The only difference is dot size/color (work = 12px colored, edu = 8px muted).
 * This guarantees zero alignment drift between entry types.
 * ─────────────────────────────────────────────────────────────────────────── */
function TimelineRow({ entry, index, isLeft }: { entry: TimelineEntry; index: number; isLeft: boolean }) {
  const ref = useScrollReveal(0.05);
  const isWork = entry.type === "work";

  const dotEl = isWork ? (
    <div
      className="w-3 h-3 rounded-full border-2 border-[#F5F0E8] z-10 ring-1 ring-[#C4B9A8]/60 mx-auto"
      style={{ backgroundColor: (entry as WorkEntry).color }}
    />
  ) : (
    <div
      className="w-2.5 h-2.5 rounded-full border-2 border-[#F5F0E8] z-10 mx-auto"
      style={{ backgroundColor: (entry as EduEntry).color + "99" }}
    />
  );

  const cardEl = isWork
    ? <WorkCardContent entry={entry as WorkEntry} />
    : <EduCardContent entry={entry as EduEntry} />;

  return (
    <div ref={ref} className="fade-in-up" style={{ transitionDelay: `${index * 0.08}s` }}>
      {/* 3-column grid: left (1fr) | dot (32px) | right (1fr) */}
      <div className="grid items-start" style={{ gridTemplateColumns: "1fr 32px 1fr" }}>
        {/* Left slot */}
        <div className="pr-6">{isLeft ? cardEl : null}</div>

        {/* ── Dot column ──────────────────────────────────────────────────────
         *  pt-[20px]: aligns dot center with the first text line of the card.
         *  items-center + mx-auto: centers dot horizontally in the 32px column.
         *  This markup is IDENTICAL for work and education — no drift possible.
         * ──────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center pt-[20px]">
          {dotEl}
        </div>

        {/* Right slot */}
        <div className="pl-6">{!isLeft ? cardEl : null}</div>
      </div>
    </div>
  );
}

/* ─── Section ─── */
export default function TimelineSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="timeline" className="py-20 md:py-28 bg-[#F5F0E8]">
      <div className="container">
        {/* Header */}
        <div ref={headingRef} className="fade-in-up mb-12">
          <p className="section-label mb-4">04 — Timeline</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">Journey</h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Briefcase size={11} className="text-[#8B7355]" />
              <span className="font-body text-[10px] text-[#1A1A1A]/40 tracking-wide">Work — click to expand</span>
            </div>
            <span className="text-[#C4B9A8] text-[10px]">·</span>
            <div className="flex items-center gap-1.5">
              <GraduationCap size={11} className="text-[#C4B9A8]" />
              <span className="font-body text-[10px] text-[#1A1A1A]/40 tracking-wide">Education</span>
            </div>
          </div>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="relative hidden md:block">
          {/* Vertical spine — absolute left-1/2 lands at center of the 32px dot column */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C4B9A8]/35 -translate-x-1/2" />
          <div className="space-y-3">
            {timeline.map((entry, i) => (
              <TimelineRow key={i} entry={entry} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="space-y-3 md:hidden">
          {timeline.map((entry, i) => {
            if (entry.type === "education") {
              const edu = entry as EduEntry;
              return (
                <div key={i} className="border-l-2 pl-4 py-2" style={{ borderLeftColor: edu.color + "80" }}>
                  <div className="flex items-start gap-2">
                    <GraduationCap size={13} style={{ color: edu.color }} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display text-base font-light text-[#1A1A1A]">{edu.school}</p>
                      <p className="font-body text-xs text-[#1A1A1A]/50 mt-0.5">{edu.degree}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-body text-[10px]" style={{ color: edu.color }}>{edu.period}</span>
                        {edu.note && (
                          <>
                            <span className="text-[#C4B9A8] text-[10px]">·</span>
                            <span className="font-body text-[10px] text-[#1A1A1A]/40">{edu.note}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            const work = entry as WorkEntry;
            return <MobileWorkCard key={i} entry={work} />;
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Mobile work card ─── */
function MobileWorkCard({ entry }: { entry: WorkEntry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-[#C4B9A8]/40 bg-[#FAFAF8] cursor-pointer" onClick={() => setExpanded(v => !v)}>
      <div className="p-4">
        <div className="w-5 h-0.5 mb-3" style={{ backgroundColor: entry.color }} />
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-display text-base font-light text-[#1A1A1A] leading-tight mb-0.5">{entry.company}</h3>
            <p className="font-body text-xs font-light text-[#1A1A1A]/50">{entry.role}</p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-1">
            <p className="font-body text-[10px] tracking-wider uppercase" style={{ color: entry.color }}>{entry.period}</p>
            <p className="font-body text-[10px] text-[#1A1A1A]/35">{entry.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {entry.tags.map(tag => (
            <span key={tag} className="font-body text-[10px] font-light tracking-wider px-2 py-0.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/45">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <ChevronDown size={12} className={`text-[#C4B9A8] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
          <span className="font-body text-[10px] text-[#1A1A1A]/30 tracking-wide">{expanded ? "collapse" : "expand"}</span>
        </div>
        <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: expanded ? "600px" : "0px" }}>
          <div className="border-t border-[#C4B9A8]/30 pt-4 mt-3">
            <ul className="space-y-2.5">
              {entry.highlights.map((h, j) => (
                <li key={j} className="flex gap-2.5">
                  <span className="mt-[7px] w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <p className="font-body text-xs font-light text-[#1A1A1A]/60 leading-relaxed"><HighlightText text={h} /></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

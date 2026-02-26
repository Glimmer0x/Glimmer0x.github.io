/*
 * ExploringSection — Curiosity-driven frontier interests
 * Not research commitments, but areas of genuine fascination
 * Compact grid of topic cards with subtle forest-green accent
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

const topics = [
  {
    title: "Brain-Computer Interfaces",
    desc: "The possibility of direct neural communication — from assistive tech to augmented cognition.",
    domain: "Neurotechnology",
  },
  {
    title: "Gene Regulatory Networks",
    desc: "Using graph models and causal inference to decode how genes orchestrate cellular behavior.",
    domain: "Computational Biology",
  },
  {
    title: "Organ Bioprinting",
    desc: "AI-guided scaffold design and bioink optimization on the path to functional tissue fabrication.",
    domain: "Biofabrication",
  },
  {
    title: "Longevity Science",
    desc: "Computational approaches to aging — from epigenetic clocks to senolytics target discovery.",
    domain: "Geroscience",
  },
  {
    title: "Neuromorphic Computing",
    desc: "Hardware that mimics the brain's sparse, event-driven architecture for ultra-efficient AI.",
    domain: "Hardware & AI",
  },
  {
    title: "Synthetic Biology",
    desc: "Engineering biological circuits as programmable systems — cells as the next computing substrate.",
    domain: "Bioengineering",
  },
  {
    title: "Quantum Machine Learning",
    desc: "Exploring where quantum speedup might genuinely accelerate learning on structured data.",
    domain: "Quantum Computing",
  },
  {
    title: "Space Habitation AI",
    desc: "Autonomous systems for resource management, health monitoring, and decision-making in deep space.",
    domain: "Aerospace",
  },
];

function TopicCard({ topic, index }: { topic: (typeof topics)[0]; index: number }) {
  const ref = useScrollReveal(0.05);
  return (
    <div
      ref={ref}
      className="fade-in-up group p-5 border border-[#C4B9A8]/35 bg-[#FAFAF8] hover:border-[#C4B9A8]/70 transition-all duration-300"
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      {/* Domain tag */}
      <p
        className="font-body text-[10px] tracking-[0.18em] uppercase mb-3 font-light"
        style={{ color: "oklch(0.32 0.09 140)" }}
      >
        {topic.domain}
      </p>
      <h3 className="font-display text-base font-light text-[#1A1A1A] mb-2 leading-snug group-hover:text-[#8B7355] transition-colors duration-300">
        {topic.title}
      </h3>
      <p className="font-body text-xs font-light text-[#1A1A1A]/50 leading-relaxed">
        {topic.desc}
      </p>
    </div>
  );
}

export default function ExploringSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="exploring" className="py-24 md:py-32 bg-[#FAFAF8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-14">
          <p className="section-label mb-4" style={{ color: "oklch(0.32 0.09 140)" }}>
            — Exploring
          </p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Frontiers of Curiosity
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
          <p className="font-body text-sm font-light text-[#1A1A1A]/45 mt-4 max-w-2xl leading-relaxed">
            These are not research commitments — they are territories I find genuinely fascinating.
            I believe the most interesting problems live at the edges of disciplines, and I try to
            stay curious about where technology is taking us next.
          </p>
        </div>

        {/* Topic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topics.map((topic, i) => (
            <TopicCard key={topic.title} topic={topic} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex items-center gap-3">
          <div className="w-4 h-px" style={{ backgroundColor: "oklch(0.32 0.09 140)" }} />
          <p className="font-body text-xs font-light text-[#1A1A1A]/30 tracking-wide italic">
            Always learning, always questioning.
          </p>
        </div>
      </div>
    </section>
  );
}

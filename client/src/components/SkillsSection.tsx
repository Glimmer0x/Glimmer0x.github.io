/*
 * SkillsSection — Quiet Luxury Minimalism
 * Grouped skill categories with elegant tag display
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

const skillGroups = [
  {
    category: "Languages",
    color: "#8B7355",
    skills: ["Python", "Go", "Rust", "Java", "TypeScript", "JavaScript", "Kotlin", "Swift", "C++", "Solidity", "Shell", "LaTeX"],
  },
  {
    category: "AI / ML",
    color: "#6B8B7A",
    skills: ["PyTorch", "TensorFlow", "Scikit-Learn", "Federated Learning", "Bayesian Inference", "Transformer", "NeRF", "Multimodal AI"],
  },
  {
    category: "Backend & Frameworks",
    color: "#7A6B8B",
    skills: ["Spring", "Node.js", "Django", "Flask", "Gin", "FastAPI", "REST API", "Spark", "Flink"],
  },
  {
    category: "Databases",
    color: "#7A8B6B",
    skills: ["MySQL", "MongoDB", "DynamoDB", "Neptune", "ElasticSearch", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    color: "#8B6B7A",
    skills: ["AWS (S3, Lambda, RDS, Fargate, Batch)", "Kubernetes", "Docker", "Terraform", "Jenkins", "Kafka", "LocalStack"],
  },
];

export default function SkillsSection() {
  const headingRef = useScrollReveal();

  return (
    <section id="skills" className="py-28 md:py-36 bg-[#FAFAF8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">05 — Skills</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Technical Stack
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
        </div>

        <div className="space-y-12">
          {skillGroups.map((group, i) => (
            <SkillGroup key={i} group={group} index={i} />
          ))}
        </div>

        {/* Awards */}
        <AwardsBlock />
      </div>
    </section>
  );
}

function SkillGroup({ group, index }: { group: (typeof skillGroups)[0]; index: number }) {
  const ref = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className="fade-in-up grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-start"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Category label */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
          <p className="font-body text-xs font-medium tracking-[0.18em] uppercase text-[#1A1A1A]/60">
            {group.category}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="md:col-span-3 flex flex-wrap gap-2.5">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="font-body text-sm font-light px-4 py-1.5 border border-[#C4B9A8]/50 text-[#1A1A1A]/70 hover:border-[#8B7355]/60 hover:text-[#8B7355] transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function AwardsBlock() {
  const ref = useScrollReveal(0.1);

  const awards = [
    {
      title: "1st Prize — Flock.io Challenge",
      event: "ETH Oxford Hackathon 2024",
      color: "#8B7355",
    },
    {
      title: "1st Prize — Go Plus Challenge",
      event: "ETH Denver Hackathon 2023",
      color: "#6B8B7A",
    },
    {
      title: "National Outstanding University Student",
      event: "SIAT, Chinese Academy of Sciences · 2018",
      color: "#7A6B8B",
    },
  ];

  return (
    <div ref={ref} className="fade-in-up mt-20">
      <div className="divider-thin mb-12" />
      <p className="section-label mb-8">Awards & Honors</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {awards.map((award, i) => (
          <div
            key={i}
            className="p-6 border border-[#C4B9A8]/40 hover:border-[#8B7355]/40 transition-all duration-400 hover:-translate-y-0.5"
          >
            <div className="w-6 h-0.5 mb-4" style={{ backgroundColor: award.color }} />
            <h4 className="font-display text-lg font-light text-[#1A1A1A] mb-2 leading-snug">
              {award.title}
            </h4>
            <p className="font-body text-xs font-light text-[#1A1A1A]/45 tracking-wide">
              {award.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

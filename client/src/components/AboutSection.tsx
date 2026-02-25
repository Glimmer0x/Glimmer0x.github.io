/*
 * AboutSection — Quiet Luxury Minimalism
 * Asymmetric layout: left label + right content
 * Education timeline, personal statement
 */

import { useEffect, useRef } from "react";
import { GraduationCap, MapPin } from "lucide-react";

const ABOUT_TEXTURE =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-4_1772031318000_na1fn_YWJvdXQtdGV4dHVyZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTRfMTc3MjAzMTMxODAwMF9uYTFmbl9ZV0p2ZFhRdGRHVjRkSFZ5WlEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=H2yP3b4gw1YF27tsDo9wg1xm-8y8S8OelFMre1rtEJC7RSR0hXjbRJybrNvSJ~YekknAiSMmCnmjNcP5aLE68dInRixzGWKQ4QB6Q6Y7K8S5vT2EZsCy6bUn5ruHqDYr89uZk1qz6~OZwmwy7aFStim6b9BmBSA6fZ5BHuYP56Na8L3kLjESO-Rw7W9tel3wWYjt-CC1oDnQBBolU4fnr2RfkiuFB84gkzuHHz5n~o3ZbQRSB44x4edK3WN2RRSh3SwZgt0PDecVL5tXTRnnBXTYZk85WaK33wDCcCLfVMOpGxQRPFMQEPEdhWPhdnUdjcUcv-Ox1iRJfV-~cLMw0g__";

const education = [
  {
    school: "Northeastern University",
    location: "Seattle, US",
    degree: "M.S. in Computer Software Engineering",
    period: "2022 – 2024",
    note: "GPA 3.7/4.0",
    highlight: "Cloud Computing · Web Development · UX Engineering",
  },
  {
    school: "The University of Sheffield",
    location: "Sheffield, UK",
    degree: "M.S. in Advanced Computer Science",
    period: "2021 – 2022",
    note: "Distinction",
    highlight: "Machine Learning · Computer Security · Intelligent Web",
  },
  {
    school: "Southern University of Science and Technology",
    location: "Shenzhen, China",
    degree: "B.E. in Computer Science and Technology",
    period: "2015 – 2019",
    note: "National Outstanding Student",
    highlight: "AI · Machine Learning · Operating Systems",
  },
];

function useScrollReveal(threshold = 0.15) {
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

export default function AboutSection() {
  const headingRef = useScrollReveal();
  const textRef = useScrollReveal();
  const eduRef = useScrollReveal();

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden bg-[#FAFAF8]">
      {/* Subtle texture */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url(${ABOUT_TEXTURE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">01 — About</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Who I Am
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Personal Statement */}
          <div ref={textRef} className="fade-in-up">
            <p className="font-body text-base md:text-lg font-light text-[#1A1A1A]/80 leading-[1.9] mb-6">
              I am a software engineer and researcher with a deep focus on
              <span className="text-[#8B7355] font-normal"> federated learning</span>,
              <span className="text-[#8B7355] font-normal"> search systems</span>, and
              <span className="text-[#8B7355] font-normal"> AI-driven infrastructure</span>.
              My work spans from publishing in top-tier venues like NeurIPS and TPAMI
              to building production systems that serve tens of millions of users.
            </p>
            <p className="font-body text-base font-light text-[#1A1A1A]/60 leading-[1.9] mb-10">
              I thrive at the boundary between rigorous research and pragmatic engineering —
              whether designing novel algorithms that reduce time complexity from O(N²) to O(N log N),
              or architecting petabyte-scale blockchain data pipelines. I believe the most impactful
              work happens when theoretical depth meets real-world scale.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {[
                { icon: <MapPin size={14} />, label: "Location", value: "San Jose, CA" },
                { icon: <GraduationCap size={14} />, label: "Latest Degree", value: "M.S. NEU, 2024" },
              ].map((fact) => (
                <div key={fact.label} className="border-l border-[#C4B9A8] pl-4">
                  <div className="flex items-center gap-1.5 text-[#8B7355] mb-1">
                    {fact.icon}
                    <span className="font-body text-xs tracking-[0.15em] uppercase">{fact.label}</span>
                  </div>
                  <p className="font-body text-sm font-light text-[#1A1A1A]">{fact.value}</p>
                </div>
              ))}
            </div>

            {/* Future Research Interests */}
            <div className="border-l-2 border-[#8B7355]/40 pl-6">
              <p className="section-label mb-4">Future Research Directions</p>
              <p className="font-body text-sm font-light text-[#1A1A1A]/60 leading-relaxed mb-5">
                Beyond current work in federated learning and AI systems, I am drawn to the frontier
                where computation meets biology — particularly in areas where data-driven methods
                can unlock new understanding of life itself.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Gene Regulatory Networks",
                    desc: "Applying graph neural networks and causal inference to model transcription factor interactions and predict cellular state transitions at scale.",
                    tag: "Computational Biology",
                  },
                  {
                    title: "Bioprinting & Organ Engineering",
                    desc: "Exploring AI-driven optimization of bioink formulations and scaffold architectures to accelerate the path toward functional tissue fabrication.",
                    tag: "Biofabrication",
                  },
                ].map((item) => (
                  <div key={item.title} className="group">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8B7355]/50 mt-2 shrink-0 group-hover:bg-[#8B7355] transition-colors duration-300" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-display text-base font-light text-[#1A1A1A]">{item.title}</h4>
                          <span className="font-body text-[10px] tracking-[0.12em] uppercase text-[#8B7355]/60 border border-[#8B7355]/20 px-2 py-0.5">
                            {item.tag}
                          </span>
                        </div>
                        <p className="font-body text-xs font-light text-[#1A1A1A]/50 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Education Timeline */}
          <div ref={eduRef} className="fade-in-up" style={{ transitionDelay: "0.15s" }}>
            <p className="section-label mb-8">Education</p>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-[#C4B9A8]" />

              <div className="space-y-10 pl-8">
                {education.map((edu, i) => (
                  <div key={i} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-8 top-1.5 w-2 h-2 rounded-full bg-[#8B7355]" />

                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl font-light text-[#1A1A1A]">
                        {edu.school}
                      </h3>
                      <span className="font-body text-xs font-light text-[#8B7355] tracking-wider shrink-0">
                        {edu.period}
                      </span>
                    </div>

                    <p className="font-body text-sm font-light text-[#1A1A1A]/70 mb-1">
                      {edu.degree}
                    </p>

                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-body text-xs text-[#8B7355] font-medium">
                        {edu.note}
                      </span>
                      <span className="text-[#C4B9A8]">·</span>
                      <span className="font-body text-xs text-[#1A1A1A]/40 flex items-center gap-1">
                        <MapPin size={10} />
                        {edu.location}
                      </span>
                    </div>

                    <p className="font-body text-xs font-light text-[#1A1A1A]/40 tracking-wide">
                      {edu.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

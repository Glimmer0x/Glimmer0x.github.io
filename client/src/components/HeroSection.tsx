/*
 * HeroSection — Quiet Luxury Minimalism (Simplified)
 * Clean full-width text layout, no illustration
 * Reduced height: min-h-[80vh] instead of min-h-screen
 */

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const HERO_BG =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-1_1772031324000_na1fn_aGVyby1hYnN0cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTFfMTc3MjAzMTMyNDAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TN0Z6fufjWI6Os846yrO-A4sN6aozneYX1Vg~OeWO2CFPay46lvSd8IghNyyqmuAgkGi2~RTqybJStitDre0FNcxtGrYF-Skohan4YpajKMEudJUxkE5VLICQPuqpTeyJHCamipTOeqrBcMqs8P06XRsH2iDCqXdoXashfpPdjCGvuxysTSiv4E6VVPQjFY8gzZlTfFZkt9Z5FmoaN5F14F45n7PqI8QgWDfnkbJ0AfpICUzuzBe9IsDfQEHRWVNya75FrlF2jrW0SkYtzjc3AQZ7xWhk-O1EPPV8qLAdvWZszlkC7ep1ruEMQ3XkyreMi46dF3UsT55PaUFcRREBA__";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => textRef.current?.classList.add("visible"), 100);
    const t2 = setTimeout(() => statsRef.current?.classList.add("visible"), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ background: "#FAFAF8", minHeight: "82vh" }}
    >
      {/* Subtle background watercolor texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Thin top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4B9A8]/40 to-transparent" />

      <div className="container relative z-10 w-full py-24 lg:py-20">
        {/* Label */}
        <div ref={textRef} className="fade-in-up">
          <p className="section-label mb-10 tracking-[0.25em]">
            Software Engineer · Researcher
          </p>

          {/* Main title — large, left-aligned */}
          <h1 className="font-display font-light leading-[0.92] text-[#1A1A1A] mb-4"
            style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}>
            Liangxi
            <br />
            <span className="italic text-[#8B7355]">Liu</span>
          </h1>

          {/* English name */}
          <p className="font-body text-sm font-medium tracking-[0.4em] text-[#8B7355] mb-8 uppercase">
            Glimmer
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-[#C4B9A8] mb-8" />

          {/* Tagline */}
          <p className="font-body text-base md:text-lg font-light text-[#1A1A1A]/65 leading-relaxed max-w-2xl mb-3">
            Building intelligent systems at the intersection of
            <span className="text-[#8B7355] font-normal"> machine learning</span> and
            <span className="text-[#8B7355] font-normal"> distributed engineering</span>.
          </p>

          <p className="font-body text-sm font-light text-[#1A1A1A]/40 mb-12 tracking-wide">
            San Jose, CA · OKBL USA Technology · NeurIPS · TPAMI
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1A1A] text-[#FAFAF8] font-body text-sm font-light tracking-[0.1em] uppercase hover:bg-[#8B7355] transition-colors duration-400"
            >
              View Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#C4B9A8] text-[#1A1A1A] font-body text-sm font-light tracking-[0.1em] uppercase hover:border-[#8B7355] hover:text-[#8B7355] transition-colors duration-400"
            >
              Get in Touch
            </a>
          </div>

          {/* Stats row */}
          <div ref={statsRef} className="fade-in-up flex flex-wrap gap-10 md:gap-16 pt-8 border-t border-[#C4B9A8]/30">
            {[
              { num: "7", label: "Publications" },
              { num: "156", label: "Citations" },
              { num: "2×", label: "Hackathon Champion" },
              { num: "20M+", label: "Users Impacted" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl md:text-4xl font-light text-[#1A1A1A]">
                  {stat.num}
                </p>
                <p className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#8B7355]/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B7355]/50 animate-bounce">
        <ArrowDown size={14} />
        <span className="font-body text-[10px] tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

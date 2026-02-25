/*
 * HeroSection — Computational Naturalism
 * Left-right split layout: text left (55%), organic network illustration right (45%)
 * Dual identity: AI systems engineering + computational biology
 */

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const HERO_BG =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-1_1772031324000_na1fn_aGVyby1hYnN0cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTFfMTc3MjAzMTMyNDAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TN0Z6fufjWI6Os846yrO-A4sN6aozneYX1Vg~OeWO2CFPay46lvSd8IghNyyqmuAgkGi2~RTqybJStitDre0FNcxtGrYF-Skohan4YpajKMEudJUxkE5VLICQPuqpTeyJHCamipTOeqrBcMqs8P06XRsH2iDCqXdoXashfpPdjCGvuxysTSiv4E6VVPQjFY8gzZlTfFZkt9Z5FmoaN5F14F45n7PqI8QgWDfnkbJ0AfpICUzuzBe9IsDfQEHRWVNya75FrlF2jrW0SkYtzjc3AQZ7xWhk-O1EPPV8qLAdvWZszlkC7ep1ruEMQ3XkyreMi46dF3UsT55PaUFcRREBA__";

const NETWORK_IMG =
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663268852998/fyAaxgAVgqyYWNjV.png";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => {
      textRef.current?.classList.add("visible");
    }, 100);
    const t2 = setTimeout(() => {
      imgRef.current?.classList.add("visible");
    }, 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      {/* Background watercolor texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-12 lg:gap-0 items-center min-h-screen py-28 lg:py-0">

          {/* Left: Text Content — 6/11 columns */}
          <div ref={textRef} className="lg:col-span-6 fade-in-up">

            {/* Label */}
            <p className="section-label mb-8 tracking-[0.25em]">
              Software Engineer · Researcher
            </p>

            {/* Main Title */}
            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.95] text-[#1A1A1A] mb-3">
              Liangxi
              <br />
              <span className="italic text-[#8B7355]">Liu</span>
            </h1>

            {/* English name — more prominent */}
            <p className="font-body text-sm font-light tracking-[0.3em] text-[#1A1A1A]/50 mb-6 uppercase">
              Glimmer
            </p>

            {/* Thin divider */}
            <div className="w-16 h-px bg-[#C4B9A8] mb-8" />

            {/* Tagline — reflects dual identity */}
            <p className="font-body text-base md:text-lg font-light text-[#1A1A1A]/70 leading-relaxed max-w-lg mb-4">
              Building intelligent systems at the intersection of
              <span className="text-[#8B7355] font-normal"> machine learning</span> and
              <span className="text-[#8B7355] font-normal"> distributed engineering</span> —
              and exploring how computation can illuminate
              <span style={{ color: "oklch(0.32 0.09 140)" }} className="font-normal"> the logic of life</span>.
            </p>

            <p className="font-body text-sm font-light text-[#1A1A1A]/50 mb-12">
              San Jose, CA · OKBL USA Technology · NeurIPS · TPAMI
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mb-12">
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
                  <p className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#8B7355]/80 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
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
          </div>

          {/* Right: Organic Network Illustration — 5/11 columns */}
          <div
            ref={imgRef}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center fade-in-up"
          >
            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Subtle green accent ring behind image */}
              <div
                className="absolute -top-6 -right-6 w-48 h-48 rounded-full pointer-events-none opacity-10"
                style={{ background: "oklch(0.32 0.09 140)" }}
              />
              {/* Corner accent — gold */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-[#8B7355]/25 pointer-events-none" />
              {/* Corner accent — green */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 border pointer-events-none opacity-30"
                style={{ borderColor: "oklch(0.32 0.09 140)" }}
              />
              <img
                src={NETWORK_IMG}
                alt="Gene regulatory network — computational biology illustration"
                className="w-full object-contain"
                style={{ maxHeight: "520px" }}
              />
              {/* Caption */}
              <p
                className="absolute bottom-2 right-0 font-body text-[10px] tracking-[0.2em] uppercase opacity-40"
                style={{ color: "oklch(0.32 0.09 140)" }}
              >
                Gene Regulatory Network
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B7355]/60 animate-bounce">
        <ArrowDown size={16} />
        <span className="font-body text-xs tracking-[0.2em] uppercase">Scroll</span>
      </div>
    </section>
  );
}

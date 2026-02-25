/*
 * HeroSection — Quiet Luxury Minimalism
 * Left-right split layout: text left (60%), abstract illustration right (40%)
 * Large Cormorant Garamond display title, elegant subtitle
 * Watercolor abstract background image
 */

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

const HERO_BG =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-1_1772031324000_na1fn_aGVyby1hYnN0cmFjdA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTFfMTc3MjAzMTMyNDAwMF9uYTFmbl9hR1Z5YnkxaFluTjBjbUZqZEEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TN0Z6fufjWI6Os846yrO-A4sN6aozneYX1Vg~OeWO2CFPay46lvSd8IghNyyqmuAgkGi2~RTqybJStitDre0FNcxtGrYF-Skohan4YpajKMEudJUxkE5VLICQPuqpTeyJHCamipTOeqrBcMqs8P06XRsH2iDCqXdoXashfpPdjCGvuxysTSiv4E6VVPQjFY8gzZlTfFZkt9Z5FmoaN5F14F45n7PqI8QgWDfnkbJ0AfpICUzuzBe9IsDfQEHRWVNya75FrlF2jrW0SkYtzjc3AQZ7xWhk-O1EPPV8qLAdvWZszlkC7ep1ruEMQ3XkyreMi46dF3UsT55PaUFcRREBA__";

const PROFILE_IMG =
  "https://private-us-east-1.manuscdn.com/sessionFile/Dz03kWw4HIBPFF5aPsEq1Q/sandbox/Y8vR1OAedMNRmcCVev166k-img-2_1772031322000_na1fn_cHJvZmlsZS1pbGx1c3RyYXRpb24.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRHowM2tXdzRISUJQRkY1YVBzRXExUS9zYW5kYm94L1k4dlIxT0FlZE1OUm1jQ1ZldjE2NmstaW1nLTJfMTc3MjAzMTMyMjAwMF9uYTFmbl9jSEp2Wm1sc1pTMXBiR3gxYzNSeVlYUnBiMjQucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=aEHhr3eN2CtmDzTGmqCavchXAA8hPV3raksvBaKpINIhV1q4HbumvLI4whbQ18lWHeTsXCKS5YfolTumvW1mfQWJcY4lbPZClrqpSF7hNfzYHG7AlLggWuxIwqIk9G1p9dPtSolQgYwAVhA2vNFM~i0LB1HdIUc753O6L-hVhTyTVWBWAwQG5zRBeze08XJlX7OGGPYuYlye3IkcDT5GQAh-3ZrvmQyOPkFP1xMvQ3~4-mv5OU2Ud7DPZrageBrpIVovQhiagC70MolEFAhlKfgSsc1DP-23jjP~ok2tcKHRRBW46w5t~2hCjZJMD26VvLpiMfEYV2sTZZCZ9DPRpw__";

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (textRef.current) {
        textRef.current.classList.add("visible");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `#FAFAF8`,
      }}
    >
      {/* Background watercolor texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />

      <div className="container relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-0 items-center min-h-screen py-28 lg:py-0">
          {/* Left: Text Content */}
          <div
            ref={textRef}
            className="lg:col-span-3 fade-in-up"
          >
            {/* Label */}
            <p className="section-label mb-8 tracking-[0.25em]">
              Software Engineer · Researcher
            </p>

            {/* Main Title */}
            <h1 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-light leading-[0.95] text-[#1A1A1A] mb-6">
              Liangxi
              <br />
              <span className="italic text-[#8B7355]">Liu</span>
            </h1>

            {/* Thin divider */}
            <div className="w-16 h-px bg-[#C4B9A8] mb-8" />

            {/* Tagline */}
            <p className="font-body text-base md:text-lg font-light text-[#1A1A1A]/70 leading-relaxed max-w-md mb-4">
              Building intelligent systems at the intersection of
              <span className="text-[#8B7355] font-normal"> machine learning</span>,
              <span className="text-[#8B7355] font-normal"> distributed computing</span>, and
              <span className="text-[#8B7355] font-normal"> scalable engineering</span>.
            </p>

            <p className="font-body text-sm font-light text-[#1A1A1A]/50 mb-12">
              San Jose, CA · OKBL USA Technology · NeurIPS · TPAMI
            </p>

            {/* Stats row */}
            <div className="flex gap-10 mb-12">
              {[
                { num: "3", label: "Publications" },
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

          {/* Right: Abstract Illustration */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end items-center">
            <div
              className="relative fade-in-up"
              style={{ transitionDelay: "0.2s" }}
            >
              {/* Decorative frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#C4B9A8]/50 pointer-events-none" />
              {/* Decorative second frame */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#8B7355]/20 pointer-events-none" />
              <img
                src={PROFILE_IMG}
                alt="Abstract portrait illustration"
                className="w-56 md:w-72 lg:w-80 xl:w-96 object-cover"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
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

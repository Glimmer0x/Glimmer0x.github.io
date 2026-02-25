/*
 * ContactSection — Quiet Luxury Minimalism
 * Clean contact layout with social links
 * Subtle watercolor background
 */

import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, BookOpen, MapPin } from "lucide-react";

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

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "liu.liangx@northeastern.edu",
    href: "mailto:liu.liangx@northeastern.edu",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/liangxi-liu",
    href: "https://linkedin.com/in/liangxi-liu",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    value: "github.com/liangxi-liu",
    href: "https://github.com/liangxi-liu",
  },
  {
    icon: <BookOpen size={18} />,
    label: "Google Scholar",
    value: "Scholar Profile",
    href: "#",
  },
];

export default function ContactSection() {
  const headingRef = useScrollReveal();
  const contentRef = useScrollReveal();

  return (
    <section id="contact" className="py-28 md:py-36 bg-[#F5F0E8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-20">
          <p className="section-label mb-4">06 — Contact</p>
          <div className="flex items-end gap-6">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Get in Touch
            </h2>
            <div className="flex-1 h-px bg-[#C4B9A8] mb-3 hidden md:block" />
          </div>
        </div>

        <div
          ref={contentRef}
          className="fade-in-up grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left: Message */}
          <div>
            <p className="font-body text-base md:text-lg font-light text-[#1A1A1A]/70 leading-[1.9] mb-8">
              I'm always open to discussing new opportunities, research collaborations,
              or interesting engineering challenges. Whether you're building something
              ambitious or exploring ideas at the frontier of AI and systems — let's connect.
            </p>

            <div className="flex items-center gap-2 text-[#1A1A1A]/40 mb-12">
              <MapPin size={14} />
              <span className="font-body text-sm font-light">San Jose, California</span>
            </div>

            {/* Primary CTA */}
            <a
              href="mailto:liu.liangx@northeastern.edu"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#FAFAF8] font-body text-sm font-light tracking-[0.12em] uppercase hover:bg-[#8B7355] transition-colors duration-500 group"
            >
              <Mail size={16} />
              <span>Send a Message</span>
            </a>
          </div>

          {/* Right: Links */}
          <div>
            <p className="section-label mb-8">Connect</p>
            <div className="space-y-1">
              {contactLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-5 border-b border-[#C4B9A8]/40 hover:border-[#8B7355]/40 transition-all duration-400"
                >
                  <span className="text-[#8B7355]/60 group-hover:text-[#8B7355] transition-colors duration-300 shrink-0">
                    {link.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/40 mb-0.5">
                      {link.label}
                    </p>
                    <p className="font-body text-sm font-light text-[#1A1A1A]/70 group-hover:text-[#8B7355] transition-colors duration-400 truncate underline-animate">
                      {link.value}
                    </p>
                  </div>
                  <span className="text-[#C4B9A8] group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all duration-300 text-lg">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

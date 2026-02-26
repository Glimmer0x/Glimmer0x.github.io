/*
 * Navbar Component — Computational Naturalism
 * Minimal top navigation with active section indicator
 * GitHub as external icon link (not a nav item)
 */

import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";

const navItems = [
  { label: "Blog", href: "/blog", sectionId: "" },
  { label: "Research", href: "#research", sectionId: "research" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Timeline", href: "#timeline", sectionId: "timeline" },
  { label: "Exploring", href: "#exploring", sectionId: "exploring" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sectionIds = navItems
        .filter((item) => item.sectionId)
        .map((item) => item.sectionId);

      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#C4B9A8]/40"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 md:h-20">
          {/* Logo / Name */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-display text-lg md:text-xl font-light tracking-wide text-[#1A1A1A] hover:text-[#8B7355] transition-colors duration-400"
          >
            <span>Liangxi Liu</span>
            <span className="font-body text-xs font-light tracking-[0.18em] text-[#8B7355]/60 ml-2 hidden sm:inline">Glimmer</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            {navItems.map((item) => {
              const isActive = item.sectionId && activeSection === item.sectionId;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`relative font-body text-xs font-light tracking-[0.14em] uppercase transition-colors duration-400 underline-animate ${
                      isActive
                        ? "text-[#8B7355]"
                        : "text-[#1A1A1A]/60 hover:text-[#8B7355]"
                    }`}
                  >
                    {item.label}
                    {/* Active dot indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#8B7355]" />
                    )}
                  </button>
                </li>
              );
            })}

            {/* GitHub external icon link */}
            <li>
              <a
                href="https://github.com/Glimmer0x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A1A]/50 hover:text-[#8B7355] transition-colors duration-400"
                aria-label="GitHub profile"
              >
                <Github size={16} />
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1A1A1A] hover:text-[#8B7355] transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAFAF8] flex flex-col justify-center items-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {navItems.map((item, i) => (
            <li
              key={item.label}
              style={{
                transitionProperty: "transform, opacity",
                transitionDuration: "0.5s, 0.5s",
                transitionTimingFunction: "ease, ease",
                transitionDelay: menuOpen ? `${i * 0.08}s` : "0s",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                className={`font-display text-4xl font-light transition-colors duration-400 ${
                  item.sectionId && activeSection === item.sectionId
                    ? "text-[#8B7355]"
                    : "text-[#1A1A1A] hover:text-[#8B7355]"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
          {/* GitHub in mobile menu */}
          <li
            style={{
              transitionProperty: "transform, opacity",
              transitionDuration: "0.5s, 0.5s",
              transitionTimingFunction: "ease, ease",
              transitionDelay: menuOpen ? `${navItems.length * 0.08}s` : "0s",
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <a
              href="https://github.com/Glimmer0x"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm tracking-[0.15em] uppercase text-[#1A1A1A]/50 hover:text-[#8B7355] transition-colors duration-400"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

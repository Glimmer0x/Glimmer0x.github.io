/*
 * Navbar Component — Quiet Luxury Minimalism
 * Minimal top navigation, text-only, no background
 * Subtle bottom border appears on scroll
 */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
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
            Liangxi Liu
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="font-body text-sm font-light tracking-[0.12em] uppercase text-[#1A1A1A]/70 hover:text-[#8B7355] transition-colors duration-400 underline-animate"
                >
                  {item.label}
                </button>
              </li>
            ))}
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
                transitionDelay: menuOpen ? `${i * 0.08}s` : "0s",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: "transform 0.5s ease, opacity 0.5s ease",
              }}
            >
              <button
                onClick={() => handleNavClick(item.href)}
                className="font-display text-4xl font-light text-[#1A1A1A] hover:text-[#8B7355] transition-colors duration-400"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

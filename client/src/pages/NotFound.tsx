import { useLocation } from "wouter";
import { ArrowLeft, Home, BookOpen, Layers } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/", icon: Home, desc: "Back to the beginning" },
  { label: "Blog", href: "/blog", icon: BookOpen, desc: "Read my writing" },
  { label: "Projects", href: "/#projects", icon: Layers, desc: "See what I've built" },
];

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#FAFAF8", fontFamily: "'Jost', sans-serif" }}
    >
      {/* Minimal top bar */}
      <header className="w-full px-8 py-6 flex items-center justify-between border-b border-[#E8E4DE]">
        <button
          onClick={() => setLocation("/")}
          className="flex items-center gap-2 text-[#6B6560] hover:text-[#2C2C2C] transition-colors duration-200 text-sm tracking-widest uppercase"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Liangxi Liu</span>
        </button>
        <span
          className="text-xs tracking-[0.25em] uppercase text-[#9B9490]"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          glimmer
        </span>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-20">
        {/* Large decorative 404 */}
        <div className="relative mb-12 select-none">
          <span
            className="text-[12rem] sm:text-[16rem] font-light leading-none text-[#EDE9E3] tracking-tighter"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            aria-hidden="true"
          >
            404
          </span>
          {/* Overlay text centered on the 404 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="w-8 h-px bg-[#8B7355] mb-4"
            />
            <p
              className="text-sm tracking-[0.3em] uppercase text-[#8B7355]"
            >
              Page Not Found
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="text-center max-w-md mb-14">
          <h1
            className="text-3xl sm:text-4xl font-light text-[#2C2C2C] mb-4 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            This page seems to have wandered off.
          </h1>
          <p className="text-[#6B6560] text-sm leading-relaxed">
            The page you're looking for doesn't exist or may have been moved.
            Here are a few places you might want to explore instead.
          </p>
        </div>

        {/* Quick navigation */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
          {NAV_LINKS.map(({ label, href, icon: Icon, desc }) => (
            <button
              key={label}
              onClick={() => {
                if (href.startsWith("/#")) {
                  setLocation("/");
                  setTimeout(() => {
                    const id = href.slice(2);
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                } else {
                  setLocation(href);
                }
              }}
              className="flex-1 group flex flex-col items-center gap-2 px-6 py-5 border border-[#E8E4DE] hover:border-[#8B7355] bg-white hover:bg-[#F5F1EC] transition-all duration-200 rounded-sm text-center"
            >
              <Icon
                className="w-4 h-4 text-[#9B9490] group-hover:text-[#8B7355] transition-colors duration-200"
              />
              <span
                className="text-sm tracking-widest uppercase text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors duration-200"
              >
                {label}
              </span>
              <span className="text-xs text-[#9B9490] leading-tight">{desc}</span>
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-6 border-t border-[#E8E4DE] text-center">
        <p className="text-xs tracking-widest uppercase text-[#9B9490]">
          Liangxi Liu &mdash; Software Engineer &amp; Researcher
        </p>
      </footer>
    </div>
  );
}

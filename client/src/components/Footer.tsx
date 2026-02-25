/*
 * Footer — Quiet Luxury Minimalism
 * Minimal footer with copyright and quick links
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-[#1A1A1A]">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs font-light tracking-[0.15em] text-[#FAFAF8]/30">
          © {year} Liangxi Liu. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          {["About", "Experience", "Research", "Projects", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => {
                const id = item.toLowerCase();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#FAFAF8]/30 hover:text-[#8B7355] transition-colors duration-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

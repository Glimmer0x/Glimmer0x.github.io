/*
 * BlogPreviewSection — Quiet Luxury Minimalism
 * Shows the 3 most recent blog posts on the homepage
 * Links to /blog for the full list
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { getAllPosts, formatDate, type BlogPost } from "@/lib/blog";

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

function BlogPostRow({ post, index }: { post: BlogPost; index: number }) {
  const ref = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className="fade-in-up border-b border-[#C4B9A8]/30 last:border-b-0"
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-10 py-8 hover:bg-[#F5F0E8]/30 transition-colors duration-400 -mx-4 px-4"
      >
        <div className="md:w-32 shrink-0">
          <p className="font-body text-xs font-light tracking-[0.1em] uppercase text-[#1A1A1A]/30">
            {formatDate(post.date)}
          </p>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg md:text-xl font-light text-[#1A1A1A] group-hover:text-[#8B7355] transition-colors duration-400 leading-snug">
            {post.title}
          </h3>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-1.5 font-body text-xs text-[#1A1A1A]/30">
            <Clock size={10} />
            {post.readingTime} min
          </span>
          <span className="text-[#C4B9A8] group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all duration-300">
            →
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function BlogPreviewSection() {
  const headingRef = useScrollReveal();
  const posts = getAllPosts().slice(0, 3);

  return (
    <section id="blog" className="py-28 md:py-36 bg-[#FAFAF8]">
      <div className="container">
        {/* Section header */}
        <div ref={headingRef} className="fade-in-up mb-16 flex items-end justify-between">
          <div>
            <p className="section-label mb-4">07 — Writing</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1A1A1A] leading-tight">
              Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#8B7355] hover:gap-3 transition-all duration-300 mb-2"
          >
            All Posts
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Post list */}
        <div className="space-y-0">
          {posts.map((post, i) => (
            <BlogPostRow key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 md:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#8B7355]"
          >
            All Posts
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

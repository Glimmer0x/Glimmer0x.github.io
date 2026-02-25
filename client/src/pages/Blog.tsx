/*
 * Blog List Page — Quiet Luxury Minimalism
 * Displays all Markdown posts from src/posts/
 * Clean editorial layout with tag filtering
 */

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getAllPosts, formatDate, type BlogPost } from "@/lib/blog";
import ScrollProgress from "@/components/ScrollProgress";

export default function Blog() {
  const posts = getAllPosts();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Collect all unique tags
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const filtered = selectedTag
    ? posts.filter((p) => p.tags.includes(selectedTag))
    : posts;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <ScrollProgress />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#C4B9A8]/40">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#1A1A1A]/60 hover:text-[#8B7355] transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <span className="font-display text-lg font-light text-[#1A1A1A]">
            Liangxi Liu{" "}
            <span className="font-body text-xs tracking-[0.18em] text-[#8B7355]/60">Glimmer</span>
          </span>
          <div className="w-16" />
        </div>
      </nav>

      <main className="pt-28 pb-28">
        <div className="container">
          {/* Header */}
          <div
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="section-label mb-4">Writing</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#1A1A1A] leading-tight mb-6">
              Blog
            </h1>
            <p className="font-body text-base font-light text-[#1A1A1A]/50 max-w-lg mb-12 leading-relaxed">
              Thoughts on machine learning research, systems engineering, and the intersection of AI with real-world products.
            </p>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2 mb-16">
              <button
                onClick={() => setSelectedTag(null)}
                className={`font-body text-xs font-light tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-300 ${
                  !selectedTag
                    ? "border-[#8B7355] text-[#8B7355] bg-[#8B7355]/5"
                    : "border-[#C4B9A8]/50 text-[#1A1A1A]/40 hover:border-[#8B7355]/40 hover:text-[#8B7355]"
                }`}
              >
                All ({posts.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`font-body text-xs font-light tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-300 ${
                    selectedTag === tag
                      ? "border-[#8B7355] text-[#8B7355] bg-[#8B7355]/5"
                      : "border-[#C4B9A8]/50 text-[#1A1A1A]/40 hover:border-[#8B7355]/40 hover:text-[#8B7355]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-0">
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} visible={visible} />
            ))}
            {filtered.length === 0 && (
              <p className="font-body text-sm font-light text-[#1A1A1A]/40 py-12 text-center">
                No posts found for this tag.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function PostCard({ post, index, visible }: { post: BlogPost; index: number; visible: boolean }) {
  return (
    <div
      className="border-b border-[#C4B9A8]/30 last:border-b-0"
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms, 700ms",
        transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transitionDelay: `${0.1 + index * 0.08}s`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-10 py-10 hover:bg-[#F5F0E8]/30 transition-colors duration-400 -mx-4 px-4"
      >
        {/* Date */}
        <div className="md:w-36 shrink-0">
          <p className="font-body text-xs font-light tracking-[0.12em] uppercase text-[#1A1A1A]/35 mt-1">
            {formatDate(post.date)}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-xl md:text-2xl font-light text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#8B7355] transition-colors duration-400">
            {post.title}
          </h2>
          <p className="font-body text-sm font-light text-[#1A1A1A]/55 leading-relaxed mb-4 max-w-2xl">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 font-body text-xs text-[#1A1A1A]/35">
              <Clock size={11} />
              {post.readingTime} min read
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 font-body text-xs font-light text-[#8B7355]/60"
                >
                  <Tag size={9} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center self-center text-[#C4B9A8] group-hover:text-[#8B7355] group-hover:translate-x-1 transition-all duration-300 text-xl shrink-0">
          →
        </div>
      </Link>
    </div>
  );
}

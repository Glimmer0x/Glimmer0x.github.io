/*
 * Blog Post Detail Page — Quiet Luxury Minimalism
 * Renders a single Markdown post with elegant typography
 * Code syntax highlighting via highlight.js
 */

import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getPostBySlug, renderMarkdown, formatDate } from "@/lib/blog";
import ScrollProgress from "@/components/ScrollProgress";
import hljs from "highlight.js";

export default function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? "";
  const post = getPostBySlug(slug);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    // Apply syntax highlighting after render
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-6xl font-light text-[#C4B9A8] mb-4">404</p>
          <p className="font-body text-sm font-light text-[#1A1A1A]/40 mb-8">Post not found.</p>
          <Link
            href="/blog"
            className="font-body text-sm font-light text-[#8B7355] underline-animate"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const html = renderMarkdown(post.content);

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <ScrollProgress />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-[#C4B9A8]/40">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <Link
            href="/blog"
            className="flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#1A1A1A]/60 hover:text-[#8B7355] transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Blog
          </Link>
          <Link
            href="/"
            className="font-display text-lg font-light text-[#1A1A1A] hover:text-[#8B7355] transition-colors duration-300"
          >
            Liangxi Liu{" "}
            <span className="font-body text-xs tracking-[0.18em] text-[#8B7355]/60">Glimmer</span>
          </Link>
          <div className="w-16" />
        </div>
      </nav>

      <main className="pt-28 pb-28">
        <div className="container max-w-3xl">
          {/* Post header */}
          <header
            className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="flex items-center gap-1 font-body text-xs font-light tracking-[0.1em] uppercase text-[#8B7355]/70 hover:text-[#8B7355] transition-colors duration-300"
                >
                  <Tag size={9} />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-light text-[#1A1A1A] leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-[#1A1A1A]/40">
              <span className="flex items-center gap-2 font-body text-sm font-light">
                <Calendar size={13} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2 font-body text-sm font-light">
                <Clock size={13} />
                {post.readingTime} min read
              </span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#C4B9A8]/40 mt-8" />
          </header>

          {/* Post content */}
          <article
            className={`prose-blog transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Footer nav */}
          <div
            className={`mt-16 pt-8 border-t border-[#C4B9A8]/40 transition-all duration-700 delay-200 ${visible ? "opacity-100" : "opacity-0"}`}
          >
            <Link
              href="/blog"
              className="flex items-center gap-2 font-body text-sm font-light tracking-[0.1em] uppercase text-[#1A1A1A]/50 hover:text-[#8B7355] transition-colors duration-300 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              All Posts
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

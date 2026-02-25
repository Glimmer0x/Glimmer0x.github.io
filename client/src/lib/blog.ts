/*
 * Blog utilities — static Markdown blog system
 * Uses Vite's import.meta.glob to load all .md files from src/posts/
 * Pure browser-compatible frontmatter parser (no gray-matter / Buffer dependency)
 * Renders Markdown with marked
 */

import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
  readingTime: number;
}

// Vite glob import — loads all markdown files as raw strings
const postModules = import.meta.glob("../posts/*.md", { query: "?raw", import: "default", eager: true });

function slugFromPath(path: string): string {
  return path.replace(/^.*\//, "").replace(/\.md$/, "");
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Pure browser-compatible YAML frontmatter parser.
 * Handles: string, number, array (inline bracket or dash-list), boolean.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  const lines = yamlBlock.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    // Match "key: value" or "key:"
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)?$/);
    if (!kvMatch) { i++; continue; }

    const key = kvMatch[1];
    const rest = (kvMatch[2] ?? "").trim();

    if (rest === "" || rest === null) {
      // Possibly a list follows
      const listItems: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, "").trim());
        i++;
      }
      data[key] = listItems.length > 0 ? listItems : "";
      continue;
    }

    // Inline array: [item1, item2]
    if (rest.startsWith("[") && rest.endsWith("]")) {
      data[key] = rest
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""));
      i++;
      continue;
    }

    // Quoted string
    if ((rest.startsWith('"') && rest.endsWith('"')) || (rest.startsWith("'") && rest.endsWith("'"))) {
      data[key] = rest.slice(1, -1);
      i++;
      continue;
    }

    // Boolean
    if (rest === "true") { data[key] = true; i++; continue; }
    if (rest === "false") { data[key] = false; i++; continue; }

    // Number
    if (!isNaN(Number(rest)) && rest !== "") { data[key] = Number(rest); i++; continue; }

    // Plain string
    data[key] = rest;
    i++;
  }

  return { data, content };
}

// Parse and cache all posts (disable cache in dev for HMR)
let _posts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (_posts && import.meta.env.PROD) return _posts;

  _posts = Object.entries(postModules)
    .map(([path, raw]) => {
      const slug = slugFromPath(path);
      const { data, content } = parseFrontmatter(raw as string);
      const tags = Array.isArray(data.tags)
        ? (data.tags as string[])
        : typeof data.tags === "string"
        ? [data.tags]
        : [];
      return {
        slug,
        title: (data.title as string) ?? slug,
        date: (data.date as string) ?? "",
        tags,
        excerpt:
          (data.excerpt as string) ??
          content.replace(/[#*`>]/g, "").trim().slice(0, 160) + "...",
        content,
        readingTime: estimateReadingTime(content),
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return _posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function renderMarkdown(content: string): string {
  marked.setOptions({ gfm: true, breaks: false });
  return marked(content) as string;
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

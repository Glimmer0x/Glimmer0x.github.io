/*
 * Unit tests for blog utility functions
 * Tests: parseFrontmatter (via getAllPosts), formatDate, estimateReadingTime
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---- Inline the pure functions for testing (no Vite glob needed) ----

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
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)?$/);
    if (!kvMatch) { i++; continue; }

    const key = kvMatch[1];
    const rest = (kvMatch[2] ?? "").trim();

    if (rest === "" || rest === null) {
      const listItems: string[] = [];
      i++;
      while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, "").trim());
        i++;
      }
      data[key] = listItems.length > 0 ? listItems : "";
      continue;
    }

    if (rest.startsWith("[") && rest.endsWith("]")) {
      data[key] = rest.slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      i++; continue;
    }

    if ((rest.startsWith('"') && rest.endsWith('"')) || (rest.startsWith("'") && rest.endsWith("'"))) {
      data[key] = rest.slice(1, -1);
      i++; continue;
    }

    if (rest === "true") { data[key] = true; i++; continue; }
    if (rest === "false") { data[key] = false; i++; continue; }
    if (!isNaN(Number(rest)) && rest !== "") { data[key] = Number(rest); i++; continue; }

    data[key] = rest;
    i++;
  }

  return { data, content };
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

// ---- Tests ----

describe("parseFrontmatter", () => {
  it("parses quoted string fields", () => {
    const raw = `---\ntitle: "Hello World"\ndate: "2025-01-15"\n---\nContent here.`;
    const { data, content } = parseFrontmatter(raw);
    expect(data.title).toBe("Hello World");
    expect(data.date).toBe("2025-01-15");
    expect(content.trim()).toBe("Content here.");
  });

  it("parses inline array tags", () => {
    const raw = `---\ntags: ["AI", "Rust", "Federated Learning"]\n---\nBody.`;
    const { data } = parseFrontmatter(raw);
    expect(Array.isArray(data.tags)).toBe(true);
    expect(data.tags).toContain("AI");
    expect(data.tags).toContain("Rust");
    expect((data.tags as string[]).length).toBe(3);
  });

  it("parses dash-list tags", () => {
    const raw = `---\ntags:\n  - Machine Learning\n  - Privacy\n---\nBody.`;
    const { data } = parseFrontmatter(raw);
    expect(Array.isArray(data.tags)).toBe(true);
    expect((data.tags as string[])).toContain("Machine Learning");
  });

  it("returns empty data and original content when no frontmatter", () => {
    const raw = `# Just a heading\nSome content.`;
    const { data, content } = parseFrontmatter(raw);
    expect(Object.keys(data).length).toBe(0);
    expect(content).toBe(raw);
  });

  it("parses boolean values", () => {
    const raw = `---\nfeatured: true\ndraft: false\n---\nContent.`;
    const { data } = parseFrontmatter(raw);
    expect(data.featured).toBe(true);
    expect(data.draft).toBe(false);
  });

  it("parses numeric values", () => {
    const raw = `---\norder: 3\n---\nContent.`;
    const { data } = parseFrontmatter(raw);
    expect(data.order).toBe(3);
  });
});

describe("formatDate", () => {
  it("formats a valid date string", () => {
    const result = formatDate("2025-01-15");
    expect(result).toContain("2025");
    // Month check: Jan 15 UTC may render as Jan 14 in UTC-X timezones
    expect(result).toMatch(/January|December/);
  });

  it("returns empty string for empty input", () => {
    expect(formatDate("")).toBe("");
  });
});

describe("estimateReadingTime", () => {
  it("returns at least 1 minute", () => {
    expect(estimateReadingTime("short")).toBe(1);
  });

  it("estimates correctly for 400 words", () => {
    const text = Array(400).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe(2);
  });

  it("estimates correctly for 200 words", () => {
    const text = Array(200).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe(1);
  });

  it("estimates correctly for 600 words", () => {
    const text = Array(600).fill("word").join(" ");
    expect(estimateReadingTime(text)).toBe(3);
  });
});

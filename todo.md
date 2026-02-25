# Personal Website TODO

## Phase 1 — Core Website (Completed)
- [x] Design system: Quiet Luxury Minimalism
- [x] Generate visual assets (watercolor textures, abstract illustration)
- [x] Hero section with stats
- [x] About section with education timeline
- [x] Experience section (OKBL, Pond Global, BreezeML)
- [x] Research / Publications section
- [x] Projects section
- [x] Skills & Awards section
- [x] Contact section
- [x] Footer
- [x] Navbar with scroll progress bar

## Phase 2 — Updates & Blog
- [x] Update name to include English name "Glimmer" in Hero and Navbar
- [x] Fetch and sync Google Scholar publications (scrape real data)
- [x] Add Google Scholar profile link to Contact section
- [x] Install marked for Markdown blog parsing (gray-matter removed, custom parser used)
- [x] Create blog posts directory structure (client/src/posts/)
- [x] Build blog list page (/blog)
- [x] Build blog post detail page (/blog/:slug)
- [x] Add Blog link to Navbar
- [x] Add Blog entry on homepage (BlogPreviewSection)
- [x] Write 3 sample blog posts in Markdown
- [x] Style blog pages consistent with Quiet Luxury design

## Bug Fixes
- [x] Fix nested &lt;a&gt; tags in BlogPreviewSection, Blog, BlogPost (wouter Link + &lt;a&gt; anti-pattern)

## Phase 3 — GitHub & Research Updates
- [x] Add GitHub contribution heatmap component (Glimmer0x)
- [x] Add GitHub section with contribution calendar and profile link
- [x] Update About section with Future Research Interests (GRN, bioprinting)
- [x] Update Research section description with future directions mention
- [x] Fix transitionDelay + transition shorthand conflict in all components

## Phase 4 — UX Fixes + Design Evolution (Computational Naturalism)

### Design System
- [x] Add forest green (oklch(0.32 0.09 140)) as second accent color to CSS variables
- [x] Update Hero tagline to reflect dual AI + computational biology identity

### Critical UX Fixes
- [x] Fill Hero right side with organic network/cell structure illustration (gene regulatory network)
- [x] Fix "SEND A MESSAGE" button (mailto link, correct GitHub URL to Glimmer0x, Scholar link)
- [x] Fix Experience section alternating card layout (true left/right alternation with center spine)

### High Priority UX Fixes
- [x] Optimize navbar: remove redundant GITHUB item, add external GitHub icon link
- [x] Add active section indicator to navbar on scroll (dot + color highlight)
- [x] Blog preview shows up to 3 posts (getAllPosts().slice(0, 3))
- [x] Add GitHub, Blog, and Google Scholar links to Footer
- [x] Elevate "Future Research Directions" visual prominence (forest green card with left border)

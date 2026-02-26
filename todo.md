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

## Phase 5 — UX Review Fixes (Full Pass)

### High Priority
- [x] Hero: Remove/fix gray semicircle geometry overlapping the network illustration
- [x] Research: Add external links (arXiv/DOI) to all paper cards
- [x] Blog preview: Show 3 posts (HMR cache fix)

### Medium Priority
- [x] Hero: Increase "GLIMMER" text contrast (bronze color, font-medium)
- [x] Experience: Stronger spine + horizontal connector lines to cards
- [x] GitHub: Reduced section padding (py-28 → py-20)
- [x] Research: Featured papers have forest green badge + stronger background
- [x] Projects: Added hover View link with ExternalLink icon

### Low Priority
- [x] Skills: Reduced tag size (text-xs, smaller padding)
- [x] Footer: Simplified to Blog/GitHub/Scholar + AI · Systems · Computational Biology tagline
- [x] Design: Forest green in Research Featured badge + GitHub section description

## Phase 6 — Hero Simplification + Exploring Section

- [x] Hero: Remove network illustration, simplify to clean text-only layout
- [x] Hero: Reduce section height (min-h-[82vh], compact padding)
- [x] About: Remove "Future Research Directions" cards from AboutSection
- [x] New: Create standalone ExploringSection component (curiosity-driven, not research commitments)
- [x] Exploring: 8 topics including BCI, GRN, bioprinting, longevity, neuromorphic, synthetic bio, quantum ML, space AI
- [x] Navbar: Add "Exploring" nav link
- [x] Home: Insert ExploringSection between Skills and GitHub sections
- [x] Experience: Compact two-column grid layout, no staggered offset
- [x] Experience: Collapse job details by default, expand on click

## Phase 7 — Experience Layout Refinement
- [x] Experience: Restored alternating timeline layout with compact spacing (space-y-4, py-20)

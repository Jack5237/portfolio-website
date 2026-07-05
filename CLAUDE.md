# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Quick Start Commands

```bash
# Development
bun run dev              # Start dev server (http://localhost:3000)
bun run build            # Production build
bun run start            # Start production server
bun run lint             # Run ESLint
bun run type-check       # Run TypeScript check
bun run clean            # Remove .next and out directories
```

**Package manager:** Bun (recommended) with fallback to npm/yarn.

---

## Project Overview

A minimal, performance-focused personal portfolio website built with **Next.js 14 (App Router)** showcasing projects, experience, and a blog. Live at [https://www.jacksdevfolio.com](https://www.jacksdevfolio.com).

**Key tech:**
- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS (+ typography plugin for markdown)
- **Runtime:** Bun (recommended), Node 18+
- **Deployment:** Vercel
- **Backend:** API routes (contact form, blog loading)
- **Email:** Resend (RESEND_API_KEY env var required)

---

## Architecture & Structure

### Core Directories

**`app/`** — Next.js App Router pages and layouts
- `page.tsx` — Home page (hero, projects, technologies sections)
- `layout.tsx` — Root shell with providers, fonts, and metadata
- `api/` — API endpoints:
  - `contact/route.ts` — Contact form handler (rate-limited, honeypot, HTML-escaped input)
  - `blog/route.ts` — Blog post loader from markdown files
- `blog/`, `contact/`, `privacy/`, `terms/`, `cookies/`, `pricing/` — Route-specific pages/layouts

**`components/`** — Reusable React components
- `sections/` — Major page sections (hero, projects, technologies, blog, footer, contact form)
- `navigation/` — Navbar, banners, back-to-home links
- `ui/` — Primitive components (button, dropdown, theme toggler, text decryption, scroll animations)
- `background/` — Decorative masonry background
- `providers/` — Context providers (theme, smooth scroll)

**`lib/`** — Utilities and configuration
- `content.ts` — Single source of truth for all site content (projects, experience, links, text). Update this file to change portfolio content—no component changes needed.
- `types.ts` — TypeScript interfaces (Project, Technology, Company, BlogPost)
- `logger.ts` — Web logger for client-side logging
- `utils.ts` — Helper utilities (classname merging, etc.)

**`content/blog/`** — Blog posts as markdown files with YAML frontmatter
- **Frontmatter fields:** `title`, `date` (YYYY-MM-DD), `category`, `tags` (array), `excerpt`, `bannerImage`
- Posts are automatically discovered and loaded; no build step needed
- Hot-reloaded when markdown files are edited

**`styles/`** — Global CSS (variables, typography, animations)

---

## Key Development Patterns

### Fonts & Performance

The root layout (`app/layout.tsx`) loads 4 Google fonts optimized via Next.js:
- **Outfit** — Display headings (`--font-outfit`)
- **Plus Jakarta Sans** — Body text (`--font-plus-jakarta`)
- **Space Grotesk** — Geometric elements (`--font-space-grotesk`)
- **Inter** — Fallback sans-serif (`--font-inter`)

All use `display: "swap"` to avoid layout shift and are self-hosted by Next.js.

### Metadata & SEO

- OG tags, Twitter cards, and JSON-LD schema are configured in `app/layout.tsx`
- Canonical URLs based on `NEXT_PUBLIC_SITE_URL` env var (defaults to `https://www.jacksdevfolio.com`)
- Robots/sitemaps configured in `robots.ts` and `sitemap.ts`

### Contact Form Security

**Route:** `POST /api/contact`
- **Rate limiting:** Sliding window (3 submissions per IP per 10 minutes)
- **Honeypot:** Hidden `website` field catches bots
- **Input validation:** Name, email, message required; length capped; email regex validated
- **XSS protection:** All inputs HTML-escaped before sending via Resend
- **Compliance:** Requires terms agreement checkbox
- **Error handling:** Detailed user-facing messages; logs full errors

### Blog System

**Route:** `GET /api/blog`
- **Loading:** Scans `content/blog/` for `.md` files at request time
- **Caching:** 1-hour cache with 1-day stale-while-revalidate
- **Sorting:** Posts ordered by date (newest first)
- **Parsing:** Uses `gray-matter` to extract frontmatter and content
- **Rendering:** Posts use react-markdown with GitHub-flavored markdown (remark-gfm) and Tailwind typography

### Theme & Smooth Scroll

- **Theme provider:** Wraps app with next-themes (system/dark/light mode support)
- **Smooth scroll:** Lenis provider for momentum-based scrolling (imported CSS in layout)
- **Dynamic import:** TopBanner is dynamically imported to avoid hydration mismatch

### Performance Optimizations

- **Image optimization:** Remote images (Unsplash, picsum.photos) with WebP/AVIF formats; 1-year cache
- **Static caching:** `_next/static/` and `/static/` assets cached immutably (1 year)
- **On-demand entries:** Buffer 5 pages; evict after 60s inactivity
- **Performance monitoring:** Browser PerformanceObserver logs tasks > 3s (inline script in head)
- **Compression:** gzip enabled

### Security Headers

All requests get headers for defense-in-depth:
- **HSTS** — Preload-ready HSTS (63M seconds, includeSubDomains)
- **CSP** — Restrictive default-src with exceptions for Calendly, Vercel, analytics
- **X-Content-Type-Options** — Prevent MIME sniffing
- **X-Frame-Options** — Only allow same-origin framing
- **Permissions-Policy** — Disable camera, microphone, geolocation
- **Referrer-Policy** — Strict origin-when-cross-origin

---

## Environment Variables

```
RESEND_API_KEY                 # Required for contact form email delivery
NEXT_PUBLIC_SITE_URL           # (Optional) Canonical URL; defaults to https://www.jacksdevfolio.com
```

**Development:** Create a `.env.local` file at the repo root. **Vercel:** Configure in project settings.

---

## Content Management

### Update Portfolio Content

Edit `lib/content.ts` — it's a single object exporting:
- `projects` array — Featured work with title, category, discipline, link, description
- `technologies` array — Skills grouped by category
- `experience` array — Work history with company, role, dates
- Links to social profiles (GitHub, LinkedIn, Discord, Twitter)
- Text snippets (nav, footer, etc.)

No component changes needed—just update the data.

### Add Blog Posts

1. Create `content/blog/my-post.md`
2. Add YAML frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2026-06-20"
   category: "Category Name"
   tags: ["tag1", "tag2"]
   excerpt: "Brief summary..."
   bannerImage: "https://example.com/image.jpg"
   ---
   ```
3. Write markdown content (GFM syntax supported)
4. Auto-discovered on next dev/build; commit and deploy

---

## TypeScript & Linting

- **TypeScript:** `strict: false` (allows implicit any, but check code for correctness)
- **ESLint:** Extends `next/core-web-vitals` and `next/typescript`; one custom rule disables HTML link warning
- **Path aliases:** `@/*`, `@/components/*`, `@/lib/*`, `@/styles/*` (configured in tsconfig.json)
- **Type check:** `bun run type-check` (runs tsc --noEmit)

---

## Deployment

The site is deployed on **Vercel**. Push to `main` → Vercel auto-builds and deploys.

**Pre-deployment checklist:**
- Env vars set in Vercel project settings (RESEND_API_KEY, NEXT_PUBLIC_SITE_URL)
- No build errors: `bun run build`
- Type-check passes: `bun run type-check`
- Linting passes: `bun run lint`

**Vercel-specific features enabled:**
- Analytics via @vercel/analytics (imported in layout)
- Web Vitals optimization via next/core-web-vitals ESLint config

---

## Common Tasks

### Run Tests
No test suite currently configured. Manual QA or add Jest/Vitest if needed.

### Debug Issues
- **Dev server:** `bun run dev` — opens http://localhost:3000
- **Build issues:** `bun run build` and check .next/ output
- **Type errors:** `bun run type-check` for full TS diagnostics
- **Linting:** `bun run lint` to check code quality
- **Contact form:** Check browser console and server logs for Resend errors
- **Blog:** Verify markdown files are in `content/blog/` with `.md` extension; check console for parsing errors

### Update Dependencies
```bash
bun install                    # Install/update deps per package.json
bun update                     # Update all packages
```

---

## Notes

- **Strict mode off:** TypeScript config allows some flexibility; keep code correct anyway.
- **CSS:** Tailwind with typography plugin; use `@apply` sparingly.
- **Markdown:** Supports GitHub Flavored Markdown (tables, strikethrough, etc.).
- **Resend sandboxing:** Uses sandbox domain; for production, configure a custom domain in Resend and update CSP.
- **Rate limiting:** In-memory (server restarts reset); use Redis for production multi-instance deployments.

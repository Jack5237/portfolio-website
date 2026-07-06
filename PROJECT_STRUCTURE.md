# Project Structure

Professional Next.js 14 portfolio website with clean organization and best practices.

```
portfolio-website/
├── app/                     # Next.js App Router pages and API routes
│   ├── (legal)/            # Route group for legal pages
│   ├── api/                # API endpoints
│   ├── blog/               # Blog page
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── robots.ts           # SEO robots config (generates robots.txt)
│   ├── sitemap.ts          # Dynamic sitemap with blog posts
│   └── README.md           # App structure documentation
├── components/              # React components organized by type
│   ├── ui/                 # Reusable UI primitives
│   ├── sections/           # Page sections (hero, projects, etc.)
│   ├── navigation/         # Navigation components
│   ├── background/         # Layout/decorative components
│   ├── providers/          # Context providers
│   ├── theme-provider.tsx  # Theme configuration
│   └── README.md           # Component organization guide
├── lib/                     # Utilities, types, configuration
│   ├── content.ts          # Single source of truth for portfolio data
│   ├── types.ts            # TypeScript interfaces
│   ├── config.ts           # App configuration and constants
│   ├── utils.ts            # Utility functions
│   ├── logger.ts           # Logging utility
│   ├── index.ts            # Barrel exports
│   └── README.md           # Lib directory guide
├── content/                 # Content files
│   └── blog/               # Markdown blog posts with YAML frontmatter
├── public/                  # Static assets
│   ├── ads.txt             # Google AdSense verification
│   ├── robots.txt          # Crawler instructions (backup)
│   └── avatarImg.png       # Profile image
├── styles/                  # Global styles
│   ├── globals.css         # Global CSS variables and utilities
│   └── *.css               # Component-specific styles
├── .env.local              # Environment variables (local, git-ignored)
├── CLAUDE.md               # Claude Code instructions
├── PROJECT_STRUCTURE.md    # This file
├── next.config.mjs         # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── bun.lock                # Bun lock file
└── README.md               # Project overview
```

## Key Principles

### 1. Single Source of Truth
- **`lib/content.ts`**: All portfolio content lives here
- Update this file to change site content
- No need to modify components or pages

### 2. Clean Imports with Barrel Exports
```typescript
// ✅ Good
import { Button, Badge } from "@/components/ui";
import { HeroSection } from "@/components/sections";
import { SITE_CONFIG, projects } from "@/lib";

// ❌ Avoid
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
```

### 3. Organization by Type
- **Components**: Organized by function (UI, sections, navigation)
- **Routes**: Organized with route groups (logical grouping)
- **Config**: Centralized in lib folder

### 4. TypeScript First
- All files use TypeScript (`.ts`, `.tsx`)
- Strict type checking
- Types defined in `lib/types.ts`

### 5. API Security
- Rate limiting on contact form
- Input validation and HTML escaping
- Honeypot to catch bots
- Proper error handling

## Common Tasks

### Add New Page
```bash
# Create route
mkdir app/new-route
echo 'export default function Page() { return <h1>New</h1>; }' > app/new-route/page.tsx

# Update sitemap.ts if needed
```

### Update Portfolio Content
Edit `lib/content.ts` — no component changes needed.

### Add New Component
1. Create in appropriate folder (`ui/`, `sections/`, etc.)
2. Add to barrel export in `index.ts`
3. Use clean import: `import { Component } from "@/components/ui"`

### Add Blog Post
1. Create `content/blog/post-slug.md`
2. Add YAML frontmatter (title, date, category, tags, excerpt, bannerImage)
3. Write markdown content
4. Auto-discovered and cached

## Architecture Decisions

### Why Next.js 14 App Router?
- Modern, file-based routing
- Server/client components by default
- Built-in optimization
- Better SEO support

### Why Tailwind CSS?
- Utility-first, fast development
- Small final bundle
- Easy to maintain and update
- Perfect for portfolio sites

### Why TypeScript?
- Type safety catches errors early
- Better IDE autocomplete
- Self-documenting code
- Professional standard

### Why Bun?
- Fast package manager and runtime
- Faster development
- Better DX than npm

## Performance Optimizations

- ✅ Image optimization (WebP/AVIF, lazy loading)
- ✅ CSS-in-JS removed (pure CSS/Tailwind)
- ✅ Code splitting (route-based)
- ✅ Static generation (home page, legal pages)
- ✅ Dynamic generation (blog, sitemap)
- ✅ Caching strategy (1 year for static assets)
- ✅ Compression enabled (gzip)

## Security Features

- ✅ HTTPS/HSTS enforced
- ✅ Content Security Policy (CSP) headers
- ✅ X-Content-Type-Options, X-Frame-Options
- ✅ Rate limiting on contact form
- ✅ Input validation and HTML escaping
- ✅ Honeypot bot detection
- ✅ Permissions-Policy (no camera/mic/geo)

## SEO Features

- ✅ Dynamic sitemap with blog posts
- ✅ robots.txt with crawl rules
- ✅ Metadata on all pages
- ✅ JSON-LD structured data
- ✅ Open Graph and Twitter cards
- ✅ Canonical URLs
- ✅ Mobile-responsive
- ✅ Fast loading (Core Web Vitals optimized)

## Deployment

Deployed on **Vercel** with:
- Auto-deployment on `main` push
- Environment variables configured
- Analytics enabled
- Performance monitoring

## Documentation

- **[app/README.md](app/README.md)** — Route and page structure
- **[components/README.md](components/README.md)** — Component organization
- **[lib/README.md](lib/README.md)** — Utilities and configuration
- **[CLAUDE.md](CLAUDE.md)** — Claude Code instructions and quick commands

# Portfolio Website v2

A **minimal, fast, and accessible** personal portfolio website to showcase projects, experience, and contact info.

🌐 **Live Site:** [https://www.jacksdevfolio.com](https://www.jacksdevfolio.com)

---

## Tech Used

- **Next.js 14** – framework (App Router)
- **Tailwind CSS** – styling
- **Bun** – runtime & package manager
- **Vercel** – deployment & hosting

---

## Blog System

The blog uses Markdown files stored in `content/blog/` with frontmatter metadata. Blog posts are automatically loaded from markdown files via the `/api/blog` endpoint.

### Adding Blog Posts

1. Create a new `.md` file in `content/blog/`
2. Add frontmatter at the top:

```yaml
---
title: "Your Blog Title"
date: "2026-01-17"
category: "Web Development"
tags: ["React", "Next.js"]
excerpt: "Brief description..."
bannerImage: "https://example.com/image.jpg"
---

Your markdown content here...
```

3. The blog will automatically detect and display new posts (no build step needed)
4. Commit and deploy

### Blog Features

- **Dynamic markdown loading** from `content/blog/` directory
- **Auto-expansion** of the first post on page load
- **Real-time updates** when markdown files are edited
- **Search & filtering** by tags
- **GitHub Flavored Markdown** support
- **Responsive design** with masonry background

---

## Features

- Fully responsive (desktop, tablet, mobile)
- Fast and performance-focused
- Clean, minimal UI
- Accessible and semantic HTML

---

## Edit Your Content

All site content is stored in one file:

```
lib/content.ts
```

You can easily update your projects, experience, links, and text by editing the **JSON-style data** in this file — no component changes needed.

---

## Run Locally

```bash
git clone https://github.com/Jack5237/portfolio-website.git
cd portfolio-website
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally.

---

## Contact

- 📧 **Email:** [contact.jack.dev@gmail.com](mailto:contact.jack.dev@gmail.com)
- 💬 **Discord:** `ttv_jack_`

---

## License

MIT

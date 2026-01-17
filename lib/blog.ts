export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  slug: string;
  bannerImage: string;
}

// Static blog posts data - will be updated when markdown files change and server restarts
export const BLOG_POSTS: BlogPost[] = [
  {
    "title": "UI Favourites I Use in 2026 😍",
    "date": "2026-01-16",
    "category": "Frontend",
    "tags": [
      "UI",
      "Design Systems",
      "Frontend"
    ],
    "excerpt": "A curated list of my favourite UI libraries, component systems, inspiration galleries, and design builders that define modern frontend work in 2026.",
    "content": "----------------------------------------------------------------------------------------------------------------\r\n\r\nFrontend engineering in 2026 is less about reinventing components and more about **composition, taste, and speed**. The modern UI ecosystem is rich, opinionated, and incredibly modular. Below is my personal, battle-tested list of **UI favourites** — the things I reach for again and again.\r\n\r\n## ✨ UI Favourites\r\n\r\nThese are the sites I keep bookmarked and revisit constantly for inspiration, patterns, and production-ready ideas:\r\n\r\n* [https://ui.shadcn.com/](https://ui.shadcn.com/)\r\n* [https://reactbits.dev/](https://reactbits.dev/)\r\n* [https://21st.dev/](https://21st.dev/)\r\n* [https://shaders.paper.design/](https://shaders.paper.design/)\r\n\r\n## 🧩 UI Libraries & Component Systems\r\n\r\nThe backbone of most modern React and design-system-driven products:\r\n\r\n* [https://ui.shadcn.com/](https://ui.shadcn.com/)\r\n* [https://www.radix-ui.com/](https://www.radix-ui.com/)\r\n* [https://tailwindui.com/components](https://tailwindui.com/components)\r\n* [https://tremor.so/](https://tremor.so/)\r\n* [https://heroui.com/](https://heroui.com/)\r\n* [https://ant.design/](https://ant.design/)\r\n* [https://silkhq.co/](https://silkhq.co/)\r\n* [https://ui.aceternity.com/](https://ui.aceternity.com/)\r\n* [https://magicui.design/](https://magicui.design/)\r\n* [https://originui.com/](https://originui.com/)\r\n* [https://mui.com/](https://mui.com/)\r\n* [https://untitledui.com/](https://untitledui.com/)\r\n* [https://kokonutui.com/](https://kokonutui.com/)\r\n* [https://smoothui.dev/](https://smoothui.dev/)\r\n* [https://reui.io/](https://reui.io/)\r\n* [https://cult-ui.com/](https://cult-ui.com/)\r\n* [https://motion-primitives.com/docs](https://motion-primitives.com/docs)\r\n* [https://tailark.com/](https://tailark.com/)\r\n* [https://ui.elevenlabs.io/](https://ui.elevenlabs.io/)\r\n* [https://kibo-ui.com/](https://kibo-ui.com/)\r\n* [https://patterncraft.fun/](https://patterncraft.fun/)\r\n* [https://blocks.so/](https://blocks.so/)\r\n* [https://www.ag-grid.com/](https://www.ag-grid.com/)\r\n\r\n## 🎨 Collections & Designers\r\n\r\nWhere taste is refined. These are invaluable for layout ideas, interaction patterns, and visual direction:\r\n\r\n* [https://landingfolio.com/](https://landingfolio.com/)\r\n* [https://dribbble.com/](https://dribbble.com/)\r\n* [https://framer.com/marketplace/](https://framer.com/marketplace/)\r\n* [https://webflow.com/templates](https://webflow.com/templates)\r\n* [https://flowbase.co/](https://flowbase.co/)\r\n* [https://relume.io/](https://relume.io/)\r\n* [https://mobbin.com/](https://mobbin.com/)\r\n* [https://mui.com/store/](https://mui.com/store/)\r\n* [https://elements.envato.com/web-templates](https://elements.envato.com/web-templates)\r\n* [https://unsection.com/](https://unsection.com/)\r\n* [https://land-book.com/](https://land-book.com/)\r\n* [https://flowponent.com/](https://flowponent.com/)\r\n* [https://curated.design/](https://curated.design/)\r\n* [https://www.landing.gallery/](https://www.landing.gallery/)\r\n* [https://saaslandingpage.com/](https://saaslandingpage.com/)\r\n* [https://admiretheweb.com/](https://admiretheweb.com/)\r\n* [https://godly.website/](https://godly.website/)\r\n\r\n## 🛠️ Design Builders & AI Tools\r\n\r\nTools that accelerate ideation, layout generation, and visual experimentation:\r\n\r\n* [https://aura.build/](https://aura.build/)\r\n* [https://stitch.withgoogle.com/](https://stitch.withgoogle.com/)\r\n* [https://ideogram.ai/](https://ideogram.ai/)\r\n* [https://chatgpt.com/g/g-PbV4y5Q7Q-ideogram-3-0-prompt-creator](https://chatgpt.com/g/g-PbV4y5Q7Q-ideogram-3-0-prompt-creator)\r\n\r\n---\r\n\r\nThis list is constantly evolving as new tools emerge and patterns shift. I’ll be diving deeper into **how I combine these tools in real-world projects**, including system design, animation strategies, and AI-assisted UI workflows, in upcoming posts.\r\n",
    "slug": "developer-toolset-2026",
    "bannerImage": "[https://picsum.photos/id/1018/1200/400?grayscale](https://picsum.photos/id/1018/1200/400?grayscale)",
    "id": "1"
  },
  {
    "title": "Spatial UI & Reactive Systems",
    "date": "2026-01-10",
    "category": "Experiments",
    "tags": [
      "Experiments",
      "Frontend"
    ],
    "excerpt": "Exploring spatial interfaces and reactive design systems that adapt to user intent in real-time.",
    "content": "\r\nSpatial computing is redefining the boundary of the 'window'. Our interfaces are becoming fluid, aware of depth and lighting, and most importantly, aware of the user's focus.\r\n\r\nIn this experiment, I've been exploring how we can use GLSL shaders and physics-based interactions to create menus that feel 'physical'.",
    "slug": "experimental-ui",
    "bannerImage": "https://picsum.photos/id/1015/1200/400?grayscale",
    "id": "2"
  }
];

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

/**
 * Get a single blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null;
}
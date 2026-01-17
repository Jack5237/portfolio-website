/**
 * Represents a showcase entry for the featured projects grid.
 */
export interface Project {
  /**
   * Primary label for the spotlighted work.
   */
  readonly title: string;
  /**
   * Describes the engagement format or category.
   */
  readonly category: string;
  /**
   * Supports describing the craft behind the project.
   */
  readonly discipline: string;
  /**
   * External link visitors can follow to learn more.
   */
  readonly href: string;
}

/**
 * Represents a technology or skill that has been learned.
 */
export interface Technology {
  /**
   * Name of the technology, framework, or tool.
   */
  readonly name: string;
  /**
   * Optional category grouping (e.g., "Languages", "Frameworks", "Tools").
   */
  readonly category?: string;
  /**
   * Optional referral or external link.
   */
  readonly href?: string;
}

/**
 * Represents a company or organization where work has been completed.
 */
export interface Company {
  /**
   * Company name or brand.
   */
  readonly name: string;
  /**
   * Optional description of the role or engagement type.
   */
  readonly description?: string;
  /**
   * Optional URL to company website or work showcase.
   */
  readonly href?: string;
}

export const FEATURED_PROJECTS: Project[] = [
  {
    title: "Portfolio Website",
    category: "Personal Portfolio",
    discipline: "Full Stack Development",
    href: "https://github.com/Jack5237/portfolio-website",
  },
  {
    title: "Z3D.AI ",
    category: "AI Model Maker",
    discipline: "Full Stack Development",
    href: "https://z3d.ai",
  },
  {
    title: "Rust-central",
    category: "Game-Server Management",
    discipline: "Full Stack Development",
    href: "https://rust-central.xyz",
  },
  {
    title: "byte.com - Course Maker",
    category: "Educational Platform",
    discipline: "Full Stack Development",
    href: "https://byte-com-course-website.onrender.com",
  },
  {
    title: "Imposter Online",
    category: "Word Imposter Game",
    discipline: "Full Stack Development",
    href: "https://wordimposter.online",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
  {
    title: "Coming Soon...",
    category: "Project",
    discipline: "Development",
    href: "#",
  },
];

export const TECHNOLOGIES_LEARNED: Technology[] = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Rust", category: "Languages" },
  { name: "C++", category: "Languages" },
  { name: "C#", category: "Languages" },
  { name: "Kotlin", category: "Languages" },
  { name: "PHP", category: "Languages" },
  { name: "Tailwind CSS", category: "Languages" },
  { name: "HTML", category: "Languages" },
  { name: "CSS", category: "Languages" },
  { name: "Boostrap", category: "Languages" },
  { name: "SQL", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "Java", category: "Languages" },
  { name: "Go", category: "Languages" },
  { name: "Node.js", category: "Runtime" },
  { name: "Next.js", category: "Frameworks" },
  { name: "Hono", category: "Frameworks" },
  { name: "Bhvr.dev", category: "Frameworks" },
  { name: "React", category: "Frameworks" },
  { name: "Express.js", category: "Frameworks" },
  { name: "Django", category: "Frameworks" },
  { name: "Vue.js", category: "Frameworks" },
  { name: "Angular", category: "Frameworks" },
  { name: "Svelte", category: "Frameworks" },
  { name: "Nuxt.js", category: "Frameworks" },
  { name: "Astro", category: "Frameworks" },
  { name: "Remix", category: "Frameworks" },
  { name: "Laravel", category: "Frameworks" },
  { name: "FastAPI", category: "Frameworks" },
  { name: "Supabase", category: "Databases" },
  { name: "NeonDB", category: "Databases" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Git", category: "DevOps" },
  { name: "AWS", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Vercel", category: "Cloud" },
  { name: "Render", category: "Cloud" },
  { name: "Fly.io", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "REST APIs", category: "Architecture" },
  { name: "GraphQL", category: "Architecture" },
  { name: "Microservices", category: "Architecture" },
  { name: "WebSockets", category: "Protocols" },
  { name: "Message Queues", category: "Architecture" },
  // Referral Links moved here
  {
    name: "V0",
    category: "Tools",
    href: "https://v0.app/ref/E2QFM5",
  },
  {
    name: "Convex",
    category: "Tools",
    href: "https://convex.dev/referral/JACK264170",
  },
  {
    name: "WisprFlow",
    category: "Tools",
    href: "https://wisprflow.ai/r?JACK742",
  },
  {
    name: "Warp",
    category: "Tools",
    href: "https://app.warp.dev/referral/3WQGY4",
  },
];

/**
 * Represents a blog post entry.
 */
export interface BlogPost {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly category: string;
  readonly tags: string[];
  readonly excerpt: string;
  readonly content: string;
  readonly slug: string;
  /**
   * Banner image URL for the blog post.
   */
  readonly bannerImage: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Tools I Use in 2026",
    date: "January 16, 2026",
    category: "Full-stack",
    tags: ["Full-stack", "Backend", "Frontend"],
    excerpt:
      "A comprehensive deep dive into the modern stack, AI-integrated workflows, and hardware that defines high-performance engineering in 2026.",
    content:
      "Engineering in 2026 is no longer about just writing code; it's about orchestration. The tools we use have evolved from simple text editors to integrated reasoning environments.\n\n### 1. The Core Stack\nMy daily driver remains centered around the **Rust ecosystem** for performance-critical services, paired with **Next.js 16** for seamless full-stack orchestration.\n\n### 2. AI & Reasoning\nWe've moved past simple autocompletion. Tools like **Cursor** and integrated agentic frameworks allow for high-level architectural planning that translates directly into robust implementations.\n\n### 3. Hardware Essentials\nPerformance isn't just software. A split ergonomic setup and high-refresh minimalist displays are key to maintaining long-term flow states.\n\nStay tuned as I dive deeper into each of these categories in upcoming posts.",
    slug: "developer-toolset-2026",
    bannerImage: "https://picsum.photos/id/1018/1200/400?grayscale",
  },
  {
    id: "2",
    title: "Spatial UI & Reactive Systems",
    date: "January 10, 2026",
    category: "Expermints",
    tags: ["Expermints", "Frontend"],
    excerpt:
      "Exploring spatial interfaces and reactive design systems that adapt to user intent in real-time.",
    content:
      "Spatial computing is redefining the boundary of the 'window'. Our interfaces are becoming fluid, aware of depth and lighting, and most importantly, aware of the user's focus.\n\nIn this expermint, I've been exploring how we can use GLSL shaders and physics-based interactions to create menus that feel 'physical'.",
    slug: "experimental-ui",
    bannerImage: "https://picsum.photos/id/1015/1200/400?grayscale",
  },
];

/**
 * Represents an item in the masonry background gallery.
 */
export interface MasonryItem {
  /**
   * Unique identifier for the masonry item.
   */
  readonly id: string;
  /**
   * Image URL or path for the masonry item.
   */
  readonly img: string;
  /**
   * Optional URL to link to when item is clicked.
   */
  readonly url?: string;
  /**
   * Height of the masonry item in pixels.
   */
  readonly height: number;
}

/**
 * Collection of website screenshots for the hero section masonry background.
 * Optimized with high-quality placeholder images.
 */
export const MASONRY_ITEMS: MasonryItem[] = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://www.afrotype.com/danfo",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://www.pithafrica.com/",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://2022.madebynull.com/",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1025/600/500?grayscale",
    url: "https://fayemi.design/",
    height: 350,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1035/600/700?grayscale",
    url: "https://paystack.com/terminal/dash/",
    height: 450,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1043/600/600?grayscale",
    url: "https://www.afrotype.com/tac",
    height: 300,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1048/600/850?grayscale",
    url: "https://kortyeo.madebynull.com/",
    height: 500,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1050/600/550?grayscale",
    height: 280,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1052/600/650?grayscale",
    height: 380,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1060/600/720?grayscale",
    height: 420,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1062/600/480?grayscale",
    height: 320,
  },
  {
    id: "12",
    img: "https://picsum.photos/id/1067/600/590?grayscale",
    height: 360,
  },
];

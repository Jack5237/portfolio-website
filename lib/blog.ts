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

// Static blog posts data - in production, this would be generated at build time
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Tools I Use in 2026",
    date: "2026-01-16",
    category: "Full-stack",
    tags: ["Full-stack", "Backend", "Frontend"],
    excerpt: "A comprehensive deep dive into the modern stack, AI-integrated workflows, and hardware that defines high-performance engineering in 2026.",
    content: `Engineering in 2026 is no longer about just writing code; it's about orchestration. The tools we use have evolved from simple text editors to integrated reasoning environments.

## 1. The Core Stack

My daily driver remains centered around the **Rust ecosystem** for performance-critical services, paired with **Next.js 16** for seamless full-stack orchestration.

## 2. AI & Reasoning

We've moved past simple autocompletion. Tools like **Cursor** and integrated agentic frameworks allow for high-level architectural planning that translates directly into robust implementations.

## 3. Hardware Essentials

Performance isn't just software. A split ergonomic setup and high-refresh minimalist displays are key to maintaining long-term flow states.

Stay tuned as I dive deeper into each of these categories in upcoming posts.`,
    slug: "developer-toolset-2026",
    bannerImage: "https://picsum.photos/id/1018/1200/400?grayscale",
  },
  {
    id: "2",
    title: "Spatial UI & Reactive Systems",
    date: "2026-01-10",
    category: "Experiments",
    tags: ["Experiments", "Frontend"],
    excerpt: "Exploring spatial interfaces and reactive design systems that adapt to user intent in real-time.",
    content: `Spatial computing is redefining the boundary of the 'window'. Our interfaces are becoming fluid, aware of depth and lighting, and most importantly, aware of the user's focus.

In this experiment, I've been exploring how we can use GLSL shaders and physics-based interactions to create menus that feel 'physical'.`,
    slug: "experimental-ui",
    bannerImage: "https://picsum.photos/id/1015/1200/400?grayscale",
  },
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
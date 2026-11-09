import matter from "gray-matter";

import type { BlogPost } from "@/lib/types";

/**
 * Markdown posts are bundled at build time (Cloudflare Workers have no
 * filesystem at runtime). Adding a file to content/blog/ is picked up on the
 * next build.
 */
const RAW_POSTS = (
  import.meta as unknown as {
    glob: (
      pattern: string,
      options: { query: string; import: string; eager: boolean },
    ) => Record<string, string>;
  }
).glob("/content/blog/*.md", { query: "?raw", import: "default", eager: true });

/** Parse one raw markdown file (path + source) into a BlogPost. */
function readPost(filePath: string, raw: string): BlogPost | null {
  try {
    const { data, content } = matter(raw);
    const slug = filePath.split("/").pop()?.replace(/\.md$/, "") ?? "";

    return {
      id: slug,
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      excerpt: data.excerpt || `${content.slice(0, 150)}...`,
      content,
      bannerImage: data.bannerImage || "",
    };
  } catch (error) {
    console.error(`Error reading blog post ${filePath}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return Object.entries(RAW_POSTS)
    .map(([filePath, raw]) => readPost(filePath, raw))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  // Reject anything that isn't a plain slug.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  return getAllBlogPosts().find((post) => post.slug === slug) ?? null;
}

export function estimateReadingMinutes(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

import matter from "gray-matter";

import { RAW_POSTS } from "@/lib/blog-posts.generated";
import type { BlogPost } from "@/lib/types";

function readPost(slug: string): BlogPost | null {
  if (!Object.hasOwn(RAW_POSTS, slug)) return null;
  const raw = RAW_POSTS[slug];
  try {
    const { data, content } = matter(raw);

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
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return Object.keys(RAW_POSTS)
    .map(readPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  return readPost(slug);
}

export function estimateReadingMinutes(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

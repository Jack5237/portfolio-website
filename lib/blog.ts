import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { BlogPost } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPost(fileName: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
    const { data, content } = matter(raw);

    return {
      id: path.basename(fileName, ".md"),
      slug: path.basename(fileName, ".md"),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      category: data.category || "Uncategorized",
      tags: data.tags || [],
      excerpt: data.excerpt || `${content.slice(0, 150)}...`,
      content,
      bannerImage: data.bannerImage || "",
    };
  } catch (error) {
    console.error(`Error reading blog post ${fileName}:`, error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    console.warn(`Blog directory does not exist at: ${BLOG_DIR}`);
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  // ponytail: slug comes from the filesystem-backed route, but normalise anyway
  // so a crafted path can never escape content/blog.
  if (!/^[a-z0-9-]+$/i.test(slug)) return null;
  return readPost(`${slug}.md`);
}

export function estimateReadingMinutes(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
}

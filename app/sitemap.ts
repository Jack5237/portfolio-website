import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.jacksdevfolio.com";

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      url: `${BASE_URL}/blog?post=${file.replace(/\.md$/, "")}`,
      lastModified: new Date(data.date || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL;

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  const blogPosts = getBlogPosts();

  return [...staticRoutes, ...blogPosts];
}

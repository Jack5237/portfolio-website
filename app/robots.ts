import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.jacksdevfolio.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["ClaudeBot", "ChatGPT-User", "Google-Extended", "DeepSeekBot", "Applebot-Extended", "PerplexityBot"],
        allow: ["/"],
        crawlDelay: 0,
      },
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/.vercel/"],
        crawlDelay: 1,
      },
      {
        userAgent: "AdsBot-Google",
        allow: ["/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}

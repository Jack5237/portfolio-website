/**
 * Application configuration and constants
 */

export const SITE_CONFIG = {
  name: "Jack",
  description: "Full stack developer from Scotland, UK",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.jacksdevfolio.com",
  email: "contact.jack.dev@gmail.com",
  social: {
    twitter: "https://x.com/Jack1168556",
    github: "https://github.com/Jack5237",
    linkedin: "https://www.linkedin.com/in/jack-dev-a732b4397",
    discord: "https://discord.com/users/ttv_jack_",
  },
};

export const BLOG_CONFIG = {
  FEATURED_CATEGORIES: ["AI", "Development", "Tools", "Design", "Writing"],
  POSTS_PER_PAGE: 10,
  CACHE_DURATION: 3600, // 1 hour in seconds
  STALE_WHILE_REVALIDATE: 86400, // 1 day in seconds
};

export const RATE_LIMIT_CONFIG = {
  WINDOW_MS: 10 * 60 * 1000, // 10 minutes
  MAX_REQUESTS_PER_WINDOW: 3,
};

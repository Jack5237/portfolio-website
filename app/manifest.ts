import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jack - Full Stack Developer Portfolio",
    short_name: "Jack Dev",
    description: "Portfolio of Jack, a full stack developer from Scotland specializing in React, Next.js, and TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      {
        src: "/images/brand/avatarImg.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/brand/avatarImg.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/brand/avatarImg.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["productivity", "business"],
  };
}

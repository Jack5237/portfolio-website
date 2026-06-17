import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jack - Full Stack Developer",
    short_name: "Jack",
    description: "Full stack developer from Scotland, UK.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/avatarImg.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

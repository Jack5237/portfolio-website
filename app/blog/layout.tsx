import type { Metadata } from "next";
import type { ReactNode } from "react";

interface BlogLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Blog - Jack",
  description:
    "Insights on full-stack development, software engineering, and technology from Jack.",
  keywords: [
    "blog",
    "development",
    "tutorials",
    "web development",
    "software engineering",
  ],
  openGraph: {
    title: "Blog - Jack",
    description:
      "Insights on full-stack development, software engineering, and technology.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Jack",
    description: "Insights on full-stack development and software engineering.",
    images: ["/avatarImg.png"],
  },
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}

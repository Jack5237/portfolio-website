import type { Metadata } from "next";
import type { ReactNode } from "react";

interface BlogLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Blog - Full Stack Development Insights | Jack",
  description:
    "Read articles on full-stack development, TypeScript, React, Next.js, software engineering best practices, and web development tips from experienced developer Jack.",
  keywords: [
    "blog",
    "development blog",
    "web development",
    "software engineering",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "tutorials",
    "code tips",
    "programming insights",
    "full stack",
    "Node.js",
    "frontend",
    "backend",
  ],
  openGraph: {
    title: "Blog - Full Stack Development Insights",
    description:
      "Articles on full-stack development, modern web technologies, and software engineering best practices.",
    url: "https://www.jacksdevfolio.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack's Development Blog",
        secureUrl: "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Development Insights",
    description: "Articles on full-stack development and modern web technologies.",
    images: ["https://www.jacksdevfolio.com/images/brand/avatarImg.png"],
  },
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return <>{children}</>;
}

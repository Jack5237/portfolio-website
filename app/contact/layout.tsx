import type { Metadata } from "next";
import type { ReactNode } from "react";

interface ContactLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Contact - Jack",
  description:
    "Get in touch with Jack. Interested in collaborating or have a question? Reach out today.",
  openGraph: {
    title: "Contact - Jack",
    description: "Get in touch with Jack for collaboration or inquiries.",
    url: "/contact",
    type: "website",
    images: [
      {
        url: "/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Jack",
    description: "Get in touch with Jack for collaboration or inquiries.",
    images: ["/avatarImg.png"],
  },
};

export default function ContactLayout({ children }: ContactLayoutProps) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import type { ReactNode } from "react";

interface ConnectLayoutProps {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Connect with Jack. Find all my social links, website, and QR code to share.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect",
    description: "All ways to connect with Jack — socials, website, and more.",
    url: "/connect",
    type: "website",
    images: [
      {
        url: "/images/brand/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect",
    description: "All ways to connect with Jack.",
    images: ["/images/brand/avatarImg.png"],
  },
};

export default function ConnectLayout({ children }: ConnectLayoutProps) {
  return <>{children}</>;
}

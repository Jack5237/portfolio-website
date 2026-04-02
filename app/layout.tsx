import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import {
  Space_Grotesk,
  Inter,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { TopBanner } from "@/components/navigation/top-banner";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

import "lenis/dist/lenis.css";

/**
 * Optimized Google Fonts with Next.js 14+ automatic optimization:
 * - Self-hosting for performance
 * - Zero layout shift
 * - Automatic subsetting
 * - Preloading optimization
 */

// Display headings and small-caps elements
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Main body text - clean and readable
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Fallback for geometric elements
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Primary sans-serif font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const logger = getWebLogger();
logger.info("Loaded root layout module", { component: "RootLayout" });

export const metadata: Metadata = {
  title: {
    default: "Jack - Full stack developer",
    template: "%s · Jack",
  },
  description:
    "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends. Passionate about clean code, performance, and full-stack engineering.",
  keywords: [
    "Jack",
    "Full stack developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Developer",
    "Scotland",
    "Portfolio",
    "Developer Portfolio",
    "Programming",
    "Software Development",
  ],
  authors: [{ name: "Jack", url: "https://github.com/Jack5237" }],
  creator: "Jack",
  publisher: "Jack",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://portfolio-website-sepia-one-40.vercel.app",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jack - Full stack developer",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends. Passionate about clean code, performance, and full-stack engineering.",
    url: "/",
    siteName: "Jack",
    locale: "en_GB",
    type: "website",
    emails: ["contact.jack.dev@gmail.com"],
    images: [
      {
        url: "/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Full stack developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack - Full stack developer",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends.",
    creator: "@Jack1168556",
    images: ["/avatarImg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/avatarImg.png",
    apple: "/avatarImg.png",
  },
  verification: {
    google: "add-your-google-verification-code", // Add your actual Google verification code
  },
};

interface RootLayoutProps {
  /**
   * The React sub-tree that Next.js will render inside the root layout shell.
   */
  readonly children: ReactNode;
}

/**
 * Wraps the application with global providers and the monochrome base styling.
 * @param props - Container for the page tree supplied by Next.js.
 * @returns A fully themed document shell.
 */
const RootLayout = ({ children }: RootLayoutProps) => {
  logger.debug("Rendering root layout", { component: "RootLayout" });

  // JSON-LD Schema for person/professional profile
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jack",
    url: "https://portfolio-website-sepia-one-40.vercel.app",
    image: "https://portfolio-website-sepia-one-40.vercel.app/avatarImg.png",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/Jack5237",
      "https://www.linkedin.com/in/jack-m-a732b4397",
      "https://x.com/Jack1168556",
    ],
    email: "contact.jack.dev@gmail.com",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends.",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "bg-background text-foreground",
        spaceGrotesk.variable,
        inter.variable,
        outfit.variable,
        plusJakarta.variable,
      )}
    >
      <head>
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body text-foreground antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TopBanner />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

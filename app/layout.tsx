import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Space_Grotesk,
  Inter,
  Outfit,
  Plus_Jakarta_Sans,
} from "next/font/google";

import "@fontsource-variable/inter";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { TopBanner } from "@/components/navigation/top-banner";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

import "lenis/dist/lenis.css";

/**
 * Google Font: Outfit - Used for display headings and small-caps elements.
 */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/**
 * Google Font: Plus Jakarta Sans - Used for cleaner body text.
 */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

/**
 * Google Font: Space Grotesk - Kept as fallback for geometric feel.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const logger = getWebLogger();
logger.info("Loaded root layout module", { component: "RootLayout" });

export const metadata: Metadata = {
  title: {
    default: "Jack - Full Stack Developer",
    template: "%s · Jack",
  },
  description:
    "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends. Passionate about clean code, performance, and full-stack engineering.",
  keywords: [
    "Jack",
    "Full Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web Developer",
    "Scotland",
    "Portfolio",
    "Developer Portfolio",
  ],
  authors: [{ name: "Jack", url: "https://github.com/Jack5237" }],
  creator: "Jack",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://portfolio-website-sepia-one-40.vercel.app",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jack - Full Stack Developer",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends.",
    url: "/",
    siteName: "Jack",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack - Full Stack Developer",
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
      <body
        className={cn(
          "min-h-screen bg-[#050505] font-body text-foreground antialiased",
          inter.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
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

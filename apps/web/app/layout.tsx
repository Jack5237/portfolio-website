import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";

import "@fontsource-variable/inter";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { DotGridBackground } from "@/components/background/dot-grid-background";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

import "lenis/dist/lenis.css";

/**
 * Google Font: Space Grotesk - Used for bold headings and display text.
 * This font provides a modern, geometric sans-serif that works well for large text.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/**
 * Google Font: Inter - Used for body text and smaller elements.
 * This provides clean readability for paragraphs and UI text.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const logger = getWebLogger();
logger.info("Loaded root layout module", { component: "RootLayout" });

export const metadata: Metadata = {
  title: {
    default: "Monochrome Portfolio",
    template: "%s · Monochrome Portfolio",
  },
  description:
    "A monochrome digital portfolio experience inspired by Oluwaseyi's seyi.dev, modernized with Next.js, Tailwind CSS, and shadcn/ui.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Monochrome Portfolio",
    description:
      "A bold black and white playground for creative technologists, crafted with the Next.js app router.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monochrome Portfolio",
    description:
      "A bold black and white playground for creative technologists, crafted with the Next.js app router.",
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
        inter.variable
      )}
    >
      <body
        className={cn(
          "min-h-screen bg-[#050505] font-sans text-foreground antialiased",
          inter.variable
        )}
      >
        <DotGridBackground />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;

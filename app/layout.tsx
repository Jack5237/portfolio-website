import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import dynamic from "next/dynamic";
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
import { MainNavbar } from "@/components/navigation/main-navbar";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

const TopBanner = dynamic(() => import("@/components/navigation/top-banner").then(mod => ({ default: mod.TopBanner })), { ssr: false });

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
    "Software engineer",
    "React developer",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Web developer",
    "Portfolio",
    "Developer portfolio",
    "Full stack web development",
    "Frontend developer",
    "Backend developer",
    "JavaScript",
    "Web design",
    "Responsive design",
    "Performance optimization",
    "Software development",
    "Programming",
    "Scotland",
    "UK developer",
    "E-commerce development",
    "API development",
    "Database design",
  ],
  authors: [{ name: "Jack", url: "https://github.com/Jack5237" }],
  creator: "Jack",
  publisher: "Jack",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.jacksdevfolio.com",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jack - Full Stack Developer Portfolio",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions with React, Next.js, TypeScript, and modern web technologies. Expert in responsive design and performance optimization.",
    url: "/",
    siteName: "Jack's Developer Portfolio",
    locale: "en_GB",
    type: "website",
    emails: ["contact@jacksdevfolio.com"],
    images: [
      {
        url: "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Full Stack Developer",
        type: "image/png",
        secureUrl: "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack - Full stack developer",
    description:
      "Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends.",
    creator: "@Jack1168556",
    images: ["/images/brand/avatarImg.png"],
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
    icon: "/images/brand/avatarImg.png",
    apple: "/images/brand/avatarImg.png",
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
    "@id": "https://www.jacksdevfolio.com/#person",
    name: "Jack",
    url: "https://www.jacksdevfolio.com",
    image: {
      "@type": "ImageObject",
      url: "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
      width: 512,
      height: 512,
    },
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      "https://github.com/Jack5237",
      "https://www.linkedin.com/in/jack-dev-a732b4397",
      "https://x.com/Jack1168556",
      "https://discord.com/users/ttv_jack_",
    ],
    email: "contact@jacksdevfolio.com",
    description:
      "Full stack developer from Scotland, UK. Specializes in React, Next.js, TypeScript, and Node.js. Crafting end-to-end solutions from robust backends to polished frontends.",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Web Development",
      "Full Stack Development",
      "JavaScript",
      "API Design",
      "Database Design",
      "Web Performance",
      "Responsive Design",
    ],
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "https://www.jacksdevfolio.com"} />
        <meta name="theme-color" content="#000000" />
        <meta name="robots" content="index, follow, noarchive" />
        <link rel="alternate" type="application/json+ld" href="/api/health" />
        <link rel="alternate" type="application/openapi+json" href="/openapi.json" title="OpenAPI Specification" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <Script
          id="performance-monitoring"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('PerformanceObserver' in window) {
                try {
                  const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                      if (entry.duration > 3000) {
                        console.warn('Long task detected:', entry.name, entry.duration);
                      }
                    }
                  });
                  observer.observe({ entryTypes: ['longtask'] });
                } catch (e) {
                  // PerformanceObserver not supported
                }
              }
            `,
          }}
        />
        <Script
          id="disable-ads-thin-pages"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__disableAds = /^\/(privacy|terms|cookies|contact)\/?$/.test(window.location.pathname);
            `,
          }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9861926351506362"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CJ60ECJTVZ"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CJ60ECJTVZ');
            `,
          }}
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
          <MainNavbar />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;

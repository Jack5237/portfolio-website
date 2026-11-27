"use client";

import { ArrowUp, Github, Linkedin, Mail, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Link from "next/link";
import type { SVGProps } from "react";

import { getWebLogger } from "@/lib/logger";

// WebGL shader: load after hydration so it never blocks first paint or the main bundle.
const GradientASCII = dynamic(() => import("@/components/ui/gradient-ascii"), { ssr: false });

const logger = getWebLogger();
logger.info("Initialized footer module", { component: "Footer" });

export type SocialLinks = FooterProps["socialLinks"];

interface FooterProps {
  /**
   * Email address for contact.
   */
  readonly email: string;
  /**
   * Optional social links.
   */
  readonly socialLinks?: {
    readonly twitter?: string;
    readonly github?: string;
    readonly linkedin?: string;
    readonly discord?: string;
    readonly tiktok?: string;
    readonly instagram?: string;
    readonly facebook?: string;
  };
}

// lucide has no Discord brand icon, so the official glyph is inlined.
const DiscordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3a14.7 14.7 0 0 0-.634 1.307 18.27 18.27 0 0 0-5.487 0A14.1 14.1 0 0 0 9.13 3a19.74 19.74 0 0 0-4.433 1.37C1.89 8.56 1.13 12.646 1.51 16.674a19.9 19.9 0 0 0 6.073 3.07 14.8 14.8 0 0 0 1.30-2.114 12.9 12.9 0 0 1-2.05-.98c.172-.126.34-.258.502-.394a14.2 14.2 0 0 0 12.31 0c.163.136.33.268.502.394-.655.39-1.343.72-2.052.98.37.74.806 1.447 1.3 2.113a19.86 19.86 0 0 0 6.075-3.07c.446-4.67-.762-8.718-3.153-12.305ZM8.52 14.2c-1.183 0-2.157-1.085-2.157-2.42s.95-2.42 2.157-2.42c1.21 0 2.18 1.095 2.157 2.42 0 1.335-.95 2.42-2.157 2.42Zm6.96 0c-1.183 0-2.157-1.085-2.157-2.42s.95-2.42 2.157-2.42c1.21 0 2.18 1.095 2.157 2.42 0 1.335-.947 2.42-2.157 2.42Z" />
  </svg>
);

// lucide's Twitter bird is retired; X's current glyph (same one used on caledonia-systems).
const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const QUICK_LINKS = [
  { label: "Projects", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_ITEMS = [
  { key: "twitter", label: "Twitter/X", Icon: XIcon },
  { key: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookIcon },
  { key: "github", label: "GitHub", Icon: Github },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "discord", label: "Discord", Icon: DiscordIcon },
] as const;

/**
 * Enhanced footer component with improved design and comprehensive information.
 * @param props - Footer configuration including contact and social information.
 * @returns The footer markup.
 */
export const Footer = ({ email, socialLinks }: FooterProps) => {
  logger.debug("Rendering footer", { component: "Footer", email });

  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();

  /**
   * Handles smooth scroll to top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    logger.debug("Scrolled to top", { component: "Footer" });
  };

  return (
    <footer className="relative isolate overflow-visible pb-4 pt-10 sm:pb-5 sm:pt-12 md:pb-6 md:pt-14 lg:pb-8 lg:pt-16">
      {/* ASCII "rise" glow where the globe used to be: centred on the footer's top edge, rising upward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 aspect-[4/1] w-[clamp(36rem,100vw,96rem)] -translate-x-1/2 -translate-y-full opacity-60 [mask-image:radial-gradient(ellipse_at_50%_100%,black_0%,transparent_70%)]"
      >
        <GradientASCII
          shape="rise"
          colors={["#1e3fd8", "#3b6fd9", "#a5d8ff", "#f6f8ff"]}
          cellSize={14}
          glyphOpacity={0.45}
          glow={0.08}
          speed={0.6}
          mouseInteraction={false}
          clickEffect="none"
          lightMode={resolvedTheme === "light"}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 z-10 border-t border-foreground/20 bg-muted" />
      <div className="container relative z-20 mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Footer Grid - Responsive for all screen sizes */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:gap-y-3">
          {/* Contact Section */}
          <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:justify-items-start lg:space-y-0 lg:text-left">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Get in Touch
            </h3>
            <Link
              href={`mailto:${email}?subject=Let's%20collaborate`}
              className="text-xs sm:text-sm uppercase tracking-wide inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-brand break-all"
            >
              <Mail className="h-[1em] w-[1em] shrink-0 text-brand" aria-hidden="true" />
              {email}
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed xl:whitespace-nowrap">
              Always open to new projects, collabs &amp; ideas. Replies within 24h.
            </p>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col items-center space-y-2 text-center sm:space-y-3 lg:col-span-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:justify-items-center lg:space-y-0">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Connect
            </h3>
            <nav aria-label="Social media" className="flex flex-nowrap justify-center gap-1.5">
              {SOCIAL_ITEMS.map(({ key, label, Icon }) => {
                const href = socialLinks?.[key];
                const base =
                  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs transition-all";
                if (!href) {
                  return (
                    <span
                      key={key}
                      aria-disabled="true"
                      title={`${label} (coming soon)`}
                      className={`${base} cursor-not-allowed border-foreground/15 opacity-40`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="sr-only">{label} (coming soon)</span>
                    </span>
                  );
                }
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className={`${base} border-foreground/25 bg-background hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white motion-reduce:transform-none`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{label} (opens in a new tab)</span>
                  </a>
                );
              })}
            </nav>
            <nav
              aria-label="Site"
              className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-muted-foreground"
            >
              {QUICK_LINKS.map(({ label, href }) => (
                <Link key={href} href={href} className="transition-colors hover:text-foreground">
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Location Section */}
          <div className="flex flex-col items-center space-y-2 text-center sm:col-span-2 sm:space-y-3 lg:col-span-1 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:justify-items-end lg:space-y-0 lg:text-right">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Location
            </h3>
            <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase tracking-wide text-foreground font-medium">
              <MapPin className="h-[1em] w-[1em] shrink-0 text-brand" aria-hidden="true" />
              Scotland, UK
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed xl:whitespace-nowrap">
              Full stack dev crafting fast, polished React &amp; Next.js products.
            </p>
          </div>
        </div>

        {/* Bottom Bar - Responsive Stack */}
        <div className="mt-6 flex flex-col gap-3 border-t border-foreground/10 pt-4 sm:mt-8 sm:gap-4 sm:pt-5 md:pt-6 lg:mt-10 text-xs uppercase tracking-wide text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Copyright */}
          <p className="order-3 lg:order-1 text-center lg:text-left">
            © {currentYear} Jack. All rights reserved.
          </p>

          {/* Scroll to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="order-1 lg:order-2 flex items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to top"
          >
            <span className="text-center">Scroll to top</span>
            <ArrowUp className="h-3.5 w-3.5 flex-shrink-0" />
          </button>

          {/* Legal Links */}
          <nav
            aria-label="Legal"
            className="order-2 lg:order-3 flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-6"
          >
            <a href="/sitemap.xml" className="transition-colors hover:text-foreground">
              Sitemap
            </a>
            <Link href="/developers" className="transition-colors hover:text-foreground">
              Developers
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-foreground">
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

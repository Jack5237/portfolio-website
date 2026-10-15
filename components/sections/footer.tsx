"use client";

import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import type { SVGProps } from "react";

import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized footer module", { component: "Footer" });

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
  };
}

// lucide has no Discord brand icon, so the official glyph is inlined.
const DiscordIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3a14.7 14.7 0 0 0-.634 1.307 18.27 18.27 0 0 0-5.487 0A14.1 14.1 0 0 0 9.13 3a19.74 19.74 0 0 0-4.433 1.37C1.89 8.56 1.13 12.646 1.51 16.674a19.9 19.9 0 0 0 6.073 3.07 14.8 14.8 0 0 0 1.30-2.114 12.9 12.9 0 0 1-2.05-.98c.172-.126.34-.258.502-.394a14.2 14.2 0 0 0 12.31 0c.163.136.33.268.502.394-.655.39-1.343.72-2.052.98.37.74.806 1.447 1.3 2.113a19.86 19.86 0 0 0 6.075-3.07c.446-4.67-.762-8.718-3.153-12.305ZM8.52 14.2c-1.183 0-2.157-1.085-2.157-2.42s.95-2.42 2.157-2.42c1.21 0 2.18 1.095 2.157 2.42 0 1.335-.95 2.42-2.157 2.42Zm6.96 0c-1.183 0-2.157-1.085-2.157-2.42s.95-2.42 2.157-2.42c1.21 0 2.18 1.095 2.157 2.42 0 1.335-.947 2.42-2.157 2.42Z" />
  </svg>
);

const SOCIAL_ITEMS = [
  { key: "twitter", label: "Twitter", Icon: Twitter },
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

  /**
   * Handles smooth scroll to top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    logger.debug("Scrolled to top", { component: "Footer" });
  };

  return (
    <footer className="border-t border-foreground/20 bg-muted/30 py-8 sm:py-10 md:py-12 lg:py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Main Footer Grid - Responsive for all screen sizes */}
        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Contact Section */}
          <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 lg:items-start lg:text-left">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Get in Touch
            </h3>
            <Link
              href={`mailto:${email}?subject=Let's%20collaborate`}
              className="text-xs sm:text-sm uppercase tracking-wide text-foreground transition-colors hover:text-accent break-all"
            >
              {email}
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Always open to discussing new projects and ideas.
            </p>
          </div>

          {/* Connect Section */}
          <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 text-center lg:col-span-1">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Connect
            </h3>
            <nav className="flex flex-wrap justify-center gap-2">
              {SOCIAL_ITEMS.map(({ key, label, Icon }) => {
                const href = socialLinks?.[key];
                if (!href) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-foreground/25 bg-background px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium uppercase tracking-wide transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Location Section */}
          <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1 lg:items-end lg:text-right">
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground font-semibold">
              Location
            </h3>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-foreground font-medium">
              Scotland, UK
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full stack developer building end-to-end solutions.
            </p>
          </div>
        </div>

        {/* Bottom Bar - Responsive Stack */}
        <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col gap-4 sm:gap-6 border-t border-foreground/10 pt-6 sm:pt-8 text-xs uppercase tracking-wide text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-8">
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
          <nav className="order-2 lg:order-3 flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-6">
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

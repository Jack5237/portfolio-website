"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

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
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium uppercase tracking-wide transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Twitter
                </a>
              )}
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium uppercase tracking-wide transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  GitHub
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium uppercase tracking-wide transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks?.discord && (
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-3 py-1 sm:px-4 sm:py-1.5 text-xs font-medium uppercase tracking-wide transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Discord
                </a>
              )}
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
            onClick={scrollToTop}
            className="order-1 lg:order-2 flex items-center justify-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll to top"
          >
            <span className="text-center">Scroll to top</span>
            <ArrowUp className="h-3.5 w-3.5 flex-shrink-0" />
          </button>

          {/* Legal Links */}
          <nav className="order-2 lg:order-3 flex flex-wrap justify-center lg:justify-end gap-3 sm:gap-4 lg:gap-6">
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/cookies"
              className="transition-colors hover:text-foreground"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

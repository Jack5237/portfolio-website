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
    <footer className="border-t border-foreground/20 bg-muted/30 py-10 sm:py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-3">
          {/* Contact Section */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:items-start md:text-left">
            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground">
              Get in Touch
            </h3>
            <Link
              href={`mailto:${email}?subject=Let's%20collaborate`}
              className="text-[10px] sm:text-xs uppercase tracking-[0.05rem] sm:tracking-[0.1rem] text-foreground transition-colors hover:text-muted-foreground"
            >
              {email}
            </Link>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Always open to discussing new projects and ideas.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 text-center sm:space-y-4">
            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground">
              Connect
            </h3>
            <nav className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {socialLinks?.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Twitter
                </a>
              )}
              {socialLinks?.github && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  GitHub
                </a>
              )}
              {socialLinks?.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  LinkedIn
                </a>
              )}
              {socialLinks?.discord && (
                <a
                  href={socialLinks.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-foreground/25 bg-background px-4 py-1.5 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-wider transition-all hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Discord
                </a>
              )}
            </nav>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:items-end md:text-right">
            <h3 className="text-[10px] sm:text-xs uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground">
              Location
            </h3>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-foreground">
              Scotland, UK
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Full stack developer building end-to-end solutions.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex flex-col gap-3 sm:gap-4 border-t border-foreground/10 pt-6 sm:pt-8 text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Jack. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Scroll to top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
          <nav className="flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-x-6 sm:gap-y-2">
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
              Cookies Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-foreground/20 bg-muted/30 py-10 sm:py-12 md:py-16 font-body">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-3">
          {/* Contact Section */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:items-start md:text-left">
            <h3 className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground/60">
              Get in Touch
            </h3>
            <Link
              href={`mailto:${email}?subject=Let's%20collaborate`}
              className="text-[10px] sm:text-xs uppercase tracking-[0.05rem] sm:tracking-[0.1rem] text-foreground transition-colors hover:text-muted-foreground"
            >
              {email}
            </Link>
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-light">
              Always open to discussing new projects and ideas.
            </p>
          </div>

          {/* Social Section */}
          <div className="flex flex-col items-center space-y-3 text-center sm:space-y-4">
            <h3 className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground/60">
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

          {/* Location Section */}
          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 md:items-end md:text-right">
            <h3 className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground/60">
              Location
            </h3>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-foreground">
              Scotland, UK
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground/60 font-light">
              Full stack developer building end-to-end solutions.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 md:mt-16 flex flex-col items-center border-t border-foreground/10 pt-10 px-4">
          {/* Constant Arrow above */}
          <ArrowUp
            size={18}
            className="animate-bounce mb-4 text-foreground opacity-20 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={scrollToTop}
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            {/* Copyright */}
            <p className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] text-muted-foreground/50 text-center md:text-left">
              © {currentYear} Jack. All rights reserved.
            </p>

            {/* Scroll Text - Horizontally aligned with Copyright */}
            <button
              onClick={scrollToTop}
              className="group text-[9px] sm:text-[10px] font-outfit uppercase tracking-[0.35rem] opacity-30 hover:opacity-100 transition-all text-center mx-auto"
            >
              Click to scroll to top
            </button>

            {/* Links */}
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <Link
                href="/terms"
                className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

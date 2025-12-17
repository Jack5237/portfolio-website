"use client";

import { useState } from "react";

import type { Company } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { ScrollSlide } from "@/components/ui/scroll-slide";

const logger = getWebLogger();
logger.info("Initialized referrals section module", { section: "Referrals" });

interface ReferralsSectionProps {
  /**
   * Collection of referral links to display.
   */
  readonly links: readonly Company[];
}

const INITIAL_DISPLAY_COUNT = 6;

/**
 * Displays referral links in a clean, professional layout.
 * @param props - Referral data to present.
 * @returns The referrals section markup.
 */
export const ReferralsSection = ({ links }: ReferralsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  logger.debug("Rendering referrals section", {
    section: "Referrals",
    total: links.length,
  });

  const displayedLinks = showAll
    ? links
    : links.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = links.length > INITIAL_DISPLAY_COUNT;

  return (
    <section className="space-y-6 sm:space-y-8 py-12 sm:py-16">
      <ScrollSlide>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
            My Referral Links
          </h2>
          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem]"
            >
              {showAll
                ? "Show Less"
                : `View More (+${links.length - INITIAL_DISPLAY_COUNT})`}
            </Button>
          )}
        </div>
      </ScrollSlide>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {displayedLinks.map((link, index) => {
          const isRightColumn = index % 2 === 1;
          const content = (
            <ScrollSlide
              delay={index * 100}
              className={cn(
                "group flex flex-col border-t border-foreground/15 pt-4 sm:pt-6 transition-colors hover:border-foreground",
                isRightColumn ? "items-end text-right" : "items-start text-left"
              )}
            >
              <h3 className="mb-1 sm:mb-1.5 text-lg sm:text-xl font-semibold uppercase tracking-wider transition-colors group-hover:text-accent">
                {link.name}
              </h3>
              {link.description && (
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {link.description}
                </p>
              )}
            </ScrollSlide>
          );

          if (link.href) {
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                {content}
              </a>
            );
          }

          return <div key={link.name}>{content}</div>;
        })}
      </div>
    </section>
  );
};

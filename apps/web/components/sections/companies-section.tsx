"use client";

import { useState } from "react";
import Link from "next/link";

import type { Company } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized companies section module", { section: "Companies" });

interface CompaniesSectionProps {
  /**
   * Collection of companies to display.
   */
  readonly companies: readonly Company[];
}

const INITIAL_DISPLAY_COUNT = 4;

/**
 * Displays companies worked with in a clean, professional layout with expandable view.
 * @param props - Company data to present.
 * @returns The companies section markup.
 */
export const CompaniesSection = ({ companies }: CompaniesSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  logger.debug("Rendering companies section", { section: "Companies", total: companies.length });

  const displayedCompanies = showAll ? companies : companies.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = companies.length > INITIAL_DISPLAY_COUNT;

  return (
    <section className="space-y-6 sm:space-y-8 py-12 sm:py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
          Companies I&apos;ve Worked With
        </h2>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem]"
          >
            {showAll ? "Show Less" : `View More (+${companies.length - INITIAL_DISPLAY_COUNT})`}
          </Button>
        )}
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {displayedCompanies.map((company) => {
          const content = (
            <div
              className={cn(
                "group border-t border-foreground/15 pt-4 sm:pt-6 transition-colors",
                "hover:border-foreground"
              )}
            >
              <h3 className="mb-1 sm:mb-1.5 text-lg sm:text-xl font-semibold uppercase tracking-wider transition-colors group-hover:text-accent">
                {company.name}
              </h3>
              {company.description && (
                <p className="text-[10px] sm:text-xs text-muted-foreground">{company.description}</p>
              )}
            </div>
          );

          if (company.href) {
            return (
              <Link key={company.name} href={company.href} target="_blank" rel="noreferrer">
                {content}
              </Link>
            );
          }

          return <div key={company.name}>{content}</div>;
        })}
      </div>
    </section>
  );
};

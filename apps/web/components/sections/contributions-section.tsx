import Link from "next/link";

import type { Contribution } from "@/lib/content";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized contributions section module", { section: "Contributions" });

interface ContributionsSectionProps {
  /**
   * List of community resources to present.
   */
  readonly contributions: readonly Contribution[];
}

/**
 * Highlights community tooling to underline generosity and collaboration.
 * @param props - Contribution metadata.
 * @returns The contributions section markup.
 */
export const ContributionsSection = ({ contributions }: ContributionsSectionProps) => {
  logger.debug("Rendering contributions section", {
    section: "Contributions",
    total: contributions.length
  });

  return (
    <section className="space-y-8 py-24">
      <h2 className="text-sm uppercase tracking-[0.4rem] text-muted-foreground">Community Contributions</h2>
      <div className="grid gap-10 md:grid-cols-2">
        {contributions.map((contribution) => (
          <article key={contribution.href} className="space-y-4">
            <h3 className="text-2xl font-semibold uppercase tracking-wider">{contribution.title}</h3>
            <p className="max-w-md text-sm text-muted-foreground">{contribution.description}</p>
            <Link
              href={contribution.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm uppercase tracking-[0.3rem] text-accent hover:text-foreground"
            >
              View Resource
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};


import type { Award } from "@/lib/content";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized awards section module", { section: "Awards" });

interface AwardsSectionProps {
  /**
   * Array of accolades to showcase.
   */
  readonly awards: readonly Award[];
}

/**
 * Outputs a dense awards grid that communicates credibility through repetition.
 * @param props - Award copy to render.
 * @returns The awards section markup.
 */
export const AwardsSection = ({ awards }: AwardsSectionProps) => {
  logger.debug("Rendering awards section", { section: "Awards", total: awards.length });

  return (
    <section className="space-y-10 py-24">
      <h2 className="text-sm uppercase tracking-[0.4rem] text-muted-foreground">Awards × Recognition</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {awards.map((award, index) => (
          <p
            key={`${award.body}-${index}`}
            className="border border-foreground/15 bg-muted px-6 py-8 text-sm uppercase tracking-[0.3rem] text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            {award.body}
          </p>
        ))}
      </div>
    </section>
  );
};


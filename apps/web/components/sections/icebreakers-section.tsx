import Link from "next/link";

import type { Icebreaker } from "@/lib/content";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized icebreakers section module", { section: "Icebreakers" });

interface IcebreakersSectionProps {
  /**
   * Personal tidbits to display.
   */
  readonly icebreakers: readonly Icebreaker[];
}

/**
 * Offers personable prompts that make outreach feel natural.
 * @param props - Icebreaker content.
 * @returns The icebreaker section markup.
 */
export const IcebreakersSection = ({ icebreakers }: IcebreakersSectionProps) => {
  logger.debug("Rendering icebreakers section", { section: "Icebreakers", total: icebreakers.length });

  return (
    <section className="grid gap-8 py-24 md:grid-cols-2">
      <div className="space-y-6">
        <h2 className="text-sm uppercase tracking-[0.4rem] text-muted-foreground">Interests</h2>
        <p className="max-w-lg text-sm text-muted-foreground">
          Art direction, creative development, WebGL, Web3, and crafting expressive e-commerce experiences keep me
          busy—and inspired.
        </p>
      </div>
      <div className="space-y-6">
        <h3 className="text-sm uppercase tracking-[0.4rem] text-muted-foreground">Icebreakers</h3>
        <ul className="space-y-4 text-sm text-muted-foreground">
          {icebreakers.map((icebreaker, index) => (
            <li key={`${icebreaker.label}-${index}`} className="flex flex-wrap items-center gap-3">
              <span>{icebreaker.label}</span>
              {icebreaker.cta ? (
                <Link
                  href={icebreaker.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs uppercase tracking-[0.35rem] text-accent hover:text-foreground"
                >
                  {icebreaker.cta.text}
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};


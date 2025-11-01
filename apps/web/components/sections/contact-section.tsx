import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized contact section module", { section: "Contact" });

interface ContactSectionProps {
  /**
   * Email address to use for the main call-to-action.
   */
  readonly email: string;
}

/**
 * Encourages collaboration with a looping marquee-inspired call-to-action.
 * @param props - Contact configuration for the section.
 * @returns The contact section markup.
 */
export const ContactSection = ({ email }: ContactSectionProps) => {
  const mailto = `mailto:${email}?subject=Let%27s%20collaborate`;
  logger.debug("Rendering contact section", { section: "Contact", mailto });

  return (
    <section className="space-y-8 py-24">
      <p className="text-lg uppercase tracking-[0.45rem] text-muted-foreground">
        Let&apos;s talk — Let&apos;s collaborate — Say hello — Wanna be starting something?
      </p>
      <Button asChild size="lg" variant="ghost" className="border border-foreground/25">
        <Link href={mailto}>{email}</Link>
      </Button>
    </section>
  );
};


import { DecryptedText } from "@/components/ui/decrypted-text";
import { MasonryBackground } from "@/components/background/masonry-background";
import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";
import { MASONRY_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized hero section module", { section: "Hero" });

/**
 * Renders a compact, streamlined hero banner with personalized content, decrypted text effects,
 * and a faded masonry background showcasing website work.
 * @returns The hero section markup.
 */
export const HeroSection = () => {
  logger.debug("Rendering hero section", { section: "Hero" });

  return (
    <section className="relative flex min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex-col justify-center gap-4 sm:gap-5 md:gap-6 pb-8 sm:pb-10 md:pb-12 pt-4 sm:pt-6 md:pt-8 overflow-hidden">
      {/* Faded Masonry Background */}
      <MasonryBackground
        items={MASONRY_ITEMS}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover={true}
        blurToFocus={true}
      />

      {/* Hero Content */}
      <div className="relative z-10">
        <header className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {/* Compact name and location header */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground md:text-sm md:tracking-[0.5rem]">
              <span className="font-medium text-foreground">Jack</span>
              <span>—</span>
              <span>from Scotland</span>
              <span className="hidden sm:inline md:hidden">—</span>
              <span className="hidden md:inline">—</span>
              <span className="hidden md:inline">tech enthusiast</span>
              <span className="hidden md:inline">&</span>
              <span className="hidden md:inline">Crazy Scotsman</span>
            </div>

            {/* Main title with decrypted effect - modern Geist font for lowercase "full stack developer" */}
            <div className="space-y-0.5 sm:space-y-1">
              <h1
                className={cn(
                  "text-[clamp(2.5rem,6.5vw,5rem)] sm:text-[clamp(3rem,7.5vw,6rem)] font-display font-semibold lowercase leading-[1.05] tracking-tight"
                )}
              >
                <DecryptedText
                  text="full stack"
                  animateOn="view"
                  revealDirection="left"
                  speed={40}
                  maxIterations={20}
                  className="block"
                />
              </h1>
              <h1
                className={cn(
                  "text-[clamp(2.5rem,6.5vw,5rem)] sm:text-[clamp(3rem,7.5vw,6rem)] font-display font-semibold lowercase leading-[1.05] tracking-tight"
                )}
              >
                <DecryptedText
                  text="developer"
                  animateOn="view"
                  revealDirection="right"
                  speed={40}
                  maxIterations={20}
                  className="block"
                />
              </h1>
            </div>

            {/* Compact description */}
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground md:text-base max-w-2xl">
              Crafting end-to-end solutions from robust backends to polished
              frontends. Passionate about clean code, performance, and
              full-stack engineering.
            </p>

            {/* Contact Button */}
            <div className="pt-2 sm:pt-3">
              <a
                href="mailto:contact.jack.dev@gmail.com?subject=Let's%20collaborate"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="default"
                  className="text-xs sm:text-sm uppercase tracking-[0.2rem] sm:tracking-[0.25rem]"
                >
                  Get in Touch
                </Button>
              </a>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
};

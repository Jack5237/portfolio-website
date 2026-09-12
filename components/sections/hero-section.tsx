"use client";

import { MasonryBackground } from "@/components/background/masonry-background";
import { Button } from "@/components/ui/button";
import StrokeText from "@/components/ui/stroke-text";
import { MASONRY_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Renders a compact, streamlined hero banner with personalized content, decrypted text effects,
 * and a faded masonry background showcasing website work.
 * @returns The hero section markup.
 */
export const HeroSection = () => {
  return (
    <section className="relative flex min-h-[55vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex-col justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 pb-6 sm:pb-8 md:pb-10 lg:pb-12 pt-3 sm:pt-4 md:pt-6 lg:pt-8 overflow-hidden">
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
        <header className="space-y-2 sm:space-y-3 md:space-y-4">
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Compact name and location header */}
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 md:gap-3 text-[9px] sm:text-xs uppercase tracking-[0.2rem] sm:tracking-[0.3rem] md:tracking-[0.4rem] text-muted-foreground md:text-sm md:tracking-[0.5rem]">
              <span className="font-medium text-foreground">Jack</span>
              <span className="hidden xs:inline">—</span>
              <span>from Scotland</span>
              <span className="hidden sm:inline md:hidden">—</span>
              <span className="hidden md:inline">—</span>
              <span className="hidden md:inline">tech enthusiast</span>
              <span className="hidden md:inline">&</span>
              <span className="hidden md:inline">Crazy Scotsman</span>
            </div>

            {/* Main title */}
            <h1
              className={cn(
                "text-[clamp(2.5rem,6.5vw,5rem)] sm:text-[clamp(3rem,7.5vw,6rem)] font-display font-semibold lowercase leading-[1.05] tracking-tight"
              )}
            >
              {/* ponytail: StrokeText sizes itself in em off this h1's clamp(),
                  so the glyphs match the plain-text version exactly. */}
              <StrokeText
                text="full stack"
                strokeColor="#3368DC"
                fillColor="currentColor"
                fontSize={100}
                fontWeight={600}
                letterSpacing={-2.5}
                strokeWidth={1.4}
                trigger="loop"
                repeatDelay={6}
              />
              <StrokeText
                text="developer"
                strokeColor="#3368DC"
                fillColor="currentColor"
                fontSize={100}
                fontWeight={600}
                letterSpacing={-2.5}
                strokeWidth={1.4}
                trigger="loop"
                repeatDelay={6}
                reverse
              />
            </h1>

            {/* Compact description */}
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground md:text-base max-w-2xl">
              Crafting end-to-end solutions from robust backends to polished
              frontends. Passionate about clean code, performance, and
              full-stack engineering.
            </p>

            {/* Action Buttons */}
            <div className="pt-3 sm:pt-4 md:pt-6 flex gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => {
                  const element = document.querySelector("#work");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-muted-foreground hover:text-background h-10 sm:h-11 md:h-12 px-5 sm:px-7 md:px-8 text-xs sm:text-sm uppercase tracking-[0.2rem] sm:tracking-[0.25rem] whitespace-nowrap flex-shrink-0"
              >
                See Projects
              </button>
              <a href="/contact" className="inline-block flex-shrink-0">
                <Button
                  variant="outline"
                  size="default"
                  className="text-xs sm:text-sm uppercase tracking-[0.2rem] sm:tracking-[0.25rem] h-10 sm:h-11 md:h-12 px-5 sm:px-7 md:px-8 whitespace-nowrap"
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

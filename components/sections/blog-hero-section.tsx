"use client";

import { DecryptedText } from "@/components/ui/decrypted-text";
import { MasonryBackground } from "@/components/background/masonry-background";
import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";
import { MASONRY_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized blog hero section module", { section: "BlogHero" });

/**
 * Blog-specific hero section that displays "Blog" instead of home page content.
 * @returns The blog hero section markup.
 */
export const BlogHeroSection = () => {
  logger.debug("Rendering blog hero section", { section: "BlogHero" });

  /**
   * Scrolls the user down to the blog posts section.
   */
  const scrollToBlogs = () => {
    // Find the search/tags section or first blog post
    const searchSection = document.querySelector('[data-blog-content]');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
      logger.debug("Scrolled to blog content", { section: "BlogHero" });
    }
  };

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
            </div>

            {/* Main title with decrypted effect - using display font */}
            <div className="space-y-1 sm:space-y-1.5">
              <h1
                className={cn(
                  "text-[clamp(2rem,6vw,4.5rem)] sm:text-[clamp(2.25rem,7vw,5rem)] font-display font-bold uppercase leading-[0.9] tracking-[0.05em] sm:tracking-[0.06em]"
                )}
              >
                <DecryptedText
                  text="Blog"
                  animateOn="view"
                  revealDirection="left"
                  speed={40}
                  maxIterations={20}
                  className="block"
                />
              </h1>
            </div>

            {/* Compact description */}
            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground md:text-base max-w-2xl">
              Exploring the latest in web development, sharing insights from building scalable applications, and documenting the journey of continuous learning in tech.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2 sm:pt-3">
              <button
                onClick={scrollToBlogs}
                className="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-foreground text-background hover:bg-muted-foreground hover:text-background h-12 px-8 text-xs sm:text-sm uppercase tracking-[0.2rem] sm:tracking-[0.25rem]"
              >
                read blogs
              </button>
              <a href="/contact" className="inline-block">
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

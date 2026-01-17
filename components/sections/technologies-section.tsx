import type { Technology } from "@/lib/content";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import { ScrollSlide } from "@/components/ui/scroll-slide";

const logger = getWebLogger();
logger.info("Initialized technologies section module", {
  section: "Technologies",
});

interface TechnologiesSectionProps {
  /**
   * Collection of technologies to display.
   */
  readonly technologies: readonly Technology[];
}

/**
 * Displays technologies in a compact, streamlined grid layout.
 * @param props - Technology data to present.
 * @returns The technologies section markup.
 */
export const TechnologiesSection = ({
  technologies,
}: TechnologiesSectionProps) => {
  logger.debug("Rendering technologies section", {
    section: "Technologies",
    total: technologies.length,
  });

  // Group technologies by category
  const grouped = technologies.reduce((acc, tech) => {
    const category = tech.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  const categories = Object.keys(grouped).sort().slice(0, 6); // Limit to 6 categories

  return (
    <section className="space-y-6 py-12 sm:py-16">
      <ScrollSlide>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
            Technologies Learned
          </h2>
          <div className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
            ({technologies.length})
          </div>
        </div>
      </ScrollSlide>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {categories.map((category, index) => {
          // Alternate alignment: even index (0, 2, 4...) = left (right-aligned tags), odd index (1, 3, 5...) = right (left-aligned tags)
          const isLeftColumn = index % 2 === 0;
          
          return (
            <ScrollSlide
              key={category}
              delay={index * 100}
              className={cn(
                "group border-t border-foreground/15 pt-4 sm:pt-6 transition-colors",
                "hover:border-foreground"
              )}
            >
              <h3 className={cn(
                "mb-2 sm:mb-3 text-[10px] sm:text-xs uppercase tracking-[0.35rem] sm:tracking-[0.4rem] text-muted-foreground transition-colors group-hover:text-accent",
                isLeftColumn ? "text-right" : "text-left"
              )}>
                {category}
              </h3>
              <div className={cn(
                "flex flex-wrap gap-1.5 sm:gap-2",
                isLeftColumn ? "justify-end" : "justify-start"
              )}>
                {grouped[category].map((tech) => {
                  const TagComponent = tech.href ? "a" : "span";
                  return (
                    <TagComponent
                      key={tech.name}
                      href={tech.href}
                      target={tech.href ? "_blank" : undefined}
                      rel={tech.href ? "noreferrer" : undefined}
                      className={cn(
                        "rounded-full border border-foreground/15 bg-muted/50 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.1rem] sm:tracking-[0.15rem] transition-all",
                        "hover:border-foreground hover:bg-foreground hover:text-background",
                        tech.href && "cursor-pointer"
                      )}
                    >
                      {tech.name}
                    </TagComponent>
                  );
                })}
              </div>
            </ScrollSlide>
          );
        })}
      </div>
    </section>
  );
};

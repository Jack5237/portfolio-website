"use client";

import type { Project } from "@/lib/content";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { ScrollSlide } from "@/components/ui/scroll-slide";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized projects section module", { section: "Projects" });

interface ProjectsSectionProps {
  /**
   * Collection of projects to showcase.
   */
  readonly projects: readonly Project[];
}

/**
 * Displays marquee projects with decrypted text animations on hover.
 * @param props - Project data to present.
 * @returns The projects section markup.
 */
export const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  logger.debug("Rendering projects section", {
    section: "Projects",
    total: projects.length,
  });

  return (
    <section className="space-y-6 sm:space-y-8 py-12 sm:py-16 md:py-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
          Featured Projects
        </div>
        <div className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
          ({projects.length})
        </div>
      </div>
      <div className="grid gap-8 sm:gap-10 md:gap-12">
        {projects.map((project, index) => {
          // Alternate alignment: even index (0, 2, 4...) = left, odd index (1, 3, 5...) = right
          const isLeftAligned = index % 2 === 0;
          // Alternate slide direction: left-aligned slides from left, right-aligned slides from right
          const slideDirection = isLeftAligned ? "left" : "right";
          const projectKey = `${project.href ?? "project"}-${
            project.title
          }-${index}`;

          return (
            <ScrollSlide
              key={projectKey}
              direction={slideDirection}
              distance={40}
              delay={index * 100}
              duration={700}
            >
              <article
                className={cn(
                  "group relative border-t border-foreground/15 pt-6 sm:pt-8 md:pt-10 transition-colors",
                  "hover:border-foreground",
                  index === projects.length - 1 ? "border-b pb-0" : ""
                )}
              >
                <div
                  className={cn(
                    "flex flex-col gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.35rem] text-muted-foreground transition-colors group-hover:text-accent",
                    isLeftAligned
                      ? "md:flex-row md:items-center md:justify-between"
                      : "md:flex-row-reverse md:items-center md:justify-between"
                  )}
                >
                  <span>{project.category}</span>
                  <span>{project.discipline}</span>
                </div>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "block mt-4 sm:mt-5 md:mt-6 text-[clamp(1.5rem,3.5vw,3rem)] sm:text-[clamp(1.75rem,4vw,3.75rem)] font-display font-bold uppercase leading-tight transition-colors hover:text-accent",
                    // Mobile: always left-aligned, Desktop: alternate between left and right
                    isLeftAligned ? "text-left" : "text-left md:text-right"
                  )}
                >
                  <DecryptedText
                    text={project.title}
                    animateOn="hover"
                    revealDirection="center"
                    speed={50}
                    maxIterations={20}
                    parentClassName="block"
                    encryptedClassName="opacity-70"
                  />
                </a>
              </article>
            </ScrollSlide>
          );
        })}
      </div>
    </section>
  );
};

"use client";

import { useState } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedProjects = isExpanded ? projects : projects.slice(0, 4);

  logger.debug("Rendering projects section", {
    section: "Projects",
    total: projects.length,
    displayed: displayedProjects.length,
    isExpanded,
  });

  return (
    <section
      className="space-y-6 sm:space-y-8 py-12 sm:py-16 md:py-20"
      id="projects"
    >
      <div className="flex items-center justify-between">
        <div className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground whitespace-nowrap">
          Featured Projects
        </div>
        <div className="flex items-center gap-3">
          {!isExpanded && projects.length > 4 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[10px] sm:text-xs uppercase tracking-[0.2rem] sm:tracking-[0.25rem] text-foreground hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground"
            >
              More
            </button>
          )}
          <div className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
            ({projects.length})
          </div>
        </div>
      </div>
      <div className="grid gap-8 sm:gap-10 md:gap-12">
        {displayedProjects.map((project, index) => {
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
              delay={index * 50}
              duration={700}
            >
              <article
                className={cn(
                  "group relative border-t border-foreground/15 pt-6 sm:pt-8 md:pt-10 transition-colors",
                  "hover:border-foreground",
                  index === displayedProjects.length - 1 && !isExpanded
                    ? "border-b pb-8"
                    : "",
                )}
              >
                <div
                  className={cn(
                    "flex flex-col gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.35rem] text-muted-foreground transition-colors group-hover:text-accent",
                    isLeftAligned
                      ? "md:flex-row md:items-center md:justify-between"
                      : "md:flex-row-reverse md:items-center md:justify-between",
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
                    isLeftAligned ? "text-left" : "text-left md:text-right",
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
      {!isExpanded && projects.length > 4 && (
        <div className="flex justify-center pt-8 sm:pt-12">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs sm:text-sm uppercase tracking-[0.4rem] sm:tracking-[0.5rem] text-muted-foreground hover:text-foreground transition-colors border border-foreground/10 px-6 py-2 sm:px-8 sm:py-3 hover:border-foreground/30"
          >
            see more projects
          </button>
        </div>
      )}
      {isExpanded && (
        <div className="flex justify-center pt-8 sm:pt-12">
          <button
            onClick={() => {
              setIsExpanded(false);
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs sm:text-sm uppercase tracking-[0.4rem] sm:tracking-[0.5rem] text-muted-foreground hover:text-foreground transition-colors border border-foreground/10 px-6 py-2 sm:px-8 sm:py-3 hover:border-foreground/30"
          >
            Collapse
          </button>
        </div>
      )}
    </section>
  );
};

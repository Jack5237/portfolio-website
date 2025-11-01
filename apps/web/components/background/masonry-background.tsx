"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Initialized masonry background module", { component: "MasonryBackground" });

interface MasonryItem {
  /**
   * Unique identifier for the masonry item.
   */
  readonly id: string;
  /**
   * Image URL or path for the masonry item.
   */
  readonly img: string;
  /**
   * Optional URL to link to when item is clicked.
   */
  readonly url?: string;
  /**
   * Height of the masonry item in pixels.
   */
  readonly height: number;
}

interface MasonryBackgroundProps {
  /**
   * Array of items to display in the masonry layout.
   */
  readonly items: readonly MasonryItem[];
  /**
   * Animation easing function (GSAP-style).
   */
  readonly ease?: string;
  /**
   * Animation duration in seconds.
   */
  readonly duration?: number;
  /**
   * Stagger delay between items in seconds.
   */
  readonly stagger?: number;
  /**
   * Animation entrance direction.
   */
  readonly animateFrom?: "bottom" | "top" | "left" | "right";
  /**
   * Whether to scale items on hover.
   */
  readonly scaleOnHover?: boolean;
  /**
   * Scale factor on hover (0-1).
   */
  readonly hoverScale?: number;
  /**
   * Whether to blur items when not focused.
   */
  readonly blurToFocus?: boolean;
  /**
   * Whether to apply color shift on hover (disabled for monochrome aesthetic).
   */
  readonly colorShiftOnHover?: boolean;
  /**
   * Additional CSS classes.
   */
  readonly className?: string;
}

/**
 * Displays a faded masonry gallery background with subtle animations.
 * Designed to be used behind hero content with very low opacity.
 * @param props - Configuration for masonry layout and animations.
 * @returns The masonry background markup.
 */
export const MasonryBackground = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  className,
}: MasonryBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  logger.debug("Rendering masonry background", { 
    component: "MasonryBackground", 
    itemCount: items.length 
  });

  /**
   * Triggers entrance animation when component mounts.
   */
  useEffect(() => {
    // Simple fade-in animation using CSS transitions
    const timer = setTimeout(() => {
      setIsVisible(true);
      logger.debug("Masonry background animation triggered", { component: "MasonryBackground" });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Calculates animation transform based on animateFrom direction.
   */
  const getInitialTransform = () => {
    switch (animateFrom) {
      case "bottom":
        return "translateY(20px)";
      case "top":
        return "translateY(-20px)";
      case "left":
        return "translateX(-20px)";
      case "right":
        return "translateX(20px)";
      default:
        return "translateY(20px)";
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "relative overflow-hidden rounded-sm opacity-[0.03] transition-all duration-700",
              // Fade-in animation with stagger
              isVisible ? "opacity-[0.03]" : "opacity-0",
              scaleOnHover && "hover:scale-[0.98]",
              blurToFocus && "blur-sm hover:blur-0",
              // Stagger delay calculation
            )}
            style={{
              height: `${item.height}px`,
              transitionDelay: `${index * (stagger * 1000)}ms`,
              transform: isVisible ? "translateY(0)" : getInitialTransform(),
              transition: "opacity 0.7s ease, transform 0.7s ease, filter 0.3s ease",
            }}
          >
            <img
              src={item.img}
              alt=""
              className={cn(
                "h-full w-full object-cover grayscale transition-all duration-300",
                scaleOnHover && "hover:scale-[0.98]",
              )}
              loading="lazy"
              decoding="async"
            />
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto absolute inset-0 z-10"
                aria-label={`View ${item.id}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


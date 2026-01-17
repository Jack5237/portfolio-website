"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollSlideProps {
  /**
   * Direction the element slides from.
   */
  readonly direction?: "left" | "right" | "up" | "down";
  /**
   * Distance to slide in pixels.
   */
  readonly distance?: number;
  /**
   * Delay before animation starts in milliseconds.
   */
  readonly delay?: number;
  /**
   * Duration of the animation in milliseconds.
   */
  readonly duration?: number;
  /**
   * Additional CSS classes.
   */
  readonly className?: string;
  /**
   * Children to wrap with scroll animation.
   */
  readonly children: React.ReactNode;
}

/**
 * Wraps content with a scroll-triggered slide-in animation.
 * Element slides into view when it enters the viewport.
 * @param props - Animation configuration.
 * @returns The animated wrapper markup.
 */
export const ScrollSlide = ({
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 600,
  className,
  children,
}: ScrollSlideProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  /**
   * Sets up intersection observer to trigger animation when element enters viewport.
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay if specified
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Stop observing once animated
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px", // Trigger slightly before fully visible
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay]);

  /**
   * Calculates initial transform based on direction.
   */
  const getInitialTransform = () => {
    switch (direction) {
      case "left":
        return `translateX(-${distance}px)`;
      case "right":
        return `translateX(${distance}px)`;
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn("transition-all ease-out", className)}
      style={{
        transform: isVisible ? "translateX(0) translateY(0)" : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};


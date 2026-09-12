"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MasonryItem } from "@/lib/content";

interface MasonryBackgroundProps {
  readonly items: readonly MasonryItem[];
  readonly stagger?: number;
  readonly animateFrom?: "bottom" | "top" | "left" | "right";
  readonly scaleOnHover?: boolean;
  readonly blurToFocus?: boolean;
  readonly className?: string;
}

/**
 * Displays a faded masonry gallery background with subtle animations.
 * Designed to be used behind hero content with very low opacity.
 * ponytail: optimize image loading - lazy load, low priority to not block LCP
 */
export const MasonryBackground = ({
  items,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  blurToFocus = true,
  className,
}: MasonryBackgroundProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const displayItems = items.slice(0, 4);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="pointer-events-none grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 md:p-8 max-h-full">
        {displayItems.map((item, index) => (
          <div
            key={item.id}
            suppressHydrationWarning
            className={cn(
              "relative overflow-hidden rounded-sm transition-all duration-700",
              isVisible ? "opacity-[0.03]" : "opacity-0",
              scaleOnHover && "hover:scale-[0.98]",
              blurToFocus && "blur-sm hover:blur-0",
            )}
            style={{
              height: `${item.height}px`,
              transitionDelay: `${index * (stagger * 1000)}ms`,
              transform: isVisible ? "translateY(0)" : getInitialTransform(),
              transition:
                "opacity 0.7s ease, transform 0.7s ease, filter 0.3s ease",
            }}
          >
            <Image
              src={item.img}
              alt=""
              fill
              className={cn(
                "object-cover grayscale transition-all duration-300",
                scaleOnHover && "hover:scale-[0.98]",
              )}
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

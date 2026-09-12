"use client";

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
 * Displays a faded gradient background. Previously used external images.
 * ponytail: replaced 4 external image requests + DNS/TLS with CSS gradient.
 * Saves ~4 network requests and ~500ms in LCP window.
 */
export const MasonryBackground = ({
  className,
}: MasonryBackgroundProps) => {
  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      style={{
        background: "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)",
      }}
      aria-hidden="true"
    />
  );
};

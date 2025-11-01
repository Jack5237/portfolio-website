"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

import { getClientLogger } from "@/lib/client-logger";

const logger = getClientLogger();

/**
 * Provides smooth scrolling via Lenis throughout the application.
 * Initializes Lenis on mount and ensures it stays synchronized with navigation.
 * @param props - React children to wrap with smooth scroll context.
 */
export const SmoothScrollProvider = ({ children }: { readonly children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    logger.info("Initializing Lenis smooth scroll", { component: "SmoothScrollProvider" });

    // Initialize Lenis with recommended settings for monochrome portfolio
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true,
    });

    // Handle scroll events for debugging (optional)
    lenis.on("scroll", ({ scroll, direction, progress }) => {
      // Log scroll progress at key intervals for monitoring
      if (progress % 0.25 < 0.01) {
        logger.debug("Lenis scroll progress", { progress: Math.round(progress * 100), scroll, direction });
      }
    });

    // Cleanup on unmount or pathname change
    return () => {
      logger.debug("Destroying Lenis instance", { component: "SmoothScrollProvider" });
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
};


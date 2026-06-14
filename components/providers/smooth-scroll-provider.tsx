"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { getLogger } from "@/lib/logger";

const logger = getLogger();

/**
 * Provides smooth scrolling via Lenis throughout the application.
 * Initializes Lenis on mount and ensures it stays synchronized with navigation.
 * @param props - React children to wrap with smooth scroll context.
 */
export const SmoothScrollProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      // Dynamically import Lenis only on client
      const initLenis = async () => {
        const { default: Lenis } = await import("lenis");

        logger.info("Initializing Lenis smooth scroll", {
          component: "SmoothScrollProvider",
        });

        // Initialize Lenis with recommended settings for monochrome portfolio
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
          autoRaf: true,
        });

        // Handle scroll events for debugging (optional)
        lenis.on("scroll", ({ scroll, direction, progress }) => {
          // Log scroll progress at key intervals for monitoring
          if (progress % 0.25 < 0.01) {
            logger.debug("Lenis scroll progress", {
              progress: Math.round(progress * 100),
              scroll,
              direction,
            });
          }
        });

        // Cleanup function
        return () => {
          logger.debug("Destroying Lenis instance", {
            component: "SmoothScrollProvider",
          });
          lenis.destroy();
        };
      };

      let cleanup: (() => void) | undefined;

      initLenis()
        .then((cleanupFn) => {
          cleanup = cleanupFn;
        })
        .catch((error) => {
          logger.error("Failed to initialize Lenis", {
            error: error instanceof Error ? error.message : String(error),
          });
        });

      return () => {
        cleanup?.();
      };
    } catch (error) {
      logger.error("Error in SmoothScrollProvider", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }, [pathname, mounted]);

  return <>{children}</>;
};

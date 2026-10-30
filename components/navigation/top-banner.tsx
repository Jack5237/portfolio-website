"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { usePathname } from "next/navigation";

import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized top banner module", { component: "TopBanner" });

/**
 * Top banner component for site-wide announcements or notifications.
 * Can be dismissed by users and stores state in localStorage.
 * @returns The top banner markup.
 */
export const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Only show back link on blog page, not on home page
  const isBlogPage = pathname === "/blog";

  /**
   * Sets banner visibility on mount.
   */
  useEffect(() => {
    setIsVisible(true);
    setMounted(true);
    logger.debug("Top banner shown on mount", { component: "TopBanner" });
  }, []);

  /**
   * Handles keyboard shortcut to navigate home.
   * Listens for 'B' key to go back to home.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for 'B' key (case insensitive)
      if (event.key.toLowerCase() === "b" && !event.ctrlKey && !event.metaKey) {
        // Only trigger if not typing in an input/textarea
        const target = event.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable
        ) {
          event.preventDefault();
          logger.debug("Top banner keyboard shortcut triggered", {
            component: "TopBanner",
            key: event.key,
          });
          window.location.href = "/";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    logger.debug("Top banner keyboard shortcut listener attached", {
      component: "TopBanner",
    });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      logger.debug("Top banner keyboard shortcut listener removed", {
        component: "TopBanner",
      });
    };
  }, []);

  // Avoid hydration mismatch: render only after mount
  if (!mounted) {
    return null;
  }

  return (
    <aside
      aria-label="Site announcement"
      suppressHydrationWarning
      className={cn(
        "relative z-50 w-full border-b border-foreground/20 bg-muted/50 py-2 sm:py-2.5",
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full",
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6 overflow-hidden">
        {/* Left Side - Back Link (only on blog page) */}
        {isBlogPage ? (
          <Link
            href="/"
            className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground/80 transition-colors"
          >
            <span>← Back</span>
            <span className="text-muted-foreground">(B)</span>
          </Link>
        ) : (
          <div className="flex-shrink-0 w-0 sm:w-auto" />
        )}

        {/* Center - Banner Content: icon + single line, truncated rather than wrapped */}
        <p className="flex min-w-0 flex-1 items-center justify-center gap-2 whitespace-nowrap text-[10px] sm:text-xs font-outfit uppercase tracking-[0.1rem] sm:tracking-[0.25rem] text-foreground">
          <Newspaper aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="shrink-0 text-muted-foreground">New Post:</span>
          <Link
            href="/blog"
            className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-muted-foreground hover:underline"
          >
            <span className="truncate">
              <span className="hidden sm:inline">Check out the </span>latest blog update
            </span>
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </p>
      </div>
    </aside>
  );
};

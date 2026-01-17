"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { X, Sun, Moon } from "lucide-react";

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
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Only show back link on blog page, not on home page
  const isBlogPage = pathname === "/blog";

  /**
   * Checks localStorage on mount to see if banner was previously dismissed.
   * Sets banner visibility if not dismissed.
   */
  useEffect(() => {
    const dismissed = localStorage.getItem("topBannerDismissed");
    if (!dismissed) {
      setIsVisible(true);
      logger.debug("Top banner shown", { component: "TopBanner" });
    } else {
      setIsDismissed(true);
      logger.debug("Top banner was previously dismissed", {
        component: "TopBanner",
      });
    }
  }, []);

  /**
   * Prevents hydration mismatch by only showing theme toggle after mount.
   */
  useEffect(() => {
    setMounted(true);
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

  /**
   * Handles banner dismissal by hiding it and storing state in localStorage.
   */
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("topBannerDismissed", "true");
    logger.debug("Top banner dismissed by user", { component: "TopBanner" });
  };

  /**
   * Toggles between light and dark theme.
   */
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    logger.debug("Theme toggled", { component: "TopBanner", theme: newTheme });
  };

  // Don't render if dismissed or not visible
  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        "relative z-50 w-full border-b border-foreground/20 bg-muted/50 py-2 sm:py-2.5",
        "transition-all duration-300 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full",
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-3 sm:gap-4 px-4 sm:px-6">
        {/* Left Side - Back Link (only on blog page) */}
        {isBlogPage ? (
          <Link
            href="/"
            className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground/70 hover:text-foreground/80 transition-colors"
          >
            <span>← Back</span>
            <span className="text-muted-foreground/50">(B)</span>
          </Link>
        ) : (
          <div className="flex-shrink-0 w-0 sm:w-auto" />
        )}

        {/* Center - Banner Content */}
        <p className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] sm:tracking-[0.25rem] text-foreground text-center flex-1">
          <span className="text-muted-foreground/80">New:</span>{" "}
          <Link
            href="/blog"
            className="transition-colors hover:text-muted-foreground hover:underline"
          >
            Check out my latest blog posts
          </Link>
        </p>

        {/* Right Side - Theme Toggle and Dismiss Button */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className={cn(
                "flex-shrink-0 rounded-full p-1 transition-colors",
                "hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20",
              )}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-foreground" />
              ) : (
                <Moon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-foreground" />
              )}
            </button>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className={cn(
              "flex-shrink-0 rounded-full p-1 transition-colors",
              "hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20",
            )}
            aria-label="Dismiss banner"
          >
            <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

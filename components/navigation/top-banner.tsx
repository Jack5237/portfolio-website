"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

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
   * Handles banner dismissal by hiding it and storing state in localStorage.
   */
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("topBannerDismissed", "true");
    logger.debug("Top banner dismissed by user", { component: "TopBanner" });
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
        {/* Banner Content */}
        <p className="text-[10px] sm:text-xs font-outfit uppercase tracking-[0.2rem] sm:tracking-[0.25rem] text-foreground text-center">
          <span className="text-muted-foreground/80">New:</span>{" "}
          <Link
            href="/blog"
            className="transition-colors hover:text-muted-foreground hover:underline"
          >
            Check out my latest blog posts
          </Link>
        </p>

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
  );
};

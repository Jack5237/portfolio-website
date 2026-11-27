"use client";

import { ArrowRight, Mail, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { SOCIAL_ITEMS, type SocialLinks } from "@/components/sections/footer";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized top banner module", { component: "TopBanner" });

/**
 * Top banner component for site-wide announcements or notifications.
 * Can be dismissed by users and stores state in localStorage.
 * @returns The top banner markup.
 */
export const TopBanner = ({ email, socialLinks }: { email: string; socialLinks?: SocialLinks }) => {
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      )}
    >
      <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1.5 px-4 min-[400px]:gap-3 sm:gap-4">
        {/* Left - socials (plus a back link on the blog index) */}
        <div className="flex items-center gap-2">
          <nav aria-label="Social media" className="-ml-2 flex items-center">
            {SOCIAL_ITEMS.map(({ key, label, Icon }) => {
              const href = socialLinks?.[key];
              if (!href) {
                return (
                  <span
                    key={key}
                    aria-disabled="true"
                    title={`${label} (coming soon)`}
                    className="flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full sm:h-8 sm:w-8 text-muted-foreground opacity-40"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{label} (coming soon)</span>
                  </span>
                );
              }
              return (
                href && (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 text-muted-foreground outline-none transition-all hover:-translate-y-0.5 hover:bg-foreground/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-foreground motion-reduce:transform-none"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">{label} (opens in a new tab)</span>
                  </a>
                )
              );
            })}
          </nav>
          {isBlogPage && (
            <Link
              href="/"
              className="hidden items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground/80 md:flex"
            >
              <span>← Back</span>
              <span>(B)</span>
            </Link>
          )}
        </div>

        {/* Centre - latest post */}
        <p className="flex min-w-0 items-center justify-center gap-2 whitespace-nowrap font-outfit text-[10px] uppercase tracking-[0.1rem] text-foreground sm:text-xs sm:tracking-[0.25rem]">
          <Newspaper
            aria-hidden="true"
            className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground sm:block"
          />
          <span className="hidden shrink-0 text-muted-foreground sm:inline">New Post:</span>
          <Link
            href="/blog"
            className="group flex min-h-8 min-w-0 items-center gap-1.5 rounded-sm outline-none transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <span className="truncate group-hover:underline">
              <span className="sm:hidden">New post</span>
              <span className="hidden sm:inline">Check out the latest blog update</span>
            </span>
            <ArrowRight
              aria-hidden="true"
              className="hidden h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 min-[360px]:block"
            />
          </Link>
        </p>

        {/* Right - email */}
        <a
          href={`mailto:${email}?subject=Let's%20collaborate`}
          className="group -mr-2 flex h-7 w-7 items-center sm:h-8 justify-center gap-1.5 rounded-full text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-foreground sm:w-auto sm:px-2 sm:hover:bg-foreground/10"
        >
          <Mail
            aria-hidden="true"
            className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
          />
          <span className="hidden text-xs tracking-wide lg:inline">{email}</span>
          <span className="sr-only lg:hidden">Email me</span>
        </a>
      </div>
    </aside>
  );
};

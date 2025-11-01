"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getClientLogger } from "@/lib/client-logger";
import { cn } from "@/lib/utils";

const logger = getClientLogger();
logger.info("Initialized back to home navigation module", { component: "BackToHome" });

interface BackToHomeProps {
  /**
   * Additional CSS classes to apply.
   */
  readonly className?: string;
}

/**
 * Navigation component that provides a button and keyboard shortcut (Ctrl+Backspace)
 * to navigate back to the home page.
 * @param props - Component configuration.
 * @returns The back to home navigation markup.
 */
export const BackToHome = ({ className }: BackToHomeProps) => {
  const router = useRouter();

  /**
   * Handles keyboard shortcut to navigate home.
   * Listens for Ctrl+Backspace (or Cmd+Backspace on Mac).
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Backspace (Windows/Linux) or Cmd+Backspace (Mac)
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key === "Backspace"
      ) {
        // Prevent default browser behavior
        event.preventDefault();
        logger.debug("Back to home keyboard shortcut triggered", {
          component: "BackToHome",
          key: event.key,
          ctrlKey: event.ctrlKey,
          metaKey: event.metaKey,
        });
        router.push("/");
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);
    logger.debug("Back to home keyboard shortcut listener attached", {
      component: "BackToHome",
    });

    // Cleanup on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      logger.debug("Back to home keyboard shortcut listener removed", {
        component: "BackToHome",
      });
    };
  }, [router]);

  return (
    <div className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <Link href="/">
        <Button
          variant="ghost"
          size="sm"
          className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem]"
        >
          ← Back to Home
        </Button>
      </Link>
      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-muted-foreground">
        <kbd className="px-1.5 py-0.5 rounded border border-foreground/20 bg-muted/50 font-mono text-[9px] sm:text-[10px]">
          Ctrl
        </kbd>
        <span className="text-muted-foreground/50">+</span>
        <kbd className="px-1.5 py-0.5 rounded border border-foreground/20 bg-muted/50 font-mono text-[9px] sm:text-[10px]">
          ⌫
        </kbd>
      </div>
    </div>
  );
};


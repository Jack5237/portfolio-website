"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Initialized main navbar module", { component: "MainNavbar" });

type NavItem = {
  label: string;
  href: string;
  smooth?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work", smooth: true },
  { label: "Skills", href: "#skills", smooth: true },
  { label: "Blog", href: "/blog", smooth: false },
];

export const MainNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navTabClass =
    "inline-flex items-center text-[10px] leading-none sm:text-xs uppercase tracking-[0.2rem] transition-colors";

  const handleSmoothScroll = (href: string) => {
    if (pathname === "/") {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  logger.debug("Rendering main navbar", {
    component: "MainNavbar",
    pathname,
  });

  return (
    <nav className="sticky top-0 z-40 border-b border-foreground/15 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-[10px] sm:text-xs uppercase tracking-[0.25rem] sm:tracking-[0.3rem] text-foreground flex-shrink-0 font-semibold"
        >
          JacksDevFolio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = !item.smooth && pathname === item.href;

            if (item.smooth) {
              return (
                <button
                  key={item.label}
                  onClick={() => handleSmoothScroll(item.href)}
                  className={cn(
                    navTabClass,
                    "cursor-pointer bg-transparent border-0 p-0",
                    "text-muted-foreground hover:text-foreground",
                  )}
                  type="button"
                >
                  {item.label}
                </button>
              );
            }

            if (item.href === "/blog") {
              return (
                <Link
                  key={item.href}
                  href="/blog"
                  className={cn(
                    navTabClass,
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            }

            return null;
          })}
        </div>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <Button
            asChild
            size="sm"
            className="text-[10px] uppercase tracking-[0.2rem]"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <AnimatedThemeToggler className="flex-shrink-0" />
        </div>

        {/* Mobile Menu Button and Theme Toggler */}
        <div className="flex md:hidden items-center gap-2 flex-shrink-0">
          <AnimatedThemeToggler className="flex-shrink-0" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-foreground/15 bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 sm:px-6 space-y-5">
            {/* Navigation Section */}
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.25rem] text-muted-foreground font-semibold px-2">
                Navigation
              </p>
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = !item.smooth && pathname === item.href;

                  if (item.smooth) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleSmoothScroll(item.href);
                        }}
                        className={cn(
                          navTabClass,
                          "block w-full text-left px-3 py-2.5 rounded-lg transition-colors",
                          "text-muted-foreground hover:text-foreground",
                        )}
                        type="button"
                      >
                        {item.label}
                      </button>
                    );
                  }

                  if (item.href === "/blog") {
                    return (
                      <Link
                        key={item.href}
                        href="/blog"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          navTabClass,
                          "block px-3 py-2.5 rounded-lg transition-colors",
                          isActive
                            ? "text-foreground bg-foreground/10 font-medium"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return null;
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-foreground/10" />

            {/* Contact Section */}
            <div className="pt-2 pb-2">
              <Button
                className="w-full text-[10px] uppercase tracking-[0.2rem] font-semibold"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

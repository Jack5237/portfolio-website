"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  smooth?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "#work", smooth: true },
  { label: "Skills", href: "#skills", smooth: true },
  { label: "Blog", href: "/blog" },
  { label: "Sponsors", href: "/sponsors" },
];

const TAB_CLASS =
  "inline-flex min-h-8 items-center rounded-full px-3 py-1.5 text-[10px] leading-none xl:text-xs uppercase tracking-[0.2rem] transition-colors outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const MOBILE_ROW_CLASS =
  "flex min-h-12 w-full items-center rounded-xl border px-4 text-xs uppercase tracking-[0.2rem] transition-colors hover:bg-foreground/5 outline-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-foreground";

export const MainNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  // Pop the bar into a floating pill once the visitor scrolls past the top.
  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and on Escape.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intended trigger
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const go = () => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    if (pathname === "/") return go();
    router.push("/");
    setTimeout(go, 100);
  };

  const isActive = (item: NavItem) => !item.smooth && pathname.startsWith(item.href);

  return (
    <nav
      aria-label="Main"
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,padding] duration-300 ease-out motion-reduce:transition-none",
        pinned
          ? "border-b border-transparent bg-transparent px-2 pt-2 sm:px-4 sm:pt-3"
          : "border-b border-foreground/15 bg-background/85 backdrop-blur-xs supports-[backdrop-filter]:bg-background/70"
      )}
    >
      {/* max-width animates between two lengths, giving the expand/contract pop-out */}
      <div
        className={cn(
          "mx-auto w-full border transition-all duration-300 ease-out motion-reduce:transition-none",
          pinned
            ? "max-w-5xl rounded-3xl border-foreground/20 bg-background/90 shadow-[0_10px_30px_-12px_hsl(var(--foreground)/0.35)] backdrop-blur-xs supports-[backdrop-filter]:bg-background/75"
            : "max-w-full rounded-none border-transparent shadow-none"
        )}
      >
        <div
          className={cn(
            "flex w-full items-center justify-between gap-3 lg:gap-6 transition-all duration-300 ease-out motion-reduce:transition-none",
            pinned ? "px-4 py-2 sm:px-6 lg:py-2.5" : "px-4 py-3 sm:px-6 lg:px-8 lg:py-4"
          )}
        >
          {/* Brand */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-md outline-hidden transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <Image
              src="/images/brand/avatarImg.png"
              alt=""
              width={32}
              height={32}
              className="h-7 w-7 shrink-0 rounded-full sm:h-8 sm:w-8"
              priority
            />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.25rem] text-foreground sm:text-xs sm:tracking-[0.3rem]">
              JacksDevFolio
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center justify-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) =>
              item.smooth ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    TAB_CLASS,
                    "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item) ? "page" : undefined}
                  className={cn(
                    TAB_CLASS,
                    isActive(item)
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href="/sponsorship"
              className={cn(
                TAB_CLASS,
                "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              )}
            >
              Become a Sponsor
            </Link>
            <Button asChild size="sm" className="text-[10px] uppercase tracking-[0.2rem]">
              <Link href="/contact">Contact</Link>
            </Button>
            <AnimatedThemeToggler className="shrink-0" />
          </div>

          {/* Mobile controls */}
          <div className="-mr-2 flex shrink-0 items-center gap-0.5 lg:hidden">
            <AnimatedThemeToggler className="shrink-0" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg outline-hidden transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu: stays mounted, slides open via grid rows */}
        <div
          id="mobile-menu"
          aria-hidden={!mobileMenuOpen}
          className={cn(
            "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none lg:hidden",
            mobileMenuOpen ? "grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div
              className={cn(
                "max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain border-t border-foreground/15 bg-background/95 backdrop-blur-xs",
                pinned && "rounded-b-3xl"
              )}
            >
              <div className="space-y-2 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 sm:px-6">
                {NAV_ITEMS.map((item) => {
                  const rowClass = cn(
                    MOBILE_ROW_CLASS,
                    isActive(item)
                      ? "border-foreground/20 bg-foreground/10 text-foreground"
                      : "border-foreground/10 bg-muted/20 text-muted-foreground"
                  );
                  return item.smooth ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        scrollToSection(item.href);
                      }}
                      className={rowClass}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item) ? "page" : undefined}
                      className={rowClass}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <div className="space-y-1 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full text-[10px] font-semibold uppercase tracking-[0.2rem]"
                  >
                    <Link href="/contact">Get in Touch</Link>
                  </Button>
                  <Link
                    href="/sponsorship"
                    className="flex min-h-12 w-full items-center justify-center rounded-lg text-[10px] uppercase tracking-[0.2rem] text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                  >
                    Become a Sponsor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

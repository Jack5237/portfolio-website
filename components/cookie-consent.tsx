"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export const CONSENT_STORAGE_KEY = "cookie-consent";

type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const pushConsentUpdate = (choice: ConsentChoice) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push([
    "consent",
    "update",
    {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
    },
  ]);
};

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const decide = (choice: ConsentChoice) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    pushConsentUpdate(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-foreground/15 bg-background/95 backdrop-blur"
    >
      <div className="container mx-auto flex flex-col gap-3 sm:gap-4 px-4 py-3 sm:px-6 sm:py-4 md:flex-row md:items-center md:justify-between md:gap-4">
        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground md:flex-1">
          This site uses cookies for analytics and advertising. Read the{" "}
          <Link href="/cookies" className="underline hover:text-foreground">
            cookie policy
          </Link>
          .
        </p>

        <div className="flex flex-shrink-0 gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 sm:flex-none text-[10px] uppercase tracking-[0.2rem]"
            onClick={() => decide("denied")}
          >
            Reject
          </Button>
          <Button
            size="sm"
            className="flex-1 sm:flex-none text-[10px] uppercase tracking-[0.2rem]"
            onClick={() => decide("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

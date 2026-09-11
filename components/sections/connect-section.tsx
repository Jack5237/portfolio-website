"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ExternalLink, Share2, Copy, X, Check } from "lucide-react";
import { getWebLogger } from "@/lib/logger";
import { SITE_CONFIG } from "@/lib/config";

const logger = getWebLogger();
logger.info("Initialized connect section module", { component: "ConnectSection" });

interface ConnectLink {
  label: string;
  href: string;
}

const SOCIAL_LINKS: ConnectLink[] = [
  {
    label: "GitHub",
    href: SITE_CONFIG.social.github,
  },
  {
    label: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
  },
  {
    label: "Twitter",
    href: SITE_CONFIG.social.twitter,
  },
  {
    label: "Discord",
    href: SITE_CONFIG.social.discord,
  },
];

const handleShareX = (url: string) => {
  const text =
    "Check out my portfolio - Full stack developer from Scotland crafting end-to-end solutions.";
  window.open(
    `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    "_blank"
  );
};

const handleShareLinkedIn = (url: string) => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    "_blank"
  );
};

export const ConnectSection = () => {
  logger.debug("Rendering connect section", { component: "ConnectSection" });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "https://www.jacksdevfolio.com/connect";

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg">
      {/* Title & Description */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Jack
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Full stack developer from Scotland, UK. Let's build something great.
        </p>
      </div>

      {/* Links Grid */}
      <div className="w-full">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold text-center mb-4">
          Connect
        </h2>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <Link
            href="/"
            className="rounded-lg border border-foreground/20 bg-background px-4 py-3 text-center font-medium text-sm transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background flex items-center justify-center gap-1.5"
          >
            Main Website
          </Link>

          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-foreground/20 bg-background px-4 py-3 text-center font-medium text-sm transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background flex items-center justify-center gap-1.5"
            >
              {link.label}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}

          {/* Email Button - Full Width */}
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=Let's%20collaborate`}
            className="sm:col-span-2 rounded-lg border-2 border-accent bg-accent/10 px-4 py-3 text-center font-medium text-sm text-accent transition-all duration-300 hover:bg-accent hover:text-background flex items-center justify-center gap-1.5"
          >
            <Mail className="h-4 w-4" />
            Get in Touch
          </a>
        </div>
      </div>

      {/* QR Code & Share */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* QR Code */}
        <div className="flex flex-col items-center">
          <div className="rounded-lg border border-foreground/20 bg-white p-3">
            <div className="w-32 h-32 flex items-center justify-center text-xs text-muted-foreground">
              QR Code
            </div>
          </div>
        </div>

        {/* Share Text & Button */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <p className="text-sm text-muted-foreground text-center sm:text-left leading-relaxed">
            Help me reach more people. Share my profile with your network.
          </p>

          {/* Share Button */}
          <div className="relative w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setShowShare(!showShare)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-foreground/20 bg-background px-6 py-3 text-sm font-medium transition-all hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>

            <p className="text-xs text-muted-foreground">
              Scan QR code or share!
            </p>

            {showShare && (
              <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 bg-background border border-foreground/20 rounded-lg shadow-lg z-50 min-w-52 w-full sm:w-auto">
                {/* Socials */}
                <button
                  type="button"
                  onClick={() => {
                    handleShareX(url);
                    setShowShare(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-xs hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5 shrink-0" />
                  X / Twitter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleShareLinkedIn(url);
                    setShowShare(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-xs hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                  LinkedIn
                </button>

                {/* Divider */}
                <div className="border-t border-foreground/10 my-1" />

                {/* Utilities */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopied("link");
                    setTimeout(() => setCopied(null), 2000);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 text-xs hover:bg-foreground/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  {copied === "link" ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-foreground" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 shrink-0" />
                  )}
                  {copied === "link" ? "Copied!" : "Copy Link"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectSection;

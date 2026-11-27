import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
import { SPONSORS } from "@/lib/content";
import { Handshake } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description:
    "The companies and technology partners supporting Jack's software projects. Interested in supporting my work? Become a sponsor.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Sponsors & Partners | Jack's Devfolio",
    description: "The companies and technology partners supporting Jack's software projects.",
    url: "/sponsors",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Sponsors & Partners | Jack's Devfolio",
    description: "The companies and technology partners supporting Jack's software projects.",
  },
};

export default function SponsorsPage() {
  return (
    <>
      <main className="container relative mx-auto z-10 flex min-h-[70vh] flex-col gap-8 pb-12 pt-8 px-4 sm:px-6 md:px-8 sm:pt-10 md:gap-10 md:pt-12 sm:pb-16 md:pb-20">
        <header className="max-w-2xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
            Sponsors
          </p>
          <h1 className="mt-3 text-[clamp(1.8rem,3.2vw,2.75rem)] font-display font-semibold leading-tight">
            Sponsors &amp; partners
          </h1>
          <p className="mt-3 sm:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            The companies and technology partners who back my work. Thank you.
          </p>
        </header>

        {SPONSORS.length > 0 ? (
          <ul className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPONSORS.map((sponsor) => (
              <li key={sponsor.name}>
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group flex h-full flex-col gap-4 rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6 transition-colors hover:border-brand focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex h-12 items-center">
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        loading="lazy"
                        className="max-h-12 w-auto max-w-[10rem] object-contain"
                      />
                    ) : (
                      <span className="text-lg font-display font-semibold">{sponsor.name}</span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.25rem] text-muted-foreground">
                      {sponsor.tier}
                    </p>
                    {sponsor.logo && (
                      <h2 className="text-base font-display font-semibold">{sponsor.name}</h2>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sponsor.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <section
            aria-labelledby="empty-heading"
            className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-foreground/20 bg-muted/10 px-6 py-12 text-center sm:py-16"
          >
            <Handshake className="h-8 w-8 text-brand" aria-hidden="true" />
            <h2 id="empty-heading" className="text-lg sm:text-xl font-display font-semibold">
              No sponsors yet
            </h2>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              This space is reserved for the companies that back my work. Be the first to put your
              brand alongside my projects.
            </p>
            <Button asChild className="mt-2 text-[10px] uppercase tracking-[0.2rem] font-semibold">
              <Link href="/sponsorship">Become a Sponsor</Link>
            </Button>
          </section>
        )}
      </main>

      <Footer email={SITE_CONFIG.email} socialLinks={SITE_CONFIG.social} />
    </>
  );
}

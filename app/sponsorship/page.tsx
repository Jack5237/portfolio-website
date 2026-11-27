import { Footer } from "@/components/sections/footer";
import { SponsorCta } from "@/components/sections/sponsor-cta";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
import { FEATURED_PROJECTS } from "@/lib/content";
import { Dish, Laptop, Loupe, Plot, Terminal } from "@lucasmarkes/hairline/react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Become a Sponsor",
  description:
    "Sponsor Jack, a 16-year-old Scottish full stack developer building software products and a studio. Explore sponsorship benefits, partnership opportunities and how to get in touch.",
  keywords: [
    "sponsor developer",
    "developer sponsorship",
    "tech partnership",
    "hardware sponsorship",
    "Scottish software developer",
  ],
  alternates: { canonical: "/sponsorship" },
  openGraph: {
    title: "Become a Sponsor | Jack's Devfolio",
    description:
      "Partner with a 16-year-old Scottish developer already shipping real software products.",
    url: "/sponsorship",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary",
    title: "Become a Sponsor | Jack's Devfolio",
    description:
      "Partner with a 16-year-old Scottish developer already shipping real software products.",
  },
};

const CARD =
  "relative overflow-hidden rounded-2xl border border-foreground/15 bg-muted/10 p-5 md:p-6";

const TILES = [
  {
    Figure: Dish,
    title: "Real visibility",
    text: "Your logo and link on the Sponsors page, plus home and project placement.",
  },
  {
    Figure: Loupe,
    title: "Honest exposure",
    text: "Your product used in real builds and write-ups, never scripted ads.",
  },
  {
    Figure: Terminal,
    title: "Dev feedback",
    text: "Daily hands-on input from someone shipping on your platform.",
  },
  {
    Figure: Plot,
    title: "Early alignment",
    text: "Back a builder who is already shipping and grow with the projects.",
  },
];

const WAYS = ["Hardware", "Dev tools & credits", "Collabs & content"];

export default function SponsorshipPage() {
  const email = SITE_CONFIG.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Sponsorship enquiry")}`;
  const shipped = FEATURED_PROJECTS.length;

  return (
    <>
      <main className="container relative z-10 mx-auto flex flex-col gap-8 px-4 pb-10 pt-8 sm:px-6 sm:pt-10 md:px-8 md:pb-14 md:pt-12">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3rem] text-brand sm:text-sm sm:tracking-[0.4rem]">
            Sponsorship
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight">
            Back a developer who <span className="text-brand">ships</span>.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            I&apos;m Jack, a{" "}
            <strong className="text-foreground">16-year-old full stack developer</strong> from
            Scotland and founder of <strong className="text-foreground">Caledonia Systems</strong>.
            I build in public, so every company that backs me is part of the story.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="text-[10px] font-semibold uppercase tracking-[0.2rem]">
              <a href={mailto}>Start an enquiry</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-[10px] font-semibold uppercase tracking-[0.2rem]"
            >
              <Link href="/sponsors">See sponsors</Link>
            </Button>
          </div>
        </header>

        <section
          aria-label="Why sponsor"
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5"
        >
          <article
            className={`${CARD} flex min-h-72 flex-col justify-between gap-8 sm:col-span-2 md:row-span-2`}
          >
            <div className="pointer-events-auto absolute right-6 top-6 hidden w-64 opacity-70 md:block">
              <Laptop intensity={0.6} />
            </div>
            <div className="relative max-w-md">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                What I&apos;m building
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                AI tooling, game-server platforms, Discord tools and education software, shipped end
                to end:{" "}
                <strong className="text-foreground">interface, backend and infrastructure</strong>.
              </p>
            </div>
            <div className="relative space-y-4">
              <ul className="flex flex-wrap gap-2">
                {WAYS.map((way) => (
                  <li
                    key={way}
                    className="rounded-full border border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.15rem] text-muted-foreground"
                  >
                    {way}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild className="text-[10px] font-semibold uppercase tracking-[0.2rem]">
                  <Link href="/#work">View featured projects</Link>
                </Button>
                <p className="text-xs uppercase tracking-[0.15rem] text-muted-foreground">
                  <span className="font-display text-xl font-bold text-brand">{shipped}+</span>{" "}
                  shipped
                </p>
              </div>
            </div>
          </article>

          {TILES.map(({ Figure, title, text }) => (
            <article key={title} className={`${CARD} min-h-56`}>
              <div className="-ml-2 w-28 opacity-80">
                <Figure intensity={0.6} />
              </div>
              <h3 className="mt-2 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                {text}
              </p>
            </article>
          ))}
        </section>
      </main>

      <SponsorCta variant="enquiry" email={email} />

      <Footer email={email} socialLinks={SITE_CONFIG.social} />
    </>
  );
}

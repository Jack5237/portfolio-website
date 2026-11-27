import { Footer } from "@/components/sections/footer";
import { SponsorCta } from "@/components/sections/sponsor-cta";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
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

export default function SponsorshipPage() {
  const email = SITE_CONFIG.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Sponsorship enquiry")}`;

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
            className={`${CARD} flex flex-col items-center justify-center gap-4 border-brand/20 bg-gradient-to-br from-brand/10 via-transparent to-transparent text-center sm:col-span-2 md:row-span-2 md:p-8`}
          >
            <div className="w-40 opacity-80 md:w-44">
              <Laptop intensity={0.6} />
            </div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              What I&apos;m <span className="text-brand">building</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              AI tooling, game-server platforms, Discord tools and education software, shipped end
              to end:{" "}
              <strong className="text-foreground">interface, backend and infrastructure</strong>.
              Open to hardware, dev tools and collabs.
            </p>
            <Button asChild className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2rem]">
              <Link href="/#work">View featured projects</Link>
            </Button>
          </article>

          {TILES.map(({ Figure, title, text }) => (
            <article
              key={title}
              className={`${CARD} flex flex-col items-center justify-center gap-2 text-center transition-colors hover:border-brand/40`}
            >
              <div className="w-20 opacity-80">
                <Figure intensity={0.6} />
              </div>
              <h3 className="font-display text-base font-semibold">{title}</h3>
              <p className="text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm">
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

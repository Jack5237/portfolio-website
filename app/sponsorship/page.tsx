import { Footer } from "@/components/sections/footer";
import { SponsorCta } from "@/components/sections/sponsor-cta";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
import { FEATURED_PROJECTS } from "@/lib/content";
import { Code2, Handshake, Megaphone, MonitorSmartphone, Rocket, Users } from "lucide-react";
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

const CARD = "rounded-2xl border border-foreground/15 bg-muted/10 p-5 sm:p-6";

const TILES = [
  {
    Icon: Megaphone,
    title: "Real visibility",
    text: "Your logo and link on the Sponsors page, plus home and project placement by agreement.",
  },
  {
    Icon: Code2,
    title: "Honest exposure",
    text: "Your product used in real builds and blog write-ups, never scripted ads.",
  },
  {
    Icon: Users,
    title: "Developer feedback",
    text: "Daily hands-on input from someone shipping on your platform.",
  },
  {
    Icon: Rocket,
    title: "Early alignment",
    text: "Back a builder who is already shipping, and grow with the projects you support.",
  },
];

const WAYS = [
  { Icon: MonitorSmartphone, title: "Hardware", text: "Laptops, displays and test devices." },
  { Icon: Code2, title: "Dev tools", text: "Hosting, databases and API credits." },
  { Icon: Handshake, title: "Collabs", text: "Co-created projects, tutorials and case studies." },
];

export default function SponsorshipPage() {
  const email = SITE_CONFIG.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Sponsorship enquiry")}`;
  const shipped = FEATURED_PROJECTS.length;

  return (
    <>
      <main className="container relative z-10 mx-auto flex flex-col gap-8 px-4 pb-12 pt-8 sm:gap-10 sm:px-6 sm:pt-10 md:px-8 md:pb-16 md:pt-12">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3rem] text-brand sm:text-sm sm:tracking-[0.4rem]">
            Sponsorship
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-tight">
            Back a developer who <span className="text-brand">ships</span>.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            I&apos;m Jack, a{" "}
            <strong className="text-foreground">16-year-old full stack developer</strong> from
            Scotland and the founder of{" "}
            <strong className="text-foreground">Caledonia Systems</strong>. I build in public, so
            every company that backs me is visibly part of the story.
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

        <section aria-label="Why sponsor" className="grid gap-4 md:grid-cols-6 md:gap-5">
          <article
            className={`${CARD} flex flex-col justify-between gap-6 md:col-span-4 md:row-span-2`}
          >
            <div>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">
                What I&apos;m building
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                AI tooling, game-server platforms, Discord tooling and education software, shipped
                end to end:{" "}
                <strong className="text-foreground">interface, backend and infrastructure</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="font-display text-5xl font-bold text-brand">
                {shipped}+
                <span className="ml-2 text-xs font-normal uppercase tracking-[0.2rem] text-muted-foreground">
                  projects shipped
                </span>
              </p>
              <Button asChild className="text-[10px] font-semibold uppercase tracking-[0.2rem]">
                <Link href="/#work">View featured projects</Link>
              </Button>
            </div>
          </article>

          {TILES.slice(0, 2).map(({ Icon, title, text }) => (
            <article key={title} className={`${CARD} md:col-span-2`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}

          {TILES.slice(2).map(({ Icon, title, text }) => (
            <article key={title} className={`${CARD} md:col-span-3`}>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </section>

        <section aria-labelledby="ways" className="space-y-4">
          <h2 id="ways" className="font-display text-xl font-semibold sm:text-2xl">
            Ways to collaborate
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3 md:gap-5">
            {WAYS.map(({ Icon, title, text }) => (
              <li key={title} className={`${CARD} flex items-start gap-3`}>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SponsorCta variant="enquiry" email={email} />

      <Footer email={email} socialLinks={SITE_CONFIG.social} />
    </>
  );
}

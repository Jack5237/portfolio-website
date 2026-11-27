import { Footer } from "@/components/sections/footer";
import { SponsorCta } from "@/components/sections/sponsor-cta";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/config";
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

const BENEFITS = [
  {
    Icon: Megaphone,
    title: "Brand visibility",
    text: "Your logo and link on the Sponsors page, with a place on this site's home and project pages by agreement.",
  },
  {
    Icon: Code2,
    title: "Honest product exposure",
    text: "Your product used and shown in real projects, builds and write-ups on the blog, not scripted ads.",
  },
  {
    Icon: Users,
    title: "A direct line to developers",
    text: "Feedback from someone building and shipping on your platform or hardware every day.",
  },
  {
    Icon: Rocket,
    title: "Early alignment",
    text: "Back a 16-year-old who is already shipping, and grow alongside the projects you support.",
  },
];

const OPPORTUNITIES = [
  {
    Icon: MonitorSmartphone,
    title: "Hardware & equipment",
    text: "Laptops, displays, peripherals and test devices used to build, test and showcase my work. Ideal for retailers and manufacturers.",
  },
  {
    Icon: Code2,
    title: "Developer tools & infrastructure",
    text: "Hosting, databases, APIs and tooling credits, with honest reviews and integration write-ups.",
  },
  {
    Icon: Handshake,
    title: "Collaborations & content",
    text: "Co-created projects, tutorials, case studies and campaigns tailored to your goals.",
  },
];

export default function SponsorshipPage() {
  const email = SITE_CONFIG.email;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Sponsorship enquiry")}`;

  return (
    <>
      <main className="container relative mx-auto z-10 flex flex-col gap-12 pb-12 pt-8 px-4 sm:px-6 md:px-8 sm:gap-16 sm:pt-10 md:gap-20 md:pt-12 sm:pb-16 md:pb-20">
        {/* Hero */}
        <header className="max-w-3xl">
          <p className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-brand">
            Sponsorship
          </p>
          <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.5rem)] font-display font-bold leading-tight">
            Back a developer who <span className="text-brand">ships</span>.
          </h1>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            I&apos;m Jack, a 16-year-old full stack developer from Scotland, out here shipping. I
            build software products and run a software studio, and I&apos;m looking for companies
            who want to support that work and be part of it.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="text-[10px] uppercase tracking-[0.2rem] font-semibold">
              <a href={mailto}>Start an enquiry</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-[10px] uppercase tracking-[0.2rem] font-semibold"
            >
              <Link href="/sponsors">See sponsors</Link>
            </Button>
          </div>
        </header>

        {/* About */}
        <section aria-labelledby="about" className="grid gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <h2 id="about" className="text-xl sm:text-2xl font-display font-semibold">
              Who I am
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              I design, build and deploy complete web products: from the interface to the backend
              and infrastructure. My work spans AI tooling, game-server platforms, Discord tooling
              and educational software, and I&apos;m behind Caledonia Systems, a Scottish software
              studio building fast, reliable products for modern businesses.
            </p>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold">Ambitions</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              To keep shipping real products, grow Caledonia Systems into a recognised studio, and
              build in public so the companies that support me are visibly part of the journey.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section aria-labelledby="projects" className="space-y-5 sm:space-y-6">
          <h2 id="projects" className="text-xl sm:text-2xl font-display font-semibold">
            What I&apos;m building
          </h2>
          <p className="max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            AI tooling, game-server platforms, Discord tooling and more. See everything I&apos;ve
            shipped in the featured projects.
          </p>
          <Button asChild className="text-[10px] uppercase tracking-[0.2rem] font-semibold">
            <Link href="/#work">View featured projects</Link>
          </Button>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits" className="space-y-5 sm:space-y-6">
          <h2 id="benefits" className="text-xl sm:text-2xl font-display font-semibold">
            Sponsorship benefits
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {BENEFITS.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-display font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Opportunities */}
        <section aria-labelledby="opportunities" className="space-y-5 sm:space-y-6">
          <h2 id="opportunities" className="text-xl sm:text-2xl font-display font-semibold">
            Ways to collaborate
          </h2>
          <ul className="grid gap-4 md:grid-cols-3 sm:gap-6">
            {OPPORTUNITIES.map(({ Icon, title, text }) => (
              <li
                key={title}
                className="rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-display font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
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

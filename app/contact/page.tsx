import CalendlyEmbed from "@/components/sections/calendly-embed";
import ContactForm from "@/components/sections/contact-form";
import { Footer } from "@/components/sections/footer";
import { Calendar } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { preconnect } from "react-dom";

export const metadata: Metadata = {
  title: "Contact – Full Stack Developer",
  description:
    "Get in touch with Jack for web development inquiries, project quotes, or to schedule a free 30-minute consultation. Available for freelance and contract work.",
  keywords: [
    "contact Jack",
    "hire developer",
    "web development services",
    "consultation",
    "project inquiry",
    "freelance developer",
    "book consultation",
    "software engineer contact",
    "development quote",
    "work together",
  ],
  openGraph: {
    title: "Contact Jack - Schedule a Consultation",
    description: "Ready to work together? Send a message or book a free 30-minute call.",
    type: "website",
    locale: "en_GB",
    siteName: "Jack's Portfolio",
    url: "https://www.jacksdevfolio.com/contact",
  },
};

const CONTACT_EMAIL = "contact@jacksdevfolio.com";

export default function ContactPage() {
  // Open the Calendly connections early so the widget paints fast once it scrolls into view
  preconnect("https://calendly.com");
  preconnect("https://assets.calendly.com");

  return (
    <>
      <main className="container relative mx-auto z-10 flex min-h-screen flex-col gap-5 pb-12 pt-8 px-4 sm:px-6 md:px-8 sm:gap-6 sm:pt-10 md:gap-8 md:pt-12 sm:pb-16 md:pb-20">
        <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="lg:shrink-0">
            <h1 className="text-[clamp(1.8rem,3.2vw,2.75rem)] font-display font-semibold leading-tight lg:whitespace-nowrap">
              Let&apos;s talk
            </h1>
            <p className="mt-3 sm:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Got an idea, a project or just want to say hi? Send a message or book a call.
            </p>
          </div>
          <div className="lg:max-w-md lg:text-right">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curious what I&apos;ve been building first?
            </p>
            <Link
              href="/#work"
              className="mt-1 inline-block text-sm text-foreground underline-offset-2 hover:underline"
            >
              See my skills and work →
            </Link>
          </div>
        </header>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <ContactForm />

          {/* Calendly Scheduling */}
          <section className="flex flex-col rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6">
            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-base sm:text-lg font-display font-semibold">Book a Call</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Grab a 30-minute slot and we can chat.
              </p>
            </div>

            <div className="flex-1 rounded-lg border border-foreground/10 bg-background overflow-hidden">
              <CalendlyEmbed url="https://calendly.com/contact-jack-dev/30min?hide_gdpr_banner=1" />
            </div>
          </section>
        </div>
      </main>

      <Footer
        email={CONTACT_EMAIL}
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://www.linkedin.com/in/jack-dev-a732b4397",
        }}
      />
    </>
  );
}

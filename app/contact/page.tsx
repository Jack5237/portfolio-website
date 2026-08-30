import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import Script from "next/script";
import { Footer } from "@/components/sections/footer";
import ContactForm from "@/components/sections/contact-form";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Loaded contact page module", { page: "Contact" });

export const metadata: Metadata = {
  title: "Contact Jack - Full Stack Developer | Consultation & Inquiry",
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
  logger.debug("Rendering contact page", { page: "Contact" });

  return (
    <>
      <main className="container relative mx-auto z-10 flex min-h-screen flex-col gap-5 pb-12 pt-8 px-4 sm:px-6 md:px-8 sm:gap-6 sm:pt-10 md:gap-8 md:pt-12 sm:pb-16 md:pb-20">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <ContactForm />

          {/* Calendly Scheduling */}
          <section className="rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6">
            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-base sm:text-lg font-display font-semibold">
                  Book a Call
                </h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Schedule a free 15-minute consultation to discuss your project.
              </p>
            </div>

            <div className="rounded-lg border border-foreground/10 bg-background overflow-hidden">
              {/* Calendly inline widget */}
              <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/contact-jack-dev/30min"
                title="Select a Date & Time - Calendly"
                style={{ minWidth: "320px", height: "700px" }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />
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

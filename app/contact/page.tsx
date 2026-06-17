import type { Metadata } from "next";
import { Calendar } from "lucide-react";
import Script from "next/script";
import { Footer } from "@/components/sections/footer";
import ContactForm from "@/components/sections/contact-form";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Loaded contact page module", { page: "Contact" });

export const metadata: Metadata = {
  title: "Contact Me - Get in Touch | Jack",
  description:
    "Get in touch with Jack. Send a message or schedule a free consultation call about your project.",
  keywords: [
    "contact Jack",
    "book consultation",
    "web development quote",
    "software engineer contact",
  ],
  openGraph: {
    title: "Contact Me - Jack",
    description: "Ready to work together? Get in touch today.",
    type: "website",
    locale: "en_GB",
    siteName: "Jack",
  },
};

const CONTACT_EMAIL = "contact.jack.dev@gmail.com";

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

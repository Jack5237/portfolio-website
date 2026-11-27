import { ArrowRight, CalendarCheck, Handshake, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ScrollSlide } from "@/components/ui/scroll-slide";

type Variant = "sponsor" | "contact" | "enquiry";

const COPY: Record<Variant, { heading: string; body: string }> = {
  sponsor: {
    heading: "Want to back what I'm building?",
    body: "I'm a 16-year-old Scottish developer already shipping real products. Sponsor my work and be part of the journey.",
  },
  contact: {
    heading: "Ready to build something great?",
    body: "Tell me about your project and I'll get back to you within 24 hours.",
  },
  enquiry: {
    heading: "Let's work together",
    body: "Tell me about your company and what you'd like to support. I'll reply with options.",
  },
};

const BUTTON_CLASS = "px-6 text-[10px] uppercase tracking-[0.18rem] sm:px-8 sm:text-xs";

/** Closing call-to-action, styled like Caledonia Systems' final CTA. */
export const SponsorCta = ({
  variant = "sponsor",
  email,
}: {
  variant?: Variant;
  email?: string;
}) => {
  const { heading, body } = COPY[variant];
  return (
    <section
      aria-labelledby="sponsor-cta-heading"
      className="container relative z-10 mx-auto px-4 pb-[4.5rem] pt-6 sm:px-6 sm:pb-28 sm:pt-12 md:px-8 md:pb-36 md:pt-16"
    >
      <ScrollSlide>
        <article className="rounded-2xl border border-foreground/20 bg-transparent p-6 text-center sm:p-8 md:p-10">
          <h2
            id="sponsor-cta-heading"
            className="text-[clamp(1.8rem,4vw,3rem)] font-display font-semibold leading-tight"
          >
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {body}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {variant === "sponsor" && (
              <>
                <Button asChild className={BUTTON_CLASS}>
                  <Link href="/sponsorship">
                    Become a Sponsor
                    <ArrowRight className="ml-2 size-3.5 shrink-0" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className={BUTTON_CLASS}>
                  <Link href="/sponsors">
                    <Handshake className="mr-2 size-3.5 shrink-0" />
                    View Sponsors
                  </Link>
                </Button>
              </>
            )}
            {variant === "contact" && (
              <>
                <Button asChild className={BUTTON_CLASS}>
                  <Link href="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2 size-3.5 shrink-0" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className={BUTTON_CLASS}>
                  <Link href="/sponsorship">
                    <Handshake className="mr-2 size-3.5 shrink-0" />
                    Become a Sponsor
                  </Link>
                </Button>
              </>
            )}
            {variant === "enquiry" && (
              <>
                <Button asChild className={BUTTON_CLASS}>
                  <a href={`mailto:${email}?subject=${encodeURIComponent("Sponsorship enquiry")}`}>
                    <Mail className="mr-2 size-3.5 shrink-0" />
                    Email me
                  </a>
                </Button>
                <Button asChild variant="outline" className={BUTTON_CLASS}>
                  <Link href="/contact">
                    <CalendarCheck className="mr-2 size-3.5 shrink-0" />
                    Book a call
                  </Link>
                </Button>
              </>
            )}
          </div>
        </article>
      </ScrollSlide>
    </section>
  );
};

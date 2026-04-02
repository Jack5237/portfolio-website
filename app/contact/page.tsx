"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Footer } from "@/components/sections/footer";
import { DecryptedText } from "@/components/ui/decrypted-text";
import { MasonryBackground } from "@/components/background/masonry-background";
import { Button } from "@/components/ui/button";
import { getWebLogger } from "@/lib/logger";
import { MASONRY_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Loaded contact page module", { page: "Contact" });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  logger.debug("Rendering contact page", { page: "Contact" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const mailtoLink = `mailto:contact.jack.dev@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError(
        "Failed to send message. Please try again or email directly."
      );
      logger.error("Failed to send contact form", { error: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16 pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8 items-center justify-center">
        {/* Contact Section - Single responsive layout */}
        <section className="relative flex min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 justify-center items-center overflow-hidden">
          {/* Faded Masonry Background */}
          <MasonryBackground
            items={MASONRY_ITEMS}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            blurToFocus={true}
          />

          {/* Left Column - Hero Content */}
          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <header className="space-y-3 sm:space-y-4">
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Subtitle */}
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground md:text-sm md:tracking-[0.5rem]">
                  <span className="font-medium text-foreground">Let&apos;s connect</span>
                  <span>—</span>
                  <span>Get in touch</span>
                </div>

                {/* Main title with decrypted effect */}
                <div className="space-y-0.5 sm:space-y-1">
                  <h1
                    className={cn(
                      "text-[clamp(2rem,5vw,3.5rem)] font-display font-semibold lowercase leading-[1.1] tracking-tight"
                    )}
                  >
                    <DecryptedText
                      text="send a"
                      animateOn="view"
                      revealDirection="left"
                      speed={40}
                      maxIterations={20}
                      className="block"
                    />
                  </h1>
                  <h1
                    className={cn(
                      "text-[clamp(2rem,5vw,3.5rem)] font-display font-semibold lowercase leading-[1.1] tracking-tight"
                    )}
                  >
                    <DecryptedText
                      text="message"
                      animateOn="view"
                      revealDirection="left"
                      speed={40}
                      maxIterations={20}
                      className="block"
                    />
                  </h1>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground md:text-base max-w-md">
                  Have a project in mind, want to collaborate, or just want to
                  say hello? Fill out the form and I&apos;ll get back to you.
                </p>

                {/* Email Alternative */}
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Or email:{" "}
                  <a
                    href="mailto:contact.jack.dev@gmail.com"
                    className="text-accent hover:underline underline-offset-2"
                  >
                    contact.jack.dev@gmail.com
                  </a>
                </p>
              </div>
            </header>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative z-10 flex-1 w-full">
            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4"
            >
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2rem] text-muted-foreground block"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-background border border-foreground/15 px-3 sm:px-4 py-2 sm:py-2.5",
                    "text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/30",
                    "transition-colors duration-200",
                    "hover:border-foreground/25"
                  )}
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2rem] text-muted-foreground block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-background border border-foreground/15 px-3 sm:px-4 py-2 sm:py-2.5",
                    "text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/30",
                    "transition-colors duration-200",
                    "hover:border-foreground/25"
                  )}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2rem] text-muted-foreground block"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full bg-background border border-foreground/15 px-3 sm:px-4 py-2 sm:py-2.5",
                    "text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/30",
                    "transition-colors duration-200",
                    "hover:border-foreground/25"
                  )}
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-[10px] sm:text-xs uppercase tracking-[0.2rem] text-muted-foreground block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={cn(
                    "w-full bg-background border border-foreground/15 px-3 sm:px-4 py-2 sm:py-2.5",
                    "text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50",
                    "focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/30",
                    "transition-colors duration-200",
                    "hover:border-foreground/25",
                    "resize-none font-mono"
                  )}
                  placeholder="Your message..."
                />
              </div>

              {/* Status Messages */}
              {submitted && (
                <div className="p-2.5 bg-accent/10 border border-accent/30 rounded">
                  <p className="text-[10px] sm:text-xs text-accent">
                    ✓ Thanks! Opening email client now.
                  </p>
                </div>
              )}

              {error && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded">
                  <p className="text-[10px] sm:text-xs text-red-500">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 sm:pt-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full text-xs sm:text-sm uppercase tracking-[0.2rem] font-medium py-2 sm:py-2.5",
                    "hover:opacity-90 transition-opacity"
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer
        email="contact.jack.dev@gmail.com"
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://linkedin.com/in/jack-mcallister",
        }}
      />
    </>
  );
}


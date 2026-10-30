"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Mail } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

const REQUIRED_MESSAGES: Record<string, string> = {
  name: "Please tell me your name.",
  email: "Please enter a valid email address so I can reply.",
  message: "Please tell me how I can help.",
};

// 16px on mobile stops iOS zooming the page when a field is focused
const FIELD_CLASS = cn(
  "w-full bg-background border border-foreground/15 px-3 sm:px-4 py-2.5",
  "text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50",
  "focus:outline-none focus:border-foreground/50 focus:ring-1 focus:ring-foreground/30",
  "transition-colors duration-200 hover:border-foreground/25"
);
const LABEL_CLASS = "block text-sm font-medium text-foreground";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot — never shown, must stay empty
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // Replace the browser's generic bubble with our own message next to the field
  const handleInvalid = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name } = e.target as HTMLInputElement;
    setFieldErrors((prev) => ({ ...prev, [name]: REQUIRED_MESSAGES[name] }));
  };

  const fieldProps = (name: "name" | "email" | "message") => ({
    id: name,
    name,
    value: formData[name],
    onChange: handleChange,
    "aria-invalid": !!fieldErrors[name],
    "aria-describedby": fieldErrors[name] ? `${name}-error` : undefined,
  });

  const fieldError = (name: string) =>
    fieldErrors[name] && (
      <p id={`${name}-error`} className="text-sm text-red-500">
        {fieldErrors[name]}
      </p>
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          website: formData.website,
        }),
      });

      const result = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        setError(result.error || "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", website: "" });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to send message. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-xl border border-foreground/15 bg-muted/10 p-5 sm:p-6">
      <div className="space-y-4 mb-5">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base sm:text-lg font-display font-semibold">Send a Message</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Drop me a message and I&apos;ll get back to you as soon as I can.
        </p>
      </div>

      <form onSubmit={handleSubmit} onInvalid={handleInvalid} className="space-y-3 sm:space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="name" className={LABEL_CLASS}>
            Name
          </label>
          <input
            type="text"
            {...fieldProps("name")}
            autoComplete="name"
            maxLength={100}
            required
            className={FIELD_CLASS}
            placeholder="Your name"
          />
          {fieldError("name")}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            type="email"
            {...fieldProps("email")}
            autoComplete="email"
            maxLength={200}
            required
            className={FIELD_CLASS}
            placeholder="your.email@example.com"
          />
          {fieldError("email")}
        </div>

        {/* Message Field */}
        <div className="space-y-1.5">
          <label htmlFor="message" className={LABEL_CLASS}>
            Message
          </label>
          <textarea
            {...fieldProps("message")}
            required
            rows={4}
            maxLength={5000}
            className={cn(FIELD_CLASS, "resize-none font-mono")}
            placeholder="Your message..."
          />
          {fieldError("message")}
        </div>

        {/* Status Messages */}
        {submitted && (
          <div className="p-2.5 bg-accent/10 border border-accent/30 rounded">
            <p className="text-[10px] sm:text-xs text-accent">
              ✓ Message sent! You can send another message below.
            </p>
          </div>
        )}

        {error && (
          <div className="p-2.5 bg-red-500/10 border border-red-500/30 rounded">
            <p className="text-[10px] sm:text-xs text-red-500">{error}</p>
          </div>
        )}

        {/* Honeypot — hidden from humans, traps bots */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ display: "none" }}
        />

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
              "Send Message"
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By sending this you agree to my{" "}
          <a
            href="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline underline-offset-2"
          >
            terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:underline underline-offset-2"
          >
            privacy policy
          </a>
          .
        </p>
      </form>

      {/* Email Alternative */}
      <div className="mt-4 pt-4 border-t border-foreground/10 space-y-2">
        <p className="text-xs text-muted-foreground text-center">Or email me directly at</p>
        <a
          href="mailto:contact@jacksdevfolio.com"
          className="text-xs sm:text-sm text-foreground hover:underline underline-offset-2 block text-center font-medium"
        >
          contact@jacksdevfolio.com
        </a>
      </div>
    </section>
  );
}

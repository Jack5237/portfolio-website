"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  agreedToTerms: boolean;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const type = (e.target as HTMLInputElement).type;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreedToTerms) {
      setError("Please agree to the terms and conditions to continue");
      return;
    }

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
          agreedToTerms: formData.agreedToTerms,
        }),
      });

      const result = await response.json() as { message?: string; error?: string };

      if (!response.ok) {
        setError(result.error || "Failed to send message. Please try again.");
        return;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "", agreedToTerms: false });

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
          <h2 className="text-base sm:text-lg font-display font-semibold">
            Send a Message
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Fill out the form and I&apos;ll get back to you within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
              "hover:border-foreground/25",
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
              "hover:border-foreground/25",
            )}
            placeholder="your.email@example.com"
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
              "resize-none font-mono",
            )}
            placeholder="Your message..."
          />
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

        {/* Terms Checkbox */}
        <div className="space-y-1.5">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              required
              className="mt-1 w-4 h-4 bg-background border border-foreground/15 rounded accent-foreground cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline underline-offset-2"
              >
                terms and conditions
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
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2 sm:pt-3">
          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full text-xs sm:text-sm uppercase tracking-[0.2rem] font-medium py-2 sm:py-2.5",
              "hover:opacity-90 transition-opacity",
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
      </form>

      {/* Email Alternative */}
      <div className="mt-4 pt-4 border-t border-foreground/10 space-y-2">
        <p className="text-xs text-muted-foreground text-center">
          Or email me directly at
        </p>
        <a
          href="mailto:contact.jack.dev@gmail.com"
          className="text-xs sm:text-sm text-foreground hover:underline underline-offset-2 block text-center font-medium"
        >
          contact.jack.dev@gmail.com
        </a>
      </div>
    </section>
  );
}

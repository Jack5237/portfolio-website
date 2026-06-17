import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sliding-window rate limiter: 3 submissions per IP per 10 minutes
const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_PER_WINDOW) return true;
  attempts.set(ip, [...timestamps, now]);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 },
    );
  }

  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      message?: string;
      agreedToTerms?: boolean;
      website?: string; // honeypot — must be empty
    };

    // Honeypot: bots fill hidden fields, humans don't
    if (body.website) {
      return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
    }

    const { name, email, message, agreedToTerms } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!agreedToTerms) {
      return NextResponse.json({ error: "You must agree to the terms." }, { status: 400 });
    }

    // Basic length guards
    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum allowed length." }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "contact.jack.dev@gmail.com",
      replyTo: email.trim(),
      subject: `New message from ${safeName}`,
      html: `
        <div style="font-family:monospace;max-width:600px;padding:24px;background:#0a0a0a;color:#ebebeb;border:1px solid #333">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin:0 0 16px">Portfolio Contact</p>
          <h2 style="margin:0 0 16px;font-size:20px">${safeName}</h2>
          <p style="font-size:12px;color:#888;margin:0 0 4px">From: <a href="mailto:${safeEmail}" style="color:#ebebeb">${safeEmail}</a></p>
          <hr style="border:none;border-top:1px solid #333;margin:16px 0"/>
          <p style="white-space:pre-wrap;line-height:1.7;font-size:14px">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}

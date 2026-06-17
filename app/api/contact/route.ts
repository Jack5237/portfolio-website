import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      message?: string;
      agreedToTerms?: boolean;
    };

    const { name, email, message, agreedToTerms } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!agreedToTerms) {
      return NextResponse.json({ error: "You must agree to the terms." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "contact.jack.dev@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;padding:24px;background:#0a0a0a;color:#ebebeb;border:1px solid #333">
          <p style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin:0 0 16px">Portfolio Contact</p>
          <h2 style="margin:0 0 16px;font-size:20px">${name}</h2>
          <p style="font-size:12px;color:#888;margin:0 0 4px">From: <a href="mailto:${email}" style="color:#ebebeb">${email}</a></p>
          <hr style="border:none;border-top:1px solid #333;margin:16px 0"/>
          <p style="white-space:pre-wrap;line-height:1.7;font-size:14px">${message}</p>
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

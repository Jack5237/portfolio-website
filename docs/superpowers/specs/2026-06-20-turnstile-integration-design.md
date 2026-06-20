# Turnstile Integration Design

**Date:** 2026-06-20  
**Feature:** Add Cloudflare Turnstile CAPTCHA to contact form for security parity with company site

## Overview

Add Turnstile widget to the contact form as a bot-protection layer. Turnstile validates client-side interactions server-side, complementing existing rate limiting and honeypot protections.

## Implementation

### Frontend (components/sections/contact-form.tsx)

- Add `turnstileToken` state to store verification token
- Install `@cloudflare/turnstile` npm package
- Render Turnstile managed component before Submit button
- Pass token in form payload to `/api/contact`
- Clear token on successful submission

### Backend (app/api/contact/route.ts)

- Extract `turnstileToken` from request body
- Call Cloudflare verification endpoint with token + `TURNSTILE_SECRET_KEY`
- Return 400 if verification fails
- Continue processing if successful
- Existing rate limiting and honeypot remain as backup layers

### Environment Variables

**Local (.env.local):**
```
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

**Vercel:** Add both variables to project Environment Variables (Settings > Environment Variables):
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public)
- `TURNSTILE_SECRET_KEY` (secret, backend only)

## Data Flow

1. User completes form fields
2. Turnstile widget challenges user (invisible or interactive)
3. On token generation, form can be submitted
4. Frontend sends form data + `turnstileToken` to `/api/contact`
5. Backend validates token with Cloudflare API
6. If valid, process submission (email via Resend)
7. If invalid, return error; user retries

## Testing

- Local: Use test keys from [Cloudflare docs](https://developers.cloudflare.com/turnstile/reference/testing/)
- Vercel: Use production keys once provided
- Honeypot field remains in case Turnstile fails silently

## Notes

- Rate limiting (3 per 10 min/IP) stays active
- Honeypot field remains as fallback bot protection
- No changes to email template or Resend integration

import { type NextRequest, NextResponse } from 'next/server';

// List of AI agent User-Agents to explicitly allow
const AI_AGENTS = [
  'ClaudeBot',
  'ChatGPT-User',
  'GPTBot',
  'Google-Extended',
  'DeepSeekBot',
  'Applebot-Extended',
  'PerplexityBot',
  'CCBot',
  'anthropic-ai',
  'ora-ai',
  'OraBot',
  'Googlebot',
  'Bingbot',
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get('user-agent') || '';
  const isAiAgent = AI_AGENTS.some(agent => userAgent.includes(agent));

  // Homepage markdown content negotiation
  if (pathname === '/') {
    const accept = request.headers.get('accept') || '';
    if (accept.includes('text/markdown') && !accept.includes('text/html')) {
      return NextResponse.rewrite(new URL('/api/home-markdown', request.url));
    }
  }

  // Create response
  const response = NextResponse.next();

  // Add Vary header for content negotiation
  response.headers.set('Vary', 'Accept, Accept-Encoding, User-Agent');

  // Signal to downstream services (like Vercel WAF) to allow agent access
  if (isAiAgent) {
    // Headers to bypass Vercel bot protection
    response.headers.set('X-Agent-Access', 'allowed');
    response.headers.set('X-Purpose', 'agent-access');

    // Cache headers optimized for agents
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, must-revalidate');

    // Content negotiation
    response.headers.set('Accept-Ranges', 'bytes');
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    '/api/:path*',
    '/blog',
    '/sitemap.xml',
    '/robots.txt',
    '/openapi.json',
    '/agents.txt',
  ],
};

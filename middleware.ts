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
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isAiAgent = AI_AGENTS.some(agent => userAgent.includes(agent));

  // Create response
  const response = NextResponse.next();

  // Add Vary header for content negotiation
  response.headers.set('Vary', 'Accept, Accept-Encoding, User-Agent');

  // Ensure agent requests are not cached with wrong variant
  if (isAiAgent) {
    response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600, must-revalidate');
    response.headers.set('X-Agent-Access', 'allowed');
  }

  // Support markdown content negotiation
  const acceptHeader = request.headers.get('accept') || '';
  if (acceptHeader.includes('text/markdown')) {
    response.headers.set('Content-Type', 'text/markdown; charset=utf-8');
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

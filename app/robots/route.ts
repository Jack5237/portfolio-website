import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `# Robots.txt
User-agent: ClaudeBot
Allow: /
Crawl-delay: 0

User-agent: ChatGPT-User
Allow: /
Crawl-delay: 0

User-agent: GPTBot
Allow: /
Crawl-delay: 0

User-agent: Google-Extended
Allow: /
Crawl-delay: 0

User-agent: DeepSeekBot
Allow: /
Crawl-delay: 0

User-agent: Applebot-Extended
Allow: /
Crawl-delay: 0

User-agent: PerplexityBot
Allow: /
Crawl-delay: 0

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /.vercel/
Crawl-delay: 1

Sitemap: https://www.jacksdevfolio.com/sitemap.xml
`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Vary': 'Accept, Accept-Encoding, User-Agent',
    },
  });
}

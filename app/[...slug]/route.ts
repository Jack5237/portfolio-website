import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  const requestPath = request.nextUrl.pathname;

  if (accept.includes('text/markdown')) {
    const markdown = `# 404 - Page Not Found

The page you requested does not exist: **${requestPath}**

## Explore the Site

### Pages
- [Home](/) - Portfolio homepage
- [Blog](/blog) - Articles and posts
- [Contact](/contact) - Get in touch

### API Endpoints

All API endpoints support JSON, text, and markdown formats via Accept header:

- **[/api/content](/api/content)** - Portfolio information (projects, technologies, bio)
- **[/api/health](/api/health)** - Health check & status
- **[/api/blog](/api/blog)** - Blog posts API
- **[/text](/text)** - Plain text portfolio version
- **[/openapi.json](/openapi.json)** - API documentation (OpenAPI 3.0)

### Request Examples

\`\`\`bash
# Get portfolio as markdown
curl -H "Accept: text/markdown" https://www.jacksdevfolio.com/api/content

# Get portfolio as plain text
curl -H "Accept: text/plain" https://www.jacksdevfolio.com/api/content

# Check site status
curl https://www.jacksdevfolio.com/api/health
\`\`\`

## Contact

Having trouble? Reach out to [contact@jacksdevfolio.com](mailto:contact@jacksdevfolio.com)

---

[← Back to homepage](/)
`;

    return new NextResponse(markdown, {
      status: 404,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Vary': 'Accept',
      },
    });
  }

  return new NextResponse(null, { status: 404 });
}

export async function POST(request: NextRequest) {
  return new NextResponse(JSON.stringify({ error: 'Not Found', status: 404 }), {
    status: 404,
    headers: {
      'Content-Type': 'application/json',
      'Vary': 'Accept',
    },
  });
}

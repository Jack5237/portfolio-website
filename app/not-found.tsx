import { NextResponse } from 'next/server';

export default function NotFound() {
  const siteMap = `# Page Not Found

The page you're looking for doesn't exist.

## Site Map

- [Home](/) - Portfolio homepage with projects and skills
- [Blog](/blog) - Latest articles and technical posts
- [Contact](/contact) - Get in touch

## API Endpoints

- [/api/content](https://www.jacksdevfolio.com/api/content) - Portfolio data (supports JSON, text, markdown)
- [/api/health](https://www.jacksdevfolio.com/api/health) - Health check endpoint
- [/api/blog](https://www.jacksdevfolio.com/api/blog) - Blog posts API
- [/text](/text) - Plain text version of portfolio
- [/openapi.json](/openapi.json) - OpenAPI specification

## Support

For questions or issues, email [contact@jacksdevfolio.com](mailto:contact@jacksdevfolio.com)

---

*This is a 404 Not Found response. If you believe this is an error, please check the URL or contact the site owner.*
`;

  return new Response(siteMap, {
    status: 404,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Vary': 'Accept',
    },
  });
}

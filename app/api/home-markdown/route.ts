import { NextResponse } from 'next/server';
import { FEATURED_PROJECTS, TECHNOLOGIES_LEARNED } from '@/lib/content';

export async function GET() {
  const markdown = `# Jack - Full Stack Developer

**Location:** Scotland
**Email:** contact@jacksdevfolio.com
**Website:** https://www.jacksdevfolio.com

## About

Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends. Passionate about clean code, performance, and full-stack engineering.

Specializing in React, Next.js, TypeScript, and Node.js with expertise in building performant, scalable applications with modern architecture and best practices.

## Featured Projects

${FEATURED_PROJECTS.slice(0, 5).map(p => `### ${p.title}

${p.description || ''}

- **Category:** ${p.category}
- **Discipline:** ${p.discipline}
- **Link:** ${p.href || 'N/A'}`).join('\n\n')}

## Technologies

${TECHNOLOGIES_LEARNED.map(t => `- ${t.name} (${t.category})`).join('\n')}

## Social & Contact

- **GitHub:** https://github.com/Jack5237
- **LinkedIn:** https://www.linkedin.com/in/jack-dev-a732b4397
- **Twitter:** https://x.com/Jack1168556
- **Discord:** https://discord.com/users/ttv_jack_
- **Email:** contact@jacksdevfolio.com

## API

- [/api/content](/api/content) - Portfolio data (JSON, text, markdown)
- [/api/health](/api/health) - Health check
- [/api/blog](/api/blog) - Blog posts
- [/openapi.json](/openapi.json) - OpenAPI specification
- [/text](/text) - Plain text version

---

For more information and to get in touch, visit https://www.jacksdevfolio.com or email contact@jacksdevfolio.com
`;

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
}

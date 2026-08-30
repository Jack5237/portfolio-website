import { NextResponse } from 'next/server';

// ponytail: serve plain text for agents, static cache safe
export async function GET() {
  const content = `JACK - FULL STACK DEVELOPER

Location: Scotland
Title: Full Stack Developer
Email: contact@jacksdevfolio.com
Website: https://www.jacksdevfolio.com

ABOUT
Full stack developer from Scotland crafting end-to-end solutions. Specializes in React, Next.js, TypeScript, and Node.js. Expert in building performant, scalable applications with clean code and best practices.

TECHNOLOGIES
JavaScript, TypeScript, React, Next.js, Node.js, Express, Python, SQL, PostgreSQL, MongoDB, Tailwind CSS, HTML5, CSS3, Web Performance, API Design, Database Design, Responsive Design, Git, GitHub, Docker, REST APIs

FEATURED PROJECTS
Available at /api/content with full details.

SOCIAL & CONTACT
GitHub: https://github.com/Jack5237
LinkedIn: https://www.linkedin.com/in/jack-dev-a732b4397
Twitter: https://x.com/Jack1168556
Discord: https://discord.com/users/ttv_jack_
Email: contact@jacksdevfolio.com

API DOCUMENTATION
OpenAPI Spec: https://www.jacksdevfolio.com/openapi.json
Content Endpoint: https://www.jacksdevfolio.com/api/content
Health Check: https://www.jacksdevfolio.com/api/health
Blog Posts: https://www.jacksdevfolio.com/api/blog

CONTACT
For inquiries or project opportunities, email contact@jacksdevfolio.com or visit the website.`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Vary': 'Accept-Encoding',
    },
  });
}

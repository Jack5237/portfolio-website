import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { FEATURED_PROJECTS, TECHNOLOGIES_LEARNED } from '@/lib/content';

export async function GET(request: NextRequest) {
  const accept = request.headers.get('accept') || '';

  // Determine requested format
  const wantsJson = accept.includes('application/json');
  const wantsText = accept.includes('text/plain');
  const wantsMarkdown = accept.includes('text/markdown');

  // Build content object
  const content = {
    profile: {
      name: 'Jack',
      title: 'Full Stack Developer',
      location: 'Scotland',
      bio: 'Full stack developer from Scotland crafting end-to-end solutions with modern technologies.',
      email: 'contact@jacksdevfolio.com',
      website: 'https://www.jacksdevfolio.com',
    },
    summary: 'Jack is a full stack developer specializing in web development with Next.js, TypeScript, React, and Node.js. Experienced in building performant, scalable applications with modern architecture and best practices.',
    projects: FEATURED_PROJECTS.slice(0, 5).map(p => ({
      title: p.title,
      category: p.category,
      discipline: p.discipline,
      description: p.description,
      href: p.href,
    })),
    technologies: TECHNOLOGIES_LEARNED.map(t => ({
      name: t.name,
      category: t.category,
    })),
    social: {
      github: 'https://github.com/Jack5237',
      linkedin: 'https://www.linkedin.com/in/jack-dev-a732b4397',
      twitter: 'https://x.com/Jack1168556',
      discord: 'https://discord.com/users/ttv_jack_',
    },
  };

  // Markdown format (best for agents to parse)
  if (wantsMarkdown) {
    const markdown = `# ${content.profile.name} - ${content.profile.title}

Location: ${content.profile.location}
Email: ${content.profile.email}
Website: ${content.profile.website}

## About

${content.summary}

## Featured Projects

${content.projects.map(p => `### ${p.title}
${p.description || ''}

**Category:** ${p.category}
**Discipline:** ${p.discipline}

- Link: ${p.href || 'N/A'}`).join('\n\n')}

## Technologies

${content.technologies.map(t => `- ${t.name} (${t.category})`).join('\n')}

## Social Links

- GitHub: ${content.social.github}
- LinkedIn: ${content.social.linkedin}
- Twitter: ${content.social.twitter}
- Discord: ${content.social.discord}

---

For more information, visit https://www.jacksdevfolio.com
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

  // Plain text format
  if (wantsText) {
    const text = `${content.profile.name} - ${content.profile.title}
Location: ${content.profile.location}
Email: ${content.profile.email}

${content.summary}

Featured Projects:
${content.projects.map(p => `- ${p.title}: ${p.description || ''}`).join('\n')}

Technologies: ${content.technologies.map(t => t.name).join(', ')}

Contact: ${content.profile.email}
Website: ${content.profile.website}
`;

    return new NextResponse(text, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
        'Vary': 'Accept, Accept-Encoding',
      },
    });
  }

  // JSON format (default)
  return NextResponse.json(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
}

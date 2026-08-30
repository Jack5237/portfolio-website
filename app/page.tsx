import Script from "next/script";
import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TechnologiesSection } from "@/components/sections/technologies-section";
import { FEATURED_PROJECTS, TECHNOLOGIES_LEARNED } from "@/lib/content";
import { getWebLogger } from "@/lib/logger";

const logger = getWebLogger();
logger.info("Loaded home page module", { page: "Home" });

/**
 * Landing page that blends bold typography with a structured monochrome layout.
 * @returns The completed home route JSX.
 */
const HomePage = () => {
  logger.debug("Rendering home page", { page: "Home", sections: 4 });

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "name": "Jack - Full Stack Developer Portfolio",
    "description": "Portfolio of Jack, a full stack developer from Scotland crafting end-to-end solutions",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.jacksdevfolio.com",
    "about": {
      "@type": "Person",
      "name": "Jack",
      "jobTitle": "Full Stack Developer",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.jacksdevfolio.com",
      "image": "https://www.jacksdevfolio.com/images/brand/avatarImg.png",
      "sameAs": [
        "https://github.com/Jack5237",
        "https://www.linkedin.com/in/jack-dev-a732b4397",
        "https://x.com/Jack1168556"
      ],
      "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "Web Development", "Full Stack Development"]
    }
  };

  return (
    <>
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
        Jack - Full Stack Developer Portfolio
      </h1>
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
        strategy="afterInteractive"
      />
      <noscript>
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', lineHeight: '1.6', maxWidth: '900px', margin: '0 auto' }}>
          <h1>Jack - Full Stack Developer from Scotland</h1>
          <p style={{ fontSize: '1.1em', marginBottom: '1.5em', fontWeight: '500' }}>Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends. Expert in React, Next.js, TypeScript, Node.js, and modern web technologies. Passionate about clean code, performance optimization, and full-stack engineering.</p>

          <h2>Professional Summary</h2>
          <p>Jack is a full-stack web developer based in Scotland with extensive expertise in building scalable, performant web applications. With years of hands-on experience, Jack specializes in frontend development with React and Next.js, combined with robust backend systems using Node.js and Express. Strong background in TypeScript for type-safe development, database design and optimization (SQL and MongoDB), REST API development, responsive design, and web performance. Committed to code quality, best practices, and delivering exceptional user experiences.</p>

          <h2>Core Technologies & Skills</h2>
          <p>Frontend: JavaScript, TypeScript, React, Next.js, HTML5, CSS3, Tailwind CSS, Responsive Design, Web Performance Optimization</p>
          <p>Backend: Node.js, Express, API Design, REST APIs, Server-side rendering, Authentication and authorization</p>
          <p>Databases: SQL, PostgreSQL, MongoDB, Database design, Query optimization, Data modeling</p>
          <p>Development Tools: Git, GitHub, Docker, CI/CD, Version control, Web security best practices</p>
          <p>Specializations: Full-Stack Development, Web Application Architecture, Performance Optimization, Accessibility, SEO optimization, Clean Code Principles</p>

          <h2>Experience Highlights</h2>
          <p>Jack has successfully built and deployed multiple full-stack applications ranging from small-scale projects to complex systems. Work demonstrates expertise in end-to-end development including architecture design, frontend implementation, backend infrastructure, and deployment optimization. Experienced in working with modern development practices, agile methodologies, and collaborative team environments.</p>

          <h2>Featured Work</h2>
          <p>View <a href="https://www.jacksdevfolio.com#work">featured projects</a> for detailed case studies and technical implementations showcasing full-stack capabilities across various technologies and problem domains.</p>

          <h2>Primary Services</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>• Full-stack web application development and design</li>
            <li>• Frontend development with React and Next.js</li>
            <li>• Backend API development and server architecture</li>
            <li>• Database design, optimization, and migration</li>
            <li>• Web performance optimization and monitoring</li>
            <li>• Responsive design and mobile-first development</li>
            <li>• Web accessibility and SEO optimization</li>
          </ul>

          <h2>Get in Touch</h2>
          <p>Email: <a href="mailto:contact@jacksdevfolio.com">contact@jacksdevfolio.com</a></p>
          <p>Professional networks and presence:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://github.com/Jack5237">GitHub</a> - Open source contributions and project repositories</li>
            <li><a href="https://www.linkedin.com/in/jack-dev-a732b4397">LinkedIn</a> - Professional experience and recommendations</li>
            <li><a href="https://x.com/Jack1168556">Twitter / X</a> - Technology insights and industry updates</li>
            <li><a href="https://www.jacksdevfolio.com/developers">Developer Portal</a> - Technical documentation and API guides</li>
          </ul>

          <h2>Public APIs & Data Access</h2>
          <p>Jack's portfolio provides a public REST API with content negotiation support for programmatic access to portfolio information. This enables agents, applications, and services to integrate portfolio data directly.</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://www.jacksdevfolio.com/api/content">GET /api/content</a> - Retrieve portfolio profile, projects, and technologies in JSON, Markdown, or plain text format</li>
            <li><a href="https://www.jacksdevfolio.com/api/health">GET /api/health</a> - Service status check and available API endpoints</li>
            <li><a href="https://www.jacksdevfolio.com/api/blog">GET /api/blog</a> - Access published blog posts and technical articles</li>
            <li><a href="https://www.jacksdevfolio.com/text">GET /text</a> - Plain text version of portfolio for accessibility and parsing</li>
          </ul>

          <h2>Documentation & References</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://www.jacksdevfolio.com/openapi.json">OpenAPI 3.0 Specification</a> - Complete API schema and endpoint documentation</li>
            <li><a href="https://www.jacksdevfolio.com/developers">Developer Portal</a> - Quick start guides, examples, and integration instructions</li>
            <li><a href="https://www.jacksdevfolio.com/blog">Blog</a> - Technical articles, tutorials, and insights</li>
          </ul>

          <p style={{ marginTop: '2rem', fontSize: '0.9em', color: '#666' }}>This page is fully functional without JavaScript. All links and content are directly accessible.</p>
        </div>
      </noscript>
      <main className="container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16 pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8">
        <HeroSection />

        <div id="work">
          <ProjectsSection projects={FEATURED_PROJECTS} />
        </div>
        <div id="skills">
          <TechnologiesSection technologies={TECHNOLOGIES_LEARNED} />
        </div>
      </main>
      <Footer
        email="contact@jacksdevfolio.com"
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://www.linkedin.com/in/jack-dev-a732b4397",
          discord: "https://discord.com/users/ttv_jack_",
        }}
      />
    </>
  );
};

export default HomePage;

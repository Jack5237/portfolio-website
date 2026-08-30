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

          <h2>About Jack</h2>
          <p>Jack is a full-stack web developer based in Scotland with expertise in building scalable, performant web applications. Specializes in frontend development with React and Next.js, combined with robust backend systems using Node.js and Express. Experienced with TypeScript for type-safe development, database design (SQL, MongoDB), API development (REST), and responsive design. Strong focus on user experience, code quality, and modern development practices.</p>

          <h2>Core Technologies</h2>
          <p>JavaScript, TypeScript, React, Next.js, Node.js, Express, HTML5, CSS3, Tailwind CSS, Git, REST APIs, SQL, PostgreSQL, MongoDB, API Design, Web Performance, Responsive Design, Full-Stack Development</p>
          <p>Additional: Python, Docker, Web Security, Performance Optimization, Clean Code, Agile Development</p>

          <h2>Featured Projects</h2>
          <p>Jack has built multiple full-stack applications showcasing expertise across the technology stack. View <a href="https://www.jacksdevfolio.com#work">featured projects</a> to see detailed case studies, technical implementations, and live demonstrations.</p>

          <h2>Services & Expertise</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li>• Full-stack web application development</li>
            <li>• Frontend development (React, Next.js)</li>
            <li>• Backend API development (Node.js, Express)</li>
            <li>• Database design and optimization</li>
            <li>• Performance optimization and web vitals</li>
            <li>• Responsive design and accessibility</li>
          </ul>

          <h2>Connect & Contact</h2>
          <p>Email: <a href="mailto:contact@jacksdevfolio.com">contact@jacksdevfolio.com</a></p>
          <p>Professional profiles:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://github.com/Jack5237">GitHub - Source code and projects</a></li>
            <li><a href="https://www.linkedin.com/in/jack-dev-a732b4397">LinkedIn - Professional profile</a></li>
            <li><a href="https://x.com/Jack1168556">Twitter / X - Updates and insights</a></li>
          </ul>

          <h2>API & Data Access</h2>
          <p>Jack's portfolio exposes a public API for programmatic access to portfolio data:</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://www.jacksdevfolio.com/api/content">GET /api/content</a> - Portfolio data (JSON, Markdown, Plain Text)</li>
            <li><a href="https://www.jacksdevfolio.com/api/health">GET /api/health</a> - API health check</li>
            <li><a href="https://www.jacksdevfolio.com/api/blog">GET /api/blog</a> - Blog posts</li>
            <li><a href="https://www.jacksdevfolio.com/text">GET /text</a> - Plain text portfolio</li>
          </ul>

          <h2>Documentation</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://www.jacksdevfolio.com/openapi.json">OpenAPI 3.0 Specification</a></li>
            <li><a href="https://www.jacksdevfolio.com/developers">Developer Portal</a> - API documentation and examples</li>
          </ul>
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

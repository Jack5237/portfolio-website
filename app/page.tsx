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
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioSchema),
        }}
        strategy="afterInteractive"
      />
      <noscript>
        <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
          <h1>Jack - Full Stack Developer from Scotland</h1>
          <p style={{ fontSize: '1.1em', marginBottom: '1.5em' }}>Full stack developer from Scotland, UK. Crafting end-to-end solutions from robust backends to polished frontends with React, Next.js, TypeScript, Node.js, and modern web technologies. Passionate about clean code, performance, and full-stack engineering.</p>
          <h2>Featured Projects</h2>
          <p>Visit <a href="https://www.jacksdevfolio.com#work">the portfolio</a> to see featured projects and work examples.</p>
          <h2>Technologies</h2>
          <p>{TECHNOLOGIES_LEARNED.map(t => t.name).join(', ')}</p>
          <h2>Social & Contact</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://github.com/Jack5237">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/jack-dev-a732b4397">LinkedIn</a></li>
            <li><a href="https://x.com/Jack1168556">Twitter / X</a></li>
            <li>Email: <a href="mailto:contact@jacksdevfolio.com">contact@jacksdevfolio.com</a></li>
          </ul>
          <h2>Resources</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><a href="https://www.jacksdevfolio.com/api/content">API Content Endpoint</a> - Portfolio data in JSON, text, or markdown</li>
            <li><a href="https://www.jacksdevfolio.com/text">Plain Text Version</a></li>
            <li><a href="https://www.jacksdevfolio.com/openapi.json">OpenAPI Specification</a></li>
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

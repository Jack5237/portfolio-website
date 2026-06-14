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
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-sepia-one-40.vercel.app",
    "about": {
      "@type": "Person",
      "name": "Jack",
      "jobTitle": "Full Stack Developer",
      "url": process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-sepia-one-40.vercel.app",
      "image": "https://portfolio-website-sepia-one-40.vercel.app/avatarImg.png",
      "sameAs": [
        "https://github.com/Jack5237",
        "https://www.linkedin.com/in/jack-m-a732b4397",
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
        email="contact.jack.dev@gmail.com"
        socialLinks={{
          twitter: "https://x.com/Jack1168556",
          github: "https://github.com/Jack5237",
          linkedin: "https://www.linkedin.com/in/jack-m-a732b4397",
          discord: "https://discord.com/users/ttv_jack_",
        }}
      />
    </>
  );
};

export default HomePage;

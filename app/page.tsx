import Link from "next/link";

import { Footer } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TechnologiesSection } from "@/components/sections/technologies-section";
import {
  FEATURED_PROJECTS,
  TECHNOLOGIES_LEARNED,
} from "@/lib/content";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Loaded home page module", { page: "Home" });

/**
 * Landing page that blends bold typography with a structured monochrome layout.
 * @returns The completed home route JSX.
 */
const HomePage = () => {
  logger.debug("Rendering home page", { page: "Home", sections: 4 });

  return (
    <>
      <main className="container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16 pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8">
        <HeroSection />

        <ProjectsSection projects={FEATURED_PROJECTS} />
        <TechnologiesSection technologies={TECHNOLOGIES_LEARNED} />
      </main>
      <Footer
        email="developerjack0101@gmail.com"
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

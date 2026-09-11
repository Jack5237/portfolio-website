import { Footer } from "@/components/sections/footer";
import { ConnectSection } from "@/components/sections/connect-section";
import { getWebLogger } from "@/lib/logger";
import { SITE_CONFIG } from "@/lib/config";

const logger = getWebLogger();
logger.info("Loaded connect page module", { page: "Connect" });

export default function ConnectPage() {
  logger.debug("Rendering connect page", { page: "Connect" });

  return (
    <>
      <main className="container relative mx-auto z-10 flex flex-col gap-6 sm:gap-8 pb-16 sm:pb-20 md:pb-24 pt-6 sm:pt-8 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
          <ConnectSection />
        </div>
      </main>

      <Footer
        email={SITE_CONFIG.email}
        socialLinks={SITE_CONFIG.social}
      />
    </>
  );
}

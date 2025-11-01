import { Footer } from "@/components/sections/footer";
import { BackToHome } from "@/components/navigation/back-to-home";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Loaded terms page module", { page: "Terms" });

/**
 * Terms of Service page matching the landing page style.
 * @returns The terms page markup.
 */
const TermsPage = () => {
  logger.debug("Rendering terms page", { page: "Terms" });

  return (
    <>
      <main
        className={cn(
          "container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16",
          "pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8"
        )}
      >
        <article className="max-w-3xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          {/* Back Navigation */}
          <BackToHome className="mb-4 sm:mb-6" />

          {/* Header */}
          <header className="space-y-4 sm:space-y-5">
            <h1
              className={cn(
                "text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,6vw,4rem)]",
                "font-display font-bold uppercase leading-tight tracking-[0.05em] sm:tracking-[0.06em]"
              )}
            >
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed text-foreground">
            <section className="space-y-4">
              <h2
                className={cn(
                  "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
                )}
              >
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                className={cn(
                  "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
                )}
              >
                2. Use License
              </h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily download one copy of the
                materials on this website for personal, non-commercial
                transitory viewing only. This is the grant of a license, not a
                transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to reverse engineer any software contained on the
                  website
                </li>
                <li>
                  Remove any copyright or other proprietary notations from the
                  materials
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2
                className={cn(
                  "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
                )}
              >
                3. Disclaimer
              </h2>
              <p className="text-muted-foreground">
                The materials on this website are provided on an &apos;as
                is&apos; basis. We make no warranties, expressed or implied, and
                hereby disclaim and negate all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                className={cn(
                  "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
                )}
              >
                4. Limitations
              </h2>
              <p className="text-muted-foreground">
                In no event shall we or our suppliers be liable for any damages
                (including, without limitation, damages for loss of data or
                profit, or due to business interruption) arising out of the use
                or inability to use the materials on this website, even if we or
                an authorized representative have been notified orally or in
                writing of the possibility of such damage.
              </p>
            </section>

            <section className="space-y-4">
              <h2
                className={cn(
                  "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
                )}
              >
                5. Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please
                contact us at{" "}
                <a
                  href="mailto:developerjack0101@gmail.com"
                  className="text-foreground underline hover:text-accent transition-colors"
                >
                  developerjack0101@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </article>
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

export default TermsPage;

import { Footer } from "@/components/sections/footer";
import { BackToHome } from "@/components/navigation/back-to-home";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Loaded privacy page module", { page: "Privacy" });

/**
 * Privacy Policy page matching the landing page style.
 * @returns The privacy page markup.
 */
const PrivacyPage = () => {
  logger.debug("Rendering privacy page", { page: "Privacy" });

  return (
    <>
      <main className={cn(
        "container relative mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16",
        "pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8"
      )}>
        <article className="max-w-3xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
          {/* Back Navigation */}
          <BackToHome className="mb-4 sm:mb-6" />

          {/* Header */}
          <header className="space-y-4 sm:space-y-5">
            <h1 className={cn(
              "text-[clamp(2rem,5vw,3.5rem)] sm:text-[clamp(2.5rem,6vw,4rem)]",
              "font-display font-bold uppercase leading-tight tracking-[0.05em] sm:tracking-[0.06em]"
            )}>
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.3rem] sm:tracking-[0.4rem] text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString("en-US", { 
                year: "numeric", 
                month: "long", 
                day: "numeric" 
              })}
            </p>
          </header>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed text-foreground">
            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground">
                We may collect information that you provide directly to us, such as when you:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Contact us through email or contact forms</li>
                <li>Subscribe to our newsletter or updates</li>
                <li>Interact with our website features</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you updates and newsletters (if you have subscribed)</li>
                <li>Improve our website and services</li>
                <li>Analyze website usage and trends</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may
                share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                4. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our website.
                You can control cookie preferences through your browser settings. For more details, please
                see our{" "}
                <a
                  href="/cookies"
                  className="text-foreground underline hover:text-accent transition-colors"
                >
                  Cookies Policy
                </a>
                .
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                5. Your Rights
              </h2>
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Access your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                6. Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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

export default PrivacyPage;


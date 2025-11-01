import { Footer } from "@/components/sections/footer";
import { BackToHome } from "@/components/navigation/back-to-home";
import { getWebLogger } from "@/lib/logger";
import { cn } from "@/lib/utils";

const logger = getWebLogger();
logger.info("Loaded cookies page module", { page: "Cookies" });

/**
 * Cookies Policy page matching the landing page style.
 * @returns The cookies policy page markup.
 */
const CookiesPage = () => {
  logger.debug("Rendering cookies page", { page: "Cookies" });

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
              Cookies Policy
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
                1. What Are Cookies
              </h2>
              <p className="text-muted-foreground">
                Cookies are small text files that are placed on your computer or mobile device when you
                visit a website. They are widely used to make websites work more efficiently and provide
                information to the owners of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                2. How We Use Cookies
              </h2>
              <p className="text-muted-foreground">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  <strong className="text-foreground">Essential Cookies:</strong> Required for the
                  website to function properly and cannot be switched off
                </li>
                <li>
                  <strong className="text-foreground">Analytics Cookies:</strong> Help us understand
                  how visitors interact with our website
                </li>
                <li>
                  <strong className="text-foreground">Preference Cookies:</strong> Remember your
                  preferences and settings
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                3. Third-Party Cookies
              </h2>
              <p className="text-muted-foreground">
                We may also use third-party cookies from services such as:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Social media platforms for content sharing</li>
                <li>Other service providers that help us operate the website</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                4. Managing Cookies
              </h2>
              <p className="text-muted-foreground">
                You can control and manage cookies in various ways. Most web browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>View what cookies you have and delete them on a one-by-one basis</li>
                <li>Block third-party cookies</li>
                <li>Block all cookies from a specific website</li>
                <li>Block all cookies</li>
                <li>Delete all cookies when you close your browser</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                5. Impact of Disabling Cookies
              </h2>
              <p className="text-muted-foreground">
                If you choose to disable cookies, some features of our website may not function
                properly. Essential cookies are necessary for the website to work, so disabling
                all cookies may limit your ability to use certain features.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={cn(
                "text-xl sm:text-2xl font-display font-semibold uppercase tracking-wider"
              )}>
                6. Contact Information
              </h2>
              <p className="text-muted-foreground">
                If you have any questions about our use of cookies, please contact us at{" "}
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

export default CookiesPage;


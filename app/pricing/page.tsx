import { Footer } from "@/components/sections/footer";

const plans = [
  {
    name: "Starter",
    tagline: "Launch",
    pages: "10 Pages",
    price: "£1,499",
    monthly: "£49/mo",
    description: "Get online fast. A professional site that builds trust and captures leads from day one.",
    features: [
      "Professional website design",
      "Mobile-optimized & fast",
      "Lead capture forms",
      "5 local business citations",
      "Local search setup",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Essential",
    tagline: "Growth",
    pages: "15 Pages",
    price: "£2,999",
    monthly: "£49/mo",
    description: "More visibility. Additional pages plus 10 more citations to dominate local search results.",
    features: [
      "Everything in Starter",
      "10 local business citations",
      "Local SEO optimization",
      "Google Business setup",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Advanced",
    tagline: "Pro",
    pages: "20 Pages",
    price: "£5,999",
    monthly: "£69/mo",
    description: "Full control. Update your own site with CMS, plus lead tracking to know every visitor.",
    features: [
      "Everything in Essential",
      "CMS — update your own site",
      "Lead tracking & analytics",
      "Conversion funnel design",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Enterprise",
    tagline: "Unlimited",
    pages: "25+ Pages",
    price: "£9,499",
    monthly: "£99/mo",
    description: "Maximum reach. Full content strategy, custom integrations, and ongoing support.",
    features: [
      "Everything in Advanced",
      "Content strategy & blog",
      "Custom integrations",
      "Priority support",
    ],
    cta: "Get Started",
    popular: false,
  },
];

const addons = [
  {
    name: "CRM",
    price: "£199/mo",
    description: "Customer relationship management software tailored to your business.",
    cta: "Add to Plan",
  },
  {
    name: "Voice AI Agent",
    price: "£149/mo",
    description: "Never miss a lead again. Automatically answers calls, qualifies leads naturally, books appointments 24/7, and hands off details to your team.",
    cta: "Add to Plan",
  },
  {
    name: "Live Chat & Support",
    price: "£99/mo",
    description: "Turn website visitors into conversations. Real-time chat, lead capture, and support ticketing so you respond instantly and never miss a visitor.",
    cta: "Add to Plan",
  },
  {
    name: "SEO Growth Engine",
    price: "£199–£499/mo",
    description: "Rank higher, get found first. Ongoing SEO optimization, content creation, and strategic link building that brings you more qualified customers every month.",
    cta: "Add to Plan",
  },
];

export default function PricingPage() {
  return (
    <>
      <main className="container mx-auto z-10 flex min-h-screen flex-col gap-12 sm:gap-14 md:gap-16 pb-16 sm:pb-20 md:pb-24 pt-12 sm:pt-14 md:pt-16 px-4 sm:px-6 md:px-8">
        <section className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Pricing Plans
          </h1>
          <p className="text-lg text-muted-foreground">
            One-time website investment with optional monthly support. Add a retainer for ongoing optimization, content updates, and technical maintenance.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-2xl p-6 flex flex-col ${
                plan.popular
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-medium text-primary mb-2">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                +{plan.monthly} hosting & support
              </p>
              <p className="text-sm mb-6">{plan.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-sm flex items-start gap-2">
                    <span className="text-primary">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-input bg-background hover:bg-accent"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </section>

        <section className="text-center max-w-3xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            Accelerate Growth with Monthly Services
          </h2>
          <p className="text-muted-foreground mb-10">
            Add-ons & Growth Retainer Options
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addons.map((addon) => (
            <div
              key={addon.name}
              className="border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{addon.name}</h3>
                <p className="text-sm text-muted-foreground">{addon.description}</p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-2xl font-bold">{addon.price}</div>
                <button className="mt-2 text-sm font-medium text-primary hover:underline">
                  {addon.cta} →
                </button>
              </div>
            </div>
          ))}
        </section>
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
}

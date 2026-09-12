import type { Metadata } from "next";
import { Footer } from "@/components/sections/footer";
import { ConnectSection } from "@/components/sections/connect-section";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Connect with Jack. Find all my social links, website, and QR code to share.",
  alternates: { canonical: "/connect" },
  openGraph: {
    title: "Connect",
    description: "All ways to connect with Jack — socials, website, and more.",
    url: "/connect",
    type: "website",
    images: [
      {
        url: "/images/brand/avatarImg.png",
        width: 512,
        height: 512,
        alt: "Jack - Connect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connect",
    description: "All ways to connect with Jack.",
    images: ["/images/brand/avatarImg.png"],
  },
};

export default function ConnectPage() {

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

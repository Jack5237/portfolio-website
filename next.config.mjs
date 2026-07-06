import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import('next').NextConfig}
 * @description Configures the portfolio application with optimized performance, image handling, and SEO.
 */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization settings for better performance and LCP
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    // Image optimization
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Enable SWR (stale-while-revalidate) for better performance
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },

  // Compression
  compress: true,

  // Enable static optimization
  staticPageGenerationTimeout: 120,

  // Experimental features for better performance
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["lucide-react"],
  },

  // Headers for better caching, performance, and security
  async headers() {
    return [
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/avatarImg.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://assets.calendly.com https://*.vercel.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://vercel.com https://api.vercel.com https://pagead2.googlesyndication.com https://www.gstatic.com; frame-src https://calendly.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self';",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/#work",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },

};

export default nextConfig;

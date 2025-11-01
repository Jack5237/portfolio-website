import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {import('next').NextConfig}
 * @description Configures the monochrome portfolio runtime, enforcing strict mode and wiring aliases so that shared packages resolve consistently.
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  transpilePackages: ["@monochrome-portfolio/logger"],
  webpack: (config, { isServer }) => {
    // Align the "@" alias with the app directory root so Next.js can resolve path shortcuts emitted from TypeScript.
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname)
    };

    // Exclude Winston and Node.js-only modules from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        path: false,
        stream: false,
        util: false,
      };

      // Stub out Winston in client bundle by aliasing the logger package to client-safe version
      config.resolve.alias["@monochrome-portfolio/logger"] = path.resolve(__dirname, "lib/logger-client-export.ts");
    }

    return config;
  }
};

export default nextConfig;


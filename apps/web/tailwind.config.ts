import type { Config } from "tailwindcss";

/**
 * @description Tailwind configuration tuned for a monochrome aesthetic inspired by seyi.dev.
 */
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "../../packages/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      colors: {
        background: "hsl(0 0% 3%)",
        foreground: "hsl(0 0% 98%)",
        muted: {
          DEFAULT: "hsl(0 0% 12%)",
          foreground: "hsl(0 0% 65%)"
        },
        accent: {
          DEFAULT: "hsl(0 0% 92%)",
          foreground: "hsl(0 0% 8%)"
        },
        ring: "hsl(0 0% 65%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "'Inter Variable'", "Inter", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"]
      },
      letterSpacing: {
        mega: "0.6rem"
      }
    }
  },
  plugins: []
};

export default config;


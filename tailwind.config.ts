import type { Config } from "tailwindcss";

/**
 * @description Tailwind configuration tuned for a monochrome aesthetic inspired by seyi.dev.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        // Primary sans-serif font
        sans: ["var(--font-inter)", "sans-serif"],
        // Display headings and small-caps
        display: ["var(--font-outfit)", "var(--font-space-grotesk)", "sans-serif"],
        // Body text - clean and readable
        body: ["var(--font-plus-jakarta)", "var(--font-inter)", "sans-serif"],
        // Additional font utilities
        outfit: ["var(--font-outfit)", "sans-serif"],
        smooth: ["var(--font-plus-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        mega: "0.6rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;

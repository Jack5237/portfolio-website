"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Props for the ThemeProvider component, matching next-themes API.
 */
interface ThemeProviderProps {
  /**
   * Child components to wrap with theme context.
   */
  readonly children: ReactNode;
  /**
   * HTML attribute to use for theme switching (e.g., "class", "data-theme").
   */
  readonly attribute?: string;
  /**
   * Default theme to apply on initial load.
   */
  readonly defaultTheme?: string;
  /**
   * Whether to use system theme preference.
   */
  readonly enableSystem?: boolean;
}

/**
 * Provides theme context to the client-side tree with light/dark mode support.
 * @param props - Theme provider configuration props.
 * @returns A themed React node tree.
 */
export const ThemeProvider = ({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true
}: ThemeProviderProps) => (
  <NextThemesProvider
    attribute={attribute}
    defaultTheme={defaultTheme}
    enableSystem={enableSystem}
  >
    {children}
  </NextThemesProvider>
);


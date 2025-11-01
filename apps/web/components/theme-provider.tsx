"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

/**
 * Provides theme context to the client-side tree, defaulting to a monochrome palette.
 * @param props - Standard theme provider props forwarded to next-themes.
 * @returns A themed React node tree.
 */
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);


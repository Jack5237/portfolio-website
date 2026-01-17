"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  /**
   * Child components to wrap.
   */
  readonly children: ReactNode;
}

/**
 * Simple theme provider that ensures dark mode is always active.
 * @param props - Provider configuration props.
 * @returns The wrapped React node tree.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    // Ensure dark class is applied to html element
    document.documentElement.classList.add("dark");
  }, []);

  return <>{children}</>;
};


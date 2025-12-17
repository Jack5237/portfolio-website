import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind utility class names intelligently so that later classes override earlier ones.
 * @param inputs - A variadic list of class name values that may contain conditionals.
 * @returns A deduped class name string ready for use in JSX elements.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

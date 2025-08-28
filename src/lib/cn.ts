import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Similar to shadcn/ui's cn utility
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fallback cn function if clsx and tailwind-merge are not available
 * This ensures the component works even without these dependencies
 */
export function cnFallback(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Use the proper cn if available, otherwise fallback
let cnImplementation: typeof cn;

try {
  // Try to use the full implementation
  cnImplementation = cn;
} catch {
  // Fallback to simple implementation
  cnImplementation = cnFallback as typeof cn;
}

export { cnImplementation as cn };
export default cnImplementation;
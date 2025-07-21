import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // export const rootDomain =
  // process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  // export const protocol =
  // process.env.NODE_ENV === 'production' ? 'https' : 'http';

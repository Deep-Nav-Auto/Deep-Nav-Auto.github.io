import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function normalizeAssetPath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleaned = path.replace(/^\//, "");
  if (cleaned.startsWith("assets/")) return `/${cleaned}`;
  return `/assets/${cleaned}`;
}

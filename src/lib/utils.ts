import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function normalizeLinkedInUrl(
  url: string | undefined,
): string | undefined {
  if (!url?.trim()) return undefined;

  let normalized = url.trim();

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = normalized.startsWith("www.")
      ? `https://${normalized}`
      : normalized.includes("linkedin.com")
        ? `https://${normalized.replace(/^\/+/, "")}`
        : `https://www.linkedin.com/in/${normalized.replace(/^\/+/, "")}`;
  }

  return normalized.replace(/^http:\/\//i, "https://");
}

export function normalizeAssetPath(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleaned = path.replace(/^\//, "");
  if (cleaned.startsWith("assets/")) return `/${cleaned}`;
  return `/assets/${cleaned}`;
}

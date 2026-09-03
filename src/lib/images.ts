import { normalizeAssetPath } from "@/lib/utils";

export function picsumPlaceholder(slug: string, width = 800, height = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/${width}/${height}`;
}

/** Client-safe resolver (no filesystem). */
export function resolveImageSrcClient(
  src: string | undefined,
  slug: string,
): string {
  if (!src?.trim()) {
    return picsumPlaceholder(slug);
  }

  const normalized = normalizeAssetPath(src.trim());
  if (!normalized) {
    return picsumPlaceholder(slug);
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  return normalized;
}

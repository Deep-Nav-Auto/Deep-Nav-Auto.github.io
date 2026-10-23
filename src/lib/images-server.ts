import fs from "node:fs";
import path from "node:path";
import { picsumPlaceholder } from "@/lib/images";
import { normalizeAssetPath } from "@/lib/utils";

/** True if the file exists under public/ or the repo assets/ tree (pre-sync). */
export function assetFileExists(webPath: string): boolean {
  const rel = webPath.replace(/^\//, "");
  const publicPath = path.join(process.cwd(), "public", rel);
  if (fs.existsSync(publicPath)) return true;

  if (rel.startsWith("assets/")) {
    const sourcePath = path.join(process.cwd(), rel);
    if (fs.existsSync(sourcePath)) return true;
  }

  return false;
}

/** Resolve an image path at build time; use picsum when the file is missing. */
export function resolveImageSrc(
  src: string | undefined,
  slug: string,
  options?: { placeholder?: "picsum" | "none" },
): string | undefined {
  const placeholder = options?.placeholder ?? "picsum";

  if (!src?.trim()) {
    return placeholder === "picsum" ? picsumPlaceholder(slug) : undefined;
  }

  const normalized = normalizeAssetPath(src.trim());
  if (!normalized) {
    return placeholder === "picsum" ? picsumPlaceholder(slug) : undefined;
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized;
  }

  if (assetFileExists(normalized)) {
    return normalized;
  }

  return placeholder === "picsum" ? picsumPlaceholder(slug) : undefined;
}

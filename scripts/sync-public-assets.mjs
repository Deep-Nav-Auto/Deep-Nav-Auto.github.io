import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const publicAssets = join(root, "public", "assets");
const sourceAssets = join(root, "assets");

if (!existsSync(sourceAssets)) {
  console.warn("sync-public-assets: assets/ not found, skipping");
  process.exit(0);
}

mkdirSync(publicAssets, { recursive: true });

for (const dir of ["img", "pdf", "html", "gallery"]) {
  const src = join(sourceAssets, dir);
  if (!existsSync(src)) continue;
  const destParent = dir === "gallery" ? join(root, "public") : publicAssets;
  const dest = dir === "gallery" ? join(destParent, "gallery") : join(publicAssets, dir);
  cpSync(src, dest, { recursive: true, force: true });
}

console.log("sync-public-assets: copied assets → public/assets (+ gallery if present)");

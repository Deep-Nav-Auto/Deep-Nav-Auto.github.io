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

for (const dir of ["img", "pdf", "html"]) {
  const src = join(sourceAssets, dir);
  if (!existsSync(src)) continue;
  cpSync(src, join(publicAssets, dir), { recursive: true, force: true });
}

console.log("sync-public-assets: copied assets → public/assets");

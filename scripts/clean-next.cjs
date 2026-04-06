/**
 * Removes Next.js and tooling caches. Use when dev shows ENOENT vendor-chunks,
 * mini-css-extract-plugin errors, or corrupted webpack packs.
 * Stop `pnpm dev` before running.
 */
const fs = require("fs");
const path = require("path");

const dirs = [".next", path.join("node_modules", ".cache")];

for (const d of dirs) {
  try {
    fs.rmSync(d, { recursive: true, force: true });
    console.log(`Removed ${d}`);
  } catch (e) {
    if (e.code !== "ENOENT") console.warn(`Skip ${d}:`, e.message);
  }
}

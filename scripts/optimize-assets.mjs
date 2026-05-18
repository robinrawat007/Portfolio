/**
 * Asset Optimization Script
 * Compresses large images in /public using sharp (bundled with Next.js).
 *
 * Usage:  node scripts/optimize-assets.mjs
 *
 * What it does:
 * 1. Compresses profile.png  (14.6 MB → ~200 KB WebP + fallback JPEG)
 * 2. Compresses joey.png     (1.2 MB  → ~80 KB WebP)
 * 3. Compresses logo.png     (750 KB  → ~40 KB WebP)
 * 4. Compresses shivastae.png(860 KB  → ~100 KB WebP)
 * 5. Compresses Atlas.png    (200 KB  → ~30 KB WebP)
 * 6. Compresses NL-Logo.png  (190 KB  → ~25 KB WebP)
 *
 * Originals are backed up to /public/_originals/
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, copyFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, '..', 'public');
const BACKUP = join(PUBLIC, '_originals');

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function sizeKB(filepath) {
  return (statSync(filepath).size / 1024).toFixed(1);
}

const optimizations = [
  {
    input: 'profile.png',
    outputs: [
      // Primary: optimized PNG (to keep same extension since <Image src="/profile.png">)
      { file: 'profile.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 800, height: 800, fit: 'cover' } },
    ],
  },
  {
    input: 'joey.png',
    outputs: [
      { file: 'joey.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 400, height: 400, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } } },
    ],
  },
  {
    input: 'logo.png',
    outputs: [
      { file: 'logo.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 200, height: 200, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } } },
    ],
  },
  {
    input: 'shivastae.png',
    outputs: [
      { file: 'shivastae.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 600, fit: 'inside' } },
    ],
  },
  {
    input: 'Atlas.png',
    outputs: [
      { file: 'Atlas.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 400, fit: 'inside' } },
    ],
  },
  {
    input: 'NL-Logo.png',
    outputs: [
      { file: 'NL-Logo.png', format: 'png', opts: { quality: 80, compressionLevel: 9 }, resize: { width: 300, fit: 'inside' } },
    ],
  },
];

async function run() {
  ensureDir(BACKUP);
  console.log('🖼️  Asset Optimization Starting...\n');

  for (const { input, outputs } of optimizations) {
    const inputPath = join(PUBLIC, input);
    if (!existsSync(inputPath)) {
      console.log(`⏭️  Skipping ${input} — not found`);
      continue;
    }

    // Backup original
    const backupPath = join(BACKUP, input);
    if (!existsSync(backupPath)) {
      copyFileSync(inputPath, backupPath);
      console.log(`📦 Backed up ${input} (${sizeKB(inputPath)} KB)`);
    }

    for (const out of outputs) {
      const outputPath = join(PUBLIC, out.file);
      let pipeline = sharp(inputPath);

      if (out.resize) {
        pipeline = pipeline.resize(out.resize);
      }

      switch (out.format) {
        case 'webp':
          pipeline = pipeline.webp(out.opts);
          break;
        case 'jpeg':
        case 'jpg':
          pipeline = pipeline.jpeg(out.opts);
          break;
        case 'png':
          pipeline = pipeline.png(out.opts);
          break;
        case 'avif':
          pipeline = pipeline.avif(out.opts);
          break;
      }

      await pipeline.toFile(outputPath + '.tmp');
      // Atomic rename
      const { renameSync } = await import('fs');
      renameSync(outputPath + '.tmp', outputPath);

      console.log(`✅ ${input} → ${out.file} (${sizeKB(outputPath)} KB)`);
    }
  }

  console.log('\n🎉 All assets optimized! Originals backed up in public/_originals/');
}

run().catch((err) => {
  console.error('❌ Optimization failed:', err);
  process.exit(1);
});

/**
 * Image optimization script: converts PNG/JPG to WebP using sharp
 * Run: node scripts/convert-images.mjs
 */
import sharp from 'sharp';
import { existsSync } from 'fs';
import { resolve } from 'path';

const PUBLIC_DIR = resolve(process.cwd(), 'public');

const images = [
  // Service images (2-2.5 MB each → ~150-300 KB WebP)
  { src: 'service-1.png', quality: 82 },
  { src: 'service-2.png', quality: 82 },
  { src: 'service-3.png', quality: 82 },
  { src: 'service-4.png', quality: 82 },
  { src: 'service-5.png', quality: 82 },
  { src: 'service-6.png', quality: 82 },
  { src: 'service-7.png', quality: 82 },
  { src: 'service-8.png', quality: 82 },
  // About logo (2 MB → ~150 KB)
  { src: 'about-logo.png', quality: 85 },
  // CRM mockup (1.1 MB → ~100 KB)
  { src: 'CRM-1.png', quality: 85 },
  // Partner logos (PNG)
  { src: 'samauto.png', quality: 80 },
  { src: 'agromir.png', quality: 80 },
  { src: 'sag-gilamlar.png', quality: 80 },
  // Partner logos (JPG)
  { src: 'uzkimyoimpeks.jpg', quality: 80 },
  { src: 'orientMotors.jpg', quality: 80 },
  { src: 'uzairways.jpg', quality: 80 },
];

let totalSaved = 0;

for (const { src, quality } of images) {
  const inputPath = resolve(PUBLIC_DIR, src);
  const outputPath = resolve(PUBLIC_DIR, src.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

  if (!existsSync(inputPath)) {
    console.log(`⚠️  Skipped (not found): ${src}`);
    continue;
  }

  try {
    const inputStats = (await import('fs')).statSync(inputPath);
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    const outputStats = (await import('fs')).statSync(outputPath);
    const savedKB = Math.round((inputStats.size - outputStats.size) / 1024);
    const inputKB = Math.round(inputStats.size / 1024);
    const outputKB = Math.round(outputStats.size / 1024);
    const ratio = Math.round((1 - outputStats.size / inputStats.size) * 100);
    totalSaved += savedKB;
    console.log(`✅ ${src} → ${src.replace(/\.(png|jpg|jpeg)$/i, '.webp')} | ${inputKB} KB → ${outputKB} KB (-${ratio}%)`);
  } catch (err) {
    console.error(`❌ Error converting ${src}:`, err.message);
  }
}

console.log(`\n🎉 Total saved: ~${Math.round(totalSaved / 1024)} MB`);

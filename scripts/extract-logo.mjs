/**
 * Extracts base64 image from SVG logo and converts to WebP
 * Run: node scripts/extract-logo.mjs
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const svgPath = resolve(process.cwd(), 'public/header-logo.svg');
const svgContent = readFileSync(svgPath, 'utf-8');

// Extract base64 image data from SVG
const base64Match = svgContent.match(/data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)/);

if (!base64Match) {
  console.log('No base64 image found in SVG. SVG appears to be pure vector.');
  process.exit(0);
}

const imageType = base64Match[1];
const base64Data = base64Match[2];
const buffer = Buffer.from(base64Data, 'base64');

console.log(`Found embedded ${imageType} image, size: ${Math.round(buffer.length / 1024)} KB`);

// Convert to WebP
const webpPath = resolve(process.cwd(), 'public/header-logo.webp');
await sharp(buffer)
  .webp({ quality: 90 })
  .toFile(webpPath);

const webpSize = Math.round((await import('fs')).statSync(webpPath).size / 1024);
console.log(`✅ Saved as header-logo.webp: ${webpSize} KB`);
console.log(`   (from ${Math.round(buffer.length / 1024)} KB embedded → ${webpSize} KB file)`);
console.log('');
console.log('📝 Update TopNavBar.jsx:');
console.log('   <img src="/header-logo.webp" ... />');

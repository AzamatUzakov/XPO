import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const files = [
  'public/service-1.webp',
  'public/service-2.webp',
  'public/service-3.webp',
  'public/service-4.webp',
  'public/service-5.webp',
  'public/service-6.webp',
  'public/service-7.webp',
  'public/service-8.webp',
  'public/header-logo.webp',
];

for (const file of files) {
  const input = path.resolve(file);
  const meta = await sharp(input).metadata();
  const isLogo = file.includes('header-logo');
  const maxSide = isLogo ? 200 : 750;
  const width = meta.width && meta.height
    ? (meta.width >= meta.height ? Math.min(meta.width, maxSide) : Math.round(maxSide * meta.width / meta.height))
    : maxSide;
  const height = meta.width && meta.height
    ? (meta.height >= meta.width ? Math.min(meta.height, maxSide) : Math.round(maxSide * meta.height / meta.width))
    : maxSide;
  const temp = `${input}.tmp`;
  await sharp(input).resize({ width, height, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(temp);
  await fs.rm(input, { force: true });
  await fs.rename(temp, input);
  console.log(`optimized ${file} -> ${width}x${height}`);
}

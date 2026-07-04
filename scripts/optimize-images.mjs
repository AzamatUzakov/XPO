import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve('public');

const variants = [
  {
    input: path.join(publicDir, 'service-1.png'),
    outputs: [path.join(publicDir, 'service-1-768.webp'), path.join(publicDir, 'service-1-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-2.png'),
    outputs: [path.join(publicDir, 'service-2-768.webp'), path.join(publicDir, 'service-2-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-3.png'),
    outputs: [path.join(publicDir, 'service-3-768.webp'), path.join(publicDir, 'service-3-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-4.png'),
    outputs: [path.join(publicDir, 'service-4-768.webp'), path.join(publicDir, 'service-4-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-5.png'),
    outputs: [path.join(publicDir, 'service-5-768.webp'), path.join(publicDir, 'service-5-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-6.png'),
    outputs: [path.join(publicDir, 'service-6-768.webp'), path.join(publicDir, 'service-6-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-7.png'),
    outputs: [path.join(publicDir, 'service-7-768.webp'), path.join(publicDir, 'service-7-1536.webp')],
  },
  {
    input: path.join(publicDir, 'service-8.png'),
    outputs: [path.join(publicDir, 'service-8-768.webp'), path.join(publicDir, 'service-8-1536.webp')],
  },
  {
    input: path.join(publicDir, 'header-logo.webp'),
    outputs: [path.join(publicDir, 'header-logo-140.webp'), path.join(publicDir, 'header-logo-280.webp')],
  },
  {
    input: path.join(publicDir, 'video', 'hero_poster.jpg'),
    outputs: [path.join(publicDir, 'video', 'hero_poster-800.webp'), path.join(publicDir, 'video', 'hero_poster-1400.webp')],
  },
];

for (const item of variants) {
  const exists = await fs.access(item.input).then(() => true).catch(() => false);
  if (!exists) {
    console.warn(`Skipping missing input: ${path.relative(process.cwd(), item.input)}`);
    continue;
  }

  const meta = await sharp(item.input).metadata();
  const widths = item.outputs.map((_, index) => (index === 0 ? 768 : 1536));

  for (const [index, output] of item.outputs.entries()) {
    const width = widths[index];
    const shouldResize = !meta.width || meta.width > width;
    const pipeline = shouldResize ? sharp(item.input).resize({ width, withoutEnlargement: true }) : sharp(item.input);
    await pipeline.webp({ quality: 72, effort: 6 }).toFile(output);
    console.log(`Created ${path.relative(process.cwd(), output)} (${width}w)`);
  }
}

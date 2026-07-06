/**
 * Extracts a poster frame from the hero video using sharp + ffmpeg alternative.
 * Since ffmpeg may not be available, we create a dark placeholder poster.
 * Run: node scripts/create-poster.mjs
 */
import sharp from 'sharp';
import { resolve } from 'path';

const PUBLIC_DIR = resolve(process.cwd(), 'public/video');

// Create a dark navy poster (matches the hero bg-slate-900 color)
// This shows while the video is not yet loaded
await sharp({
  create: {
    width: 1920,
    height: 1080,
    channels: 3,
    background: { r: 15, g: 23, b: 42 } // slate-900 #0F172A
  }
})
  .jpeg({ quality: 60 })
  .toFile(resolve(PUBLIC_DIR, 'hero_poster.jpg'));

console.log('✅ hero_poster.jpg created (1920x1080 dark slate placeholder)');
console.log('💡 Tip: For a real video frame, use: ffmpeg -i public/video/hero_video.mp4 -vframes 1 -q:v 2 public/video/hero_poster.jpg');

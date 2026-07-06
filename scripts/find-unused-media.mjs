import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

const textExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.astro', '.mjs', '.cjs', '.css', '.json', '.md', '.html', '.txt']);
const mediaExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.svg', '.mp4', '.mov', '.webm', '.ico', '.woff', '.woff2', '.ttf', '.otf', '.eot']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function isTextFile(file) {
  return textExtensions.has(path.extname(file).toLowerCase());
}

function readProjectText() {
  const files = walk(root).filter((file) => isTextFile(file));
  return files.map((file) => ({ file, content: fs.readFileSync(file, 'utf8') }));
}

function normalizeForSearch(value) {
  return value.replace(/\\/g, '/').replace(/^\//, '').toLowerCase();
}

function isReferenced(filePath, texts) {
  const relativePath = normalizeForSearch(path.relative(root, filePath));
  const publicRelative = normalizeForSearch(path.relative(publicDir, filePath));
  const basename = normalizeForSearch(path.basename(filePath));
  const nameWithoutExt = normalizeForSearch(path.basename(filePath, path.extname(filePath)));

  for (const { content } of texts) {
    const lower = content.toLowerCase();
    if (lower.includes(relativePath) || lower.includes(publicRelative) || lower.includes(basename) || lower.includes(nameWithoutExt)) {
      return true;
    }
  }

  return false;
}

const mediaFiles = walk(publicDir)
  .filter((file) => mediaExtensions.has(path.extname(file).toLowerCase()))
  .sort();

const texts = readProjectText();
const unused = mediaFiles.filter((file) => !isReferenced(file, texts));

console.log('Unused media files:');
for (const file of unused) {
  console.log(path.relative(root, file));
}

console.log(`\nTotal media files: ${mediaFiles.length}`);
console.log(`Unused media files: ${unused.length}`);

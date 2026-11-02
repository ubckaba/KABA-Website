import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'src/assets';
const MAX_WIDTH = { headshots: 800, default: 1600 };
const MAX_BYTES = 400 * 1024;

function maxWidthFor(file) {
  const folder = path.relative(ROOT, file).split(path.sep)[0];
  return MAX_WIDTH[folder] ?? MAX_WIDTH.default;
}

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(p); continue; }
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;

    const input = await fs.readFile(p);
    const meta = await sharp(input).metadata();
    const maxWidth = maxWidthFor(p);

    // Already optimized: small width and small file, so leave it alone
    if ((meta.width ?? 0) <= maxWidth && input.length <= MAX_BYTES) continue;

    const img = sharp(input).rotate().resize({ width: maxWidth, withoutEnlargement: true });
    const out = /\.png$/i.test(p)
      ? await img.png({ compressionLevel: 9 }).toBuffer()
      : await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

    if (out.length < input.length) {
      await fs.writeFile(p, out);
      console.log(`${p}: ${(input.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB`);
    }
  }
}

await walk(ROOT);
console.log('Image optimization done.');
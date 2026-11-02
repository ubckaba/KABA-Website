import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const root = 'src/assets/headshots';

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { await walk(p); continue; }
    if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;

    const input = await fs.readFile(p);
    const img = sharp(input).rotate().resize({ width: 800, withoutEnlargement: true });
    const out = /\.png$/i.test(p)
      ? await img.png({ compressionLevel: 9 }).toBuffer()
      : await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    await fs.writeFile(p, out);
    console.log(`${p}: ${(input.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB`);
  }
}

await walk(root);


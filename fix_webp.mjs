import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = "C:\\Users\\Usuario\\OneDrive - unimilitar.edu.co\\Backup\\Descargas\\copiaBloopia (2)\\copiaBloopia\\Bloopia\\assets\\productos";

function findMismatched(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMismatched(full));
    } else if (entry.name.endsWith('.webp')) {
      const buf = fs.readFileSync(full);
      if (buf.length < 4 || !(buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x45)) {
        results.push(full);
      }
    }
  }
  return results;
}

async function main() {
  const mismatched = findMismatched(base);
  console.log(`Found ${mismatched.length} mislabeled PNG files`);

  for (const file of mismatched) {
    const rel = path.relative(base, file);
    const tmp = path.join(os.tmpdir(), path.basename(file, '.webp') + '_' + Date.now() + '.webp');
    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(tmp);
      fs.renameSync(tmp, file);
      console.log(`OK: ${rel}`);
    } catch (e) {
      console.log(`FAIL: ${rel} - ${e.message}`);
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    }
  }
  console.log('Done');
}

main();
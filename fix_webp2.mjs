
import sharp from 'sharp';
import fs from 'fs';

const files = [
  'assets/productos/bebes/cochesmart/smart1.webp',
  'assets/productos/bebes/cochesmart/smart2.webp',
  'assets/productos/bebes/cochesmart/smart3.webp',
  'assets/productos/bebes/cochesmart/smartazul.webp',
  'assets/productos/bebes/cochesmart/smartazul2.webp',
  'assets/productos/bebes/cochesmart/smartgris.webp',
  'assets/productos/bebes/cochesmart/smartpink.webp',
  'assets/productos/bebes/cochesmart/smartpink2.webp',
  'assets/productos/solar/reflectort02/refe.webp',
  'assets/productos/solar/reflectort02/refe2.webp',
  'assets/productos/solar/reflectort02/refe3.webp',
];

async function convert() {
  for (const f of files) {
    try {
      const buf = await sharp(f).webp({quality: 80}).toBuffer();
      await sharp(buf).toFile(f);
      console.log('OK: ' + f);
    } catch(e) {
      console.log('FAIL: ' + f + ' - ' + e.message);
    }
  }
}

convert();

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'public', 'logo-krx.png');
const outDir = path.join(__dirname, 'public');

(async () => {
  const buffer = fs.readFileSync(src);

  // Favicon 16x16
  await sharp(buffer).resize(16, 16).png().toFile(path.join(outDir, 'favicon-16x16.png'));
  console.log('favicon-16x16.png');

  // Favicon 32x32
  await sharp(buffer).resize(32, 32).png().toFile(path.join(outDir, 'favicon-32x32.png'));
  console.log('favicon-32x32.png');

  // Apple touch icon 180x180
  await sharp(buffer).resize(180, 180).png().toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png');

  // Android Chrome 192x192
  await sharp(buffer).resize(192, 192).png().toFile(path.join(outDir, 'android-chrome-192x192.png'));
  console.log('android-chrome-192x192.png');

  // Android Chrome 512x512
  await sharp(buffer).resize(512, 512).png().toFile(path.join(outDir, 'android-chrome-512x512.png'));
  console.log('android-chrome-512x512.png');

  // OG Image 1200x630
  const ogBuffer = await sharp(buffer)
    .resize(400, 400, { fit: 'contain', background: { r: 5, g: 5, b: 5 } })
    .toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: { r: 5, g: 5, b: 5 } }
  })
    .composite([{ input: ogBuffer, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, 'og-image.png'));
  console.log('og-image.png');

  // Favicon ICO (16+32+48)
  const icon16 = await sharp(buffer).resize(16, 16).toBuffer();
  const icon32 = await sharp(buffer).resize(32, 32).toBuffer();
  const icon48 = await sharp(buffer).resize(48, 48).toBuffer();

  await sharp(icon48)
    .toFile(path.join(outDir, 'favicon.ico'));
  console.log('favicon.ico (48x48)');

  console.log('Done!');
})();

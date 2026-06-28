const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "public", "logo-krx.png");
const outDir = path.join(__dirname, "public");

const ACCENT = "#22d3ee";
const BG_SURFACE = "#111111";

async function main() {
  const logoBuffer = fs.readFileSync(src);

  // ── Recolor logo to cyan using alpha mask ──
  const logoRaw = await sharp(logoBuffer).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { data, info } = logoRaw;
  const pixelCount = info.width * info.height;
  const cyanLogo = Buffer.alloc(pixelCount * 4);

  for (let i = 0; i < pixelCount; i++) {
    const alpha = data[i * 4 + 3];
    if (alpha > 20) {
      cyanLogo[i * 4] = 34;
      cyanLogo[i * 4 + 1] = 211;
      cyanLogo[i * 4 + 2] = 238;
      cyanLogo[i * 4 + 3] = alpha;
    } else {
      cyanLogo[i * 4 + 3] = 0;
    }
  }

  const cyanLogoBuffer = await sharp(cyanLogo, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  console.log("✓ Logo recolored to cyan");

  // ── Helper: create favicon canvas with dark rounded bg + cyan logo ──
  async function createFavicon(size, padding = 0.15) {
    const canvasSize = size;
    const pad = Math.round(canvasSize * padding);
    const logoSize = canvasSize - pad * 2;

    const bgSvg = `<svg width="${canvasSize}" height="${canvasSize}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${canvasSize}" height="${canvasSize}" rx="${Math.round(canvasSize * 0.22)}" fill="${BG_SURFACE}"/>
    </svg>`;

    const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();
    const logoResized = await sharp(cyanLogoBuffer)
      .resize(logoSize, logoSize, { fit: "inside", withoutEnlargement: true })
      .toBuffer();

    const logoMeta = await sharp(logoResized).metadata();
    const offsetX = Math.round((canvasSize - (logoMeta.width || logoSize)) / 2);
    const offsetY = Math.round((canvasSize - (logoMeta.height || logoSize)) / 2);

    return sharp(bgBuffer)
      .composite([{ input: logoResized, top: offsetY, left: offsetX }])
      .png()
      .toBuffer();
  }

  // ── Standard PNG favicons ──
  const pngSizes = [
    { name: "favicon-16x16.png", size: 16, padding: 0.1 },
    { name: "favicon-32x32.png", size: 32, padding: 0.12 },
    { name: "favicon-48x48.png", size: 48, padding: 0.15 },
  ];

  for (const { name, size, padding } of pngSizes) {
    const buf = await createFavicon(size, padding);
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log(`✓ ${name}`);
  }

  // ── Apple touch icons ──
  const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
  for (const size of appleSizes) {
    const buf = await createFavicon(size, 0.18);
    fs.writeFileSync(path.join(outDir, `apple-touch-icon-${size}x${size}.png`), buf);
    console.log(`✓ apple-touch-icon-${size}x${size}.png`);
  }

  // ── Android Chrome icons ──
  const androidSizes = [36, 48, 72, 96, 144, 192, 256, 384, 512];
  for (const size of androidSizes) {
    const buf = await createFavicon(size, 0.18);
    fs.writeFileSync(path.join(outDir, `android-chrome-${size}x${size}.png`), buf);
    console.log(`✓ android-chrome-${size}x${size}.png`);
  }

  // ── MS Tile icons ──
  const msSizes = [
    { name: "mstile-70x70.png", size: 70 },
    { name: "mstile-150x150.png", size: 150 },
    { name: "mstile-310x310.png", size: 310 },
  ];
  for (const { name, size } of msSizes) {
    const buf = await createFavicon(size, 0.18);
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log(`✓ ${name}`);
  }

  // Wide tile
  const wideW = 310, wideH = 150;
  const widePad = Math.round(wideH * 0.15);
  const wideLogoSize = wideH - widePad * 2;
  const wideBg = `<svg width="${wideW}" height="${wideH}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${wideW}" height="${wideH}" fill="${BG_SURFACE}"/>
  </svg>`;
  const wideBgBuf = await sharp(Buffer.from(wideBg)).png().toBuffer();
  const wideLogo = await sharp(cyanLogoBuffer)
    .resize(wideLogoSize, wideLogoSize, { fit: "inside", withoutEnlargement: true })
    .toBuffer();
  const wideMeta = await sharp(wideLogo).metadata();
  await sharp(wideBgBuf)
    .composite([{
      input: wideLogo,
      top: Math.round((wideH - (wideMeta.height || wideLogoSize)) / 2),
      left: Math.round((wideW - (wideMeta.width || wideLogoSize)) / 2),
    }])
    .png()
    .toFile(path.join(outDir, "mstile-310x150.png"));
  console.log("✓ mstile-310x150.png");

  // ── Maskable icon ──
  const maskSize = 512;
  const maskPad = Math.round(maskSize * 0.1);
  const maskLogoSize = maskSize - maskPad * 2;
  const maskBg = `<svg width="${maskSize}" height="${maskSize}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${maskSize}" height="${maskSize}" fill="${BG_SURFACE}"/>
  </svg>`;
  const maskBgBuf = await sharp(Buffer.from(maskBg)).png().toBuffer();
  const maskLogo = await sharp(cyanLogoBuffer)
    .resize(maskLogoSize, maskLogoSize, { fit: "inside", withoutEnlargement: true })
    .toBuffer();
  const maskMeta = await sharp(maskLogo).metadata();
  await sharp(maskBgBuf)
    .composite([{
      input: maskLogo,
      top: Math.round((maskSize - (maskMeta.height || maskLogoSize)) / 2),
      left: Math.round((maskSize - (maskMeta.width || maskLogoSize)) / 2),
    }])
    .png()
    .toFile(path.join(outDir, "maskable-icon.png"));
  console.log("✓ maskable-icon.png");

  // ── FAVICON.ICO using png-to-ico (multi-res) ──
  const icoBuf16 = await createFavicon(16, 0.1);
  const icoBuf32 = await createFavicon(32, 0.12);
  const icoBuf48 = await createFavicon(48, 0.15);

  const { default: pngToIco } = await import("png-to-ico");
  const icoData = await pngToIco([icoBuf16, icoBuf32, icoBuf48]);
  fs.writeFileSync(path.join(outDir, "favicon.ico"), icoData);
  console.log("✓ favicon.ico (16+32+48 multi-resolution)");

  // ── favicon.svg ──
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="fcg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${ACCENT}"/>
        <stop offset="100%" stop-color="#f59e0b"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="${BG_SURFACE}"/>
    <text x="50" y="66" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="900" fill="url(#fcg)">KRX</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "favicon.svg"), faviconSvg);
  console.log("✓ favicon.svg");

  // ── Safari pinned tab ──
  const safariPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="${BG_SURFACE}"/>
    <text x="50" y="66" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" fill="${ACCENT}">K</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "safari-pinned-tab.svg"), safariPinSvg);
  console.log("✓ safari-pinned-tab.svg");

  // ── browserconfig.xml ──
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <wide310x150logo src="/mstile-310x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <TileColor>${BG_SURFACE}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  fs.writeFileSync(path.join(outDir, "browserconfig.xml"), browserConfig);
  console.log("✓ browserconfig.xml");

  // ── apple-touch-icon.png fallback ──
  const apple180 = fs.readFileSync(path.join(outDir, "apple-touch-icon-180x180.png"));
  fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), apple180);
  console.log("✓ apple-touch-icon.png");

  console.log("\n✅ All favicons regenerated — KRX cyan on dark background!");
  console.log("🗑️  Removed: vercel.svg, next.svg (default files)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

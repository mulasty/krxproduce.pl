const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "public", "logo-krx.png");
const outDir = path.join(__dirname, "public");

const ACCENT = "#22d3ee";
const ACCENT_WARM = "#f59e0b";
const BG = "#050505";
const BG_SURFACE = "#111111";

async function main() {
  const logoBuffer = fs.readFileSync(src);

  // ──────────────────────────────────────────────
  // 0. CREATE CYAN VERSION OF LOGO
  // ──────────────────────────────────────────────
  // The logo is dark/black on transparent. We need to make it cyan.
  // Strategy: extract alpha as mask, create cyan image using that mask

  const logoRaw = await sharp(logoBuffer)
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = logoRaw;
  const pixelCount = info.width * info.height;
  const cyanLogo = Buffer.alloc(pixelCount * 4);

  for (let i = 0; i < pixelCount; i++) {
    const alpha = data[i * 4 + 3];
    if (alpha > 20) {
      // Non-transparent pixel = cyan
      cyanLogo[i * 4] = 34;     // R
      cyanLogo[i * 4 + 1] = 211; // G
      cyanLogo[i * 4 + 2] = 238; // B
      cyanLogo[i * 4 + 3] = alpha;
    } else {
      // Transparent
      cyanLogo[i * 4] = 0;
      cyanLogo[i * 4 + 1] = 0;
      cyanLogo[i * 4 + 2] = 0;
      cyanLogo[i * 4 + 3] = 0;
    }
  }

  const cyanLogoBuffer = await sharp(cyanLogo, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  console.log("✓ Logo recolored to cyan");

  // Also create a white version for OG text contrast
  const whiteLogo = Buffer.alloc(pixelCount * 4);
  for (let i = 0; i < pixelCount; i++) {
    const alpha = data[i * 4 + 3];
    if (alpha > 20) {
      whiteLogo[i * 4] = 255;
      whiteLogo[i * 4 + 1] = 255;
      whiteLogo[i * 4 + 2] = 255;
      whiteLogo[i * 4 + 3] = alpha;
    } else {
      whiteLogo[i * 4 + 3] = 0;
    }
  }

  const whiteLogoBuffer = await sharp(whiteLogo, {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png().toBuffer();

  console.log("✓ Logo recolored to white");

  // ──────────────────────────────────────────────
  // 1. PROFESSIONAL OG IMAGE (1200×630)
  // ──────────────────────────────────────────────

  const ogBg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="50%" cy="40%" r="75%">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="40%" stop-color="#0a0a12"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
        <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0"/>
          <stop offset="50%" stop-color="${ACCENT}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glowStrong" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1200" height="630" fill="url(#g1)"/>
      <!-- Decorative lines -->
      <rect y="305" width="1200" height="1.5" fill="url(#line1)" opacity="0.5"/>
      <rect y="515" width="1200" height="1" fill="url(#line1)" opacity="0.2"/>
      <!-- Corner brackets -->
      <path d="M60,50 L110,50 L110,55 L65,55 L65,95 L60,95 Z" fill="${ACCENT}" opacity="0.5"/>
      <path d="M1140,50 L1090,50 L1090,55 L1135,55 L1135,95 L1140,95 Z" fill="${ACCENT}" opacity="0.5"/>
      <path d="M60,580 L60,535 L65,535 L65,575 L110,575 L110,580 Z" fill="${ACCENT}" opacity="0.5"/>
      <path d="M1140,580 L1140,535 L1135,535 L1135,575 L1090,575 L1090,580 Z" fill="${ACCENT}" opacity="0.5"/>
      <!-- Title text -->
      <text x="600" y="405" text-anchor="middle" fill="${ACCENT}" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" filter="url(#glowStrong)">KRX Produce</text>
      <!-- Subtitle -->
      <text x="600" y="460" text-anchor="middle" fill="#d4d4d4" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="300" letter-spacing="2">Filmowanie  •  Projektowanie Graficzne  •  Montaż</text>
      <!-- URL -->
      <text x="600" y="555" text-anchor="middle" fill="#525252" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="4">KRXPRODUCE.PL</text>
    </svg>`;

  const ogBgBuffer = Buffer.from(ogBg);

  // Resize cyan logo to fit nicely
  const logoOg = await sharp(cyanLogoBuffer)
    .resize(320, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoOgMeta = await sharp(logoOg).metadata();

  await sharp(ogBgBuffer)
    .composite([
      {
        input: logoOg,
        top: Math.round(100 + (205 - (logoOgMeta.height || 155)) / 2),
        left: Math.round((1200 - (logoOgMeta.width || 320)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-image.png"));
  console.log("✓ og-image.png (1200×630)");

  // ──────────────────────────────────────────────
  // 2. OG SQUARE (1080×1080) for social
  // ──────────────────────────────────────────────

  const ogSqBg = `
    <svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g2" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#111827"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
        <filter id="glow2" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="sqLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0"/>
          <stop offset="50%" stop-color="${ACCENT}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1080" fill="url(#g2)"/>
      <rect y="65%" width="1080" height="2" fill="url(#sqLine)" opacity="0.4"/>
      <rect y="72%" width="1080" height="1" fill="url(#sqLine)" opacity="0.2"/>
      <text x="540" y="78%" text-anchor="middle" fill="${ACCENT}" font-family="Arial, Helvetica, sans-serif" font-size="90" font-weight="900" filter="url(#glow2)">KRX Produce</text>
      <text x="540" y="84%" text-anchor="middle" fill="#a3a3a3" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="300">Filmowanie &amp; Projektowanie Graficzne</text>
      <text x="540" y="94%" text-anchor="middle" fill="#525252" font-family="Arial, Helvetica, sans-serif" font-size="28">krxproduce.pl</text>
    </svg>`;

  const ogSqBgBuffer = Buffer.from(ogSqBg);

  const logoSq = await sharp(cyanLogoBuffer)
    .resize(400, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoSqMeta = await sharp(logoSq).metadata();

  await sharp(ogSqBgBuffer)
    .composite([
      {
        input: logoSq,
        top: Math.round(200 + (250 - (logoSqMeta.height || 195)) / 2),
        left: Math.round((1080 - (logoSqMeta.width || 400)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-square.png"));
  console.log("✓ og-square.png (1080×1080)");

  // ──────────────────────────────────────────────
  // 3. FAVICONS — dark bg + cyan logo
  // ──────────────────────────────────────────────

  // Create base: dark rounded square with cyan logo centered
  async function createFavicon(size, padding = 0.15) {
    const canvasSize = size;
    const pad = Math.round(canvasSize * padding);
    const logoSize = canvasSize - pad * 2;

    // Dark background
    const bgSvg = `<svg width="${canvasSize}" height="${canvasSize}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${canvasSize}" height="${canvasSize}" rx="${Math.round(canvasSize * 0.22)}" fill="${BG_SURFACE}"/>
    </svg>`;

    const bgBuffer = await sharp(Buffer.from(bgSvg)).png().toBuffer();

    // Resize logo to fit
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

  // Standard favicons
  const faviconSizes = [
    { name: "favicon-16x16.png", size: 16, padding: 0.1 },
    { name: "favicon-32x32.png", size: 32, padding: 0.12 },
    { name: "favicon-48x48.png", size: 48, padding: 0.15 },
  ];

  for (const { name, size, padding } of faviconSizes) {
    const buf = await createFavicon(size, padding);
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log(`✓ ${name} (${size}×${size})`);
  }

  // Apple touch icons
  const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
  for (const size of appleSizes) {
    const buf = await createFavicon(size, 0.18);
    fs.writeFileSync(path.join(outDir, `apple-touch-icon-${size}x${size}.png`), buf);
    console.log(`✓ apple-touch-icon-${size}x${size}.png`);
  }

  // Android Chrome icons
  const androidSizes = [36, 48, 72, 96, 144, 192, 256, 384, 512];
  for (const size of androidSizes) {
    const buf = await createFavicon(size, 0.18);
    fs.writeFileSync(path.join(outDir, `android-chrome-${size}x${size}.png`), buf);
    console.log(`✓ android-chrome-${size}x${size}.png`);
  }

  // MS Tile icons
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

  // MS Wide tile (310x150)
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

  // Maskable icon (safe zone for adaptive icons)
  const maskSize = 512;
  const maskPad = Math.round(maskSize * 0.1); // Safe zone padding
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
  console.log("✓ maskable-icon.png (512×512)");

  // ──────────────────────────────────────────────
  // 4. FAVICON.ICO (48px base — browsers scale)
  // ──────────────────────────────────────────────
  const icoBuf = await createFavicon(48, 0.15);
  await sharp(icoBuf).toFile(path.join(outDir, "favicon.ico"));
  console.log("✓ favicon.ico");

  // ──────────────────────────────────────────────
  // 5. FAVICON.SVG (modern browsers)
  // ──────────────────────────────────────────────
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="fcg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${ACCENT}"/>
        <stop offset="100%" stop-color="${ACCENT_WARM}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="${BG_SURFACE}"/>
    <text x="50" y="66" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="50" font-weight="900" fill="url(#fcg)">KRX</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "favicon.svg"), faviconSvg);
  console.log("✓ favicon.svg");

  // ──────────────────────────────────────────────
  // 6. SAFARI PINNED TAB SVG
  // ──────────────────────────────────────────────
  const safariPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="${BG_SURFACE}"/>
    <text x="50" y="66" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="900" fill="${ACCENT}">K</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "safari-pinned-tab.svg"), safariPinSvg);
  console.log("✓ safari-pinned-tab.svg");

  // ──────────────────────────────────────────────
  // 7. BROWSERCONFIG.XML
  // ──────────────────────────────────────────────
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

  // ──────────────────────────────────────────────
  // 8. UPDATE APPLE-TOUCH-ICON.PNG (legacy fallback)
  // ──────────────────────────────────────────────
  const apple180 = fs.readFileSync(path.join(outDir, "apple-touch-icon-180x180.png"));
  fs.writeFileSync(path.join(outDir, "apple-touch-icon.png"), apple180);
  console.log("✓ apple-touch-icon.png (180×180 copy)");

  console.log("\n✅ All assets regenerated with cyan KRX on dark background!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

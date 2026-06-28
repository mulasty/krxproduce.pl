const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "public", "logo-krx.png");
const outDir = path.join(__dirname, "public");

const ACCENT = "#22d3ee";
const ACCENT_WARM = "#f59e0b";
const BG = "#050505";
const SURFACE = "#111111";

async function main() {
  const logoBuffer = fs.readFileSync(src);

  // ──────────────────────────────────────────────
  // 1. PROFESSIONAL OG IMAGE (1200×630)
  // ──────────────────────────────────────────────

  // Background gradient via SVG
  const bgGradient = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g1" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#1a1a2e"/>
          <stop offset="40%" stop-color="#0a0a15"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
        <linearGradient id="accentLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0"/>
          <stop offset="50%" stop-color="${ACCENT}" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1200" height="630" fill="url(#g1)"/>
      <rect y="340" width="1200" height="1" fill="url(#accentLine)" opacity="0.4"/>
      <rect y="480" width="1200" height="1" fill="url(#accentLine)" opacity="0.2"/>
      <!-- Corner accents -->
      <path d="M80,60 L120,60 L120,64 L84,64 L84,100 L80,100 Z" fill="${ACCENT}" opacity="0.3"/>
      <path d="M1120,60 L1080,60 L1080,64 L1116,64 L1116,100 L1120,100 Z" fill="${ACCENT}" opacity="0.3"/>
      <path d="M80,570 L80,530 L84,530 L84,566 L120,566 L120,570 Z" fill="${ACCENT}" opacity="0.3"/>
      <path d="M1120,570 L1120,530 L1116,530 L1116,566 L1080,566 L1080,570 Z" fill="${ACCENT}" opacity="0.3"/>
      <!-- Title -->
      <text x="600" y="430" text-anchor="middle" fill="${ACCENT}" font-family="Arial,Helvetica,sans-serif" font-size="64" font-weight="bold" filter="url(#glow)">KRX Produce</text>
      <!-- Subtitle -->
      <text x="600" y="478" text-anchor="middle" fill="#a3a3a3" font-family="Arial,Helvetica,sans-serif" font-size="26" font-weight="300">Filmowanie  •  Projektowanie Graficzne  •  Montaż</text>
      <!-- URL -->
      <text x="600" y="570" text-anchor="middle" fill="#525252" font-family="Arial,Helvetica,sans-serif" font-size="20">krxproduce.pl</text>
    </svg>`;

  const bgSvgBuffer = Buffer.from(bgGradient);

  // Logo: scale to ~280px wide maintaining aspect ratio
  const logoResized = await sharp(logoBuffer)
    .resize(280, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoMeta = await sharp(logoResized).metadata();

  // Composite: background SVG + logo centered
  await sharp(bgSvgBuffer)
    .composite([
      {
        input: logoResized,
        top: Math.round(150 + (190 - (logoMeta.height || 135)) / 2),
        left: Math.round((1200 - (logoMeta.width || 280)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-image.png"));
  console.log("✓ og-image.png (1200×630)");

  // ──────────────────────────────────────────────
  // 2. OG IMAGE ALT (square 1:1 for some platforms)
  // ──────────────────────────────────────────────

  const bgSquareSvg = `
    <svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g2" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stop-color="#1a1a2e"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="1080" height="1080" fill="url(#g2)"/>
      <rect y="55%" width="1080" height="2" fill="${ACCENT}" opacity="0.2"/>
      <text x="540" y="72%" text-anchor="middle" fill="${ACCENT}" font-family="Arial,Helvetica,sans-serif" font-size="80" font-weight="bold" filter="url(#glow2)">KRX Produce</text>
      <text x="540" y="78%" text-anchor="middle" fill="#a3a3a3" font-family="Arial,Helvetica,sans-serif" font-size="36" font-weight="300">Filmowanie &amp; Projektowanie Graficzne</text>
      <text x="540" y="92%" text-anchor="middle" fill="#525252" font-family="Arial,Helvetica,sans-serif" font-size="28">krxproduce.pl</text>
    </svg>`;

  const bgSquareBuffer = Buffer.from(bgSquareSvg);

  const logoSquare = await sharp(logoBuffer)
    .resize(360, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoSquareMeta = await sharp(logoSquare).metadata();

  await sharp(bgSquareBuffer)
    .composite([
      {
        input: logoSquare,
        top: Math.round(250 + (240 - (logoSquareMeta.height || 175)) / 2),
        left: Math.round((1080 - (logoSquareMeta.width || 360)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-square.png"));
  console.log("✓ og-square.png (1080×1080)");

  // ──────────────────────────────────────────────
  // 3. FAVICONS — wszystkie rozmiary
  // ──────────────────────────────────────────────

  const faviconSizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
    { name: "apple-touch-icon-57x57.png", size: 57 },
    { name: "apple-touch-icon-60x60.png", size: 60 },
    { name: "apple-touch-icon-72x72.png", size: 72 },
    { name: "apple-touch-icon-76x76.png", size: 76 },
    { name: "apple-touch-icon-114x114.png", size: 114 },
    { name: "apple-touch-icon-120x120.png", size: 120 },
    { name: "apple-touch-icon-144x144.png", size: 144 },
    { name: "apple-touch-icon-152x152.png", size: 152 },
    { name: "apple-touch-icon-167x167.png", size: 167 },
    { name: "apple-touch-icon-180x180.png", size: 180 },
    { name: "android-chrome-36x36.png", size: 36 },
    { name: "android-chrome-48x48.png", size: 48 },
    { name: "android-chrome-72x72.png", size: 72 },
    { name: "android-chrome-96x96.png", size: 96 },
    { name: "android-chrome-144x144.png", size: 144 },
    { name: "android-chrome-192x192.png", size: 192 },
    { name: "android-chrome-256x256.png", size: 256 },
    { name: "android-chrome-384x384.png", size: 384 },
    { name: "android-chrome-512x512.png", size: 512 },
    { name: "mstile-70x70.png", size: 70 },
    { name: "mstile-150x150.png", size: 150 },
    { name: "mstile-310x150.png", width: 310, height: 150 },
    { name: "mstile-310x310.png", size: 310 },
  ];

  for (const { name, size, width, height } of faviconSizes) {
    const w = width || size;
    const h = height || size;
    await sharp(logoBuffer)
      .resize(w, h, { fit: "contain", background: { r: 5, g: 5, b: 5, alpha: 0 } })
      .png()
      .toFile(path.join(outDir, name));
    console.log(`✓ ${name} (${w}×${h})`);
  }

  // Maskable icon (with safe zone padding for Android)
  const maskableSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="${BG}"/>
    </svg>`;
  const maskableBg = await sharp(Buffer.from(maskableSvg)).png().toBuffer();

  const logoMaskable = await sharp(logoBuffer)
    .resize(300, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoMaskableMeta = await sharp(logoMaskable).metadata();

  await sharp(maskableBg)
    .composite([
      {
        input: logoMaskable,
        top: Math.round((512 - (logoMaskableMeta.height || 145)) / 2),
        left: Math.round((512 - (logoMaskableMeta.width || 300)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "maskable-icon.png"));
  console.log("✓ maskable-icon.png (512×512)");

  // ──────────────────────────────────────────────
  // 4. FAVICON.ICO (multi-res: 16, 32, 48)
  // ──────────────────────────────────────────────
  const ico16 = await sharp(logoBuffer)
    .resize(16, 16, { fit: "contain", background: { r: 5, g: 5, b: 5, alpha: 0 } })
    .png()
    .toBuffer();
  const ico32 = await sharp(logoBuffer)
    .resize(32, 32, { fit: "contain", background: { r: 5, g: 5, b: 5, alpha: 0 } })
    .png()
    .toBuffer();
  const ico48 = await sharp(logoBuffer)
    .resize(48, 48, { fit: "contain", background: { r: 5, g: 5, b: 5, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(ico48).toFile(path.join(outDir, "favicon.ico"));
  console.log("✓ favicon.ico (48×48, use for legacy)");

  // ──────────────────────────────────────────────
  // 5. FAVICON.SVG (modern browsers)
  // ──────────────────────────────────────────────
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${ACCENT}"/>
        <stop offset="100%" stop-color="${ACCENT_WARM}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="20" fill="${BG}"/>
    <text x="50" y="62" text-anchor="middle" fill="url(#fg)" font-family="Arial,Helvetica,sans-serif" font-size="48" font-weight="900">K</text>
    <text x="50" y="82" text-anchor="middle" fill="url(#fg)" font-family="Arial,Helvetica,sans-serif" font-size="48" font-weight="900" opacity="0" stroke="${ACCENT}" stroke-width="0.5">R</text>
  </svg>`;
  // Better approach: use the actual logo shape
  const faviconSvgClean = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="fcg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${ACCENT}"/>
        <stop offset="100%" stop-color="${ACCENT_WARM}"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="22" fill="#000000"/>
    <text x="22" y="68" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="900" fill="url(#fcg)">K</text>
    <text x="52" y="68" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="900" fill="url(#fcg)">R</text>
    <text x="76" y="68" font-family="Arial,Helvetica,sans-serif" font-size="52" font-weight="900" fill="url(#fcg)">X</text>
  </svg>`;

  fs.writeFileSync(path.join(outDir, "favicon.svg"), faviconSvgClean);
  console.log("✓ favicon.svg");

  // ──────────────────────────────────────────────
  // 6. SAFARI PINNED TAB SVG
  // ──────────────────────────────────────────────
  const safariPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" rx="20" fill="black"/>
    <text x="50" y="68" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="56" font-weight="900" fill="${ACCENT}">K</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "safari-pinned-tab.svg"), safariPinSvg);
  console.log("✓ safari-pinned-tab.svg");

  // ──────────────────────────────────────────────
  // 7. BROWSERCONFIG.XML (Microsoft / IE11+)
  // ──────────────────────────────────────────────
  const browserConfig = `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square70x70logo src="/mstile-70x70.png"/>
      <square150x150logo src="/mstile-150x150.png"/>
      <wide310x150logo src="/mstile-310x150.png"/>
      <square310x310logo src="/mstile-310x310.png"/>
      <TileColor>${BG}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
  fs.writeFileSync(path.join(outDir, "browserconfig.xml"), browserConfig);
  console.log("✓ browserconfig.xml");

  console.log("\n✅ All assets generated!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

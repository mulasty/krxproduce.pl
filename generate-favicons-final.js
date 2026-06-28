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

  // ── Helper: create transparent favicon with cyan logo filling 100% ──
  async function createFavicon(size) {
    return sharp(cyanLogoBuffer)
      .resize(size, size, { fit: "cover", withoutEnlargement: true })
      .png()
      .toBuffer();
  }

  // ── Standard PNG favicons ──
  const pngSizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-48x48.png", size: 48 },
  ];

  for (const { name, size } of pngSizes) {
    const buf = await createFavicon(size);
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log(`✓ ${name}`);
  }

  // ── Apple touch icons ──
  const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180];
  for (const size of appleSizes) {
    const buf = await createFavicon(size);
    fs.writeFileSync(path.join(outDir, `apple-touch-icon-${size}x${size}.png`), buf);
    console.log(`✓ apple-touch-icon-${size}x${size}.png`);
  }

  // ── Android Chrome icons ──
  const androidSizes = [36, 48, 72, 96, 144, 192, 256, 384, 512];
  for (const size of androidSizes) {
    const buf = await createFavicon(size);
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
    const buf = await createFavicon(size);
    fs.writeFileSync(path.join(outDir, name), buf);
    console.log(`✓ ${name}`);
  }

  // Wide tile
  const wideW = 310, wideH = 150;
  await sharp(cyanLogoBuffer)
    .resize(wideW, wideH, { fit: "cover", withoutEnlargement: true })
    .png()
    .toFile(path.join(outDir, "mstile-310x150.png"));
  console.log("✓ mstile-310x150.png");

  // ── Maskable icon ──
  await sharp(cyanLogoBuffer)
    .resize(512, 512, { fit: "cover", withoutEnlargement: true })
    .png()
    .toFile(path.join(outDir, "maskable-icon.png"));
  console.log("✓ maskable-icon.png");

  // ── FAVICON.ICO using png-to-ico (multi-res) ──
  const icoBuf16 = await createFavicon(16);
  const icoBuf32 = await createFavicon(32);
  const icoBuf48 = await createFavicon(48);

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
    <text x="50" y="72" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="900" fill="url(#fcg)">KRX</text>
  </svg>`;
  fs.writeFileSync(path.join(outDir, "favicon.svg"), faviconSvg);
  console.log("✓ favicon.svg");

  // ── Safari pinned tab ──
  const safariPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <text x="50" y="78" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="80" font-weight="900" fill="${ACCENT}">K</text>
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

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "public", "logo-krx.png");
const outDir = path.join(__dirname, "public");

const ACCENT = "#22d3ee";
const DARK_TEXT = "#111111";
const GRAY_TEXT = "#444444";

async function main() {
  const logoBuffer = fs.readFileSync(src);

  // ──────────────────────────────────────────────
  // OG IMAGE (1200×630) — Camera Flash Edition
  // ──────────────────────────────────────────────

  const ogFlash = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Main flash gradient: bright center fading out -->
        <radialGradient id="flashCenter" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="30%" stop-color="#f8f9fa"/>
          <stop offset="60%" stop-color="#e9ecef"/>
          <stop offset="100%" stop-color="#dee2e6"/>
        </radialGradient>
        <!-- Secondary warm flash glow -->
        <radialGradient id="warmGlow" cx="50%" cy="40%" r="40%">
          <stop offset="0%" stop-color="#fff8e1" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#ffffff" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <!-- Subtle cyan reflection from the accent -->
        <radialGradient id="cyanTint" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#e0f7fa" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#e0f7fa" stop-opacity="0"/>
        </radialGradient>
        <!-- Flash starburst rays -->
        <g id="ray">
          <rect x="598" y="0" width="4" height="630" fill="#ffffff" opacity="0.08"/>
        </g>
      </defs>

      <!-- Base background -->
      <rect width="1200" height="630" fill="url(#flashCenter)"/>

      <!-- Warm flash bloom -->
      <circle cx="600" cy="260" r="300" fill="url(#warmGlow)"/>

      <!-- Cyan ambient tint -->
      <circle cx="600" cy="315" r="400" fill="url(#cyanTint)"/>

      <!-- Starburst rays (camera flash effect) -->
      <g transform="translate(600,260)">
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.06"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.05" transform="rotate(15)"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.05" transform="rotate(30)"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.04" transform="rotate(45)"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.06" transform="rotate(60)"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.05" transform="rotate(75)"/>
        <rect x="-1" y="-400" width="2" height="800" fill="#ffffff" opacity="0.04" transform="rotate(90)"/>
      </g>

      <!-- Central flash bulb glow (strong bloom) -->
      <circle cx="600" cy="260" r="180" fill="#ffffff" opacity="0.25"/>
      <circle cx="600" cy="260" r="100" fill="#ffffff" opacity="0.35"/>
      <circle cx="600" cy="260" r="50" fill="#ffffff" opacity="0.5"/>

      <!-- Decorative corner brackets (dark, subtle) -->
      <path d="M60,50 L110,50 L110,55 L65,55 L65,95 L60,95 Z" fill="${DARK_TEXT}" opacity="0.15"/>
      <path d="M1140,50 L1090,50 L1090,55 L1135,55 L1135,95 L1140,95 Z" fill="${DARK_TEXT}" opacity="0.15"/>
      <path d="M60,580 L60,535 L65,535 L65,575 L110,575 L110,580 Z" fill="${DARK_TEXT}" opacity="0.15"/>
      <path d="M1140,580 L1140,535 L1135,535 L1135,575 L1090,575 L1090,580 Z" fill="${DARK_TEXT}" opacity="0.15"/>

      <!-- Title text -->
      <text x="600" y="420" text-anchor="middle" fill="${DARK_TEXT}" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="900">KRX Produce</text>

      <!-- Subtitle -->
      <text x="600" y="468" text-anchor="middle" fill="${GRAY_TEXT}" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="400" letter-spacing="3">Filmowanie  •  Projektowanie Graficzne  •  Montaż</text>

      <!-- URL -->
      <text x="600" y="555" text-anchor="middle" fill="#999999" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="4">KRXPRODUCE.PL</text>
    </svg>`;

  const ogFlashBuffer = Buffer.from(ogFlash);

  // Resize ORIGINAL black logo to fit
  const logoOg = await sharp(logoBuffer)
    .resize(360, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoOgMeta = await sharp(logoOg).metadata();

  await sharp(ogFlashBuffer)
    .composite([
      {
        input: logoOg,
        top: Math.round(110 + (200 - (logoOgMeta.height || 175)) / 2),
        left: Math.round((1200 - (logoOgMeta.width || 360)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-image.png"));
  console.log("✓ og-image.png (1200×630) — flash effect + black KRX");

  // ──────────────────────────────────────────────
  // OG SQUARE (1080×1080) — Flash Edition
  // ──────────────────────────────────────────────

  const ogSqFlash = `
    <svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sqFlash" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="35%" stop-color="#f8f9fa"/>
          <stop offset="70%" stop-color="#e9ecef"/>
          <stop offset="100%" stop-color="#dee2e6"/>
        </radialGradient>
        <radialGradient id="sqWarm" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stop-color="#fff8e1" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="sqCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#e0f7fa" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#e0f7fa" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <rect width="1080" height="1080" fill="url(#sqFlash)"/>
      <circle cx="540" cy="400" r="350" fill="url(#sqWarm)"/>
      <circle cx="540" cy="540" r="450" fill="url(#sqCyan)"/>

      <!-- Starburst -->
      <g transform="translate(540,400)">
        <rect x="-1" y="-540" width="2" height="1080" fill="#ffffff" opacity="0.05"/>
        <rect x="-1" y="-540" width="2" height="1080" fill="#ffffff" opacity="0.04" transform="rotate(22.5)"/>
        <rect x="-1" y="-540" width="2" height="1080" fill="#ffffff" opacity="0.04" transform="rotate(45)"/>
        <rect x="-1" y="-540" width="2" height="1080" fill="#ffffff" opacity="0.05" transform="rotate(67.5)"/>
        <rect x="-1" y="-540" width="2" height="1080" fill="#ffffff" opacity="0.04" transform="rotate(90)"/>
      </g>

      <!-- Bloom circles -->
      <circle cx="540" cy="400" r="200" fill="#ffffff" opacity="0.2"/>
      <circle cx="540" cy="400" r="120" fill="#ffffff" opacity="0.3"/>
      <circle cx="540" cy="400" r="60" fill="#ffffff" opacity="0.4"/>

      <!-- Title -->
      <text x="540" y="800" text-anchor="middle" fill="${DARK_TEXT}" font-family="Arial, Helvetica, sans-serif" font-size="80" font-weight="900">KRX Produce</text>
      <text x="540" y="860" text-anchor="middle" fill="${GRAY_TEXT}" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="400">Filmowanie &amp; Projektowanie Graficzne</text>
      <text x="540" y="980" text-anchor="middle" fill="#999999" font-family="Arial, Helvetica, sans-serif" font-size="26">krxproduce.pl</text>
    </svg>`;

  const ogSqFlashBuffer = Buffer.from(ogSqFlash);

  const logoSq = await sharp(logoBuffer)
    .resize(440, null, { fit: "inside", withoutEnlargement: true })
    .toBuffer();

  const logoSqMeta = await sharp(logoSq).metadata();

  await sharp(ogSqFlashBuffer)
    .composite([
      {
        input: logoSq,
        top: Math.round(180 + (260 - (logoSqMeta.height || 215)) / 2),
        left: Math.round((1080 - (logoSqMeta.width || 440)) / 2),
      },
    ])
    .png()
    .toFile(path.join(outDir, "og-square.png"));
  console.log("✓ og-square.png (1080×1080) — flash effect + black KRX");

  console.log("\n✅ OG images regenerated with camera flash effect!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

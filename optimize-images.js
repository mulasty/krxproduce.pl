const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public', 'images', 'portfolio');
const files = fs.readdirSync(dir);

(async () => {
  for (const file of files) {
    const inputPath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const tempPath = inputPath + '.tmp';

    try {
      let pipeline = sharp(inputPath).resize({
        width: 1200,
        height: 1200,
        fit: 'inside',
        withoutEnlargement: true,
      });

      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 85, progressive: true });
      } else if (ext === '.png') {
        pipeline = pipeline.png({ quality: 85, compressionLevel: 9 });
      }

      await pipeline.toFile(tempPath);
      fs.renameSync(tempPath, inputPath);
      const stats = fs.statSync(inputPath);
      console.log(`Optimized: ${file} -> ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
    } catch (err) {
      console.error(`Failed: ${file}`, err.message);
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    }
  }
})();

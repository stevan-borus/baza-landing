import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const maxWidth = 1600; // Maximum width for resizing (maintains aspect ratio)
const quality = 80; // WebP quality (0-100)

interface ImageStats {
  processed: number;
  skipped: number;
  errors: number;
  totalSizeBefore: number;
  totalSizeAfter: number;
}

async function processDirectory(dir: string, stats: ImageStats): Promise<void> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(fullPath, stats);
      continue;
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!['.jpg', '.jpeg'].includes(ext)) {
      continue;
    }

    // Skip if WebP version already exists
    const webpPath = fullPath.replace(/\.(jpg|jpeg)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${file.name} (WebP already exists)`);
      stats.skipped++;
      continue;
    }

    try {
      const inputStats = fs.statSync(fullPath);
      stats.totalSizeBefore += inputStats.size;

      console.log(`🔄 Processing: ${path.relative(publicDir, fullPath)}`);

      await sharp(fullPath)
        .rotate() // Auto-rotate based on EXIF orientation
        .resize({ width: maxWidth, withoutEnlargement: true })
        .webp({ quality })
        .toFile(webpPath);

      const outputStats = fs.statSync(webpPath);
      stats.totalSizeAfter += outputStats.size;
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(
        1,
      );

      console.log(
        `✅ Saved: ${path.relative(publicDir, webpPath)} (${(outputStats.size / 1024).toFixed(1)}KB, ${savings}% smaller)`,
      );
      stats.processed++;
    } catch (error) {
      console.error(`❌ Error processing ${file.name}:`, error);
      stats.errors++;
    }
  }
}

async function main() {
  console.log('🚀 Starting WebP conversion...\n');
  console.log(`📁 Scanning directory: ${publicDir}\n`);

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Directory not found: ${publicDir}`);
    process.exit(1);
  }

  const stats: ImageStats = {
    processed: 0,
    skipped: 0,
    errors: 0,
    totalSizeBefore: 0,
    totalSizeAfter: 0,
  };

  await processDirectory(publicDir, stats);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Conversion Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Processed: ${stats.processed} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images (WebP already exists)`);
  console.log(`❌ Errors: ${stats.errors} images`);
  console.log(
    `📦 Total size before: ${(stats.totalSizeBefore / 1024 / 1024).toFixed(2)} MB`,
  );
  console.log(
    `📦 Total size after: ${(stats.totalSizeAfter / 1024 / 1024).toFixed(2)} MB`,
  );
  if (stats.totalSizeBefore > 0) {
    const totalSavings = (
      (1 - stats.totalSizeAfter / stats.totalSizeBefore) *
      100
    ).toFixed(1);
    console.log(`💾 Total savings: ${totalSavings}%`);
  }
  console.log('='.repeat(50));
  console.log('\n✨ Done!');
}

main().catch(error => {
  console.error('Fatal error:', error);
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    console.error('Stack:', error.stack);
  }
  process.exit(1);
});

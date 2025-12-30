import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');
const optimizedDir = path.join(publicDir, 'optimized');

// Define sizes to generate
// Note: 1920px covers most desktop displays. For 4K/Retina, browsers will upscale.
// Adding larger sizes would increase file sizes significantly with minimal visual benefit.
const sizes = [
  { width: 256, suffix: '256w', quality: 85 }, // Thumbnails/small images
  { width: 640, suffix: '640w', quality: 90 }, // Mobile
  { width: 1080, suffix: '1080w', quality: 92 }, // Tablet
  { width: 1920, suffix: '1920w', quality: 95 }, // Desktop (high quality for large displays)
];

// maxWidth is only used for initial JPG→WebP conversion, not for optimized sizes
// It prevents creating unnecessarily large intermediate WebP files
const maxWidth = 1920; // Maximum width for initial WebP conversion

interface ImageStats {
  converted: number;
  optimized: number;
  skipped: number;
  errors: number;
  totalSizeBefore: number;
  totalSizeAfter: number;
}

// Directories/files to skip
const skipDirs = ['optimized'];
const skipFiles = ['og.png'];
const skipExtensions = ['.gif', '.svg']; // Skip non-optimizable formats (PNG will be converted)

/**
 * Convert JPG/JPEG/PNG to WebP if WebP doesn't already exist
 */
async function convertToWebP(
  filePath: string,
  relativePath: string,
  stats: ImageStats,
): Promise<string | null> {
  const ext = path.extname(filePath).toLowerCase();

  // Process JPG, JPEG, and PNG files
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    return null;
  }

  // Replace extension with .webp
  const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  // Skip if WebP version already exists
  if (fs.existsSync(webpPath)) {
    console.log(
      `⏭️  Skipping conversion: ${relativePath} (WebP already exists)`,
    );
    return webpPath; // Return the existing WebP path
  }

  try {
    const inputStats = fs.statSync(filePath);
    stats.totalSizeBefore += inputStats.size;

    console.log(`🔄 Converting to WebP: ${relativePath}`);

    await sharp(filePath)
      .rotate() // Auto-rotate based on EXIF orientation
      .resize({ width: maxWidth, withoutEnlargement: true })
      .webp({ quality: 90 }) // Use good quality for initial conversion
      .toFile(webpPath);

    const outputStats = fs.statSync(webpPath);
    stats.totalSizeAfter += outputStats.size;
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

    console.log(
      `  ✅ Converted: ${path.relative(publicDir, webpPath)} (${(outputStats.size / 1024).toFixed(1)}KB, ${savings}% smaller)`,
    );
    stats.converted++;
    return webpPath;
  } catch (error) {
    console.error(`❌ Error converting ${relativePath}:`, error);
    stats.errors++;
    return null;
  }
}

/**
 * Generate optimized sizes for a WebP or PNG image
 */
async function generateOptimizedSizes(
  filePath: string,
  relativePath: string,
  stats: ImageStats,
): Promise<void> {
  const ext = path.extname(filePath).toLowerCase();

  // Process WebP and PNG files (PNG will be converted to WebP during optimization)
  if (!['.webp', '.png'].includes(ext)) {
    return;
  }

  try {
    const inputStats = fs.statSync(filePath);
    stats.totalSizeBefore += inputStats.size;

    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    const originalWidth = metadata.width || 0;
    const originalHeight = metadata.height || 0;

    if (!originalWidth || !originalHeight) {
      console.log(`⏭️  Skipping ${relativePath} (invalid image)`);
      stats.skipped++;
      return;
    }

    // Create output directory structure
    const outputDir = path.join(optimizedDir, path.dirname(relativePath));
    fs.mkdirSync(outputDir, { recursive: true });

    const baseName = path.basename(filePath, ext);
    let processedSizes = 0;

    // Generate each size
    for (const size of sizes) {
      const outputPath = path.join(
        outputDir,
        `${baseName}-${size.suffix}.webp`,
      );

      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        continue;
      }

      await sharp(filePath)
        .rotate() // Auto-rotate based on EXIF orientation
        .resize({
          width: size.width,
          withoutEnlargement: true, // Don't upscale
        })
        .webp({ quality: size.quality }) // Use size-specific quality
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      stats.totalSizeAfter += outputStats.size;
      processedSizes++;

      console.log(
        `  ✅ Generated ${size.suffix}: ${path.relative(publicDir, outputPath)} (${(outputStats.size / 1024).toFixed(1)}KB)`,
      );
    }

    if (processedSizes > 0) {
      stats.optimized++;
      console.log(`✅ Optimized: ${relativePath} (${processedSizes} sizes)`);
    } else {
      stats.skipped++;
      console.log(
        `⏭️  Skipped optimization: ${relativePath} (all sizes already exist)`,
      );
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${relativePath}:`, error);
    stats.errors++;
  }
}

/**
 * Process a single image file
 */
async function processImage(
  filePath: string,
  relativePath: string,
  stats: ImageStats,
): Promise<void> {
  const fileName = path.basename(filePath);

  // Skip specific files
  if (skipFiles.includes(fileName)) {
    return;
  }

  const ext = path.extname(filePath).toLowerCase();

  // Skip files with certain extensions
  if (skipExtensions.includes(ext)) {
    return;
  }

  // Step 1: Convert JPG/JPEG to WebP if needed
  const webpPath = await convertToWebP(filePath, relativePath, stats);

  // Step 2: Generate optimized sizes
  // Use the WebP path if conversion happened, otherwise use original path (WebP or PNG)
  const imageToOptimize =
    webpPath || (['.webp', '.png'].includes(ext) ? filePath : null);

  if (imageToOptimize) {
    const optimizedRelativePath =
      webpPath ? path.relative(publicDir, webpPath) : relativePath;
    await generateOptimizedSizes(imageToOptimize, optimizedRelativePath, stats);
  }
}

async function processDirectory(
  dir: string,
  baseDir: string,
  stats: ImageStats,
): Promise<void> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const relativePath = path.relative(baseDir, fullPath);

    // Skip certain directories
    if (file.isDirectory()) {
      if (skipDirs.some(skip => relativePath.includes(skip))) {
        continue;
      }
      // Recursively process subdirectories
      await processDirectory(fullPath, baseDir, stats);
      continue;
    }

    await processImage(fullPath, relativePath, stats);
  }
}

async function main() {
  console.log('🚀 Starting image processing...\n');
  console.log(`📁 Scanning directory: ${publicDir}\n`);
  console.log(`📦 Output directory: ${optimizedDir}\n`);
  console.log(`📐 Generating sizes: ${sizes.map(s => s.suffix).join(', ')}\n`);
  console.log('This script will:');
  console.log("  1. Convert JPG/JPEG/PNG → WebP (if WebP doesn't exist)");
  console.log('  2. Generate optimized sizes for all WebP and PNG images\n');

  if (!fs.existsSync(publicDir)) {
    console.error(`❌ Directory not found: ${publicDir}`);
    process.exit(1);
  }

  // Create optimized directory
  fs.mkdirSync(optimizedDir, { recursive: true });

  const stats: ImageStats = {
    converted: 0,
    optimized: 0,
    skipped: 0,
    errors: 0,
    totalSizeBefore: 0,
    totalSizeAfter: 0,
  };

  await processDirectory(publicDir, publicDir, stats);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Processing Summary:');
  console.log('='.repeat(50));
  console.log(`✅ Converted to WebP: ${stats.converted} images`);
  console.log(`✅ Optimized: ${stats.optimized} images`);
  console.log(`⏭️  Skipped: ${stats.skipped} images`);
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
  console.log('\n✨ Done! Optimized images are in /public/optimized/');
}

main().catch(error => {
  console.error('Fatal error:', error);
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    console.error('Stack:', error.stack);
  }
  process.exit(1);
});

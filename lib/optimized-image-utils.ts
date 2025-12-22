/**
 * Utility functions for working with pre-optimized images
 */

import path from 'path';

const sizes = [256, 640, 1080, 1920];

/**
 * Generates a srcset string for optimized images
 * @param src - Original image path (e.g., '/gal/galerija-1.webp')
 * @returns srcset string (e.g., '/optimized/gal/galerija-1-256w.webp 256w, /optimized/gal/galerija-1-640w.webp 640w, ...')
 */
export function getOptimizedImageSrcset(src: string): string {
  if (!src || src.startsWith('data:') || src.startsWith('http')) {
    return '';
  }

  // Remove leading slash if present
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // Get directory and filename
  const dir = path.dirname(cleanSrc);
  const ext = path.extname(cleanSrc);
  const baseName = path.basename(cleanSrc, ext);

  // Build srcset entries
  const srcsetEntries = sizes
    .map(size => {
      const optimizedPath = dir === '.' 
        ? `/optimized/${baseName}-${size}w.webp`
        : `/optimized/${dir}/${baseName}-${size}w.webp`;
      return `${optimizedPath} ${size}w`;
    })
    .join(', ');

  return srcsetEntries;
}

/**
 * Gets the default src for an optimized image (largest size)
 * @param src - Original image path
 * @returns Path to the largest optimized version
 */
export function getOptimizedImageSrc(src: string): string {
  if (!src || src.startsWith('data:') || src.startsWith('http')) {
    return src;
  }

  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  const dir = path.dirname(cleanSrc);
  const ext = path.extname(cleanSrc);
  const baseName = path.basename(cleanSrc, ext);

  // Use 1920w as default (largest)
  const optimizedPath = dir === '.'
    ? `/optimized/${baseName}-1920w.webp`
    : `/optimized/${dir}/${baseName}-1920w.webp`;

  return optimizedPath;
}

/**
 * Gets optimized image paths for specific use cases
 */
export function getOptimizedImageForSize(
  src: string,
  targetWidth: number,
): string {
  if (!src || src.startsWith('data:') || src.startsWith('http')) {
    return src;
  }

  // Find closest size
  const closestSize = sizes.reduce((prev, curr) =>
    Math.abs(curr - targetWidth) < Math.abs(prev - targetWidth) ? curr : prev
  );

  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  const dir = path.dirname(cleanSrc);
  const ext = path.extname(cleanSrc);
  const baseName = path.basename(cleanSrc, ext);

  const optimizedPath = dir === '.'
    ? `/optimized/${baseName}-${closestSize}w.webp`
    : `/optimized/${dir}/${baseName}-${closestSize}w.webp`;

  return optimizedPath;
}


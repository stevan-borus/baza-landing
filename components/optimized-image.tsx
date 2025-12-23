'use client';

import {
  getOptimizedImageSrc,
  getOptimizedImageSrcset,
} from '@/lib/optimized-image-utils';
import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component that uses pre-optimized images with srcset
 * This component uses pre-generated optimized images instead of Next.js Image optimization
 * Uses native img tag with srcset for better browser support
 */
export function OptimizedImage({
  src,
  alt,
  sizes = '100vw',
  className,
  fill,
  width,
  height,
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const optimizedSrc = getOptimizedImageSrc(src);
  const srcset = getOptimizedImageSrcset(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Check if image is already loaded (e.g., from cache) using callback ref
  const imgRef = useRef<HTMLImageElement | null>(null);
  const setImgRef = (node: HTMLImageElement | null) => {
    imgRef.current = node;
    // Check if image is already loaded when ref is set
    if (node?.complete && node.naturalHeight !== 0) {
      setIsLoaded(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    console.error('Failed to load image:', optimizedSrc, 'from original:', src);
    onError?.();
  };

  if (fill) {
    return (
      <div className={cn('absolute inset-0', className)}>
        {/* Blur placeholder - shows while image loads */}
        {!isLoaded && !hasError && (
          <div className='bg-muted absolute inset-0 animate-pulse' />
        )}
        {/* Error fallback */}
        {hasError && (
          <div className='bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center text-xs'>
            Image failed to load
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={setImgRef}
          src={optimizedSrc}
          alt={alt}
          srcSet={srcset}
          sizes={sizes}
          loading={loading}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* Blur placeholder - shows while image loads */}
      {!isLoaded && !hasError && (
        <div className='bg-muted absolute inset-0 animate-pulse' />
      )}
      {/* Error fallback */}
      {hasError && (
        <div className='bg-muted text-muted-foreground absolute inset-0 flex items-center justify-center text-xs'>
          Image failed to load
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={setImgRef}
        src={optimizedSrc}
        alt={alt}
        srcSet={srcset}
        sizes={sizes}
        loading={loading}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}

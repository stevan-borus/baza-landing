'use client';

import Link from 'next/link';
import { OptimizedImage } from '@/components/optimized-image';
import { useLayoutEffect, useRef } from 'react';
import { ViewTransition } from 'react';

interface GalleryThumbnailsProps {
  allImages: Array<{ id: string; src?: string; alt: string }>;
  currentImageId: string;
}

export function GalleryThumbnails({
  allImages,
  currentImageId,
}: GalleryThumbnailsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentThumbnailRef = useRef<HTMLAnchorElement>(null);

  // Use useLayoutEffect to scroll synchronously before paint, preventing visible jump
  useLayoutEffect(() => {
    if (currentThumbnailRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const thumbnail = currentThumbnailRef.current;

      // Temporarily disable smooth scrolling for instant scroll
      container.style.scrollBehavior = 'auto';

      // Calculate the position to center the thumbnail
      const containerWidth = container.clientWidth;
      const thumbnailLeft = thumbnail.offsetLeft;
      const thumbnailWidth = thumbnail.offsetWidth;
      const scrollLeft =
        thumbnailLeft - containerWidth / 2 + thumbnailWidth / 2;

      // Scroll immediately without animation to prevent overlap
      container.scrollLeft = Math.max(0, scrollLeft);

      // Re-enable smooth scrolling after paint
      requestAnimationFrame(() => {
        if (container) {
          container.style.scrollBehavior = '';
        }
      });
    }
  }, [currentImageId]);

  const currentIndex = allImages.findIndex(img => img.id === currentImageId);

  return (
    <div
      ref={scrollContainerRef}
      className='relative z-10 flex w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto scroll-smooth px-2'
    >
      {allImages.map((image, index) => {
        const isCurrentImage = image.id === currentImageId;
        // Only prefetch adjacent images (prev, current, next)
        const shouldPrefetch = Math.abs(index - currentIndex) <= 1;

        return (
          <Link
            key={image.id}
            ref={isCurrentImage ? currentThumbnailRef : null}
            href={`/galerija/${image.id}`}
            prefetch={shouldPrefetch}
            className={`relative aspect-square shrink-0 overflow-hidden rounded-lg transition-all ${
              isCurrentImage ? 'h-28' : 'h-24 opacity-60 hover:opacity-100'
            }`}
          >
            {isCurrentImage ?
              <OptimizedImage
                src={image.src || '/placeholder.svg'}
                alt={image.alt}
                fill
                className='object-cover'
                sizes='112px'
              />
            : <ViewTransition name={`gallery-image-${image.id}`}>
                <OptimizedImage
                  src={image.src || '/placeholder.svg'}
                  alt={image.alt}
                  fill
                  className='object-cover'
                  sizes='96px'
                  loading='lazy'
                />
              </ViewTransition>
            }
          </Link>
        );
      })}
    </div>
  );
}

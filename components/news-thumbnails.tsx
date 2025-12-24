'use client';

import { OptimizedImage } from '@/components/optimized-image';
import { ViewTransition } from 'react';

interface NewsThumbnailsProps {
  articleId: string;
  index: number;
  image: string;
  onImageClick: (index: number) => void;
}

export function NewsThumbnails({
  articleId,
  index,
  image,
  onImageClick,
}: NewsThumbnailsProps) {
  return (
    <button
      onClick={() => onImageClick(index)}
      className='relative aspect-square h-24 shrink-0 overflow-hidden rounded-lg opacity-60 transition-all hover:opacity-100'
      aria-label={`Prikaži sliku ${index + 1}`}
    >
      <ViewTransition name={`news-thumbnail-${articleId}-${index}`}>
        <OptimizedImage
          src={image}
          alt={`Novost slika ${index + 1}`}
          fill
          className='object-cover'
          sizes='96px'
          loading='lazy'
        />
      </ViewTransition>
    </button>
  );
}

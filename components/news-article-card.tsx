'use client';

import Link from 'next/link';
import { ViewTransition } from 'react';
import { OptimizedImage } from '@/components/optimized-image';
import posthog from 'posthog-js';

interface NewsArticleCardProps {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  image: string;
  featured?: boolean;
}

export function NewsArticleCard({
  id,
  title,
  excerpt,
  date,
  image,
  featured = false,
}: NewsArticleCardProps) {
  const handleClick = () => {
    posthog.capture('news_article_clicked', {
      article_id: id,
      article_title: title,
      is_featured: featured,
    });
  };

  if (featured) {
    return (
      <Link
        href={`/novosti/${id}`}
        className='group custom-card relative h-fit overflow-hidden'
        onClick={handleClick}
      >
        <ViewTransition name={`news-image-${id}`}>
          <div className='relative h-46 w-full md:h-83'>
            <OptimizedImage
              src={image}
              alt={title}
              fill
              className='rounded-br-[50.5px] object-cover'
              sizes='(max-width: 1280px) 100vw, 50vw'
            />
          </div>
        </ViewTransition>
        <div className='flex flex-col gap-4 bg-white/90 p-6 group-hover:bg-white'>
          <h1 className='group-hover:text-brand-light text-left transition-colors'>
            {title}
          </h1>
          {excerpt && (
            <p className='text-foreground group-hover:text-brand text-left text-base transition-colors md:text-2xl'>
              {excerpt}
            </p>
          )}
          <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-xl'>
            {date}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/novosti/${id}`}
      className='group custom-card flex overflow-hidden'
      onClick={handleClick}
    >
      <ViewTransition name={`news-image-${id}`}>
        <div className='relative h-22 w-30 shrink-0 md:h-42 md:w-69'>
          <OptimizedImage
            src={image}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 120px, 276px'
          />
        </div>
      </ViewTransition>
      <div className='flex flex-1 flex-col justify-between gap-2 bg-white px-4 py-3 md:px-8 md:py-4'>
        <h3 className='group-hover:text-brand-light text-left text-base transition-colors md:text-3xl'>
          {title}
        </h3>
        <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-xl'>
          {date}
        </span>
      </div>
    </Link>
  );
}

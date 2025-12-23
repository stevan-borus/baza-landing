'use client';

import Link from 'next/link';
import { ViewTransition } from 'react';
import { OptimizedImage } from '@/components/optimized-image';
import posthog from 'posthog-js';

interface BlogPostCardProps {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  date: string;
  image: string;
}

export function BlogPostCard({
  id,
  title,
  subtitle,
  author,
  date,
  image,
}: BlogPostCardProps) {
  const handleClick = () => {
    posthog.capture('blog_post_clicked', {
      post_id: id,
      post_title: title,
      post_author: author,
    });
  };

  return (
    <Link
      href={`/blog/${id}`}
      className='group custom-card flex h-45 overflow-hidden sm:h-40 md:h-50'
      onClick={handleClick}
    >
      <ViewTransition name={`blog-image-${id}`}>
        <div className='relative h-full w-40 shrink-0 md:w-50'>
          <OptimizedImage
            src={image}
            alt={title}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 160px, 200px'
          />
        </div>
      </ViewTransition>
      <div className='flex flex-1 flex-col justify-between gap-2 bg-white px-4 py-3 md:px-8 md:py-4'>
        <div className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <p className='text-foreground group-hover:text-brand text-left text-xs transition-colors md:text-lg'>
              {author}
            </p>
            {subtitle && (
              <p className='text-foreground group-hover:text-brand text-left text-sm transition-colors md:text-base'>
                {subtitle}
              </p>
            )}
          </div>
          <h3 className='group-hover:text-brand-light text-left text-base transition-colors md:text-2xl'>
            {title}
          </h3>
        </div>
        <span className='text-foreground group-hover:text-brand-light text-sm font-light transition-colors md:text-base'>
          {date}
        </span>
      </div>
    </Link>
  );
}

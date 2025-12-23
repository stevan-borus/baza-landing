'use client';

import Link from 'next/link';
import { ViewTransition } from 'react';
import { OptimizedImage } from '@/components/optimized-image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

interface ProgrammeCardProps {
  id: string;
  title: string;
  image: string;
  imagePosition?: string;
}

export function ProgrammeCard({
  id,
  title,
  image,
  imagePosition,
}: ProgrammeCardProps) {
  const handleClick = () => {
    posthog.capture('programme_clicked', {
      programme_id: id,
      programme_title: title,
    });
  };

  return (
    <Link
      href={`/programi/${id}`}
      className='group custom-card relative h-45 overflow-hidden sm:h-100'
      onClick={handleClick}
    >
      <ViewTransition name={`programme-image-${id}`}>
        <OptimizedImage
          src={image}
          alt={title}
          fill
          className={cn('rounded-br-[50.5px] object-cover', imagePosition)}
          sizes='(max-width: 640px) 100vw, 50vw'
        />
      </ViewTransition>
      <div className='absolute right-0 bottom-0 left-0 flex items-center justify-between rounded-br-[50px] bg-white/90 px-5 py-1 pr-8 group-hover:bg-white sm:py-3 sm:pr-5'>
        <ViewTransition>
          <h2 className='group-hover:text-brand-light transition-colors'>
            {title}
          </h2>
        </ViewTransition>
        <ArrowRight
          strokeWidth={3}
          className='text-foreground group-hover:text-brand-light h-5 w-5'
        />
      </div>
    </Link>
  );
}

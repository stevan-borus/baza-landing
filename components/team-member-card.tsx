'use client';

import Link from 'next/link';
import { ViewTransition } from 'react';
import { OptimizedImage } from '@/components/optimized-image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
}

export function TeamMemberCard({
  id,
  name,
  role,
  image,
  imagePosition,
}: TeamMemberCardProps) {
  const handleClick = () => {
    posthog.capture('team_member_clicked', {
      member_id: id,
      member_name: name,
      member_role: role,
    });
  };

  return (
    <Link
      href={`/nas-tim/${id}`}
      className='group custom-card relative h-93 overflow-hidden bg-white sm:h-116'
      onClick={handleClick}
    >
      <ViewTransition name={`team-image-${id}`}>
        <OptimizedImage
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className={cn('rounded-br-[50.5px] object-cover', imagePosition)}
          sizes='(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw'
        />
      </ViewTransition>
      <div className='absolute right-0 bottom-0 left-0 flex items-center justify-between bg-white/90 px-5 py-1 pr-8 group-hover:bg-white sm:py-3 sm:pr-5'>
        <div className='flex flex-col'>
          <h2 className='group-hover:text-brand-light transition-colors'>
            {name}
          </h2>
          <p className='text-foreground group-hover:text-brand text-lg transition-colors'>
            {role}
          </p>
        </div>
        <ArrowRight
          strokeWidth={3}
          className='text-foreground group-hover:text-brand-light h-5 w-5'
        />
      </div>
    </Link>
  );
}

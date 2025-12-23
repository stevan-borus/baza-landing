'use client';

import posthog from 'posthog-js';
import type { ReactNode } from 'react';

interface TrackedExternalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
}

export function TrackedExternalLink({
  href,
  children,
  className,
  eventName,
  eventProperties = {},
}: TrackedExternalLinkProps) {
  const handleClick = () => {
    posthog.capture(eventName, {
      link_url: href,
      ...eventProperties,
    });
  };

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

interface SocialLinkProps {
  platform: 'facebook' | 'instagram' | 'tiktok';
  href: string;
  children: ReactNode;
}

export function SocialLink({ platform, href, children }: SocialLinkProps) {
  const handleClick = () => {
    posthog.capture('social_link_clicked', {
      platform,
      link_url: href,
    });
  };

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

interface MapLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function MapLink({ href, children, className }: MapLinkProps) {
  const handleClick = () => {
    posthog.capture('map_link_clicked', {
      link_url: href,
      location: 'footer',
    });
  };

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

'use client';

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full px-8 lg:px-20 py-3 text-center text-base md:text-2xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        main: 'bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent',
      },
    },
    defaultVariants: {
      variant: 'main',
    },
  },
);

interface TrackEvent {
  event: string;
  properties?: Record<string, unknown>;
}

interface ButtonProps
  extends
    Omit<BaseButtonProps, 'className'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  className?: string;
  trackEvent?: TrackEvent;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, href, className, onClick, trackEvent, ...props },
    ref,
  ) => {
    const router = useRouter();
    const combinedClassName = cn(buttonVariants({ variant }), className);

    const handleClick = (
      e: Parameters<NonNullable<BaseButtonProps['onClick']>>[0],
    ) => {
      if (trackEvent) {
        posthog.capture(trackEvent.event, trackEvent.properties);
      }
      if (href) {
        router.push(href);
      }
      onClick?.(e);
    };

    return (
      <BaseButton
        ref={ref}
        className={combinedClassName}
        onClick={handleClick}
        {...props}
      >
        {children}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';

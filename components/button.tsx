'use client';

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
} from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ReactNode, forwardRef } from 'react';
import { useRouter } from 'next/navigation';

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

interface ButtonProps
  extends
    Omit<BaseButtonProps, 'className'>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  href?: string;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, href, className, onClick, ...props }, ref) => {
    const router = useRouter();
    const combinedClassName = cn(buttonVariants({ variant }), className);

    const handleClick = (
      e: Parameters<NonNullable<BaseButtonProps['onClick']>>[0],
    ) => {
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

'use client';

import { usePathname } from 'next/navigation';
import type React from 'react';

export function ContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isGalleryDetailPage =
    pathname?.startsWith('/galerija/') && pathname !== '/galerija';

  return (
    <div
      className={`flex flex-1 flex-col overflow-y-auto ${
        isGalleryDetailPage ? 'gap-0' : 'gap-8 lg:gap-12'
      }`}
    >
      {children}
    </div>
  );
}

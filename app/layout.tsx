import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContentWrapper } from '@/components/content-wrapper';

import './globals.css';

import '@fontsource/metropolis/400.css';
import '@fontsource/metropolis/500.css';
import '@fontsource/metropolis/600.css';
import '@fontsource/metropolis/700.css';

export const metadata: Metadata = {
  title: 'Baza Pilates',
  description: 'Baza Pilates je centar za reformer pilates u Novom Sadu',
  generator: 'v0.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex h-svh flex-col overflow-hidden font-sans antialiased'>
        <Header />
        <ContentWrapper>
          {children}
          <Footer />
        </ContentWrapper>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}

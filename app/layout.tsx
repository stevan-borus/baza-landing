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
  title: {
    default: 'Baza Pilates',
    template: '%s | Baza Pilates',
  },
  description:
    'Baza Pilates - centar za reformer pilates u Novom Sadu. Nudimo različite programe treninga, podršku fizioterapeuta i sveobuhvatan pristup wellness-u za žene svih uzrasta.',
  keywords: [
    'pilates',
    'reformer pilates',
    'Novi Sad',
    'Baza Pilates',
    'fitness',
    'trening',
    'energy pilates',
    'moms and minis',
    'golden age pilates',
    'pilates studio',
    'pilates centar',
    'fizioterapija',
    'rehabilitacija',
    'wellness',
    'zdravlje',
    'vežbanje',
    'trening za žene',
  ],
  authors: [{ name: 'Baza Pilates' }],
  creator: 'Baza Pilates',
  publisher: 'Baza Pilates',
  metadataBase: new URL('https://bazapilates.com'),
  alternates: {
    canonical: 'https://bazapilates.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://bazapilates.com',
    siteName: 'Baza Pilates',
    title: 'Baza Pilates',
    description:
      'Baza Pilates - centar za reformer pilates u Novom Sadu. Nudimo različite programe treninga, podršku fizioterapeuta i sveobuhvatan pristup wellness-u za žene svih uzrasta.',
    images: [
      {
        url: 'https://bazapilates.com/og.png',
        width: 1200,
        height: 630,
        alt: 'Baza Pilates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baza Pilates',
    description:
      'Baza Pilates - centar za reformer pilates u Novom Sadu. Nudimo različite programe treninga, podršku fizioterapeuta i sveobuhvatan pristup wellness-u za žene svih uzrasta.',
    images: ['https://bazapilates.com/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sr'>
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

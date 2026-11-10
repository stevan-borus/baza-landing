import type React from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ContentWrapper } from '@/components/content-wrapper';
import { JsonLd } from '@/components/json-ld';
import { studio } from '@/domain/studio/studio';

import './globals.css';

import '@fontsource/metropolis/400.css';
import '@fontsource/metropolis/500.css';
import '@fontsource/metropolis/600.css';
import '@fontsource/metropolis/700.css';

const description =
  'Baza Pilates - centar za reformer pilates u Novom Sadu. Nudimo različite programe treninga, podršku fizioterapeuta i sveobuhvatan pristup wellness-u za žene svih uzrasta.';

const studioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  '@id': `${studio.url}/#studio`,
  name: studio.name,
  description,
  url: studio.url,
  logo: `${studio.url}/og.png`,
  image: `${studio.url}/og.png`,
  telephone: studio.telephone,
  email: studio.email,
  address: {
    '@type': 'PostalAddress',
    ...studio.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...studio.geo,
  },
  hasMap: studio.mapUrl,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      ...studio.openingHours,
    },
  ],
  sameAs: studio.sameAs,
};

export const metadata: Metadata = {
  title: {
    default: 'Baza Pilates',
    template: '%s | Baza Pilates',
  },
  description,
  keywords: [
    'pilates',
    'reformer pilates',
    'Novi Sad',
    'Baza Pilates',
    'Baza Pilates Studio Novi Sad',
    'Baza Pilates Centar Novi Sad',
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
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    siteName: 'Baza Pilates',
    title: 'Baza Pilates',
    description,
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
    description,
    images: ['https://bazapilates.com/og.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
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
        <JsonLd data={studioJsonLd} />
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

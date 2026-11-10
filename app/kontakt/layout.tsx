import type React from 'react';
import type { Metadata } from 'next';

// The contact page is a client component and cannot export metadata itself.
export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktirajte BAZA pilates studio u Novom Sadu i zakažite probni trening.',
  alternates: {
    canonical: '/kontakt',
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

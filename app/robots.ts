import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/_next/static/', '/optimized/'],
      disallow: ['/api/', '/ingest/'],
    },
    sitemap: 'https://bazapilates.com/sitemap.xml',
  };
}

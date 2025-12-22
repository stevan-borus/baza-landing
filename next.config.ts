import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  // Disable image optimization cache for development
  // This helps when replacing images with the same name
  images: {
    // In development, images are not cached as aggressively
    // In production, you may want to keep caching enabled
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
  },
};

export default nextConfig;

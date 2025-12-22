import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development' ? true : false,
    deviceSizes: [640, 1080, 1920],
    imageSizes: [64, 128, 256],
  },
};

export default nextConfig;

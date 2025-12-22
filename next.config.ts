import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    viewTransition: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // enables static export for Next.js
  basePath: isProd ? '/practice-charts' : '',
  assetPrefix: isProd ? '/practice-charts/' : '',
  images: {
    unoptimized: true, // Disables image optimization for GitHub Pages compatibility
  },
};

export default nextConfig;

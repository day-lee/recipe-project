import type { NextConfig } from "next";
import analyser from '@next/bundle-analyzer'

const withBundleAnalyzer = analyser({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'day-lee.github.io',
        pathname: '/recipe-book-food-photos/**',
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "uzedwhzjchxkoacuansf.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', 
    },
  },
};

export default withBundleAnalyzer(nextConfig);

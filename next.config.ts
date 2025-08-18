import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'day-lee.github.io',
        port: '',
        pathname: '/recipe-book-food-photos/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;

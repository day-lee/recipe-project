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
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', 
    },
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [64, 128, 256],
    formats: ['image/webp'],
  },
  webpack: (config) => {
    // Suppress the Supabase realtime warning
    config.ignoreWarnings = [
      { module: /node_modules\/@supabase\/realtime-js/ }
    ]

    return config
  }
};

export default nextConfig;

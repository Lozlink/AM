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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Suppress the Supabase realtime warning
    config.ignoreWarnings = [
      { module: /node_modules\/@supabase\/realtime-js/ }
    ]
    
    return config
  }
};

export default nextConfig;

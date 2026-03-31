import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb', // Naikkan ke 4MB atau sesuaikan kebutuhan (misal '10mb')
    },
  },
};

export default nextConfig;

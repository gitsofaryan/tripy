import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // ⚠️ This will skip type checking during builds
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ This will skip ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

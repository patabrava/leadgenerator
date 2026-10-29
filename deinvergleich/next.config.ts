import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() { return { beforeFiles: [{ source: "/", destination: "/landing/index.html" }] }; },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

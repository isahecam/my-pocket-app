import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  cacheComponents: true,
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;

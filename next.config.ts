import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Emit a self-contained server bundle (.next/standalone) so the production
  // Docker image can ship without node_modules or the full source tree.
  output: "standalone",
};

export default nextConfig;

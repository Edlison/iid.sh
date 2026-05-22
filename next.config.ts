import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

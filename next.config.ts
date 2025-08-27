import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages serves from a subdirectory, but we'll handle this with basePath if needed
  // basePath: '/portfolio', // Uncomment and update if your repo name is different
};

export default nextConfig;

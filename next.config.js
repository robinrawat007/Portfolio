/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep static export available for GitHub Pages deploys,
  // but allow server features (API routes, streaming) in normal mode.
  output: process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" ? "export" : undefined,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;

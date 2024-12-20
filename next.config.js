/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Disable SWC minifier to fix build issues in WebContainer
  swcMinify: false,
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Leave empty or include other experimental features you may need
  },
  reactStrictMode: true, // Enable strict mode for React
  swcMinify: true, // Use SWC for minification for faster builds
};

module.exports = nextConfig;

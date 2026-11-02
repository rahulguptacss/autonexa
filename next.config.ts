import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // 90 is used for large full-width photos (hero, about banner, breadcrumb) so they stay crisp
    qualities: [75, 90],
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: '/capabilities',
        destination: '/manufacturing-capabilities',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/products-solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

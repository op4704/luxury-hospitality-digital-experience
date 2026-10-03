import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash (imgix) resizes at its CDN edge — see src/lib/image-loader.ts
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    qualities: [60, 70, 75, 85],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2560],
  },
  async redirects() {
    return [{ source: "/property-explorer", destination: "/explore", permanent: true }];
  },
};

export default nextConfig;

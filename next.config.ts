import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async redirects() {
    return [
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contactus/:path*",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

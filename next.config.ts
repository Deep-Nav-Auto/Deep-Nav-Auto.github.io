import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  images: {
    unoptimized: isGithubActions,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

if (!isGithubActions) {
  nextConfig.redirects = async () => {
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
      {
        source: "/projects",
        destination: "/gallery",
        permanent: true,
      },
      {
        source: "/projects/:path*",
        destination: "/gallery",
        permanent: true,
      },
    ];
  };
}

export default nextConfig;

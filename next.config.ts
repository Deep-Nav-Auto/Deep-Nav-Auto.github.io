import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  images: {
    unoptimized: isGithubActions,
    remotePatterns: [],
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
    ];
  };
}

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "k.kakaocdn.net",
      "ssl.pstatic.net",
      "shopping-phinf.pstatic.net",
    ],
  },
};

export default nextConfig;

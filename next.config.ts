import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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

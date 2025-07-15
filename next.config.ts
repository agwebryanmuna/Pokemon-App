import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**'),new URL('https://raw.githubusercontent.com/**')]
  }
};

export default nextConfig;

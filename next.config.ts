import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://3.26.192.60:8000/:path*", // proxies to your HTTP FastAPI backend
      },
    ];
  },
};

export default nextConfig;

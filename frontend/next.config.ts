import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "api.insperai.com",
        port: "",
        pathname: "/media/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

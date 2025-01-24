import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_GRAPHQL_URI: process.env.NEXT_GRAPHQL_URI,
  },
};

export default nextConfig;

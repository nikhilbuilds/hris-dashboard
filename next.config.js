/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Add env variables here if needed
    API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig 
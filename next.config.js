/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "https://digital-sea-production.up.railway.app",
      },
    ],
  },
}

module.exports = nextConfig

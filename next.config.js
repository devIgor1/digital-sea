/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        protocol: "http",
        port: "3000",
      },
      {
        hostname: "digital-sea-production.up.railway.app",
        protocol: "https",
      },
    ],
  },
}

module.exports = nextConfig

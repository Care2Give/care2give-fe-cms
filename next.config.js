/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "care2give-s3-dev.s3.ap-southeast-1.amazonaws.com",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;

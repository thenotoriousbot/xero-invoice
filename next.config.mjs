/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "in.xero.com",
      },
    ],
  },
};

export default nextConfig;

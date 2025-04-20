/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["imgur.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

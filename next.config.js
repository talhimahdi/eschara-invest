/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;

module.exports = {
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "20mb",
  },
  images: {
    domains: ["127.0.0.1", "eschara.alwaysdata.net"],
    // formats: ["image/png", "image/jpg", "image/jpeg"],
  },
};

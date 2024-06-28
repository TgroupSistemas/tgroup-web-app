/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['static.tvmaze.com'],
  },
}

module.exports = nextConfig

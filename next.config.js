/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    OPENC_APIKEY: process.env.OPENC_APIKEY
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure.grannysnaturals.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'woocommerce-754985-5615334.cloudwaysapps.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

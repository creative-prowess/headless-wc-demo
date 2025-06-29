/** @type {import('@/pages/node_modules/next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'secure.grannysnaturals.com',
        pathname: '/**',
      },
            {
        protocol: 'https',
        hostname: 'consolepartsdepot.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'woocommerce-754985-5615334.cloudwaysapps.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // ✅ Add this
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

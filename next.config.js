/**
 * @type {import('next').NextConfig}
 */
const path = require('path')
const nextConfig = {
  /* config options here */
}
 

module.exports = nextConfig
module.exports = {
  // reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mohaddesepkz.pythonanywhere.com',
        pathname: '/media/**',
      },
    ],
  },
}
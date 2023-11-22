/**
 * @type {import('next').NextConfig}
 */
const path = require('path')
const nextConfig = {
  /* config options here */
}
 
// module.exports = nextConfig
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
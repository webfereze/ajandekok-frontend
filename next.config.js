const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  i18n: {
    locales: ['ro', 'hu'],
    defaultLocale: 'ro',
  },
  env: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized:true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => {
    return 'ajandekok-build-id'
  },
}

module.exports = {...nextConfig, i18n}

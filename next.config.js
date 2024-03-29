/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./src/_mantine.scss";`
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    localeDetection: false
  }
};

module.exports = nextConfig

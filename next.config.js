/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isProd && repo
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
}

module.exports = nextConfig

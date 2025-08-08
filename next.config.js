/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
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

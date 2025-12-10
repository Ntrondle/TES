const createMDX = require('@next/mdx')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // basePath for GitHub Pages - uncomment if deploying to https://username.github.io/TES/
  // basePath: '/TES',
  // assetPrefix: '/TES/',
}

const withMDX = createMDX({})

module.exports = withMDX(nextConfig)

/** @type {import('next').NextConfig} */
const repo = 'tes-site'; // your repo name here
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
};

module.exports = nextConfig;

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // This enables static export
    basePath: isProd ? '/my-app' : '',
    assetPrefix: isProd ? '/my-app/' : '',
};

export default nextConfig;

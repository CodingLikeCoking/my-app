const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: isProd ? '/my-app' : '',
    assetPrefix: isProd ? '/my-app/' : '',
    images: {
        unoptimized: true,
    },
    distDir: 'docs',
};

export default nextConfig;

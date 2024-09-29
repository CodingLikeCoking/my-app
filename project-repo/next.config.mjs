const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: isProd ? '/my-app/project-repo' : '',
    assetPrefix: isProd ? '/my-app/project-repo/' : '',
    images: {
        unoptimized: true, // Disable Next.js image optimization
    },
    distDir: 'docs', // Specify docs as the output directory
};

export default nextConfig;

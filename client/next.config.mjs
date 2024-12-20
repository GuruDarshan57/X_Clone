/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
            }, {
                protocol: 'https',
                hostname: 'x-clone-dev.s3.ap-south-1.amazonaws.com',
                port: '',
                pathname: '/**',
            }]
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;

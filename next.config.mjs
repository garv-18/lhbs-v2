/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', 'aos'],
    },
};

export default nextConfig;

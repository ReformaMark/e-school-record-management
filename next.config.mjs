/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.com',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
            {
                protocol: 'https',
                hostname: 'enduring-impala-308.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'sleek-oyster-512.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'sincere-hawk-12.convex.cloud',
            }
        ]
    }
};

export default nextConfig;

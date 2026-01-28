/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone', // DISABLED explicitly
    images: {
        unoptimized: true,
    },
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            // Ensure accurate path resolution
        };
        return config;
    },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactRoot: true,
    },
    images: {
        domains: ['image.tmdb.org',],
      },
};

export default nextConfig;

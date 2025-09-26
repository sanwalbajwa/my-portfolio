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
        hostname: 'klubbforsaljning.se',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all domains (use cautiously)
      }
    ],
  },
};

export default nextConfig;
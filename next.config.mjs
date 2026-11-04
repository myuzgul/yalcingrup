/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.yalcingrupmimarlik.com',
      },
      {
        protocol: 'https',
        hostname: 'yalcingrupmimarlik.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'prefabrikevim.com',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/prefabrik-evler/',
        destination: '/prefabrik-ev-yapimi/',
      },
      {
        source: '/prefabrik-evler/:slug/',
        destination: '/prefabrik-ev-yapimi/:slug/',
      },
    ];
  },
};

export default nextConfig;


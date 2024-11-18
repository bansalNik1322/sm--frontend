/** @type {import('next').NextConfig} */

const rewrites = () => {
  return [
    {
      source: '/api/:path*',
      destination: `${process.env.BACKEND}/v1/api/:path*`,
    },
    // {
    //   source: '/spimages/:path*',
    //   destination: `${process.env.BACKEND}/:path*`,
    // },
  ];
};

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  rewrites,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === 'production' ? 'https' : 'http',
        hostname: process.env.HOSTNAME,
        port: process.env.NODE_ENV === 'production' ? '' : '5000',
        pathname: '/public/**',
      },
    ],
  },
};

module.exports = nextConfig;

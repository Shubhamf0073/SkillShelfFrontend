/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // Proxy to Django backend
      },
    ];
  },
  // Add any other existing configurations here
};

module.exports = nextConfig;

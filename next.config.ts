// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Elimina experimental.appDir - ya no es necesario
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }
    return config
  },
}

export default nextConfig
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maisondecharme.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      }, 
        {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.2',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      }
    ],
  
  },
};

export default nextConfig;

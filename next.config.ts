import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // 이미지 최적화를 위한 설정
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  // hydration 오류 방지를 위한 설정
  reactStrictMode: false,
}

export default nextConfig

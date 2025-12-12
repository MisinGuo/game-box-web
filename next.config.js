/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态导出支持（可选，用于全静态部署）
  // output: 'export',
  
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig

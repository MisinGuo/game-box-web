/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态导出支持（仅生产构建时启用，开发模式不启用）
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  
  // 静态导出时禁用图片优化（Cloudflare 不支持 Next.js 图片优化）
  images: {
    unoptimized: true,
  },
  
  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig

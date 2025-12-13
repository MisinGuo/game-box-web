/** @type {import('next').NextConfig} */
const nextConfig = {
  // 构建模式选择：
  // - 本地开发/静态部署: output: 'export'
  // - Cloudflare Workers (ISR): 移除 output 配置，使用 opennextjs-cloudflare
  // 
  // 注意: Cloudflare Pages 全功能模式需要在 Linux/WSL/CI 环境构建
  // Windows 本地可使用静态导出模式测试
  ...(process.env.CLOUDFLARE_WORKERS !== 'true' && { output: 'export' }),
  
  // 图片优化配置
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

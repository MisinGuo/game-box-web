import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '搜索',
  description: '搜索游戏、盒子、攻略',
}

// CSR: 搜索页面客户端渲染
export default function SearchPage() {
  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">搜索</h1>
        <p className="text-slate-400">搜索功能开发中...</p>
      </div>
    </div>
  )
}

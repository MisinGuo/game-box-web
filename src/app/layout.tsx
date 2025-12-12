import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GameBox - 全网游戏盒子聚合平台',
    template: '%s | GameBox'
  },
  description: '最专业的中立游戏盒子聚合平台，汇集全网 50+ 优质游戏盒子，提供最客观的折扣对比与攻略评测。',
  keywords: ['游戏盒子', '游戏折扣', 'BT游戏', '福利游戏', '游戏攻略'],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'GameBox',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}

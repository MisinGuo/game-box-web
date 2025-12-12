import Link from 'next/link'
import { ArrowRight, Flame, Gift, BookOpen, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPojieArticles, getStrategyArticles } from '@/lib/content'
import type { Metadata } from 'next'

// SSG: 首页静态生成
export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: 'GameBox - 发现最划算的游戏折扣',
  description: '汇集 50+ 主流游戏盒子，一键对比首充续充折扣。不花冤枉钱，玩转最强福利版。',
}

export default async function HomePage() {
  // 获取真实的文章数据
  const [pojieArticles, strategyArticles] = await Promise.all([
    getPojieArticles(),
    getStrategyArticles()
  ])
  
  // 取最新的破解游戏
  const latestPojie = pojieArticles.slice(0, 6)
  // 取最新的攻略文章
  const latestStrategy = strategyArticles.slice(0, 6)
  return (
    <div className="bg-slate-950 min-h-screen pb-12">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-950 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 px-4 py-1">
            2025 全网游戏盒子聚合平台
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            发现最划算的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">游戏折扣</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            汇集 50+ 主流游戏盒子，一键对比首充续充折扣。
            <br className="hidden md:inline" />
            不花冤枉钱，玩转最强福利版。
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg font-bold" asChild>
              <Link href="/boxes">浏览盒子大全</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" asChild>
              <Link href="/article/dragon-reborn-2025-class-guide">查看游戏攻略</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="py-12 border-b border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: '收录盒子', value: '50+', icon: Download },
            { label: '覆盖游戏', value: '10W+', icon: Flame },
            { label: '日更攻略', value: '200+', icon: BookOpen },
            { label: '累计省钱', value: '¥5000W', icon: Gift },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 text-blue-400">
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Strategy Articles */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">最新游戏攻略</h2>
            <p className="text-slate-400 text-sm">深度的游戏解析，帮你快速上手</p>
          </div>
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0" asChild>
            <Link href="/strategy">
              全部攻略 <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestStrategy.map((article) => (
            <Link key={article.slug} href={`/strategy/${article.slug}`}>
              <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer group h-full">
                <div className="aspect-video bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
                    <BookOpen className="h-12 w-12" />
                  </div>
                  <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">攻略</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.frontmatter.title?.split('?')[0].split(',')[0] || '未命名攻略'}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{article.frontmatter.date || '未知日期'}</span>
                    <span>阅读约 {article.readingTime} 分钟</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Pojie Games */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">热门破解游戏</h2>
              <p className="text-slate-400 text-sm">0.1折起 · 无限钻石 · 满V福利</p>
            </div>
            <Button variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-transparent p-0" asChild>
              <Link href="/pojie">
                查看全部 <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {latestPojie.map((game) => (
              <Link key={game.slug} href={`/pojie/${game.slug}`}>
                <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-orange-500/50 transition-colors cursor-pointer group">
                  <div className="aspect-square bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-orange-900/30 to-red-900/30">
                      🎮
                    </div>
                    <Badge className="absolute top-2 right-2 bg-orange-500/90 text-xs">0.1折</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                      {game.subcategory || game.frontmatter.title?.split('?')[0].split(',')[0].substring(0, 10) || '游戏'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{game.category}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

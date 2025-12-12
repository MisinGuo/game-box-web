import Link from 'next/link'
import { ArrowRight, Flame, Gift, BookOpen, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Metadata } from 'next'

// SSG: 首页静态生成
export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'GameBox - 发现最划算的游戏折扣',
  description: '汇集 50+ 主流游戏盒子，一键对比首充续充折扣。不花冤枉钱，玩转最强福利版。',
}

// 模拟文章数据
const featuredArticles = [
  {
    slug: 'dragon-reborn-2025-class-guide',
    title: '龍族重生2025：各职业高效输出手法全解析',
    description: '本文以实际对局经验为依据，帮助你在龍族重生2025中快速提升DPS...',
    category: '进阶攻略',
    categoryColor: 'bg-blue-600',
    date: '2025-05-12',
    views: '1.2w',
  },
  {
    slug: 'box-discount-compare-2025',
    title: '2025 六大游戏盒子折扣对比：哪家最省钱？',
    description: '实测对比咪噜、BTGo、九妖、巴兔等主流盒子的真实折扣力度...',
    category: '省钱指南',
    categoryColor: 'bg-orange-500',
    date: '2025-05-10',
    views: '2.5w',
  },
  {
    slug: 'mobile-mmo-top10-2025',
    title: '2025 手游 MMO 推荐榜：10 款值得肝的长线大作',
    description: '从画面、玩法、氪金友好度三维度评测2025年最值得玩的MMO...',
    category: '游戏评测',
    categoryColor: 'bg-purple-600',
    date: '2025-05-08',
    views: '3.1w',
  },
]

export default function HomePage() {
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

      {/* Featured Articles (SEO Entry Points) */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">热门攻略 & 评测</h2>
            <p className="text-slate-400 text-sm">深度的游戏解析，帮你避坑省钱</p>
          </div>
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0" asChild>
            <Link href="/articles">
              全部文章 <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`}>
              <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer group h-full">
                <div className="aspect-video bg-slate-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold">Article Cover</div>
                  <Badge className={`absolute top-2 left-2 ${article.categoryColor} hover:opacity-90`}>{article.category}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{article.date}</span>
                    <span>阅读 {article.views}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Access - Game Boxes */}
      <section className="py-16 bg-slate-900/50 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">热门游戏盒子</h2>
              <p className="text-slate-400 text-sm">精选全网优质福利盒子</p>
            </div>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0" asChild>
              <Link href="/boxes">
                查看全部 <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: '咪噜盒子', color: 'bg-orange-500', discount: '0.1折', text: '咪' },
              { name: 'BTGo变态版', color: 'bg-green-500', discount: 'GM权限', text: 'BT' },
              { name: '九妖游戏', color: 'bg-purple-600', discount: '4折', text: '九' },
              { name: '巴兔游戏', color: 'bg-blue-500', discount: '首充免费', text: '兔' },
            ].map((box, i) => (
              <Link key={i} href="/boxes">
                <Card className="bg-slate-900 border-slate-800 p-4 hover:border-slate-700 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-lg ${box.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {box.text}
                    </div>
                    <div>
                      <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{box.name}</div>
                      <div className="text-xs text-orange-400">{box.discount}</div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

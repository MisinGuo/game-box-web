import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// SSG: 文章列表页静态生成
export const dynamic = 'force-static'
export const revalidate = 86400 // 24小时

export const metadata: Metadata = {
  title: '攻略资讯 - 游戏攻略与评测',
  description: '提供最专业的游戏攻略、评测、省钱指南，帮助玩家快速上手，避坑省钱。',
}

// 模拟文章数据
const articles = [
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
  {
    slug: 'newbie-box-guide',
    title: '新手必看：游戏盒子入门指南',
    description: '什么是游戏盒子？BT版、折扣版有什么区别？一文搞懂...',
    category: '新手入门',
    categoryColor: 'bg-green-500',
    date: '2025-05-05',
    views: '5.2w',
  },
  {
    slug: 'gacha-save-money-tips',
    title: '抽卡游戏省钱攻略：如何用最少的钱获得最多的资源',
    description: '资深玩家总结的抽卡技巧和省钱心得，帮你少花冤枉钱...',
    category: '省钱指南',
    categoryColor: 'bg-orange-500',
    date: '2025-05-03',
    views: '4.8w',
  },
  {
    slug: 'idle-game-ranking-2025',
    title: '2025 挂机放置游戏推荐：适合上班族的10款游戏',
    description: '精选适合碎片时间玩的挂机游戏，轻松休闲也能变强...',
    category: '游戏评测',
    categoryColor: 'bg-purple-600',
    date: '2025-05-01',
    views: '2.8w',
  },
]

export default function ArticlesPage() {
  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">攻略资讯</h1>
          <p className="text-slate-400">深度的游戏解析，帮你避坑省钱</p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
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
                    <time dateTime={article.date}>{article.date}</time>
                    <span>阅读 {article.views}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

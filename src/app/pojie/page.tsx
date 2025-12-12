import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Gamepad2, Flame, TrendingUp, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { getPojieCategories, getPojieGamesByCategory, Article } from '@/lib/content'

export const metadata: Metadata = {
  title: '破解版游戏合集 - 0.1折无限福利版下载',
  description: '精选热门手游破解版下载，包含传奇、二次元、仙侠、三国等分类，无限钻石、满V福利、内置修改器，开局即送满级特权！',
  keywords: ['破解版', '手游破解', '无限钻石', '满V福利', '内置修改器'],
}

// SSG + ISR
export const dynamic = 'force-static'
export const revalidate = 86400

// 分类图标映射
const categoryIcons: Record<string, string> = {
  '传奇': '⚔️',
  '二次元': '🎭',
  '仙侠': '🌙',
  '三国': '🏯',
  '卡牌': '🃏',
  '回合': '♻️',
  '放置': '💤',
  '策略': '🎯',
  '模拟': '🏗️',
  '竞技': '🏆',
  '体育': '⚽',
  '武侠': '🥋',
  '养成': '🌱',
  '塔防': '🏰',
  '休闲': '🎮',
  '魔幻': '🔮',
  '消除': '💎',
  '宫斗': '👑',
  '女性向': '💖',
  'SLG': '🗺️',
}

export default async function PojieCategoriesPage() {
  const categories = await getPojieCategories()
  
  // 按热门程度排序（可以后续根据游戏数量或访问数据调整）
  const sortedCategories = categories.sort((a, b) => b.count - a.count)
  
  // 获取几个热门分类的游戏预览
  const topCategories = sortedCategories.slice(0, 4)
  const categoryPreviews = await Promise.all(
    topCategories.map(async (cat) => ({
      ...cat,
      games: await getPojieGamesByCategory(cat.name)
    }))
  )

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-slate-900 border-b border-slate-800 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 flex items-center text-sm text-slate-400">
          <Link href="/" className="hover:text-white">首页</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-white font-medium">破解版游戏</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            破解版游戏合集
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            精选{categories.length}大分类，覆盖传奇、二次元、仙侠等热门类型
            <br className="hidden md:block" />
            无限钻石 · 满V福利 · 首充0.1折
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-4 py-2">
              <Flame className="h-4 w-4 mr-1" />
              持续更新
            </Badge>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
              <Star className="h-4 w-4 mr-1" />
              安全无毒
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Hot Categories Preview */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            热门分类
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryPreviews.map((category) => (
              <Card 
                key={category.name}
                className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <span className="text-2xl">{categoryIcons[category.name] || '🎮'}</span>
                    {category.name}游戏
                    <Badge variant="outline" className="ml-auto text-slate-500">
                      {category.count}款
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    精选{category.name}类破解版手游，上线即送满V福利
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.games.slice(0, 5).map((game) => (
                      <Link 
                        key={game.slug}
                        href={`/pojie/${game.slug}`}
                        className="text-sm text-slate-400 hover:text-orange-400 transition-colors truncate max-w-[150px]"
                      >
                        {(game.frontmatter.title || game.slug).replace(/[?？].*/g, '').split(/[,，]/)[0].substring(0, 12)}
                      </Link>
                    ))}
                    {category.count > 5 && (
                      <span className="text-sm text-slate-600">+{category.count - 5}款</span>
                    )}
                  </div>
                  <Link 
                    href={`/pojie?category=${encodeURIComponent(category.name)}`}
                    className="inline-flex items-center text-orange-400 hover:text-orange-300 text-sm font-medium"
                  >
                    查看全部
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Categories Grid */}
        <section>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-blue-500" />
            全部分类
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedCategories.map((category) => (
              <Link 
                key={category.name}
                href={`/pojie?category=${encodeURIComponent(category.name)}`}
                className="group"
              >
                <Card className="bg-slate-900 border-slate-800 hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10 h-full">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">
                      {categoryIcons[category.name] || '🎮'}
                    </div>
                    <p className="font-medium text-white group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {category.count}款游戏
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            还没找到想玩的游戏？
          </h2>
          <p className="text-slate-400 mb-6 max-w-xl mx-auto">
            下载游戏盒子，一键获取5000+款破解版手游，每日更新，首充低至0.1折
          </p>
          <Link 
            href="/boxes"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transition-all"
          >
            下载游戏盒子
          </Link>
        </section>
      </div>
    </div>
  )
}

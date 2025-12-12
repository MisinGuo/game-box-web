import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, BookOpen, Calendar, Clock, Search, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getStrategyArticles, Article } from '@/lib/content'

export const metadata: Metadata = {
  title: '游戏攻略大全 - 热门手游通关攻略',
  description: '精选热门手游攻略，包含新手入门、角色培养、通关技巧等内容，助你快速上手游戏！',
  keywords: ['游戏攻略', '手游攻略', '通关攻略', '新手攻略', '角色培养'],
}

// SSG + ISR
export const dynamic = 'force-static'
export const revalidate = 86400

// 按年月分组文章
function groupArticlesByDate(articles: Article[]) {
  const groups: Record<string, Article[]> = {}
  
  for (const article of articles) {
    const date = article.frontmatter.date || ''
    const yearMonth = date.substring(0, 7) // 2025-01 格式
    
    if (!groups[yearMonth]) {
      groups[yearMonth] = []
    }
    groups[yearMonth].push(article)
  }
  
  // 按日期倒序排列组
  return Object.entries(groups)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([yearMonth, articles]) => ({
      yearMonth,
      label: yearMonth.replace('-', '年') + '月',
      articles: articles.sort((a, b) => 
        (b.frontmatter.date || '').localeCompare(a.frontmatter.date || '')
      ),
    }))
}

export default async function StrategyListPage() {
  const articles = await getStrategyArticles()
  const groupedArticles = groupArticlesByDate(articles)
  
  // 获取最新的几篇文章作为推荐
  const latestArticles = articles
    .sort((a, b) => (b.frontmatter.date || '').localeCompare(a.frontmatter.date || ''))
    .slice(0, 5)

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="bg-slate-900 border-b border-slate-800 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 flex items-center text-sm text-slate-400">
          <Link href="/" className="hover:text-white">首页</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-white font-medium">游戏攻略</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-12 border-b border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            游戏攻略大全
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-6">
            精选热门手游攻略，从新手入门到进阶技巧，助你快速成为游戏高手
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              placeholder="搜索攻略..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <main className="lg:col-span-8">
          {/* Latest Articles */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              最新攻略
            </h2>
            <div className="space-y-4">
              {latestArticles.map((article) => (
                <Link 
                  key={article.slug}
                  href={`/strategy/${article.slug}`}
                  className="block group"
                >
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all hover:shadow-lg">
                    <CardContent className="p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white group-hover:text-orange-400 transition-colors truncate">
                          {article.frontmatter.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {article.frontmatter.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {article.readingTime}分钟
                          </span>
                          {article.frontmatter.category && (
                            <Badge variant="outline" className="text-xs text-slate-400 border-slate-700">
                              {article.frontmatter.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-600 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Articles by Month */}
          {groupedArticles.map((group) => (
            <section key={group.yearMonth} className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                {group.label}
                <Badge variant="outline" className="ml-2 text-xs text-slate-500 border-slate-700">
                  {group.articles.length}篇
                </Badge>
              </h2>
              <div className="space-y-2">
                {group.articles.map((article) => (
                  <Link 
                    key={article.slug}
                    href={`/strategy/${article.slug}`}
                    className="flex items-center gap-3 px-4 py-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-800 rounded-lg group transition-colors"
                  >
                    <span className="text-xs text-slate-500 w-12 flex-shrink-0">
                      {article.frontmatter.date?.substring(5) || '-'}
                    </span>
                    <span className="text-slate-300 group-hover:text-orange-400 transition-colors truncate flex-1">
                      {article.frontmatter.title}
                    </span>
                    <span className="text-xs text-slate-600 flex-shrink-0">
                      {article.readingTime}分钟
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}

          {articles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-500">暂无攻略文章</p>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Stats */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-4">攻略统计</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-orange-400">{articles.length}</p>
                    <p className="text-xs text-slate-500">总攻略数</p>
                  </div>
                  <div className="text-center p-3 bg-slate-800 rounded-lg">
                    <p className="text-2xl font-bold text-blue-400">{groupedArticles.length}</p>
                    <p className="text-xs text-slate-500">更新月份</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-white mb-2">想要更多游戏福利？</h3>
                <p className="text-sm text-slate-400 mb-4">
                  下载游戏盒子，获取攻略中的所有游戏
                </p>
                <Link 
                  href="/boxes"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all text-sm"
                >
                  立即下载
                </Link>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <h3 className="font-bold text-white mb-4">快捷导航</h3>
                <div className="space-y-2">
                  <Link 
                    href="/pojie"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <span>🎮</span>
                    破解版游戏
                  </Link>
                  <Link 
                    href="/boxes"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <span>📦</span>
                    游戏盒子下载
                  </Link>
                  <Link 
                    href="/games"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    <span>🎯</span>
                    游戏库
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  )
}

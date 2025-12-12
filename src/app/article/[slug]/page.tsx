import { Metadata } from 'next'
import Link from 'next/link'
import { Share2, Bookmark, ThumbsUp, ChevronRight, Download, Zap, Shield, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArticleMobileBar } from './ArticleMobileBar'

// SSG + ISR: 文章页面静态生成，24小时重新验证
export const dynamic = 'force-static'
export const revalidate = 86400 // 24小时

// 模拟文章数据库
const articles: Record<string, {
  title: string
  description: string
  game: string
  category: string
  date: string
  views: string
  content: string
}> = {
  'dragon-reborn-2025-class-guide': {
    title: '龍族重生2025：各职业高效输出手法全解析',
    description: '本文以实际对局经验为依据，帮助你在龍族重生2025中快速提升DPS，找到最适合自己的打法。',
    game: '龍族重生2025',
    category: '进阶攻略',
    date: '2025-05-12',
    views: '12,304',
    content: 'article-content',
  },
  'box-discount-compare-2025': {
    title: '2025 六大游戏盒子折扣对比：哪家最省钱？',
    description: '实测对比咪噜、BTGo、九妖、巴兔等主流盒子的真实折扣力度，帮你找到最省钱的下载渠道。',
    game: '多款游戏',
    category: '省钱指南',
    date: '2025-05-10',
    views: '25,481',
    content: 'article-content',
  },
  'mobile-mmo-top10-2025': {
    title: '2025 手游 MMO 推荐榜：10 款值得肝的长线大作',
    description: '从画面、玩法、氪金友好度三维度评测2025年最值得玩的MMO手游。',
    game: 'MMO合集',
    category: '游戏评测',
    date: '2025-05-08',
    views: '31,205',
    content: 'article-content',
  },
}

// 生成静态路径
export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }))
}

// 动态生成 Metadata（SEO）
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  
  if (!article) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export default async function ArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-slate-400 mb-6">文章未找到</p>
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 min-h-screen pb-20 md:pb-0">
      {/* Breadcrumbs - SEO 面包屑导航 */}
      <nav className="bg-slate-900 border-b border-slate-800 py-3" aria-label="Breadcrumb">
        <div className="container mx-auto px-4 flex items-center text-sm text-slate-400">
          <Link href="/" className="hover:text-white">首页</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/articles" className="hover:text-white">攻略资讯</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white font-medium">{article.game}</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Article Content */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-slate max-w-none">
            {/* Title Section */}
            <header className="mb-8">
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
                  {article.game}
                </Badge>
                <Badge variant="outline" className="text-slate-400 border-slate-700">
                  {article.category}
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="text-sm text-slate-400 border-l-4 border-blue-600 pl-4 py-1 bg-slate-900/50 rounded-r">
                <p>{article.description}</p>
              </div>
              <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
                <time dateTime={article.date}>{article.date} 发布</time>
                <span>阅读 {article.views}</span>
                <div className="flex gap-2 ml-auto">
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><ThumbsUp className="h-4 w-4" /> 赞</Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><Bookmark className="h-4 w-4" /> 收藏</Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><Share2 className="h-4 w-4" /> 分享</Button>
                </div>
              </div>
            </header>

            <Separator className="my-8 bg-slate-800" />

            {/* Content Body */}
            <div className="space-y-8 text-slate-300">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded bg-blue-600 text-white text-lg">1</span>
                  近战职业：狂战、刺客、守护者的核心循环
                </h2>
                
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">1.1 狂战 (Berserker)</h3>
                <p className="mb-4">
                  狂战士的核心在于怒气控制。在怒气达到 80% 时开启【血怒】是爆发的关键。
                </p>
                
                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden my-6">
                  <Table>
                    <TableHeader className="bg-slate-800/50">
                      <TableRow className="hover:bg-transparent border-slate-700">
                        <TableHead className="text-slate-200">环节</TableHead>
                        <TableHead className="text-slate-200">关键技能</TableHead>
                        <TableHead className="text-slate-200">使用顺序</TableHead>
                        <TableHead className="text-slate-200">小技巧</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-blue-400">起手</TableCell>
                        <TableCell>怒涛冲击</TableCell>
                        <TableCell>1. 冲锋至目标<br/>2. 血怒斩 (近战连击)</TableCell>
                        <TableCell className="text-sm text-slate-400">冲锋命中后立刻接血怒斩，可触发怒气叠加加成。</TableCell>
                      </TableRow>
                      <TableRow className="border-slate-800 hover:bg-slate-800/30">
                        <TableCell className="font-medium text-green-400">主循环</TableCell>
                        <TableCell>狂暴连斩 + 毁灭打击</TableCell>
                        <TableCell>3. 狂暴连斩 (3段)<br/>4. 毁灭打击 (单体高爆)</TableCell>
                        <TableCell className="text-sm text-slate-400">每完成一次狂暴连斩，立即使用毁灭打击。</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-amber-900/20 border border-amber-900/50 rounded-lg p-4 my-6">
                  <h4 className="text-amber-500 font-bold mb-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" /> 实用 Tip
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-200/80 text-sm">
                    <li><strong>怒气管理：</strong> 怒气上限为100，冲锋和狂暴连斩均会产生怒气。保持怒气在80-100之间。</li>
                    <li><strong>位置选择：</strong> 狂战的范围技能对站位要求不高，但在多人混战时尽量站在敌人中心。</li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-white mt-8 mb-3">1.2 刺客 (Assassin)</h3>
                <p>
                  刺客通过背击获得额外 50% 暴击率。因此，永远不要在正面输出。
                </p>
                <p className="mt-4">
                  (更多职业攻略内容...)
                </p>
              </section>

              {/* In-article CTA */}
              <div className="my-12 p-6 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/50 rounded-xl text-center">
                <h3 className="text-lg font-bold text-white mb-2">想要体验全职业满级快感？</h3>
                <p className="text-slate-400 mb-4 text-sm">使用 <span className="text-orange-400 font-bold">咪噜游戏盒子</span> 下载本游戏，上线送 VIP10 + 10万钻石。</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8" asChild>
                  <Link href="/boxes">立即下载领取福利</Link>
                </Button>
              </div>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded bg-blue-600 text-white text-lg">2</span>
                  远程职业输出手法
                </h2>
                <p>
                  远程职业需要保持距离，利用地形进行风筝...
                </p>
              </section>
            </div>
          </article>
        </div>

        {/* Right Column: Conversion Sticky Sidebar */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            
            {/* Module 1: Game Box List */}
            <Card className="bg-slate-900 border-slate-800 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Download className="h-4 w-4" /> 下载本游戏
                </h3>
              </div>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-800">
                  {/* Box Item 1 */}
                  <div className="p-4 hover:bg-slate-800/50 transition-colors">
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        咪
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">咪噜盒子</h4>
                          <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/20 text-[10px] px-1 h-5">
                            0.1折
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">上线送VIP10 · 充值648仅需6.48元</p>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 h-9 text-sm font-semibold">
                      用咪噜下载 (推荐)
                    </Button>
                  </div>

                  {/* Box Item 2 */}
                  <div className="p-4 hover:bg-slate-800/50 transition-colors">
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                        BT
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">BTGo盒子</h4>
                          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20 text-[10px] px-1 h-5">
                            福利版
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">送无限钻石 · 每日领648代金券</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 h-9 text-sm">
                      下载 BTGo 版
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Module 2: Discount Comparison */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white flex items-center gap-2">
                  <Gift className="h-4 w-4 text-purple-400" /> 折扣与福利对比
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">官方原版</span>
                    <span className="text-slate-200">无折扣 / 需肝</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">咪噜盒子版</span>
                    <span className="font-bold text-orange-400">首充 0.1 折</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">BTGo版</span>
                    <span className="font-bold text-green-400">上线送满V</span>
                  </div>
                </div>
                <div className="mt-4 bg-slate-950 p-3 rounded text-xs text-slate-400">
                  <p className="flex items-start gap-2">
                    <Shield className="h-3 w-3 mt-0.5 text-blue-400 shrink-0" />
                    平台担保：所有推荐盒子均为官方授权运营，充值安全有保障。
                  </p>
                </div>
              </CardContent>
            </Card>

          </div>
        </aside>
      </div>

      {/* Mobile Bottom Floating Bar - 客户端组件 */}
      <ArticleMobileBar gameName={article.game} />
    </div>
  )
}

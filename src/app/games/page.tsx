import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Star, Shield, Check, X, Download, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getPojieArticles } from '@/lib/content'

// SSG: 游戏库页面静态生成
export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = {
  title: '游戏库 - 热门游戏折扣对比',
  description: '发现热门游戏在各大盒子的折扣对比，找到最省钱的下载渠道。',
}

export default async function GamesPage() {
  // 获取真实的破解游戏数据
  const pojieGames = await getPojieArticles()
  const featuredGames = pojieGames.slice(0, 12)

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 mb-8 text-sm text-slate-400 flex items-center">
        <Link href="/" className="hover:text-white">首页</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-white">游戏库</span>
      </nav>

      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">游戏库</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            发现热门游戏在各大盒子的折扣对比，找到最省钱的下载渠道
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {featuredGames.map((game) => (
            <Link key={game.slug} href={`/pojie/${game.slug}`}>
              <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-orange-500/50 transition-colors cursor-pointer group h-full">
                <div className="aspect-square bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-orange-900/30 to-red-900/30">
                    <Gamepad2 className="h-12 w-12 text-slate-600" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-orange-500/90 text-xs">0.1折</Badge>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
                    {game.subcategory || game.frontmatter.title?.split('?')[0].split(',')[0].substring(0, 12) || '游戏'}
                  </h3>
                  <p className="text-xs text-slate-500">{game.category}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Box Comparison Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-500" />
            热门游戏盒子折扣对比
          </h2>
            
            <Card className="bg-slate-900 border-slate-800 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-950">
                  <TableRow className="border-slate-800">
                    <TableHead className="text-slate-300 w-[180px]">游戏盒子</TableHead>
                    <TableHead className="text-slate-300">充值折扣</TableHead>
                    <TableHead className="text-slate-300 hidden md:table-cell">独家福利</TableHead>
                    <TableHead className="text-slate-300 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
                          咪
                        </div>
                        <div>
                          <div className="font-bold text-white">咪噜盒子</div>
                          <div className="text-xs text-green-400">官方推荐</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-orange-400 text-lg">0.1 折</div>
                      <div className="text-xs text-slate-500">首充续充统统0.1</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 上线送满V</li>
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 送100万钻石</li>
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        下载此版
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-green-500 flex items-center justify-center text-white font-bold shrink-0">
                          BT
                        </div>
                        <div>
                          <div className="font-bold text-white">BTGo盒子</div>
                          <div className="text-xs text-slate-500">变态版</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-green-400 text-lg">免费</div>
                      <div className="text-xs text-slate-500">送无限元宝</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> GM权限</li>
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 无限资源</li>
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        下载此版
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                          九
                        </div>
                        <div>
                          <div className="font-bold text-white">九妖游戏</div>
                          <div className="text-xs text-slate-500">折扣版</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-purple-400 text-lg">4 折</div>
                      <div className="text-xs text-slate-500">老牌平台</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 代金券</li>
                        <li className="flex items-center gap-1"><X className="h-3 w-3 text-slate-600" /> 无满V</li>
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        下载此版
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
        </section>

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">想要更多游戏？</h2>
            <p className="text-slate-400 mb-6">浏览完整的破解版游戏库，发现更多福利</p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/pojie">
                <Download className="h-5 w-5 mr-2" />
                浏览破解版游戏
              </Link>
            </Button>
          </Card>
        </section>
      </div>
    </div>
  )
}

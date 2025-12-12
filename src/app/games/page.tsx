import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Star, Shield, Check, X, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// SSR: 游戏库页面服务端渲染
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '游戏库 - 热门游戏折扣对比',
  description: '发现热门游戏在各大盒子的折扣对比，找到最省钱的下载渠道。',
}

// 模拟从API获取游戏数据
async function getGames() {
  // 实际项目中这里会从API获取数据
  return [
    {
      id: 'dragon-reborn-2025',
      name: '龍族重生2025',
      category: 'MMORPG',
      tags: ['魔幻', '3D'],
      description: '2025年度旗舰魔幻大作，真4K画质。多职业自由转职，开放世界自由探索。',
      rating: 4.8,
      reviews: '1.2w',
      boxCount: 5,
      minDiscount: '0.1折',
    },
    {
      id: 'legend-of-mir-classic',
      name: '传奇世界经典版',
      category: '传奇',
      tags: ['PK', '复古'],
      description: '经典传奇玩法，重温热血沙巴克。',
      rating: 4.5,
      reviews: '8.5k',
      boxCount: 8,
      minDiscount: '0.5折',
    },
    {
      id: 'idle-heroes-2025',
      name: '放置英雄2025',
      category: '挂机放置',
      tags: ['卡牌', '放置'],
      description: '挂机也能变强，碎片时间轻松玩。',
      rating: 4.6,
      reviews: '6.2k',
      boxCount: 4,
      minDiscount: '1折',
    },
  ]
}

export default async function GamesPage() {
  const games = await getGames()
  const featuredGame = games[0]

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      {/* Breadcrumbs */}
      <nav className="container mx-auto px-4 mb-8 text-sm text-slate-400 flex items-center">
        <Link href="/" className="hover:text-white">首页</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-white">游戏库</span>
      </nav>

      <div className="container mx-auto px-4">
        {/* Featured Game Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-slate-800 shrink-0 overflow-hidden shadow-2xl ring-1 ring-slate-700">
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-500">
              Game Icon
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-blue-600 hover:bg-blue-700">{featuredGame.category}</Badge>
              {featuredGame.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-slate-400">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{featuredGame.name}</h1>
            <p className="text-slate-400 max-w-2xl mb-6">
              {featuredGame.description}
              当前全网共有 <span className="text-orange-400 font-bold">{featuredGame.boxCount}</span> 个优质盒子收录，最低折扣 <span className="text-orange-400 font-bold">{featuredGame.minDiscount}</span>。
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-xl">{featuredGame.rating}</span>
                <span className="text-slate-500 text-sm ml-1">({featuredGame.reviews} 评分)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Comparison Table */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              全网盒子折扣对比
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
          </div>

          {/* Game Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">游戏信息</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-400">类型</dt>
                  <dd className="text-white">{featuredGame.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">评分</dt>
                  <dd className="text-white flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    {featuredGame.rating}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">收录盒子</dt>
                  <dd className="text-white">{featuredGame.boxCount} 个</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-400">最低折扣</dt>
                  <dd className="text-orange-400 font-bold">{featuredGame.minDiscount}</dd>
                </div>
              </dl>
            </Card>

            <Card className="bg-slate-900 border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4">相关攻略</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/article/dragon-reborn-2025-class-guide" className="text-slate-400 hover:text-blue-400 text-sm block">
                    → 各职业高效输出手法全解析
                  </Link>
                </li>
                <li>
                  <Link href="/article/box-discount-compare-2025" className="text-slate-400 hover:text-blue-400 text-sm block">
                    → 六大游戏盒子折扣对比
                  </Link>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* More Games Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">更多热门游戏</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.slice(1).map((game) => (
              <Card key={game.id} className="bg-slate-900 border-slate-800 p-4 hover:border-slate-700 transition-colors">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                    Icon
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">{game.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Badge variant="outline" className="text-xs">{game.category}</Badge>
                      <span className="text-orange-400">{game.minDiscount}</span>
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">{game.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

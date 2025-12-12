import React from 'react';
import { ChevronRight, Smartphone, Monitor, Check, X, Shield, Star, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function GameComparePage() {
  return (
    <div className="bg-slate-950 min-h-screen py-8">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8 text-sm text-slate-400 flex items-center">
        <span className="hover:text-white cursor-pointer">首页</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="hover:text-white cursor-pointer">游戏库</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-white">龍族重生2025</span>
      </div>

      <div className="container mx-auto px-4">
        {/* Game Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-slate-800 shrink-0 overflow-hidden shadow-2xl ring-1 ring-slate-700">
            {/* Placeholder for Game Icon */}
            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-500">
              Game Icon
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge className="bg-blue-600 hover:bg-blue-700">MMORPG</Badge>
              <Badge variant="outline" className="text-slate-400">魔幻</Badge>
              <Badge variant="outline" className="text-slate-400">3D</Badge>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">龍族重生2025</h1>
            <p className="text-slate-400 max-w-2xl mb-6">
              2025年度旗舰魔幻大作，真4K画质。多职业自由转职，开放世界自由探索。
              当前全网共有 <span className="text-orange-400 font-bold">5</span> 个优质盒子收录，最低折扣 <span className="text-orange-400 font-bold">0.1折</span>。
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold text-xl">4.8</span>
                <span className="text-slate-500 text-sm ml-1">(1.2w 评分)</span>
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
                  {/* Row 1 */}
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

                  {/* Row 2 */}
                  <TableRow className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-green-500 flex items-center justify-center text-white font-bold shrink-0">
                          BT
                        </div>
                        <div>
                          <div className="font-bold text-white">BTGo盒子</div>
                          <div className="text-xs text-slate-500">福利超多</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-green-400 text-lg">送GM</div>
                      <div className="text-xs text-slate-500">内置GM工具</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <ul className="text-xs text-slate-400 space-y-1">
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 无限元宝</li>
                        <li className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> 每日送648</li>
                      </ul>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                        下载此版
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* Row 3 */}
                  <TableRow className="border-slate-800 hover:bg-slate-800/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-700 flex items-center justify-center text-white font-bold shrink-0">
                          官
                        </div>
                        <div>
                          <div className="font-bold text-white">官方原版</div>
                          <div className="text-xs text-slate-500">应用商店版</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-400">无折扣</div>
                      <div className="text-xs text-slate-500">原价充值</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-xs text-slate-500">无特殊福利</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="text-slate-500 hover:text-white">
                        查看详情
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>

            {/* Game Gallery / Info Tabs */}
            <div className="mt-8">
              <Tabs defaultValue="intro" className="w-full">
                <TabsList className="bg-slate-900 border border-slate-800 text-slate-400">
                  <TabsTrigger value="intro" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">游戏简介</TabsTrigger>
                  <TabsTrigger value="welfare" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">通用福利</TabsTrigger>
                  <TabsTrigger value="comment" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">玩家评价</TabsTrigger>
                </TabsList>
                <TabsContent value="intro" className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mt-4 text-slate-300 leading-relaxed">
                  <p>
                    《龍族重生2025》是一款采用次世代引擎打造的魔幻MMORPG手游。游戏拥有宏大的世界观，极致的画面表现，以及丰富多样的玩法。
                    玩家可以选择多种职业，自由搭配技能，与盟友一起征战沙场。
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-slate-800 h-24 rounded flex items-center justify-center text-xs text-slate-500">截图预览 1</div>
                    <div className="bg-slate-800 h-24 rounded flex items-center justify-center text-xs text-slate-500">截图预览 2</div>
                    <div className="bg-slate-800 h-24 rounded flex items-center justify-center text-xs text-slate-500">截图预览 3</div>
                    <div className="bg-slate-800 h-24 rounded flex items-center justify-center text-xs text-slate-500">截图预览 4</div>
                  </div>
                </TabsContent>
                <TabsContent value="welfare" className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 mt-4">
                  <p className="text-slate-300">各版本通用礼包码：</p>
                  <div className="flex gap-4 mt-2">
                    <code className="bg-slate-950 px-3 py-1 rounded text-orange-400 border border-orange-500/20">VIP666</code>
                    <code className="bg-slate-950 px-3 py-1 rounded text-orange-400 border border-orange-500/20">LZ2025</code>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar - Hot Games */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-bold text-white mb-4">猜你喜欢</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3 items-center group cursor-pointer">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg shrink-0 overflow-hidden">
                    {/* Placeholder */}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">暗黑起源:觉醒</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="text-[10px] h-4 px-1 bg-red-500/10 text-red-400">热门</Badge>
                      <span className="text-xs text-slate-500">MMO</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

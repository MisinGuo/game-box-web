import React, { useState, useEffect } from 'react';
import { Share2, Bookmark, ThumbsUp, ChevronRight, Download, Zap, Shield, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { Separator } from '../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export function ArticlePage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen pb-20 md:pb-0">
      {/* Breadcrumbs */}
      <div className="bg-slate-900 border-b border-slate-800 py-3">
        <div className="container mx-auto px-4 flex items-center text-sm text-slate-400">
          <span className="hover:text-white cursor-pointer">首页</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="hover:text-white cursor-pointer">攻略资讯</span>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-white font-medium">龍族重生2025攻略</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Article Content (approx 65-70%) */}
        <div className="lg:col-span-8">
          <article className="prose prose-invert prose-slate max-w-none">
            {/* Title Section */}
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
                  龍族重生2025
                </Badge>
                <Badge variant="outline" className="text-slate-400 border-slate-700">
                  进阶攻略
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                龍族重生2025：各职业高效输出手法全解析
              </h1>
              <div className="flex items-center justify-between text-sm text-slate-400 border-l-4 border-blue-600 pl-4 py-1 bg-slate-900/50 rounded-r">
                <p>
                  本文以实际对局经验为依据，帮助你在 <strong>龍族重生2025</strong> 中快速提升 DPS，找到最适合自己的打法。
                  文中会自然提到我们平台的下载便利与独特优势，供你参考。
                </p>
              </div>
              <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
                <span>2025-05-12 发布</span>
                <span>阅读 12,304</span>
                <div className="flex gap-2 ml-auto">
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><ThumbsUp className="h-4 w-4" /> 赞</Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><Bookmark className="h-4 w-4" /> 收藏</Button>
                  <Button variant="ghost" size="sm" className="h-8 gap-1"><Share2 className="h-4 w-4" /> 分享</Button>
                </div>
              </div>
            </div>

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
                {/* Simplified content for demo */}
                <p className="mt-4">
                  (更多职业攻略内容...)
                </p>
              </section>

              {/* In-article CTA */}
              <div className="my-12 p-6 bg-gradient-to-r from-blue-900/40 to-slate-900 border border-blue-800/50 rounded-xl text-center">
                <h3 className="text-lg font-bold text-white mb-2">想要体验全职业满级快感？</h3>
                <p className="text-slate-400 mb-4 text-sm">使用 <span className="text-orange-400 font-bold">咪噜游戏盒子</span> 下载本游戏，上线送 VIP10 + 10万钻石。</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8">
                  立即下载领取福利
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

        {/* Right Column: Conversion Sticky Sidebar (approx 35%) */}
        <div className="hidden lg:block lg:col-span-4">
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
        </div>
      </div>

      {/* Mobile Bottom Floating Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 lg:hidden z-40 flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
        <div className="flex-1">
          <p className="text-xs text-slate-400 mb-1">龙族重生2025</p>
          <div className="text-sm font-bold text-white">
            <span className="text-orange-400">0.1折</span> 起下载
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-900/20">
              查看可用盒子
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-slate-950 border-slate-800 text-slate-100 min-h-[50vh]">
            <div className="pt-4">
              <h3 className="text-lg font-bold text-white mb-4">选择下载渠道</h3>
              <div className="space-y-4">
                 {/* Reusing Box Item Structure for Mobile Sheet */}
                 <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        咪
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">咪噜盒子</h4>
                          <Badge className="bg-orange-500/20 text-orange-400">推荐</Badge>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">折扣力度：0.1折 · 充值648仅需6.48元</p>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold">
                      立即下载 (0.1折)
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <div className="flex gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                        BT
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white">BTGo盒子</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">福利：送无限钻石 · 满级VIP</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                      下载 BTGo 版
                    </Button>
                  </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

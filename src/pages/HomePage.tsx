import React from 'react';
import { ArrowRight, Flame, Gift, BookOpen, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
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
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg font-bold" onClick={() => onNavigate('box-list')}>
              浏览盒子大全
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800" onClick={() => onNavigate('guides')}>
              查看游戏攻略
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
          <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0" onClick={() => onNavigate('guides')}>
            全部文章 <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Article Card 1 */}
          <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer group" onClick={() => onNavigate('guides')}>
            <div className="aspect-video bg-slate-800 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold">Article Cover</div>
               <Badge className="absolute top-2 left-2 bg-blue-600 hover:bg-blue-700">进阶攻略</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                龍族重生2025：各职业高效输出手法全解析
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                本文以实际对局经验为依据，帮助你在龍族重生2025中快速提升DPS...
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>2025-05-12</span>
                <span>阅读 1.2w</span>
              </div>
            </CardContent>
          </Card>

           {/* Article Card 2 */}
           <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer group">
            <div className="aspect-video bg-slate-800 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold">Article Cover</div>
               <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">省钱指南</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                2025年十大良心BT手游盒子盘点，这款竟然送真充？
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                拒绝假福利，实测10款热门盒子，揭秘谁才是真正的白嫖之王...
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>2025-05-10</span>
                <span>阅读 8k</span>
              </div>
            </CardContent>
          </Card>

           {/* Article Card 3 */}
           <Card className="bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors cursor-pointer group">
            <div className="aspect-video bg-slate-800 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-bold">Article Cover</div>
               <Badge className="absolute top-2 left-2 bg-purple-600 hover:bg-purple-700">新游评测</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                《神魔纪元》首发测评：画质炸裂，但逼氪程度如何？
              </h3>
              <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                3D魔幻大作今日公测，小编第一时间试玩，带你看清游戏真面目...
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>2025-05-08</span>
                <span>阅读 5k</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Boxes Section */}
      <section className="py-16 container mx-auto px-4 border-t border-slate-800">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">精选游戏盒子</h2>
            <p className="text-slate-400 text-sm">官方授权，安全稳定，福利最好</p>
          </div>
           <Button variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-transparent p-0" onClick={() => onNavigate('box-list')}>
            全部盒子 <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: '咪噜盒子', color: 'bg-orange-500', txt: '咪', tag: '0.1折' },
            { name: 'BTGo', color: 'bg-green-500', txt: 'BT', tag: '送GM' },
            { name: '九妖', color: 'bg-purple-600', txt: '九', tag: '4折' },
            { name: '爱趣', color: 'bg-red-500', txt: '趣', tag: '返利' },
          ].map((box, i) => (
             <Card key={i} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-1">
               <CardContent className="p-6 flex flex-col items-center text-center">
                 <div className={`w-16 h-16 rounded-2xl ${box.color} flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg`}>
                   {box.txt}
                 </div>
                 <h3 className="font-bold text-white mb-1">{box.name}</h3>
                 <Badge variant="secondary" className="mb-4 bg-slate-800 text-slate-300">{box.tag}</Badge>
                 <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white" onClick={() => onNavigate('box-list')}>
                   查看详情
                 </Button>
               </CardContent>
             </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

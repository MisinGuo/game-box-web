import React, { useState } from 'react';
import { Filter, Search, Smartphone, Monitor } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet';
import { BoxCard } from '../components/common/BoxCard';

export function BoxListPage() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">平台类型</h3>
        <div className="space-y-2">
          {['官方正版', 'BT福利版', '折扣端', '海外版'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item} className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <Label htmlFor={item} className="text-slate-300 font-normal cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">支持设备</h3>
        <div className="space-y-2">
          {['Android', 'iOS', 'H5 / Web', 'PC 模拟器'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={item} className="border-slate-600 data-[state=checked]:bg-blue-600" />
              <Label htmlFor={item} className="text-slate-300 font-normal cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">热门游戏类型</h3>
        <div className="flex flex-wrap gap-2">
          {['MMO', '卡牌', 'SLG', '传奇', '二次元', '挂机'].map((tag) => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="cursor-pointer hover:bg-slate-800 border-slate-700 text-slate-400 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">游戏盒子大全</h1>
            <p className="text-slate-400">收录全网 50+ 优质游戏盒子，一站式对比选择</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="搜索盒子名称..." 
                className="pl-9 bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-blue-500"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden border-slate-800 text-slate-300">
                  <Filter className="h-4 w-4 mr-2" /> 筛选
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-slate-950 border-r border-slate-800 w-[300px]">
                <div className="mt-6">
                  <FilterSection />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Filters - Desktop Only */}
          <div className="hidden md:block col-span-3">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 sticky top-24">
              <FilterSection />
            </div>
          </div>

          {/* Right Box List */}
          <div className="col-span-1 md:col-span-9 space-y-4">
            <BoxCard 
              name="咪噜游戏盒子"
              logoColor="bg-orange-500"
              logoText="咪"
              description="全网最大的BT/折扣游戏平台，上线送VIP，充值自动打折。"
              tags={['0.1折', '上线送V', '官方授权']}
              gameCount={5000}
              rating={4.9}
              discount="首充0.1折"
            />
            <BoxCard 
              name="BTGo 变态版"
              logoColor="bg-green-500"
              logoText="BT"
              description="主打变态福利，无限钻石元宝，适合白嫖玩家。"
              tags={['无限元宝', 'GM权限', '公益服']}
              gameCount={2300}
              rating={4.7}
              discount="送GM权限"
            />
             <BoxCard 
              name="九妖游戏"
              logoColor="bg-purple-600"
              logoText="九"
              description="老牌折扣平台，不仅有折扣还有大额代金券。"
              tags={['自动折扣', '积分兑换']}
              gameCount={3100}
              rating={4.6}
              discount="充值4折"
            />
             <BoxCard 
              name="巴兔游戏"
              logoColor="bg-blue-500"
              logoText="兔"
              description="新兴福利平台，二次元游戏较多，界面清爽无广告。"
              tags={['二次元', 'H5游戏', '免下载']}
              gameCount={1500}
              rating={4.8}
              discount="首充免费"
            />
            
            {/* Load More */}
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 px-8">
                加载更多盒子
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

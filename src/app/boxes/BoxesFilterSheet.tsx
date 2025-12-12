'use client'

import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

function FilterSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">平台类型</h3>
        <div className="space-y-2">
          {['官方正版', 'BT福利版', '折扣端', '海外版'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={`mobile-${item}`} className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" />
              <Label htmlFor={`mobile-${item}`} className="text-slate-300 font-normal cursor-pointer">{item}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">支持设备</h3>
        <div className="space-y-2">
          {['Android', 'iOS', 'H5 / Web', 'PC 模拟器'].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox id={`mobile-${item}`} className="border-slate-600 data-[state=checked]:bg-blue-600" />
              <Label htmlFor={`mobile-${item}`} className="text-slate-300 font-normal cursor-pointer">{item}</Label>
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
  )
}

export function BoxesFilterSheet() {
  return (
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
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface ArticleMobileBarProps {
  gameName: string
}

export function ArticleMobileBar({ gameName }: ArticleMobileBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 lg:hidden z-40 flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="flex-1">
        <p className="text-xs text-slate-400 mb-1">{gameName}</p>
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
  )
}

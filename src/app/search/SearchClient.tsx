'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Gamepad2, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SearchResult {
  type: 'pojie' | 'strategy'
  title: string
  slug: string
  category?: string
  date?: string
  excerpt?: string
}

// 客户端搜索组件
export default function SearchPageClient({ 
  allResults 
}: { 
  allResults: SearchResult[] 
}) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // 搜索过滤
  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    
    const searchTerm = query.toLowerCase()
    return allResults.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.category?.toLowerCase().includes(searchTerm) ||
      item.excerpt?.toLowerCase().includes(searchTerm)
    )
  }, [query, allResults])

  // 按类型分组
  const pojieResults = filteredResults.filter(r => r.type === 'pojie')
  const strategyResults = filteredResults.filter(r => r.type === 'strategy')

  // 当前显示的结果
  const displayResults = activeTab === 'all' 
    ? filteredResults 
    : activeTab === 'pojie' 
      ? pojieResults 
      : strategyResults

  return (
    <div className="bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* 搜索框 */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">搜索</h1>
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="搜索游戏、攻略..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-10 h-12 text-lg bg-slate-900 border-slate-700 text-white focus-visible:ring-blue-500"
              autoFocus
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* 搜索结果 */}
        {query.trim() ? (
          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="bg-slate-900 border border-slate-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-slate-800">
                  全部 ({filteredResults.length})
                </TabsTrigger>
                <TabsTrigger value="pojie" className="data-[state=active]:bg-slate-800">
                  <Gamepad2 className="h-4 w-4 mr-1" />
                  破解版 ({pojieResults.length})
                </TabsTrigger>
                <TabsTrigger value="strategy" className="data-[state=active]:bg-slate-800">
                  <BookOpen className="h-4 w-4 mr-1" />
                  攻略 ({strategyResults.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* 结果列表 */}
            {displayResults.length > 0 ? (
              <div className="space-y-4">
                {displayResults.map((result, index) => (
                  <Link 
                    key={`${result.type}-${result.slug}-${index}`}
                    href={`/${result.type}/${result.slug}`}
                  >
                    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            result.type === 'pojie' 
                              ? 'bg-orange-500/10 text-orange-400' 
                              : 'bg-blue-500/10 text-blue-400'
                          }`}>
                            {result.type === 'pojie' ? <Gamepad2 className="h-5 w-5" /> : <BookOpen className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className={`text-xs ${
                                result.type === 'pojie' 
                                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                                  : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                              }`}>
                                {result.type === 'pojie' ? '破解版' : '攻略'}
                              </Badge>
                              {result.category && (
                                <Badge variant="outline" className="text-xs text-slate-500 border-slate-700">
                                  {result.category}
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-white font-medium line-clamp-1 mb-1">
                              {result.title.split('?')[0].split(',')[0]}
                            </h3>
                            {result.date && (
                              <p className="text-xs text-slate-500">{result.date}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-slate-500 mb-2">没有找到相关结果</div>
                <p className="text-sm text-slate-600">尝试使用其他关键词搜索</p>
              </div>
            )}
          </div>
        ) : (
          /* 热门搜索 */
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-slate-400 mb-4">热门搜索</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {['传奇', '仙侠', '二次元', '三国', '卡牌', '放置', '火炬之光', '暗黑'].map((tag) => (
                <Badge 
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-slate-800 border-slate-700 text-slate-400 px-4 py-2"
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

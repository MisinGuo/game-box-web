'use client'

import Link from 'next/link'
import { ChevronRight, Calendar, Clock, BookOpen, Gamepad2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import MarkdownRenderer from './MarkdownRenderer'
import { DownloadBox, BackToListButton } from './DownloadBox'
import type { ModuleConfig } from '@/config'

interface ArticleFrontmatter {
  title: string
  date?: string
  category?: string
  tags?: string[]
  [key: string]: any
}

interface ArticleLayoutProps {
  config: ModuleConfig
  frontmatter: ArticleFrontmatter
  content: string
  readingTime: number
  toc?: { level: number; text: string; id: string }[]
  gameName?: string
}

/**
 * 通用文章布局组件
 * 根据模块配置动态渲染不同的布局和组件
 */
export function ArticleLayout({
  config,
  frontmatter,
  content,
  readingTime,
  toc = [],
  gameName,
}: ArticleLayoutProps) {
  const { theme, articleDetail, sidebar, downloadEntry } = config

  // 清理标题
  const cleanTitle = frontmatter.title
    .replace(/[?？]/g, ' - ')
    .split(/[,，;；]/)[0]
    .trim()

  return (
    <div className="bg-slate-950 min-h-screen pb-20 md:pb-0">
      {/* Breadcrumbs */}
      {articleDetail.showBreadcrumb && (
        <nav className="bg-slate-900 border-b border-slate-800 py-3" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 flex items-center text-sm text-slate-400 flex-wrap gap-1">
            <Link href="/" className="hover:text-white">首页</Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={config.routePrefix} className="hover:text-white">{config.title}</Link>
            {frontmatter.category && (
              <>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="text-white font-medium">{frontmatter.category}</span>
              </>
            )}
          </div>
        </nav>
      )}

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <article className={sidebar.enabled ? 'lg:col-span-8' : 'lg:col-span-12'}>
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex gap-2 mb-4 flex-wrap">
              <Badge variant="secondary" className={theme.badgeColor}>
                {config.type === 'pojie' ? (
                  <Gamepad2 className="h-3 w-3 mr-1" />
                ) : (
                  <BookOpen className="h-3 w-3 mr-1" />
                )}
                {theme.badgeText}
              </Badge>
              {frontmatter.category && (
                <Badge variant="outline" className="text-slate-400 border-slate-700">
                  {frontmatter.category}
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {cleanTitle}
            </h1>
            
            {articleDetail.showMeta && (
              <div className="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                {frontmatter.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {frontmatter.date}
                  </span>
                )}
                {articleDetail.showTOC && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    阅读约 {readingTime} 分钟
                  </span>
                )}
              </div>
            )}
          </header>

          <Separator className="my-6 bg-slate-800" />

          {/* Download Entry - In Content */}
          {downloadEntry.enabled && (downloadEntry.position === 'all' || downloadEntry.position === 'header') && (
            <DownloadBox config={config} gameName={gameName} />
          )}

          {/* Article Body */}
          <MarkdownRenderer content={content} />

          <Separator className="my-8 bg-slate-800" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <BackToListButton config={config} />
            
            {downloadEntry.enabled && (
              <Link 
                href={downloadEntry.buttonLink}
                className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-lg transition-all text-sm"
              >
                下载游戏盒子
              </Link>
            )}
          </div>
        </article>

        {/* Sidebar */}
        {sidebar.enabled && (
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              {sidebar.showTOC && toc.length > 0 && (
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-white mb-4">目录</h3>
                    <nav className="space-y-2">
                      {toc.map((item, index) => (
                        <a 
                          key={index}
                          href={`#${item.id}`}
                          className={`block text-sm text-slate-400 hover:text-orange-400 transition-colors ${
                            item.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </CardContent>
                </Card>
              )}

              {/* Download Box in Sidebar */}
              {sidebar.showDownload && (
                <DownloadBox config={config} gameName={gameName} />
              )}

              {/* Related Articles Placeholder */}
              {sidebar.showRelated && (
                <Card className="bg-slate-900 border-slate-800">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-white mb-4">相关{config.title}</h3>
                    <p className="text-sm text-slate-500">更多精彩内容即将上线...</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Bottom Bar - For pojie only */}
      {config.type === 'pojie' && downloadEntry.enabled && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 p-4 lg:hidden z-40 flex gap-4 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex-1">
            <p className="text-xs text-slate-400 mb-1">{gameName || cleanTitle}</p>
            <div className="text-sm font-bold text-white">
              <span className="text-orange-400">0.1折</span> 起下载
            </div>
          </div>
          <Link 
            href={downloadEntry.buttonLink}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold shadow-lg shadow-orange-900/20 rounded-md flex items-center justify-center"
          >
            立即下载
          </Link>
        </div>
      )}
    </div>
  )
}

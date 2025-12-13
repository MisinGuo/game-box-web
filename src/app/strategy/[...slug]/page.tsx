import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStrategyArticle, getStrategyArticles } from '@/lib/content'
import { getModuleConfig } from '@/config/modules'
import { ArticleLayout } from '@/components/content/ArticleLayout'

// 构建模式检测
// Cloudflare 构建环境会设置 CF_PAGES 或通过 opennextjs-cloudflare 构建
const isWorkersMode = process.env.CLOUDFLARE_WORKERS === 'true' || 
                       process.env.CF_PAGES === '1' ||
                       process.env.npm_lifecycle_script?.includes('opennextjs-cloudflare')

// SSG + ISR: 按需生成，24小时重新验证
// Cloudflare Pages Workers 模式支持真正的 ISR
export const dynamic = 'force-static'
export const revalidate = 86400
// 允许生成未在 generateStaticParams 中定义的路径
export const dynamicParams = true

// 获取模块配置
const moduleConfig = getModuleConfig('strategy')

// 生成静态路径
// - Workers 模式: 返回空数组，实现按需生成
// - 静态导出模式: 返回所有文章，全量预构建
export async function generateStaticParams() {
  if (isWorkersMode) {
    // 按需生成：不预构建任何页面，用户访问时实时生成并缓存
    // 支持上亿篇文章
    return []
  }
  
  // 静态导出模式：预构建所有文章
  const articles = await getStrategyArticles()
  return articles.map((article) => ({
    slug: article.slug.split('/'),
  }))
}

// 动态生成 Metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = slug.map(s => decodeURIComponent(s))
  const article = await getStrategyArticle(decodedSlug)
  
  if (!article) {
    return { title: '攻略未找到' }
  }

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.keywords || `${article.frontmatter.title} - 详细游戏攻略，助你快速通关`,
    keywords: article.frontmatter.keywords?.split(',') || [article.frontmatter.title, '攻略', '通关'],
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.keywords || '游戏攻略',
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export default async function StrategyArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params
  const decodedSlug = slug.map(s => decodeURIComponent(s))
  const article = await getStrategyArticle(decodedSlug)

  if (!article) {
    notFound()
  }

  const { frontmatter, content, readingTime } = article

  // 构建 TOC - 移除标题中的 HTML 标签（如 <a name="..."></a>）
  const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm)
  const toc = Array.from(headingMatches).map(match => {
    // 移除 HTML 标签，只保留纯文本
    const cleanText = match[2].replace(/<[^>]*>/g, '').trim()
    return {
      level: match[1].length,
      text: cleanText,
      id: cleanText.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-'),
    }
  })

  return (
    <ArticleLayout
      config={moduleConfig}
      frontmatter={frontmatter}
      content={content}
      readingTime={readingTime}
      toc={toc}
    />
  )
}

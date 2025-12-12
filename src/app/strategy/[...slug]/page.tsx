import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStrategyArticle, getStrategyArticles } from '@/lib/content'
import { getModuleConfig } from '@/config/modules'
import { ArticleLayout } from '@/components/content/ArticleLayout'

// SSG + ISR: 静态生成，24小时重新验证
export const dynamic = 'force-static'
export const revalidate = 86400

// 获取模块配置
const moduleConfig = getModuleConfig('strategy')

// 生成静态路径
export async function generateStaticParams() {
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

  // 构建 TOC
  const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm)
  const toc = Array.from(headingMatches).map(match => ({
    level: match[1].length,
    text: match[2],
    id: match[2].toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-'),
  }))

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

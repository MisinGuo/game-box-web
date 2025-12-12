import { Metadata } from 'next'
import { getPojieArticles, getStrategyArticles } from '@/lib/content'
import SearchPageClient from './SearchClient'

export const metadata: Metadata = {
  title: '搜索 - 搜索游戏、攻略',
  description: '搜索破解版游戏和游戏攻略',
}

// SSG: 预加载所有数据用于客户端搜索
export const dynamic = 'force-static'
export const revalidate = 86400

export default async function SearchPage() {
  // 获取所有文章用于搜索
  const [pojieArticles, strategyArticles] = await Promise.all([
    getPojieArticles(),
    getStrategyArticles()
  ])

  // 转换为搜索结果格式
  const allResults = [
    ...pojieArticles.map(article => ({
      type: 'pojie' as const,
      title: article.frontmatter.title,
      slug: article.slug,
      category: article.category,
      date: article.frontmatter.date,
      excerpt: article.frontmatter.title,
    })),
    ...strategyArticles.map(article => ({
      type: 'strategy' as const,
      title: article.frontmatter.title,
      slug: article.slug,
      category: article.category,
      date: article.frontmatter.date,
      excerpt: article.frontmatter.title,
    })),
  ]

  return <SearchPageClient allResults={allResults} />
}

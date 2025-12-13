import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPojieArticle, getPojieArticles } from '@/lib/content'
import { getModuleConfig } from '@/config/modules'
import { ArticleLayout } from '@/components/content/ArticleLayout'

// SSG + ISR: 静态生成，24小时重新验证
export const dynamic = 'force-static'
export const revalidate = 86400

// 获取模块配置
const moduleConfig = getModuleConfig('pojie')

// 生成静态路径
export async function generateStaticParams() {
  const articles = await getPojieArticles()
  return articles.map((article) => ({
    slug: article.slug.split('/'),
  }))
}

// 动态生成 Metadata（SEO）
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = slug.map(s => decodeURIComponent(s))
  const article = await getPojieArticle(decodedSlug.join('/'))
  
  if (!article) {
    return { title: '文章未找到' }
  }

  const cleanTitle = article.frontmatter.title
    .replace(/[?？]/g, ' - ')
    .split(/[,，;；]/)[0]
    .trim()
  
  return {
    title: cleanTitle,
    description: article.frontmatter.keywords || `${cleanTitle} 破解版下载，无限钻石，内置修改器，免费福利版`,
    keywords: article.frontmatter.keywords?.split(',') || [cleanTitle, '破解版', '无限钻石', '内置修改器'],
    openGraph: {
      title: cleanTitle,
      description: article.frontmatter.keywords || `${cleanTitle} 破解版下载`,
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export default async function PojiePage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> 
}) {
  const { slug } = await params
  const decodedSlug = slug.map(s => decodeURIComponent(s))
  const article = await getPojieArticle(decodedSlug.join('/'))

  if (!article) {
    notFound()
  }

  // 清理标题
  const cleanTitle = article.frontmatter.title
    .replace(/[?？]/g, ' - ')
    .split(/[,，;；]/)[0]
    .trim()

  // 构建 TOC - 移除标题中的 HTML 标签（如 <a name="..."></a>）
  const headingMatches = article.content.matchAll(/^(#{2,3})\s+(.+)$/gm)
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
      frontmatter={{
        ...article.frontmatter,
        title: cleanTitle,
        category: article.category,
      }}
      content={article.content}
      readingTime={article.readingTime}
      toc={toc}
      gameName={article.subcategory || cleanTitle}
    />
  )
}

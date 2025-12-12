import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 内容目录路径
const DOCS_DIR = path.join(process.cwd(), 'src/docs')

// 站点配置（替换 VuePress 的模板变量）
export const siteConfig = {
  jumpDomain: 'https://example.com/download',
  bgImageUrl: '/images/bg.jpg',
}

export interface ArticleFrontmatter {
  title: string
  date: string
  category?: string
  icon?: string
  star?: boolean
  keywords?: string
  description?: string
  tags?: string[]
}

export interface Article {
  slug: string
  frontmatter: ArticleFrontmatter
  content: string
  readingTime: number
  category: string
  subcategory?: string
}

/**
 * 处理 Markdown 内容，替换模板变量
 */
function processContent(content: string): string {
  return content
    .replace(/\{\{siteConfig\.jumpDomain\}\}/g, siteConfig.jumpDomain)
    .replace(/\{\{siteConfig\.bgImageUrl\}\}/g, siteConfig.bgImageUrl)
}

/**
 * 计算阅读时间（分钟）
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  const words = content.split(/\s+/).filter(Boolean).length
  const totalWords = chineseChars + words
  return Math.ceil(totalWords / wordsPerMinute)
}

/**
 * 确保日期是字符串格式
 */
function formatDateString(date: unknown): string {
  if (!date) return '2025-01-01'
  if (typeof date === 'string') return date
  if (date instanceof Date) {
    return date.toISOString().split('T')[0]
  }
  return '2025-01-01'
}

/**
 * 递归获取目录下所有 README.md 文件
 */
function getAllMarkdownFiles(dir: string, basePath: string = ''): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }

  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    const relativePath = path.join(basePath, item.name)
    
    if (item.isDirectory()) {
      // 跳过 .vuepress 等隐藏目录
      if (!item.name.startsWith('.') && item.name !== 'node_modules') {
        files.push(...getAllMarkdownFiles(fullPath, relativePath))
      }
    } else if (item.name === 'README.md') {
      files.push(relativePath)
    }
  }
  
  return files
}

/**
 * 解析 Markdown 文件路径为 slug
 */
function pathToSlug(filePath: string): string {
  // 移除 README.md 和开头的斜杠
  return filePath
    .replace(/README\.md$/, '')
    .replace(/\\/g, '/')
    .replace(/\/$/, '')
    .replace(/^\//, '')
}

/**
 * 获取破解版游戏列表
 */
export async function getPojieArticles(): Promise<Article[]> {
  const pojieDir = path.join(DOCS_DIR, 'pojie')
  const files = getAllMarkdownFiles(pojieDir)
  
  const articles: Article[] = []
  
  for (const file of files) {
    // 跳过根目录的 README.md
    if (file === 'README.md') continue
    
    const fullPath = path.join(pojieDir, file)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const slug = pathToSlug(file)
    const parts = slug.split('/')
    const category = parts[0] || '其他'
    const subcategory = parts[1] || undefined
    
    articles.push({
      slug,
      frontmatter: {
        title: data.title || slug,
        date: formatDateString(data.date),
        category: data.category || '破解版',
        icon: data.icon,
        star: data.star,
        keywords: data.head?.find((h: any) => h[1]?.name === 'keywords')?.[1]?.content,
      },
      content: processContent(content),
      readingTime: calculateReadingTime(content),
      category,
      subcategory,
    })
  }
  
  // 按日期排序
  return articles.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

/**
 * 获取攻略文章列表
 */
export async function getStrategyArticles(): Promise<Article[]> {
  const strategyDir = path.join(DOCS_DIR, 'strategy')
  const files = getAllMarkdownFiles(strategyDir)
  
  const articles: Article[] = []
  
  for (const file of files) {
    // 跳过根目录的 README.md
    if (file === 'README.md') continue
    
    const fullPath = path.join(strategyDir, file)
    const fileContent = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    const slug = pathToSlug(file)
    const parts = slug.split('/')
    
    // 从路径解析年/月/日
    const year = parts[0] || '2025'
    const month = parts[1] || '01'
    const day = parts[2] || '01'
    const articleName = parts.slice(3).join('/') || parts[parts.length - 1]
    
    articles.push({
      slug,
      frontmatter: {
        title: data.title || articleName,
        date: formatDateString(data.date) || `${year}-${month}-${day}`,
        category: data.category || '攻略',
        icon: data.icon,
        star: data.star,
        keywords: data.head?.find((h: any) => h[1]?.name === 'keywords')?.[1]?.content,
      },
      content: processContent(content),
      readingTime: calculateReadingTime(content),
      category: '攻略',
      subcategory: articleName,
    })
  }
  
  // 按日期排序
  return articles.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

/**
 * 获取单篇破解版文章
 */
export async function getPojieArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(DOCS_DIR, 'pojie', slug, 'README.md')
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  const parts = slug.split('/')
  const category = parts[0] || '其他'
  const subcategory = parts[1] || undefined
  
  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      date: formatDateString(data.date),
      category: data.category || '破解版',
      icon: data.icon,
      star: data.star,
      keywords: data.head?.find((h: any) => h[1]?.name === 'keywords')?.[1]?.content,
    },
    content: processContent(content),
    readingTime: calculateReadingTime(content),
    category,
    subcategory,
  }
}

/**
 * 获取单篇攻略文章
 */
export async function getStrategyArticle(slugParts: string[]): Promise<Article | null> {
  const slug = slugParts.join('/')
  const filePath = path.join(DOCS_DIR, 'strategy', slug, 'README.md')
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    frontmatter: {
      title: data.title || slug,
      date: formatDateString(data.date),
      category: data.category || '攻略',
      icon: data.icon,
      star: data.star,
      keywords: data.head?.find((h: any) => h[1]?.name === 'keywords')?.[1]?.content,
    },
    content: processContent(content),
    readingTime: calculateReadingTime(content),
    category: '攻略',
  }
}

/**
 * 获取破解版分类列表
 */
export async function getPojieCategories(): Promise<{ name: string; count: number; icon: string }[]> {
  const pojieDir = path.join(DOCS_DIR, 'pojie')
  
  if (!fs.existsSync(pojieDir)) {
    return []
  }
  
  const items = fs.readdirSync(pojieDir, { withFileTypes: true })
  const categories: { name: string; count: number; icon: string }[] = []
  
  const categoryIcons: Record<string, string> = {
    '传奇': '⚔️',
    '二次元': '🌟',
    '仙侠': '🏰',
    '三国': '🎮',
    '卡牌': '🃏',
    '回合': '🎲',
    '放置': '⏰',
    '动漫': '📺',
    '武侠': '🥷',
    '西游': '🐒',
    '魔幻': '🔮',
    '策略': '🎯',
    '冒险': '🗺️',
    '网游': '🌐',
    '休闲': '🎪',
    '割草': '⚡',
    '开箱': '📦',
    'Q版': '🎨',
    '角色': '👤',
  }
  
  for (const item of items) {
    if (item.isDirectory() && !item.name.startsWith('.')) {
      const categoryDir = path.join(pojieDir, item.name)
      const games = fs.readdirSync(categoryDir, { withFileTypes: true })
        .filter(g => g.isDirectory())
      
      categories.push({
        name: item.name,
        count: games.length,
        icon: categoryIcons[item.name] || '🎮',
      })
    }
  }
  
  return categories.sort((a, b) => b.count - a.count)
}

/**
 * 获取分类下的游戏列表
 */
export async function getPojieGamesByCategory(category: string): Promise<Article[]> {
  const categoryDir = path.join(DOCS_DIR, 'pojie', category)
  
  if (!fs.existsSync(categoryDir)) {
    return []
  }
  
  const items = fs.readdirSync(categoryDir, { withFileTypes: true })
  const articles: Article[] = []
  
  for (const item of items) {
    if (item.isDirectory()) {
      const readmePath = path.join(categoryDir, item.name, 'README.md')
      
      if (fs.existsSync(readmePath)) {
        const fileContent = fs.readFileSync(readmePath, 'utf-8')
        const { data, content } = matter(fileContent)
        
        articles.push({
          slug: `${category}/${item.name}`,
          frontmatter: {
            title: data.title || item.name,
            date: formatDateString(data.date),
            category: data.category || '破解版',
            icon: data.icon,
            star: data.star,
          },
          content: processContent(content),
          readingTime: calculateReadingTime(content),
          category,
          subcategory: item.name,
        })
      }
    }
  }
  
  return articles.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

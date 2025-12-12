/**
 * 文档模块配置系统 - 类型定义
 * 
 * 类似于 VuePress 的 submodules 配置，允许为不同的文档类型
 * (pojie、strategy 等) 定义不同的布局、组件和行为
 */

/** 支持的语言 */
export type Locale = 'zh-TW' | 'zh-CN' | 'en'

/** 文档模块类型 */
export type ModuleType = 'pojie' | 'strategy'

/** 分类过滤器配置 */
export interface CategoryFilterConfig {
  enabled: boolean
  /** 过滤器标题 */
  title: string
  /** 过滤类型：按日期、按分类、按标签 */
  type: 'date' | 'category' | 'tag'
  /** 是否显示计数 */
  showCount?: boolean
}

/** 下载入口配置 */
export interface DownloadEntryConfig {
  enabled: boolean
  /** 显示位置 */
  position: 'header' | 'sidebar' | 'footer' | 'floating' | 'all'
  /** 按钮文案 */
  buttonText: string
  /** 按钮链接 */
  buttonLink: string
  /** 按钮样式 */
  buttonStyle: 'primary' | 'secondary' | 'gradient'
}

/** 侧边栏配置 */
export interface SidebarConfig {
  enabled: boolean
  /** 显示目录 (TOC) */
  showTOC?: boolean
  /** 显示相关文章 */
  showRelated?: boolean
  /** 显示下载入口 */
  showDownload?: boolean
  /** 自定义组件 */
  components?: string[]
}

/** 文章列表配置 */
export interface ArticleListConfig {
  /** 每页显示数量 */
  pageSize: number
  /** 显示封面图 */
  showCover: boolean
  /** 显示摘要 */
  showExcerpt: boolean
  /** 显示日期 */
  showDate: boolean
  /** 显示分类 */
  showCategory: boolean
  /** 显示阅读时间 */
  showReadingTime: boolean
  /** 布局方式 */
  layout: 'grid' | 'list' | 'compact'
}

/** 文章详情页配置 */
export interface ArticleDetailConfig {
  /** 显示面包屑 */
  showBreadcrumb: boolean
  /** 显示元信息 (日期、阅读时间等) */
  showMeta: boolean
  /** 显示目录 */
  showTOC: boolean
  /** 显示作者 */
  showAuthor: boolean
  /** 显示标签 */
  showTags: boolean
  /** 显示相关文章 */
  showRelated: boolean
  /** 显示评论 */
  showComments: boolean
  /** 显示分享按钮 */
  showShare: boolean
}

/** 主题配置 */
export interface ThemeConfig {
  /** 主色调 */
  primaryColor: string
  /** 徽章颜色 */
  badgeColor: string
  /** 徽章文字 */
  badgeText: string
}

/** 模块配置 */
export interface ModuleConfig {
  /** 模块类型 */
  type: ModuleType
  /** 模块标题 */
  title: string
  /** 模块描述 */
  description: string
  /** 内容目录路径 */
  contentPath: string
  /** 路由前缀 */
  routePrefix: string
  
  /** 主题配置 */
  theme: ThemeConfig
  
  /** 分类过滤器 */
  categoryFilter: CategoryFilterConfig
  
  /** 下载入口 */
  downloadEntry: DownloadEntryConfig
  
  /** 侧边栏 */
  sidebar: SidebarConfig
  
  /** 文章列表 */
  articleList: ArticleListConfig
  
  /** 文章详情 */
  articleDetail: ArticleDetailConfig
}

/** 多语言配置 */
export interface LocaleConfig {
  /** 语言代码 */
  code: Locale
  /** 语言名称 */
  name: string
  /** 路由前缀 */
  routePrefix: string
  /** 翻译文本 */
  translations: {
    home: string
    articles: string
    categories: string
    tags: string
    readMore: string
    readingTime: string
    download: string
    backToList: string
    relatedArticles: string
    tableOfContents: string
    share: string
    [key: string]: string
  }
}

/** 站点配置 */
export interface SiteConfig {
  /** 站点名称 */
  name: string
  /** 站点描述 */
  description: string
  /** 站点域名 */
  hostname: string
  /** 跳转域名 (用于下载链接) */
  jumpDomain: string
  /** Logo */
  logo: string
  /** Favicon */
  favicon: string
  /** 版权信息 */
  copyright: string
  /** 作者 */
  author: {
    name: string
    url: string
  }
}

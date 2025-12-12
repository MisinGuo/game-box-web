import type { LocaleConfig, Locale } from './types'

/**
 * 多语言配置
 */
export const locales: Record<Locale, LocaleConfig> = {
  'zh-TW': {
    code: 'zh-TW',
    name: '繁體中文',
    routePrefix: '',  // 默认语言，无前缀
    translations: {
      home: '首頁',
      articles: '文章',
      categories: '分類',
      tags: '標籤',
      readMore: '閱讀更多',
      readingTime: '閱讀時間',
      download: '下載',
      backToList: '返回列表',
      relatedArticles: '相關文章',
      tableOfContents: '目錄',
      share: '分享',
      pojie: '遊戲破解版',
      strategy: '遊戲攻略',
      boxes: '盒子大全',
      games: '遊戲庫',
      search: '搜索',
      noResults: '沒有找到相關結果',
      loading: '載入中...',
      minutes: '分鐘',
      publishedAt: '發佈於',
      updatedAt: '更新於',
      allCategories: '全部分類',
      latestArticles: '最新文章',
      popularArticles: '熱門文章',
      downloadNow: '立即下載',
      freeDownload: '免費下載',
      discountInfo: '折扣資訊',
    },
  },
  'zh-CN': {
    code: 'zh-CN',
    name: '简体中文',
    routePrefix: '/zh-CN',
    translations: {
      home: '首页',
      articles: '文章',
      categories: '分类',
      tags: '标签',
      readMore: '阅读更多',
      readingTime: '阅读时间',
      download: '下载',
      backToList: '返回列表',
      relatedArticles: '相关文章',
      tableOfContents: '目录',
      share: '分享',
      pojie: '游戏破解版',
      strategy: '游戏攻略',
      boxes: '盒子大全',
      games: '游戏库',
      search: '搜索',
      noResults: '没有找到相关结果',
      loading: '加载中...',
      minutes: '分钟',
      publishedAt: '发布于',
      updatedAt: '更新于',
      allCategories: '全部分类',
      latestArticles: '最新文章',
      popularArticles: '热门文章',
      downloadNow: '立即下载',
      freeDownload: '免费下载',
      discountInfo: '折扣信息',
    },
  },
  'en': {
    code: 'en',
    name: 'English',
    routePrefix: '/en',
    translations: {
      home: 'Home',
      articles: 'Articles',
      categories: 'Categories',
      tags: 'Tags',
      readMore: 'Read More',
      readingTime: 'Reading Time',
      download: 'Download',
      backToList: 'Back to List',
      relatedArticles: 'Related Articles',
      tableOfContents: 'Table of Contents',
      share: 'Share',
      pojie: 'Game Mods',
      strategy: 'Game Guides',
      boxes: 'Game Boxes',
      games: 'Games',
      search: 'Search',
      noResults: 'No results found',
      loading: 'Loading...',
      minutes: 'min',
      publishedAt: 'Published at',
      updatedAt: 'Updated at',
      allCategories: 'All Categories',
      latestArticles: 'Latest Articles',
      popularArticles: 'Popular Articles',
      downloadNow: 'Download Now',
      freeDownload: 'Free Download',
      discountInfo: 'Discount Info',
    },
  },
}

/** 默认语言 */
export const defaultLocale: Locale = 'zh-TW'

/** 获取语言配置 */
export function getLocale(code: Locale): LocaleConfig {
  return locales[code] || locales[defaultLocale]
}

/** 根据路径获取语言 */
export function getLocaleFromPath(path: string): LocaleConfig {
  if (path.startsWith('/zh-CN')) {
    return locales['zh-CN']
  }
  if (path.startsWith('/en')) {
    return locales['en']
  }
  return locales[defaultLocale]
}

import type { ModuleConfig, ModuleType } from './types'

/**
 * 文档模块配置
 * 
 * 每个模块 (pojie, strategy) 可以有不同的：
 * - 布局和样式
 * - 功能组件 (下载入口、分类过滤器等)
 * - 侧边栏内容
 * - 列表展示方式
 */
export const modules: Record<ModuleType, ModuleConfig> = {
  /**
   * 破解版游戏模块
   */
  pojie: {
    type: 'pojie',
    title: '破解版游戏',
    description: '精选热门手游破解版下载，无限钻石、满V福利、内置修改器',
    contentPath: 'src/docs/pojie',
    routePrefix: '/pojie',
    
    theme: {
      primaryColor: 'orange',
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      badgeText: '破解版',
    },
    
    // 按游戏分类过滤
    categoryFilter: {
      enabled: true,
      title: '游戏分类',
      type: 'category',
      showCount: true,
    },
    
    // 显示下载入口
    downloadEntry: {
      enabled: true,
      position: 'all',
      buttonText: '立即下载',
      buttonLink: '/boxes',
      buttonStyle: 'gradient',
    },
    
    sidebar: {
      enabled: true,
      showTOC: false,  // 破解版不需要目录
      showRelated: true,
      showDownload: true,  // 显示下载入口
      components: ['DownloadBox', 'DiscountCompare'],
    },
    
    articleList: {
      pageSize: 20,
      showCover: true,
      showExcerpt: false,
      showDate: true,
      showCategory: true,
      showReadingTime: false,
      layout: 'grid',  // 网格布局展示游戏
    },
    
    articleDetail: {
      showBreadcrumb: true,
      showMeta: true,
      showTOC: false,
      showAuthor: false,
      showTags: true,
      showRelated: true,
      showComments: false,
      showShare: false,
    },
  },

  /**
   * 攻略模块
   */
  strategy: {
    type: 'strategy',
    title: '游戏攻略',
    description: '深度的游戏解析，帮你快速上手各类热门游戏',
    contentPath: 'src/docs/strategy',
    routePrefix: '/strategy',
    
    theme: {
      primaryColor: 'blue',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      badgeText: '攻略',
    },
    
    // 按日期分类过滤
    categoryFilter: {
      enabled: true,
      title: '发布日期',
      type: 'date',
      showCount: true,
    },
    
    // 攻略页不需要显眼的下载入口
    downloadEntry: {
      enabled: false,
      position: 'sidebar',
      buttonText: '下载游戏盒子',
      buttonLink: '/boxes',
      buttonStyle: 'secondary',
    },
    
    sidebar: {
      enabled: true,
      showTOC: true,  // 攻略需要目录
      showRelated: true,
      showDownload: false,  // 不突出显示下载
      components: ['TOC', 'RelatedArticles'],
    },
    
    articleList: {
      pageSize: 12,
      showCover: true,
      showExcerpt: true,
      showDate: true,
      showCategory: true,
      showReadingTime: true,
      layout: 'list',  // 列表布局展示攻略
    },
    
    articleDetail: {
      showBreadcrumb: true,
      showMeta: true,
      showTOC: true,  // 显示目录
      showAuthor: true,
      showTags: true,
      showRelated: true,
      showComments: true,
      showShare: true,
    },
  },
}

/** 获取模块配置 */
export function getModuleConfig(type: ModuleType): ModuleConfig {
  return modules[type]
}

/** 根据路径获取模块配置 */
export function getModuleFromPath(path: string): ModuleConfig | null {
  if (path.startsWith('/pojie')) {
    return modules.pojie
  }
  if (path.startsWith('/strategy')) {
    return modules.strategy
  }
  return null
}

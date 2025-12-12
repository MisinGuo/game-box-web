/**
 * 文档模块配置系统 - 统一导出
 */

// 导出所有类型
export type {
  Locale,
  ModuleType,
  CategoryFilterConfig,
  DownloadEntryConfig,
  SidebarConfig,
  ArticleListConfig,
  ArticleDetailConfig,
  ThemeConfig,
  ModuleConfig,
  LocaleConfig,
  SiteConfig,
} from './types'

// 导出配置和工具函数
export { siteConfig } from './site'
export { locales, getLocale, defaultLocale } from './locales'
export { modules, getModuleConfig } from './modules'

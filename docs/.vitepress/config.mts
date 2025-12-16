import { defineConfig } from 'vitepress'
import { mermaidPlugin } from './plugins/mermaid'

export default defineConfig({
  title: '游戏盒子文档',
  description: '游戏盒子内容管理系统技术文档',
  lang: 'zh-CN',
  base: '/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '首页', link: '/' },
      { text: 'PRD', link: '/PRD-游戏盒子内容管理系统' },
      { text: '架构设计', link: '/架构设计文档' },
      { text: 'API文档', link: '/API接口文档' },
    ],
    
    sidebar: [
      {
        text: '项目文档',
        items: [
          { text: 'PRD 产品需求', link: '/PRD-游戏推广项目内容管理系统' },
          { text: '架构设计', link: '/架构设计文档' },
          { text: '数据库设计', link: '/数据库设计文档' },
          { text: 'API 接口', link: '/API接口文档' },
          { text: '部署教程', link: '/部署教程' },
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],
    
    footer: {
      message: '游戏盒子内容管理系统',
      copyright: 'Copyright © 2025'
    },
    
    search: {
      provider: 'local'
    },
    
    outline: {
      level: [2, 3],
      label: '目录'
    },
    
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    lastUpdated: {
      text: '最后更新于'
    }
  },
  
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(mermaidPlugin)
    }
  },
  
  vite: {
    build: {
      target: 'esnext'
    }
  }
})

---
layout: home
hero:
  name: 游戏盒子
  text: 内容管理系统文档
  tagline: 技术架构、API接口、数据库设计
  actions:
    - theme: brand
      text: 产品需求文档
      link: /PRD-游戏盒子内容管理系统
    - theme: alt
      text: 架构设计
      link: /架构设计文档
    - theme: alt
      text: API 文档
      link: /API接口文档

features:
  - icon: 📦
    title: 百万级文档支持
    details: 基于 R2 对象存储 + ElasticSearch 全文搜索，支持百万级 Markdown 文档
  - icon: 🚀
    title: 边缘计算部署
    details: 前端部署于 Cloudflare Workers，全球 CDN 加速，毫秒级响应
  - icon: 🔧
    title: RuoYi 后台管理
    details: 基于若依 Boot 单体架构，部署简单，提供完善的内容管理能力
  - icon: 🤖
    title: AI 文章自动生成
    details: GitHub Action + 多 AI 平台，定时批量生成文章，图片自动插入
  - icon: 📊
    title: 数据统计分析
    details: 实时数据统计、搜索分析、用户行为追踪
---

## 快速导航

| 文档 | 说明 |
|------|------|
| [PRD 产品需求](./PRD-游戏盒子内容管理系统.md) | 产品功能需求、优先级规划、开发里程碑 |
| [架构设计](./架构设计文档.md) | 单体架构设计、GitHub Action AI 生成集成 |
| [数据库设计](./数据库设计文档.md) | MySQL 表结构、ES 索引映射 |
| [API 接口](./API接口文档.md) | RESTful API 规范、AI 任务接口 |
| [部署教程](./部署教程.md) | Docker 单体部署、Cloudflare 部署指南 |
| [AI 文章生成](./AI文章生成使用指南.md) | GitHub Action AI 自动生成文章指南 |

## 技术栈

- **前端**: Next.js 14 + Tailwind CSS + shadcn/ui
- **后端**: 若依 Boot 3.x（单体架构）
- **存储**: Cloudflare R2 + MySQL 8.0
- **搜索**: ElasticSearch 8.x + IK 中文分词
- **缓存**: Redis 6.x
- **AI 生成**: GitHub Actions + OpenAI/Claude/DeepSeek/通义千问
- **部署**: Cloudflare Workers/Pages + Docker Compose

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
    details: 基于 RuoYi Cloud 微服务架构，提供完善的内容管理能力
  - icon: 📊
    title: 数据统计分析
    details: 实时数据统计、搜索分析、用户行为追踪
---

## 快速导航

| 文档 | 说明 |
|------|------|
| [PRD 产品需求](./PRD-游戏盒子内容管理系统.md) | 产品功能需求、用户角色、里程碑规划 |
| [架构设计](./架构设计文档.md) | 系统架构、微服务设计、部署方案 |
| [数据库设计](./数据库设计文档.md) | MySQL 表结构、ES 索引映射 |
| [API 接口](./API接口文档.md) | RESTful API 规范、接口详情 |

## 技术栈

- **前端**: Next.js 14 + Tailwind CSS + shadcn/ui
- **后端**: RuoYi Cloud (Spring Cloud)
- **存储**: Cloudflare R2 + MySQL 8.0
- **搜索**: ElasticSearch 8.x + IK 中文分词
- **缓存**: Redis 6.x
- **部署**: Cloudflare Workers/Pages + Docker + Kubernetes

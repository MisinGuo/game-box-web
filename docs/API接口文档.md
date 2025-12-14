# API 接口文档

> 版本：v2.5.0  
> 日期：2025-12-14  
> 基础路径：`/api`  
> 对应架构：若依 Boot 单体架构

---

## 1. 接口规范

### 1.1 请求格式

```
POST /api/v1/resource
Content-Type: application/json
Authorization: Bearer <token>
```

### 1.2 响应格式

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {},
  "timestamp": 1702454400000
}
```

### 1.3 状态码

| 状态码 | 说明 |
|-------|------|
| 200 | 成功 |
| 400 | 参数错误 |
| 401 | 未授权 |
| 403 | 无权限 |
| 404 | 资源不存在 |
| 500 | 服务器错误 |

---

## 2. 网站管理接口

### 2.1 网站列表

**请求**

```
GET /site/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| name | String | 否 | 网站名称 |
| siteType | String | 否 | 网站类型：game/drama/mixed |
| status | Integer | 否 | 状态：0-禁用 1-启用 |
| pageNum | Integer | 否 | 页码，默认1 |
| pageSize | Integer | 否 | 每页数量，默认20 |

**响应**

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "total": 5,
    "rows": [
      {
        "id": 1,
        "name": "游戏推广站A",
        "domain": "game-a.example.com",
        "siteType": "game",
        "logoUrl": "https://cdn.example.com/logo.png",
        "description": "游戏推广专用站点",
        "status": 1,
        "createdAt": "2025-01-01 12:00:00"
      }
    ]
  }
}
```

### 2.2 网站详情

**请求**

```
GET /site/{id}
```

**响应**

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "id": 1,
    "name": "游戏推广站A",
    "domain": "game-a.example.com",
    "siteType": "game",
    "logoUrl": "https://cdn.example.com/logo.png",
    "faviconUrl": "https://cdn.example.com/favicon.ico",
    "description": "游戏推广专用站点",
    "seoTitle": "最新游戏下载 - 游戏推广站",
    "seoKeywords": "游戏下载,破解游戏,BT游戏",
    "seoDescription": "提供最新游戏下载服务",
    "config": {
      "theme": "default",
      "enableComments": false,
      "analyticsId": "GA-XXXXX"
    },
    "storageConfigId": 1,
    "status": 1,
    "createdAt": "2025-01-01 12:00:00",
    "updatedAt": "2025-01-02 14:00:00"
  }
}
```

### 2.3 创建网站

**请求**

```
POST /site
```

**请求体**

```json
{
  "name": "短剧推广站",
  "domain": "drama.example.com",
  "siteType": "drama",
  "logoUrl": "https://cdn.example.com/drama-logo.png",
  "description": "短剧推广专用站点",
  "seoTitle": "热门短剧推荐",
  "seoKeywords": "短剧,热门短剧,短剧推荐",
  "seoDescription": "精选热门短剧推荐",
  "config": {
    "theme": "drama",
    "enableComments": true
  },
  "storageConfigId": 1
}
```

### 2.4 更新网站

**请求**

```
PUT /site/{id}
```

### 2.5 删除网站

**请求**

```
DELETE /site/{id}
```

### 2.6 推广站点公开接口

这些接口供推广站点（前端展示站）调用，用于获取内容数据。

#### 2.6.1 根据域名获取网站配置

**请求**

```
GET /public/site/config
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| domain | String | 是 | 网站域名 |

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "游戏推广站A",
    "siteType": "game",
    "logoUrl": "https://cdn.example.com/logo.png",
    "faviconUrl": "https://cdn.example.com/favicon.ico",
    "seoTitle": "最新游戏下载",
    "seoKeywords": "游戏下载,破解游戏",
    "seoDescription": "提供最新游戏下载服务",
    "config": {
      "theme": "default",
      "analyticsId": "GA-XXXXX"
    }
  }
}
```

#### 2.6.2 获取站点文章列表

**请求**

```
GET /public/site/{siteId}/articles
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| category | String | 否 | 分类标识 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

#### 2.6.3 获取站点游戏盒子列表

**请求**

```
GET /public/site/{siteId}/gameboxes
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| platform | String | 否 | 平台：android/ios |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 10,
    "rows": [
      {
        "id": 1,
        "name": "XX游戏盒",
        "packageName": "com.xx.gamebox",
        "platform": "android",
        "iconUrl": "https://cdn.example.com/icon.png",
        "downloadUrl": "https://download.example.com/xx.apk",
        "version": "1.2.0",
        "description": "最新游戏盒子"
      }
    ]
  }
}
```

#### 2.6.4 获取站点游戏列表

**请求**

```
GET /public/site/{siteId}/games
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| gameType | String | 否 | 游戏类型 |
| gameboxId | Long | 否 | 关联的游戏盒子ID |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

---

## 3. 文档服务接口

### 3.1 文档列表

**请求**

```
GET /document/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| categoryId | Long | 否 | 分类ID |
| keyword | String | 否 | 关键词 |
| status | Integer | 否 | 状态 |
| pageNum | Integer | 否 | 页码，默认1 |
| pageSize | Integer | 否 | 每页数量，默认20 |

**响应**

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "total": 1000,
    "rows": [
      {
        "id": 1,
        "slug": "xianxia/jianlai",
        "title": "剑来破解版下载",
        "categoryName": "仙侠",
        "viewCount": 12345,
        "isPublished": 1,
        "publishedAt": "2025-01-01 12:00:00"
      }
    ]
  }
}
```

### 2.2 文档详情

**请求**

```
GET /document/{id}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "slug": "xianxia/jianlai",
    "title": "剑来破解版下载",
    "content": "Markdown 内容...",
    "categoryId": 2,
    "keywords": "仙侠,无限元宝,破解版",
    "viewCount": 12345,
    "relatedGames": [
      {
        "id": 10,
        "name": "剑来",
        "iconUrl": "https://..."
      }
    ]
  }
}
```

### 2.3 同步文档到 ES

**请求**

```
POST /document/sync
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| documentIds | Long[] | 否 | 文档ID列表，空则全量同步 |
| forceReindex | Boolean | 否 | 是否强制重建索引 |

**响应**

```json
{
  "code": 200,
  "data": {
    "taskId": "sync-20250101-001",
    "totalCount": 1000,
    "status": "processing"
  }
}
```

### 2.4 从 R2 拉取文档

**请求**

```
POST /document/pull
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| prefix | String | 否 | R2 路径前缀 |

---

## 4. 搜索服务接口

### 3.1 全文搜索

**请求**

```
GET /search
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| q | String | 是 | 搜索关键词 |
| category | String | 否 | 分类筛选 |
| sort | String | 否 | 排序：relevance/date/views |
| page | Integer | 否 | 页码 |
| size | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 256,
    "took": 23,
    "hits": [
      {
        "id": 1,
        "slug": "xianxia/jianlai",
        "title": "<em>剑来</em>破解版下载",
        "highlight": "...<em>无限元宝</em>修改器...",
        "category": "仙侠",
        "score": 15.234
      }
    ],
    "aggregations": {
      "categories": {
        "仙侠": 100,
        "传奇": 80,
        "三国": 50
      }
    }
  }
}
```

### 3.2 搜索建议

**请求**

```
GET /search/suggest
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| q | String | 是 | 输入前缀 |
| size | Integer | 否 | 建议数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "suggestions": [
      "仙侠游戏",
      "仙侠破解版",
      "仙侠无限元宝"
    ]
  }
}
```

### 3.3 热门搜索

**请求**

```
GET /search/hot
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| limit | Integer | 否 | 数量限制，默认10 |

**响应**

```json
{
  "code": 200,
  "data": {
    "keywords": [
      { "keyword": "传奇", "count": 5000 },
      { "keyword": "仙侠", "count": 4500 },
      { "keyword": "三国", "count": 3800 }
    ]
  }
}
```

---

## 5. 游戏服务接口

### 4.1 游戏列表

**请求**

```
GET /game/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| category | String | 否 | 游戏分类 |
| keyword | String | 否 | 搜索关键词 |
| status | Integer | 否 | 状态 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

### 4.2 创建游戏

**请求**

```
POST /game
```

```json
{
  "name": "剑来",
  "category": "仙侠",
  "description": "一款仙侠类手游",
  "iconUrl": "https://...",
  "downloadUrl": "https://...",
  "features": ["无限元宝", "满V特权"]
}
```

### 4.3 游戏盒子列表

**请求**

```
GET /gamebox/list
```

**响应**

```json
{
  "code": 200,
  "data": {
    "rows": [
      {
        "id": 1,
        "name": "咪噜游戏",
        "logoUrl": "https://...",
        "discountRate": 0.3,
        "gameCount": 500,
        "features": ["3折充值", "海量福利"]
      }
    ]
  }
}
```

---

## 6. 关联服务接口

### 5.1 自动关联

**请求**

```
POST /relation/auto
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| documentId | Long | 是 | 文档ID |
| threshold | Float | 否 | 相关度阈值，默认0.5 |
| limit | Integer | 否 | 最大关联数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "relations": [
      {
        "gameId": 10,
        "gameName": "剑来",
        "relevanceScore": 0.92,
        "matchedKeywords": ["剑来", "仙侠", "修仙"]
      }
    ]
  }
}
```

### 5.2 手动关联

**请求**

```
POST /relation/manual
```

```json
{
  "documentId": 1,
  "gameId": 10,
  "isPrimary": true
}
```

### 5.3 获取文档关联

**请求**

```
GET /relation/document/{documentId}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "relations": [
      {
        "id": 1,
        "gameId": 10,
        "gameName": "剑来",
        "relationType": "auto",
        "relevanceScore": 0.92,
        "isPrimary": true
      }
    ]
  }
}
```

---

## 7. 统计服务接口

### 6.1 仪表盘数据

**请求**

```
GET /analytics/dashboard
```

**响应**

```json
{
  "code": 200,
  "data": {
    "overview": {
      "totalDocuments": 100000,
      "todayNewDocuments": 50,
      "totalGames": 500,
      "totalPageViews": 1000000,
      "todayPageViews": 5000
    },
    "categoryDistribution": [
      { "name": "仙侠", "count": 15000 },
      { "name": "传奇", "count": 12000 }
    ],
    "viewTrend": [
      { "date": "2025-01-01", "pv": 5000, "uv": 2000 }
    ],
    "hotKeywords": [
      { "keyword": "传奇", "count": 500 }
    ]
  }
}
```

### 6.2 内容统计

**请求**

```
GET /analytics/content
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |
| groupBy | String | 否 | 分组：day/week/month |

### 6.3 搜索统计

**请求**

```
GET /analytics/search
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |

**响应**

```json
{
  "code": 200,
  "data": {
    "totalSearches": 50000,
    "avgSearchTime": 45,
    "zeroResultRate": 0.05,
    "topKeywords": [
      { "keyword": "仙侠", "count": 5000, "ctr": 0.65 }
    ],
    "zeroResultKeywords": [
      { "keyword": "未知游戏", "count": 100 }
    ]
  }
}
```

### 6.4 记录浏览

**请求**

```
POST /analytics/pageview
```

```json
{
  "documentId": 1,
  "pagePath": "/pojie/xianxia/jianlai",
  "referer": "https://google.com",
  "sessionId": "abc123"
}
```

---

## 8. 提示词模板接口

### 7.1 模板列表

**请求**

```
GET /prompt-template/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| siteId | Long | 否 | 站点ID |
| templateType | String | 否 | 模板类型：game_intro/game_guide/drama_intro等 |
| status | Integer | 否 | 状态 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 50,
    "rows": [
      {
        "id": 1,
        "templateName": "游戏介绍通用模板",
        "templateType": "game_intro",
        "description": "用于生成游戏介绍文章",
        "variables": ["game_name", "game_type", "features"],
        "status": 1,
        "usageCount": 1500
      }
    ]
  }
}
```

### 7.2 创建模板

**请求**

```
POST /prompt-template
```

```json
{
  "siteId": 1,
  "templateName": "游戏攻略模板",
  "templateType": "game_guide",
  "description": "用于生成游戏攻略文章",
  "systemPrompt": "你是一名专业的游戏攻略作者...",
  "userPromptTemplate": "请为{{game_name}}生成一篇攻略文章，包含以下要点：{{key_points}}",
  "variables": ["game_name", "key_points", "target_audience"],
  "defaultValues": {
    "target_audience": "新手玩家"
  }
}
```

### 7.3 预览模板

**请求**

```
POST /prompt-template/preview
```

```json
{
  "templateId": 1,
  "variables": {
    "game_name": "剑来",
    "game_type": "仙侠",
    "features": ["无限元宝", "满V特权"]
  }
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "systemPrompt": "你是一名专业的游戏攻略作者...",
    "userPrompt": "请为剑来生成一篇游戏介绍..."
  }
}
```

---

## 9. 文章资源接口

### 8.1 资源列表

**请求**

```
GET /article-resource/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| articleId | Long | 否 | 文章ID |
| resourceType | String | 否 | 资源类型：image/video/audio/file |
| migrationStatus | String | 否 | 迁移状态 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 500,
    "rows": [
      {
        "id": 1,
        "articleId": 100,
        "resourceType": "image",
        "originalUrl": "https://old-cdn.com/img/001.jpg",
        "currentUrl": "https://new-cdn.com/img/001.jpg",
        "storageConfigId": 2,
        "fileSize": 102400,
        "migrationStatus": "completed"
      }
    ]
  }
}
```

### 8.2 上传资源

**请求**

```
POST /article-resource/upload
Content-Type: multipart/form-data
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| file | File | 是 | 上传文件 |
| articleId | Long | 是 | 文章ID |
| storageConfigId | Long | 否 | 存储配置ID |
| resourceType | String | 否 | 资源类型 |

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "url": "https://cdn.example.com/articles/100/img001.jpg",
    "fileName": "img001.jpg",
    "fileSize": 102400,
    "mimeType": "image/jpeg"
  }
}
```

### 8.3 批量迁移资源

**请求**

```
POST /article-resource/migrate
```

```json
{
  "ruleId": 1,
  "articleIds": [100, 101, 102],
  "dryRun": false
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "taskId": "migrate-20251214-001",
    "totalCount": 150,
    "status": "processing"
  }
}
```

---

## 10. 存储迁移规则接口

### 9.1 规则列表

**请求**

```
GET /storage-migration-rule/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| ruleType | String | 否 | 规则类型：url_replace/storage_move等 |
| status | Integer | 否 | 状态 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 10,
    "rows": [
      {
        "id": 1,
        "ruleName": "旧CDN迁移到R2",
        "ruleType": "storage_move",
        "sourcePattern": "https://old-cdn.com/*",
        "targetTemplate": "https://r2.example.com/{{path}}",
        "sourceStorageId": 1,
        "targetStorageId": 2,
        "status": 1,
        "executedCount": 5000
      }
    ]
  }
}
```

### 9.2 创建规则

**请求**

```
POST /storage-migration-rule
```

```json
{
  "ruleName": "图床迁移到OSS",
  "ruleType": "storage_move",
  "description": "将所有图床资源迁移到阿里云OSS",
  "sourcePattern": "https://imgbed.com/**",
  "targetTemplate": "https://oss.example.com/images/{{filename}}",
  "sourceStorageId": 1,
  "targetStorageId": 3,
  "scopeType": "all",
  "priority": 10
}
```

### 9.3 执行规则

**请求**

```
POST /storage-migration-rule/{id}/execute
```

```json
{
  "dryRun": true,
  "batchSize": 100,
  "articleIds": []
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "taskId": "rule-exec-20251214-001",
    "matchedCount": 1500,
    "estimatedTime": "15分钟",
    "dryRunResults": [
      {
        "resourceId": 1,
        "originalUrl": "https://imgbed.com/a.jpg",
        "targetUrl": "https://oss.example.com/images/a.jpg"
      }
    ]
  }
}
```

### 9.4 迁移日志

**请求**

```
GET /storage-migration-log/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| ruleId | Long | 否 | 规则ID |
| resourceId | Long | 否 | 资源ID |
| migrationStatus | String | 否 | 迁移状态 |
| startTime | DateTime | 否 | 开始时间 |
| endTime | DateTime | 否 | 结束时间 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 5000,
    "rows": [
      {
        "id": 1,
        "ruleId": 1,
        "resourceId": 100,
        "originalUrl": "https://old.com/a.jpg",
        "targetUrl": "https://new.com/a.jpg",
        "migrationStatus": "completed",
        "executedAt": "2025-12-14 10:00:00",
        "executedBy": "system"
      }
    ]
  }
}
```

---

## 11. 前端专用接口

> 以下接口供 Next.js 前端调用，无需认证

### 10.1 获取文章内容

**请求**

```
GET /public/article/{slug}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "title": "剑来破解版下载",
    "content": "Markdown 内容",
    "category": "仙侠",
    "publishedAt": "2025-01-01",
    "readingTime": 5,
    "relatedGames": [],
    "relatedArticles": []
  }
}
```

### 10.2 获取分类列表

**请求**

```
GET /public/categories
```

### 10.3 获取游戏盒子

**请求**

```
GET /public/gameboxes
```

---

## 12. 接口流程图

### 11.1 搜索流程

```mermaid
sequenceDiagram
    participant Client as 前端
    participant Nginx as Nginx
    participant Backend as 若依Boot后端
    participant Cache as Redis
    participant ES as ElasticSearch
    
    Client->>Nginx: GET /api/search?q=仙侠
    Nginx->>Backend: 转发请求
    Backend->>Cache: 查询缓存
    
    alt 缓存命中
        Cache->>Backend: 返回结果
    else 缓存未命中
        Backend->>ES: 执行搜索
        ES->>Backend: 返回结果
        Backend->>Cache: 写入缓存
    end
    
    Backend->>Backend: 异步记录日志
    Backend->>Nginx: 返回结果
    Nginx->>Client: 返回响应
```

### 11.2 文档同步流程

```mermaid
sequenceDiagram
    participant Admin as 管理员
    participant Backend as 若依Boot后端
    participant R2 as R2 存储
    participant Async as 异步任务
    participant ES as ElasticSearch
    participant DB as MySQL
    
    Admin->>Backend: POST /document/sync
    Backend->>Async: 提交同步任务
    Backend->>Admin: 返回任务ID
    
    Async->>R2: 拉取文档列表
    R2->>Async: 返回文件列表
    
    loop 每个文档
        Async->>R2: 读取内容
        Async->>ES: 更新索引
        Async->>DB: 更新元数据
    end
    
    Async->>DB: 更新任务状态
```

---

## 13. AI 生成任务接口

### 12.1 批量任务列表

**请求**

```
GET /ai-task/batch/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| taskName | String | 否 | 任务名称 |
| taskType | String | 否 | 任务类型：single/batch |
| scheduleType | String | 否 | 调度类型：manual/once/cron |
| status | Integer | 否 | 状态 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 5,
    "rows": [
      {
        "id": 1,
        "taskName": "每日仙侠游戏文章生成",
        "taskType": "batch",
        "scheduleType": "cron",
        "cronExpression": "0 0 2 * * ?",
        "totalCount": 5,
        "status": 2,
        "isEnabled": true,
        "nextExecutionTime": "2025-12-15T02:00:00",
        "lastExecutionTime": "2025-12-14T02:00:00"
      }
    ]
  }
}
```

### 12.2 创建批量任务

**请求**

```
POST /ai-task/batch
```

```json
{
  "taskName": "每日游戏文章生成",
  "taskType": "batch",
  "scheduleType": "cron",
  "cronExpression": "0 0 2 * * ?",
  "batchConfig": {
    "tasks": [
      {
        "gameName": "剑来",
        "category": "xianxia",
        "template": "game-intro",
        "customPrompt": "重点介绍修炼体系",
        "keywords": "仙侠,修仙",
        "imageEnabled": true,
        "imageEngine": "unsplash"
      },
      {
        "gameName": "传奇世界",
        "category": "chuanqi",
        "template": "game-intro"
      }
    ],
    "options": {
      "aiProvider": "deepseek",
      "imageSearchEnabled": true,
      "imageSearchEngine": "unsplash",
      "maxConcurrent": 2
    }
  },
  "githubRepoId": 1
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "taskName": "每日游戏文章生成",
    "totalCount": 2,
    "nextExecutionTime": "2025-12-15T02:00:00"
  }
}
```

### 12.3 立即执行任务

**请求**

```
POST /ai-task/batch/{id}/execute
```

**响应**

```json
{
  "code": 200,
  "data": {
    "executionId": 100,
    "executionNo": "exec-20251214-001",
    "workflowRunId": 12345678,
    "workflowRunUrl": "https://github.com/user/repo/actions/runs/12345678",
    "status": "triggered"
  }
}
```

### 12.4 查询执行记录

**请求**

```
GET /ai-task/execution/list
```

| 参数 | 类型 | 必填 | 说明 |
|------|-----|------|------|
| batchTaskId | Long | 否 | 批量任务ID |
| status | Integer | 否 | 状态 |
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |
| pageNum | Integer | 否 | 页码 |
| pageSize | Integer | 否 | 每页数量 |

**响应**

```json
{
  "code": 200,
  "data": {
    "total": 10,
    "rows": [
      {
        "id": 100,
        "batchTaskId": 1,
        "executionNo": "exec-20251214-001",
        "workflowRunId": 12345678,
        "workflowRunUrl": "https://github.com/user/repo/actions/runs/12345678",
        "workflowStatus": "completed",
        "workflowConclusion": "success",
        "totalArticles": 5,
        "completedArticles": 5,
        "failedArticles": 0,
        "totalTokens": 15000,
        "totalImages": 12,
        "status": 3,
        "startedAt": "2025-12-14T02:00:05",
        "completedAt": "2025-12-14T02:15:30",
        "executionDuration": 925
      }
    ]
  }
}
```

### 12.5 查询执行详情（实时监控）

**请求**

```
GET /ai-task/execution/{id}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 100,
    "batchTaskId": 1,
    "executionNo": "exec-20251214-001",
    "workflowRunId": 12345678,
    "workflowStatus": "in_progress",
    "totalArticles": 5,
    "completedArticles": 3,
    "failedArticles": 0,
    "status": 2,
    "progress": 60,
    "items": [
      {
        "id": 1,
        "itemIndex": 0,
        "gameName": "剑来",
        "category": "xianxia",
        "status": 2,
        "articleId": 1001,
        "generatedFilePath": "src/docs/pojie/xianxia/jianlai.md",
        "tokensUsed": 3200,
        "imagesProcessed": 3,
        "executionTimeMs": 45000,
        "completedAt": "2025-12-14T02:03:00"
      },
      {
        "id": 2,
        "itemIndex": 1,
        "gameName": "传奇世界",
        "category": "chuanqi",
        "status": 2,
        "articleId": 1002,
        "tokensUsed": 2800,
        "imagesProcessed": 2,
        "completedAt": "2025-12-14T02:06:00"
      },
      {
        "id": 3,
        "itemIndex": 2,
        "gameName": "三国志战略版",
        "category": "sanguo",
        "status": 1,
        "startedAt": "2025-12-14T02:06:05"
      },
      {
        "id": 4,
        "itemIndex": 3,
        "gameName": "原神",
        "category": "erciyuan",
        "status": 0
      },
      {
        "id": 5,
        "itemIndex": 4,
        "gameName": "明日方舟",
        "category": "celue",
        "status": 0
      }
    ]
  }
}
```

### 12.6 刷新 Workflow 状态

从 GitHub API 同步最新的 Workflow 执行状态。

**请求**

```
POST /ai-task/execution/{id}/refresh
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 100,
    "workflowStatus": "completed",
    "workflowConclusion": "success",
    "completedArticles": 5,
    "status": 3,
    "updatedAt": "2025-12-14T02:15:30"
  }
}
```

### 12.7 取消执行中的任务

**请求**

```
POST /ai-task/execution/{id}/cancel
```

**响应**

```json
{
  "code": 200,
  "data": {
    "id": 100,
    "status": 5,
    "cancelledAt": "2025-12-14T02:10:00"
  }
}
```

### 12.8 重试失败的文章

**请求**

```
POST /ai-task/execution/{id}/retry-failed
```

**响应**

```json
{
  "code": 200,
  "data": {
    "newExecutionId": 101,
    "executionNo": "exec-20251214-002",
    "retryCount": 2,
    "workflowRunId": 12345679
  }
}
```

### 12.9 Webhook 回调接口

接收 GitHub Action 执行完成的回调通知。

**请求**

```
POST /ai-task/webhook
X-Webhook-Secret: <签名>
```

**单篇完成回调**

```json
{
  "event": "article_complete",
  "taskId": "exec-20251214-001",
  "runId": 12345678,
  "itemIndex": 0,
  "gameName": "剑来",
  "status": "success",
  "generatedFile": "src/docs/pojie/xianxia/jianlai.md",
  "tokensUsed": 3200,
  "imagesProcessed": 3,
  "executionTimeMs": 45000,
  "completedAt": "2025-12-14T02:03:00Z"
}
```

**批量完成回调**

```json
{
  "event": "batch_complete",
  "taskId": "exec-20251214-001",
  "runId": 12345678,
  "status": "success",
  "totalArticles": 5,
  "completedArticles": 5,
  "failedArticles": 0,
  "totalTokens": 15000,
  "completedAt": "2025-12-14T02:15:30Z"
}
```

**响应**

```json
{
  "code": 200,
  "message": "ok"
}
```

---

## 14. GitHub 集成接口

### 13.1 获取 OAuth 授权 URL

**请求**

```
GET /github/oauth/authorize
```

**响应**

```json
{
  "code": 200,
  "data": {
    "authUrl": "https://github.com/login/oauth/authorize?client_id=xxx&scope=repo,workflow&state=xxx"
  }
}
```

### 13.2 OAuth 回调

**请求**

```
GET /github/oauth/callback?code=xxx&state=xxx
```

**响应**

```json
{
  "code": 200,
  "data": {
    "connected": true,
    "username": "user123",
    "avatarUrl": "https://avatars.githubusercontent.com/u/xxx"
  }
}
```

### 13.3 Fork 生成器仓库

**请求**

```
POST /github/fork-generator
```

**响应**

```json
{
  "code": 200,
  "data": {
    "repoId": 1,
    "fullName": "user123/game-box-ai-generator",
    "htmlUrl": "https://github.com/user123/game-box-ai-generator"
  }
}
```

### 13.4 同步 Secrets

**请求**

```
POST /github/sync-secrets
```

```json
{
  "repoId": 1,
  "secrets": {
    "DEEPSEEK_API_KEY": "sk-xxx",
    "UNSPLASH_ACCESS_KEY": "xxx"
  }
}
```

**响应**

```json
{
  "code": 200,
  "data": {
    "synced": ["DEEPSEEK_API_KEY", "UNSPLASH_ACCESS_KEY"],
    "failed": []
  }
}
```

### 13.5 查询 Workflow 状态

**请求**

```
GET /github/workflow/{runId}/status
```

**响应**

```json
{
  "code": 200,
  "data": {
    "runId": 12345678,
    "status": "in_progress",
    "conclusion": null,
    "createdAt": "2025-12-14T02:00:00Z",
    "updatedAt": "2025-12-14T02:05:00Z",
    "jobs": [
      {
        "id": 1,
        "name": "prepare",
        "status": "completed",
        "conclusion": "success"
      },
      {
        "id": 2,
        "name": "generate (剑来, xianxia, game-intro)",
        "status": "completed",
        "conclusion": "success"
      },
      {
        "id": 3,
        "name": "generate (传奇世界, chuanqi, game-intro)",
        "status": "in_progress",
        "conclusion": null
      }
    ]
  }
}
```

---

## 15. 接口调用流程

### 14.1 AI 文章生成流程

```mermaid
sequenceDiagram
    participant Admin as 管理员
    participant API as 后端API
    participant DB as 数据库
    participant GitHub as GitHub API
    participant Action as GitHub Action
    participant Webhook as Webhook
    
    Admin->>API: POST /ai-task/batch（创建批量任务）
    API->>DB: 保存任务配置
    API->>Admin: 返回任务ID
    
    Admin->>API: POST /ai-task/batch/{id}/execute（立即执行）
    API->>DB: 创建执行记录
    API->>GitHub: POST /repos/.../actions/workflows/.../dispatches
    GitHub-->>API: 202 Accepted
    API->>Admin: 返回执行ID和workflowRunId
    
    Note over Admin,Action: 前端轮询监控执行状态
    
    loop 每5秒轮询
        Admin->>API: GET /ai-task/execution/{id}
        API->>DB: 查询执行状态
        API->>Admin: 返回进度信息
    end
    
    Note over Action,Webhook: GitHub Action 执行中
    
    Action->>Webhook: POST（单篇完成回调）
    Webhook->>DB: 更新执行详情
    
    Action->>Webhook: POST（批量完成回调）
    Webhook->>DB: 更新执行状态
    
    Admin->>API: GET /ai-task/execution/{id}
    API->>Admin: 返回完成状态
```

---

## 16. 版本历史

| 版本 | 日期 | 修改内容 |
|------|------|---------|
| v1.0.0 | 2025-12-13 | 初始版本，基础CRUD接口 |
| v2.2.0 | 2025-12-14 | 新增提示词模板接口、文章资源接口、存储迁移规则接口 |
| v2.3.0 | 2025-12-14 | 新增AI生成任务接口、GitHub集成接口、Webhook回调接口 |

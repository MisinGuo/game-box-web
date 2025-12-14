# API 接口文档

> 版本：v2.2.0  
> 日期：2025-12-14  
> 基础路径：`/api/v1`

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

## 2. 文档服务接口

### 2.1 文档列表

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

## 3. 搜索服务接口

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

## 4. 游戏服务接口

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

## 5. 关联服务接口

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

## 6. 统计服务接口

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

## 7. 提示词模板接口

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

## 8. 文章资源接口

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

## 9. 存储迁移规则接口

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

## 10. 前端专用接口

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

## 11. 接口流程图

### 11.1 搜索流程

```mermaid
sequenceDiagram
    participant Client as 前端
    participant Gateway as API网关
    participant Search as 搜索服务
    participant Cache as Redis
    participant ES as ElasticSearch
    participant Analytics as 统计服务
    
    Client->>Gateway: GET /search?q=仙侠
    Gateway->>Search: 转发请求
    Search->>Cache: 查询缓存
    
    alt 缓存命中
        Cache->>Search: 返回结果
    else 缓存未命中
        Search->>ES: 执行搜索
        ES->>Search: 返回结果
        Search->>Cache: 写入缓存
    end
    
    Search->>Analytics: 异步记录日志
    Search->>Gateway: 返回结果
    Gateway->>Client: 返回响应
```

### 11.2 文档同步流程

```mermaid
sequenceDiagram
    participant Admin as 管理员
    participant API as 文档服务
    participant R2 as R2 存储
    participant MQ as 消息队列
    participant Worker as 同步 Worker
    participant ES as ElasticSearch
    participant DB as MySQL
    
    Admin->>API: POST /document/sync
    API->>MQ: 发送同步任务
    API->>Admin: 返回任务ID
    
    MQ->>Worker: 消费任务
    Worker->>R2: 拉取文档列表
    R2->>Worker: 返回文件列表
    
    loop 每个文档
        Worker->>R2: 读取内容
        Worker->>ES: 更新索引
        Worker->>DB: 更新元数据
    end
    
    Worker->>DB: 更新任务状态
```

---

## 12. 版本历史

| 版本 | 日期 | 修改内容 |
|------|------|---------|
| v1.0.0 | 2025-12-13 | 初始版本，基础CRUD接口 |
| v2.2.0 | 2025-12-14 | 新增提示词模板接口、文章资源接口、存储迁移规则接口 |

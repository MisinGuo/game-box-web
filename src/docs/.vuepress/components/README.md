# CustomLink 组件使用说明

## 概述

`CustomLink` 是一个自定义的超链接组件，用于在 VuePress 项目中直接使用 `siteConfig` 变量，解决模板变量无法在组件中直接使用的问题。

## 功能特性

- ✅ 直接使用 `siteConfig.domain` 和 `siteConfig.hostname`
- ✅ 支持跳转域名功能（`siteConfig.jumpDomain`）
- ✅ 自动添加当前页面参数到跳转链接
- ✅ **默认无样式**，只保留基本的 `text-decoration: none`
- ✅ 支持自定义样式和CSS类
- ✅ 支持插槽内容
- ✅ 支持外部链接
- ✅ 支持新窗口打开

## 基本用法

### 1. 导入组件

```vue
<script>
import CustomLink from './CustomLink.vue';

export default {
  components: {
    CustomLink
  }
};
</script>
```

### 2. 基本链接

```vue
<template>
  <!-- 使用配置的域名 -->
  <CustomLink text="访问主页" to="/" />
  
  <!-- 使用跳转域名 -->
  <CustomLink text="游戏下载" use-jump-domain />
  
  <!-- 外部链接 -->
  <CustomLink text="外部链接" href="https://example.com" />
</template>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | String | `''` | 链接文本 |
| `to` | String | `''` | 目标路径（相对于域名） |
| `href` | String | `''` | 外部链接（完整URL） |
| `style` | Object | `{}` | 自定义样式对象 |
| `class` | String | `''` | 自定义CSS类名 |
| `useJumpDomain` | Boolean | `false` | 是否使用跳转域名 |
| `target` | String | `'_self'` | 链接打开方式 |

## 使用示例

### 1. 替换原来的模板变量

**原来的写法（无法在组件中使用）：**
```html
<a href="{{siteConfig.domain}}" style="color:red; font-size:40px;">
  SSR寵物獲取、技能搭配與進化材料整理‌破解版私服，外挂，修改版下载
</a>
```

**使用 CustomLink 组件（默认无样式）：**
```vue
<!-- 默认无样式 -->
<CustomLink 
  text="SSR寵物獲取、技能搭配與進化材料整理‌破解版私服，外挂，修改版下载"
  use-jump-domain
/>

<!-- 需要样式时手动添加 -->
<CustomLink 
  text="SSR寵物獲取、技能搭配與進化材料整理‌破解版私服，外挂，修改版下载"
  use-jump-domain
  :style="{ color: 'red', fontSize: '40px' }"
/>
```

### 2. 在 ProductList 中使用

```vue
<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <h2>{{ product.name }} ({{ product.englishName }})</h2>
      <p>{{ product.description }}</p>
      <div class="price">¥{{ product.price }}</div>
      
      <!-- 使用 CustomLink 组件 -->
      <CustomLink 
        :text="`${product.name} 下载链接`"
        use-jump-domain
        :style="{ 
          color: 'red', 
          fontSize: '16px',
          display: 'block',
          marginTop: '10px',
          textAlign: 'center'
        }"
      />
    </div>
  </div>
</template>
```

### 3. 使用插槽内容

```vue
<CustomLink 
  to="/products"
  :style="{ color: 'green', fontSize: '18px' }"
>
  <strong>产品列表</strong> - 点击查看
</CustomLink>
```

## 配置说明

组件会自动读取 `src/.vuepress/config/site.js` 中的配置：

```javascript
export default {
  domain: "www.5yxy5.com",
  hostname: "https://www.5yxy5.com",
  jumpDomain: "https://jump.zeusai.top/",
  // ... 其他配置
};
```

## 注意事项

1. 确保 `siteConfig` 文件路径正确
2. 使用 `use-jump-domain` 时，会自动添加当前页面参数
3. 组件支持服务端渲染（SSR）
4. 样式可以通过 `style` 属性或 `class` 属性自定义

## 文件结构

```
src/.vuepress/components/
├── CustomLink.vue          # 主组件文件
├── CustomLinkExample.vue   # 使用示例
├── ProductList.vue         # 更新后的产品列表
└── README.md              # 本说明文档
```

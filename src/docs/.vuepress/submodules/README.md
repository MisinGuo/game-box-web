# 子模块配置说明

## 配置结构

每个子模块都有独立的配置目录，结构如下：

```
submodules/
├── default/                    # 默认模块（全局默认配置）
│   ├── config/
│   │   ├── sidebar.ts
│   │   ├── navbar.ts
│   │   └── theme.ts
│   └── index.ts                # 模块入口，统一导出配置
│
├── strategy/                   # 策略模块
│   ├── config/
│   │   ├── sidebar.ts
│   │   ├── navbar.ts
│   │   └── theme.ts
│   ├── index.ts
│   └── 2025/                   # 嵌套目录配置示例
│       └── 11/
│           ├── config/
│           │   ├── sidebar.ts
│           │   ├── navbar.ts
│           │   └── theme.ts
│           └── index.ts
│
└── zh-CN/                      # 中文模块
    ├── default/
    │   ├── config/
    │   │   ├── sidebar.ts
    │   │   ├── navbar.ts
    │   │   └── theme.ts
    │   └── index.ts
    └── strategy/
        ├── config/
        │   ├── sidebar.ts
        │   ├── navbar.ts
        │   └── theme.ts
        └── index.ts
```

## 配置查找优先级

当构建 `strategy/2025/11` 这样的嵌套路径时，系统会按以下优先级查找配置：

1. **完整路径配置**：`submodules/strategy/2025/11/index.ts` （如果存在，直接使用）
2. **逐级向上查找**：
   - `submodules/strategy/2025/index.ts`
   - `submodules/strategy/index.ts`
3. **最后一级目录名配置**：`submodules/11/index.ts`
4. **语言默认配置**（仅当第一级是语言代码时）：如 `submodules/zh-CN/default/index.ts`
5. **全局默认配置**：`submodules/default/index.ts`

## 如何为嵌套目录创建配置

### 示例：为 `strategy/2025/11` 创建专用配置

1. **创建目录结构**：
   ```
   src/.vuepress/submodules/strategy/2025/11/
   ├── config/
   │   ├── navbar.ts
   │   ├── sidebar.ts
   │   └── theme.ts
   └── index.ts
   ```

2. **创建配置文件**：

   **`index.ts`** - 模块入口：
   ```typescript
   import type { UserConfig } from "vuepress";
   import { Fixtheme } from "./config/theme.js";

   export default function(submodule: string): Partial<UserConfig> {
     return {
       lang: "zh-TW",
       base: `/${submodule}/`,
       dest: `dist/${submodule}`,
       pagePatterns: [
         '*.md',
         '2025/11/**/*.md',  // 只包含该月份的文章
         '!.vuepress',
         '!node_modules',
       ],
       theme: Fixtheme(submodule),
     };
   }
   ```

   **`config/navbar.ts`** - 导航栏配置：
   ```typescript
   import { navbar } from "vuepress-theme-hope";
   
   export const FixNavbarConfig = (submodule: string) => navbar([
     // 你的导航栏配置
   ]);
   ```

   **`config/sidebar.ts`** - 侧边栏配置：
   ```typescript
   import { sidebar } from "vuepress-theme-hope";
   
   export const zhTWSidebarConfig = sidebar({
     "/": "structure",
   });
   ```

   **`config/theme.ts`** - 主题配置：
   ```typescript
   import { hopeTheme } from "vuepress-theme-hope";
   import siteConfig from "../../../../../../config/site.js";
   import { zhTWSidebarConfig } from "./sidebar.js";
   import { FixNavbarConfig } from "./navbar.js";

   export function Fixtheme(submodule: string) {
     return hopeTheme({
       // 你的主题配置
       locales: {
         "/": {
           navbar: FixNavbarConfig(submodule),
           sidebar: zhTWSidebarConfig,
           // ...
         },
       },
     });
   }
   ```

3. **构建时使用**：
   ```bash
   pnpm run build:vite-submodule -- --submodule=strategy/2025/11
   ```

## 配置继承

如果没有为特定路径创建配置，系统会自动向上查找：

- `strategy/2025/11` → 如果没有，查找 `strategy/2025`
- `strategy/2025` → 如果没有，查找 `strategy`
- `strategy` → 如果没有，使用 `default`

这样可以避免重复配置，只需要为需要特殊配置的路径创建专用配置即可。

## 注意事项

1. **路径深度**：配置文件中的 `siteConfig` 导入路径需要根据目录深度调整 `../` 的数量
   - `strategy/index.ts` → `../../../config/site.js` (3层)
   - `strategy/2025/11/index.ts` → `../../../../../../config/site.js` (7层)

2. **相对导入**：确保所有导入路径使用相对路径，并且 `import` 语句中的 `.js` 扩展名是必需的（TypeScript 编译后会变成 `.js`）

3. **模块名称**：`index.ts` 中的 `submodule` 参数会是完整的路径（如 `"strategy/2025/11"`），可以在配置中使用它来动态生成 `base`、`dest` 等路径。

